const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index.html', 'utf8');
let failed = 0, passed = 0;
function ok(c, m) { if (c) { passed++; } else { failed++; console.log('  ✗ FAIL:', m); } }

const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://example.com/' });
const { window } = dom;
const doc = window.document;

function click(el) { el.dispatchEvent(new window.MouseEvent('click', { bubbles: true })); }
function q(sel) { return doc.querySelector(sel); }
function qa(sel) { return Array.from(doc.querySelectorAll(sel)); }
function navTo(view) { click(qa('.nav-btn').find(b => b.dataset.view === view)); }
function setCat(cat) { click(qa('.chip').find(c => c.dataset.cat === cat)); }

// đợi init (readyState). jsdom chạy đồng bộ sau load; dùng setTimeout để chắc chắn.
setTimeout(() => {
  console.log('== KHỞI ĐỘNG ==');
  ok(q('#view'), 'có #view');
  ok(q('.chip.active'), 'có chip đang chọn');
  ok(q('.fam-card'), 'Tổng hợp hiển thị họ từ');
  console.log(`  Số họ từ hiển thị ban đầu: ${qa('.fam-card').length}`);

  console.log('== KHÔNG CÒN TÍNH NĂNG ĐÁNH DẤU ĐÃ THUỘC ==');
  ok(!q('.mini-check'), 'không còn nút đánh dấu đã thuộc');
  ok(!q('#onlyUnknown'), 'không còn checkbox lọc chỉ từ chưa thuộc');
  ok(window.localStorage.getItem('toeic_known_v1') === null, 'không lưu known vào localStorage');

  console.log('== TÌM KIẾM ==');
  const s = q('#search'); s.value = 'dedicate'; s.dispatchEvent(new window.Event('input', { bubbles: true }));
  const famCount = qa('#study-content .fam-card').length;
  ok(famCount >= 1 && famCount <= 3, 'tìm "dedicate" ra ít họ từ (' + famCount + ')');

  console.log('== NHÓM ĐỘNG TỪ = FLASHCARD ==');
  navTo('study'); // reset render (xoá search)
  setCat('v');
  ok(q('.fcard.pos-v'), 'động từ hiển thị flashcard');
  const fc = q('.fcard');
  ok(q('.fcard-meaning'), 'có phần nghĩa');
  click(fc);
  ok(fc.classList.contains('revealed'), 'chạm thẻ -> revealed');

  console.log('== NHÓM CẤU TRÚC ==');
  setCat('struct');
  ok(q('.fcard.pos-struct'), 'cấu trúc hiển thị');
  ok(q('.group-h'), 'cấu trúc có tiêu đề nhóm');
  ok(qa('.fcard.pos-struct').length >= 20, 'đủ nhiều cấu trúc (' + qa('.fcard.pos-struct').length + ')');

  console.log('== QUIZ: TỪ -> NGHĨA ==');
  navTo('quiz'); setCat('n');
  ok(!q('#preferUnknown'), 'không còn checkbox ưu tiên hỏi từ chưa thuộc');
  click(qa('.seg-btn').find(b => b.dataset.qt === 'meaning'));
  const startBtn = qa('[data-action="start-quiz"]')[0];
  ok(startBtn, 'có nút bắt đầu');
  click(startBtn);
  ok(q('.q-term'), 'quiz hiển thị câu hỏi');
  ok(qa('.opt').length >= 2 && qa('.opt').length <= 4, 'có 2-4 đáp án (' + qa('.opt').length + ')');
  ok(qa('.opt').filter(o => o.textContent.trim()).length === qa('.opt').length, 'đáp án đều có nội dung');
  // luôn chọn đáp án cuối cùng: do đáp án được xáo trộn ngẫu nhiên mỗi câu, gần như chắc chắn
  // sẽ có vài câu sai qua nhiều câu hỏi, đủ để kiểm tra tính năng "ôn lại từ sai"
  const wrongPick = () => { const opts = qa('.opt'); click(opts[opts.length - 1]); };
  wrongPick();
  ok(q('.opt.correct'), 'có đánh dấu đáp án đúng sau khi chọn');
  ok(q('.feedback'), 'hiện giải thích');
  // đi hết quiz, cố tình chọn sai vài câu để có dữ liệu ôn lại
  let guard = 0;
  while (q('[data-action="quiz-next"]') && guard++ < 60) {
    click(q('[data-action="quiz-next"]'));
    if (q('.opt') && !q('.feedback')) wrongPick();
  }
  ok(q('.result-ring') || q('.result-pct'), 'kết thúc -> màn kết quả');
  console.log('  Kết quả: ' + (q('.result-score') ? q('.result-score').textContent : '(n/a)'));

  console.log('== ÔN LẠI TỪ SAI ==');
  const retryBtn = q('[data-action="quiz-retry-wrong"]');
  ok(retryBtn, 'có nút ôn lại từ sai (vì đã cố tình trả lời sai)');
  if (retryBtn) {
    click(retryBtn);
    ok(q('.q-term'), 'ôn lại từ sai -> quiz mới bắt đầu lại');
  }

  console.log('== QUIZ CẤU TRÚC: THEO SAU LÀ GÌ ==');
  navTo('quiz'); setCat('struct');
  click(qa('.seg-btn').find(b => b.dataset.qt === 'after'));
  click(qa('[data-action="start-quiz"]')[0]);
  ok(/Theo sau/.test(q('.q-ask').textContent), 'câu hỏi hỏi "theo sau"');
  const afterOpts = qa('.opt').map(o => o.textContent);
  ok(afterOpts.length >= 2, 'đáp án cấu trúc >=2 (' + afterOpts.length + ')');

  console.log('== THÊM TỪ MỚI ==');
  navTo('add');
  q('#add-w').value = 'negotiate';
  q('#add-pos').value = 'v';
  q('#add-vi').value = 'đàm phán';
  q('#add-syn').value = 'bargain, discuss';
  click(qa('[data-action="save-word"]')[0]);
  const userData = JSON.parse(window.localStorage.getItem('toeic_user_v1'));
  ok(userData.families.length === 1 && userData.families[0].forms[0].w === 'negotiate', 'đã lưu từ mới vào localStorage');
  ok(qa('.user-row').some(r => /negotiate/.test(r.textContent)), 'từ mới xuất hiện trong danh sách đã thêm');

  console.log('== TỪ MỚI HIỆN TRONG NHÓM ĐỘNG TỪ ==');
  navTo('study'); setCat('v');
  ok(qa('.fcard-term').some(t => t.textContent === 'negotiate'), 'negotiate xuất hiện ở nhóm Động từ');

  console.log('== THÊM CẤU TRÚC MỚI ==');
  navTo('add');
  click(qa('[data-action="addtype"]').find(b => b.dataset.t === 'struct'));
  q('#add-pat').value = 'rather than';
  q('#add-after').value = 'V-ing';
  q('#add-svi').value = 'thay vì';
  click(qa('[data-action="save-struct"]')[0]);
  const ud2 = JSON.parse(window.localStorage.getItem('toeic_user_v1'));
  ok(ud2.structures.length === 1, 'đã lưu cấu trúc mới');

  console.log('== XÓA TỪ ĐÃ THÊM ==');
  navTo('add');
  const delBtn = q('[data-action="del-word"]');
  ok(delBtn, 'có nút xóa từ đã thêm');
  click(delBtn);
  const ud3 = JSON.parse(window.localStorage.getItem('toeic_user_v1'));
  ok(ud3.families.length === 0, 'đã xóa từ khỏi localStorage');

  console.log('== SAO LƯU: XUẤT DỮ LIỆU ==');
  navTo('backup');
  ok(q('[data-action="export"]'), 'có nút xuất');
  ok(q('.stat-grid'), 'có thống kê');
  ok(q('#importFile'), 'có ô nhập file khôi phục');

  console.log('== ĐỔI GIAO DIỆN SÁNG/TỐI ==');
  click(q('#themeBtn'));
  ok(doc.documentElement.getAttribute('data-theme') === 'dark', 'chuyển sang nền tối');
  ok(JSON.parse(window.localStorage.getItem('toeic_settings_v1')).theme === 'dark', 'lưu thiết lập nền tối');

  console.log(`\n==== KẾT QUẢ: ${passed} PASS, ${failed} FAIL ====`);
  process.exit(failed ? 1 : 0);
}, 100);
