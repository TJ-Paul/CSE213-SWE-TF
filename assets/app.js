/* Renders the Obsidian notes of this repository as a website.
   Supports wikilinks, ==highlights==, callouts (incl. collapsible), Mermaid and code highlighting. */
(() => {
  "use strict";

  const HOME = "00 Start Here";
  let notes = [];            // [{path, title, folder}]
  const byName = new Map();  // lower-case title or path -> note
  const cache = new Map();   // path -> markdown text
  let currentPath = null;

  const $ = (sel) => document.querySelector(sel);
  const content = $("#content");

  // ---------- helpers ----------
  const slugify = (s) =>
    s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
      .replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");

  const fileUrl = (path) => path.split("/").map(encodeURIComponent).join("/") + ".md";
  const noteHref = (path, heading) =>
    "#/" + encodeURIComponent(path) + (heading ? "#" + slugify(heading) : "");
  const escapeHtml = (s) =>
    s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function resolveNote(name) {
    const key = name.trim().replace(/\.md$/i, "").toLowerCase();
    return byName.get(key) || null;
  }

  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, "");
    if (!raw) return { path: HOME, anchor: "" };
    const i = raw.indexOf("#");
    const path = decodeURIComponent(i < 0 ? raw : raw.slice(0, i));
    const anchor = i < 0 ? "" : decodeURIComponent(raw.slice(i + 1));
    return { path: path || HOME, anchor };
  }

  async function getText(path) {
    if (cache.has(path)) return cache.get(path);
    const res = await fetch(fileUrl(path));
    if (!res.ok) throw new Error(res.status + " " + res.statusText);
    const text = await res.text();
    cache.set(path, text);
    return text;
  }

  // ---------- markdown setup ----------
  const highlight = {
    name: "mark", level: "inline",
    start(src) { const i = src.indexOf("=="); return i < 0 ? undefined : i; },
    tokenizer(src) {
      const m = /^==(?=\S)([\s\S]*?\S)==/.exec(src);
      if (m) return { type: "mark", raw: m[0], tokens: this.lexer.inlineTokens(m[1]) };
    },
    renderer(t) { return "<mark>" + this.parser.parseInline(t.tokens) + "</mark>"; },
  };

  const wikilink = {
    name: "wikilink", level: "inline",
    start(src) { const i = src.indexOf("[["); return i < 0 ? undefined : i; },
    tokenizer(src) {
      const m = /^!?\[\[([^\]|#]*)(?:#([^\]|]*))?(?:\\?\|([^\]]*))?\]\]/.exec(src);
      if (m) return { type: "wikilink", raw: m[0], name: m[1], heading: m[2] || "", alias: m[3] || "" };
    },
    renderer(t) {
      const label = escapeHtml(t.alias || (t.name ? t.name + (t.heading ? " › " + t.heading : "") : t.heading));
      if (!t.name) return `<a href="${noteHref(currentPath, t.heading)}">${label}</a>`;
      const note = resolveNote(t.name);
      if (!note) return `<span class="broken-link" title="Note not found">${label}</span>`;
      return `<a href="${noteHref(note.path, t.heading)}">${label}</a>`;
    },
  };

  marked.use({ gfm: true, breaks: true, extensions: [highlight, wikilink] });

  // ---------- post-processing of rendered HTML ----------
  const CALLOUT_ICONS = { important: "🔑", tip: "🎯", warning: "⚠️", example: "✍️", note: "📝", question: "❓" };

  function convertCallouts(root) {
    // Innermost first so nested callouts work.
    const quotes = [...root.querySelectorAll("blockquote")].reverse();
    for (const bq of quotes) {
      const first = bq.firstElementChild;
      if (!first || first.tagName !== "P") continue;
      const m = /^\s*\[!(\w+)\]([-+]?)\s*/.exec(first.innerHTML);
      if (!m) continue;
      const type = m[1].toLowerCase();
      const fold = m[2];
      let rest = first.innerHTML.slice(m[0].length);
      const br = rest.search(/<br\s*\/?>/i);
      let title = br < 0 ? rest : rest.slice(0, br);
      let remainder = br < 0 ? "" : rest.slice(br).replace(/^<br\s*\/?>\s*/i, "");
      if (!title.trim()) title = (CALLOUT_ICONS[type] || "") + " " + type.charAt(0).toUpperCase() + type.slice(1);

      const box = document.createElement(fold ? "details" : "div");
      box.className = "callout";
      box.dataset.type = type;
      if (fold === "+") box.open = true;
      const head = document.createElement(fold ? "summary" : "div");
      head.className = "callout-title";
      head.innerHTML = `<span class="callout-text">${title}</span>`;
      const body = document.createElement("div");
      body.className = "callout-body";
      if (remainder.trim()) { const p = document.createElement("p"); p.innerHTML = remainder; body.appendChild(p); }
      for (const el of [...bq.children].slice(1)) body.appendChild(el);
      box.append(head, body);
      bq.replaceWith(box);
    }
  }

  function addHeadingIds(root) {
    const seen = new Map();
    for (const h of root.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
      let id = slugify(h.textContent) || "section";
      const n = seen.get(id) || 0;
      seen.set(id, n + 1);
      if (n) id += "-" + n;
      h.id = id;
      if (h.tagName === "H2" || h.tagName === "H3") {
        const a = document.createElement("a");
        a.className = "hlink"; a.href = noteHref(currentPath) + "#" + id; a.textContent = "#";
        a.setAttribute("aria-label", "Link to this section");
        h.appendChild(a);
      }
    }
  }

  function wrapTables(root) {
    for (const t of root.querySelectorAll("table")) {
      const w = document.createElement("div"); w.className = "table-wrap";
      t.replaceWith(w); w.appendChild(t);
    }
  }

  function highlightCode(root) {
    for (const code of root.querySelectorAll("pre code")) {
      if (code.classList.contains("language-mermaid")) continue;
      try { hljs.highlightElement(code); } catch (e) { /* unknown language: leave plain */ }
    }
  }

  // ---------- mermaid ----------
  let mermaidSeq = 0;
  function isDark() { return document.documentElement.dataset.theme === "dark"; }
  function initMermaid() {
    mermaid.initialize({ startOnLoad: false, theme: isDark() ? "dark" : "default", securityLevel: "loose", fontFamily: "Inter, sans-serif" });
  }

  function prepareMermaid(root) {
    for (const code of root.querySelectorAll("pre code.language-mermaid")) {
      const box = document.createElement("div");
      box.className = "mermaid-box";
      box.dataset.src = code.textContent;
      code.parentElement.replaceWith(box);
    }
  }

  async function renderMermaid(scope) {
    const boxes = [...scope.querySelectorAll(".mermaid-box:not([data-done])")]
      .filter((b) => !b.closest("details:not([open])"));
    for (const box of boxes) {
      box.dataset.done = "1";
      try {
        const { svg } = await mermaid.render("mmd-" + ++mermaidSeq, box.dataset.src);
        box.innerHTML = svg;
      } catch (e) {
        box.classList.add("error");
        box.textContent = "Diagram could not be drawn: " + (e.message || e);
      }
    }
  }

  // ---------- page rendering ----------
  function buildSidebar() {
    const nav = $("#sidebar");
    const groups = new Map();
    for (const n of notes) {
      const g = n.folder || "Start";
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g).push(n);
    }
    const label = (g) => ({ "Start": "Start here & exam tools", "01 IJ": "IJ Ma'am", "02 AI": "AI Sir", "03 TF Solves": "TF Solves (read last)" }[g] || g.replace(/^\d+\s*/, ""));
    let html = "";
    for (const [g, list] of groups) {
      html += `<h4>${escapeHtml(label(g))}</h4>`;
      for (const n of list) {
        const t = n.title.replace(/^(00|99)\s+/, "");
        html += `<a href="${noteHref(n.path)}" data-path="${escapeHtml(n.path)}">${escapeHtml(t)}</a>`;
      }
    }
    nav.innerHTML = html;
  }

  function markActive() {
    for (const a of document.querySelectorAll("#sidebar a")) a.classList.toggle("active", a.dataset.path === currentPath);
  }

  function buildToc() {
    const toc = $("#toc");
    const hs = [...content.querySelectorAll("h2, h3")];
    if (hs.length < 2) { toc.innerHTML = ""; return; }
    toc.innerHTML = "<h4>On this page</h4>" + hs.map((h) => {
      const text = h.textContent.replace(/#$/, "").trim();
      return `<a class="${h.tagName.toLowerCase()}" href="${noteHref(currentPath)}#${h.id}" data-id="${h.id}">${escapeHtml(text)}</a>`;
    }).join("");
  }

  function buildPager() {
    const i = notes.findIndex((n) => n.path === currentPath);
    const prev = notes[i - 1], next = notes[i + 1];
    $("#pager").innerHTML =
      (prev ? `<a class="prev" href="${noteHref(prev.path)}"><span class="dir">← Previous</span>${escapeHtml(prev.title)}</a>` : "") +
      (next ? `<a class="next" href="${noteHref(next.path)}"><span class="dir">Next →</span>${escapeHtml(next.title)}</a>` : "");
  }

  function scrollToAnchor(anchor) {
    if (!anchor) { window.scrollTo(0, 0); return; }
    const el = document.getElementById(slugify(anchor)) || document.getElementById(anchor);
    if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
  }

  async function show() {
    const { path, anchor } = parseHash();
    const note = notes.find((n) => n.path === path) || resolveNote(path);
    closeSidebar();
    if (!note) {
      content.innerHTML = `<h1>Note not found</h1><p>No note is called “${escapeHtml(path)}”. <a href="#/">Go to the start page.</a></p>`;
      $("#toc").innerHTML = ""; $("#pager").innerHTML = "";
      return;
    }
    if (note.path === currentPath && content.dataset.ready) { scrollToAnchor(anchor); return; }

    currentPath = note.path;
    content.dataset.ready = "";
    content.innerHTML = '<p class="loading">Loading…</p>';
    let md;
    try { md = await getText(note.path); }
    catch (e) { content.innerHTML = `<h1>Could not load the note</h1><p>${escapeHtml(String(e))}</p>`; return; }
    if (currentPath !== note.path) return; // user navigated away meanwhile

    md = md.replace(/^---\n[\s\S]*?\n---\n/, "");      // front matter
    md = md.replace(/%%[\s\S]*?%%/g, "");               // Obsidian comments
    if (!/^#\s/m.test(md.split("\n").find((l) => l.trim()) || "")) md = `# ${note.title}\n\n` + md;

    content.innerHTML = marked.parse(md);
    convertCallouts(content);
    prepareMermaid(content);
    highlightCode(content);
    wrapTables(content);
    addHeadingIds(content);
    content.dataset.ready = "1";

    document.title = note.title.replace(/^(00|99)\s+/, "") + " · CSE 213 Notes";
    markActive(); buildToc(); buildPager();
    scrollToAnchor(anchor);
    await renderMermaid(content);
    scrollToAnchor(anchor); // diagrams change the height; jump again
  }

  // render diagrams inside collapsible callouts when they are opened
  document.addEventListener("toggle", (e) => {
    if (e.target.matches && e.target.matches("details.callout") && e.target.open) renderMermaid(e.target);
  }, true);

  // ---------- table of contents highlight ----------
  const tocObserver = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      for (const a of document.querySelectorAll("#toc a")) a.classList.toggle("active", a.dataset.id === en.target.id);
    }
  }, { rootMargin: "-60px 0px -75% 0px" });
  new MutationObserver(() => {
    tocObserver.disconnect();
    for (const h of content.querySelectorAll("h2, h3")) tocObserver.observe(h);
  }).observe($("#toc"), { childList: true });

  // ---------- search ----------
  const searchBox = $("#search"), results = $("#search-results");
  let allLoaded = null;
  function loadAll() {
    if (!allLoaded) allLoaded = Promise.all(notes.map((n) => getText(n.path).catch(() => "")));
    return allLoaded;
  }
  function plain(md) {
    return md.replace(/```[\s\S]*?```/g, " ").replace(/\[\[([^\]|#]*)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g, (_, a, b) => b || a)
      .replace(/[=*#>`_]|\[![a-z]+\][-+]?/g, "").replace(/\s+/g, " ");
  }
  let searchTimer;
  searchBox.addEventListener("input", () => { clearTimeout(searchTimer); searchTimer = setTimeout(runSearch, 160); });
  searchBox.addEventListener("focus", () => { loadAll(); if (searchBox.value.trim()) runSearch(); });
  searchBox.addEventListener("keydown", (e) => {
    const items = [...results.querySelectorAll("a")];
    let i = items.findIndex((a) => a.classList.contains("active"));
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (items[i]) items[i].classList.remove("active");
      i = e.key === "ArrowDown" ? Math.min(items.length - 1, i + 1) : Math.max(0, i - 1);
      if (items[i]) { items[i].classList.add("active"); items[i].scrollIntoView({ block: "nearest" }); }
    } else if (e.key === "Enter") {
      const a = items[Math.max(0, i)]; if (a) { location.hash = a.getAttribute("href"); hideResults(); searchBox.blur(); }
    } else if (e.key === "Escape") { hideResults(); searchBox.blur(); }
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".search-wrap")) hideResults(); });
  results.addEventListener("click", (e) => { if (e.target.closest("a")) { hideResults(); searchBox.value = ""; } });
  function hideResults() { results.hidden = true; }

  async function runSearch() {
    const q = searchBox.value.trim().toLowerCase();
    if (q.length < 2) { hideResults(); return; }
    const texts = await loadAll();
    const terms = q.split(/\s+/);
    const hits = [];
    notes.forEach((n, i) => {
      const body = plain(texts[i]); const low = body.toLowerCase(); const title = n.title.toLowerCase();
      if (!terms.every((t) => low.includes(t) || title.includes(t))) return;
      let score = terms.reduce((s, t) => s + (title.includes(t) ? 50 : 0) + Math.min(20, low.split(t).length - 1), 0);
      // nearest heading to the first match, so the link jumps there
      const md = texts[i]; const pos = md.toLowerCase().indexOf(terms[0]);
      let heading = "";
      if (pos > 0) { const before = md.slice(0, pos).match(/^#{2,4}\s+(.+)$/gm); if (before) heading = before[before.length - 1].replace(/^#+\s+/, ""); }
      const at = low.indexOf(terms[0]);
      const snip = at < 0 ? body.slice(0, 120) : (at > 50 ? "…" : "") + body.slice(Math.max(0, at - 50), at + 90) + "…";
      hits.push({ n, score, heading, snip });
    });
    hits.sort((a, b) => b.score - a.score);
    const mark = (s) => { let h = escapeHtml(s); for (const t of terms) h = h.replace(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), (m) => `<mark>${m}</mark>`); return h; };
    results.innerHTML = hits.length
      ? hits.slice(0, 12).map((h) =>
          `<a href="${noteHref(h.n.path, h.heading)}"><div class="r-title">${escapeHtml(h.n.title)}${h.heading ? " › " + escapeHtml(h.heading.replace(/[=*]/g, "")) : ""}</div><div class="r-snip">${mark(h.snip)}</div></a>`).join("")
      : `<div class="r-empty">Nothing found for “${escapeHtml(q)}”.</div>`;
    results.hidden = false;
  }

  // ---------- theme ----------
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    $("#hl-light").disabled = t === "dark";
    $("#hl-dark").disabled = t !== "dark";
  }
  let stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) { /* storage blocked */ }
  applyTheme(stored || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  $("#theme-btn").addEventListener("click", () => {
    const t = isDark() ? "light" : "dark";
    applyTheme(t);
    try { localStorage.setItem("theme", t); } catch (e) { /* ignore */ }
    initMermaid();
    for (const b of content.querySelectorAll(".mermaid-box")) { delete b.dataset.done; b.classList.remove("error"); }
    renderMermaid(content);
  });

  // ---------- mobile sidebar ----------
  function closeSidebar() { $("#sidebar").classList.remove("open"); $("#scrim").hidden = true; }
  const isPhone = () => matchMedia("(max-width: 820px)").matches;
  function setPanel(cls, hide) {
    document.body.classList.toggle(cls, hide);
    try { localStorage.setItem(cls, hide ? "1" : ""); } catch (e) { /* ignore */ }
  }
  function toggleLeft() {
    if (isPhone()) {
      const open = !$("#sidebar").classList.contains("open");
      $("#sidebar").classList.toggle("open", open); $("#scrim").hidden = !open;
    } else {
      setPanel("hide-left", !document.body.classList.contains("hide-left"));
    }
  }
  function toggleRight() { setPanel("hide-right", !document.body.classList.contains("hide-right")); }
  for (const cls of ["hide-left", "hide-right"]) {
    try { if (localStorage.getItem(cls)) document.body.classList.add(cls); } catch (e) { /* ignore */ }
  }
  $("#menu-btn").addEventListener("click", toggleLeft);
  $("#toc-btn").addEventListener("click", toggleRight);
  // keyboard: [ toggles the notes panel, ] toggles "On this page"
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || (e.target.closest && e.target.closest("input, textarea"))) return;
    if (e.key === "[") toggleLeft();
    else if (e.key === "]") toggleRight();
  });
  $("#scrim").addEventListener("click", closeSidebar);

  // ---------- start ----------
  async function start() {
    initMermaid();
    try {
      notes = await (await fetch("notes.json", { cache: "no-cache" })).json();
    } catch (e) {
      content.innerHTML = "<h1>Could not load notes.json</h1><p>Run <code>python3 build-site-index.py</code> in the repository and push again.</p>";
      return;
    }
    for (const n of notes) { byName.set(n.title.toLowerCase(), n); byName.set(n.path.toLowerCase(), n); }
    buildSidebar();
    window.addEventListener("hashchange", show);
    show();
  }
  start();
})();
