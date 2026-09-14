/* ============================================================================
   TOEIC VOCAB — LOGIC ỨNG DỤNG
   Phụ thuộc: biến toàn cục TOEIC_DATA (được nhúng phía trên trong index.html)
   Không dùng framework, không phụ thuộc mạng -> tải nhanh, chạy offline.
   ============================================================================ */
(function () {
  'use strict';

  /* ---------- Lớp lưu trữ (localStorage + dự phòng bộ nhớ tạm) ---------- */
  var store = (function () {
    var ok = true, mem = {};
    try { localStorage.setItem('__t', '1'); localStorage.removeItem('__t'); }
    catch (e) { ok = false; }
    return {
      available: ok,
      get: function (k) { try { return ok ? localStorage.getItem(k) : (k in mem ? mem[k] : null); } catch (e) { return (k in mem ? mem[k] : null); } },
      set: function (k, v) { try { ok ? localStorage.setItem(k, v) : (mem[k] = v); } catch (e) { mem[k] = v; } },
      remove: function (k) { try { ok ? localStorage.removeItem(k) : (delete mem[k]); } catch (e) { delete mem[k]; } }
    };
  })();

  var K_USER = 'toeic_user_v1';
  var K_SET = 'toeic_settings_v1';

  /* ---------- Trạng thái người dùng ---------- */
  function loadJSON(k, fb) { try { var s = store.get(k); return s ? JSON.parse(s) : fb; } catch (e) { return fb; } }
  var userData = loadJSON(K_USER, { families: [], structures: [] });
  if (!userData.families) userData.families = [];
  if (!userData.structures) userData.structures = [];
  var settings = loadJSON(K_SET, { theme: 'light' });

  function saveUser() { store.set(K_USER, JSON.stringify(userData)); }
  function saveSettings() { store.set(K_SET, JSON.stringify(settings)); }

  /* ---------- Trạng thái giao diện ---------- */
  var state = {
    view: 'study',        // study | quiz | add | backup
    cat: 'all',           // all | n | v | adj | adv | struct
    search: '',
    quizType: 'meaning',  // meaning | word | mixed | after | smeaning | smixed
    quizCount: 10,
    quiz: null,
    addType: 'word'
  };

  /* ---------- Nhãn & màu loại từ ---------- */
  var POS = {
    n:   { full: 'Danh từ',  cls: 'pos-n' },
    v:   { full: 'Động từ',  cls: 'pos-v' },
    adj: { full: 'Tính từ',  cls: 'pos-adj' },
    adv: { full: 'Trạng từ', cls: 'pos-adv' },
    prep:{ full: 'Giới từ',  cls: 'pos-prep' },
    phr: { full: 'Cụm từ',   cls: 'pos-phr' }
  };
  var CATS = [
    { id: 'all',    label: 'Tổng hợp' },
    { id: 'v',      label: 'Động từ' },
    { id: 'n',      label: 'Danh từ' },
    { id: 'adj',    label: 'Tính từ' },
    { id: 'adv',    label: 'Trạng từ' },
    { id: 'struct', label: 'Cấu trúc' }
  ];

  /* ---------- Truy xuất dữ liệu gộp (gốc + người dùng thêm) ---------- */
  function families() { return TOEIC_DATA.families.concat(userData.families); }
  function structures() { return TOEIC_DATA.structures.concat(userData.structures); }

  function wordItems() {
    var out = [];
    families().forEach(function (f) {
      (f.forms || []).forEach(function (fm, i) {
        out.push({
          id: 'w:' + f.id + ':' + i,
          kind: 'word', w: fm.w, pos: fm.pos, vi: fm.vi,
          base: f.base, familyId: f.id, syn: f.syn || [], example: f.example || ''
        });
      });
    });
    return out;
  }
  function structItems() {
    return structures().map(function (s) {
      return {
        id: 's:' + s.id, kind: 'struct', pattern: s.pattern, after: s.after,
        vi: s.vi, group: s.group || 'Khác', example: s.example || ''
      };
    });
  }

  function itemsForCat(cat, includeAllStructs) {
    if (cat === 'struct') return structItems();
    if (cat === 'n' || cat === 'v' || cat === 'adj' || cat === 'adv') {
      return wordItems().filter(function (it) { return it.pos === cat; });
    }
    // 'all'
    return includeAllStructs ? wordItems().concat(structItems()) : wordItems();
  }

  /* ---------- Tiện ích ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFC'); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function sampleDistinct(pool, n, key, exclude) {
    var seen = {}, out = [];
    if (exclude != null) seen[exclude] = true;
    shuffle(pool).forEach(function (x) {
      var k = key(x);
      if (!seen[k]) { seen[k] = true; out.push(x); }
    });
    return out.slice(0, n);
  }
  function posPill(pos) { var p = POS[pos] || POS.phr; return '<span class="pill ' + p.cls + '">' + p.full + '</span>'; }
  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  /* ---------- Điều hướng & khung ---------- */
  var viewEl, navEls;
  function nav(view) { state.view = view; state.quiz = null; render(); }
  function setActiveNav() {
    navEls.forEach(function (b) { b.classList.toggle('active', b.dataset.view === state.view); });
  }

  function catChips() {
    return '<div class="chips" role="tablist" aria-label="Nhóm ôn tập">' + CATS.map(function (c) {
      return '<button class="chip' + (state.cat === c.id ? ' active' : '') + '" data-action="setcat" data-cat="' + c.id + '" role="tab" aria-selected="' + (state.cat === c.id) + '">' + esc(c.label) + '</button>';
    }).join('') + '</div>';
  }

  function render() {
    setActiveNav();
    if (state.view === 'study') renderStudy();
    else if (state.view === 'quiz') renderQuiz();
    else if (state.view === 'add') renderAdd();
    else if (state.view === 'backup') renderBackup();
    viewEl.scrollTop = 0;
    try { window.scrollTo(0, 0); } catch (e) {}
  }

  /* ============================ HỌC ============================ */
  function renderStudy() {
    var html = '';
    html += catChips();
    html += '<div class="toolbar">' +
      '<div class="search"><svg viewBox="0 0 24 24" class="ic"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
      '<input id="search" type="search" inputmode="search" placeholder="Tìm từ hoặc nghĩa..." value="' + esc(state.search) + '" aria-label="Tìm kiếm"></div>' +
      '</div>';

    var content = state.cat === 'all' ? studyAll() : (state.cat === 'struct' ? studyStructs() : studyPos(state.cat));
    html += '<div id="study-content">' + content + '</div>';

    viewEl.innerHTML = html;
  }

  // Tổng hợp: hiển thị theo họ từ (bảng wordform) — dạng tra cứu
  function studyAll() {
    var q = norm(state.search);
    var list = families().filter(function (f) {
      if (!q) return true;
      if (norm(f.base).indexOf(q) >= 0) return true;
      if ((f.syn || []).some(function (s) { return norm(s).indexOf(q) >= 0; })) return true;
      return (f.forms || []).some(function (fm) { return norm(fm.w).indexOf(q) >= 0 || norm(fm.vi).indexOf(q) >= 0; });
    });
    if (!list.length) return emptyState('Không tìm thấy họ từ nào khớp.');
    var out = '<div class="hint-line">' + list.length + ' họ từ · chạm tiêu đề để thu gọn</div><div class="fam-list">';
    out += list.map(function (f) {
      var rows = (f.forms || []).map(function (fm) {
        return '<div class="fam-row">' +
          posPill(fm.pos) +
          '<span class="fam-word">' + esc(fm.w) + '</span>' +
          '<span class="fam-vi">' + esc(fm.vi) + '</span></div>';
      }).join('');
      var syn = (f.syn && f.syn.length) ? '<div class="fam-syn">≈ ' + f.syn.map(esc).join(', ') + '</div>' : '';
      var note = f.note ? '<div class="fam-note">' + esc(f.note) + '</div>' : '';
      var tag = f.id.indexOf('uf_') === 0 ? '<span class="tag-user">bạn thêm</span>' : '';
      return '<section class="fam-card"><button class="fam-head" data-action="fam-toggle">' +
        '<span class="fam-base">' + esc(f.base) + '</span>' + tag +
        '<span class="fam-count">' + (f.forms || []).length + ' dạng</span>' + chevronIcon() + '</button>' +
        '<div class="fam-body">' + rows + syn + note + '</div></section>';
    }).join('');
    out += '</div>';
    return out;
  }

  // Danh từ / Động từ / Tính từ / Trạng từ: thẻ ghi nhớ (chạm để lật nghĩa)
  function studyPos(cat) {
    var q = norm(state.search);
    var items = itemsForCat(cat, false).filter(function (it) {
      if (!q) return true;
      return norm(it.w).indexOf(q) >= 0 || norm(it.vi).indexOf(q) >= 0;
    });
    // gộp trùng từ (cùng chữ + cùng nghĩa) để tránh lặp
    var seen = {}, uniq = [];
    items.forEach(function (it) { var k = it.w + '|' + it.vi; if (!seen[k]) { seen[k] = true; uniq.push(it); } });
    if (!uniq.length) return emptyState('Chưa có từ nào ở mục này.');
    return '<div class="hint-line">' + uniq.length + ' từ · chạm thẻ để xem nghĩa</div><div class="card-grid">' +
      uniq.map(function (it) { return flashCard(it); }).join('') + '</div>';
  }

  function studyStructs() {
    var q = norm(state.search);
    var items = structItems().filter(function (it) {
      if (!q) return true;
      return norm(it.pattern).indexOf(q) >= 0 || norm(it.vi).indexOf(q) >= 0;
    });
    if (!items.length) return emptyState('Không có cấu trúc nào khớp.');
    // nhóm theo group
    var groups = {};
    items.forEach(function (it) { (groups[it.group] = groups[it.group] || []).push(it); });
    var out = '<div class="hint-line">' + items.length + ' cấu trúc · chạm thẻ để xem chi tiết</div>';
    Object.keys(groups).forEach(function (g) {
      out += '<h3 class="group-h">' + esc(g) + '</h3><div class="card-grid">' +
        groups[g].map(function (it) { return structCard(it); }).join('') + '</div>';
    });
    return out;
  }

  function flashCard(it) {
    var p = POS[it.pos] || POS.phr;
    return '<div class="fcard ' + p.cls + '" data-action="reveal" data-id="' + it.id + '">' +
      '<div class="fcard-top">' + posPill(it.pos) + '</div>' +
      '<div class="fcard-term">' + esc(it.w) + '</div>' +
      '<div class="fcard-meaning">' + esc(it.vi) +
        ((it.syn && it.syn.length) ? '<div class="fcard-sub">≈ ' + it.syn.map(esc).join(', ') + '</div>' : '') +
        (it.example ? '<div class="fcard-sub">“' + esc(it.example) + '”</div>' : '') +
      '</div>' +
      '<div class="fcard-hint">Chạm để xem nghĩa</div></div>';
  }

  function structCard(it) {
    return '<div class="fcard pos-struct" data-action="reveal" data-id="' + it.id + '">' +
      '<div class="fcard-top"><span class="pill pos-struct">Cấu trúc</span></div>' +
      '<div class="fcard-term struct-term">' + esc(it.pattern) + '</div>' +
      '<div class="fcard-meaning"><div class="struct-after">theo sau bởi <b>' + esc(it.after) + '</b></div>' +
        '<div>' + esc(it.vi) + '</div>' +
        (it.example ? '<div class="fcard-sub">“' + esc(it.example) + '”</div>' : '') +
      '</div>' +
      '<div class="fcard-hint">Chạm để xem chi tiết</div></div>';
  }

  function emptyState(msg) { return '<div class="empty">' + esc(msg) + '</div>'; }

  /* ============================ KIỂM TRA (QUIZ) ============================ */
  function renderQuiz() {
    if (state.quiz) return renderQuizRunner();
    // màn hình thiết lập
    var isStruct = state.cat === 'struct';
    // đồng bộ loại quiz với nhóm
    if (isStruct && ['meaning', 'word', 'mixed'].indexOf(state.quizType) >= 0) state.quizType = 'after';
    if (!isStruct && ['after', 'smeaning', 'smixed'].indexOf(state.quizType) >= 0) state.quizType = 'meaning';

    var types = isStruct
      ? [{ id: 'after', label: 'Theo sau là gì?' }, { id: 'smeaning', label: 'Nghĩa cấu trúc' }, { id: 'smixed', label: 'Trộn cả hai' }]
      : [{ id: 'meaning', label: 'Từ → nghĩa' }, { id: 'word', label: 'Nghĩa → từ' }, { id: 'mixed', label: 'Trộn cả hai' }];

    var pool = itemsForCat(state.cat, true);
    var counts = [10, 20, 30].filter(function (n) { return n < pool.length; });
    counts.push(pool.length); // tất cả
    if (state.quizCount > pool.length) state.quizCount = pool.length;

    var html = catChips();
    html += '<div class="setup">';
    html += '<h2 class="setup-h">Chọn kiểu câu hỏi</h2>';
    html += '<div class="seg">' + types.map(function (t) {
      return '<button class="seg-btn' + (state.quizType === t.id ? ' active' : '') + '" data-action="qtype" data-qt="' + t.id + '">' + esc(t.label) + '</button>';
    }).join('') + '</div>';

    html += '<h2 class="setup-h">Số câu hỏi</h2>';
    html += '<div class="seg">' + counts.map(function (n, i) {
      var label = (n === pool.length ? 'Tất cả (' + n + ')' : String(n));
      return '<button class="seg-btn' + (state.quizCount === n ? ' active' : '') + '" data-action="qcount" data-n="' + n + '">' + label + '</button>';
    }).join('') + '</div>';

    html += '<button class="btn-primary block" data-action="start-quiz"' + (pool.length < 2 ? ' disabled' : '') + '>Bắt đầu ôn (' + Math.min(state.quizCount, pool.length) + ' câu)</button>';
    if (pool.length < 2) html += '<div class="empty">Cần ít nhất 2 mục ở nhóm này để tạo quiz.</div>';
    html += '</div>';
    viewEl.innerHTML = html;
  }

  function buildQuestions() {
    var cat = state.cat, type = state.quizType, count = state.quizCount;
    var pool = shuffle(itemsForCat(cat, true));
    var wordPool = wordItems();
    var afterValues = uniqueAfterValues();
    var picked = pool.slice(0, count);

    return picked.map(function (it) {
      var kind;
      if (it.kind === 'struct') {
        kind = (cat === 'struct') ? (type === 'smixed' ? pick(['after', 'smeaning']) : type) : 'after';
      } else {
        kind = (type === 'mixed') ? pick(['meaning', 'word']) : (type === 'word' ? 'word' : 'meaning');
      }
      return makeQuestion(it, kind, wordPool, afterValues);
    });
  }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function uniqueAfterValues() { var s = {}; structItems().forEach(function (x) { s[x.after] = true; }); return Object.keys(s); }

  function makeQuestion(it, kind, wordPool, afterValues) {
    var q = { ref: it.id, explain: '' };
    if (kind === 'meaning') {
      var d = sampleDistinct(wordPool.filter(function (x) { return x.pos === it.pos; }), 3, function (x) { return x.vi; }, it.vi);
      var opts = shuffle([{ t: it.vi, ok: true }].concat(d.map(function (x) { return { t: x.vi, ok: false }; })));
      q.prompt = esc(it.w); q.promptSub = (POS[it.pos] || POS.phr).full; q.promptCls = (POS[it.pos] || POS.phr).cls;
      q.question = 'Từ này nghĩa là gì?';
      q.options = opts.map(function (o) { return o.t; }); q.correct = opts.map(function (o) { return o.ok; }).indexOf(true);
      q.explain = it.w + ' (' + (POS[it.pos] || POS.phr).full + ') = ' + it.vi + (it.syn && it.syn.length ? '  ·  ≈ ' + it.syn.join(', ') : '');
    } else if (kind === 'word') {
      var d2 = sampleDistinct(wordPool.filter(function (x) { return x.pos === it.pos; }), 3, function (x) { return x.w; }, it.w);
      var opts2 = shuffle([{ t: it.w, ok: true }].concat(d2.map(function (x) { return { t: x.w, ok: false }; })));
      q.prompt = esc(it.vi); q.promptSub = 'Từ loại: ' + (POS[it.pos] || POS.phr).full;
      q.question = 'Từ nào mang nghĩa này?';
      q.options = opts2.map(function (o) { return o.t; }); q.correct = opts2.map(function (o) { return o.ok; }).indexOf(true);
      q.explain = it.w + ' (' + (POS[it.pos] || POS.phr).full + ') = ' + it.vi;
    } else if (kind === 'after') {
      var others = afterValues.filter(function (v) { return v !== it.after; });
      var d3 = shuffle(others).slice(0, 3);
      var opts3 = shuffle([{ t: it.after, ok: true }].concat(d3.map(function (v) { return { t: v, ok: false }; })));
      q.prompt = esc(it.pattern); q.promptSub = 'Cấu trúc'; q.promptCls = 'pos-struct';
      q.question = 'Theo sau cấu trúc này là gì?';
      q.options = opts3.map(function (o) { return o.t; }); q.correct = opts3.map(function (o) { return o.ok; }).indexOf(true);
      q.explain = it.pattern + ' + ' + it.after + '  —  ' + it.vi + (it.example ? '  ·  vd: ' + it.example : '');
    } else { // smeaning
      var d4 = sampleDistinct(structItems(), 3, function (x) { return x.vi; }, it.vi);
      var opts4 = shuffle([{ t: it.vi, ok: true }].concat(d4.map(function (x) { return { t: x.vi, ok: false }; })));
      q.prompt = esc(it.pattern); q.promptSub = 'Cấu trúc'; q.promptCls = 'pos-struct';
      q.question = 'Cấu trúc này nghĩa là gì?';
      q.options = opts4.map(function (o) { return o.t; }); q.correct = opts4.map(function (o) { return o.ok; }).indexOf(true);
      q.explain = it.pattern + ' + ' + it.after + ' = ' + it.vi;
    }
    return q;
  }

  function startQuiz() {
    var qs = buildQuestions();
    if (qs.length < 1) { toast('Không đủ dữ liệu để tạo quiz.'); return; }
    state.quiz = { qs: qs, i: 0, score: 0, answered: false, chosen: -1, wrong: [] };
    render();
  }

  function renderQuizRunner() {
    var qz = state.quiz, q = qz.qs[qz.i];
    var html = '<div class="quiz-bar"><button class="btn-ghost" data-action="quiz-exit">✕ Thoát</button>' +
      '<div class="quiz-count">Câu ' + (qz.i + 1) + '/' + qz.qs.length + '</div>' +
      '<div class="quiz-score">' + qz.score + ' đúng</div></div>';
    var qpct = Math.round(qz.i / qz.qs.length * 100);
    html += '<div class="bar quiz-progress"><span style="width:' + qpct + '%"></span></div>';

    html += '<div class="q-prompt">' +
      '<div class="q-sub' + (q.promptCls ? ' ' + q.promptCls + '-ink' : '') + '">' + esc(q.promptSub) + '</div>' +
      '<div class="q-term' + (q.promptCls ? ' ' + q.promptCls + '-ink' : '') + '">' + q.prompt + '</div>' +
      '<div class="q-ask">' + esc(q.question) + '</div></div>';

    html += '<div class="opts">';
    q.options.forEach(function (opt, idx) {
      var cls = 'opt';
      if (qz.answered) {
        if (idx === q.correct) cls += ' correct';
        else if (idx === qz.chosen) cls += ' wrong';
        else cls += ' dim';
      }
      html += '<button class="' + cls + '" data-action="answer" data-idx="' + idx + '"' + (qz.answered ? ' disabled' : '') + '>' + esc(opt) + '</button>';
    });
    html += '</div>';

    if (qz.answered) {
      var right = qz.chosen === q.correct;
      html += '<div class="feedback ' + (right ? 'good' : 'bad') + '">' +
        '<b>' + (right ? 'Chính xác!' : 'Chưa đúng.') + '</b> ' + esc(q.explain) + '</div>';
      var last = qz.i === qz.qs.length - 1;
      html += '<button class="btn-primary block" data-action="quiz-next">' + (last ? 'Xem kết quả' : 'Câu tiếp →') + '</button>';
    }
    viewEl.innerHTML = html;
  }

  function answerQuiz(idx) {
    var qz = state.quiz; if (qz.answered) return;
    qz.answered = true; qz.chosen = idx;
    var q = qz.qs[qz.i];
    if (idx === q.correct) { qz.score++; }
    else { qz.wrong.push(q); }
    renderQuizRunner();
  }
  function nextQuiz() {
    var qz = state.quiz;
    if (qz.i < qz.qs.length - 1) { qz.i++; qz.answered = false; qz.chosen = -1; renderQuizRunner(); }
    else renderQuizResult();
  }

  function renderQuizResult() {
    var qz = state.quiz, total = qz.qs.length, pct = Math.round(qz.score / total * 100);
    var msg = pct >= 90 ? 'Xuất sắc!' : pct >= 70 ? 'Tốt lắm!' : pct >= 50 ? 'Khá ổn, ôn thêm nhé.' : 'Cần luyện thêm.';
    var html = '<div class="result"><div class="result-ring" style="--p:' + pct + '"><div class="result-pct">' + pct + '%</div></div>' +
      '<div class="result-msg">' + esc(msg) + '</div>' +
      '<div class="result-score">' + qz.score + '/' + total + ' câu đúng</div></div>';
    if (qz.wrong.length) {
      html += '<h3 class="group-h">Cần ôn lại (' + qz.wrong.length + ')</h3><div class="wrong-list">';
      html += qz.wrong.map(function (q) {
        return '<div class="wrong-item"><div class="wrong-term">' + q.prompt + '</div><div class="wrong-ans">' + esc(q.explain) + '</div></div>';
      }).join('');
      html += '</div>';
    } else {
      html += '<div class="empty">Bạn trả lời đúng tất cả 🎉</div>';
    }
    html += '<div class="result-actions">';
    if (qz.wrong.length) html += '<button class="btn-primary block" data-action="quiz-retry-wrong">Ôn lại ' + qz.wrong.length + ' từ sai</button>';
    html += '<button class="btn-outline block" data-action="quiz-again">Làm bộ mới</button>';
    html += '<button class="btn-ghost block" data-action="quiz-exit">Xong</button></div>';
    state.quiz.done = true;
    viewEl.innerHTML = html;
  }
  function retryWrong() {
    var wrong = state.quiz.wrong.slice();
    // dựng lại câu hỏi mới từ ref các từ sai để đảo đáp án
    var byId = {}; wordItems().concat(structItems()).forEach(function (it) { byId[it.id] = it; });
    var qs = wrong.map(function (q) {
      var it = byId[q.ref]; if (!it) return q;
      var kind = it.kind === 'struct' ? 'after' : 'meaning';
      // cố gắng giữ nguyên kiểu câu hỏi ban đầu dựa trên câu hỏi
      if (/nghĩa là gì/.test(q.question)) kind = it.kind === 'struct' ? 'smeaning' : 'meaning';
      else if (/Từ nào/.test(q.question)) kind = 'word';
      else if (/Theo sau/.test(q.question)) kind = 'after';
      return makeQuestion(it, kind, wordItems(), uniqueAfterValues());
    });
    state.quiz = { qs: shuffle(qs), i: 0, score: 0, answered: false, chosen: -1, wrong: [] };
    render();
  }

  /* ============================ THÊM TỪ ============================ */
  function renderAdd() {
    var isWord = state.addType === 'word';
    var html = '<div class="setup">';
    html += '<div class="seg"><button class="seg-btn' + (isWord ? ' active' : '') + '" data-action="addtype" data-t="word">Thêm từ vựng</button>' +
      '<button class="seg-btn' + (!isWord ? ' active' : '') + '" data-action="addtype" data-t="struct">Thêm cấu trúc</button></div>';

    if (isWord) {
      html += '<div class="form">' +
        field('add-w', 'Từ (tiếng Anh) *', '<input id="add-w" type="text" autocomplete="off" placeholder="vd: negotiate">') +
        field('add-pos', 'Loại từ *',
          '<select id="add-pos"><option value="v">Động từ</option><option value="n">Danh từ</option><option value="adj">Tính từ</option><option value="adv">Trạng từ</option><option value="prep">Giới từ</option><option value="phr">Cụm từ</option></select>') +
        field('add-vi', 'Nghĩa (tiếng Việt) *', '<input id="add-vi" type="text" placeholder="vd: đàm phán, thương lượng">') +
        field('add-base', 'Nhóm họ từ (tùy chọn)', '<input id="add-base" type="text" placeholder="Gõ từ gốc để gộp cùng họ, vd: negotiate">' ) +
        field('add-syn', 'Từ đồng nghĩa (tùy chọn, cách nhau dấu phẩy)', '<input id="add-syn" type="text" placeholder="vd: bargain, discuss">') +
        field('add-ex', 'Ví dụ (tùy chọn)', '<input id="add-ex" type="text" placeholder="vd: negotiate a contract">') +
        '<button class="btn-primary block" data-action="save-word">Lưu từ</button></div>';
    } else {
      html += '<div class="form">' +
        field('add-pat', 'Cấu trúc *', '<input id="add-pat" type="text" placeholder="vd: rather than">') +
        field('add-after', 'Theo sau bởi *',
          '<select id="add-after"><option value="S + V">S + V (mệnh đề)</option><option value="N">N (danh từ)</option><option value="V-ing">V-ing</option><option value="N / V-ing">N / V-ing</option><option value="to V">to V</option><option value="adj/adv">adj/adv</option></select>') +
        field('add-svi', 'Nghĩa *', '<input id="add-svi" type="text" placeholder="vd: thay vì">') +
        field('add-sgroup', 'Nhóm (tùy chọn)', '<input id="add-sgroup" type="text" placeholder="vd: Liên từ khác">') +
        field('add-sex', 'Ví dụ (tùy chọn)', '<input id="add-sex" type="text" placeholder="vd: rather than complain">') +
        '<button class="btn-primary block" data-action="save-struct">Lưu cấu trúc</button></div>';
    }
    html += '</div>';

    // danh sách đã thêm
    var uw = userData.families.reduce(function (a, f) { return a + (f.forms ? f.forms.length : 0); }, 0);
    var us = userData.structures.length;
    html += '<h3 class="group-h">Bạn đã thêm — ' + uw + ' từ, ' + us + ' cấu trúc</h3>';
    if (!uw && !us) html += '<div class="empty">Chưa có mục nào bạn tự thêm.</div>';
    else {
      html += '<div class="user-list">';
      userData.families.forEach(function (f) {
        (f.forms || []).forEach(function (fm, i) {
          html += '<div class="user-row">' + posPill(fm.pos) + '<span class="fam-word">' + esc(fm.w) + '</span><span class="fam-vi">' + esc(fm.vi) + '</span>' +
            '<button class="del" data-action="del-word" data-fid="' + f.id + '" data-i="' + i + '" aria-label="Xóa">' + trashIcon() + '</button></div>';
        });
      });
      userData.structures.forEach(function (s) {
        html += '<div class="user-row"><span class="pill pos-struct">Cấu trúc</span><span class="fam-word">' + esc(s.pattern) + '</span><span class="fam-vi">+ ' + esc(s.after) + ' · ' + esc(s.vi) + '</span>' +
          '<button class="del" data-action="del-struct" data-sid="' + s.id + '" aria-label="Xóa">' + trashIcon() + '</button></div>';
      });
      html += '</div>';
    }
    viewEl.innerHTML = html;
  }
  function field(id, label, input) {
    return '<label class="fld"><span class="fld-label">' + esc(label) + '</span>' + input + '</label>';
  }

  function saveWord() {
    var w = val('add-w'), pos = val('add-pos'), vi = val('add-vi'), base = val('add-base'), syn = val('add-syn'), ex = val('add-ex');
    if (!w || !vi) { toast('Nhập ít nhất "Từ" và "Nghĩa".'); return; }
    var synArr = syn ? syn.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [];
    var baseKey = (base || w).trim();
    // tìm họ từ đã có (chỉ trong phần người dùng thêm) để gộp
    var fam = userData.families.filter(function (f) { return norm(f.base) === norm(baseKey); })[0];
    if (!fam) { fam = { id: 'uf_' + Date.now() + '_' + Math.floor(Math.random() * 1000), base: baseKey, syn: synArr, forms: [] }; userData.families.push(fam); }
    else if (synArr.length) { fam.syn = Array.from(new Set((fam.syn || []).concat(synArr))); }
    fam.forms.push({ w: w, pos: pos, vi: vi });
    if (ex) fam.example = ex;
    saveUser(); toast('Đã thêm “' + w + '”.'); renderAdd();
  }
  function saveStruct() {
    var pat = val('add-pat'), after = val('add-after'), vi = val('add-svi'), g = val('add-sgroup'), ex = val('add-sex');
    if (!pat || !vi) { toast('Nhập ít nhất "Cấu trúc" và "Nghĩa".'); return; }
    userData.structures.push({ id: 'us_' + Date.now() + '_' + Math.floor(Math.random() * 1000), pattern: pat, after: after, vi: vi, group: g || 'Bạn tự thêm', example: ex });
    saveUser(); toast('Đã thêm cấu trúc.'); renderAdd();
  }
  function delWord(fid, i) {
    var fam = userData.families.filter(function (f) { return f.id === fid; })[0];
    if (!fam) return;
    fam.forms.splice(i, 1);
    if (!fam.forms.length) userData.families = userData.families.filter(function (f) { return f.id !== fid; });
    saveUser(); renderAdd();
  }
  function delStruct(sid) {
    userData.structures = userData.structures.filter(function (s) { return s.id !== sid; });
    saveUser(); renderAdd();
  }
  function val(id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; }

  /* ============================ SAO LƯU ============================ */
  function renderBackup() {
    var uw = userData.families.reduce(function (a, f) { return a + (f.forms ? f.forms.length : 0); }, 0);
    var html = '<div class="setup">';
    html += '<div class="info-card">Tiến độ và các từ bạn tự thêm được lưu <b>trên chính thiết bị này</b> (trình duyệt). ' +
      'Để mang sang máy/điện thoại khác, hãy tải file sao lưu rồi khôi phục ở thiết bị kia.' +
      (store.available ? '' : '<div class="warn">⚠ Trình duyệt đang chặn bộ nhớ cục bộ — dữ liệu sẽ mất khi đóng tab. Hãy tải sao lưu thường xuyên.</div>') + '</div>';

    html += '<div class="stat-grid">' +
      stat(uw, 'từ tự thêm') + stat(userData.structures.length, 'cấu trúc tự thêm') + '</div>';

    html += '<button class="btn-primary block" data-action="export">⬇ Tải file sao lưu (.json)</button>';
    html += '<label class="btn-outline block file-btn">⬆ Khôi phục từ file<input id="importFile" type="file" accept="application/json,.json" hidden></label>';
    html += '<button class="btn-ghost block" data-action="copy">Sao chép dữ liệu vào clipboard</button>';
    html += '<button class="btn-danger block" data-action="reset">Xóa toàn bộ tiến độ & từ đã thêm</button>';
    html += '</div>';
    viewEl.innerHTML = html;
  }
  function stat(n, label) { return '<div class="stat"><div class="stat-n">' + n + '</div><div class="stat-l">' + esc(label) + '</div></div>'; }

  function exportPayload() { return JSON.stringify({ app: 'toeic-vocab', version: 1, exportedAt: new Date().toISOString(), user: userData, settings: settings }, null, 2); }
  function exportData() {
    var blob = new Blob([exportPayload()], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'toeic-vocab-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast('Đã tạo file sao lưu.');
  }
  function copyData() {
    var text = exportPayload();
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { toast('Đã sao chép.'); }, function () { toast('Không sao chép được.'); });
    else toast('Trình duyệt không hỗ trợ sao chép.');
  }
  function importData(file) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var d = JSON.parse(r.result);
        var incUser = d.user || {};
        userData.families = mergeFamilies(userData.families, incUser.families || []);
        userData.structures = mergeById(userData.structures, incUser.structures || []);
        if (d.settings && d.settings.theme) { settings.theme = d.settings.theme; applyTheme(); }
        saveUser(); saveSettings();
        toast('Đã khôi phục dữ liệu.'); render();
      } catch (e) { toast('File không hợp lệ.'); }
    };
    r.readAsText(file);
  }
  function mergeById(a, b) { var ids = {}; a.forEach(function (x) { ids[x.id] = true; }); b.forEach(function (x) { if (!ids[x.id]) a.push(x); }); return a; }
  function mergeFamilies(a, b) {
    var byId = {}; a.forEach(function (f) { byId[f.id] = f; });
    b.forEach(function (f) { if (!byId[f.id]) { a.push(f); byId[f.id] = f; } });
    return a;
  }
  function resetAll() {
    if (!confirm('Xóa toàn bộ từ bạn đã thêm? Không thể hoàn tác.')) return;
    userData = { families: [], structures: [] };
    store.remove(K_USER);
    toast('Đã xóa dữ liệu.'); nav('study');
  }

  /* ---------- Chủ đề sáng/tối ---------- */
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', settings.theme === 'dark' ? 'dark' : 'light');
    var b = document.getElementById('themeBtn');
    if (b) b.setAttribute('aria-label', settings.theme === 'dark' ? 'Chuyển nền sáng' : 'Chuyển nền tối');
  }
  function toggleTheme() { settings.theme = settings.theme === 'dark' ? 'light' : 'dark'; saveSettings(); applyTheme(); }

  /* ---------- Biểu tượng SVG ---------- */
  function chevronIcon() { return '<svg viewBox="0 0 24 24" class="ic chev"><path d="M6 9l6 6 6-6"/></svg>'; }
  function trashIcon() { return '<svg viewBox="0 0 24 24" class="ic"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>'; }

  /* ============================ SỰ KIỆN ============================ */
  function onClick(e) {
    var t = e.target.closest('[data-action]');
    if (!t) return;
    var a = t.dataset.action;
    switch (a) {
      case 'nav': nav(t.dataset.view); break;
      case 'setcat': state.cat = t.dataset.cat; state.search = ''; render(); break;
      case 'theme': toggleTheme(); break;
      case 'fam-toggle': t.closest('.fam-card').classList.toggle('collapsed'); break;
      case 'reveal': t.classList.toggle('revealed'); break;
      case 'qtype': state.quizType = t.dataset.qt; renderQuiz(); break;
      case 'qcount': state.quizCount = parseInt(t.dataset.n, 10); renderQuiz(); break;
      case 'start-quiz': startQuiz(); break;
      case 'answer': answerQuiz(parseInt(t.dataset.idx, 10)); break;
      case 'quiz-next': nextQuiz(); break;
      case 'quiz-exit': state.quiz = null; render(); break;
      case 'quiz-again': state.quiz = null; renderQuiz(); break;
      case 'quiz-retry-wrong': retryWrong(); break;
      case 'addtype': state.addType = t.dataset.t; renderAdd(); break;
      case 'save-word': saveWord(); break;
      case 'save-struct': saveStruct(); break;
      case 'del-word': delWord(t.dataset.fid, parseInt(t.dataset.i, 10)); break;
      case 'del-struct': delStruct(t.dataset.sid); break;
      case 'export': exportData(); break;
      case 'copy': copyData(); break;
      case 'reset': resetAll(); break;
    }
  }
  function onInput(e) {
    if (e.target.id === 'search') { state.search = e.target.value; renderStudyContentOnly(); }
  }
  function onChange(e) {
    if (e.target.id === 'importFile' && e.target.files[0]) { importData(e.target.files[0]); }
  }
  // cập nhật riêng phần nội dung khi gõ tìm kiếm (giữ focus ô input)
  function renderStudyContentOnly() {
    var holder = document.getElementById('study-content');
    if (!holder) { render(); return; }
    holder.innerHTML = state.cat === 'all' ? studyAll() : (state.cat === 'struct' ? studyStructs() : studyPos(state.cat));
  }

  /* ---------- Khởi động ---------- */
  function init() {
    viewEl = document.getElementById('view');
    navEls = Array.prototype.slice.call(document.querySelectorAll('.nav-btn'));
    applyTheme();
    document.addEventListener('click', onClick);
    document.addEventListener('input', onInput);
    document.addEventListener('change', onChange);
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

})();
