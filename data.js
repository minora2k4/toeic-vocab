/* ============================================================================
   TOEIC VOCAB — DỮ LIỆU GỐC
   ----------------------------------------------------------------------------
   Trích từ sổ tay viết tay của bạn, đã mở rộng đầy đủ các dạng wordform
   (danh từ / động từ / tính từ / trạng từ) cho mỗi từ.

   CÁCH THÊM / SỬA TỪ TRỰC TIẾP (nếu không muốn dùng nút "Thêm từ" trong app):
     - Mỗi "family" là một họ từ cùng gốc.
       { id, base, syn:[từ đồng nghĩa], note, forms:[ {w, pos, vi} ] }
     - pos nhận 1 trong: 'n' | 'v' | 'adj' | 'adv' | 'prep' | 'phr'
     - vi = nghĩa tiếng Việt.
   Cấu trúc ngữ pháp nằm ở mảng STRUCTURES bên dưới.
   ============================================================================ */

var TOEIC_DATA = {
  version: 1,

  /* ---- CHỦ ĐỀ (dùng cho tab Chủ đề) ---- */
  topics: [
    { id:'contract', en:'Contract', vi:'Hợp đồng' },
    { id:'office', en:'Office', vi:'Văn phòng' },
    { id:'marketing', en:'Marketing', vi:'Tiếp thị' },
    { id:'computer', en:'Computer', vi:'Máy tính' },
    { id:'warranties', en:'Warranties', vi:'Bảo hành' },
    { id:'correspondence', en:'Correspondence', vi:'Thư tín' },
    { id:'salaries_and_benefits', en:'Salaries and Benefits', vi:'Lương và phúc lợi' },
    { id:'conference', en:'Conference', vi:'Hội nghị' },
    { id:'invoice', en:'Invoice', vi:'Hóa đơn' },
    { id:'inventory', en:'Inventory', vi:'Hàng hóa' },
    { id:'job_advertising_and_recruiting', en:'Job Advertising and Recruiting', vi:'Việc làm và tuyển dụng' },
    { id:'applying_and_interviewing', en:'Applying and Interviewing', vi:'Ứng tuyển và phỏng vấn' },
    { id:'banking', en:'Banking', vi:'Ngân hàng' },
    { id:'accounting', en:'Accounting', vi:'Kế toán' },
    { id:'restaurant', en:'Restaurant', vi:'Nhà hàng' },
    { id:'shopping', en:'Shopping', vi:'Mua sắm' },
    { id:'travel', en:'Travel', vi:'Du lịch' }
  ],

  /* ---- HỌ TỪ VỰNG (WORD FAMILIES) ---- */
  families: [
    { id:'f001', base:'dedicate', syn:['contribute'], forms:[
      {w:'dedicate', pos:'v', vi:'cống hiến, tận tâm, dành cho'},
      {w:'dedicated', pos:'adj', vi:'tận tâm, tận tụy, được dành riêng cho'},
      {w:'dedication', pos:'n', vi:'sự cống hiến, tận tâm'},
      {w:'dedicative', pos:'adj', vi:'mang tính cống hiến'},
      {w:'dedicator', pos:'n', vi:'người cống hiến'} ]},

    { id:'f002', base:'instead', forms:[
      {w:'instead', pos:'adv', vi:'thay vào đó'} ]},

    { id:'f003', base:'addition', forms:[
      {w:'addition', pos:'n', vi:'sự thêm vào'},
      {w:'additional', pos:'adj', vi:'thêm, bổ sung'},
      {w:'additionally', pos:'adv', vi:'ngoài ra, hơn nữa'} ]},

    { id:'f004', base:'instance', forms:[
      {w:'instance', pos:'n', vi:'ví dụ, trường hợp'} ]},

    { id:'f005', base:'facility', forms:[
      {w:'facility', pos:'n', vi:'cơ sở, tiện nghi (facilities)'},
      {w:'facilitate', pos:'v', vi:'tạo điều kiện, hỗ trợ'},
      {w:'facilitator', pos:'n', vi:'người hỗ trợ, điều phối'} ]},

    { id:'f006', base:'courage', forms:[
      {w:'courage', pos:'n', vi:'sự can đảm, lòng dũng cảm'},
      {w:'courageous', pos:'adj', vi:'can đảm, dũng cảm'},
      {w:'encourage', pos:'v', vi:'khuyến khích, động viên'},
      {w:'encouraged', pos:'adj', vi:'được khích lệ'},
      {w:'encouraging', pos:'adj', vi:'đầy khích lệ, đáng khích lệ'},
      {w:'encouragement', pos:'n', vi:'sự khích lệ'} ]},

    { id:'f007', base:'charge', forms:[
      {w:'charge', pos:'v', vi:'tính phí; nạp (điện); phụ trách'},
      {w:'charge', pos:'n', vi:'phí, tiền công; sự phụ trách', topics:['invoice']} ]},

    { id:'f008', base:'receipt', syn:['invoice'], forms:[
      {w:'receipt', pos:'n', vi:'biên lai, hóa đơn', topics:['accounting','inventory','invoice','shopping']} ]},

    { id:'f009', base:'payment', forms:[
      {w:'pay', pos:'v', vi:'trả, thanh toán', topics:['contract']},
      {w:'payment', pos:'n', vi:'khoản thanh toán', topics:['contract','invoice','shopping']},
      {w:'payable', pos:'adj', vi:'phải trả, đến hạn trả', topics:['invoice']},
      {w:'payment method', pos:'n', vi:'phương thức thanh toán', topics:['invoice']} ]},

    { id:'f010', base:'cash', forms:[
      {w:'cash', pos:'n', vi:'tiền mặt'} ]},

    { id:'f011', base:'demand', note:'keep up with demand = đáp ứng nhu cầu', forms:[
      {w:'demand', pos:'n', vi:'nhu cầu, sự đòi hỏi'},
      {w:'demand', pos:'v', vi:'đòi hỏi, yêu cầu'} ]},

    { id:'f012', base:'prevent', forms:[
      {w:'prevent', pos:'v', vi:'ngăn chặn, cản trở'},
      {w:'prevention', pos:'n', vi:'sự ngăn chặn'},
      {w:'preventive', pos:'adj', vi:'mang tính phòng ngừa'} ]},

    { id:'f013', base:'annual', forms:[
      {w:'annual', pos:'adj', vi:'hàng năm, thường niên'},
      {w:'annually', pos:'adv', vi:'hàng năm'} ]},

    { id:'f014', base:'purchase', syn:['buy'], forms:[
      {w:'purchase', pos:'v', vi:'mua', topics:['shopping']},
      {w:'purchase', pos:'n', vi:'việc mua, món hàng đã mua'},
      {w:'purchaser', pos:'n', vi:'người mua'} ]},

    { id:'f015', base:'approve', forms:[
      {w:'approve', pos:'v', vi:'phê duyệt, chấp thuận'},
      {w:'approval', pos:'n', vi:'sự phê duyệt'},
      {w:'approved', pos:'adj', vi:'đã được phê duyệt'} ]},

    { id:'f016', base:'revise', forms:[
      {w:'revise', pos:'v', vi:'ôn lại, sửa lại, điều chỉnh'},
      {w:'revision', pos:'n', vi:'sự sửa đổi, bản sửa'} ]},

    { id:'f017', base:'essential', forms:[
      {w:'essential', pos:'adj', vi:'thiết yếu, cần thiết'},
      {w:'essentially', pos:'adv', vi:'về cơ bản'} ]},

    { id:'f018', base:'restrict', forms:[
      {w:'restrict', pos:'v', vi:'hạn chế'},
      {w:'restricted', pos:'adj', vi:'bị hạn chế'},
      {w:'restriction', pos:'n', vi:'sự hạn chế'} ]},

    { id:'f019', base:'intention', forms:[
      {w:'intend', pos:'v', vi:'dự định'},
      {w:'intention', pos:'n', vi:'ý định, chủ đích'},
      {w:'intentional', pos:'adj', vi:'cố ý, có chủ đích'},
      {w:'intentionally', pos:'adv', vi:'một cách cố ý'} ]},

    { id:'f020', base:'refer', forms:[
      {w:'refer', pos:'v', vi:'giới thiệu, tham chiếu, đề cập'},
      {w:'reference', pos:'n', vi:'sự tham khảo, tham chiếu', topics:['applying_and_interviewing','job_advertising_and_recruiting']},
      {w:'referral', pos:'n', vi:'sự giới thiệu (chuyển tiếp)'} ]},

    { id:'f021', base:'estimate', forms:[
      {w:'estimate', pos:'v', vi:'ước tính'},
      {w:'estimate', pos:'n', vi:'bản ước tính'},
      {w:'estimated', pos:'adj', vi:'ước tính, dự kiến'},
      {w:'estimation', pos:'n', vi:'sự ước lượng'} ]},

    { id:'f022', base:'deposit', forms:[
      {w:'deposit', pos:'n', vi:'tiền đặt cọc', topics:['banking']},
      {w:'deposit', pos:'v', vi:'gửi tiền, đặt cọc'},
      {w:'deposit slip', pos:'n', vi:'phiếu gửi tiền', topics:['banking']} ]},

    { id:'f023', base:'avoid', forms:[
      {w:'avoid', pos:'v', vi:'tránh'},
      {w:'avoidable', pos:'adj', vi:'có thể tránh được'},
      {w:'avoidance', pos:'n', vi:'sự né tránh'} ]},

    { id:'f024', base:'temporary', forms:[
      {w:'temporary', pos:'adj', vi:'tạm thời'},
      {w:'temporarily', pos:'adv', vi:'một cách tạm thời'} ]},

    { id:'f025', base:'prompt', forms:[
      {w:'prompt', pos:'adj', vi:'nhanh, đúng giờ'},
      {w:'prompt', pos:'v', vi:'thúc đẩy, nhắc'},
      {w:'promptly', pos:'adv', vi:'nhanh chóng, đúng giờ'},
      {w:'promptness', pos:'n', vi:'sự nhanh chóng'} ]},

    { id:'f026', base:'perform', forms:[
      {w:'perform', pos:'v', vi:'biểu diễn, thực hiện'},
      {w:'performance', pos:'n', vi:'màn trình diễn, hiệu suất'},
      {w:'performer', pos:'n', vi:'người biểu diễn'} ]},

    { id:'f027', base:'conduct', forms:[
      {w:'conduct', pos:'v', vi:'tiến hành'},
      {w:'conduct', pos:'n', vi:'hành vi, cách cư xử'},
      {w:'conductor', pos:'n', vi:'người chỉ huy, nhạc trưởng'} ]},

    { id:'f028', base:'destination', forms:[
      {w:'destination', pos:'n', vi:'điểm đến', topics:['travel']},
      {w:'destined', pos:'adj', vi:'được định để đến, dành cho'} ]},

    { id:'f029', base:'excursion', forms:[
      {w:'excursion', pos:'n', vi:'chuyến tham quan', topics:['travel']} ]},

    { id:'f030', base:'attach', syn:['enclose'], forms:[
      {w:'attach', pos:'v', vi:'đính kèm', topics:['correspondence']},
      {w:'attachment', pos:'n', vi:'tệp đính kèm, sự gắn bó'},
      {w:'attached', pos:'adj', vi:'được đính kèm'} ]},

    { id:'f031', base:'purpose', forms:[
      {w:'purpose', pos:'n', vi:'mục đích'},
      {w:'purposeful', pos:'adj', vi:'có mục đích'},
      {w:'purposely', pos:'adv', vi:'một cách cố ý'} ]},

    { id:'f032', base:'direction', forms:[
      {w:'direct', pos:'v', vi:'chỉ đạo, hướng dẫn'},
      {w:'direct', pos:'adj', vi:'trực tiếp, thẳng thắn, minh bạch'},
      {w:'direction', pos:'n', vi:'phương hướng, chỉ dẫn'},
      {w:'directly', pos:'adv', vi:'một cách trực tiếp'},
      {w:'director', pos:'n', vi:'giám đốc, đạo diễn'} ]},

    { id:'f033', base:'coordinate', forms:[
      {w:'coordinate', pos:'v', vi:'điều phối, phối hợp'},
      {w:'coordinator', pos:'n', vi:'người điều phối'},
      {w:'coordination', pos:'n', vi:'sự phối hợp'} ]},

    { id:'f034', base:'navigate', forms:[
      {w:'navigate', pos:'v', vi:'điều hướng'},
      {w:'navigation', pos:'n', vi:'sự điều hướng'},
      {w:'navigator', pos:'n', vi:'người dẫn đường'} ]},

    { id:'f035', base:'clarify', forms:[
      {w:'clarify', pos:'v', vi:'làm rõ'},
      {w:'clarification', pos:'n', vi:'sự làm rõ'},
      {w:'clarity', pos:'n', vi:'sự rõ ràng'} ]},

    { id:'f036', base:'postpone', forms:[
      {w:'postpone', pos:'v', vi:'hoãn, trì hoãn'},
      {w:'postponement', pos:'n', vi:'sự trì hoãn'} ]},

    { id:'f037', base:'manufacture', syn:['produce'], forms:[
      {w:'manufacture', pos:'v', vi:'sản xuất'},
      {w:'manufacture', pos:'n', vi:'việc sản xuất'},
      {w:'manufacturer', pos:'n', vi:'nhà sản xuất'},
      {w:'manufacturing', pos:'n', vi:'ngành/việc sản xuất'} ]},

    { id:'f038', base:'equip', syn:['tool','device','appliance'], forms:[
      {w:'equip', pos:'v', vi:'trang bị'},
      {w:'equipment', pos:'n', vi:'trang thiết bị'} ]},

    { id:'f039', base:'arrange', syn:['set up','host','organize'], forms:[
      {w:'arrange', pos:'v', vi:'sắp xếp, tổ chức'},
      {w:'arrangement', pos:'n', vi:'sự sắp xếp'} ]},

    { id:'f040', base:'organize', syn:['arrange','set up','host'], forms:[
      {w:'organize', pos:'v', vi:'tổ chức, sắp xếp', topics:['conference']},
      {w:'organization', pos:'n', vi:'tổ chức'},
      {w:'organizer', pos:'n', vi:'người tổ chức'},
      {w:'organized', pos:'adj', vi:'có tổ chức, ngăn nắp'} ]},

    { id:'f041', base:'locate', syn:['venue','site','area','place','spot'], forms:[
      {w:'locate', pos:'v', vi:'định vị, đặt tại'},
      {w:'location', pos:'n', vi:'địa điểm'} ]},

    { id:'f042', base:'vary', syn:['change','turn','switch','amend','adjust','modify','differ'], forms:[
      {w:'vary', pos:'v', vi:'thay đổi, khác nhau'},
      {w:'variety', pos:'n', vi:'sự đa dạng'},
      {w:'various', pos:'adj', vi:'đa dạng, nhiều'},
      {w:'variation', pos:'n', vi:'sự biến đổi'},
      {w:'variable', pos:'adj', vi:'hay thay đổi'} ]},

    { id:'f043', base:'adjust', forms:[
      {w:'adjust', pos:'v', vi:'điều chỉnh'},
      {w:'adjustment', pos:'n', vi:'sự điều chỉnh'},
      {w:'adjustable', pos:'adj', vi:'có thể điều chỉnh'} ]},

    { id:'f044', base:'modify', forms:[
      {w:'modify', pos:'v', vi:'sửa đổi'},
      {w:'modification', pos:'n', vi:'sự sửa đổi'} ]},

    { id:'f045', base:'depend', syn:['rely'], note:'depend on = rely on = phụ thuộc vào', forms:[
      {w:'depend', pos:'v', vi:'phụ thuộc'},
      {w:'dependent', pos:'adj', vi:'phụ thuộc'},
      {w:'dependence', pos:'n', vi:'sự phụ thuộc'},
      {w:'dependable', pos:'adj', vi:'đáng tin cậy'} ]},

    { id:'f046', base:'rely', syn:['depend'], forms:[
      {w:'rely', pos:'v', vi:'dựa vào, tin cậy'},
      {w:'reliable', pos:'adj', vi:'đáng tin cậy'},
      {w:'reliability', pos:'n', vi:'độ tin cậy'},
      {w:'reliance', pos:'n', vi:'sự phụ thuộc, tin cậy'} ]},

    { id:'f047', base:'solve', syn:['resolve','handle','deal with','take care of'], forms:[
      {w:'solve', pos:'v', vi:'giải quyết'},
      {w:'solution', pos:'n', vi:'giải pháp'} ]},

    { id:'f048', base:'resolve', syn:['solve'], forms:[
      {w:'resolve', pos:'v', vi:'giải quyết, quyết tâm'},
      {w:'resolution', pos:'n', vi:'giải pháp, quyết tâm'} ]},

    { id:'f049', base:'confirm', syn:['verify'], forms:[
      {w:'confirm', pos:'v', vi:'xác nhận', topics:['travel']},
      {w:'confirmation', pos:'n', vi:'sự xác nhận'} ]},

    { id:'f050', base:'verify', syn:['confirm'], forms:[
      {w:'verify', pos:'v', vi:'xác minh, kiểm chứng', topics:['invoice']},
      {w:'verification', pos:'n', vi:'sự xác minh'} ]},

    { id:'f051', base:'contact', syn:['reach'], forms:[
      {w:'contact', pos:'v', vi:'liên hệ'},
      {w:'contact', pos:'n', vi:'sự liên hệ, đầu mối'} ]},

    { id:'f052', base:'achieve', syn:['reach'], forms:[
      {w:'achieve', pos:'v', vi:'đạt được'},
      {w:'achievement', pos:'n', vi:'thành tựu'} ]},

    { id:'f053', base:'period', syn:['stage','phase'], forms:[
      {w:'period', pos:'n', vi:'giai đoạn, thời kỳ', topics:['warranties']},
      {w:'periodic', pos:'adj', vi:'định kỳ'},
      {w:'periodical', pos:'adj', vi:'định kỳ; (n) tạp chí ra định kỳ'},
      {w:'periodically', pos:'adv', vi:'một cách định kỳ'} ]},

    { id:'f054', base:'monitor', syn:['supervise','manage','inspect'], forms:[
      {w:'monitor', pos:'v', vi:'giám sát, theo dõi'},
      {w:'monitor', pos:'n', vi:'màn hình; người giám sát'} ]},

    { id:'f055', base:'supervise', syn:['monitor','manage','inspect'], forms:[
      {w:'supervise', pos:'v', vi:'giám sát, quản lý'},
      {w:'supervisor', pos:'n', vi:'người giám sát, quản lý'},
      {w:'supervision', pos:'n', vi:'sự giám sát'} ]},

    { id:'f056', base:'manage', syn:['monitor','supervise'], forms:[
      {w:'manage', pos:'v', vi:'quản lý; xoay xở'},
      {w:'management', pos:'n', vi:'sự quản lý, ban quản lý'},
      {w:'manager', pos:'n', vi:'người quản lý'},
      {w:'manageable', pos:'adj', vi:'có thể quản lý được'} ]},

    { id:'f057', base:'inspect', syn:['monitor','supervise'], forms:[
      {w:'inspect', pos:'v', vi:'thanh tra, kiểm tra'},
      {w:'inspection', pos:'n', vi:'sự thanh tra'},
      {w:'inspector', pos:'n', vi:'thanh tra viên'} ]},

    { id:'f058', base:'process', syn:['progress','procedure'], forms:[
      {w:'process', pos:'n', vi:'tiến trình, quy trình'},
      {w:'process', pos:'v', vi:'xử lý'} ]},

    { id:'f059', base:'progress', syn:['process'], forms:[
      {w:'progress', pos:'n', vi:'sự tiến bộ, tiến độ'},
      {w:'progress', pos:'v', vi:'tiến triển'},
      {w:'progressive', pos:'adj', vi:'tiến bộ, dần dần'} ]},

    { id:'f060', base:'procedure', syn:['process'], forms:[
      {w:'procedure', pos:'n', vi:'quy trình, thủ tục'},
      {w:'proceed', pos:'v', vi:'tiến hành, tiếp tục thực hiện'},
      {w:'procedural', pos:'adj', vi:'thuộc về thủ tục'} ]},

    { id:'f061', base:'launch', forms:[
      {w:'launch', pos:'v', vi:'khai trương, ra mắt', topics:['marketing']},
      {w:'launch', pos:'n', vi:'sự ra mắt'} ]},

    { id:'f062', base:'publish', syn:['release'], forms:[
      {w:'publish', pos:'v', vi:'xuất bản, công bố'},
      {w:'publication', pos:'n', vi:'ấn phẩm, sự xuất bản'},
      {w:'publisher', pos:'n', vi:'nhà xuất bản'} ]},

    { id:'f063', base:'release', syn:['publish'], forms:[
      {w:'release', pos:'v', vi:'tung ra, phát hành, phóng thích'},
      {w:'release', pos:'n', vi:'sự phát hành'} ]},

    { id:'f064', base:'outstanding', forms:[
      {w:'outstanding', pos:'adj', vi:'nổi bật, xuất sắc; (nợ) chưa thanh toán'} ]},

    { id:'f065', base:'consist', forms:[
      {w:'consist', pos:'v', vi:'bao gồm (consist of)'},
      {w:'consistent', pos:'adj', vi:'nhất quán, kiên định'},
      {w:'consistency', pos:'n', vi:'sự nhất quán'} ]},

    { id:'f066', base:'advise', forms:[
      {w:'advise', pos:'v', vi:'tư vấn, khuyên bảo'},
      {w:'advice', pos:'n', vi:'lời khuyên'},
      {w:'adviser', pos:'n', vi:'cố vấn (advisor)'},
      {w:'advisable', pos:'adj', vi:'nên làm, khôn ngoan'} ]},

    { id:'f067', base:'represent', forms:[
      {w:'represent', pos:'v', vi:'đại diện, tượng trưng'},
      {w:'representative', pos:'n', vi:'người đại diện'},
      {w:'representation', pos:'n', vi:'sự đại diện, biểu diễn'} ]},

    { id:'f068', base:'recommend', syn:['suggest','offer'], forms:[
      {w:'recommend', pos:'v', vi:'đề xuất, gợi ý, giới thiệu'},
      {w:'recommendation', pos:'n', vi:'sự đề xuất, thư giới thiệu'} ]},

    { id:'f069', base:'suggest', syn:['recommend','offer'], forms:[
      {w:'suggest', pos:'v', vi:'đề xuất, gợi ý'},
      {w:'suggestion', pos:'n', vi:'lời đề xuất'} ]},

    { id:'f070', base:'offer', syn:['recommend','suggest'], forms:[
      {w:'offer', pos:'v', vi:'đề nghị, cung cấp'},
      {w:'offer', pos:'n', vi:'lời đề nghị, ưu đãi', topics:['contract']} ]},

    { id:'f071', base:'request', syn:['inquire','ask for'], forms:[
      {w:'request', pos:'v', vi:'yêu cầu'},
      {w:'request', pos:'n', vi:'lời yêu cầu'} ]},

    { id:'f072', base:'inquire', syn:['request','ask for'], forms:[
      {w:'inquire', pos:'v', vi:'hỏi, thăm dò (enquire)'},
      {w:'inquiry', pos:'n', vi:'câu hỏi, sự điều tra'} ]},

    { id:'f073', base:'appoint', forms:[
      {w:'appoint', pos:'v', vi:'bổ nhiệm'},
      {w:'appointment', pos:'n', vi:'cuộc hẹn; sự bổ nhiệm', topics:['office']} ]},

    { id:'f074', base:'lead', syn:['chief'], forms:[
      {w:'lead', pos:'v', vi:'dẫn dắt, lãnh đạo'},
      {w:'leader', pos:'n', vi:'người đứng đầu, trưởng'},
      {w:'leadership', pos:'n', vi:'sự lãnh đạo, khả năng lãnh đạo'} ]},

    { id:'f075', base:'casual', forms:[
      {w:'casual', pos:'adj', vi:'thông thường, thân mật, tùy tiện'},
      {w:'casually', pos:'adv', vi:'một cách thoải mái, tình cờ'} ]},

    { id:'f076', base:'replace', syn:['substitute'], forms:[
      {w:'replace', pos:'v', vi:'thay thế', topics:['warranties']},
      {w:'replacement', pos:'n', vi:'sự thay thế, người/vật thay thế'} ]},

    { id:'f077', base:'substitute', syn:['replace'], forms:[
      {w:'substitute', pos:'v', vi:'thay thế'},
      {w:'substitute', pos:'n', vi:'vật/người thay thế'},
      {w:'substitution', pos:'n', vi:'sự thay thế'} ]},

    { id:'f078', base:'decline', syn:['decrease','turn down','reduce','fall'], forms:[
      {w:'decline', pos:'v', vi:'giảm; từ chối'},
      {w:'decline', pos:'n', vi:'sự suy giảm'} ]},

    { id:'f079', base:'decrease', syn:['decline','reduce','fall'], forms:[
      {w:'decrease', pos:'v', vi:'giảm'},
      {w:'decrease', pos:'n', vi:'sự giảm'} ]},

    { id:'f080', base:'reduce', syn:['decrease','decline'], forms:[
      {w:'reduce', pos:'v', vi:'giảm bớt, cắt giảm'},
      {w:'reduction', pos:'n', vi:'sự cắt giảm'} ]},

    { id:'f081', base:'expense', syn:['charge','fee','cost','rate','price'], forms:[
      {w:'expense', pos:'n', vi:'chi phí', topics:['accounting']},
      {w:'expend', pos:'v', vi:'tiêu, chi tiêu'},
      {w:'expensive', pos:'adj', vi:'đắt đỏ'},
      {w:'expenditure', pos:'n', vi:'khoản chi tiêu'},
      {w:'expense report', pos:'n', vi:'báo cáo chi phí', topics:['accounting']} ]},

    { id:'f082', base:'international', syn:['global'], note:'>< domestic (nội địa)', forms:[
      {w:'international', pos:'adj', vi:'quốc tế'},
      {w:'internationally', pos:'adv', vi:'trên phạm vi quốc tế'},
      {w:'global', pos:'adj', vi:'toàn cầu'},
      {w:'domestic', pos:'adj', vi:'nội địa, trong nước'} ]},

    { id:'f083', base:'occupy', forms:[
      {w:'occupy', pos:'v', vi:'chiếm giữ, sử dụng, cư ngụ'},
      {w:'occupation', pos:'n', vi:'nghề nghiệp; sự chiếm đóng'},
      {w:'occupant', pos:'n', vi:'người cư ngụ, người sử dụng'},
      {w:'occupied', pos:'adj', vi:'đang bận, đã có người'} ]},

    { id:'f084', base:'surround', forms:[
      {w:'surround', pos:'v', vi:'bao quanh'},
      {w:'surrounding', pos:'adj', vi:'xung quanh'},
      {w:'surrounded', pos:'adj', vi:'bị bao quanh'},
      {w:'surroundings', pos:'n', vi:'môi trường xung quanh'} ]},

    { id:'f085', base:'firm', syn:['company'], forms:[
      {w:'firm', pos:'n', vi:'công ty, hãng'},
      {w:'firm', pos:'adj', vi:'chắc chắn, kiên định'} ]},

    { id:'f086', base:'track', forms:[
      {w:'track', pos:'v', vi:'theo dõi, lần theo'},
      {w:'track', pos:'n', vi:'đường ray, dấu vết'} ]},

    { id:'f087', base:'borrow', forms:[
      {w:'borrow', pos:'v', vi:'vay mượn'},
      {w:'loan', pos:'n', vi:'khoản vay', topics:['banking']},
      {w:'borrower', pos:'n', vi:'người đi vay'} ]},

    { id:'f088', base:'structure', forms:[
      {w:'structure', pos:'n', vi:'cấu trúc'},
      {w:'structural', pos:'adj', vi:'thuộc về cấu trúc'} ]},

    { id:'f089', base:'construct', forms:[
      {w:'construct', pos:'v', vi:'xây dựng'},
      {w:'construction', pos:'n', vi:'công trình, việc xây dựng'},
      {w:'constructive', pos:'adj', vi:'mang tính xây dựng'} ]},

    { id:'f090', base:'instruct', syn:['educate'], forms:[
      {w:'instruct', pos:'v', vi:'hướng dẫn, chỉ dẫn'},
      {w:'instruction', pos:'n', vi:'sự hướng dẫn'},
      {w:'instructor', pos:'n', vi:'người hướng dẫn'},
      {w:'instructive', pos:'adj', vi:'mang tính giáo dục'} ]},

    { id:'f091', base:'supply', syn:['provide'], forms:[
      {w:'supply', pos:'v', vi:'cung cấp'},
      {w:'supply', pos:'n', vi:'nguồn cung', topics:['inventory']},
      {w:'supplier', pos:'n', vi:'nhà cung cấp'} ]},

    { id:'f092', base:'provide', syn:['supply'], forms:[
      {w:'provide', pos:'v', vi:'cung cấp'},
      {w:'provider', pos:'n', vi:'nhà cung cấp'},
      {w:'provision', pos:'n', vi:'sự cung cấp, điều khoản'} ]},

    { id:'f093', base:'invoice', syn:['receipt'], forms:[
      {w:'invoice', pos:'n', vi:'hóa đơn', topics:['accounting','invoice']} ]},

    { id:'f094', base:'shift', forms:[
      {w:'shift', pos:'n', vi:'ca làm việc; sự chuyển dịch'},
      {w:'shift', pos:'v', vi:'chuyển, dịch chuyển'} ]},

    { id:'f095', base:'recall', forms:[
      {w:'recall', pos:'v', vi:'nhớ lại; thu hồi'} ]},

    { id:'f096', base:'complain', forms:[
      {w:'complain', pos:'v', vi:'phàn nàn'},
      {w:'complaint', pos:'n', vi:'lời phàn nàn, đơn khiếu nại'} ]},

    { id:'f097', base:'receive', syn:['get'], forms:[
      {w:'receive', pos:'v', vi:'nhận được'},
      {w:'reception', pos:'n', vi:'sự tiếp nhận; quầy lễ tân', topics:['travel']},
      {w:'receptionist', pos:'n', vi:'nhân viên lễ tân'},
      {w:'recipient', pos:'n', vi:'người nhận', topics:['correspondence']} ]},

    { id:'f098', base:'register', syn:['enroll','sign up','apply for','subscribe'], forms:[
      {w:'register', pos:'v', vi:'đăng ký, ghi danh', topics:['conference']},
      {w:'registration', pos:'n', vi:'sự đăng ký'} ]},

    { id:'f099', base:'enroll', syn:['register','sign up'], forms:[
      {w:'enroll', pos:'v', vi:'ghi danh, nhập học'},
      {w:'enrollment', pos:'n', vi:'sự ghi danh'} ]},

    { id:'f100', base:'subscribe', syn:['register'], forms:[
      {w:'subscribe', pos:'v', vi:'đăng ký (dài hạn), theo dõi'},
      {w:'subscription', pos:'n', vi:'sự đăng ký thuê bao'},
      {w:'subscriber', pos:'n', vi:'người đăng ký'} ]},

    { id:'f101', base:'submit', syn:['file','hand in'], forms:[
      {w:'submit', pos:'v', vi:'nộp, trình'},
      {w:'submission', pos:'n', vi:'sự nộp, bài nộp'} ]},

    { id:'f102', base:'apply', forms:[
      {w:'apply', pos:'v', vi:'nộp đơn; áp dụng'},
      {w:'application', pos:'n', vi:'đơn xin; ứng dụng', topics:['applying_and_interviewing','computer']},
      {w:'applicant', pos:'n', vi:'ứng viên, người nộp đơn', topics:['job_advertising_and_recruiting']},
      {w:'applicable', pos:'adj', vi:'có thể áp dụng'} ]},

    { id:'f103', base:'candidate', syn:['applicant'], forms:[
      {w:'candidate', pos:'n', vi:'ứng viên, thí sinh', topics:['applying_and_interviewing']} ]},

    { id:'f104', base:'fragile', syn:['delicate'], forms:[
      {w:'fragile', pos:'adj', vi:'dễ vỡ, dễ tổn thương'},
      {w:'fragility', pos:'n', vi:'sự mong manh'} ]},

    { id:'f105', base:'entire', syn:['whole','all'], forms:[
      {w:'entire', pos:'adj', vi:'toàn bộ'},
      {w:'entirely', pos:'adv', vi:'hoàn toàn'} ]},

    { id:'f106', base:'among', forms:[
      {w:'among', pos:'prep', vi:'ở giữa, trong số (nhiều hơn 2)'} ]},

    { id:'f107', base:'fortunate', forms:[
      {w:'fortunate', pos:'adj', vi:'may mắn'},
      {w:'fortunately', pos:'adv', vi:'may thay'},
      {w:'fortune', pos:'n', vi:'vận may; tài sản lớn'} ]},

    { id:'f108', base:'prior', note:'prior to + N/V-ing = before + S+V', forms:[
      {w:'prior', pos:'adj', vi:'trước, ưu tiên'} ]},

    { id:'f109', base:'permanent', forms:[
      {w:'permanent', pos:'adj', vi:'vĩnh viễn, lâu dài, cố định'},
      {w:'permanently', pos:'adv', vi:'một cách vĩnh viễn'} ]},

    { id:'f110', base:'depart', forms:[
      {w:'depart', pos:'v', vi:'khởi hành, rời đi', topics:['travel']},
      {w:'departure', pos:'n', vi:'sự rời đi, khởi hành', topics:['travel']} ]},

    { id:'f111', base:'toward', forms:[
      {w:'toward', pos:'prep', vi:'về phía, hướng về (towards)'} ]},

    { id:'f112', base:'alternative', forms:[
      {w:'alternative', pos:'adj', vi:'thay thế, thay đổi được'},
      {w:'alternative', pos:'n', vi:'phương án thay thế'},
      {w:'alternatively', pos:'adv', vi:'hoặc là, một cách khác'},
      {w:'alternate', pos:'v', vi:'luân phiên'} ]},

    { id:'f113', base:'contract', forms:[
      {w:'contract', pos:'n', vi:'hợp đồng', topics:['contract','job_advertising_and_recruiting','salaries_and_benefits']},
      {w:'contractor', pos:'n', vi:'nhà thầu'},
      {w:'contractual', pos:'adj', vi:'thuộc về hợp đồng'} ]},

    { id:'f114', base:'initial', forms:[
      {w:'initial', pos:'adj', vi:'ban đầu, thời đầu'},
      {w:'initially', pos:'adv', vi:'ban đầu'},
      {w:'initiate', pos:'v', vi:'khởi xướng, bắt đầu'},
      {w:'initiative', pos:'n', vi:'sáng kiến; sự chủ động'} ]},

    { id:'f115', base:'counter', forms:[
      {w:'counter', pos:'n', vi:'quầy'} ]},

    { id:'f116', base:'encounter', forms:[
      {w:'encounter', pos:'v', vi:'gặp phải, tình cờ gặp, đối mặt'},
      {w:'encounter', pos:'n', vi:'cuộc chạm trán'} ]},

    { id:'f117', base:'patience', forms:[
      {w:'patience', pos:'n', vi:'sự kiên nhẫn'},
      {w:'patient', pos:'adj', vi:'kiên nhẫn'},
      {w:'patient', pos:'n', vi:'bệnh nhân'},
      {w:'patiently', pos:'adv', vi:'một cách kiên nhẫn'} ]},

    { id:'f118', base:'milestone', forms:[
      {w:'milestone', pos:'n', vi:'cột mốc quan trọng'} ]},

    { id:'f119', base:'consider', forms:[
      {w:'consider', pos:'v', vi:'cân nhắc, xem xét'},
      {w:'considerate', pos:'adj', vi:'ân cần, chu đáo'},
      {w:'considerable', pos:'adj', vi:'đáng kể, lớn'},
      {w:'consideration', pos:'n', vi:'sự cân nhắc'} ]},

    { id:'f120', base:'probable', forms:[
      {w:'probable', pos:'adj', vi:'có khả năng xảy ra'},
      {w:'probably', pos:'adv', vi:'có lẽ'},
      {w:'probability', pos:'n', vi:'xác suất, khả năng'} ]},

    { id:'f121', base:'remarkable', forms:[
      {w:'remark', pos:'v', vi:'nhận xét'},
      {w:'remark', pos:'n', vi:'lời nhận xét'},
      {w:'remarkable', pos:'adj', vi:'đáng chú ý, phi thường'},
      {w:'remarkably', pos:'adv', vi:'đáng kể'} ]},

    { id:'f122', base:'acquire', forms:[
      {w:'acquire', pos:'v', vi:'mua lại, thâu tóm, giành được'},
      {w:'acquisition', pos:'n', vi:'sự mua lại, thâu tóm'} ]},

    { id:'f123', base:'divide', forms:[
      {w:'divide', pos:'v', vi:'chia ra, phân chia'},
      {w:'division', pos:'n', vi:'sự phân chia; bộ phận'},
      {w:'divisible', pos:'adj', vi:'có thể chia được'} ]},

    { id:'f124', base:'present', syn:['pitch'], forms:[
      {w:'present', pos:'v', vi:'trình bày, giới thiệu'},
      {w:'presentation', pos:'n', vi:'bài thuyết trình', topics:['conference']},
      {w:'presenter', pos:'n', vi:'người thuyết trình'},
      {w:'pitch', pos:'n', vi:'bài thuyết trình, sự chào hàng'} ]},

    { id:'f125', base:'relevant', forms:[
      {w:'relevant', pos:'adj', vi:'có liên quan, thích hợp'},
      {w:'relevance', pos:'n', vi:'sự liên quan'} ]},

    { id:'f126', base:'capable', forms:[
      {w:'capable', pos:'adj', vi:'có năng lực, có thể'},
      {w:'capability', pos:'n', vi:'năng lực, khả năng'},
      {w:'capably', pos:'adv', vi:'một cách có năng lực'} ]},

    { id:'f127', base:'fund', forms:[
      {w:'fund', pos:'n', vi:'quỹ, ngân quỹ'},
      {w:'fund', pos:'v', vi:'tài trợ, cấp vốn'},
      {w:'funding', pos:'n', vi:'nguồn vốn, tiền tài trợ'} ]},

    { id:'f128', base:'approach', forms:[
      {w:'approach', pos:'v', vi:'tiếp cận, đến gần'},
      {w:'approach', pos:'n', vi:'cách tiếp cận'},
      {w:'approachable', pos:'adj', vi:'dễ gần, dễ tiếp cận'} ]},

    { id:'f129', base:'brief', forms:[
      {w:'brief', pos:'adj', vi:'ngắn gọn, vắn tắt'},
      {w:'briefly', pos:'adv', vi:'một cách ngắn gọn'},
      {w:'briefing', pos:'n', vi:'buổi báo cáo tóm tắt'} ]},

    /* ---- HỌ TỪ CHO CÁC TRẠNG TỪ THƯỜNG GẶP ---- */
    { id:'f130', base:'present (time)', forms:[
      {w:'presently', pos:'adv', vi:'hiện nay, ngay bây giờ'} ]},

    { id:'f131', base:'certain', forms:[
      {w:'certain', pos:'adj', vi:'chắc chắn, nào đó'},
      {w:'certainly', pos:'adv', vi:'chắc chắn'},
      {w:'certainty', pos:'n', vi:'sự chắc chắn'} ]},

    { id:'f132', base:'significant', syn:['remarkable'], forms:[
      {w:'significant', pos:'adj', vi:'đáng kể, quan trọng'},
      {w:'significantly', pos:'adv', vi:'một cách đáng kể'},
      {w:'significance', pos:'n', vi:'tầm quan trọng'} ]},

    { id:'f133', base:'effective', forms:[
      {w:'effective', pos:'adj', vi:'hiệu quả'},
      {w:'effectively', pos:'adv', vi:'một cách hiệu quả'},
      {w:'effect', pos:'n', vi:'tác động, hiệu ứng'},
      {w:'effectiveness', pos:'n', vi:'tính hiệu quả'} ]},

    { id:'f134', base:'regular', syn:['frequent'], forms:[
      {w:'regular', pos:'adj', vi:'thường xuyên, đều đặn'},
      {w:'regularly', pos:'adv', vi:'thường xuyên'},
      {w:'regularity', pos:'n', vi:'sự đều đặn'} ]},

    { id:'f135', base:'frequent', syn:['regular'], forms:[
      {w:'frequent', pos:'adj', vi:'thường xuyên, hay xảy ra'},
      {w:'frequently', pos:'adv', vi:'thường xuyên'},
      {w:'frequency', pos:'n', vi:'tần suất'} ]},

    { id:'f136', base:'recent', forms:[
      {w:'recent', pos:'adj', vi:'gần đây'},
      {w:'recently', pos:'adv', vi:'gần đây'} ]},

    { id:'f137', base:'barely', syn:['hardly'], forms:[
      {w:'barely', pos:'adv', vi:'hầu như không, vừa đủ'} ]},

    { id:'f138', base:'roughly', forms:[
      {w:'roughly', pos:'adv', vi:'xấp xỉ, đại khái'} ]},

    { id:'f139', base:'separate', forms:[
      {w:'separate', pos:'v', vi:'tách ra'},
      {w:'separate', pos:'adj', vi:'riêng biệt'},
      {w:'separately', pos:'adv', vi:'một cách riêng lẻ'},
      {w:'separation', pos:'n', vi:'sự tách biệt'} ]},

    { id:'f140', base:'reasonable', forms:[
      {w:'reasonable', pos:'adj', vi:'hợp lý, phải chăng'},
      {w:'reasonably', pos:'adv', vi:'một cách hợp lý'},
      {w:'reason', pos:'n', vi:'lý do'} ]},

    /* ---- BỔ SUNG TỪ SỔ TAY (đợt 2) ---- */
    { id:'f141', base:'loyal', forms:[
      {w:'loyal', pos:'adj', vi:'trung thành'},
      {w:'loyalty', pos:'n', vi:'lòng trung thành'},
      {w:'loyally', pos:'adv', vi:'một cách trung thành'} ]},

    { id:'f142', base:'light', forms:[
      {w:'light', pos:'adj', vi:'nhẹ'},
      {w:'lightly', pos:'adv', vi:'nhẹ nhàng'},
      {w:'lighten', pos:'v', vi:'làm nhẹ bớt, giảm bớt'} ]},

    { id:'f143', base:'solicit', forms:[
      {w:'solicit', pos:'v', vi:'xin, kêu gọi, vận động, mời chào'},
      {w:'solicitation', pos:'n', vi:'sự kêu gọi, sự vận động'},
      {w:'unsolicited', pos:'adj', vi:'không được yêu cầu, tự ý đưa ra'} ]},

    { id:'f144', base:'engage', syn:['participate','promise'], forms:[
      {w:'engage', pos:'v', vi:'tham gia; thu hút; đính hôn; cam kết, hứa hẹn'},
      {w:'engagement', pos:'n', vi:'sự tham gia, sự gắn kết; sự đính hôn'},
      {w:'engaging', pos:'adj', vi:'hấp dẫn, lôi cuốn'} ]},

    { id:'f145', base:'cautious', syn:['careful'], forms:[
      {w:'cautious', pos:'adj', vi:'cẩn trọng, thận trọng'},
      {w:'cautiously', pos:'adv', vi:'một cách thận trọng'},
      {w:'caution', pos:'n', vi:'sự thận trọng; lời cảnh báo'} ]},

    { id:'f146', base:'compensate', forms:[
      {w:'compensate', pos:'v', vi:'bù đắp, đền bù'},
      {w:'compensation', pos:'n', vi:'khoản bồi thường, tiền đền bù', topics:['salaries_and_benefits']},
      {w:'compensatory', pos:'adj', vi:'mang tính đền bù'} ]},

    { id:'f147', base:'accumulate', forms:[
      {w:'accumulate', pos:'v', vi:'tích lũy, tích tụ'},
      {w:'accumulation', pos:'n', vi:'sự tích lũy'},
      {w:'accumulated', pos:'adj', vi:'được tích lũy, dồn lại'} ]},

    { id:'f148', base:'grateful', forms:[
      {w:'grateful', pos:'adj', vi:'biết ơn'},
      {w:'gratefully', pos:'adv', vi:'một cách biết ơn'},
      {w:'gratitude', pos:'n', vi:'lòng biết ơn'} ]},

    { id:'f149', base:'disrupt', forms:[
      {w:'disrupt', pos:'v', vi:'làm gián đoạn, phá vỡ'},
      {w:'disruption', pos:'n', vi:'sự gián đoạn, sự xáo trộn'},
      {w:'disruptive', pos:'adj', vi:'gây gián đoạn, gây xáo trộn'} ]},

    { id:'f150', base:'concern', forms:[
      {w:'concern', pos:'v', vi:'liên quan đến; khiến lo ngại'},
      {w:'concern', pos:'n', vi:'mối quan tâm, sự lo ngại; vấn đề liên quan'},
      {w:'concerned', pos:'adj', vi:'lo ngại, quan tâm'},
      {w:'concerning', pos:'prep', vi:'liên quan đến, về việc'} ]},

    { id:'f151', base:'deduce', forms:[
      {w:'deduce', pos:'v', vi:'suy luận, suy ra'},
      {w:'deduct', pos:'v', vi:'khấu trừ, trừ đi'},
      {w:'deduction', pos:'n', vi:'khoản khấu trừ; sự suy luận (logic)', topics:['salaries_and_benefits']} ]},

    { id:'f152', base:'declare', forms:[
      {w:'declare', pos:'v', vi:'tuyên bố; khai báo'},
      {w:'declaration', pos:'n', vi:'lời tuyên bố; tờ khai'} ]},

    { id:'f153', base:'promote', syn:['encourage'], forms:[
      {w:'promote', pos:'v', vi:'thúc đẩy, quảng bá; thăng chức'},
      {w:'promotion', pos:'n', vi:'sự thăng chức; chương trình khuyến mãi', topics:['marketing']},
      {w:'promotional', pos:'adj', vi:'mang tính quảng cáo, khuyến mãi'} ]},

    { id:'f154', base:'commercial', forms:[
      {w:'commerce', pos:'n', vi:'thương mại'},
      {w:'commercial', pos:'adj', vi:'thuộc về thương mại'},
      {w:'commercially', pos:'adv', vi:'về mặt thương mại'} ]},

    { id:'f155', base:'diagnose', forms:[
      {w:'diagnose', pos:'v', vi:'chẩn đoán'},
      {w:'diagnosis', pos:'n', vi:'sự chẩn đoán'},
      {w:'diagnostic', pos:'adj', vi:'thuộc về chẩn đoán, dùng để chẩn đoán'} ]},

    { id:'f156', base:'survey', forms:[
      {w:'survey', pos:'n', vi:'cuộc khảo sát, bản khảo sát'},
      {w:'survey', pos:'v', vi:'khảo sát, điều tra'} ]},

    { id:'f157', base:'beyond', forms:[
      {w:'beyond', pos:'prep', vi:'vượt quá, ngoài phạm vi'} ]},

    { id:'f158', base:'hardly', syn:['barely'], forms:[
      {w:'hardly', pos:'adv', vi:'hầu như không'} ]},

    { id:'f159', base:'punctual', forms:[
      {w:'punctual', pos:'adj', vi:'đúng giờ'},
      {w:'punctuality', pos:'n', vi:'tính đúng giờ'},
      {w:'punctually', pos:'adv', vi:'một cách đúng giờ'} ]},

    { id:'f160', base:'determine', forms:[
      {w:'determine', pos:'v', vi:'quyết định, xác định'},
      {w:'determined', pos:'adj', vi:'quyết tâm, kiên quyết'},
      {w:'determination', pos:'n', vi:'sự quyết tâm, sự xác định'} ]},

    { id:'f161', base:'guarantee', forms:[
      {w:'guarantee', pos:'n', vi:'sự bảo đảm', topics:['warranties']},
      {w:'guarantee', pos:'v', vi:'bảo đảm'} ]},

    { id:'f162', base:'occasion', forms:[
      {w:'occasion', pos:'n', vi:'dịp, sự kiện'},
      {w:'occasional', pos:'adj', vi:'thỉnh thoảng, không thường xuyên'},
      {w:'occasionally', pos:'adv', vi:'thỉnh thoảng'} ]},

    { id:'f163', base:'approximate', forms:[
      {w:'approximate', pos:'adj', vi:'gần đúng, ước chừng'},
      {w:'approximately', pos:'adv', vi:'khoảng chừng, xấp xỉ'} ]},

    { id:'f164', base:'urgent', forms:[
      {w:'urgent', pos:'adj', vi:'cấp bách, khẩn cấp'},
      {w:'urgently', pos:'adv', vi:'một cách khẩn cấp'},
      {w:'urgency', pos:'n', vi:'tính cấp bách'} ]},

    { id:'f165', base:'retain', forms:[
      {w:'retain', pos:'v', vi:'giữ lại, duy trì'},
      {w:'retention', pos:'n', vi:'sự duy trì, khả năng giữ lại'} ]},

    /* ---- BỔ SUNG TỪ SỔ TAY (đợt 3) ---- */
    { id:'f166', base:'abrupt', forms:[
      {w:'abrupt', pos:'adj', vi:'đột ngột, thình lình'},
      {w:'abruptly', pos:'adv', vi:'một cách đột ngột'} ]},

    { id:'f167', base:'thick', forms:[
      {w:'thick', pos:'adj', vi:'dày, dày đặc'},
      {w:'thickly', pos:'adv', vi:'một cách dày đặc'},
      {w:'thickness', pos:'n', vi:'độ dày'} ]},

    { id:'f168', base:'compose', forms:[
      {w:'compose', pos:'v', vi:'sáng tác, soạn thảo; (be composed of) tạo thành từ, bao gồm'},
      {w:'composed', pos:'adj', vi:'bình tĩnh, điềm tĩnh'},
      {w:'composition', pos:'n', vi:'tác phẩm, bài soạn; thành phần cấu tạo'},
      {w:'composer', pos:'n', vi:'nhà soạn nhạc'} ]},

    { id:'f169', base:'necessary', forms:[
      {w:'necessary', pos:'adj', vi:'cần thiết'},
      {w:'necessarily', pos:'adv', vi:'một cách tất yếu (not necessarily = không nhất thiết)'},
      {w:'necessity', pos:'n', vi:'sự cần thiết, nhu cầu thiết yếu'} ]},

    { id:'f170', base:'revoke', forms:[
      {w:'revoke', pos:'v', vi:'thu hồi, hủy bỏ'},
      {w:'revocation', pos:'n', vi:'sự thu hồi, sự hủy bỏ'} ]},

    { id:'f171', base:'individual', forms:[
      {w:'individual', pos:'adj', vi:'cá nhân, riêng lẻ, cá thể'},
      {w:'individual', pos:'n', vi:'cá nhân (con người)'},
      {w:'individually', pos:'adv', vi:'một cách riêng lẻ, từng cái một'},
      {w:'individuality', pos:'n', vi:'tính cá nhân, cá tính riêng'} ]},

    { id:'f172', base:'abundant', forms:[
      {w:'abundant', pos:'adj', vi:'dồi dào, phong phú'},
      {w:'abundance', pos:'n', vi:'sự dồi dào, sự phong phú'},
      {w:'abundantly', pos:'adv', vi:'một cách dồi dào; hoàn toàn (abundantly clear)'} ]},

    { id:'f173', base:'claim', forms:[
      {w:'claim', pos:'v', vi:'khẳng định, tuyên bố; yêu cầu, đòi (quyền lợi, bồi thường)'},
      {w:'claim', pos:'n', vi:'lời khẳng định; đơn yêu cầu bồi thường, đơn khiếu nại', topics:['warranties']},
      {w:'claimant', pos:'n', vi:'người khiếu nại, người yêu cầu bồi thường'} ]},

    { id:'f174', base:'renew', forms:[
      {w:'renew', pos:'v', vi:'gia hạn, làm mới, đổi mới', topics:['contract']},
      {w:'renewal', pos:'n', vi:'sự gia hạn'},
      {w:'renewable', pos:'adj', vi:'có thể gia hạn được; (năng lượng) có thể tái tạo'} ]},

    { id:'f175', base:'tenant', forms:[
      {w:'tenant', pos:'n', vi:'người thuê (nhà, mặt bằng)'},
      {w:'tenancy', pos:'n', vi:'thời hạn thuê, hợp đồng thuê'} ]},

    { id:'f176', base:'measure', forms:[
      {w:'measure', pos:'v', vi:'đo, đo lường'},
      {w:'measure', pos:'n', vi:'biện pháp; thước đo, đơn vị đo'},
      {w:'measurement', pos:'n', vi:'sự đo lường, số đo'} ]},

    { id:'f177', base:'assign', forms:[
      {w:'assign', pos:'v', vi:'phân công, chỉ định, giao (việc)'},
      {w:'assignment', pos:'n', vi:'nhiệm vụ được giao, bài tập'},
      {w:'assigned', pos:'adj', vi:'được phân công, được chỉ định'} ]},

    { id:'f178', base:'banquet', forms:[
      {w:'banquet', pos:'n', vi:'tiệc chiêu đãi, dạ tiệc'} ]},

    { id:'f179', base:'compliment', forms:[
      {w:'compliment', pos:'n', vi:'lời khen'},
      {w:'compliment', pos:'v', vi:'khen ngợi'},
      {w:'complimentary', pos:'adj', vi:'miễn phí; mang tính khen ngợi'} ]},

    { id:'f180', base:'commend', forms:[
      {w:'commend', pos:'v', vi:'khen ngợi, đánh giá cao'},
      {w:'commendable', pos:'adj', vi:'đáng khen'},
      {w:'commendation', pos:'n', vi:'lời khen, sự khen thưởng'} ]},

    { id:'f181', base:'ladder', forms:[
      {w:'ladder', pos:'n', vi:'cái thang'} ]},

    { id:'f182', base:'anticipate', syn:['expect'], forms:[
      {w:'anticipate', pos:'v', vi:'mong đợi, dự đoán trước'},
      {w:'anticipation', pos:'n', vi:'sự mong đợi, sự dự đoán'},
      {w:'anticipated', pos:'adj', vi:'được mong đợi, được dự kiến'} ]},

    { id:'f183', base:'notice', forms:[
      {w:'notice', pos:'v', vi:'chú ý, để ý, nhận thấy'},
      {w:'notice', pos:'n', vi:'thông báo; sự chú ý'},
      {w:'noticeable', pos:'adj', vi:'dễ nhận thấy, rõ rệt'},
      {w:'noticeably', pos:'adv', vi:'một cách rõ rệt'} ]},

    { id:'f184', base:'circulate', forms:[
      {w:'circulate', pos:'v', vi:'lưu thông, lưu hành, luân chuyển'},
      {w:'circulation', pos:'n', vi:'sự lưu thông; lượng phát hành (báo, tạp chí)'},
      {w:'circular', pos:'adj', vi:'hình tròn'} ]},

    { id:'f185', base:'as usual', forms:[
      {w:'as usual', pos:'phr', vi:'như thường lệ'} ]},

    { id:'f186', base:'crew', syn:['team'], forms:[
      {w:'crew', pos:'n', vi:'đội, tổ, kíp làm việc (phi hành đoàn, đoàn làm phim...)', topics:['travel']} ]},

    { id:'f187', base:'distance', forms:[
      {w:'distance', pos:'n', vi:'khoảng cách'},
      {w:'distant', pos:'adj', vi:'xa xôi; xa cách, hờ hững'} ]},

    { id:'f188', base:'afford', forms:[
      {w:'afford', pos:'v', vi:'có khả năng chi trả, đủ khả năng (làm gì)'},
      {w:'affordable', pos:'adj', vi:'có giá phải chăng'},
      {w:'affordably', pos:'adv', vi:'với giá phải chăng'} ]},

    { id:'f189', base:'designate', forms:[
      {w:'designate', pos:'v', vi:'chỉ định'},
      {w:'designated', pos:'adj', vi:'được chỉ định (cho mục đích riêng)'},
      {w:'designation', pos:'n', vi:'sự chỉ định; chức danh'} ]},

    { id:'f190', base:'nominate', forms:[
      {w:'nominate', pos:'v', vi:'đề cử'},
      {w:'nomination', pos:'n', vi:'sự đề cử'},
      {w:'nominee', pos:'n', vi:'người được đề cử'} ]},

    { id:'f191', base:'comply', forms:[
      {w:'comply', pos:'v', vi:'tuân theo, tuân thủ'},
      {w:'compliance', pos:'n', vi:'sự tuân thủ'},
      {w:'compliant', pos:'adj', vi:'tuân thủ, phù hợp (quy định)'} ]},

    /* ---- GIỚI TỪ (PREPOSITIONS) ---- */
    { id:'f192', base:'under', forms:[
      {w:'under', pos:'prep', vi:'dưới, theo, trong tình trạng (under construction/review)'} ]},

    /* ---- TỪ VỰNG THEO CHỦ ĐỀ (topic vocab) ---- */
    { id:'f193', base:'address', forms:[
      {w:'address', pos:'n', vi:'địa chỉ', topics:['correspondence']} ]},

    { id:'f194', base:'advertise', forms:[
      {w:'advertise', pos:'v', vi:'quảng cáo', topics:['marketing']},
      {w:'advertisement', pos:'n', vi:'quảng cáo, thông báo tuyển dụng', topics:['job_advertising_and_recruiting']} ]},

    { id:'f195', base:'agenda', forms:[
      {w:'agenda', pos:'n', vi:'chương trình nghị sự', topics:['conference']} ]},

    { id:'f196', base:'agreement', forms:[
      {w:'agreement', pos:'n', vi:'thỏa thuận', topics:['contract']} ]},

    { id:'f197', base:'allowance', forms:[
      {w:'allowance', pos:'n', vi:'tiền trợ cấp', topics:['salaries_and_benefits']} ]},

    { id:'f198', base:'amount', forms:[
      {w:'amount', pos:'n', vi:'số tiền', topics:['invoice']} ]},

    { id:'f199', base:'appetizer', forms:[
      {w:'appetizer', pos:'n', vi:'món khai vị', topics:['restaurant']} ]},

    { id:'f200', base:'assistant', forms:[
      {w:'assistant', pos:'n', vi:'trợ lý', topics:['office']} ]},

    { id:'f201', base:'attendee', forms:[
      {w:'attendee', pos:'n', vi:'người tham dự', topics:['conference']} ]},

    { id:'f202', base:'audience', forms:[
      {w:'audience', pos:'n', vi:'khán giả, người tham dự; đối tượng khách hàng', topics:['conference','marketing']} ]},

    { id:'f203', base:'audit', forms:[
      {w:'audit', pos:'n', vi:'kiểm toán', topics:['accounting']} ]},

    { id:'f204', base:'account', forms:[
      {w:'account', pos:'n', vi:'tài khoản', topics:['accounting','banking','invoice']},
      {w:'savings account', pos:'n', vi:'tài khoản tiết kiệm', topics:['banking']} ]},

    { id:'f205', base:'balance', forms:[
      {w:'balance', pos:'n', vi:'số dư', topics:['accounting','banking','invoice']} ]},

    { id:'f206', base:'statement', forms:[
      {w:'statement', pos:'n', vi:'bản báo cáo', topics:['accounting']},
      {w:'bank statement', pos:'n', vi:'bảng sao kê ngân hàng', topics:['banking']} ]},

    { id:'f207', base:'bargain', forms:[
      {w:'bargain', pos:'n', vi:'món hời, món rẻ', topics:['shopping']} ]},

    { id:'f208', base:'benefit', forms:[
      {w:'benefit', pos:'n', vi:'phúc lợi', topics:['salaries_and_benefits']},
      {w:'benefits', pos:'n', vi:'phúc lợi', topics:['applying_and_interviewing']} ]},

    { id:'f209', base:'bill', forms:[
      {w:'bill', pos:'n', vi:'hóa đơn, hóa đơn thanh toán', topics:['invoice','restaurant']} ]},

    { id:'f210', base:'binding', forms:[
      {w:'binding', pos:'adj', vi:'ràng buộc', topics:['contract']} ]},

    { id:'f211', base:'bonus', forms:[
      {w:'bonus', pos:'n', vi:'thưởng', topics:['salaries_and_benefits']} ]},

    { id:'f212', base:'brand', forms:[
      {w:'brand', pos:'n', vi:'thương hiệu', topics:['marketing']} ]},

    { id:'f213', base:'break', forms:[
      {w:'break', pos:'n', vi:'giải lao', topics:['conference']},
      {w:'break', pos:'v', vi:'vi phạm, phá vỡ (hợp đồng)', topics:['contract']} ]},

    { id:'f214', base:'browser', forms:[
      {w:'browser', pos:'n', vi:'trình duyệt', topics:['computer']} ]},

    { id:'f215', base:'budget', forms:[
      {w:'budget', pos:'n', vi:'ngân sách', topics:['accounting']} ]},

    { id:'f216', base:'buy', forms:[
      {w:'buy', pos:'v', vi:'mua', topics:['inventory','shopping']} ]},

    { id:'f217', base:'call', forms:[
      {w:'call', pos:'v', vi:'gọi (điện)', topics:['office']} ]},

    { id:'f218', base:'campaign', forms:[
      {w:'campaign', pos:'n', vi:'chiến dịch', topics:['marketing']} ]},

    { id:'f219', base:'cancel', forms:[
      {w:'cancel', pos:'v', vi:'hủy bỏ', topics:['contract','travel']} ]},

    { id:'f220', base:'cart', forms:[
      {w:'cart', pos:'n', vi:'giỏ hàng', topics:['shopping']} ]},

    { id:'f221', base:'chair', forms:[
      {w:'chair', pos:'n', vi:'ghế', topics:['office']} ]},

    { id:'f222', base:'change', forms:[
      {w:'change', pos:'v', vi:'thay đổi', topics:['contract']} ]},

    { id:'f223', base:'check', forms:[
      {w:'check', pos:'n', vi:'séc', topics:['banking']} ]},

    { id:'f224', base:'chef', forms:[
      {w:'chef', pos:'n', vi:'bếp trưởng', topics:['restaurant']} ]},

    { id:'f225', base:'clause', forms:[
      {w:'clause', pos:'n', vi:'điều khoản (trong hợp đồng)', topics:['contract']} ]},

    { id:'f226', base:'commission', forms:[
      {w:'commission', pos:'n', vi:'hoa hồng', topics:['salaries_and_benefits']} ]},

    { id:'f227', base:'competitor', forms:[
      {w:'competitor', pos:'n', vi:'đối thủ cạnh tranh', topics:['marketing']} ]},

    { id:'f228', base:'computer', forms:[
      {w:'computer', pos:'n', vi:'máy tính', topics:['computer','office']} ]},

    { id:'f229', base:'condition', forms:[
      {w:'condition', pos:'n', vi:'điều kiện; tình trạng', topics:['contract','warranties']} ]},

    { id:'f230', base:'conference', forms:[
      {w:'conference', pos:'n', vi:'hội nghị', topics:['conference']} ]},

    { id:'f231', base:'cook', forms:[
      {w:'cook', pos:'n', vi:'đầu bếp', topics:['restaurant']} ]},

    { id:'f232', base:'copy', forms:[
      {w:'copy', pos:'n', vi:'bản sao', topics:['correspondence','office']} ]},

    { id:'f233', base:'correspond', forms:[
      {w:'correspond', pos:'v', vi:'thư tín, liên lạc', topics:['correspondence']} ]},

    { id:'f234', base:'coverage', forms:[
      {w:'coverage', pos:'n', vi:'phạm vi bảo hành, sự bảo vệ', topics:['warranties']} ]},

    { id:'f235', base:'credit', forms:[
      {w:'credit', pos:'n', vi:'tín dụng, khoản tín dụng', topics:['banking','invoice']} ]},

    { id:'f236', base:'customer', forms:[
      {w:'customer', pos:'n', vi:'khách hàng', topics:['marketing','shopping']} ]},

    { id:'f237', base:'deadline', forms:[
      {w:'deadline', pos:'n', vi:'hạn chót', topics:['contract']} ]},

    { id:'f238', base:'debit', forms:[
      {w:'debit', pos:'n', vi:'ghi nợ', topics:['banking']} ]},

    { id:'f239', base:'debt', forms:[
      {w:'debt', pos:'n', vi:'khoản nợ', topics:['accounting']} ]},

    { id:'f240', base:'defect', forms:[
      {w:'defect', pos:'n', vi:'lỗi, khuyết điểm', topics:['warranties']} ]},

    { id:'f241', base:'delivery', forms:[
      {w:'delivery', pos:'n', vi:'sự giao hàng', topics:['correspondence','inventory','shopping']} ]},

    { id:'f242', base:'depreciation', forms:[
      {w:'depreciation', pos:'n', vi:'khấu hao', topics:['accounting']} ]},

    { id:'f243', base:'desk', forms:[
      {w:'desk', pos:'n', vi:'bàn làm việc', topics:['office']} ]},

    { id:'f244', base:'dessert', forms:[
      {w:'dessert', pos:'n', vi:'món tráng miệng', topics:['restaurant']} ]},

    { id:'f245', base:'discount', forms:[
      {w:'discount', pos:'n', vi:'giảm giá', topics:['inventory','invoice','marketing','shopping']} ]},

    { id:'f246', base:'discussion', forms:[
      {w:'discussion', pos:'n', vi:'cuộc thảo luận', topics:['conference']} ]},

    { id:'f247', base:'dish', forms:[
      {w:'dish', pos:'n', vi:'món ăn', topics:['restaurant']} ]},

    { id:'f248', base:'dispute', forms:[
      {w:'dispute', pos:'n', vi:'tranh chấp', topics:['contract']} ]},

    { id:'f249', base:'document', forms:[
      {w:'document', pos:'n', vi:'tài liệu', topics:['office']} ]},

    { id:'f250', base:'download', forms:[
      {w:'download', pos:'v', vi:'tải xuống', topics:['computer']} ]},

    { id:'f251', base:'drink', forms:[
      {w:'drink', pos:'n', vi:'đồ uống', topics:['restaurant']} ]},

    { id:'f252', base:'due', forms:[
      {w:'due', pos:'adj', vi:'đến hạn', topics:['invoice']},
      {w:'due date', pos:'n', vi:'ngày đáo hạn', topics:['invoice']},
      {w:'due balance', pos:'n', vi:'số dư phải thanh toán', topics:['invoice']} ]},

    { id:'f253', base:'email', forms:[
      {w:'email', pos:'n', vi:'thư điện tử', topics:['correspondence','office']} ]},

    { id:'f254', base:'employ', forms:[
      {w:'employee', pos:'n', vi:'nhân viên', topics:['job_advertising_and_recruiting','salaries_and_benefits']},
      {w:'employer', pos:'n', vi:'nhà tuyển dụng', topics:['applying_and_interviewing','job_advertising_and_recruiting']} ]},

    { id:'f255', base:'envelope', forms:[
      {w:'envelope', pos:'n', vi:'bao thư', topics:['correspondence']} ]},

    { id:'f256', base:'exchange', forms:[
      {w:'exchange', pos:'v', vi:'đổi, trao đổi', topics:['inventory','shopping']},
      {w:'exchange rate', pos:'n', vi:'tỷ giá hối đoái', topics:['banking']} ]},

    { id:'f257', base:'exclusion', forms:[
      {w:'exclusion', pos:'n', vi:'điều khoản loại trừ', topics:['warranties']} ]},

    { id:'f258', base:'experience', forms:[
      {w:'experience', pos:'n', vi:'kinh nghiệm', topics:['applying_and_interviewing','job_advertising_and_recruiting']} ]},

    { id:'f259', base:'extend', forms:[
      {w:'extend', pos:'v', vi:'kéo dài, gia hạn', topics:['warranties','travel']} ]},

    { id:'f260', base:'faulty', forms:[
      {w:'faulty', pos:'adj', vi:'lỗi, hỏng', topics:['warranties']} ]},

    { id:'f261', base:'fee', forms:[
      {w:'fee', pos:'n', vi:'phí', topics:['banking']},
      {w:'late fee', pos:'n', vi:'phí trễ', topics:['invoice']},
      {w:'transaction fee', pos:'n', vi:'phí giao dịch', topics:['banking']} ]},

    { id:'f262', base:'file', forms:[
      {w:'file', pos:'n', vi:'tệp; hồ sơ, tài liệu', topics:['computer','office']} ]},

    { id:'f263', base:'folder', forms:[
      {w:'folder', pos:'n', vi:'túi đựng tài liệu', topics:['office']} ]},

    { id:'f264', base:'formal', forms:[
      {w:'formal', pos:'adj', vi:'chính thức', topics:['correspondence']},
      {w:'informal', pos:'adj', vi:'thân mật, không chính thức', topics:['correspondence']} ]},

    { id:'f265', base:'forward', forms:[
      {w:'forward', pos:'v', vi:'chuyển tiếp', topics:['correspondence']} ]},

    { id:'f266', base:'full-time', forms:[
      {w:'full-time', pos:'adj', vi:'toàn thời gian', topics:['applying_and_interviewing','job_advertising_and_recruiting']} ]},

    { id:'f267', base:'part-time', forms:[
      {w:'part-time', pos:'adj', vi:'bán thời gian', topics:['applying_and_interviewing','job_advertising_and_recruiting']} ]},

    { id:'f268', base:'goods', forms:[
      {w:'goods', pos:'n', vi:'hàng hóa', topics:['inventory']} ]},

    { id:'f269', base:'hardware', forms:[
      {w:'hardware', pos:'n', vi:'phần cứng', topics:['computer']} ]},

    { id:'f270', base:'health', forms:[
      {w:'health', pos:'n', vi:'sức khỏe', topics:['salaries_and_benefits']} ]},

    { id:'f271', base:'hiring', forms:[
      {w:'hiring', pos:'n', vi:'tuyển dụng', topics:['applying_and_interviewing','job_advertising_and_recruiting']} ]},

    { id:'f272', base:'influence', forms:[
      {w:'influence', pos:'n', vi:'ảnh hưởng', topics:['marketing']} ]},

    { id:'f273', base:'insurance', forms:[
      {w:'insurance', pos:'n', vi:'bảo hiểm', topics:['salaries_and_benefits']} ]},

    { id:'f274', base:'interest', forms:[
      {w:'interest', pos:'n', vi:'lãi suất', topics:['banking']} ]},

    { id:'f275', base:'interview', forms:[
      {w:'interview', pos:'n', vi:'cuộc phỏng vấn', topics:['applying_and_interviewing','job_advertising_and_recruiting']},
      {w:'interviewer', pos:'n', vi:'người phỏng vấn', topics:['applying_and_interviewing']} ]},

    { id:'f276', base:'inventory', forms:[
      {w:'inventory', pos:'n', vi:'hàng hóa, kiểm kê kho hàng', topics:['inventory']} ]},

    { id:'f277', base:'item', forms:[
      {w:'item', pos:'n', vi:'mặt hàng, món hàng', topics:['inventory']} ]},

    { id:'f278', base:'job description', forms:[
      {w:'job description', pos:'n', vi:'mô tả công việc', topics:['applying_and_interviewing']} ]},

    { id:'f279', base:'job listing', forms:[
      {w:'job listing', pos:'n', vi:'danh sách việc làm', topics:['job_advertising_and_recruiting']} ]},

    { id:'f280', base:'job offer', forms:[
      {w:'job offer', pos:'n', vi:'lời mời làm việc', topics:['applying_and_interviewing']} ]},

    { id:'f281', base:'job opening', forms:[
      {w:'job opening', pos:'n', vi:'cơ hội việc làm, vị trí tuyển dụng', topics:['applying_and_interviewing','job_advertising_and_recruiting']} ]},

    { id:'f282', base:'keyboard', forms:[
      {w:'keyboard', pos:'n', vi:'bàn phím', topics:['computer']} ]},

    { id:'f283', base:'label', forms:[
      {w:'label', pos:'n', vi:'nhãn, mác', topics:['inventory']} ]},

    { id:'f284', base:'legal', forms:[
      {w:'legal', pos:'adj', vi:'hợp pháp', topics:['contract']} ]},

    { id:'f285', base:'sign', forms:[
      {w:'sign', pos:'v', vi:'ký', topics:['contract']} ]},

    { id:'f286', base:'ledger', forms:[
      {w:'ledger', pos:'n', vi:'sổ cái', topics:['accounting']} ]},

    { id:'f287', base:'total', forms:[
      {w:'total', pos:'n', vi:'tổng cộng', topics:['invoice']} ]},

    { id:'f288', base:'letter', forms:[
      {w:'letter', pos:'n', vi:'thư', topics:['correspondence']} ]},

    { id:'f289', base:'liability', forms:[
      {w:'liability', pos:'n', vi:'nghĩa vụ, khoản nợ', topics:['accounting']} ]},

    { id:'f290', base:'main course', forms:[
      {w:'main course', pos:'n', vi:'món chính', topics:['restaurant']} ]},

    { id:'f291', base:'maintenance', forms:[
      {w:'maintenance', pos:'n', vi:'bảo dưỡng', topics:['warranties']} ]},

    { id:'f292', base:'market', forms:[
      {w:'market', pos:'n', vi:'thị trường', topics:['marketing']} ]},

    { id:'f293', base:'media', forms:[
      {w:'media', pos:'n', vi:'phương tiện truyền thông', topics:['marketing']} ]},

    { id:'f294', base:'meeting', forms:[
      {w:'meeting', pos:'n', vi:'cuộc họp', topics:['conference','office']} ]},

    { id:'f295', base:'menu', forms:[
      {w:'menu', pos:'n', vi:'thực đơn', topics:['restaurant']} ]},

    { id:'f296', base:'message', forms:[
      {w:'message', pos:'n', vi:'tin nhắn, thông điệp', topics:['correspondence']} ]},

    { id:'f297', base:'moderator', forms:[
      {w:'moderator', pos:'n', vi:'người điều hành', topics:['conference']} ]},

    { id:'f298', base:'mortgage', forms:[
      {w:'mortgage', pos:'n', vi:'vay thế chấp', topics:['banking']} ]},

    { id:'f299', base:'mouse', forms:[
      {w:'mouse', pos:'n', vi:'chuột (máy tính)', topics:['computer']} ]},

    { id:'f300', base:'network', forms:[
      {w:'network', pos:'n', vi:'mạng', topics:['computer']} ]},

    { id:'f301', base:'networking', forms:[
      {w:'networking', pos:'n', vi:'kết nối, giao lưu', topics:['conference']} ]},

    { id:'f302', base:'office', forms:[
      {w:'office', pos:'n', vi:'văn phòng', topics:['office']} ]},

    { id:'f303', base:'order', forms:[
      {w:'order', pos:'n', vi:'đơn hàng', topics:['inventory']},
      {w:'order', pos:'v', vi:'gọi món', topics:['restaurant']},
      {w:'order in', pos:'v', vi:'đặt đồ ăn mang về', topics:['restaurant']} ]},

    { id:'f304', base:'overdraft', forms:[
      {w:'overdraft', pos:'n', vi:'thấu chi', topics:['banking']} ]},

    { id:'f305', base:'overtime', forms:[
      {w:'overtime', pos:'n', vi:'làm thêm giờ', topics:['salaries_and_benefits']} ]},

    { id:'f306', base:'package', forms:[
      {w:'package', pos:'n', vi:'gói, kiện hàng', topics:['inventory']} ]},

    { id:'f307', base:'paid leave', forms:[
      {w:'paid leave', pos:'n', vi:'nghỉ phép có lương', topics:['salaries_and_benefits']} ]},

    { id:'f308', base:'panel', forms:[
      {w:'panel', pos:'n', vi:'ban hội thảo', topics:['conference']} ]},

    { id:'f309', base:'party', forms:[
      {w:'party', pos:'n', vi:'bên (trong hợp đồng)', topics:['contract']} ]},

    { id:'f310', base:'password', forms:[
      {w:'password', pos:'n', vi:'mật khẩu', topics:['computer']} ]},

    { id:'f311', base:'pension', forms:[
      {w:'pension', pos:'n', vi:'lương hưu', topics:['salaries_and_benefits']} ]},

    { id:'f312', base:'phone', forms:[
      {w:'phone', pos:'n', vi:'điện thoại', topics:['office']} ]},

    { id:'f313', base:'policy', forms:[
      {w:'policy', pos:'n', vi:'chính sách', topics:['warranties']} ]},

    { id:'f314', base:'portion', forms:[
      {w:'portion', pos:'n', vi:'phần ăn', topics:['restaurant']} ]},

    { id:'f315', base:'position', forms:[
      {w:'position', pos:'n', vi:'vị trí', topics:['job_advertising_and_recruiting']} ]},

    { id:'f316', base:'post', forms:[
      {w:'post', pos:'n', vi:'thư gửi qua bưu điện', topics:['correspondence']},
      {w:'postman', pos:'n', vi:'người đưa thư', topics:['correspondence']} ]},

    { id:'f317', base:'price', forms:[
      {w:'price', pos:'n', vi:'giá', topics:['inventory','marketing','shopping']},
      {w:'price tag', pos:'n', vi:'mác giá', topics:['shopping']} ]},

    { id:'f318', base:'printer', forms:[
      {w:'printer', pos:'n', vi:'máy in', topics:['office']} ]},

    { id:'f319', base:'product', forms:[
      {w:'product', pos:'n', vi:'sản phẩm', topics:['inventory','marketing']} ]},

    { id:'f320', base:'profit', forms:[
      {w:'profit', pos:'n', vi:'lợi nhuận', topics:['accounting']} ]},

    { id:'f321', base:'program', forms:[
      {w:'program', pos:'n', vi:'chương trình', topics:['computer']} ]},

    { id:'f322', base:'qualification', forms:[
      {w:'qualification', pos:'n', vi:'trình độ chuyên môn', topics:['applying_and_interviewing','job_advertising_and_recruiting']} ]},

    { id:'f323', base:'raise', forms:[
      {w:'raise', pos:'n', vi:'tăng lương', topics:['salaries_and_benefits']} ]},

    { id:'f324', base:'reach', forms:[
      {w:'reach', pos:'v', vi:'tiếp cận', topics:['marketing']} ]},

    { id:'f325', base:'recruit', forms:[
      {w:'recruit', pos:'v', vi:'tuyển dụng', topics:['job_advertising_and_recruiting']} ]},

    { id:'f326', base:'refund', forms:[
      {w:'refund', pos:'n', vi:'sự hoàn lại tiền', topics:['invoice','shopping','warranties']} ]},

    { id:'f327', base:'repair', forms:[
      {w:'repair', pos:'v', vi:'sửa chữa', topics:['warranties']} ]},

    { id:'f328', base:'reply', forms:[
      {w:'reply', pos:'v', vi:'trả lời', topics:['correspondence']} ]},

    { id:'f329', base:'report', forms:[
      {w:'report', pos:'n', vi:'báo cáo', topics:['accounting','office']} ]},

    { id:'f330', base:'research', forms:[
      {w:'research', pos:'n', vi:'nghiên cứu', topics:['marketing']} ]},

    { id:'f331', base:'reservation', forms:[
      {w:'reservation', pos:'n', vi:'đặt chỗ', topics:['restaurant','travel']} ]},

    { id:'f332', base:'restock', forms:[
      {w:'restock', pos:'v', vi:'cung cấp lại hàng hóa', topics:['inventory']} ]},

    { id:'f333', base:'resume', forms:[
      {w:'resume', pos:'n', vi:'sơ yếu lý lịch', topics:['applying_and_interviewing','job_advertising_and_recruiting']} ]},

    { id:'f334', base:'retailer', forms:[
      {w:'retailer', pos:'n', vi:'người bán lẻ', topics:['shopping']} ]},

    { id:'f335', base:'return', forms:[
      {w:'return', pos:'v', vi:'trả lại; trở về', topics:['inventory','travel']} ]},

    { id:'f336', base:'revenue', forms:[
      {w:'revenue', pos:'n', vi:'doanh thu', topics:['accounting']} ]},

    { id:'f337', base:'salary', forms:[
      {w:'salary', pos:'n', vi:'lương', topics:['applying_and_interviewing','job_advertising_and_recruiting','salaries_and_benefits']},
      {w:'salary scale', pos:'n', vi:'thang lương', topics:['salaries_and_benefits']} ]},

    { id:'f338', base:'sale', forms:[
      {w:'sale', pos:'n', vi:'khuyến mãi, đợt bán hàng', topics:['shopping']} ]},

    { id:'f339', base:'sales', forms:[
      {w:'sales', pos:'n', vi:'doanh số bán hàng', topics:['marketing']} ]},

    { id:'f340', base:'schedule', forms:[
      {w:'schedule', pos:'n', vi:'lịch trình', topics:['conference','travel']},
      {w:'schedule', pos:'v', vi:'lên lịch, sắp xếp', topics:['office']} ]},

    { id:'f341', base:'screen', forms:[
      {w:'screen', pos:'n', vi:'màn hình', topics:['computer']} ]},

    { id:'f342', base:'search', forms:[
      {w:'search', pos:'v', vi:'tìm kiếm', topics:['computer']} ]},

    { id:'f343', base:'security', forms:[
      {w:'security', pos:'n', vi:'an ninh, bảo mật', topics:['banking','computer']} ]},

    { id:'f344', base:'sell', forms:[
      {w:'sell', pos:'v', vi:'bán', topics:['inventory','marketing']} ]},

    { id:'f345', base:'seminar', forms:[
      {w:'seminar', pos:'n', vi:'hội thảo, lớp học', topics:['conference']} ]},

    { id:'f346', base:'send', forms:[
      {w:'send', pos:'v', vi:'gửi', topics:['correspondence']},
      {w:'sender', pos:'n', vi:'người gửi', topics:['correspondence']} ]},

    { id:'f347', base:'service', forms:[
      {w:'service', pos:'n', vi:'dịch vụ', topics:['restaurant','warranties']} ]},

    { id:'f348', base:'shop', forms:[
      {w:'shop', pos:'n', vi:'cửa hàng', topics:['shopping']},
      {w:'shopping mall', pos:'n', vi:'trung tâm mua sắm', topics:['shopping']} ]},

    { id:'f349', base:'signature', forms:[
      {w:'signature', pos:'n', vi:'chữ ký', topics:['correspondence']} ]},

    { id:'f350', base:'skill', forms:[
      {w:'skill', pos:'n', vi:'kỹ năng', topics:['applying_and_interviewing']} ]},

    { id:'f351', base:'software', forms:[
      {w:'software', pos:'n', vi:'phần mềm', topics:['computer']} ]},

    { id:'f352', base:'speaker', forms:[
      {w:'speaker', pos:'n', vi:'diễn giả, người phát biểu', topics:['conference']} ]},

    { id:'f353', base:'special', forms:[
      {w:'special', pos:'adj', vi:'đặc biệt', topics:['restaurant']} ]},

    { id:'f354', base:'stock', forms:[
      {w:'stock', pos:'n', vi:'hàng hóa, hàng tồn kho', topics:['inventory','shopping']} ]},

    { id:'f355', base:'stockroom', forms:[
      {w:'stockroom', pos:'n', vi:'phòng kho', topics:['inventory']} ]},

    { id:'f356', base:'store', syn:['shop'], forms:[
      {w:'store', pos:'n', vi:'cửa hàng', topics:['shopping']} ]},

    { id:'f357', base:'strategy', forms:[
      {w:'strategy', pos:'n', vi:'chiến lược', topics:['marketing']} ]},

    { id:'f358', base:'subject', forms:[
      {w:'subject', pos:'n', vi:'chủ đề (thư từ)', topics:['correspondence']} ]},

    { id:'f359', base:'system', forms:[
      {w:'system', pos:'n', vi:'hệ thống', topics:['computer']} ]},

    { id:'f360', base:'table', forms:[
      {w:'table', pos:'n', vi:'bàn ăn', topics:['restaurant']} ]},

    { id:'f361', base:'takeout', forms:[
      {w:'takeout', pos:'n', vi:'mang đi', topics:['restaurant']} ]},

    { id:'f362', base:'target', forms:[
      {w:'target', pos:'n', vi:'mục tiêu', topics:['marketing']} ]},

    { id:'f363', base:'task', forms:[
      {w:'task', pos:'n', vi:'nhiệm vụ', topics:['office']} ]},

    { id:'f364', base:'tax', forms:[
      {w:'tax', pos:'n', vi:'thuế', topics:['accounting','salaries_and_benefits']} ]},

    { id:'f365', base:'team', forms:[
      {w:'team', pos:'n', vi:'đội, nhóm', topics:['office']} ]},

    { id:'f366', base:'term', forms:[
      {w:'term', pos:'n', vi:'điều khoản', topics:['contract']},
      {w:'terms', pos:'n', vi:'điều khoản (thường dùng số nhiều)', topics:['invoice','warranties']} ]},

    { id:'f367', base:'terminate', forms:[
      {w:'terminate', pos:'v', vi:'chấm dứt (hợp đồng)', topics:['contract']} ]},

    { id:'f368', base:'tip', forms:[
      {w:'tip', pos:'n', vi:'tiền boa', topics:['restaurant']} ]},

    { id:'f369', base:'topic', forms:[
      {w:'topic', pos:'n', vi:'chủ đề (hội nghị)', topics:['conference']} ]},

    { id:'f370', base:'transaction', forms:[
      {w:'transaction', pos:'n', vi:'giao dịch', topics:['accounting','banking']} ]},

    { id:'f371', base:'transfer', forms:[
      {w:'transfer', pos:'v', vi:'chuyển nhượng', topics:['warranties']} ]},

    { id:'f372', base:'update', forms:[
      {w:'update', pos:'v', vi:'cập nhật', topics:['computer']} ]},

    { id:'f373', base:'upload', forms:[
      {w:'upload', pos:'v', vi:'tải lên', topics:['computer']} ]},

    { id:'f374', base:'vacancy', forms:[
      {w:'vacancy', pos:'n', vi:'vị trí tuyển dụng; phòng trống', topics:['applying_and_interviewing','job_advertising_and_recruiting','travel']} ]},

    { id:'f375', base:'vacation', forms:[
      {w:'vacation', pos:'n', vi:'nghỉ phép', topics:['salaries_and_benefits']} ]},

    { id:'f376', base:'valid', forms:[
      {w:'valid', pos:'adj', vi:'hợp lệ, có giá trị', topics:['warranties']} ]},

    { id:'f377', base:'vendor', forms:[
      {w:'vendor', pos:'n', vi:'người bán hàng', topics:['shopping']} ]},

    { id:'f378', base:'venue', forms:[
      {w:'venue', pos:'n', vi:'địa điểm tổ chức', topics:['conference']} ]},

    { id:'f379', base:'virus', forms:[
      {w:'virus', pos:'n', vi:'vi-rút (máy tính)', topics:['computer']} ]},

    { id:'f380', base:'wage', forms:[
      {w:'wage', pos:'n', vi:'tiền công', topics:['salaries_and_benefits']} ]},

    { id:'f381', base:'wait', forms:[
      {w:'wait', pos:'v', vi:'chờ đợi', topics:['restaurant']} ]},

    { id:'f382', base:'waiter', forms:[
      {w:'waiter', pos:'n', vi:'bồi bàn (nam)', topics:['restaurant']},
      {w:'waitress', pos:'n', vi:'bồi bàn (nữ)', topics:['restaurant']} ]},

    { id:'f383', base:'warehouse', forms:[
      {w:'warehouse', pos:'n', vi:'kho hàng', topics:['inventory']} ]},

    { id:'f384', base:'warranty', forms:[
      {w:'warranty', pos:'n', vi:'bảo hành', topics:['warranties']} ]},

    { id:'f385', base:'website', forms:[
      {w:'website', pos:'n', vi:'trang web', topics:['computer']} ]},

    { id:'f386', base:'withdraw', forms:[
      {w:'withdraw', pos:'v', vi:'rút tiền', topics:['banking']} ]},

    { id:'f387', base:'witness', forms:[
      {w:'witness', pos:'n', vi:'người chứng kiến', topics:['contract']} ]},

    { id:'f388', base:'workshop', forms:[
      {w:'workshop', pos:'n', vi:'hội thảo, lớp học', topics:['conference']} ]},

    /* ---- TỪ VỰNG CHỦ ĐỀ DU LỊCH (travel) ---- */
    { id:'f389', base:'delay', forms:[
      {w:'delay', pos:'n', vi:'trì hoãn', topics:['travel']},
      {w:'delay', pos:'v', vi:'hoãn lại', topics:['travel']} ]},

    { id:'f390', base:'pack', forms:[
      {w:'pack', pos:'v', vi:'xếp đồ', topics:['travel']},
      {w:'unpack', pos:'v', vi:'mở đồ', topics:['travel']} ]},

    { id:'f391', base:'check in', forms:[
      {w:'check in', pos:'v', vi:'làm thủ tục', topics:['travel']},
      {w:'check out', pos:'v', vi:'trả phòng', topics:['travel']} ]},

    { id:'f392', base:'arrival', forms:[
      {w:'arrival', pos:'n', vi:'đến nơi', topics:['travel']},
      {w:'arrive', pos:'v', vi:'đến', topics:['travel']} ]},

    { id:'f393', base:'ticket', forms:[
      {w:'one way ticket', pos:'n', vi:'vé một chiều', topics:['travel']},
      {w:'round-trip ticket', pos:'n', vi:'vé khứ hồi', topics:['travel']} ]},

    { id:'f394', base:'room', forms:[
      {w:'single room', pos:'n', vi:'phòng đơn', topics:['travel']},
      {w:'double room', pos:'n', vi:'phòng đôi', topics:['travel']} ]},

    { id:'f395', base:'get on', forms:[
      {w:'get on', pos:'phr', vi:'lên (phương tiện)', topics:['travel']},
      {w:'get off', pos:'phr', vi:'xuống (phương tiện)', topics:['travel']} ]},

    { id:'f396', base:'airplane', forms:[
      {w:'airplane', pos:'n', vi:'máy bay', topics:['travel']} ]},

    { id:'f397', base:'amenities', forms:[
      {w:'amenities', pos:'n', vi:'tiện nghi', topics:['travel']} ]},

    { id:'f398', base:'baggage', syn:['luggage'], forms:[
      {w:'baggage', pos:'n', vi:'hành lý', topics:['travel']} ]},

    { id:'f399', base:'boarding pass', forms:[
      {w:'boarding pass', pos:'n', vi:'thẻ lên máy bay', topics:['travel']} ]},

    { id:'f400', base:'board', forms:[
      {w:'board', pos:'v', vi:'lên (máy bay/tàu/xe)', topics:['travel']} ]},

    { id:'f401', base:'book', forms:[
      {w:'book', pos:'v', vi:'đặt trước', topics:['travel']} ]},

    { id:'f402', base:'breakfast buffet', forms:[
      {w:'breakfast buffet', pos:'n', vi:'bữa sáng tự chọn', topics:['travel']} ]},

    { id:'f403', base:'check-in counter', forms:[
      {w:'check-in counter', pos:'n', vi:'quầy làm thủ tục', topics:['travel']} ]},

    { id:'f404', base:'concierge', forms:[
      {w:'concierge', pos:'n', vi:'nhân viên hỗ trợ (khách sạn)', topics:['travel']} ]},

    { id:'f405', base:'cruise', forms:[
      {w:'cruise', pos:'n', vi:'du thuyền', topics:['travel']} ]},

    { id:'f406', base:'customs', forms:[
      {w:'customs', pos:'n', vi:'hải quan', topics:['travel']} ]},

    { id:'f407', base:'drive', forms:[
      {w:'drive', pos:'v', vi:'lái xe', topics:['travel']} ]},

    { id:'f408', base:'enjoy', forms:[
      {w:'enjoy', pos:'v', vi:'tận hưởng', topics:['travel']} ]},

    { id:'f409', base:'explore', forms:[
      {w:'explore', pos:'v', vi:'khám phá', topics:['travel']} ]},

    { id:'f410', base:'ferry', forms:[
      {w:'ferry', pos:'n', vi:'phà', topics:['travel']} ]},

    { id:'f411', base:'find', forms:[
      {w:'find', pos:'v', vi:'tìm thấy', topics:['travel']} ]},

    { id:'f412', base:'flight', forms:[
      {w:'flight', pos:'n', vi:'chuyến bay', topics:['travel']} ]},

    { id:'f413', base:'fly', forms:[
      {w:'fly', pos:'v', vi:'bay', topics:['travel']} ]},

    { id:'f414', base:'front desk', forms:[
      {w:'front desk', pos:'n', vi:'lễ tân', topics:['travel']} ]},

    { id:'f415', base:'guest', forms:[
      {w:'guest', pos:'n', vi:'khách', topics:['travel']} ]},

    { id:'f416', base:'hostel', forms:[
      {w:'hostel', pos:'n', vi:'nhà trọ', topics:['travel']} ]},

    { id:'f417', base:'hotel', forms:[
      {w:'hotel', pos:'n', vi:'khách sạn', topics:['travel']} ]},

    { id:'f418', base:'itinerary', forms:[
      {w:'itinerary', pos:'n', vi:'hành trình', topics:['travel']} ]},

    { id:'f419', base:'journey', forms:[
      {w:'journey', pos:'n', vi:'chuyến đi', topics:['travel']} ]},

    { id:'f420', base:'laundry service', forms:[
      {w:'laundry service', pos:'n', vi:'dịch vụ giặt ủi', topics:['travel']} ]},

    { id:'f421', base:'lobby', forms:[
      {w:'lobby', pos:'n', vi:'sảnh', topics:['travel']} ]},

    { id:'f422', base:'lose', forms:[
      {w:'lose', pos:'v', vi:'mất, làm mất', topics:['travel']} ]},

    { id:'f423', base:'luggage claim', forms:[
      {w:'luggage claim', pos:'n', vi:'khu nhận hành lý', topics:['travel']} ]},

    { id:'f424', base:'package tour', forms:[
      {w:'package tour', pos:'n', vi:'tour trọn gói', topics:['travel']} ]},

    { id:'f425', base:'passport', forms:[
      {w:'passport', pos:'n', vi:'hộ chiếu', topics:['travel']} ]},

    { id:'f426', base:'plan', forms:[
      {w:'plan', pos:'v', vi:'lên kế hoạch', topics:['travel']} ]},

    { id:'f427', base:'platform', forms:[
      {w:'platform', pos:'n', vi:'sân ga', topics:['travel']} ]},

    { id:'f428', base:'rate', forms:[
      {w:'rate', pos:'n', vi:'giá phòng, mức giá', topics:['travel']} ]},

    { id:'f429', base:'rent', forms:[
      {w:'rent', pos:'v', vi:'thuê', topics:['travel']} ]},

    { id:'f430', base:'resort', forms:[
      {w:'resort', pos:'n', vi:'khu nghỉ dưỡng', topics:['travel']} ]},

    { id:'f431', base:'room service', forms:[
      {w:'room service', pos:'n', vi:'dịch vụ phòng', topics:['travel']} ]},

    { id:'f432', base:'route', forms:[
      {w:'route', pos:'n', vi:'tuyến đường', topics:['travel']} ]},

    { id:'f433', base:'sail', forms:[
      {w:'sail', pos:'v', vi:'đi tàu, giong buồm', topics:['travel']} ]},

    { id:'f434', base:'seat belt', forms:[
      {w:'seat belt', pos:'n', vi:'dây an toàn', topics:['travel']} ]},

    { id:'f435', base:'stay', forms:[
      {w:'stay', pos:'v', vi:'lưu trú, ở lại', topics:['travel']} ]},

    { id:'f436', base:'subway', forms:[
      {w:'subway', pos:'n', vi:'tàu điện ngầm', topics:['travel']} ]},

    { id:'f437', base:'suite', forms:[
      {w:'suite', pos:'n', vi:'phòng hạng sang', topics:['travel']} ]},

    { id:'f438', base:'taxi', forms:[
      {w:'taxi', pos:'n', vi:'xe taxi', topics:['travel']} ]},

    { id:'f439', base:'terminal', forms:[
      {w:'terminal', pos:'n', vi:'nhà ga', topics:['travel']} ]},

    { id:'f440', base:'tour guide', forms:[
      {w:'tour guide', pos:'n', vi:'hướng dẫn viên', topics:['travel']} ]},

    { id:'f441', base:'train', forms:[
      {w:'train', pos:'n', vi:'tàu hỏa', topics:['travel']} ]},

    { id:'f442', base:'travel', forms:[
      {w:'travel', pos:'v', vi:'du lịch', topics:['travel']} ]},

    { id:'f443', base:'visa', forms:[
      {w:'visa', pos:'n', vi:'thị thực', topics:['travel']} ]},

    { id:'f444', base:'visit', forms:[
      {w:'visit', pos:'v', vi:'thăm, ghé thăm', topics:['travel']} ]},

    { id:'f445', base:'voucher', forms:[
      {w:'voucher', pos:'n', vi:'phiếu thanh toán, phiếu ưu đãi', topics:['travel']} ]},

    { id:'f446', base:'ask for directions', forms:[
      {w:'ask for directions', pos:'phr', vi:'hỏi đường', topics:['travel']} ]},

    { id:'f447', base:'be fully booked', forms:[
      {w:'be fully booked', pos:'phr', vi:'hết chỗ', topics:['travel']} ]},

    { id:'f448', base:'buy souvenirs', forms:[
      {w:'buy souvenirs', pos:'phr', vi:'mua quà lưu niệm', topics:['travel']} ]},

    { id:'f449', base:'cancel the trip', forms:[
      {w:'cancel the trip', pos:'phr', vi:'hủy chuyến đi', topics:['travel']} ]},

    { id:'f450', base:'catch a taxi', forms:[
      {w:'catch a taxi', pos:'phr', vi:'bắt taxi', topics:['travel']} ]},

    { id:'f451', base:'change the schedule', forms:[
      {w:'change the schedule', pos:'phr', vi:'thay đổi lịch trình', topics:['travel']} ]},

    { id:'f452', base:'check the timetable', forms:[
      {w:'check the timetable', pos:'phr', vi:'kiểm tra lịch trình', topics:['travel']} ]},

    { id:'f453', base:'confirm the flight', forms:[
      {w:'confirm the flight', pos:'phr', vi:'xác nhận chuyến bay', topics:['travel']} ]},

    { id:'f454', base:'fill out the form', forms:[
      {w:'fill out the form', pos:'phr', vi:'điền mẫu đơn', topics:['travel']} ]},

    { id:'f455', base:'find the way', forms:[
      {w:'find the way', pos:'phr', vi:'tìm đường', topics:['travel']} ]},

    { id:'f456', base:'go abroad', forms:[
      {w:'go abroad', pos:'phr', vi:'ra nước ngoài', topics:['travel']} ]},

    { id:'f457', base:'go on a business trip', forms:[
      {w:'go on a business trip', pos:'phr', vi:'đi công tác', topics:['travel']} ]},

    { id:'f458', base:'go sightseeing', forms:[
      {w:'go sightseeing', pos:'phr', vi:'đi tham quan', topics:['travel']} ]},

    { id:'f459', base:'go through customs', forms:[
      {w:'go through customs', pos:'phr', vi:'làm thủ tục hải quan', topics:['travel']} ]},

    { id:'f460', base:'lose the luggage', forms:[
      {w:'lose the luggage', pos:'phr', vi:'mất hành lý', topics:['travel']} ]},

    { id:'f461', base:'make a reservation', forms:[
      {w:'make a reservation', pos:'phr', vi:'đặt chỗ', topics:['travel']} ]},

    { id:'f462', base:'miss the flight', forms:[
      {w:'miss the flight', pos:'phr', vi:'lỡ chuyến bay', topics:['travel']} ]},

    { id:'f463', base:'pick up the luggage', forms:[
      {w:'pick up the luggage', pos:'phr', vi:'nhận hành lý', topics:['travel']} ]},

    { id:'f464', base:'run out of time', forms:[
      {w:'run out of time', pos:'phr', vi:'hết thời gian', topics:['travel']} ]},

    { id:'f465', base:'stay overnight', forms:[
      {w:'stay overnight', pos:'phr', vi:'ngủ qua đêm', topics:['travel']} ]},

    { id:'f466', base:'take a photo', forms:[
      {w:'take a photo', pos:'phr', vi:'chụp ảnh', topics:['travel']} ]},

    { id:'f467', base:'take off', forms:[
      {w:'take off', pos:'phr', vi:'cất cánh', topics:['travel']} ]},

    { id:'f468', base:'travel abroad', forms:[
      {w:'travel abroad', pos:'phr', vi:'du lịch nước ngoài', topics:['travel']} ]},

    /* ---- BỔ SUNG TỪ SỔ TAY (đợt 4) ---- */
    { id:'f469', base:'wide', forms:[
      {w:'wide', pos:'adj', vi:'rộng'},
      {w:'widely', pos:'adv', vi:'rộng rãi, phổ biến'},
      {w:'width', pos:'n', vi:'chiều rộng'} ]},

    { id:'f470', base:'loose', forms:[
      {w:'loose', pos:'adj', vi:'lỏng lẻo'},
      {w:'loosely', pos:'adv', vi:'một cách lỏng lẻo'},
      {w:'loosen', pos:'v', vi:'làm lỏng, nới lỏng'} ]},

    { id:'f471', base:'praise', forms:[
      {w:'praise', pos:'v', vi:'khen, ca tụng'},
      {w:'praise', pos:'n', vi:'lời khen'} ]},

    { id:'f472', base:'alongside', forms:[
      {w:'alongside', pos:'prep', vi:'bên cạnh'} ]},

    { id:'f473', base:'degree', forms:[
      {w:'degree', pos:'n', vi:'bằng cấp; mức độ, cấp độ'} ]},

    { id:'f474', base:'combination', forms:[
      {w:'combination', pos:'n', vi:'sự kết hợp'},
      {w:'combine', pos:'v', vi:'kết hợp'},
      {w:'combined', pos:'adj', vi:'được kết hợp'} ]},

    /* ---- BỔ SUNG TỪ SỔ TAY (đợt 5) ---- */
    { id:'f475', base:'sincere', forms:[
      {w:'sincere', pos:'adj', vi:'chân thành'},
      {w:'sincerely', pos:'adv', vi:'một cách chân thành; trân trọng (dùng để kết thư)'} ]},

    { id:'f476', base:'overwhelm', forms:[
      {w:'overwhelm', pos:'v', vi:'áp đảo, làm choáng ngợp'},
      {w:'overwhelmed', pos:'adj', vi:'cảm thấy choáng ngợp, quá tải'},
      {w:'overwhelming', pos:'adj', vi:'áp đảo, quá sức, mạnh mẽ'} ]},

    { id:'f477', base:'undergo', forms:[
      {w:'undergo', pos:'v', vi:'trải qua, chịu đựng'} ]},

    { id:'f478', base:'actual', forms:[
      {w:'actual', pos:'adj', vi:'thực tế, có thật'},
      {w:'actually', pos:'adv', vi:'thực ra, thực tế là'} ]},

    { id:'f479', base:'forecast', forms:[
      {w:'forecast', pos:'v', vi:'dự báo'},
      {w:'forecast', pos:'n', vi:'dự báo, bản dự báo'} ]},

    { id:'f480', base:'diverse', forms:[
      {w:'diverse', pos:'adj', vi:'đa dạng'},
      {w:'diversity', pos:'n', vi:'sự đa dạng'} ]},

    { id:'f481', base:'tow', syn:['pull'], forms:[
      {w:'tow', pos:'v', vi:'kéo (xe)'} ]},

    { id:'f482', base:'favorable', forms:[
      {w:'favorable', pos:'adj', vi:'thuận lợi'},
      {w:'favor', pos:'n', vi:'thiện cảm, sự ưu ái'},
      {w:'favor', pos:'v', vi:'ủng hộ, tán thành'},
      {w:'favorably', pos:'adv', vi:'một cách thuận lợi'} ]}
  ],

  /* ---- CẤU TRÚC / LIÊN TỪ / TRẠNG TỪ LIÊN KẾT ---- */
  /* after: đáp án đúng cho câu hỏi "theo sau bởi gì?" */
  structures: [
    // Từ vựng đi kèm giới từ / dạng
    { id:'s001', group:'Từ vựng', pattern:'instead of', after:'V-ing', vi:'thay vì', example:'instead of going out' },
    { id:'s002', group:'Từ vựng', pattern:'in addition to', after:'N / V-ing', vi:'ngoài ra, thêm vào đó', example:'in addition to the fee' },
    { id:'s003', group:'Từ vựng', pattern:'an instance of', after:'N', vi:'một ví dụ / trường hợp về', example:'an instance of success' },
    { id:'s004', group:'Từ vựng', pattern:'prior to', after:'N / V-ing', vi:'trước khi (= before + S + V)', example:'prior to the meeting' },
    { id:'s005', group:'Từ vựng', pattern:'as + adj/adv + as', after:'as', vi:'so sánh ngang bằng', example:'as fast as possible' },
    { id:'s006', group:'Từ vựng', pattern:'by the end of', after:'N', vi:'cho đến cuối, trước khi kết thúc (mốc thời gian)', example:'by the end of this month' },
    { id:'s007', group:'Từ vựng', pattern:'under', after:'N / V-ing', vi:'dưới sự, trong tình trạng', example:'under construction / under review' },

    // Nguyên nhân
    { id:'s010', group:'Nguyên nhân (Bởi vì)', pattern:'because / since / as', after:'S + V', vi:'bởi vì', example:'because he was late' },
    { id:'s011', group:'Nguyên nhân (Bởi vì)', pattern:'because of / due to / on account of / owing to', after:'N / V-ing', vi:'vì, do (bởi)', example:'due to the rain' },

    // Kết quả
    { id:'s020', group:'Kết quả (Vì vậy)', pattern:'therefore / thus / consequently / as a result', after:'S + V', vi:'vì vậy, do đó', example:'therefore, we cancelled it' },

    // Điều kiện phủ định
    { id:'s030', group:'Nếu không thì', pattern:'otherwise', after:'S + V', vi:'nếu không thì', example:'hurry, otherwise you will miss it' },

    // Nhượng bộ
    { id:'s040', group:'Nhượng bộ (Mặc dù)', pattern:'although / though / even though', after:'S + V', vi:'mặc dù', example:'although it was hard' },
    { id:'s041', group:'Nhượng bộ (Mặc dù)', pattern:'despite / in spite of', after:'N / V-ing', vi:'mặc dù, bất chấp', example:'despite the delay' },

    // Tương phản
    { id:'s050', group:'Tương phản (Tuy nhiên)', pattern:'however / nevertheless', after:'S + V', vi:'tuy nhiên', example:'however, sales rose' },
    { id:'s051', group:'Tương phản (Trong khi)', pattern:'while / whereas', after:'S + V', vi:'trong khi, trái lại', example:'while he agrees, she does not' },

    // Bổ sung
    { id:'s060', group:'Bổ sung (Ngoài ra)', pattern:'in addition / additionally / moreover / furthermore / besides', after:'S + V', vi:'ngoài ra, hơn nữa', example:'moreover, it is cheaper' },

    // Điều kiện
    { id:'s070', group:'Điều kiện (Miễn là)', pattern:'provided that / providing that / as long as / on condition that', after:'S + V', vi:'miễn là, với điều kiện là', example:'as long as you pay on time' },

    // Các liên từ / trạng từ khác
    { id:'s080', group:'Liên từ khác', pattern:'as soon as', after:'S + V', vi:'ngay khi, ngay lập tức', example:'as soon as it arrives' },
    { id:'s081', group:'Liên từ khác', pattern:'whether ... or ...', after:'S + V', vi:'liệu rằng, cho dù', example:'whether it rains or not' },
    { id:'s082', group:'Liên từ khác', pattern:'... as ...', after:'S + V', vi:'trong khi, trong lúc', example:'she called as I left' },
    { id:'s083', group:'Liên từ khác', pattern:'... also ...', after:'S + V', vi:'cũng', example:'she also joined' },
    { id:'s084', group:'Liên từ khác', pattern:'for instance', after:'S + V', vi:'ví dụ như', example:'for instance, apples are cheap' },
    { id:'s085', group:'Liên từ khác', pattern:'alternatively', after:'S + V', vi:'hoặc là, ngoài ra', example:'alternatively, take the bus' },
    { id:'s086', group:'Liên từ khác', pattern:'likewise', after:'S + V', vi:'tương tự như vậy', example:'likewise, prices fell' },
    { id:'s087', group:'Liên từ khác', pattern:'originally', after:'S + V', vi:'ban đầu', example:'originally, it cost less' },
    { id:'s088', group:'Liên từ khác', pattern:'regardless (of)', after:'N / V-ing', vi:'bất kể, bất chấp', example:'regardless of the cost' },
    { id:'s089', group:'Liên từ khác', pattern:'as well as', after:'N / V-ing', vi:'cũng như', example:'speed as well as accuracy' },
    { id:'s090', group:'Từ vựng', pattern:'demand for', after:'N', vi:'nhu cầu về, đối với', example:'demand for the product' },
    { id:'s091', group:'Từ vựng', pattern:'lead to', after:'N / V-ing', vi:'dẫn đến, gây ra', example:'lead to success' },
    { id:'s092', group:'Từ vựng', pattern:'be able to', after:'V (nguyên mẫu)', vi:'có thể', example:'be able to finish on time' }
  ],

  /* Nhãn hiển thị cho từng loại từ */
  posLabel: { n:'Danh từ', v:'Động từ', adj:'Tính từ', adv:'Trạng từ', prep:'Giới từ', phr:'Cụm từ' }
};

/* Cho phép dùng trong cả trình duyệt lẫn Node (để kiểm thử) */
if (typeof module !== 'undefined' && module.exports) { module.exports = TOEIC_DATA; }
