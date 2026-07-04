/* ============================================================
   Cortex Design System — Documentation SPA
   Router, enhancement pipeline (anchors → highlight → copy →
   breadcrumb → pager → TOC), full-content search, shortcuts.
   No dependencies, no build step.
   ============================================================ */
(function () {
  'use strict';

  /* ─── State & DOM refs ─────────────────────────────────── */
  var state = {
    currentPage: null,
    contentCache: {},
    searchIndex: null,
    searchIndexPromise: null,
    searchSelection: -1,
    results: [],
  };

  var contentArea = document.getElementById('content-area');
  var loadingIndicator = document.getElementById('loadingIndicator');
  var sidebar = document.getElementById('sidebar');
  var sidebarOverlay = document.getElementById('sidebarOverlay');
  var navToggle = document.getElementById('navToggle');
  var searchInput = document.getElementById('searchInput');
  var searchBox = document.getElementById('searchBox');
  var searchResults = document.getElementById('searchResults');
  var searchKbd = document.getElementById('searchKbd');
  var announcer = document.getElementById('routeAnnouncer');

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var tocObserver = null;

  var ICON_COPY = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  var ICON_CHECK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  /* ─── Page registry (derived from the sidebar nav DOM) ──── */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link[data-page]'));
  var PAGES = navLinks.map(function (link) {
    var section = link.closest('.nav-section');
    var title = section ? section.querySelector('.nav-section-title') : null;
    return {
      page: link.dataset.page,
      title: link.textContent.trim(),
      section: title ? title.textContent.trim() : '',
    };
  });
  function pageMeta(page) {
    for (var i = 0; i < PAGES.length; i++) if (PAGES[i].page === page) return PAGES[i];
    return null;
  }

  /* ─── Router ───────────────────────────────────────────── */
  function parseHash(hash) {
    var raw = (hash || '').replace(/^#/, '');
    if (!raw) return { page: 'overview', heading: null };
    var parts = raw.split('/');
    return { page: parts[0] || 'overview', heading: parts.slice(1).join('/') || null };
  }

  function navigate(page, heading) {
    history.pushState({ page: page, heading: heading }, '', heading ? '#' + page + '/' + heading : '#' + page);
    loadPage(page, heading);
  }

  window.addEventListener('popstate', function () {
    var route = parseHash(location.hash);
    if (!pageMeta(route.page)) return; /* foreign hash (skip-link etc.) — not ours */
    loadPage(route.page, route.heading);
  });

  /* ─── Page loader ──────────────────────────────────────── */
  function fetchPage(page) {
    if (state.contentCache[page]) return Promise.resolve(state.contentCache[page]);
    return fetch('content/' + page + '.html').then(function (response) {
      if (!response.ok) throw new Error('Page not found: ' + page);
      return response.text().then(function (html) {
        state.contentCache[page] = html;
        return html;
      });
    });
  }

  function scrollToHeading(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
  }

  function loadPage(page, heading) {
    if (!page) return;

    /* Same-page heading jump — no re-render, keep DOM state */
    if (page === state.currentPage && heading && document.getElementById(heading)) {
      scrollToHeading(heading);
      return;
    }
    state.currentPage = page;

    navLinks.forEach(function (link) {
      var active = link.dataset.page === page;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    /* Show the loading indicator only if the fetch is actually slow */
    var loadingTimer = setTimeout(function () { loadingIndicator.classList.add('active'); }, 150);

    fetchPage(page)
      .then(function (html) {
        contentArea.innerHTML = html;
        enhance(page);

        var titleEl = contentArea.querySelector('h1');
        var title = titleEl ? titleEl.textContent.replace(/#$/, '').trim() : 'Cortex Design System';
        document.title = title + ' — Cortex Design System';
        if (announcer) announcer.textContent = title;

        if (!reducedMotion.matches) {
          contentArea.classList.remove('page-enter');
          void contentArea.offsetWidth; /* restart the animation */
          contentArea.classList.add('page-enter');
          setTimeout(function () { contentArea.classList.remove('page-enter'); }, 320);
        }

        if (heading) scrollToHeading(heading);
        else window.scrollTo({ top: 0, behavior: 'auto' });
      })
      .catch(function (err) {
        contentArea.className = '';
        contentArea.innerHTML =
          '<div class="page-header"><h1>Page Not Found</h1><p>The page "' + page + '" could not be loaded.</p></div>' +
          '<div class="page-body"><div class="callout callout-danger"><div class="callout-title">Error</div>' +
          '<p>' + err.message + '</p>' +
          '<p style="margin-top:0.5rem;"><a href="#overview" data-page-link="overview">Return to overview</a></p></div></div>';
        document.title = 'Error — Cortex Design System';
      })
      .then(function () {
        clearTimeout(loadingTimer);
        loadingIndicator.classList.remove('active');
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
      });
  }

  /* ─── Enhancement pipeline (idempotent, per injection) ──── */
  function enhance(page) {
    addBreadcrumb(page);
    addAnchorLinks(page);
    highlightAll(contentArea);
    addCopyButtons(contentArea);
    addPagerFooter(page);
    buildToc(page);
  }

  function addBreadcrumb(page) {
    var meta = pageMeta(page);
    var header = contentArea.querySelector('.page-header');
    if (!meta || !meta.section || !header || header.classList.contains('hero')) return;
    if (header.querySelector('.page-breadcrumb')) return;
    var crumb = document.createElement('div');
    crumb.className = 'page-breadcrumb';
    crumb.textContent = meta.section;
    header.insertBefore(crumb, header.firstChild);
  }

  function addAnchorLinks(page) {
    contentArea.querySelectorAll('h2[id], h3[id], h4[id]').forEach(function (heading) {
      if (heading.querySelector('.anchor-link')) return;
      var anchor = document.createElement('a');
      anchor.href = '#' + page + '/' + heading.id;
      anchor.className = 'anchor-link';
      anchor.textContent = '#';
      anchor.setAttribute('aria-label', 'Link to ' + heading.textContent);
      heading.appendChild(anchor);
    });
  }

  /* ─── Syntax highlighting (conservative tokenizer) ──────── */
  var KEYWORDS = /\b(import|export|const|let|var|function|return|if|else|new|type|interface|extends|implements|async|await|from|default|class|public|private|readonly|true|false|null|undefined|npm|npx|pnpm|yarn|module|require|extend|theme|plugins|keyframes|animation)\b/;
  var TOKEN_RE = new RegExp(
    '(\\/\\*[\\s\\S]*?\\*\\/)' +                          /* 1 block comment */
    '|(^|[^:\\\\])(\\/\\/[^\\n]*)' +                      /* 2 prefix, 3 line comment (not ://) */
    '|("(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\'|`(?:[^`\\\\]|\\\\.)*`)' + /* 4 strings */
    '|\\b(\\d+(?:\\.\\d+)?(?:px|rem|em|ms|s|%)?)\\b' +    /* 5 numbers */
    '|' + KEYWORDS.source,                                 /* 6 keywords */
    'gm'
  );

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function highlightSource(src) {
    return src.replace(TOKEN_RE, function (m, block, prefix, line, str, num, kw) {
      if (block) return '<span class="tok-comment">' + block + '</span>';
      if (line) return (prefix || '') + '<span class="tok-comment">' + line + '</span>';
      if (str) return '<span class="tok-string">' + str + '</span>';
      if (num) return '<span class="tok-number">' + num + '</span>';
      if (kw) return '<span class="tok-keyword">' + kw + '</span>';
      return m;
    });
  }

  function highlightAll(root) {
    root.querySelectorAll('pre code').forEach(function (code) {
      if (code.dataset.highlighted) return;
      code.innerHTML = highlightSource(escapeHtml(code.textContent));
      code.dataset.highlighted = 'true';
    });
  }

  /* ─── Copy to clipboard ────────────────────────────────── */
  function copyText(text, btn) {
    function done() {
      btn.classList.add('copied');
      btn.innerHTML = ICON_CHECK;
      setTimeout(function () {
        btn.classList.remove('copied');
        btn.innerHTML = ICON_COPY;
      }, 1600);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else {
      fallbackCopy(text);
      done();
    }
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* no-op */ }
    ta.remove();
  }

  function addCopyButtons(root) {
    var targets = Array.prototype.slice.call(root.querySelectorAll('pre'))
      .concat(Array.prototype.slice.call(root.querySelectorAll('.preview-card-footer')));
    targets.forEach(function (el) {
      if (el.closest('.code-block') || el.querySelector('.copy-btn')) return;
      var text = el.innerText.trim();
      if (!text) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.setAttribute('aria-label', 'Copy to clipboard');
      btn.innerHTML = ICON_COPY;
      btn.addEventListener('click', function () { copyText(text, btn); });
      if (el.tagName === 'PRE') {
        var wrap = document.createElement('div');
        wrap.className = 'code-block';
        el.replaceWith(wrap);
        wrap.appendChild(el);
        wrap.appendChild(btn);
      } else {
        el.classList.add('has-copy');
        el.appendChild(btn);
      }
    });
  }

  /* ─── Prev / next footer ───────────────────────────────── */
  function addPagerFooter(page) {
    if (contentArea.querySelector('.page-footer')) return;
    var idx = PAGES.findIndex(function (p) { return p.page === page; });
    if (idx === -1) return;
    var prev = PAGES[idx - 1];
    var next = PAGES[idx + 1];
    if (!prev && !next) return;

    var footer = document.createElement('nav');
    footer.className = 'page-footer';
    footer.setAttribute('aria-label', 'Page navigation');
    footer.innerHTML =
      (prev
        ? '<a class="page-footer-link prev" href="#' + prev.page + '" data-page-link="' + prev.page + '">' +
          '<span class="page-footer-dir">&larr; Previous</span><span class="page-footer-title">' + prev.title + '</span></a>'
        : '<span class="page-footer-spacer"></span>') +
      (next
        ? '<a class="page-footer-link next" href="#' + next.page + '" data-page-link="' + next.page + '">' +
          '<span class="page-footer-dir">Next &rarr;</span><span class="page-footer-title">' + next.title + '</span></a>'
        : '<span class="page-footer-spacer"></span>') +
      '<div class="page-footer-meta">Cortex Design System &middot; v1.0</div>';
    contentArea.appendChild(footer);
  }

  /* ─── "On this page" TOC + scroll-spy ──────────────────── */
  function buildToc(page) {
    if (tocObserver) { tocObserver.disconnect(); tocObserver = null; }
    var old = contentArea.querySelector('.toc');
    if (old) old.remove();

    var headings = Array.prototype.slice.call(
      contentArea.querySelectorAll('.page-body h2[id], .page-body h3[id]')
    );
    if (headings.length < 3) {
      contentArea.classList.remove('has-toc');
      return;
    }
    contentArea.classList.add('has-toc');

    var toc = document.createElement('aside');
    toc.className = 'toc';
    toc.setAttribute('aria-label', 'On this page');
    var title = document.createElement('div');
    title.className = 'toc-title';
    title.textContent = 'On this page';
    toc.appendChild(title);

    var links = {};
    headings.forEach(function (h) {
      var a = document.createElement('a');
      a.href = '#' + page + '/' + h.id;
      a.textContent = h.textContent.replace(/#$/, '').trim();
      if (h.tagName === 'H3') a.className = 'toc-h3';
      toc.appendChild(a);
      links[h.id] = a;
    });
    contentArea.appendChild(toc);

    tocObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Object.keys(links).forEach(function (id) {
          var active = id === entry.target.id;
          links[id].classList.toggle('active', active);
          if (active) links[id].setAttribute('aria-current', 'true');
          else links[id].removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-80px 0px -70% 0px' });
    headings.forEach(function (h) { tocObserver.observe(h); });
  }

  /* ─── Search: lazy full-content index ──────────────────── */
  function buildSearchIndex() {
    if (state.searchIndexPromise) return state.searchIndexPromise;
    var parser = new DOMParser();
    state.searchIndexPromise = Promise.all(
      PAGES.map(function (meta) {
        return fetchPage(meta.page)
          .then(function (html) {
            var doc = parser.parseFromString(html, 'text/html');
            var h1 = doc.querySelector('h1');
            var headings = Array.prototype.slice.call(doc.querySelectorAll('h2[id], h3[id]')).map(function (h) {
              return { id: h.id, text: h.textContent.trim() };
            });
            return {
              page: meta.page,
              section: meta.section,
              title: meta.title,
              h1: h1 ? h1.textContent.trim() : meta.title,
              headings: headings,
              body: (doc.body.textContent || '').replace(/\s+/g, ' ').toLowerCase(),
              bodyRaw: (doc.body.textContent || '').replace(/\s+/g, ' '),
            };
          })
          .catch(function () { return null; });
      })
    ).then(function (docs) {
      state.searchIndex = docs.filter(Boolean);
      return state.searchIndex;
    });
    return state.searchIndexPromise;
  }

  function searchDocs(query) {
    var q = query.toLowerCase().trim();
    if (!q || !state.searchIndex) return [];
    var results = [];
    state.searchIndex.forEach(function (doc) {
      var score = 0;
      var headingHit = null;
      if (doc.title.toLowerCase().indexOf(q) !== -1 || doc.h1.toLowerCase().indexOf(q) !== -1) score += 100;
      for (var i = 0; i < doc.headings.length; i++) {
        if (doc.headings[i].text.toLowerCase().indexOf(q) !== -1) {
          score += 50;
          headingHit = doc.headings[i];
          break;
        }
      }
      var bodyPos = doc.body.indexOf(q);
      if (bodyPos !== -1) score += 10;
      if (score > 0) {
        var excerpt = '';
        if (bodyPos !== -1) {
          var start = Math.max(0, bodyPos - 36);
          var raw = doc.bodyRaw.substr(start, 96);
          excerpt = (start > 0 ? '…' : '') + raw.replace(new RegExp('(' + escapeRegExp(query.trim()) + ')', 'ig'),
            '<mark class="search-highlight">$1</mark>') + '…';
        }
        results.push({ doc: doc, score: score, heading: headingHit, excerpt: excerpt });
      }
    });
    results.sort(function (a, b) { return b.score - a.score; });
    return results.slice(0, 8);
  }

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function renderResults(results, query) {
    state.results = results;
    state.searchSelection = -1;
    if (!query || results.length === 0) {
      searchResults.innerHTML = query
        ? '<div class="search-empty">No results for &ldquo;' + escapeHtml(query) + '&rdquo;</div>'
        : '';
      searchResults.classList.toggle('open', Boolean(query));
      searchInput.setAttribute('aria-expanded', Boolean(query) ? 'true' : 'false');
      return;
    }
    searchResults.innerHTML = results.map(function (r, i) {
      var href = r.heading ? '#' + r.doc.page + '/' + r.heading.id : '#' + r.doc.page;
      return '<a class="search-result" id="search-option-' + i + '" role="option" aria-selected="false" href="' + href + '" data-index="' + i + '">' +
        '<span class="search-result-title">' + escapeHtml(r.doc.title) +
        (r.heading ? ' <span class="search-result-heading">&rsaquo; ' + escapeHtml(r.heading.text) + '</span>' : '') +
        '</span>' +
        '<span class="search-result-section">' + escapeHtml(r.doc.section) + '</span>' +
        (r.excerpt ? '<span class="search-result-excerpt">' + r.excerpt + '</span>' : '') +
        '</a>';
    }).join('');
    searchResults.classList.add('open');
    searchInput.setAttribute('aria-expanded', 'true');
  }

  function closeSearch() {
    searchResults.classList.remove('open');
    searchResults.innerHTML = '';
    searchInput.setAttribute('aria-expanded', 'false');
    state.searchSelection = -1;
    state.results = [];
  }

  function moveSelection(delta) {
    var options = searchResults.querySelectorAll('.search-result');
    if (!options.length) return;
    state.searchSelection = (state.searchSelection + delta + options.length) % options.length;
    options.forEach(function (opt, i) {
      var selected = i === state.searchSelection;
      opt.classList.toggle('selected', selected);
      opt.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
    searchInput.setAttribute('aria-activedescendant', 'search-option-' + state.searchSelection);
    options[state.searchSelection].scrollIntoView({ block: 'nearest' });
  }

  function openResult(index) {
    var r = state.results[index];
    if (!r) return;
    navigate(r.doc.page, r.heading ? r.heading.id : null);
    searchInput.value = '';
    closeSearch();
    searchInput.blur();
  }

  searchInput.addEventListener('focus', function () { buildSearchIndex(); });

  searchInput.addEventListener('input', function (e) {
    var query = e.target.value;
    if (!query.trim()) { closeSearch(); return; }
    buildSearchIndex().then(function () {
      if (searchInput.value.trim() === query.trim()) {
        renderResults(searchDocs(query), query.trim());
      }
    });
  });

  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); moveSelection(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveSelection(-1); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      openResult(state.searchSelection === -1 ? 0 : state.searchSelection);
    } else if (e.key === 'Escape') {
      searchInput.value = '';
      closeSearch();
      searchInput.blur();
    }
  });

  searchResults.addEventListener('mousedown', function (e) {
    var link = e.target.closest('.search-result');
    if (!link) return;
    e.preventDefault();
    openResult(parseInt(link.dataset.index, 10));
  });

  document.addEventListener('click', function (e) {
    if (searchBox && !searchBox.contains(e.target)) closeSearch();
  });

  /* Keyboard shortcuts: "/" or Cmd/Ctrl+K focus the search */
  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    var typing = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    } else if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

  if (searchKbd && navigator.platform && navigator.platform.indexOf('Mac') === -1) {
    searchKbd.textContent = 'Ctrl K';
  }

  /* ─── Navigation events ────────────────────────────────── */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var page = link.dataset.page;
      if (page && page !== state.currentPage) navigate(page, null);
    });
  });

  /* In-content page links (hero CTAs, pager, error page) */
  contentArea.addEventListener('click', function (e) {
    var link = e.target.closest('[data-page-link]');
    if (!link) return;
    e.preventDefault();
    navigate(link.dataset.pageLink, null);
  });

  navToggle.addEventListener('click', function () {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('open');
  });
  sidebarOverlay.addEventListener('click', function () {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
  });

  /* ─── Init ─────────────────────────────────────────────── */
  var initial = parseHash(location.hash);
  loadPage(pageMeta(initial.page) ? initial.page : 'overview', initial.heading);
})();
