import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '../src/data/hot-jobs.json');

const locations = {
  vi: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'Bình Dương', 'Đồng Nai', 'Làm từ xa'],
  en: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Can Tho', 'Hai Phong', 'Binh Duong', 'Dong Nai', 'Remote'],
};

const types = {
  vi: ['Toàn thời gian', 'Bán thời gian', 'Làm từ xa', 'Hybrid'],
  en: ['Full time', 'Part time', 'Remote', 'Hybrid'],
};

const experiences = {
  vi: ['Không yêu cầu kinh nghiệm', 'Dưới 1 năm', '1 - 2 năm', '2 - 5 năm', 'Trên 5 năm'],
  en: ['No experience required', 'Under 1 year', '1 - 2 years', '2 - 5 years', 'Over 5 years'],
};

const salaries = {
  vi: ['Dưới 10 triệu', '10 - 15 triệu', '15 - 20 triệu', 'Trên 20 triệu', 'Thỏa thuận'],
  en: ['Under 10 million VND', '10 - 15 million VND', '15 - 20 million VND', 'Over 20 million VND', 'Negotiable'],
};

const disability = {
  vi: ['Vận động', 'Thị giác', 'Thính giác', 'Ngôn ngữ', 'Nhận thức', 'Khác'],
  en: ['Mobility', 'Visual', 'Hearing', 'Speech', 'Cognitive', 'Other'],
};

/** Job templates: visual-friendly roles marked with visualFriendly */
const templates = [
  { cat: ['Hỗ trợ khách hàng', 'Customer support'], ind: ['Dịch vụ khách hàng', 'Customer service'], titles: [
    ['Nhân viên tổng đài', 'Call center agent'], ['Chuyên viên CSKH qua điện thoại', 'Phone customer support specialist'],
    ['Nhân viên telesales', 'Telesales staff'], ['Tư vấn viên qua hotline', 'Hotline advisor'],
    ['Chăm sóc khách hàng online', 'Online customer care agent'], ['Nhân viên hỗ trợ chat', 'Live chat support agent'],
  ], visualFriendly: true, tags: [['Làm việc qua tai nghe', 'Phone-based work'], ['Không yêu cầu thị lực', 'No vision required'], ['Đào tạo quy trình rõ', 'Clear process training']] },
  { cat: ['Công nghệ thông tin', 'Information technology'], ind: ['Công nghệ thông tin', 'Information technology'], titles: [
    ['Lập trình viên Backend', 'Backend developer'], ['Lập trình viên Frontend', 'Frontend developer'],
    ['Kỹ sư QA phần mềm', 'Software QA engineer'], ['Chuyên viên kiểm thử accessibility', 'Accessibility tester'],
    ['Chuyên viên hỗ trợ kỹ thuật IT', 'IT technical support specialist'], ['Quản trị hệ thống', 'System administrator'],
    ['Chuyên viên phân tích dữ liệu', 'Data analyst'], ['Kỹ sư DevOps', 'DevOps engineer'],
  ], visualFriendly: true, tags: [['Screen reader friendly', 'Screen reader friendly'], ['Remote friendly', 'Remote friendly'], ['Tài liệu hóa đầy đủ', 'Fully documented workflow']] },
  { cat: ['Hành chính văn phòng', 'Office administration'], ind: ['Hành chính văn phòng', 'Office administration'], titles: [
    ['Nhân viên nhập liệu', 'Data entry staff'], ['Trợ lý hành chính', 'Administrative assistant'],
    ['Thư ký văn phòng', 'Office secretary'], ['Nhân viên lưu trữ hồ sơ', 'Records clerk'],
    ['Chuyên viên soạn thảo văn bản', 'Document drafting specialist'], ['Nhân viên tiếp nhận hồ sơ', 'Front desk clerk'],
  ], visualFriendly: true, tags: [['Phần mềm hỗ trợ tiếp cận', 'Accessible software'], ['Đầu việc rõ ràng', 'Clear tasks'], ['Môi trường yên tĩnh', 'Quiet workspace']] },
  { cat: ['Marketing / Truyền thông', 'Marketing / Media'], ind: ['Marketing / Truyền thông', 'Marketing / Media'], titles: [
    ['Chuyên viên nội dung', 'Content specialist'], ['Copywriter', 'Copywriter'],
    ['Chuyên viên SEO', 'SEO specialist'], ['Quản lý mạng xã hội', 'Social media manager'],
    ['Chuyên viên truyền thông nội bộ', 'Internal communications specialist'], ['Biên tập viên online', 'Online editor'],
  ], visualFriendly: true, tags: [['Làm việc từ xa', 'Remote work'], ['Lịch linh hoạt', 'Flexible schedule'], ['Công cụ hỗ trợ tiếp cận', 'Accessible tools']] },
  { cat: ['Kế toán / Tài chính', 'Accounting / Finance'], ind: ['Kế toán / Tài chính', 'Accounting / Finance'], titles: [
    ['Kế toán nội bộ', 'Internal accountant'], ['Nhân viên thu chi', 'Accounts payable/receivable clerk'],
    ['Chuyên viên kiểm toán nội bộ', 'Internal audit specialist'], ['Thủ quỹ', 'Cashier/treasurer'],
    ['Chuyên viên tài chính doanh nghiệp', 'Corporate finance specialist'],
  ], visualFriendly: false, tags: [['Quy trình chuẩn', 'Standard process'], ['Phần mềm kế toán', 'Accounting software'], ['Ổn định lâu dài', 'Long-term stability']] },
  { cat: ['Giáo dục / Đào tạo', 'Education / Training'], ind: ['Giáo dục / Đào tạo', 'Education / Training'], titles: [
    ['Giáo viên tiếng Anh online', 'Online English teacher'], ['Gia sư trực tuyến', 'Online tutor'],
    ['Chuyên viên đào tạo nội bộ', 'Internal trainer'], ['Giảng viên kỹ năng mềm', 'Soft skills instructor'],
    ['Chuyên viên xây dựng khóa học e-learning', 'E-learning course developer'],
  ], visualFriendly: true, tags: [['Dạy qua âm thanh', 'Audio-based teaching'], ['Lịch linh hoạt', 'Flexible schedule'], ['Hỗ trợ tài liệu số', 'Digital materials support']] },
  { cat: ['Biên phiên dịch / Ngôn ngữ', 'Translation / Language'], ind: ['Dịch vụ ngôn ngữ', 'Language services'], titles: [
    ['Biên dịch viên tiếng Anh', 'English translator'], ['Phiên dịch viên', 'Interpreter'],
    ['Chuyên viên proofreading', 'Proofreader'], ['Biên tập viên Braille', 'Braille editor'],
    ['Chuyên viên phiên dịch điện thoại', 'Phone interpreter'],
  ], visualFriendly: true, tags: [['Nghe và chuyển ngữ', 'Listen and translate'], ['Làm việc từ xa', 'Remote work'], ['Không phụ thuộc thị giác', 'Not vision-dependent']] },
  { cat: ['Y tế / Chăm sóc sức khỏe', 'Healthcare'], ind: ['Y tế / Sức khỏe', 'Healthcare'], titles: [
    ['Điều dưỡng viên', 'Nurse'], ['Chuyên viên y tế cộng đồng', 'Community health worker'],
    ['Nhân viên tiếp nhận bệnh nhân', 'Patient intake clerk'], ['Tư vấn viên dinh dưỡng', 'Nutrition counselor'],
    ['Chuyên viên hồ sơ y tế', 'Medical records specialist'],
  ], visualFriendly: false, tags: [['Ưu tiên NKT', 'Priority for PwD'], ['Đào tạo ban đầu', 'Initial training'], ['Phòng làm việc dễ tiếp cận', 'Accessible workplace']] },
  { cat: ['Nhân sự / Tuyển dụng', 'HR / Recruitment'], ind: ['Nhân sự', 'Human resources'], titles: [
    ['Chuyên viên nhân sự', 'HR specialist'], ['Chuyên viên tuyển dụng', 'Recruiter'],
    ['Nhân viên hành chính nhân sự', 'HR administration staff'], ['Chuyên viên C&B', 'Compensation & benefits specialist'],
  ], visualFriendly: true, tags: [['Phỏng vấn qua điện thoại', 'Phone interviews'], ['Quy trình rõ ràng', 'Clear process'], ['Hybrid work', 'Hybrid work']] },
  { cat: ['Bán hàng / Kinh doanh', 'Sales / Business'], ind: ['Bán hàng', 'Sales'], titles: [
    ['Nhân viên kinh doanh B2B', 'B2B sales executive'], ['Chuyên viên phát triển thị trường', 'Market development specialist'],
    ['Nhân viên bán hàng online', 'Online sales staff'], ['Chuyên viên chăm sóc đại lý', 'Account manager'],
  ], visualFriendly: true, tags: [['Bán hàng qua điện thoại', 'Phone-based sales'], ['Hoa hồng minh bạch', 'Transparent commission'], ['Đào tạo kỹ năng', 'Skills training']] },
  { cat: ['Thiết kế / Sáng tạo', 'Design / Creative'], ind: ['Thiết kế / Sáng tạo', 'Design / Creative'], titles: [
    ['Thiết kế đồ họa', 'Graphic designer'], ['UI/UX Designer', 'UI/UX designer'],
    ['Chuyên viên dựng video', 'Video editor'], ['Nhạc sĩ / Sản xuất âm thanh', 'Music / audio producer'],
    ['Chuyên viên sản xuất podcast', 'Podcast producer'],
  ], visualFriendly: true, tags: [['Sáng tạo qua âm thanh', 'Audio-first creative'], ['Remote friendly', 'Remote friendly'], ['Thiết bị hỗ trợ', 'Supportive equipment']] },
  { cat: ['Tư vấn / Dịch vụ xã hội', 'Counseling / Social services'], ind: ['Dịch vụ xã hội', 'Social services'], titles: [
    ['Tư vấn viên tâm lý', 'Counselor'], ['Chuyên viên công tác xã hội', 'Social worker'],
    ['Tư vấn viên việc làm cho NKT', 'Employment counselor for PwD'], ['Chuyên viên hỗ trợ cộng đồng', 'Community support specialist'],
  ], visualFriendly: true, tags: [['Tư vấn qua điện thoại', 'Phone counseling'], ['Linh hoạt địa điểm', 'Flexible location'], ['Ưu tiên NKT', 'Priority for PwD']] },
  { cat: ['Logistics / Kho vận', 'Logistics / Warehouse'], ind: ['Logistics', 'Logistics'], titles: [
    ['Nhân viên điều phối vận chuyển', 'Shipping coordinator'], ['Chuyên viên nhập liệu kho', 'Warehouse data clerk'],
    ['Nhân viên chăm sóc đơn hàng', 'Order fulfillment staff'], ['Điều phối giao hàng', 'Delivery dispatcher'],
  ], visualFriendly: false, tags: [['Ca linh hoạt', 'Flexible shifts'], ['Quy trình chuẩn', 'Standard process'], ['Không yêu cầu kinh nghiệm', 'No experience required']] },
  { cat: ['Du lịch / Khách sạn', 'Tourism / Hospitality'], ind: ['Du lịch / Khách sạn', 'Tourism / Hospitality'], titles: [
    ['Lễ tân khách sạn', 'Hotel receptionist'], ['Điều hành tour', 'Tour operator'],
    ['Chuyên viên đặt phòng', 'Reservations agent'], ['Hướng dẫn viên du lịch', 'Tour guide'],
  ], visualFriendly: false, tags: [['Giao tiếp tốt', 'Good communication'], ['Đào tạo nghiệp vụ', 'Professional training'], ['Môi trường năng động', 'Dynamic environment']] },
  { cat: ['Pháp lý / Hành chính', 'Legal / Administration'], ind: ['Pháp lý', 'Legal'], titles: [
    ['Thư ký tòa án', 'Court clerk'], ['Trợ lý luật sư', 'Legal assistant'],
    ['Chuyên viên hồ sơ pháp lý', 'Legal records specialist'], ['Chuyên viên tuân thủ', 'Compliance officer'],
  ], visualFriendly: true, tags: [['Soạn thảo văn bản', 'Document drafting'], ['Quy trình rõ ràng', 'Clear process'], ['Ổn định', 'Stable role']] },
  { cat: ['Truyền thông / Báo chí', 'Media / Journalism'], ind: ['Truyền thông', 'Media'], titles: [
    ['Phóng viên', 'Reporter'], ['Biên tập viên tin tức', 'News editor'],
    ['Chuyên viên truyền thông số', 'Digital media specialist'], ['Host podcast', 'Podcast host'],
  ], visualFriendly: true, tags: [['Nội dung âm thanh', 'Audio content'], ['Remote friendly', 'Remote friendly'], ['Lịch linh hoạt', 'Flexible schedule']] },
  { cat: ['Ngân hàng / Tài chính', 'Banking / Finance'], ind: ['Ngân hàng', 'Banking'], titles: [
    ['Giao dịch viên ngân hàng', 'Bank teller'], ['Chuyên viên tín dụng', 'Credit officer'],
    ['Tư vấn viên tài chính cá nhân', 'Personal finance advisor'], ['Chuyên viên phòng chống rửa tiền', 'AML specialist'],
  ], visualFriendly: false, tags: [['Quy trình chuẩn ngân hàng', 'Bank-standard process'], ['Đào tạo bài bản', 'Structured training'], ['Phúc lợi tốt', 'Good benefits']] },
  { cat: ['Kiểm thử / QA', 'Testing / QA'], ind: ['Công nghệ thông tin', 'Information technology'], titles: [
    ['Tester phần mềm', 'Software tester'], ['QA Manual', 'Manual QA tester'],
    ['Chuyên viên kiểm thử accessibility WCAG', 'WCAG accessibility tester'], ['UAT Coordinator', 'UAT coordinator'],
  ], visualFriendly: true, tags: [['Kiểm thử bằng screen reader', 'Screen reader testing'], ['Remote friendly', 'Remote friendly'], ['Ưu tiên NKT', 'Priority for PwD']] },
  { cat: ['Thư viện / Lưu trữ', 'Library / Archives'], ind: ['Giáo dục / Văn hóa', 'Education / Culture'], titles: [
    ['Thủ thư', 'Librarian'], ['Chuyên viên số hóa tài liệu', 'Document digitization specialist'],
    ['Chuyên viên phân loại tài liệu', 'Document classification specialist'],
  ], visualFriendly: true, tags: [['Số hóa tài liệu', 'Document digitization'], ['Môi trường yên tĩnh', 'Quiet environment'], ['Không yêu cầu thị lực', 'No vision required']] },
  { cat: ['Nông nghiệp / Thực phẩm', 'Agriculture / Food'], ind: ['Nông nghiệp', 'Agriculture'], titles: [
    ['Chuyên viên kiểm định chất lượng thực phẩm', 'Food quality inspector'], ['Nhân viên kinh doanh nông sản', 'Agricultural sales staff'],
    ['Chuyên viên tư vấn kỹ thuật nông nghiệp', 'Agricultural technical advisor'],
  ], visualFriendly: false, tags: [['Đi công tác vùng', 'Regional travel'], ['Đào tạo nghề', 'Vocational training'], ['Ổn định lâu dài', 'Long-term stability']] },
];

const companyPrefixes = {
  vi: ['Công ty Cổ phần', 'Công ty TNHH', 'Tập đoàn', 'Công ty'],
  en: ['JSC', 'Co., Ltd.', 'Group', 'Company'],
};

const companyNames = {
  vi: ['An Tâm', 'Hoà Nhập Việt', 'Sao Mai Digital', 'Access Tech', 'Tân Phát', 'Bright Future', 'Việt Connect', 'Hòa Bình', 'Đại Dương Xanh', 'Nhân Ái', 'Tiến Phát', 'Minh Khang', 'Thịnh Vượng', 'Phương Nam', 'Bắc Việt', 'Green Life', 'Sunrise', 'NovaLink', 'CoreBridge', 'EqualWork'],
  en: ['An Tam', 'Hoa Nhap Viet', 'Sao Mai Digital', 'Access Tech', 'Tan Phat', 'Bright Future', 'Viet Connect', 'Hoa Binh', 'Dai Duong Xanh', 'Nhan Ai', 'Tien Phat', 'Minh Khang', 'Thinh Vuong', 'Phuong Nam', 'Bac Viet', 'Green Life', 'Sunrise', 'NovaLink', 'CoreBridge', 'EqualWork'],
};

const companySuffixes = {
  vi: ['Dịch vụ', 'Công nghệ', 'Giáo dục', 'Tài chính', 'Truyền thông', 'Logistics', 'Thương mại', 'Tư vấn', 'Y tế', 'Nhân sự'],
  en: ['Services', 'Technology', 'Education', 'Finance', 'Media', 'Logistics', 'Trading', 'Consulting', 'Healthcare', 'HR'],
};

function slugify(text, index) {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48) + `-${index}`;
}

function pick(arr, seed) {
  return arr[seed % arr.length];
}

function pickMany(arr, count, seed) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(arr[(seed + i * 3) % arr.length]);
  }
  return [...new Set(result)];
}

function makeCompany(locale, seed) {
  const prefix = pick(companyPrefixes[locale], seed);
  const name = pick(companyNames[locale], seed + 7);
  const suffix = pick(companySuffixes[locale], seed + 13);
  if (locale === 'vi') return `${prefix} ${name} ${suffix}`;
  return `${name} ${suffix} ${prefix}`;
}

function makeJob(locale, template, titlePair, index) {
  const [titleVi, titleEn] = titlePair;
  const title = locale === 'vi' ? titleVi : titleEn;
  const cat = locale === 'vi' ? template.cat[0] : template.cat[1];
  const ind = locale === 'vi' ? template.ind[0] : template.ind[1];
  const loc = pick(locations[locale], index);
  const type = pick(types[locale], index + 2);
  const exp = template.visualFriendly
    ? pick(experiences[locale], index % 3)
    : pick(experiences[locale], index % 5);
  const salaryRange = pick(salaries[locale], index + 1);
  const salary = salaryRange;

  const tagSet = pick(template.tags, index);
  const tags = locale === 'vi' ? tagSet[0].split(' | ') : [tagSet[1]];
  const extraTags = locale === 'vi'
    ? (template.visualFriendly ? ['Phù hợp người khiếm thị', 'Làm việc từ xa'] : ['Môi trường hòa nhập'])
    : (template.visualFriendly ? ['Suitable for visually impaired', 'Remote friendly'] : ['Inclusive workplace']);
  const allTags = [...new Set([...(Array.isArray(tags) ? tags : [tags]), ...extraTags])].slice(0, 4);

  let disabilityTypes;
  if (template.visualFriendly) {
    disabilityTypes = pickMany(
      locale === 'vi' ? ['Thị giác', 'Vận động', 'Thính giác', 'Ngôn ngữ', 'Nhận thức'] : ['Visual', 'Mobility', 'Hearing', 'Speech', 'Cognitive'],
      3,
      index,
    );
    if (!disabilityTypes.includes(locale === 'vi' ? 'Thị giác' : 'Visual')) {
      disabilityTypes.unshift(locale === 'vi' ? 'Thị giác' : 'Visual');
    }
  } else {
    disabilityTypes = pickMany(disability[locale], 2, index);
  }

  const isPriority = template.visualFriendly || index % 4 === 0;

  return {
    slug: slugify(titleVi, index),
    title,
    company: makeCompany(locale, index),
    location: loc,
    type,
    salary,
    tags: allTags,
    experience: exp,
    category: cat,
    industry: ind,
    disabilityTypes: [...new Set(disabilityTypes)].slice(0, 4),
    salaryRange,
    isPriority,
    isHot: true,
  };
}

function generateJobs(locale, targetCount) {
  const jobs = [];
  let index = 1;

  while (jobs.length < targetCount) {
    for (const template of templates) {
      for (const titlePair of template.titles) {
        if (jobs.length >= targetCount) break;
        jobs.push(makeJob(locale, template, titlePair, index));
        index++;
      }
      if (jobs.length >= targetCount) break;
    }
  }

  return jobs;
}

const TARGET = 150;
const vi = generateJobs('vi', TARGET);
const en = generateJobs('en', TARGET);

// Align slugs between locales
for (let i = 0; i < TARGET; i++) {
  en[i].slug = vi[i].slug;
}

const output = {
  meta: {
    version: 1,
    generatedAt: new Date().toISOString(),
    totalJobs: TARGET,
    description: 'Danh sách việc làm hot đa dạng ngành nghề, bao gồm nhiều vị trí phù hợp người khiếm thị và người khuyết tật.',
  },
  vi,
  en,
};

writeFileSync(OUT, JSON.stringify(output, null, 2), 'utf8');
console.log(`Generated ${TARGET} jobs -> ${OUT}`);
