export type WritingCategory = { id: string; title: string; description: string; icon: string };
export type WritingQuestion = { q: string; options: string[]; answerIndex: number };
export type WritingLesson = {
  grade: 7 | 8 | 9; slug: string; title: string; faTitle: string; category: string; level: string;
  goal: string; prompt: string; minWords: number; modelEn: string; modelFa: string;
  steps: string[]; vocabulary: { word: string; meaning: string }[]; checklist: string[]; questions: WritingQuestion[];
};
export const writingCategories: WritingCategory[] = [
  {
    "id": "personal",
    "title": "زندگی و تجربه‌های شخصی",
    "description": "معرفی، خانواده، علایق و تجربه‌های روزمره",
    "icon": "✍️"
  },
  {
    "id": "school",
    "title": "مدرسه و یادگیری",
    "description": "کلاس، مطالعه، دوست‌ها و برنامه‌ریزی",
    "icon": "📚"
  },
  {
    "id": "daily",
    "title": "فعالیت‌های روزمره",
    "description": "غذا، برنامهٔ روزانه و دستورالعمل‌ها",
    "icon": "☀️"
  },
  {
    "id": "communication",
    "title": "ارتباط و پیام‌نویسی",
    "description": "دعوت، ایمیل، درخواست و بیان منظور",
    "icon": "💬"
  },
  {
    "id": "world",
    "title": "جهان پیرامون و ایده‌ها",
    "description": "سلامتی، طبیعت، فناوری و نظر شخصی",
    "icon": "🌍"
  }
];
export const writingLessons: WritingLesson[] = [
  {
    "grade": 7,
    "slug": "about-me",
    "title": "About Me",
    "faTitle": "دربارهٔ من",
    "category": "personal",
    "level": "مقدماتی",
    "goal": "نوشتن چند جمله برای معرفی خودت",
    "prompt": "خودت را با نام، پایهٔ تحصیلی، علاقه و یک ویژگی معرفی کن.",
    "minWords": 25,
    "modelEn": "My name is Sara. I am thirteen years old. I am in grade seven. I like reading and drawing. I am friendly, and I enjoy learning English.",
    "modelFa": "نام من سارا است. من سیزده سال دارم. در پایهٔ هفتم هستم. کتاب‌خواندن و نقاشی را دوست دارم. خوش‌برخورد هستم و از یادگیری انگلیسی لذت می‌برم.",
    "steps": [
      "ابتدا نام خود را بنویس: My name is …",
      "سن و پایهٔ تحصیلی را با I am معرفی کن.",
      "دو علاقه و یک ویژگی شخصی اضافه کن.",
      "هر جمله را با حرف بزرگ شروع کن و در پایان نقطه بگذار."
    ],
    "vocabulary": [
      {
        "word": "grade",
        "meaning": "پایهٔ تحصیلی"
      },
      {
        "word": "friendly",
        "meaning": "خوش‌برخورد"
      },
      {
        "word": "enjoy",
        "meaning": "لذت بردن"
      }
    ],
    "checklist": [
      "نام یا معرفی روشن در جملهٔ اول",
      "حداقل دو جملهٔ کامل",
      "حرف بزرگ و نشانه‌گذاری درست"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «پایهٔ تحصیلی» را دارد؟",
        "options": [
          "grade",
          "friendly",
          "enjoy",
          "kind"
        ],
        "answerIndex": 0
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "نوشتن دربارهٔ اعضای خانواده",
          "مرتب کردن رویدادهای روز مدرسه",
          "توصیف یک دوست با صفت‌های ساده",
          "نوشتن چند جمله برای معرفی خودت"
        ],
        "answerIndex": 3
      },
      {
        "q": "ترتیب معمول جملهٔ سادهٔ انگلیسی کدام است؟",
        "options": [
          "فعل + مفعول + فاعل همیشه",
          "صفت + فاعل + فعل",
          "فاعل + فعل + ادامهٔ جمله",
          "ادامهٔ جمله + فعل + فاعل"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 7,
    "slug": "my-family",
    "title": "My Family",
    "faTitle": "خانوادهٔ من",
    "category": "personal",
    "level": "مقدماتی",
    "goal": "نوشتن دربارهٔ اعضای خانواده",
    "prompt": "سه نفر از خانواده‌ات را معرفی کن و دربارهٔ یک فعالیت مشترک بنویس.",
    "minWords": 25,
    "modelEn": "I have a small family. My mother is kind, and my father is helpful. I have one brother. We usually eat dinner together and talk about our day.",
    "modelFa": "من خانوادهٔ کوچکی دارم. مادرم مهربان است و پدرم کمک‌کننده است. یک برادر دارم. ما معمولاً با هم شام می‌خوریم و دربارهٔ روزمان صحبت می‌کنیم.",
    "steps": [
      "با I have یا My family شروع کن.",
      "برای معرفی افراد از my و واژه‌های خانوادگی استفاده کن.",
      "یک فعالیتی را که با هم انجام می‌دهید اضافه کن.",
      "پیش از ارسال، جمله‌ها را دوباره بخوان."
    ],
    "vocabulary": [
      {
        "word": "kind",
        "meaning": "مهربان"
      },
      {
        "word": "helpful",
        "meaning": "کمک‌کننده"
      },
      {
        "word": "together",
        "meaning": "با هم"
      }
    ],
    "checklist": [
      "حداقل دو عضو خانواده معرفی شده‌اند",
      "یک فعالیت مشترک توضیح داده شده",
      "جمله‌ها با حرف بزرگ شروع می‌شوند"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «کمک‌کننده» را دارد؟",
        "options": [
          "grade",
          "friendly",
          "enjoy",
          "helpful"
        ],
        "answerIndex": 3
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "مرتب کردن رویدادهای روز مدرسه",
          "توصیف یک دوست با صفت‌های ساده",
          "نوشتن دربارهٔ اعضای خانواده",
          "نوشتن چند جمله برای معرفی خودت"
        ],
        "answerIndex": 2
      },
      {
        "q": "ترتیب معمول جملهٔ سادهٔ انگلیسی کدام است؟",
        "options": [
          "فعل + مفعول + فاعل همیشه",
          "صفت + فاعل + فعل",
          "فاعل + فعل + ادامهٔ جمله",
          "ادامهٔ جمله + فعل + فاعل"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 7,
    "slug": "my-school-day",
    "title": "My School Day",
    "faTitle": "روز مدرسهٔ من",
    "category": "school",
    "level": "مقدماتی",
    "goal": "مرتب کردن رویدادهای روز مدرسه",
    "prompt": "یک روز معمولی مدرسه را از صبح تا پایان کلاس توضیح بده.",
    "minWords": 25,
    "modelEn": "I get up early on school days. I have breakfast and go to school by bus. My favorite subject is English. After school, I do my homework and prepare my bag for tomorrow.",
    "modelFa": "در روزهای مدرسه زود بیدار می‌شوم. صبحانه می‌خورم و با اتوبوس به مدرسه می‌روم. درس مورد علاقه‌ام انگلیسی است. بعد از مدرسه تکالیفم را انجام می‌دهم و کیفم را برای فردا آماده می‌کنم.",
    "steps": [
      "کارها را به ترتیب زمان بنویس.",
      "از واژه‌های early، after و tomorrow کمک بگیر.",
      "برای هر کار یک جمله بنویس.",
      "زمان فعل‌ها را در بیشتر جمله‌ها یکسان نگه دار."
    ],
    "vocabulary": [
      {
        "word": "early",
        "meaning": "زود"
      },
      {
        "word": "subject",
        "meaning": "درس"
      },
      {
        "word": "prepare",
        "meaning": "آماده کردن"
      }
    ],
    "checklist": [
      "سه رویداد به ترتیب آمده‌اند",
      "حداقل یک واژهٔ زمانی استفاده شده",
      "نقطه‌گذاری رعایت شده"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «آماده کردن» را دارد؟",
        "options": [
          "friendly",
          "enjoy",
          "prepare",
          "grade"
        ],
        "answerIndex": 2
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "توصیف یک دوست با صفت‌های ساده",
          "مرتب کردن رویدادهای روز مدرسه",
          "نوشتن چند جمله برای معرفی خودت",
          "نوشتن دربارهٔ اعضای خانواده"
        ],
        "answerIndex": 1
      },
      {
        "q": "ترتیب معمول جملهٔ سادهٔ انگلیسی کدام است؟",
        "options": [
          "فعل + مفعول + فاعل همیشه",
          "صفت + فاعل + فعل",
          "فاعل + فعل + ادامهٔ جمله",
          "ادامهٔ جمله + فعل + فاعل"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 7,
    "slug": "my-best-friend",
    "title": "My Best Friend",
    "faTitle": "بهترین دوست من",
    "category": "personal",
    "level": "مقدماتی",
    "goal": "توصیف یک دوست با صفت‌های ساده",
    "prompt": "دوستت را معرفی کن، دو ویژگی او را بگو و توضیح بده چرا از دوستی‌تان خوشحالی.",
    "minWords": 25,
    "modelEn": "My best friend is Amir. He is funny and helpful. We sit together in class and play football after school. I like him because he listens to me and shares his things.",
    "modelFa": "بهترین دوست من امیر است. او شوخ‌طبع و کمک‌کننده است. در کلاس کنار هم می‌نشینیم و بعد از مدرسه فوتبال بازی می‌کنیم. او را دوست دارم چون به حرفم گوش می‌دهد و وسایلش را با من شریک می‌شود.",
    "steps": [
      "دوستت را در جملهٔ اول نام ببر.",
      "از دو صفت برای توصیف او استفاده کن.",
      "یک یا دو کار مشترک بنویس.",
      "با because دلیل دوستی‌ات را توضیح بده."
    ],
    "vocabulary": [
      {
        "word": "funny",
        "meaning": "شوخ‌طبع"
      },
      {
        "word": "share",
        "meaning": "قسمت کردن"
      },
      {
        "word": "because",
        "meaning": "زیرا"
      }
    ],
    "checklist": [
      "دو ویژگی دوست بیان شده",
      "فعالیت مشترک وجود دارد",
      "دلیل با because یا یک عبارت روشن آمده"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «شوخ‌طبع» را دارد؟",
        "options": [
          "enjoy",
          "funny",
          "grade",
          "friendly"
        ],
        "answerIndex": 1
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "توصیف یک دوست با صفت‌های ساده",
          "نوشتن چند جمله برای معرفی خودت",
          "نوشتن دربارهٔ اعضای خانواده",
          "مرتب کردن رویدادهای روز مدرسه"
        ],
        "answerIndex": 0
      },
      {
        "q": "ترتیب معمول جملهٔ سادهٔ انگلیسی کدام است؟",
        "options": [
          "فعل + مفعول + فاعل همیشه",
          "صفت + فاعل + فعل",
          "فاعل + فعل + ادامهٔ جمله",
          "ادامهٔ جمله + فعل + فاعل"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 7,
    "slug": "favorite-food",
    "title": "My Favorite Food",
    "faTitle": "غذای مورد علاقهٔ من",
    "category": "daily",
    "level": "مقدماتی",
    "goal": "توصیف غذا و دلیل علاقه",
    "prompt": "غذای مورد علاقه‌ات را معرفی کن و بنویس چه زمانی و با چه کسی آن را می‌خوری.",
    "minWords": 25,
    "modelEn": "My favorite food is pizza. It has cheese, tomatoes, and bread. I usually eat it with my family on Fridays. I like pizza because it is tasty and easy to share.",
    "modelFa": "غذای مورد علاقهٔ من پیتزا است. پیتزا پنیر، گوجه‌فرنگی و نان دارد. معمولاً جمعه‌ها آن را با خانواده‌ام می‌خورم. پیتزا را دوست دارم چون خوشمزه است و به‌راحتی می‌توان آن را تقسیم کرد.",
    "steps": [
      "نام غذا را با My favorite food is بنویس.",
      "مواد تشکیل‌دهنده یا ویژگی غذا را توضیح بده.",
      "زمان یا همراه غذا خوردن را اضافه کن.",
      "در پایان دلیل علاقه‌ات را بیان کن."
    ],
    "vocabulary": [
      {
        "word": "tasty",
        "meaning": "خوشمزه"
      },
      {
        "word": "usually",
        "meaning": "معمولاً"
      },
      {
        "word": "share",
        "meaning": "تقسیم کردن"
      }
    ],
    "checklist": [
      "غذا معرفی شده",
      "یک ویژگی یا مادهٔ غذایی ذکر شده",
      "دلیل علاقه روشن است"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «معمولاً» را دارد؟",
        "options": [
          "usually",
          "grade",
          "friendly",
          "enjoy"
        ],
        "answerIndex": 0
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "نوشتن چند جمله برای معرفی خودت",
          "نوشتن دربارهٔ اعضای خانواده",
          "مرتب کردن رویدادهای روز مدرسه",
          "توصیف غذا و دلیل علاقه"
        ],
        "answerIndex": 3
      },
      {
        "q": "ترتیب معمول جملهٔ سادهٔ انگلیسی کدام است؟",
        "options": [
          "فعل + مفعول + فاعل همیشه",
          "صفت + فاعل + فعل",
          "فاعل + فعل + ادامهٔ جمله",
          "ادامهٔ جمله + فعل + فاعل"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 7,
    "slug": "my-room",
    "title": "My Room",
    "faTitle": "اتاق من",
    "category": "personal",
    "level": "مقدماتی",
    "goal": "توصیف مکان و اشیا",
    "prompt": "اتاقت را توصیف کن و جای سه وسیله را توضیح بده.",
    "minWords": 25,
    "modelEn": "My room is small but comfortable. There is a bed near the window and a desk beside the door. My books are on the shelf. I keep my room clean because I like studying there.",
    "modelFa": "اتاق من کوچک اما راحت است. یک تخت نزدیک پنجره و یک میز کنار در وجود دارد. کتاب‌هایم روی قفسه هستند. اتاقم را تمیز نگه می‌دارم چون دوست دارم آنجا درس بخوانم.",
    "steps": [
      "با یک جمله دربارهٔ اندازه یا حس اتاق شروع کن.",
      "از There is و There are استفاده کن.",
      "سه وسیله و مکان آن‌ها را با in، on، near یا beside توضیح بده.",
      "یک جمله دربارهٔ کاری که در اتاق انجام می‌دهی بنویس."
    ],
    "vocabulary": [
      {
        "word": "comfortable",
        "meaning": "راحت"
      },
      {
        "word": "shelf",
        "meaning": "قفسه"
      },
      {
        "word": "beside",
        "meaning": "کنار"
      }
    ],
    "checklist": [
      "حداقل دو وسیله و مکان آن‌ها آمده‌اند",
      "یک حرف اضافهٔ مکان استفاده شده",
      "پاراگراف پایان مشخص دارد"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «کنار» را دارد؟",
        "options": [
          "grade",
          "friendly",
          "enjoy",
          "beside"
        ],
        "answerIndex": 3
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "نوشتن دربارهٔ اعضای خانواده",
          "مرتب کردن رویدادهای روز مدرسه",
          "توصیف مکان و اشیا",
          "نوشتن چند جمله برای معرفی خودت"
        ],
        "answerIndex": 2
      },
      {
        "q": "ترتیب معمول جملهٔ سادهٔ انگلیسی کدام است؟",
        "options": [
          "فعل + مفعول + فاعل همیشه",
          "صفت + فاعل + فعل",
          "فاعل + فعل + ادامهٔ جمله",
          "ادامهٔ جمله + فعل + فاعل"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 7,
    "slug": "a-pet-i-like",
    "title": "A Pet I Like",
    "faTitle": "حیوانی که دوست دارم",
    "category": "world",
    "level": "مقدماتی",
    "goal": "توصیف حیوان با فعل‌های ساده",
    "prompt": "حیوان خانگی یا حیوان مورد علاقه‌ات را معرفی کن و دربارهٔ ظاهر و رفتارش بنویس.",
    "minWords": 25,
    "modelEn": "I like cats because they are quiet and playful. A cat has soft fur and bright eyes. Cats sleep for many hours, but they also enjoy playing. I think cats are lovely animals.",
    "modelFa": "من گربه‌ها را دوست دارم چون آرام و بازیگوش هستند. گربه خز نرم و چشم‌های درخشانی دارد. گربه‌ها ساعت‌های زیادی می‌خوابند، اما از بازی‌کردن هم لذت می‌برند. به نظر من گربه‌ها حیوانات دوست‌داشتنی‌ای هستند.",
    "steps": [
      "حیوان را معرفی کن.",
      "ظاهرش را با یک یا دو صفت توضیح بده.",
      "رفتار یا عادت آن را بنویس.",
      "با I think یا because نظر خودت را اضافه کن."
    ],
    "vocabulary": [
      {
        "word": "playful",
        "meaning": "بازیگوش"
      },
      {
        "word": "fur",
        "meaning": "خز"
      },
      {
        "word": "lovely",
        "meaning": "دوست‌داشتنی"
      }
    ],
    "checklist": [
      "حیوان و دو ویژگی آن معرفی شده‌اند",
      "رفتار یا عادت ذکر شده",
      "نظر نویسنده در پایان آمده"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «بازیگوش» را دارد؟",
        "options": [
          "friendly",
          "enjoy",
          "playful",
          "grade"
        ],
        "answerIndex": 2
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "مرتب کردن رویدادهای روز مدرسه",
          "توصیف حیوان با فعل‌های ساده",
          "نوشتن چند جمله برای معرفی خودت",
          "نوشتن دربارهٔ اعضای خانواده"
        ],
        "answerIndex": 1
      },
      {
        "q": "ترتیب معمول جملهٔ سادهٔ انگلیسی کدام است؟",
        "options": [
          "فعل + مفعول + فاعل همیشه",
          "صفت + فاعل + فعل",
          "فاعل + فعل + ادامهٔ جمله",
          "ادامهٔ جمله + فعل + فاعل"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 7,
    "slug": "my-weekend",
    "title": "My Weekend",
    "faTitle": "آخر هفتهٔ من",
    "category": "daily",
    "level": "مقدماتی",
    "goal": "نوشتن دربارهٔ برنامهٔ آخر هفته",
    "prompt": "از برنامهٔ آخر هفتهٔ گذشته یا آینده‌ات در چند جمله بنویس.",
    "minWords": 25,
    "modelEn": "On Fridays, I wake up later than usual. I help my family in the morning and visit my grandparents in the afternoon. In the evening, I watch a movie or read a book. I enjoy relaxing at the weekend.",
    "modelFa": "جمعه‌ها دیرتر از معمول بیدار می‌شوم. صبح به خانواده‌ام کمک می‌کنم و بعدازظهر به دیدن پدربزرگ و مادربزرگم می‌روم. عصر فیلم می‌بینم یا کتاب می‌خوانم. از استراحت در آخر هفته لذت می‌برم.",
    "steps": [
      "با On Fridays یا At the weekend زمان را مشخص کن.",
      "کارهای صبح، بعدازظهر و عصر را مرتب بنویس.",
      "از and و or برای وصل‌کردن ایده‌ها استفاده کن.",
      "در پایان بگو از کدام بخش لذت می‌بری."
    ],
    "vocabulary": [
      {
        "word": "later",
        "meaning": "دیرتر"
      },
      {
        "word": "visit",
        "meaning": "دیدن کردن"
      },
      {
        "word": "relax",
        "meaning": "استراحت کردن"
      }
    ],
    "checklist": [
      "حداقل دو فعالیت نوشته شده",
      "ترتیب زمانی قابل فهم است",
      "از یک واژهٔ پیوندی استفاده شده"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «دیدن کردن» را دارد؟",
        "options": [
          "enjoy",
          "visit",
          "grade",
          "friendly"
        ],
        "answerIndex": 1
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "نوشتن دربارهٔ برنامهٔ آخر هفته",
          "نوشتن چند جمله برای معرفی خودت",
          "نوشتن دربارهٔ اعضای خانواده",
          "مرتب کردن رویدادهای روز مدرسه"
        ],
        "answerIndex": 0
      },
      {
        "q": "ترتیب معمول جملهٔ سادهٔ انگلیسی کدام است؟",
        "options": [
          "فعل + مفعول + فاعل همیشه",
          "صفت + فاعل + فعل",
          "فاعل + فعل + ادامهٔ جمله",
          "ادامهٔ جمله + فعل + فاعل"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 7,
    "slug": "simple-invitation",
    "title": "An Invitation",
    "faTitle": "یک دعوت ساده",
    "category": "communication",
    "level": "مقدماتی",
    "goal": "نوشتن دعوت کوتاه و مودبانه",
    "prompt": "دوستی را به یک فعالیت دعوت کن و زمان، مکان و راه پاسخ‌دادن را مشخص کن.",
    "minWords": 25,
    "modelEn": "Hi Sara, Would you like to come to my house on Saturday? We can play a game and have snacks. Please tell me if you can come. I hope to see you soon. From, Mina",
    "modelFa": "سلام سارا، دوست داری شنبه به خانهٔ من بیایی؟ می‌توانیم بازی کنیم و خوراکی بخوریم. لطفاً به من بگو که می‌توانی بیایی یا نه. امیدوارم به‌زودی ببینمت. از طرف مینا",
    "steps": [
      "با Hi یا Dear و نام دوست شروع کن.",
      "فعالیت، زمان و مکان را واضح بنویس.",
      "از Would you like to…? برای دعوت استفاده کن.",
      "در پایان از دوست بخواه پاسخ بدهد و نامت را بنویس."
    ],
    "vocabulary": [
      {
        "word": "invitation",
        "meaning": "دعوت‌نامه"
      },
      {
        "word": "snack",
        "meaning": "خوراکی سبک"
      },
      {
        "word": "soon",
        "meaning": "به‌زودی"
      }
    ],
    "checklist": [
      "دعوت روشن دارد",
      "زمان یا مکان مشخص شده",
      "پایان و نام فرستنده دارد"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «به‌زودی» را دارد؟",
        "options": [
          "soon",
          "grade",
          "friendly",
          "enjoy"
        ],
        "answerIndex": 0
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "نوشتن چند جمله برای معرفی خودت",
          "نوشتن دربارهٔ اعضای خانواده",
          "مرتب کردن رویدادهای روز مدرسه",
          "نوشتن دعوت کوتاه و مودبانه"
        ],
        "answerIndex": 3
      },
      {
        "q": "ترتیب معمول جملهٔ سادهٔ انگلیسی کدام است؟",
        "options": [
          "فعل + مفعول + فاعل همیشه",
          "صفت + فاعل + فعل",
          "فاعل + فعل + ادامهٔ جمله",
          "ادامهٔ جمله + فعل + فاعل"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 8,
    "slug": "daily-routine",
    "title": "My Daily Routine",
    "faTitle": "برنامهٔ روزانهٔ من",
    "category": "daily",
    "level": "متوسط",
    "goal": "ساخت یک پاراگراف منظم دربارهٔ عادت‌ها",
    "prompt": "برنامهٔ روزانهٔ خودت را با ترتیب زمانی و چند قید تکرار توصیف کن.",
    "minWords": 40,
    "modelEn": "On weekdays, I usually wake up at seven o’clock. After breakfast, I walk to school with my cousin. I often review my notes in the afternoon, and I finish my homework before dinner. At night, I prepare my schoolbag and read for fifteen minutes. This routine helps me feel ready for the next day.",
    "modelFa": "در روزهای کاری معمولاً ساعت هفت بیدار می‌شوم. بعد از صبحانه با پسرعمو یا دخترعمویم پیاده به مدرسه می‌روم. اغلب بعدازظهر یادداشت‌هایم را مرور می‌کنم و پیش از شام تکالیفم را تمام می‌کنم. شب کیف مدرسه‌ام را آماده می‌کنم و پانزده دقیقه مطالعه می‌کنم. این برنامه کمک می‌کند برای روز بعد آماده باشم.",
    "steps": [
      "جملهٔ اول موضوع پاراگراف را مشخص کند.",
      "کارها را از صبح تا شب مرتب کن.",
      "از usually، often و after برای پیوند ایده‌ها استفاده کن.",
      "در جملهٔ آخر بگو این برنامه چه فایده‌ای دارد."
    ],
    "vocabulary": [
      {
        "word": "weekday",
        "meaning": "روز کاری هفته"
      },
      {
        "word": "review",
        "meaning": "مرور کردن"
      },
      {
        "word": "routine",
        "meaning": "برنامهٔ تکراری روزانه"
      }
    ],
    "checklist": [
      "جملهٔ موضوعی دارد",
      "حداقل سه فعالیت به ترتیب آمده‌اند",
      "نتیجه یا جمع‌بندی وجود دارد"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «روز کاری هفته» را دارد؟",
        "options": [
          "grade",
          "friendly",
          "enjoy",
          "weekday"
        ],
        "answerIndex": 3
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "نوشتن روایت با ترتیب زمانی",
          "معرفی کتاب و دلیل پیشنهاد آن",
          "ساخت یک پاراگراف منظم دربارهٔ عادت‌ها",
          "توصیف ظاهر و شخصیت با مثال"
        ],
        "answerIndex": 2
      },
      {
        "q": "کدام مورد به نوشته کمک می‌کند منظم‌تر باشد؟",
        "options": [
          "نوشتن همه‌چیز در یک جملهٔ طولانی",
          "حذف فاصله‌ها",
          "استفاده از ترتیب منطقی و واژه‌های پیوندی",
          "تکرار یک جمله"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 8,
    "slug": "describe-a-person",
    "title": "Describe a Person",
    "faTitle": "توصیف یک شخص",
    "category": "personal",
    "level": "متوسط",
    "goal": "توصیف ظاهر و شخصیت با مثال",
    "prompt": "شخصی را که تحسین می‌کنی معرفی کن و ویژگی‌هایش را با مثال توضیح بده.",
    "minWords": 40,
    "modelEn": "My science teacher is a person I admire. She is patient, curious, and fair to every student. When we do not understand an experiment, she explains it in a different way. She also encourages us to ask questions instead of memorizing everything. I admire her because she makes science interesting and helps us believe in our abilities.",
    "modelFa": "معلم علوم من کسی است که تحسینش می‌کنم. او صبور، کنجکاو و با همهٔ دانش‌آموزان منصف است. وقتی آزمایشی را نمی‌فهمیم، آن را به روش دیگری توضیح می‌دهد. همچنین تشویقمان می‌کند به‌جای حفظ‌کردن همه‌چیز، سؤال بپرسیم. او را تحسین می‌کنم چون علوم را جذاب می‌کند و کمک می‌کند به توانایی‌هایمان باور داشته باشیم.",
    "steps": [
      "در جملهٔ اول مشخص کن چه کسی را توصیف می‌کنی.",
      "دو یا سه صفت شخصیتی بنویس.",
      "برای دست‌کم یک صفت مثال واقعی بیاور.",
      "در پایان توضیح بده چرا این فرد برایت مهم است."
    ],
    "vocabulary": [
      {
        "word": "admire",
        "meaning": "تحسین کردن"
      },
      {
        "word": "patient",
        "meaning": "صبور"
      },
      {
        "word": "encourage",
        "meaning": "تشویق کردن"
      }
    ],
    "checklist": [
      "شخص معرفی شده",
      "ویژگی‌ها با مثال پشتیبانی شده‌اند",
      "دلیل تحسین در پایان آمده"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «صبور» را دارد؟",
        "options": [
          "friendly",
          "enjoy",
          "patient",
          "grade"
        ],
        "answerIndex": 2
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "معرفی کتاب و دلیل پیشنهاد آن",
          "توصیف ظاهر و شخصیت با مثال",
          "ساخت یک پاراگراف منظم دربارهٔ عادت‌ها",
          "نوشتن روایت با ترتیب زمانی"
        ],
        "answerIndex": 1
      },
      {
        "q": "کدام مورد به نوشته کمک می‌کند منظم‌تر باشد؟",
        "options": [
          "نوشتن همه‌چیز در یک جملهٔ طولانی",
          "حذف فاصله‌ها",
          "استفاده از ترتیب منطقی و واژه‌های پیوندی",
          "تکرار یک جمله"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 8,
    "slug": "memorable-day",
    "title": "A Memorable Day",
    "faTitle": "یک روز به‌یادماندنی",
    "category": "personal",
    "level": "متوسط",
    "goal": "نوشتن روایت با ترتیب زمانی",
    "prompt": "یک روز فراموش‌نشدنی را با مقدمه، رویدادها و پایان روایت کن.",
    "minWords": 40,
    "modelEn": "Last spring, my class visited a local museum. At first, I thought the trip would be boring, but our guide showed us an old map and explained how the town had changed. Then we worked in small groups to solve a history puzzle. I enjoyed sharing ideas with my classmates. By the end of the day, I had learned something new and wanted to visit again.",
    "modelFa": "بهار گذشته کلاس ما از یک موزهٔ محلی بازدید کرد. ابتدا فکر می‌کردم سفر خسته‌کننده باشد، اما راهنمای ما نقشه‌ای قدیمی نشان داد و توضیح داد شهر چگونه تغییر کرده است. بعد در گروه‌های کوچک برای حل یک معمای تاریخی کار کردیم. از تبادل ایده با هم‌کلاسی‌هایم لذت بردم. در پایان روز چیز تازه‌ای یاد گرفته بودم و می‌خواستم دوباره به آنجا بروم.",
    "steps": [
      "زمان و مکان داستان را در آغاز مشخص کن.",
      "رویدادها را با first، then و by the end مرتب کن.",
      "یک احساس یا تغییر نظر را اضافه کن.",
      "در پایان بگو چه چیزی از آن روز به یاد داری."
    ],
    "vocabulary": [
      {
        "word": "memorable",
        "meaning": "به‌یادماندنی"
      },
      {
        "word": "guide",
        "meaning": "راهنما"
      },
      {
        "word": "by the end",
        "meaning": "تا پایان"
      }
    ],
    "checklist": [
      "زمان و مکان مشخص است",
      "رویدادها ترتیب منطقی دارند",
      "احساس یا نتیجهٔ شخصی بیان شده"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «تا پایان» را دارد؟",
        "options": [
          "enjoy",
          "by the end",
          "grade",
          "friendly"
        ],
        "answerIndex": 1
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "نوشتن روایت با ترتیب زمانی",
          "ساخت یک پاراگراف منظم دربارهٔ عادت‌ها",
          "توصیف ظاهر و شخصیت با مثال",
          "معرفی کتاب و دلیل پیشنهاد آن"
        ],
        "answerIndex": 0
      },
      {
        "q": "کدام مورد به نوشته کمک می‌کند منظم‌تر باشد؟",
        "options": [
          "نوشتن همه‌چیز در یک جملهٔ طولانی",
          "حذف فاصله‌ها",
          "استفاده از ترتیب منطقی و واژه‌های پیوندی",
          "تکرار یک جمله"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 8,
    "slug": "favorite-book",
    "title": "My Favorite Book",
    "faTitle": "کتاب مورد علاقهٔ من",
    "category": "school",
    "level": "متوسط",
    "goal": "معرفی کتاب و دلیل پیشنهاد آن",
    "prompt": "کتاب یا داستانی را معرفی کن و توضیح بده چرا خواندن آن را پیشنهاد می‌کنی.",
    "minWords": 40,
    "modelEn": "My favorite book is a short adventure story about two friends who explore an old island. The story has exciting problems, but the friends solve them by working together. I like the clear language and the surprising ending. I would recommend this book to students who enjoy mysteries because it is entertaining and also teaches teamwork.",
    "modelFa": "کتاب مورد علاقهٔ من داستان ماجراجویی کوتاهی دربارهٔ دو دوست است که جزیره‌ای قدیمی را کشف می‌کنند. داستان مسائل هیجان‌انگیزی دارد، اما دوستان با همکاری آن‌ها را حل می‌کنند. زبان روشن و پایان غافلگیرکننده را دوست دارم. این کتاب را به دانش‌آموزانی که از معما لذت می‌برند پیشنهاد می‌کنم، چون سرگرم‌کننده است و همکاری را هم آموزش می‌دهد.",
    "steps": [
      "عنوان یا موضوع کتاب را معرفی کن.",
      "بدون لو دادن جزئیات مهم، خلاصه‌ای کوتاه بنویس.",
      "نظر خودت را با یک دلیل توضیح بده.",
      "در پایان مشخص کن به چه کسی آن را پیشنهاد می‌کنی."
    ],
    "vocabulary": [
      {
        "word": "adventure",
        "meaning": "ماجراجویی"
      },
      {
        "word": "recommend",
        "meaning": "پیشنهاد کردن"
      },
      {
        "word": "entertaining",
        "meaning": "سرگرم‌کننده"
      }
    ],
    "checklist": [
      "موضوع کتاب معرفی شده",
      "نظر با دلیل پشتیبانی شده",
      "گروه مخاطب مشخص شده"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «ماجراجویی» را دارد؟",
        "options": [
          "adventure",
          "grade",
          "friendly",
          "enjoy"
        ],
        "answerIndex": 0
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "ساخت یک پاراگراف منظم دربارهٔ عادت‌ها",
          "توصیف ظاهر و شخصیت با مثال",
          "نوشتن روایت با ترتیب زمانی",
          "معرفی کتاب و دلیل پیشنهاد آن"
        ],
        "answerIndex": 3
      },
      {
        "q": "کدام مورد به نوشته کمک می‌کند منظم‌تر باشد؟",
        "options": [
          "نوشتن همه‌چیز در یک جملهٔ طولانی",
          "حذف فاصله‌ها",
          "استفاده از ترتیب منطقی و واژه‌های پیوندی",
          "تکرار یک جمله"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 8,
    "slug": "healthy-habits",
    "title": "Healthy Habits",
    "faTitle": "عادت‌های سالم",
    "category": "world",
    "level": "متوسط",
    "goal": "نوشتن توصیه‌های کاربردی",
    "prompt": "سه عادت سالم را توضیح بده و برای هرکدام یک فایده بنویس.",
    "minWords": 40,
    "modelEn": "Healthy habits can make our school days easier. First, eating a balanced breakfast gives us energy. Second, moving our bodies every day helps us stay active and can improve our mood. Finally, sleeping enough makes it easier to concentrate in class. We do not need to change everything at once. Small habits, repeated regularly, can make a real difference.",
    "modelFa": "عادت‌های سالم می‌توانند روزهای مدرسه را آسان‌تر کنند. نخست، خوردن صبحانهٔ متعادل به ما انرژی می‌دهد. دوم، حرکت‌دادن بدن در هر روز به فعال‌ماندن کمک می‌کند و می‌تواند حالمان را بهتر کند. در نهایت، خواب کافی تمرکز در کلاس را آسان‌تر می‌کند. لازم نیست همه‌چیز را یک‌باره تغییر دهیم. عادت‌های کوچک که مرتب تکرار شوند، می‌توانند تفاوت واقعی ایجاد کنند.",
    "steps": [
      "ایدهٔ اصلی را در جملهٔ اول معرفی کن.",
      "برای ترتیب، از first، second و finally استفاده کن.",
      "برای هر عادت یک فایدهٔ مشخص بنویس.",
      "با یک توصیهٔ کلی و واقع‌بینانه جمع‌بندی کن."
    ],
    "vocabulary": [
      {
        "word": "balanced",
        "meaning": "متعادل"
      },
      {
        "word": "concentrate",
        "meaning": "تمرکز کردن"
      },
      {
        "word": "regularly",
        "meaning": "به‌طور منظم"
      }
    ],
    "checklist": [
      "سه عادت یا فایدهٔ روشن آورده شده",
      "واژه‌های ترتیب‌دهنده استفاده شده‌اند",
      "جمع‌بندی عملی دارد"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «تمرکز کردن» را دارد؟",
        "options": [
          "grade",
          "friendly",
          "enjoy",
          "concentrate"
        ],
        "answerIndex": 3
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "توصیف ظاهر و شخصیت با مثال",
          "نوشتن روایت با ترتیب زمانی",
          "نوشتن توصیه‌های کاربردی",
          "ساخت یک پاراگراف منظم دربارهٔ عادت‌ها"
        ],
        "answerIndex": 2
      },
      {
        "q": "کدام مورد به نوشته کمک می‌کند منظم‌تر باشد؟",
        "options": [
          "نوشتن همه‌چیز در یک جملهٔ طولانی",
          "حذف فاصله‌ها",
          "استفاده از ترتیب منطقی و واژه‌های پیوندی",
          "تکرار یک جمله"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 8,
    "slug": "giving-directions",
    "title": "Giving Directions",
    "faTitle": "راهنمایی مسیر",
    "category": "communication",
    "level": "متوسط",
    "goal": "نوشتن دستورالعمل روشن برای رسیدن به مقصد",
    "prompt": "مسیر خانه یا مدرسه تا یک مکان عمومی را با دست‌کم چهار دستور توضیح بده.",
    "minWords": 40,
    "modelEn": "To get to our school library, start at the main gate and walk straight along the hall. Turn left at the science room. The library is opposite the computer lab, next to the stairs. If you reach the teachers’ room, you have gone too far. Follow the signs and keep your voice low inside the library.",
    "modelFa": "برای رسیدن به کتابخانهٔ مدرسه، از دروازهٔ اصلی شروع کن و در راهرو مستقیم برو. کنار آزمایشگاه علوم به چپ بپیچ. کتابخانه روبه‌روی آزمایشگاه رایانه و کنار پله‌هاست. اگر به اتاق معلمان رسیدی، بیش از حد جلو رفته‌ای. تابلوها را دنبال کن و در کتابخانه آرام صحبت کن.",
    "steps": [
      "نقطهٔ شروع را مشخص کن.",
      "از فعل‌های امری مانند go، turn و follow استفاده کن.",
      "مکان‌ها را با next to و opposite مشخص کن.",
      "یک نشانه برای جلوگیری از گم‌شدن اضافه کن."
    ],
    "vocabulary": [
      {
        "word": "straight",
        "meaning": "مستقیم"
      },
      {
        "word": "opposite",
        "meaning": "روبرو"
      },
      {
        "word": "sign",
        "meaning": "تابلو یا نشانه"
      }
    ],
    "checklist": [
      "نقطهٔ شروع مشخص است",
      "حداقل سه دستور مکانی وجود دارد",
      "یک نشانهٔ کمکی دارد"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «تابلو یا نشانه» را دارد؟",
        "options": [
          "friendly",
          "enjoy",
          "sign",
          "grade"
        ],
        "answerIndex": 2
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "نوشتن روایت با ترتیب زمانی",
          "نوشتن دستورالعمل روشن برای رسیدن به مقصد",
          "ساخت یک پاراگراف منظم دربارهٔ عادت‌ها",
          "توصیف ظاهر و شخصیت با مثال"
        ],
        "answerIndex": 1
      },
      {
        "q": "کدام مورد به نوشته کمک می‌کند منظم‌تر باشد؟",
        "options": [
          "نوشتن همه‌چیز در یک جملهٔ طولانی",
          "حذف فاصله‌ها",
          "استفاده از ترتیب منطقی و واژه‌های پیوندی",
          "تکرار یک جمله"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 8,
    "slug": "protect-environment",
    "title": "Protecting the Environment",
    "faTitle": "محافظت از محیط‌زیست",
    "category": "world",
    "level": "متوسط",
    "goal": "ساخت پاراگراف مسئله و راهکار",
    "prompt": "یک مشکل محیط‌زیستی را نام ببر و سه راهکار عملی پیشنهاد کن.",
    "minWords": 40,
    "modelEn": "Plastic waste is a problem in many communities. It can make streets dirty and harm animals when it reaches rivers. We can bring reusable bags, use refillable water bottles, and separate rubbish for recycling. Schools can also place clear recycling bins near classrooms. If many people make small changes, our neighborhood can become cleaner and healthier.",
    "modelFa": "زبالهٔ پلاستیکی در بسیاری از جوامع مشکل است. می‌تواند خیابان‌ها را کثیف کند و وقتی به رودخانه می‌رسد به حیوانات آسیب بزند. می‌توانیم کیسه‌های چندبارمصرف بیاوریم، از بطری‌های آب قابل‌پرکردن استفاده کنیم و زباله‌ها را برای بازیافت جدا کنیم. مدرسه‌ها هم می‌توانند سطل‌های بازیافت روشن و مشخص نزدیک کلاس‌ها بگذارند. اگر افراد زیادی تغییرهای کوچکی ایجاد کنند، محلهٔ ما تمیزتر و سالم‌تر می‌شود.",
    "steps": [
      "مشکل را با یک جمله روشن توضیح بده.",
      "سه راهکار عملی بنویس.",
      "از can برای پیشنهاد امکان‌ها استفاده کن.",
      "در پایان اثر جمعی راهکارها را بیان کن."
    ],
    "vocabulary": [
      {
        "word": "waste",
        "meaning": "زباله یا هدررفت"
      },
      {
        "word": "reusable",
        "meaning": "چندبارمصرف"
      },
      {
        "word": "recycling",
        "meaning": "بازیافت"
      }
    ],
    "checklist": [
      "مشکل توضیح داده شده",
      "حداقل دو راهکار عملی دارد",
      "اثر راهکارها در پایان آمده"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «زباله یا هدررفت» را دارد؟",
        "options": [
          "enjoy",
          "waste",
          "grade",
          "friendly"
        ],
        "answerIndex": 1
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "ساخت پاراگراف مسئله و راهکار",
          "ساخت یک پاراگراف منظم دربارهٔ عادت‌ها",
          "توصیف ظاهر و شخصیت با مثال",
          "نوشتن روایت با ترتیب زمانی"
        ],
        "answerIndex": 0
      },
      {
        "q": "کدام مورد به نوشته کمک می‌کند منظم‌تر باشد؟",
        "options": [
          "نوشتن همه‌چیز در یک جملهٔ طولانی",
          "حذف فاصله‌ها",
          "استفاده از ترتیب منطقی و واژه‌های پیوندی",
          "تکرار یک جمله"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 8,
    "slug": "email-to-friend",
    "title": "An Email to a Friend",
    "faTitle": "ایمیل به یک دوست",
    "category": "communication",
    "level": "متوسط",
    "goal": "نوشتن ایمیل دوستانه با ساختار مشخص",
    "prompt": "به یک دوست دربارهٔ برنامهٔ آینده‌ات ایمیل بنویس و از او هم سؤال کن.",
    "minWords": 40,
    "modelEn": "Subject: Our Weekend Plan\nHi Neda,\nHow are you? My family is planning a short trip this weekend, and I want to visit the lake near our town. We can walk, take photos, and have lunch together. Would you like to join us? Please tell me by Thursday so we can plan the trip.\nBest wishes,\nSara",
    "modelFa": "موضوع: برنامهٔ آخر هفتهٔ ما\nسلام ندا،\nحالت چطور است؟ خانواده‌ام برای این آخر هفته سفر کوتاهی برنامه‌ریزی می‌کند و می‌خواهم از دریاچهٔ نزدیک شهرمان دیدن کنم. می‌توانیم پیاده‌روی کنیم، عکس بگیریم و با هم ناهار بخوریم. دوست داری همراه ما بیایی؟ لطفاً تا پنجشنبه به من بگو تا بتوانیم سفر را برنامه‌ریزی کنیم.\nبا بهترین آرزوها،\nسارا",
    "steps": [
      "یک موضوع (Subject) کوتاه بنویس.",
      "با سلام دوستانه شروع کن.",
      "هدف پیام و جزئیات برنامه را روشن بگو.",
      "یک سؤال یا درخواست پاسخ اضافه کن و با نام تمام کن."
    ],
    "vocabulary": [
      {
        "word": "subject",
        "meaning": "موضوع ایمیل"
      },
      {
        "word": "join",
        "meaning": "ملحق شدن"
      },
      {
        "word": "plan",
        "meaning": "برنامه‌ریزی کردن"
      }
    ],
    "checklist": [
      "موضوع و سلام دارد",
      "جزئیات برنامه مشخص است",
      "پرسش و پایان دوستانه دارد"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «ملحق شدن» را دارد؟",
        "options": [
          "join",
          "grade",
          "friendly",
          "enjoy"
        ],
        "answerIndex": 0
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "ساخت یک پاراگراف منظم دربارهٔ عادت‌ها",
          "توصیف ظاهر و شخصیت با مثال",
          "نوشتن روایت با ترتیب زمانی",
          "نوشتن ایمیل دوستانه با ساختار مشخص"
        ],
        "answerIndex": 3
      },
      {
        "q": "کدام مورد به نوشته کمک می‌کند منظم‌تر باشد؟",
        "options": [
          "نوشتن همه‌چیز در یک جملهٔ طولانی",
          "حذف فاصله‌ها",
          "استفاده از ترتیب منطقی و واژه‌های پیوندی",
          "تکرار یک جمله"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 8,
    "slug": "make-a-sandwich",
    "title": "How to Make a Sandwich",
    "faTitle": "چطور ساندویچ درست کنیم",
    "category": "daily",
    "level": "متوسط",
    "goal": "نوشتن مراحل یک فرایند",
    "prompt": "مراحل آماده‌کردن یک خوراکی ساده را با ترتیب روشن توضیح بده.",
    "minWords": 40,
    "modelEn": "Making a simple sandwich is easy. First, put two slices of bread on a clean plate. Next, add cheese, lettuce, and tomato. Then, place the second slice of bread on top and press gently. Finally, cut the sandwich into two pieces and serve it. Always wash your hands before preparing food.",
    "modelFa": "درست‌کردن یک ساندویچ ساده آسان است. ابتدا دو برش نان روی بشقاب تمیز بگذار. سپس پنیر، کاهو و گوجه اضافه کن. بعد برش دوم نان را روی آن قرار بده و آرام فشار بده. در نهایت ساندویچ را به دو قسمت برش بده و سرو کن. همیشه پیش از آماده‌کردن غذا دست‌هایت را بشوی.",
    "steps": [
      "در جملهٔ اول فرایند را معرفی کن.",
      "از first، next، then و finally برای ترتیب استفاده کن.",
      "هر مرحله را با یک فعل روشن شروع کن.",
      "یک نکتهٔ ایمنی یا بهداشتی مرتبط اضافه کن."
    ],
    "vocabulary": [
      {
        "word": "slice",
        "meaning": "برش"
      },
      {
        "word": "gently",
        "meaning": "به‌آرامی"
      },
      {
        "word": "prepare",
        "meaning": "آماده کردن"
      }
    ],
    "checklist": [
      "مراحل به ترتیب هستند",
      "واژه‌های ترتیبی استفاده شده‌اند",
      "یک نکتهٔ بهداشتی مرتبط دارد"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «آماده کردن» را دارد؟",
        "options": [
          "grade",
          "friendly",
          "enjoy",
          "prepare"
        ],
        "answerIndex": 3
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "توصیف ظاهر و شخصیت با مثال",
          "نوشتن روایت با ترتیب زمانی",
          "نوشتن مراحل یک فرایند",
          "ساخت یک پاراگراف منظم دربارهٔ عادت‌ها"
        ],
        "answerIndex": 2
      },
      {
        "q": "کدام مورد به نوشته کمک می‌کند منظم‌تر باشد؟",
        "options": [
          "نوشتن همه‌چیز در یک جملهٔ طولانی",
          "حذف فاصله‌ها",
          "استفاده از ترتیب منطقی و واژه‌های پیوندی",
          "تکرار یک جمله"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 9,
    "slug": "opinion-paragraph",
    "title": "An Opinion Paragraph",
    "faTitle": "پاراگراف بیان نظر",
    "category": "world",
    "level": "پیشرفته‌تر",
    "goal": "بیان نظر با دلیل و مثال",
    "prompt": "دربارهٔ این نظر که خواندن هر روز مفید است، موضع بگیر و دو دلیل با مثال بیاور.",
    "minWords": 55,
    "modelEn": "I believe that reading for a few minutes every day is a useful habit for teenagers. First, reading helps us learn new words in context instead of memorizing isolated lists. For example, a story can show how a word changes meaning in different situations. Second, regular reading develops concentration. Although students are busy, even fifteen minutes a day can make a difference. For these reasons, daily reading is worth the effort.",
    "modelFa": "باور دارم که چند دقیقه مطالعه در هر روز عادت مفیدی برای نوجوانان است. اول، مطالعه کمک می‌کند واژه‌های جدید را در بافت یاد بگیریم، نه اینکه فهرست‌های جداگانه را حفظ کنیم. برای نمونه، یک داستان نشان می‌دهد واژه در موقعیت‌های مختلف چگونه تغییر معنا می‌دهد. دوم، مطالعهٔ منظم تمرکز را تقویت می‌کند. با اینکه دانش‌آموزان مشغول‌اند، حتی روزی پانزده دقیقه هم مؤثر است. به این دلایل، مطالعهٔ روزانه ارزش تلاش را دارد.",
    "steps": [
      "موضع خودت را در جملهٔ اول مستقیم بنویس.",
      "برای هر دلیل، یک توضیح یا مثال واقعی بیاور.",
      "از First، Second، For example و Although استفاده کن.",
      "نتیجه‌گیری باید نظر اصلی را جمع‌بندی کند، نه موضوع تازه‌ای باز کند."
    ],
    "vocabulary": [
      {
        "word": "in context",
        "meaning": "در بافت"
      },
      {
        "word": "concentration",
        "meaning": "تمرکز"
      },
      {
        "word": "worth the effort",
        "meaning": "ارزش تلاش را داشتن"
      }
    ],
    "checklist": [
      "نظر اصلی صریح است",
      "دو دلیل با توضیح یا مثال وجود دارد",
      "نتیجه‌گیری با نظر اصلی مرتبط است"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «در بافت» را دارد؟",
        "options": [
          "friendly",
          "enjoy",
          "in context",
          "grade"
        ],
        "answerIndex": 2
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "ساخت داستان با آغاز، مشکل و پایان",
          "بیان نظر با دلیل و مثال",
          "نوشتن مقایسه بر پایهٔ معیارهای مشخص",
          "نوشتن ایمیل رسمی برای درخواست اطلاعات"
        ],
        "answerIndex": 1
      },
      {
        "q": "نتیجه‌گیری یک متن معمولاً چه کاری می‌کند؟",
        "options": [
          "موضوعی تازه و نامرتبط باز می‌کند",
          "تمام مثال‌ها را بدون ارتباط کپی می‌کند",
          "ایدهٔ اصلی را جمع‌بندی می‌کند",
          "عنوان را حذف می‌کند"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 9,
    "slug": "compare-two-places",
    "title": "Comparing Two Places",
    "faTitle": "مقایسهٔ دو مکان",
    "category": "world",
    "level": "پیشرفته‌تر",
    "goal": "نوشتن مقایسه بر پایهٔ معیارهای مشخص",
    "prompt": "دو مکان را از نظر شلوغی، هزینه یا امکانات مقایسه کن و در پایان ترجیح خودت را بگو.",
    "minWords": 55,
    "modelEn": "Living in a large city and living in a small town offer different experiences. A large city usually has more public transport, schools, and job opportunities, but traffic and noise can make daily life stressful. In contrast, a small town may be quieter and easier to walk around, although some services are limited. I would prefer a small town because I value a calm environment, but the best choice depends on each person's needs.",
    "modelFa": "زندگی در شهر بزرگ و زندگی در شهر کوچک تجربه‌های متفاوتی دارند. شهر بزرگ معمولاً حمل‌ونقل عمومی، مدرسه و فرصت‌های شغلی بیشتری دارد، اما ترافیک و سروصدا می‌توانند زندگی روزمره را پراسترس کنند. در مقابل، شهر کوچک ممکن است آرام‌تر باشد و رفت‌وآمد در آن آسان‌تر باشد، هرچند بعضی خدمات محدودند. من شهر کوچک را ترجیح می‌دهم چون محیط آرام را ارزشمند می‌دانم؛ با این حال بهترین انتخاب به نیاز هر فرد بستگی دارد.",
    "steps": [
      "دو موضوع را در جملهٔ آغازین نام ببر.",
      "هر دو طرف را با معیارهای مشابه مقایسه کن.",
      "از however، in contrast و although برای نشان‌دادن تفاوت استفاده کن.",
      "در نتیجه‌گیری انتخاب و دلیل خودت را بیان کن."
    ],
    "vocabulary": [
      {
        "word": "opportunity",
        "meaning": "فرصت"
      },
      {
        "word": "in contrast",
        "meaning": "در مقابل"
      },
      {
        "word": "depend on",
        "meaning": "بستگی داشتن به"
      }
    ],
    "checklist": [
      "هر دو مکان با معیار مشترک مقایسه شده‌اند",
      "واژهٔ مقایسه یا تضاد استفاده شده",
      "ترجیح شخصی با دلیل بیان شده"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «در مقابل» را دارد؟",
        "options": [
          "enjoy",
          "in contrast",
          "grade",
          "friendly"
        ],
        "answerIndex": 1
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "نوشتن مقایسه بر پایهٔ معیارهای مشخص",
          "بیان نظر با دلیل و مثال",
          "نوشتن ایمیل رسمی برای درخواست اطلاعات",
          "ساخت داستان با آغاز، مشکل و پایان"
        ],
        "answerIndex": 0
      },
      {
        "q": "نتیجه‌گیری یک متن معمولاً چه کاری می‌کند؟",
        "options": [
          "موضوعی تازه و نامرتبط باز می‌کند",
          "تمام مثال‌ها را بدون ارتباط کپی می‌کند",
          "ایدهٔ اصلی را جمع‌بندی می‌کند",
          "عنوان را حذف می‌کند"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 9,
    "slug": "formal-email",
    "title": "A Formal Email",
    "faTitle": "ایمیل رسمی",
    "category": "communication",
    "level": "پیشرفته‌تر",
    "goal": "نوشتن ایمیل رسمی برای درخواست اطلاعات",
    "prompt": "به مسئول یک کتابخانه ایمیل رسمی بنویس و دربارهٔ ساعت کار و شرایط عضویت سؤال کن.",
    "minWords": 55,
    "modelEn": "Subject: Request for Library Membership Information\nDear Library Manager,\nI am writing to ask about the membership process at your library. Could you please tell me your opening hours and which documents a student needs to register? I would also like to know whether there is a fee for borrowing books. Thank you for your time and assistance. I look forward to your reply.\nKind regards,\nMina Ahmadi",
    "modelFa": "موضوع: درخواست اطلاعات دربارهٔ عضویت کتابخانه\nمدیر محترم کتابخانه،\nبرای پرس‌وجو دربارهٔ فرایند عضویت در کتابخانهٔ شما می‌نویسم. ممکن است لطفاً ساعات کاری و مدارکی را که دانش‌آموز برای ثبت‌نام نیاز دارد بگویید؟ همچنین مایلم بدانم آیا برای امانت‌گرفتن کتاب هزینه‌ای وجود دارد یا خیر. از وقت و کمکتان سپاسگزارم. منتظر پاسخ شما هستم.\nبا احترام،\nمینا احمدی",
    "steps": [
      "موضوع را کوتاه و مشخص بنویس.",
      "از Dear … برای شروع رسمی استفاده کن.",
      "درخواست‌ها را با Could you please…? مودبانه مطرح کن.",
      "با تشکر و Kind regards ایمیل را تمام کن."
    ],
    "vocabulary": [
      {
        "word": "membership",
        "meaning": "عضویت"
      },
      {
        "word": "register",
        "meaning": "ثبت‌نام کردن"
      },
      {
        "word": "assistance",
        "meaning": "کمک"
      }
    ],
    "checklist": [
      "موضوع و خطاب رسمی دارد",
      "حداقل دو پرسش واضح دارد",
      "تشکر و پایان رسمی دارد"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «کمک» را دارد؟",
        "options": [
          "assistance",
          "grade",
          "friendly",
          "enjoy"
        ],
        "answerIndex": 0
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "بیان نظر با دلیل و مثال",
          "نوشتن مقایسه بر پایهٔ معیارهای مشخص",
          "ساخت داستان با آغاز، مشکل و پایان",
          "نوشتن ایمیل رسمی برای درخواست اطلاعات"
        ],
        "answerIndex": 3
      },
      {
        "q": "نتیجه‌گیری یک متن معمولاً چه کاری می‌کند؟",
        "options": [
          "موضوعی تازه و نامرتبط باز می‌کند",
          "تمام مثال‌ها را بدون ارتباط کپی می‌کند",
          "ایدهٔ اصلی را جمع‌بندی می‌کند",
          "عنوان را حذف می‌کند"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 9,
    "slug": "short-story",
    "title": "A Short Story with a Twist",
    "faTitle": "داستان کوتاه با پایان غافلگیرکننده",
    "category": "personal",
    "level": "پیشرفته‌تر",
    "goal": "ساخت داستان با آغاز، مشکل و پایان",
    "prompt": "داستان کوتاهی دربارهٔ وسیله‌ای گمشده بنویس که در پایان راه‌حل غیرمنتظره‌ای دارد.",
    "minWords": 55,
    "modelEn": "When Leila arrived at the station, she discovered that her notebook was missing. She searched her bag twice and asked the ticket officer for help, but no one had seen it. Just as the train arrived, a little boy ran toward her and held out the notebook. He had found it on a bench and read the name inside. Leila thanked him and decided to write her phone number on the cover next time.",
    "modelFa": "وقتی لیلا به ایستگاه رسید، متوجه شد دفترش گم شده است. دو بار کیفش را گشت و از مأمور بلیت کمک خواست، اما کسی آن را ندیده بود. درست وقتی قطار رسید، پسربچه‌ای به‌طرف او دوید و دفتر را جلو آورد. او دفتر را روی نیمکت پیدا کرده و نام داخل آن را خوانده بود. لیلا از او تشکر کرد و تصمیم گرفت دفعهٔ بعد شمارهٔ تلفنش را روی جلد بنویسد.",
    "steps": [
      "شخصیت و مکان را در آغاز معرفی کن.",
      "یک مشکل روشن ایجاد کن.",
      "رویدادها را با افعال گذشته تعریف کن.",
      "پایانی بنویس که مشکل را حل کند و یک جزئیات جالب داشته باشد."
    ],
    "vocabulary": [
      {
        "word": "discover",
        "meaning": "متوجه شدن یا کشف کردن"
      },
      {
        "word": "search",
        "meaning": "جست‌وجو کردن"
      },
      {
        "word": "cover",
        "meaning": "جلد"
      }
    ],
    "checklist": [
      "شخصیت و مشکل معرفی شده‌اند",
      "رویدادها ترتیب دارند",
      "پایان مشکل را حل می‌کند"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «متوجه شدن یا کشف کردن» را دارد؟",
        "options": [
          "grade",
          "friendly",
          "enjoy",
          "discover"
        ],
        "answerIndex": 3
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "نوشتن مقایسه بر پایهٔ معیارهای مشخص",
          "نوشتن ایمیل رسمی برای درخواست اطلاعات",
          "ساخت داستان با آغاز، مشکل و پایان",
          "بیان نظر با دلیل و مثال"
        ],
        "answerIndex": 2
      },
      {
        "q": "نتیجه‌گیری یک متن معمولاً چه کاری می‌کند؟",
        "options": [
          "موضوعی تازه و نامرتبط باز می‌کند",
          "تمام مثال‌ها را بدون ارتباط کپی می‌کند",
          "ایدهٔ اصلی را جمع‌بندی می‌کند",
          "عنوان را حذف می‌کند"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 9,
    "slug": "technology-pros-cons",
    "title": "Technology: Benefits and Challenges",
    "faTitle": "فناوری؛ مزایا و چالش‌ها",
    "category": "world",
    "level": "پیشرفته‌تر",
    "goal": "ارزیابی متعادل مزایا و معایب",
    "prompt": "مزایا و چالش‌های استفاده از تلفن هوشمند برای دانش‌آموزان را مقایسه کن و پیشنهاد بده.",
    "minWords": 55,
    "modelEn": "Smartphones can be useful learning tools because students can look up words, listen to pronunciation, and organize their schedules. However, constant notifications may interrupt concentration, and spending too much time online can reduce sleep. The problem is not the device itself but how we use it. Students should set limits, silence notifications during study time, and check information carefully. With clear habits, technology can support learning without taking over the day.",
    "modelFa": "تلفن‌های هوشمند می‌توانند ابزارهای یادگیری مفیدی باشند، زیرا دانش‌آموزان می‌توانند معنی واژه‌ها را پیدا کنند، تلفظ را بشنوند و برنامه‌هایشان را تنظیم کنند. با این حال، اعلان‌های پی‌درپی ممکن است تمرکز را مختل کند و زمان زیاد آنلاین‌بودن خواب را کاهش دهد. مشکل خود دستگاه نیست، بلکه شیوهٔ استفاده از آن است. دانش‌آموزان باید محدودیت تعیین کنند، هنگام مطالعه اعلان‌ها را خاموش کنند و اطلاعات را با دقت بررسی کنند. عادت‌های روشن کمک می‌کند فناوری از یادگیری پشتیبانی کند بی‌آنکه تمام روز را در اختیار بگیرد.",
    "steps": [
      "یک مزیت و یک چالش را مطرح کن.",
      "هر دو طرف را با مثال یا پیامد پشتیبانی کن.",
      "از however و because برای ارتباط منطقی استفاده کن.",
      "در پایان پیشنهادهای مشخص و قابل اجرا بده."
    ],
    "vocabulary": [
      {
        "word": "notification",
        "meaning": "اعلان"
      },
      {
        "word": "interrupt",
        "meaning": "مختل کردن"
      },
      {
        "word": "set limits",
        "meaning": "محدودیت تعیین کردن"
      }
    ],
    "checklist": [
      "مزیت و چالش هر دو آمده‌اند",
      "نظر با دلیل توضیح داده شده",
      "پیشنهاد عملی در پایان وجود دارد"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «مختل کردن» را دارد؟",
        "options": [
          "friendly",
          "enjoy",
          "interrupt",
          "grade"
        ],
        "answerIndex": 2
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "نوشتن ایمیل رسمی برای درخواست اطلاعات",
          "ارزیابی متعادل مزایا و معایب",
          "بیان نظر با دلیل و مثال",
          "نوشتن مقایسه بر پایهٔ معیارهای مشخص"
        ],
        "answerIndex": 1
      },
      {
        "q": "نتیجه‌گیری یک متن معمولاً چه کاری می‌کند؟",
        "options": [
          "موضوعی تازه و نامرتبط باز می‌کند",
          "تمام مثال‌ها را بدون ارتباط کپی می‌کند",
          "ایدهٔ اصلی را جمع‌بندی می‌کند",
          "عنوان را حذف می‌کند"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 9,
    "slug": "online-safety-advice",
    "title": "Advice for Online Safety",
    "faTitle": "توصیه برای امنیت اینترنتی",
    "category": "world",
    "level": "پیشرفته‌تر",
    "goal": "نوشتن راهنمای توصیه‌ای با should و must",
    "prompt": "برای هم‌کلاسی‌هایت راهنمایی دربارهٔ حفظ حریم خصوصی و برخورد با پیام مشکوک بنویس.",
    "minWords": 55,
    "modelEn": "Staying safe online requires careful choices. First, use strong passwords and never share them in a public chat. Second, check the sender before opening a link or attachment. If a message asks for private information or makes you feel uncomfortable, do not reply immediately; save the message and ask a trusted adult or teacher for help. Remember that personal photos and school details can spread quickly. A short pause before clicking can prevent serious problems.",
    "modelFa": "امن ماندن در اینترنت به انتخاب‌های محتاطانه نیاز دارد. اول، از گذرواژه‌های قوی استفاده کن و هرگز آن‌ها را در گفت‌وگوی عمومی به اشتراک نگذار. دوم، قبل از بازکردن لینک یا فایل، فرستنده را بررسی کن. اگر پیامی اطلاعات خصوصی می‌خواهد یا احساس ناراحتی ایجاد می‌کند، فوراً پاسخ نده؛ پیام را نگه دار و از بزرگسال یا معلم مورد اعتماد کمک بگیر. به یاد داشته باش عکس‌های شخصی و اطلاعات مدرسه می‌توانند به‌سرعت پخش شوند. کمی مکث پیش از کلیک می‌تواند از مشکلات جدی جلوگیری کند.",
    "steps": [
      "موضوع امنیت را در جملهٔ اول معرفی کن.",
      "حداقل سه توصیهٔ روشن بنویس.",
      "از should، must یا فعل امری مناسب استفاده کن.",
      "برای موقعیت مشکوک یک اقدام امن پیشنهاد بده."
    ],
    "vocabulary": [
      {
        "word": "attachment",
        "meaning": "پیوست"
      },
      {
        "word": "private information",
        "meaning": "اطلاعات خصوصی"
      },
      {
        "word": "trusted",
        "meaning": "مورد اعتماد"
      }
    ],
    "checklist": [
      "سه توصیهٔ مشخص وجود دارد",
      "یک واکنش امن به پیام مشکوک بیان شده",
      "دلیل یا هشدار مرتبط دارد"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «مورد اعتماد» را دارد؟",
        "options": [
          "enjoy",
          "trusted",
          "grade",
          "friendly"
        ],
        "answerIndex": 1
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "نوشتن راهنمای توصیه‌ای با should و must",
          "بیان نظر با دلیل و مثال",
          "نوشتن مقایسه بر پایهٔ معیارهای مشخص",
          "نوشتن ایمیل رسمی برای درخواست اطلاعات"
        ],
        "answerIndex": 0
      },
      {
        "q": "نتیجه‌گیری یک متن معمولاً چه کاری می‌کند؟",
        "options": [
          "موضوعی تازه و نامرتبط باز می‌کند",
          "تمام مثال‌ها را بدون ارتباط کپی می‌کند",
          "ایدهٔ اصلی را جمع‌بندی می‌کند",
          "عنوان را حذف می‌کند"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 9,
    "slug": "future-plans",
    "title": "My Plans for the Future",
    "faTitle": "برنامه‌های آیندهٔ من",
    "category": "personal",
    "level": "پیشرفته‌تر",
    "goal": "توضیح هدف و گام‌های رسیدن به آن",
    "prompt": "یک هدف تحصیلی یا شخصی آینده را توضیح بده و سه گام برای رسیدن به آن بنویس.",
    "minWords": 55,
    "modelEn": "In the future, I would like to become confident in English so that I can study from a wider range of books and videos. My first step is to practise a little every day instead of waiting for a free weekend. I will also keep a notebook of new words and use them in my own sentences. Finally, I plan to speak with classmates whenever I have the chance. Progress may be slow, but regular effort will help me reach my goal.",
    "modelFa": "در آینده دوست دارم در انگلیسی اعتمادبه‌نفس پیدا کنم تا بتوانم از مجموعهٔ گسترده‌تری از کتاب‌ها و ویدئوها استفاده کنم. قدم اولم این است که به‌جای انتظار برای آخر هفتهٔ خلوت، هر روز کمی تمرین کنم. همچنین دفترچه‌ای از واژه‌های جدید نگه می‌دارم و آن‌ها را در جمله‌های خودم به کار می‌برم. در نهایت، هر وقت فرصت داشته باشم با هم‌کلاسی‌ها صحبت می‌کنم. پیشرفت شاید آهسته باشد، اما تلاش منظم به رسیدن به هدف کمک می‌کند.",
    "steps": [
      "هدف را روشن بنویس.",
      "سه گام اجرایی و واقع‌بینانه اضافه کن.",
      "از first، also و finally برای ترتیب استفاده کن.",
      "با جمله‌ای دربارهٔ تلاش یا نتیجه جمع‌بندی کن."
    ],
    "vocabulary": [
      {
        "word": "confident",
        "meaning": "بااعتمادبه‌نفس"
      },
      {
        "word": "range",
        "meaning": "مجموعه یا دامنه"
      },
      {
        "word": "regular effort",
        "meaning": "تلاش منظم"
      }
    ],
    "checklist": [
      "هدف آینده روشن است",
      "سه گام عملی پیشنهاد شده‌اند",
      "پایان متن ارتباط مستقیم با هدف دارد"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «بااعتمادبه‌نفس» را دارد؟",
        "options": [
          "confident",
          "grade",
          "friendly",
          "enjoy"
        ],
        "answerIndex": 0
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "بیان نظر با دلیل و مثال",
          "نوشتن مقایسه بر پایهٔ معیارهای مشخص",
          "نوشتن ایمیل رسمی برای درخواست اطلاعات",
          "توضیح هدف و گام‌های رسیدن به آن"
        ],
        "answerIndex": 3
      },
      {
        "q": "نتیجه‌گیری یک متن معمولاً چه کاری می‌کند؟",
        "options": [
          "موضوعی تازه و نامرتبط باز می‌کند",
          "تمام مثال‌ها را بدون ارتباط کپی می‌کند",
          "ایدهٔ اصلی را جمع‌بندی می‌کند",
          "عنوان را حذف می‌کند"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 9,
    "slug": "study-effectively",
    "title": "How to Study Effectively",
    "faTitle": "چگونه مؤثر درس بخوانیم",
    "category": "school",
    "level": "پیشرفته‌تر",
    "goal": "نوشتن راهنمای مرحله‌ای و کاربردی",
    "prompt": "روش مطالعهٔ مؤثر خودت را با دست‌کم سه مرحله توضیح بده و یک دلیل برای آن بیاور.",
    "minWords": 55,
    "modelEn": "Effective studying begins with a clear goal. Before opening a book, decide what you want to understand by the end of the session. Next, study in a quiet place and put your phone away to reduce distractions. After twenty-five minutes, take a short break and test yourself without looking at the notes. Finally, review mistakes and choose the next small goal. This method makes study time more active and easier to manage.",
    "modelFa": "مطالعهٔ مؤثر با هدفی روشن شروع می‌شود. پیش از بازکردن کتاب، تصمیم بگیر تا پایان جلسه چه چیزی را می‌خواهی بفهمی. سپس در جای آرامی درس بخوان و برای کم‌کردن حواس‌پرتی گوشی را کنار بگذار. پس از بیست‌وپنج دقیقه استراحت کوتاهی کن و بدون نگاه‌کردن به یادداشت‌ها خودت را بسنج. در پایان، اشتباه‌ها را مرور کن و هدف کوچک بعدی را انتخاب کن. این روش زمان مطالعه را فعال‌تر و مدیریت آن را آسان‌تر می‌کند.",
    "steps": [
      "هدف راهنما را در ابتدا بگو.",
      "مراحل را با next، after و finally مرتب کن.",
      "دستورهای قابل اجرا بنویس، نه توصیه‌های کلی.",
      "اثر کلی روش را در پایان توضیح بده."
    ],
    "vocabulary": [
      {
        "word": "effective",
        "meaning": "مؤثر"
      },
      {
        "word": "distraction",
        "meaning": "حواس‌پرتی"
      },
      {
        "word": "manage",
        "meaning": "مدیریت کردن"
      }
    ],
    "checklist": [
      "سه مرحلهٔ روشن دارد",
      "هر مرحله قابل اجرا است",
      "دلیل فایدهٔ روش توضیح داده شده"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «حواس‌پرتی» را دارد؟",
        "options": [
          "grade",
          "friendly",
          "enjoy",
          "distraction"
        ],
        "answerIndex": 3
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "نوشتن مقایسه بر پایهٔ معیارهای مشخص",
          "نوشتن ایمیل رسمی برای درخواست اطلاعات",
          "نوشتن راهنمای مرحله‌ای و کاربردی",
          "بیان نظر با دلیل و مثال"
        ],
        "answerIndex": 2
      },
      {
        "q": "نتیجه‌گیری یک متن معمولاً چه کاری می‌کند؟",
        "options": [
          "موضوعی تازه و نامرتبط باز می‌کند",
          "تمام مثال‌ها را بدون ارتباط کپی می‌کند",
          "ایدهٔ اصلی را جمع‌بندی می‌کند",
          "عنوان را حذف می‌کند"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 9,
    "slug": "problem-solution",
    "title": "A Problem and a Solution",
    "faTitle": "یک مشکل و راه‌حل",
    "category": "world",
    "level": "پیشرفته‌تر",
    "goal": "ساخت متن مسئله و راهکار",
    "prompt": "مشکل زباله در اطراف مدرسه را توضیح بده و راهکاری عملی برای مدرسه پیشنهاد کن.",
    "minWords": 55,
    "modelEn": "Litter around the school gate makes the area unpleasant and can attract animals. One reason is that there are not enough clearly marked bins near the exit. The school could place separate bins in visible places and ask students to take turns checking the area after lunch. Posters can remind everyone to reduce waste, but students should also see adults following the same rules. If the plan is reviewed each week, the school can measure whether the area becomes cleaner.",
    "modelFa": "زباله اطراف دروازهٔ مدرسه محیط را ناخوشایند می‌کند و ممکن است حیوانات را جذب کند. یکی از دلیل‌ها این است که نزدیک خروجی سطل‌های مشخص کافی وجود ندارد. مدرسه می‌تواند سطل‌های جداگانه را در مکان‌های قابل دید قرار دهد و از دانش‌آموزان بخواهد بعد از ناهار نوبتی محوطه را بررسی کنند. پوسترها می‌توانند به همه یادآوری کنند زباله را کم کنند، اما دانش‌آموزان باید ببینند بزرگسالان هم همین قوانین را رعایت می‌کنند. اگر برنامه هر هفته بررسی شود، مدرسه می‌تواند اندازه بگیرد که محوطه تمیزتر شده است یا نه.",
    "steps": [
      "مشکل و اثر آن را دقیق بیان کن.",
      "یک دلیل احتمالی توضیح بده.",
      "یک یا دو راهکار قابل اجرا پیشنهاد کن.",
      "با معیاری برای بررسی نتیجه جمع‌بندی کن."
    ],
    "vocabulary": [
      {
        "word": "litter",
        "meaning": "زبالهٔ پراکنده"
      },
      {
        "word": "visible",
        "meaning": "قابل مشاهده"
      },
      {
        "word": "measure",
        "meaning": "اندازه‌گیری کردن"
      }
    ],
    "checklist": [
      "مشکل و پیامد آن مشخص است",
      "راهکار عملی و مسئول اجرای آن بیان شده",
      "روش بررسی نتیجه ذکر شده"
    ],
    "questions": [
      {
        "q": "کدام واژه معنی «اندازه‌گیری کردن» را دارد؟",
        "options": [
          "friendly",
          "enjoy",
          "measure",
          "grade"
        ],
        "answerIndex": 2
      },
      {
        "q": "هدف اصلی این درس نوشتن دربارهٔ چیست؟",
        "options": [
          "نوشتن ایمیل رسمی برای درخواست اطلاعات",
          "ساخت متن مسئله و راهکار",
          "بیان نظر با دلیل و مثال",
          "نوشتن مقایسه بر پایهٔ معیارهای مشخص"
        ],
        "answerIndex": 1
      },
      {
        "q": "نتیجه‌گیری یک متن معمولاً چه کاری می‌کند؟",
        "options": [
          "موضوعی تازه و نامرتبط باز می‌کند",
          "تمام مثال‌ها را بدون ارتباط کپی می‌کند",
          "ایدهٔ اصلی را جمع‌بندی می‌کند",
          "عنوان را حذف می‌کند"
        ],
        "answerIndex": 2
      }
    ]
  }
];
