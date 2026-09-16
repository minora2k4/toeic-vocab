# TOEIC Vocab — Web ôn tập từ vựng & cấu trúc

Ứng dụng web **một file duy nhất** (`index.html`) để ôn từ vựng và cấu trúc TOEIC bằng
thẻ ghi nhớ và quiz. Toàn bộ dữ liệu từ vựng được trích từ sổ tay viết tay và đã mở rộng
đầy đủ các dạng wordform.

> File này là ngữ cảnh cho Claude Code (và cho chính bạn) khi cần chỉnh sửa, mở rộng
> hoặc build lại dự án. Đọc phần **Nguyên tắc bất di bất dịch** trước khi thay đổi code.

---

## 1. Nguyên tắc bất di bất dịch (đọc trước khi sửa)

1. **Giữ một file, không phụ thuộc mạng.** Sản phẩm cuối là `index.html` tự chứa toàn bộ
   HTML + CSS + JS + dữ liệu. **Không** thêm thư viện ngoài, font Google, CDN, hay bước
   build bắt buộc. Lý do: tải tức thì, chạy offline, deploy GitHub Pages chỉ bằng cách thả
   1 file — đúng nhu cầu dùng trên điện thoại.
2. **Không dùng `localStorage`/`sessionStorage` bên trong Artifact của Claude.ai.** Code
   đã có sẵn lớp lưu trữ tự dự phòng sang bộ nhớ tạm nếu `localStorage` bị chặn; giữ nguyên
   cơ chế đó. Khi chạy thật trên GitHub Pages/điện thoại thì `localStorage` hoạt động và
   lưu được tiến độ.
3. **Vanilla JS thuần**, không framework. Ưu tiên đơn giản, nhẹ, độ trễ thấp.
4. **Giao diện tiếng Việt**, mobile-first, hỗ trợ cả nền sáng/tối, chạm tay thoải mái
   (vùng chạm ≥ 40px).
5. Khi sửa dữ liệu từ vựng, **giữ đúng chính tả tiếng Anh và đúng từ loại** (app dùng để
   học nên không được để sai form).

---

## 2. Cách deploy lên GitHub Pages (dùng trên điện thoại)

1. Tạo một repository mới trên GitHub, ví dụ `toeic-vocab`.
2. Tải `index.html` lên **thư mục gốc** của repo (Add file → Upload files → Commit).
3. Vào **Settings → Pages**. Mục *Source* chọn nhánh `main`, thư mục `/ (root)`, bấm *Save*.
4. Đợi ~1 phút, GitHub cấp link dạng `https://<tên-github>.github.io/toeic-vocab/`.
5. Mở link trên điện thoại → **Thêm vào màn hình chính** (Add to Home Screen) để dùng như app.

Cập nhật sau này: sửa `index.html`, commit lại, Pages tự build lại.
Tên file **phải là `index.html`** để Pages phục vụ mặc định.

---

## 3. Tính năng đã có (ánh xạ theo yêu cầu)

| Yêu cầu của bạn | Đã đáp ứng thế nào |
|---|---|
| 1. Nhẹ, mượt, hợp GitHub Pages, dùng điện thoại | 1 file ~95 KB, không phụ thuộc mạng, tải tức thì, offline được |
| 2. Đa nền tảng máy tính & điện thoại | Responsive: 1 cột trên điện thoại, 2 cột thẻ trên màn rộng; thanh điều hướng dưới cùng kiểu app |
| 3. Ôn tập từ phù hợp | Thẻ ghi nhớ (chạm để lật nghĩa) + quiz trắc nghiệm |
| 4. Một từ có nhiều loại; cấu trúc + theo sau là gì | Mỗi từ ghi rõ **loại từ** (mã màu); mỗi cấu trúc ghi rõ **theo sau bởi** `S+V` / `N` / `V-ing`… |
| 5. Lấy hết wordform, phân loại rõ ràng | 192 họ từ → 507 dạng, tách sẵn theo Danh từ / Động từ / Tính từ / Trạng từ / Giới từ; tab **Tổng hợp** hiện cả họ từ theo bảng |
| 6. Tự thêm từ mới (từ, nghĩa, loại) vào list | Tab **Thêm từ**: thêm từ vựng hoặc cấu trúc; tự gộp vào họ từ nếu trùng gốc; lưu vào máy |
| 7. Quiz hỏi nghĩa từ / cấu trúc theo sau | Quiz trắc nghiệm 4 đáp án: Từ→nghĩa, Nghĩa→từ, "Theo sau là gì?", Nghĩa cấu trúc |
| 8. Chia nhóm ôn: Tổng hợp, Trạng từ, Cấu trúc, Danh từ, Động từ, Tính từ | Đúng 7 nhóm này ở cả tab **Học** lẫn tab **Kiểm tra** (đã bổ sung thêm **Giới từ**) |

**Tính năng bổ sung tôi thêm cho trải nghiệm tốt hơn:**
- Quiz chọn số câu (10/20/30/tất cả), màn hình **kết quả** kèm danh sách **từ sai để
  ôn lại** và nút **"Ôn lại từ sai"** (tạo lại đúng những câu vừa trả lời sai, đảo đáp án).
- **Tìm kiếm** nhanh theo từ hoặc nghĩa.
- Hiển thị **từ đồng nghĩa** (các cụm `= …` trong sổ, ví dụ `location = venue = site…`).
- **Nền tối** cho việc học ban đêm trên điện thoại.
- **Sao lưu / khôi phục** dữ liệu bằng file `.json` (vì `localStorage` chỉ nằm trên
  1 thiết bị — xem mục 5).

> **Lưu ý:** App **không có** tính năng đánh dấu "đã thuộc"/lọc từ chưa thuộc — mọi từ và
> cấu trúc luôn hiển thị đầy đủ ở tab Học, và quiz luôn lấy ngẫu nhiên từ toàn bộ nhóm đã
> chọn, để người dùng vẫn ôn lại được cả những từ tưởng đã thuộc. Chỉ có kết quả quiz mới
> phân biệt đúng/sai (qua tính năng "Ôn lại từ sai" ở trên).

---

## 4. Mô hình dữ liệu

Dữ liệu nằm trong biến toàn cục `TOEIC_DATA` (khối `<script>` đầu tiên của `index.html`,
ban đầu là file `data.js`).

### 4.1. Họ từ (`families`)
```js
{
  id: 'f001',                 // định danh duy nhất, họ do người dùng thêm bắt đầu bằng 'uf_'
  base: 'dedicate',           // từ gốc dùng làm tiêu đề nhóm
  syn: ['contribute'],        // (tùy chọn) từ đồng nghĩa, hiển thị dạng "≈ …"
  note: 'keep up with demand…',// (tùy chọn) ghi chú
  forms: [                    // các dạng wordform của cùng gốc
    { w: 'dedicate',   pos: 'v',   vi: 'cống hiến, tận tâm' },
    { w: 'dedicated',  pos: 'adj', vi: 'tận tâm, tận tụy' },
    { w: 'dedication', pos: 'n',   vi: 'sự cống hiến' }
  ]
}
```
`pos` chỉ nhận: `'n'` (danh từ) · `'v'` (động từ) · `'adj'` (tính từ) · `'adv'` (trạng từ)
· `'prep'` (giới từ) · `'phr'` (cụm từ).

### 4.2. Cấu trúc (`structures`)
```js
{
  id: 's001',
  group: 'Nguyên nhân (Bởi vì)', // nhóm để gom lại khi hiển thị
  pattern: 'because / since / as',
  after: 'S + V',                // ĐÁP ÁN cho câu hỏi "theo sau bởi gì?"
  vi: 'bởi vì',
  example: 'because he was late' // (tùy chọn)
}
```
`after` thường là một trong: `S + V`, `N`, `V-ing`, `N / V-ing`, `as`.

### 4.3. Thêm/sửa từ bằng tay (không bắt buộc)
Có thể chỉnh trực tiếp mảng `families` / `structures` trong `index.html`. Người dùng cuối
thì nên dùng **tab Thêm từ** trong app (không cần đụng code).

---

## 5. Lưu trữ & sao lưu

Dùng `localStorage` với 2 khóa:
- `toeic_user_v1` — từ & cấu trúc **người dùng tự thêm** (`{ families, structures }`).
- `toeic_settings_v1` — thiết lập (nền sáng/tối).

Id của một mục (dùng làm `ref` khi tạo câu hỏi quiz, không dùng để đánh dấu tiến độ):
- Dạng từ: `w:<familyId>:<indexTrongForms>` (ví dụ `w:f001:2`).
- Cấu trúc: `s:<structureId>` (ví dụ `s:s001`).

**Lưu ý quan trọng:** `localStorage` gắn với **một trình duyệt trên một thiết bị**. Để
mang từ đã thêm sang máy/điện thoại khác, dùng **tab Sao lưu → Tải file** rồi
**Khôi phục** ở thiết bị kia. Khôi phục là **gộp thêm** (không xóa dữ liệu đang có).

---

## 6. Cấu trúc mã nguồn & build lại

`index.html` được ghép từ 3 phần (trong repo phát triển có thể tách riêng):
- `index.template.html` — khung HTML + toàn bộ CSS + khung điều hướng, có 2 chỗ chèn
  `/*__DATA__*/` và `/*__APP__*/`.
- `data.js` — biến `TOEIC_DATA` (dữ liệu từ vựng).
- `app.js` — toàn bộ logic (IIFE).

Ghép lại thành 1 file bằng Node (nếu máy chưa có Node.js, có thể dùng Python — xem ví dụ
tương đương ở cuối mục này):
```bash
node -e '
const fs=require("fs");
let t=fs.readFileSync("index.template.html","utf8");
t=t.replace("/*__DATA__*/","\n"+fs.readFileSync("data.js","utf8")+"\n");
t=t.replace("/*__APP__*/","\n"+fs.readFileSync("app.js","utf8")+"\n");
fs.writeFileSync("index.html",t);
'
```
Tương đương bằng Python (không cần cài gì thêm nếu máy có sẵn Python 3):
```bash
python3 -c '
data = open("data.js", encoding="utf-8").read()
app = open("app.js", encoding="utf-8").read()
tmpl = open("index.template.html", encoding="utf-8").read()
t = tmpl.replace("/*__DATA__*/", "\n" + data + "\n", 1).replace("/*__APP__*/", "\n" + app + "\n", 1)
open("index.html", "w", encoding="utf-8").write(t)
'
```
> Bạn không bắt buộc phải tách file — chỉ cần `index.html` là chạy được. Việc tách chỉ để
> dễ bảo trì khi sửa nhiều.

### Các hàm/khu vực chính trong `app.js`
- `store` — lớp lưu trữ có dự phòng bộ nhớ tạm.
- `families()`, `structures()`, `wordItems()`, `structItems()`, `itemsForCat(cat)` —
  gộp dữ liệu gốc + người dùng thêm.
- `renderStudy()` → `studyAll()` / `studyPos(cat)` / `studyStructs()` — tab Học.
- `renderQuiz()` → `buildQuestions()` / `makeQuestion()` / `renderQuizRunner()` /
  `renderQuizResult()` — tab Kiểm tra.
- `renderAdd()` / `saveWord()` / `saveStruct()` — tab Thêm từ.
- `renderBackup()` / `exportData()` / `importData()` / `resetAll()` — tab Sao lưu.
- `onClick()` — bộ điều phối sự kiện duy nhất qua thuộc tính `data-action` (không dùng
  `onclick` nội tuyến). Khi thêm nút mới, đặt `data-action="..."` rồi thêm một `case`.

### Kiểm thử
Có `test.js` (dùng `jsdom`) chạy qua toàn bộ luồng chính:
```bash
npm install jsdom && node test.js
```
Khi sửa logic, hãy chạy lại và giữ mọi test PASS.

---

## 7. Ý tưởng nâng cấp (khi cần)

- **Lặp lại ngắt quãng (spaced repetition)** thật sự: lưu thêm mốc thời gian ôn/độ khó
  cho mỗi mục, sắp lịch ôn theo SM-2 đơn giản.
- **Phát âm**: dùng `speechSynthesis` (Web Speech API) đọc từ tiếng Anh — vẫn không cần mạng.
- **PWA offline hoàn toàn**: thêm `manifest.json` + service worker để "cài" như app và
  chạy cả khi mất mạng lần đầu.
- **Chế độ gõ đáp án** (điền từ) thay vì chỉ trắc nghiệm.
- **Thống kê học tập** theo ngày (streak, số từ ôn/ngày).

---

## 8. Ghi chú: các chỗ đã chỉnh so với sổ tay

Khi số hóa, tôi sửa vài lỗi chính tả/từ loại để không học sai:
- `courage` là **danh từ** (sự can đảm); thêm **`courageous` (adj)** = can đảm.
- `encourage` = **khuyến khích, động viên** (sổ ghi "thuyết phục").
- `restrict` là **động từ**; thêm `restricted` (adj), `restriction` (n).
- `intention` là **danh từ**; `patient` là **tính từ/danh từ** (không phải V).
- `effectionally` → **`effectively`**; `to keep with demand` → **`keep up with demand`**.
- Họ `structure`/`construct`/`construction`/`constructive` (sổ viết tắt "constructure").
- Chuẩn hóa chính tả liên từ: `therefore`, `owing to`, `whereas`, `differ`, `nevertheless`…
- `concern (n)` = **mối quan tâm, sự lo ngại** (sổ ghi nhầm "liên quan" — đó là nghĩa của
  `concerning (prep)`, đã tách riêng đúng từ loại).
- `diagnostic (n)` **không có nghĩa "triệu chứng"** (đó là từ khác — `symptom`). Đã thêm
  đúng họ từ `diagnose (v)` / `diagnosis (n)` / `diagnostic (adj)`.
- `determine (v)` = **quyết định, xác định** (không phải "quyết tâm" — nghĩa đó thuộc về
  `determined (adj)`, đã tách riêng).
- `solicit (v)` = **xin, kêu gọi, vận động, mời chào** (sổ ghi thêm "bỏ phiếu" — không đúng
  nghĩa gốc, đã bỏ).
- `relevent` → **`relevant`** (lỗi chính tả).
- `tenant` là **danh từ** (người thuê nhà/mặt bằng), sổ ghi nhầm là động từ "thuê" —
  động từ "thuê" thực chất là `rent`/`lease`.
- `claim (v)` = **khẳng định, tuyên bố; yêu cầu, đòi (quyền lợi/bồi thường)** (sổ ghi gọn
  thành "bồi thường" — chỉ đúng trong ngữ cảnh bảo hiểm, đã bổ sung nghĩa đầy đủ).
- `complimentary (adj)` có **2 nghĩa**: miễn phí *và* mang tính khen ngợi (sổ chỉ ghi
  "miễn phí").
- `neccessary` → **`necessary`** (lỗi chính tả).
- `composed (adj)` (bình tĩnh, điềm tĩnh) khác nghĩa với `compose (v)`/`be composed of`
  (sáng tác / được tạo thành từ) — đã tách rõ trong cùng họ từ để không nhầm lẫn.
- `circular (adj)` chỉ giữ nghĩa **hình tròn** (nghĩa "thông tư, thông báo chung" là cách
  dùng hiếm/trang trọng, không đưa vào để tránh gây nhầm khi ôn thi).

Nếu muốn giữ đúng nguyên văn sổ tay ở điểm nào, cứ chỉnh lại trong `TOEIC_DATA`.
