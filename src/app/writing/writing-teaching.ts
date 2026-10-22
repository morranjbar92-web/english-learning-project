export type WritingTeaching = {
  intro: string;
  steps: { title: string; detail: string }[];
  frames: { en: string; fa: string; note: string }[];
  connectors: { en: string; fa: string }[];
  mistakes: { wrong: string; right: string; reason: string }[];
};

// Focused teaching notes, sentence frames, connectors, and common-error corrections for each of the 27 lessons.
export const writingTeaching: Record<string, WritingTeaching> = {
  "about-me": {
    "intro": "در معرفی خود، اطلاعات را از ساده به شخصی‌تر مرتب کن: نام، سن یا پایه، علاقه‌ها و در پایان یک ویژگی. برای هر ایده یک جملهٔ کوتاه بنویس؛ لازم نیست جمله‌ها پیچیده باشند.",
    "steps": [
      {
        "title": "۱. معرفی",
        "detail": "My name is … نام را روشن معرفی می‌کند."
      },
      {
        "title": "۲. اطلاعات پایه",
        "detail": "از I am برای سن یا پایه استفاده کن: I am thirteen. / I am in grade seven."
      },
      {
        "title": "۳. علاقه و ویژگی",
        "detail": "برای علاقه از I like + اسم یا فعل ing استفاده کن؛ برای ویژگی از I am + صفت."
      }
    ],
    "frames": [
      {
        "en": "My name is Sara.",
        "fa": "نام من سارا است.",
        "note": "شروع معرفی"
      },
      {
        "en": "I am in grade seven.",
        "fa": "من در پایهٔ هفتم هستم.",
        "note": "اطلاعات شخصی"
      },
      {
        "en": "I like reading because it is fun.",
        "fa": "کتاب‌خواندن را دوست دارم چون سرگرم‌کننده است.",
        "note": "علاقه همراه با دلیل"
      }
    ],
    "connectors": [
      {
        "en": "and",
        "fa": "و؛ برای افزودن علاقه یا ویژگی"
      },
      {
        "en": "because",
        "fa": "چون؛ برای توضیح دلیل"
      }
    ],
    "mistakes": [
      {
        "wrong": "I is thirteen.",
        "right": "I am thirteen.",
        "reason": "با فاعل I از am استفاده می‌شود."
      },
      {
        "wrong": "i like music",
        "right": "I like music.",
        "reason": "I همیشه با حرف بزرگ نوشته می‌شود و پایان جمله نقطه می‌گیرد."
      }
    ]
  },
  "my-family": {
    "intro": "برای معرفی خانواده، اول اندازه یا ترکیب خانواده را بگو، سپس ۲ یا ۳ عضو را معرفی کن و در پایان از یک کار مشترک بنویس. واژهٔ my نشان می‌دهد که فرد یا چیزی متعلق به توست.",
    "steps": [
      {
        "title": "۱. شروع کلی",
        "detail": "با My family … یا I have … جملهٔ آغازین بساز."
      },
      {
        "title": "۲. معرفی اعضا",
        "detail": "از my mother, my father, my sister و my brother استفاده کن."
      },
      {
        "title": "۳. فعالیت مشترک",
        "detail": "برای عادت خانوادگی از زمان حال ساده استفاده کن: We eat dinner together."
      }
    ],
    "frames": [
      {
        "en": "My family is small.",
        "fa": "خانوادهٔ من کوچک است.",
        "note": "جملهٔ معرفی"
      },
      {
        "en": "My sister is kind and helpful.",
        "fa": "خواهرم مهربان و کمک‌کننده است.",
        "note": "توصیف عضو خانواده"
      },
      {
        "en": "We watch films together.",
        "fa": "ما با هم فیلم تماشا می‌کنیم.",
        "note": "فعالیت مشترک"
      }
    ],
    "connectors": [
      {
        "en": "and",
        "fa": "برای کنار هم آوردن دو ویژگی"
      },
      {
        "en": "together",
        "fa": "برای کاری که با هم انجام می‌شود"
      }
    ],
    "mistakes": [
      {
        "wrong": "My mother are kind.",
        "right": "My mother is kind.",
        "reason": "فاعل مفرد با is می‌آید."
      },
      {
        "wrong": "I have a sister. She name is Mina.",
        "right": "I have a sister. Her name is Mina.",
        "reason": "برای مالکیت در این جمله از her استفاده کن."
      }
    ]
  },
  "my-school-day": {
    "intro": "متن دربارهٔ روز مدرسه باید مانند یک خط زمانی پیش برود. خواننده باید بداند اول، بعد و در پایان چه اتفاقی می‌افتد. برای کارهای معمول از زمان حال ساده استفاده کن.",
    "steps": [
      {
        "title": "۱. صبح",
        "detail": "از I get up … یا In the morning … شروع کن."
      },
      {
        "title": "۲. ادامهٔ روز",
        "detail": "کارها را با then و after school مرتب کن."
      },
      {
        "title": "۳. پایان",
        "detail": "در جملهٔ آخر تکلیف، استراحت یا آماده‌شدن برای فردا را بیاور."
      }
    ],
    "frames": [
      {
        "en": "I get up at seven.",
        "fa": "من ساعت هفت بیدار می‌شوم.",
        "note": "شروع زمان‌بندی"
      },
      {
        "en": "Then I have breakfast.",
        "fa": "بعد صبحانه می‌خورم.",
        "note": "رویداد بعدی"
      },
      {
        "en": "After school, I do my homework.",
        "fa": "بعد از مدرسه تکالیفم را انجام می‌دهم.",
        "note": "بخش پایانی روز"
      }
    ],
    "connectors": [
      {
        "en": "then",
        "fa": "سپس"
      },
      {
        "en": "after school",
        "fa": "بعد از مدرسه"
      },
      {
        "en": "finally",
        "fa": "در پایان"
      }
    ],
    "mistakes": [
      {
        "wrong": "I goes to school.",
        "right": "I go to school.",
        "reason": "پس از I فعل بدون s می‌آید."
      },
      {
        "wrong": "I do my homework, then I play.",
        "right": "I do my homework. Then I play.",
        "reason": "دو جملهٔ کامل را بهتر است با نقطه جدا کنی یا پیوند درست به کار ببری."
      }
    ]
  },
  "my-best-friend": {
    "intro": "توصیف خوب فقط فهرستی از صفت‌ها نیست. دوستت را معرفی کن، دو ویژگی بگو، برای یکی از ویژگی‌ها نمونه‌ای از رفتار او بیاور و در پایان دلیل اهمیت دوستی را توضیح بده.",
    "steps": [
      {
        "title": "۱. معرفی",
        "detail": "جملهٔ اول باید بگوید دوستت کیست."
      },
      {
        "title": "۲. ویژگی همراه با شاهد",
        "detail": "صفت را با رفتاری پشتیبانی کن؛ مثلاً He is helpful. He helps me with homework."
      },
      {
        "title": "۳. دلیل",
        "detail": "از because برای توضیح دلیل علاقه یا قدردانی استفاده کن."
      }
    ],
    "frames": [
      {
        "en": "My best friend is Amir.",
        "fa": "بهترین دوست من امیر است.",
        "note": "معرفی"
      },
      {
        "en": "He is funny and helpful.",
        "fa": "او شوخ‌طبع و کمک‌کننده است.",
        "note": "دو ویژگی"
      },
      {
        "en": "I like him because he helps me.",
        "fa": "او را دوست دارم چون به من کمک می‌کند.",
        "note": "نظر و دلیل"
      }
    ],
    "connectors": [
      {
        "en": "also",
        "fa": "همچنین"
      },
      {
        "en": "because",
        "fa": "چون"
      },
      {
        "en": "for example",
        "fa": "برای مثال"
      }
    ],
    "mistakes": [
      {
        "wrong": "He are friendly.",
        "right": "He is friendly.",
        "reason": "برای he از is استفاده می‌کنیم."
      },
      {
        "wrong": "She is kind. Because she helps me.",
        "right": "She is kind because she helps me.",
        "reason": "because معمولاً دلیل را به جملهٔ اصلی وصل می‌کند."
      }
    ]
  },
  "favorite-food": {
    "intro": "وقتی دربارهٔ غذای محبوب می‌نویسی، فقط نام غذا را نگو. متن را با نام غذا شروع کن، سپس طعم یا مواد آن را توضیح بده و در پایان دلیل علاقه‌ات را بنویس.",
    "steps": [
      {
        "title": "۱. نام غذا",
        "detail": "از My favorite food is … استفاده کن."
      },
      {
        "title": "۲. توصیف",
        "detail": "برای طعم از delicious, sweet, spicy یا fresh استفاده کن."
      },
      {
        "title": "۳. دلیل",
        "detail": "با because دلیل علاقه‌ات را کامل کن."
      }
    ],
    "frames": [
      {
        "en": "My favorite food is pizza.",
        "fa": "غذای مورد علاقهٔ من پیتزا است.",
        "note": "موضوع اصلی"
      },
      {
        "en": "It is hot and delicious.",
        "fa": "داغ و خوشمزه است.",
        "note": "توصیف"
      },
      {
        "en": "I like it because I can share it with my family.",
        "fa": "آن را دوست دارم چون می‌توانم با خانواده‌ام تقسیمش کنم.",
        "note": "دلیل"
      }
    ],
    "connectors": [
      {
        "en": "because",
        "fa": "برای دلیل"
      },
      {
        "en": "and",
        "fa": "برای افزودن ویژگی"
      },
      {
        "en": "usually",
        "fa": "برای عادت"
      }
    ],
    "mistakes": [
      {
        "wrong": "My favorite food are rice.",
        "right": "My favorite food is rice.",
        "reason": "عبارت food در این جمله مفرد است."
      },
      {
        "wrong": "It delicious.",
        "right": "It is delicious.",
        "reason": "جملهٔ توصیفی به فعل be نیاز دارد."
      }
    ]
  },
  "my-room": {
    "intro": "برای توصیف اتاق از نمای کلی به جزئیات برو: اول فضای اتاق را معرفی کن، سپس وسایل را با There is/There are نام ببر و محل آن‌ها را با حروف اضافه توضیح بده.",
    "steps": [
      {
        "title": "۱. نمای کلی",
        "detail": "از My room is … برای اندازه یا حس اتاق استفاده کن."
      },
      {
        "title": "۲. وسایل",
        "detail": "There is برای یک چیز و There are برای چند چیز است."
      },
      {
        "title": "۳. مکان وسایل",
        "detail": "in یعنی داخل، on یعنی روی، near یعنی نزدیک و next to یعنی کنار."
      }
    ],
    "frames": [
      {
        "en": "There is a desk near the window.",
        "fa": "یک میز نزدیک پنجره وجود دارد.",
        "note": "یک وسیله"
      },
      {
        "en": "There are two books on the shelf.",
        "fa": "دو کتاب روی قفسه هستند.",
        "note": "چند وسیله"
      },
      {
        "en": "My room is small but comfortable.",
        "fa": "اتاقم کوچک اما راحت است.",
        "note": "توصیف کلی"
      }
    ],
    "connectors": [
      {
        "en": "and",
        "fa": "و"
      },
      {
        "en": "but",
        "fa": "اما؛ برای نشان‌دادن تفاوت"
      },
      {
        "en": "next to",
        "fa": "در کنار"
      }
    ],
    "mistakes": [
      {
        "wrong": "There are a bed.",
        "right": "There is a bed.",
        "reason": "برای اسم مفرد از There is استفاده کن."
      },
      {
        "wrong": "The books are in the table.",
        "right": "The books are on the table.",
        "reason": "برای چیزی روی سطح میز معمولاً on به‌کار می‌رود."
      }
    ]
  },
  "a-pet-i-like": {
    "intro": "برای توصیف حیوان از سه بخش استفاده کن: معرفی حیوان، ظاهر یا ویژگی‌هایش، و رفتار یا دلیل علاقهٔ تو. می‌توانی از has برای ویژگی‌های ظاهری و can برای توانایی استفاده کنی.",
    "steps": [
      {
        "title": "۱. معرفی",
        "detail": "نام حیوان را در جملهٔ اول بیاور."
      },
      {
        "title": "۲. ظاهر و رفتار",
        "detail": "برای ظاهر از has و برای توانایی از can استفاده کن."
      },
      {
        "title": "۳. نظر",
        "detail": "در جملهٔ آخر با I like … because … دلیل علاقه‌ات را بگو."
      }
    ],
    "frames": [
      {
        "en": "I like cats.",
        "fa": "من گربه‌ها را دوست دارم.",
        "note": "معرفی علاقه"
      },
      {
        "en": "A cat has soft fur.",
        "fa": "گربه خز نرمی دارد.",
        "note": "ویژگی ظاهری"
      },
      {
        "en": "It can run and climb.",
        "fa": "می‌تواند بدود و از جاها بالا برود.",
        "note": "توانایی"
      }
    ],
    "connectors": [
      {
        "en": "also",
        "fa": "همچنین"
      },
      {
        "en": "because",
        "fa": "چون"
      },
      {
        "en": "for example",
        "fa": "برای مثال"
      }
    ],
    "mistakes": [
      {
        "wrong": "A dog have four legs.",
        "right": "A dog has four legs.",
        "reason": "با فاعل مفرد از has استفاده کن."
      },
      {
        "wrong": "It can runs fast.",
        "right": "It can run fast.",
        "reason": "بعد از can، شکل سادهٔ فعل می‌آید."
      }
    ]
  },
  "my-weekend": {
    "intro": "برای نوشتن دربارهٔ آخر هفته، زمان را مشخص کن و فعالیت‌ها را به ترتیب صبح، بعدازظهر و عصر بیاور. از حال ساده برای عادت‌ها و عبارت‌های زمانی برای مرتب‌کردن متن استفاده کن.",
    "steps": [
      {
        "title": "۱. زمان",
        "detail": "جمله را با On Fridays, At weekends یا On Saturday شروع کن."
      },
      {
        "title": "۲. ترتیب",
        "detail": "برای تغییر زمان از in the morning و in the evening استفاده کن."
      },
      {
        "title": "۳. پایان",
        "detail": "بگو کدام فعالیت را بیشتر دوست داری و چرا."
      }
    ],
    "frames": [
      {
        "en": "On Fridays, I visit my grandparents.",
        "fa": "جمعه‌ها به دیدن پدربزرگ و مادربزرگم می‌روم.",
        "note": "مشخص‌کردن زمان"
      },
      {
        "en": "In the afternoon, I play football.",
        "fa": "بعدازظهر فوتبال بازی می‌کنم.",
        "note": "فعالیت بعدی"
      },
      {
        "en": "I enjoy the weekend because I can relax.",
        "fa": "از آخر هفته لذت می‌برم چون می‌توانم استراحت کنم.",
        "note": "جمع‌بندی"
      }
    ],
    "connectors": [
      {
        "en": "in the morning",
        "fa": "صبح"
      },
      {
        "en": "after that",
        "fa": "پس از آن"
      },
      {
        "en": "in the evening",
        "fa": "عصر"
      }
    ],
    "mistakes": [
      {
        "wrong": "At Friday, I play…",
        "right": "On Friday, I play…",
        "reason": "برای روزهای هفته از on استفاده کن."
      },
      {
        "wrong": "I am play football.",
        "right": "I play football.",
        "reason": "برای عادت‌ها از فعل اصلی استفاده کن؛ am را بی‌دلیل اضافه نکن."
      }
    ]
  },
  "simple-invitation": {
    "intro": "دعوت کوتاه باید دوستانه، روشن و کامل باشد. مخاطب را سلام کن، فعالیت را پیشنهاد بده، زمان و مکان را بنویس و در آخر از او بخواه پاسخ بدهد.",
    "steps": [
      {
        "title": "۱. سلام",
        "detail": "از Hi + نام دوست استفاده کن."
      },
      {
        "title": "۲. اطلاعات اصلی",
        "detail": "چه کاری، چه زمانی و کجا؟ هر سه مورد باید روشن باشند."
      },
      {
        "title": "۳. درخواست پاسخ",
        "detail": "از Let me know یا Can you come? استفاده کن و نامت را پایان پیام بیاور."
      }
    ],
    "frames": [
      {
        "en": "Would you like to play football?",
        "fa": "دوست داری فوتبال بازی کنیم؟",
        "note": "دعوت مودبانه"
      },
      {
        "en": "Let’s meet at the park at four.",
        "fa": "ساعت چهار در پارک همدیگر را ببینیم.",
        "note": "زمان و مکان"
      },
      {
        "en": "Please tell me if you can come.",
        "fa": "لطفاً بگو می‌توانی بیایی یا نه.",
        "note": "درخواست پاسخ"
      }
    ],
    "connectors": [
      {
        "en": "Would you like to…?",
        "fa": "برای دعوت مودبانه"
      },
      {
        "en": "Let’s…",
        "fa": "برای پیشنهاد با هم"
      },
      {
        "en": "See you soon",
        "fa": "برای پایان دوستانه"
      }
    ],
    "mistakes": [
      {
        "wrong": "Would you like play?",
        "right": "Would you like to play?",
        "reason": "پس از would like از to + فعل استفاده کن."
      },
      {
        "wrong": "Hi Ali, would you like to come.",
        "right": "Hi Ali, would you like to come?",
        "reason": "پرسش دعوت را با علامت سؤال تمام کن."
      }
    ]
  },
  "daily-routine": {
    "intro": "پاراگراف دربارهٔ برنامهٔ روزانه باید یک موضوع اصلی داشته باشد. جملهٔ اول عادت کلی را معرفی می‌کند، جمله‌های میانی کارها را با ترتیب زمانی توضیح می‌دهند و جملهٔ آخر جمع‌بندی می‌کند.",
    "steps": [
      {
        "title": "۱. جملهٔ موضوعی",
        "detail": "My daily routine is … یا I usually … می‌تواند شروع خوبی باشد."
      },
      {
        "title": "۲. جزئیات مرتب",
        "detail": "از زمان‌های صبح و شب و قیدهای تکرار استفاده کن."
      },
      {
        "title": "۳. جمع‌بندی",
        "detail": "توضیح بده این برنامه چه کمکی به تو می‌کند."
      }
    ],
    "frames": [
      {
        "en": "I usually get up at seven.",
        "fa": "معمولاً ساعت هفت بیدار می‌شوم.",
        "note": "عادت با usually"
      },
      {
        "en": "After breakfast, I go to school.",
        "fa": "بعد از صبحانه به مدرسه می‌روم.",
        "note": "ترتیب زمانی"
      },
      {
        "en": "This routine helps me stay organized.",
        "fa": "این برنامه کمک می‌کند منظم بمانم.",
        "note": "جملهٔ پایانی"
      }
    ],
    "connectors": [
      {
        "en": "usually / often",
        "fa": "برای بیان تکرار"
      },
      {
        "en": "after that",
        "fa": "پس از آن"
      },
      {
        "en": "finally",
        "fa": "در پایان"
      }
    ],
    "mistakes": [
      {
        "wrong": "I usually am get up early.",
        "right": "I usually get up early.",
        "reason": "قید usually پیش از فعل اصلی می‌آید؛ am لازم نیست."
      },
      {
        "wrong": "He go to school every day.",
        "right": "He goes to school every day.",
        "reason": "در زمان حال ساده، برای he/she/it معمولاً به فعل s/es اضافه می‌شود."
      }
    ]
  },
  "describe-a-person": {
    "intro": "در توصیف یک شخص، صفت‌ها را با مثال پشتیبانی کن. تنها نوشتن kind یا helpful کافی نیست؛ یک رفتار نشان بده که این ویژگی را ثابت می‌کند.",
    "steps": [
      {
        "title": "۱. معرفی شخص",
        "detail": "در جملهٔ اول نام یا نسبت فرد را مشخص کن."
      },
      {
        "title": "۲. ظاهر و شخصیت",
        "detail": "صفت‌های ظاهری و شخصیتی را از هم جدا کن."
      },
      {
        "title": "۳. شاهد و اهمیت",
        "detail": "با For example یک رفتار واقعی بیاور و در پایان بگو چرا فرد مهم است."
      }
    ],
    "frames": [
      {
        "en": "My aunt is a patient person.",
        "fa": "عمه/خالهٔ من فرد صبوری است.",
        "note": "ویژگی شخصیتی"
      },
      {
        "en": "For example, she listens carefully.",
        "fa": "برای مثال، با دقت گوش می‌دهد.",
        "note": "شاهد برای ویژگی"
      },
      {
        "en": "I admire her because she helps others.",
        "fa": "او را تحسین می‌کنم چون به دیگران کمک می‌کند.",
        "note": "نظر همراه دلیل"
      }
    ],
    "connectors": [
      {
        "en": "for example",
        "fa": "برای نمونه"
      },
      {
        "en": "also",
        "fa": "همچنین"
      },
      {
        "en": "because",
        "fa": "چون"
      }
    ],
    "mistakes": [
      {
        "wrong": "She very patient.",
        "right": "She is very patient.",
        "reason": "صفت معمولاً با شکل مناسب فعل be می‌آید."
      },
      {
        "wrong": "He is helpful. He is kind. He is funny.",
        "right": "He is helpful, kind, and funny.",
        "reason": "برای جلوگیری از تکرار می‌توان ویژگی‌ها را در یک جملهٔ درست فهرست کرد."
      }
    ]
  },
  "memorable-day": {
    "intro": "روایت یک روز به‌یادماندنی باید خواننده را از زمان و مکان به رویدادهای اصلی برساند. چون دربارهٔ گذشته می‌نویسی، فعل‌ها را در گذشته نگه دار و در پایان احساس یا درس آن روز را بیان کن.",
    "steps": [
      {
        "title": "۱. زمینه",
        "detail": "بگو چه زمانی و کجا بود."
      },
      {
        "title": "۲. رویدادها",
        "detail": "با first، then و later اتفاق‌ها را مرتب کن."
      },
      {
        "title": "۳. پایان و احساس",
        "detail": "از finally برای پایان و از I felt … برای احساس خود استفاده کن."
      }
    ],
    "frames": [
      {
        "en": "Last summer, I visited my cousin.",
        "fa": "تابستان گذشته به دیدن پسرعمو/دخترعمویم رفتم.",
        "note": "زمان و رویداد گذشته"
      },
      {
        "en": "Then we went to the beach.",
        "fa": "بعد به ساحل رفتیم.",
        "note": "رویداد بعدی"
      },
      {
        "en": "I felt happy because we spent time together.",
        "fa": "خوشحال بودم چون با هم وقت گذراندیم.",
        "note": "احساس و دلیل"
      }
    ],
    "connectors": [
      {
        "en": "first",
        "fa": "اول"
      },
      {
        "en": "then / later",
        "fa": "بعد / بعدتر"
      },
      {
        "en": "finally",
        "fa": "سرانجام"
      }
    ],
    "mistakes": [
      {
        "wrong": "Yesterday I go to the park.",
        "right": "Yesterday I went to the park.",
        "reason": "برای اتفاق تمام‌شدهٔ گذشته از شکل گذشتهٔ فعل استفاده کن."
      },
      {
        "wrong": "We was happy.",
        "right": "We were happy.",
        "reason": "با we از were استفاده می‌شود."
      }
    ]
  },
  "favorite-book": {
    "intro": "معرفی کتاب فقط گفتن نام آن نیست. ابتدا عنوان و نوع کتاب را معرفی کن، سپس یک خلاصهٔ کوتاه بدون افشای پایان داستان بنویس، بعد نظر و دلیل خودت را بگو و در نهایت مخاطب مناسب را پیشنهاد بده.",
    "steps": [
      {
        "title": "۱. معرفی کتاب",
        "detail": "عنوان را در گیومه یا با حروف بزرگ روشن بنویس."
      },
      {
        "title": "۲. خلاصهٔ کوتاه",
        "detail": "دربارهٔ موضوع و شخصیت اصلی بنویس؛ پایان را لو نده."
      },
      {
        "title": "۳. ارزیابی",
        "detail": "از I recommend … because … برای توصیه و دلیل استفاده کن."
      }
    ],
    "frames": [
      {
        "en": "My favorite book is “Wonder.”",
        "fa": "کتاب مورد علاقهٔ من «Wonder» است.",
        "note": "عنوان"
      },
      {
        "en": "It tells the story of a boy at school.",
        "fa": "داستان پسری در مدرسه را روایت می‌کند.",
        "note": "خلاصه"
      },
      {
        "en": "I recommend it because it teaches kindness.",
        "fa": "آن را پیشنهاد می‌کنم چون مهربانی را یاد می‌دهد.",
        "note": "نظر و دلیل"
      }
    ],
    "connectors": [
      {
        "en": "the story is about",
        "fa": "داستان دربارهٔ ... است"
      },
      {
        "en": "however",
        "fa": "با این حال"
      },
      {
        "en": "I recommend it because",
        "fa": "پیشنهادش می‌کنم چون"
      }
    ],
    "mistakes": [
      {
        "wrong": "I recommend this book because interesting.",
        "right": "I recommend this book because it is interesting.",
        "reason": "بخش دلیل باید جملهٔ کامل داشته باشد."
      },
      {
        "wrong": "The book talk about…",
        "right": "The book talks about…",
        "reason": "book مفرد است؛ در حال ساده talk به talks تبدیل می‌شود."
      }
    ]
  },
  "healthy-habits": {
    "intro": "متن توصیه‌ای باید توصیه‌های مشخص و قابل انجام داشته باشد و هر توصیه را با فایده‌ای توضیح دهد. از فعل should برای پیشنهاد استفاده کن؛ برای نظم مراحل می‌توانی first، next و finally بیاوری.",
    "steps": [
      {
        "title": "۱. موضوع کلی",
        "detail": "در جملهٔ اول بگو عادت سالم چرا مهم است."
      },
      {
        "title": "۲. توصیه و فایده",
        "detail": "هر توصیه را با should شروع کن و فایده‌اش را توضیح بده."
      },
      {
        "title": "۳. جمع‌بندی",
        "detail": "یک پیشنهاد واقع‌بینانه برای شروع ارائه بده."
      }
    ],
    "frames": [
      {
        "en": "You should drink enough water.",
        "fa": "باید آب کافی بنوشی.",
        "note": "توصیه با should"
      },
      {
        "en": "Regular exercise helps you stay healthy.",
        "fa": "ورزش منظم کمک می‌کند سالم بمانی.",
        "note": "بیان فایده"
      },
      {
        "en": "Finally, choose one habit to practise every day.",
        "fa": "در پایان، یک عادت را برای تمرین روزانه انتخاب کن.",
        "note": "جمع‌بندی عملی"
      }
    ],
    "connectors": [
      {
        "en": "first / next / finally",
        "fa": "برای ترتیب"
      },
      {
        "en": "because",
        "fa": "برای دلیل"
      },
      {
        "en": "for example",
        "fa": "برای مثال"
      }
    ],
    "mistakes": [
      {
        "wrong": "You should to sleep early.",
        "right": "You should sleep early.",
        "reason": "پس از should فعل ساده می‌آید، بدون to."
      },
      {
        "wrong": "Exercise are important.",
        "right": "Exercise is important.",
        "reason": "در این معنی، exercise به‌عنوان فعالیت کلی مفرد است."
      }
    ]
  },
  "giving-directions": {
    "intro": "راهنمای مسیر باید مخاطب را از نقطهٔ شروع به مقصد برساند. نام مقصد و نقطهٔ شروع را بگو، سپس دستورها را به ترتیب با فعل امری بیاور و از نشانه‌های مکانی برای رفع ابهام استفاده کن.",
    "steps": [
      {
        "title": "۱. نقطهٔ شروع",
        "detail": "از Start at … یا From the school … استفاده کن."
      },
      {
        "title": "۲. دستور مرحله‌ای",
        "detail": "Go straight, Turn left و Cross the street فعل‌های امری‌اند؛ فاعل you معمولاً حذف می‌شود."
      },
      {
        "title": "۳. نشانهٔ مکانی",
        "detail": "از next to، opposite و between برای مشخص‌کردن جای مقصد استفاده کن."
      }
    ],
    "frames": [
      {
        "en": "Go straight for two blocks.",
        "fa": "دو خیابان مستقیم برو.",
        "note": "دستور اول"
      },
      {
        "en": "Turn left at the bank.",
        "fa": "کنار بانک به چپ بپیچ.",
        "note": "تغییر مسیر"
      },
      {
        "en": "The library is opposite the park.",
        "fa": "کتابخانه روبه‌روی پارک است.",
        "note": "مکان مقصد"
      }
    ],
    "connectors": [
      {
        "en": "then",
        "fa": "سپس"
      },
      {
        "en": "at the corner",
        "fa": "در گوشهٔ خیابان"
      },
      {
        "en": "next to / opposite",
        "fa": "کنار / روبه‌روی"
      }
    ],
    "mistakes": [
      {
        "wrong": "You goes straight.",
        "right": "Go straight.",
        "reason": "در دستور مستقیم از شکل سادهٔ فعل استفاده کن."
      },
      {
        "wrong": "The library is next the bank.",
        "right": "The library is next to the bank.",
        "reason": "عبارت درست next to است."
      }
    ]
  },
  "protect-environment": {
    "intro": "متن مسئله و راهکار با یک مشکل روشن آغاز می‌شود. سپس چند اقدام عملی برای کاهش آن پیشنهاد می‌شود و در پایان توضیح می‌دهی چرا انجام این کارها اثرگذار است.",
    "steps": [
      {
        "title": "۱. بیان مشکل",
        "detail": "مشکل را دقیق و در یک جمله معرفی کن؛ مثلاً plastic waste."
      },
      {
        "title": "۲. راهکارهای عملی",
        "detail": "از can یا should برای اقدام‌های قابل انجام استفاده کن."
      },
      {
        "title": "۳. نتیجه",
        "detail": "بگو اگر افراد این کارها را انجام دهند چه تغییری ممکن است رخ دهد."
      }
    ],
    "frames": [
      {
        "en": "Plastic waste harms the environment.",
        "fa": "زباله‌های پلاستیکی به محیط زیست آسیب می‌زنند.",
        "note": "بیان مشکل"
      },
      {
        "en": "We can reuse bags and recycle bottles.",
        "fa": "می‌توانیم کیسه‌ها را دوباره استفاده کنیم و بطری‌ها را بازیافت کنیم.",
        "note": "راهکار"
      },
      {
        "en": "If we work together, our streets can be cleaner.",
        "fa": "اگر با هم همکاری کنیم، خیابان‌ها می‌توانند تمیزتر باشند.",
        "note": "اثر راهکار"
      }
    ],
    "connectors": [
      {
        "en": "one solution is",
        "fa": "یک راهکار این است که"
      },
      {
        "en": "also",
        "fa": "همچنین"
      },
      {
        "en": "as a result",
        "fa": "در نتیجه"
      }
    ],
    "mistakes": [
      {
        "wrong": "We can to recycle paper.",
        "right": "We can recycle paper.",
        "reason": "پس از can فعل ساده می‌آید."
      },
      {
        "wrong": "People should recycles bottles.",
        "right": "People should recycle bottles.",
        "reason": "بعد از should شکل سادهٔ فعل می‌آید."
      }
    ]
  },
  "email-to-friend": {
    "intro": "ایمیل دوستانه هم قالب مشخصی دارد: موضوع کوتاه، سلام، هدف اصلی، جزئیات لازم، سؤال یا درخواست پاسخ و پایان دوستانه. لحن ایمیل می‌تواند صمیمی باشد اما اطلاعات باید روشن بماند.",
    "steps": [
      {
        "title": "۱. Subject",
        "detail": "موضوع را در چند کلمه بیان کن، نه در یک پاراگراف."
      },
      {
        "title": "۲. بدنه",
        "detail": "در جمله‌های کوتاه توضیح بده چرا ایمیل می‌نویسی و مخاطب چه کاری باید بداند."
      },
      {
        "title": "۳. پایان",
        "detail": "سؤال کوتاه بپرس و با Best wishes یا See you، سپس نام خودت، پایان بده."
      }
    ],
    "frames": [
      {
        "en": "Subject: Saturday plans",
        "fa": "موضوع: برنامه‌های شنبه",
        "note": "خط موضوع"
      },
      {
        "en": "Hi Sara, I am writing to invite you…",
        "fa": "سلام سارا، برای دعوت‌کردنت می‌نویسم…",
        "note": "شروع دوستانه"
      },
      {
        "en": "Please write back soon.",
        "fa": "لطفاً زود جواب بده.",
        "note": "درخواست پاسخ"
      }
    ],
    "connectors": [
      {
        "en": "Hi / Dear",
        "fa": "شروع خطاب"
      },
      {
        "en": "I am writing to…",
        "fa": "بیان هدف ایمیل"
      },
      {
        "en": "Best wishes",
        "fa": "پایان دوستانه"
      }
    ],
    "mistakes": [
      {
        "wrong": "Subject: Hi, how are you?",
        "right": "Subject: Saturday plans",
        "reason": "موضوع باید خلاصهٔ موضوع اصلی ایمیل باشد."
      },
      {
        "wrong": "Dear Sara.",
        "right": "Dear Sara,",
        "reason": "پس از خطاب ایمیل معمولاً ویرگول می‌آید."
      }
    ]
  },
  "make-a-sandwich": {
    "intro": "دستور تهیهٔ غذا باید آن‌قدر روشن باشد که فرد دیگری بتواند دقیقاً همان کار را انجام دهد. مواد لازم را معرفی کن و مراحل را به ترتیب بنویس. هر مرحله را با یک فعل عملی شروع کن.",
    "steps": [
      {
        "title": "۱. معرفی",
        "detail": "در آغاز بگو چه چیزی تهیه می‌کنی و مواد اصلی چیست."
      },
      {
        "title": "۲. ترتیب مراحل",
        "detail": "از first، next، then و finally برای ترتیب استفاده کن."
      },
      {
        "title": "۳. دستور روشن",
        "detail": "از فعل‌های امری مثل cut، add، put و serve استفاده کن و یک نکتهٔ بهداشتی اضافه کن."
      }
    ],
    "frames": [
      {
        "en": "First, wash your hands.",
        "fa": "اول دست‌هایت را بشوی.",
        "note": "آماده‌سازی ایمن"
      },
      {
        "en": "Next, put cheese on the bread.",
        "fa": "سپس پنیر را روی نان بگذار.",
        "note": "مرحلهٔ ساخت"
      },
      {
        "en": "Finally, cut the sandwich in half.",
        "fa": "در پایان ساندویچ را از وسط نصف کن.",
        "note": "آخرین مرحله"
      }
    ],
    "connectors": [
      {
        "en": "first / next / then / finally",
        "fa": "واژه‌های ترتیب"
      },
      {
        "en": "carefully",
        "fa": "با دقت"
      },
      {
        "en": "before",
        "fa": "پیش از"
      }
    ],
    "mistakes": [
      {
        "wrong": "First, you are cut the bread.",
        "right": "First, cut the bread.",
        "reason": "در دستور آشپزی فعل امری ساده به‌کار ببر."
      },
      {
        "wrong": "Then add a tomato. Finally add cheese.",
        "right": "Then add a tomato. Finally, add cheese.",
        "reason": "پس از واژهٔ آغازگر مرحله معمولاً ویرگول می‌آید."
      }
    ]
  },
  "opinion-paragraph": {
    "intro": "پاراگراف نظری باید ادعای اصلی مشخص، دلیل‌های قابل فهم، یک مثال یا توضیح و نتیجه‌گیری داشته باشد. مثال‌ها باید از نظر تو پشتیبانی کنند و نتیجه‌گیری نباید موضوع کاملاً تازه‌ای معرفی کند.",
    "steps": [
      {
        "title": "۱. نظر روشن",
        "detail": "در جملهٔ اول موضع خودت را مستقیم بیان کن."
      },
      {
        "title": "۲. دلیل و شاهد",
        "detail": "برای هر دلیل، توضیح یا مثال بده؛ تنها فهرست‌کردن دلیل‌ها کافی نیست."
      },
      {
        "title": "۳. نتیجه",
        "detail": "با In conclusion نظر اصلی را خلاصه کن و از اضافه‌کردن ادعای جدید خودداری کن."
      }
    ],
    "frames": [
      {
        "en": "I believe school libraries are important.",
        "fa": "به نظر من کتابخانه‌های مدرسه مهم هستند.",
        "note": "بیان نظر"
      },
      {
        "en": "For example, students can find reliable information there.",
        "fa": "برای مثال، دانش‌آموزان می‌توانند آنجا اطلاعات قابل اعتماد پیدا کنند.",
        "note": "مثال پشتیبان"
      },
      {
        "en": "In conclusion, libraries support learning.",
        "fa": "در نتیجه، کتابخانه‌ها از یادگیری پشتیبانی می‌کنند.",
        "note": "جمع‌بندی"
      }
    ],
    "connectors": [
      {
        "en": "firstly / secondly",
        "fa": "نخست / دوم"
      },
      {
        "en": "for example",
        "fa": "برای مثال"
      },
      {
        "en": "although / however",
        "fa": "اگرچه / با این حال"
      },
      {
        "en": "in conclusion",
        "fa": "در نتیجه"
      }
    ],
    "mistakes": [
      {
        "wrong": "I think school rules is important.",
        "right": "I think school rules are important.",
        "reason": "rules جمع است و فعل are می‌گیرد."
      },
      {
        "wrong": "There are many reasons. In conclusion, phones…",
        "right": "In conclusion, phones should be used responsibly.",
        "reason": "جمع‌بندی باید به همان نظر اصلی برگردد و جملهٔ کامل داشته باشد."
      }
    ]
  },
  "compare-two-places": {
    "intro": "مقایسهٔ منصفانه یعنی هر دو مکان را بر اساس معیارهای مشابه بررسی کنی؛ مثل هزینه، آرامش، دسترسی یا امکانات. صفت‌های مقایسه‌ای و عبارت‌های نشان‌دهندهٔ تفاوت به خواننده کمک می‌کنند.",
    "steps": [
      {
        "title": "۱. معرفی دو مکان",
        "detail": "در آغاز هر دو مکان را نام ببر و بگو چه چیزی را مقایسه می‌کنی."
      },
      {
        "title": "۲. معیار یکسان",
        "detail": "مثلاً دربارهٔ حمل‌ونقل هر دو مکان بنویس، سپس دربارهٔ هزینهٔ هر دو."
      },
      {
        "title": "۳. نتیجهٔ انتخاب",
        "detail": "در پایان بگو کدام را ترجیح می‌دهی و دلیل اصلی چیست."
      }
    ],
    "frames": [
      {
        "en": "City A is busier than City B.",
        "fa": "شهر الف از شهر ب شلوغ‌تر است.",
        "note": "مقایسهٔ صفت کوتاه"
      },
      {
        "en": "In contrast, City B is more peaceful.",
        "fa": "در مقابل، شهر ب آرام‌تر است.",
        "note": "نشان‌دادن تفاوت"
      },
      {
        "en": "I prefer City B because it is quieter.",
        "fa": "شهر ب را ترجیح می‌دهم چون آرام‌تر است.",
        "note": "نتیجه با دلیل"
      }
    ],
    "connectors": [
      {
        "en": "both",
        "fa": "هر دو"
      },
      {
        "en": "in contrast / however",
        "fa": "در مقابل / با این حال"
      },
      {
        "en": "whereas",
        "fa": "درحالی‌که"
      },
      {
        "en": "than",
        "fa": "از؛ در ساخت مقایسه"
      }
    ],
    "mistakes": [
      {
        "wrong": "City A is more cheaper.",
        "right": "City A is cheaper.",
        "reason": "برای cheaper از more هم‌زمان استفاده نکن."
      },
      {
        "wrong": "City A has parks. City B is quiet.",
        "right": "City A has many parks, whereas City B is quieter.",
        "reason": "معیارهای مقایسه را موازی و روشن بیان کن."
      }
    ]
  },
  "formal-email": {
    "intro": "ایمیل رسمی باید کوتاه، مؤدبانه و هدفمند باشد. موضوع را دقیق بنویس، با خطاب رسمی شروع کن، درخواست را واضح و محترمانه مطرح کن و با تشکر و امضای مناسب پایان بده.",
    "steps": [
      {
        "title": "۱. عنوان و خطاب",
        "detail": "Subject باید درخواست را مشخص کند؛ در صورت ندانستن نام گیرنده از Dear Sir or Madam استفاده کن."
      },
      {
        "title": "۲. درخواست مودبانه",
        "detail": "Could you please…? یا I would like to ask about… از دستور مستقیم مؤدبانه‌تر است."
      },
      {
        "title": "۳. پایان رسمی",
        "detail": "از Thank you for your time و Kind regards استفاده کن و نامت را بنویس."
      }
    ],
    "frames": [
      {
        "en": "Subject: Information about the English course",
        "fa": "موضوع: اطلاعات دربارهٔ دورهٔ انگلیسی",
        "note": "عنوان مشخص"
      },
      {
        "en": "Could you please send me the schedule?",
        "fa": "ممکن است لطفاً برنامهٔ زمانی را برایم بفرستید؟",
        "note": "درخواست مودبانه"
      },
      {
        "en": "Thank you for your help. Kind regards, Mina",
        "fa": "از کمک شما سپاسگزارم. با احترام، مینا",
        "note": "پایان رسمی"
      }
    ],
    "connectors": [
      {
        "en": "I am writing to enquire about…",
        "fa": "برای پرس‌وجو دربارهٔ ... می‌نویسم"
      },
      {
        "en": "Could you please…?",
        "fa": "درخواست مودبانه"
      },
      {
        "en": "Kind regards",
        "fa": "با احترام"
      }
    ],
    "mistakes": [
      {
        "wrong": "Send me the information.",
        "right": "Could you please send me the information?",
        "reason": "در ایمیل رسمی درخواست را مؤدبانه مطرح کن."
      },
      {
        "wrong": "Hey teacher!",
        "right": "Dear Mr/Ms …,",
        "reason": "در آغاز ایمیل رسمی از خطاب متناسب با مخاطب استفاده کن."
      }
    ]
  },
  "short-story": {
    "intro": "داستان کوتاه به سه بخش نیاز دارد: آغاز و معرفی شخصیت/مکان، مشکل یا اتفاق غیرمنتظره، و پایانی که به آن اتفاق پاسخ می‌دهد. در روایت گذشته، زمان افعال را یکدست نگه دار.",
    "steps": [
      {
        "title": "۱. آغاز",
        "detail": "چه کسی، کجا و چه زمانی؟ همین اطلاعات برای شروع کافی است."
      },
      {
        "title": "۲. مشکل",
        "detail": "رویدادی بیاور که شخصیت مجبور شود کاری انجام دهد یا تصمیم بگیرد."
      },
      {
        "title": "۳. پایان غافلگیرکننده",
        "detail": "سرنخ‌های کوچک در داستان بگذار تا پایان جالب باشد، اما کاملاً بی‌ارتباط نباشد."
      }
    ],
    "frames": [
      {
        "en": "One rainy evening, Sara found a small box.",
        "fa": "یک عصر بارانی، سارا جعبهٔ کوچکی پیدا کرد.",
        "note": "معرفی فضا و اتفاق"
      },
      {
        "en": "Suddenly, she heard a sound inside.",
        "fa": "ناگهان صدایی از داخل شنید.",
        "note": "ایجاد تعلیق"
      },
      {
        "en": "When she opened it, a kitten jumped out.",
        "fa": "وقتی آن را باز کرد، بچه‌گربه‌ای بیرون پرید.",
        "note": "پایان غیرمنتظره"
      }
    ],
    "connectors": [
      {
        "en": "one day / one evening",
        "fa": "یک روز / یک عصر"
      },
      {
        "en": "suddenly",
        "fa": "ناگهان"
      },
      {
        "en": "a moment later",
        "fa": "لحظه‌ای بعد"
      },
      {
        "en": "in the end",
        "fa": "در پایان"
      }
    ],
    "mistakes": [
      {
        "wrong": "Yesterday, she find a box.",
        "right": "Yesterday, she found a box.",
        "reason": "در داستان گذشته از شکل گذشتهٔ فعل استفاده کن."
      },
      {
        "wrong": "Suddenly. The door opened.",
        "right": "Suddenly, the door opened.",
        "reason": "واژهٔ آغازگر جمله را با ویرگول به جمله وصل کن."
      }
    ]
  },
  "technology-pros-cons": {
    "intro": "در متن مزایا و چالش‌ها، نگاه متعادل مهم است. فقط از فناوری تعریف یا انتقاد نکن؛ یک مزیت، یک خطر یا محدودیت و نمونه‌ای برای هر دو بیاور، سپس پیشنهاد عملی بده.",
    "steps": [
      {
        "title": "۱. موضوع",
        "detail": "فناوری مورد نظر را مشخص کن؛ مثلاً phones at school."
      },
      {
        "title": "۲. دو سمت",
        "detail": "مزیت و چالش را جداگانه بیان کن و برای هر کدام مثال بزن."
      },
      {
        "title": "۳. نتیجه و پیشنهاد",
        "detail": "با however تفاوت را نشان بده و راه استفادهٔ مسئولانه را پیشنهاد کن."
      }
    ],
    "frames": [
      {
        "en": "Technology helps students find information quickly.",
        "fa": "فناوری به دانش‌آموزان کمک می‌کند سریع اطلاعات پیدا کنند.",
        "note": "مزیت"
      },
      {
        "en": "However, notifications can interrupt learning.",
        "fa": "با این حال، اعلان‌ها می‌توانند یادگیری را مختل کنند.",
        "note": "چالش"
      },
      {
        "en": "Students should use devices with clear limits.",
        "fa": "دانش‌آموزان باید دستگاه‌ها را با محدودیت‌های روشن استفاده کنند.",
        "note": "پیشنهاد"
      }
    ],
    "connectors": [
      {
        "en": "one benefit is",
        "fa": "یک مزیت این است که"
      },
      {
        "en": "however / on the other hand",
        "fa": "با این حال / از سوی دیگر"
      },
      {
        "en": "for this reason",
        "fa": "به این دلیل"
      }
    ],
    "mistakes": [
      {
        "wrong": "Technology have many benefits.",
        "right": "Technology has many benefits.",
        "reason": "technology به‌عنوان مفهوم کلی مفرد است."
      },
      {
        "wrong": "Phones are useful, but phones are distracting.",
        "right": "Phones are useful; however, they can also be distracting.",
        "reason": "پیونددهنده‌ها باید رابطهٔ دو ایده را روشن کنند."
      }
    ]
  },
  "online-safety-advice": {
    "intro": "راهنمای ایمنی آنلاین باید توصیه‌های مشخص بدهد؛ مثل پنهان نگه‌داشتن رمز، بررسی پیوندها و خبرکردن فرد قابل اعتماد. should توصیه می‌کند و must برای ضرورت قوی‌تر به‌کار می‌رود.",
    "steps": [
      {
        "title": "۱. معرفی خطر",
        "detail": "خطر یا موضوع را روشن بنویس؛ مثلاً suspicious links."
      },
      {
        "title": "۲. توصیهٔ مشخص",
        "detail": "از should/must + شکل سادهٔ فعل استفاده کن."
      },
      {
        "title": "۳. اقدام در موقعیت مشکوک",
        "detail": "مشخص کن مخاطب اگر پیام مشکوکی دید چه کاری انجام دهد."
      }
    ],
    "frames": [
      {
        "en": "You should use a strong password.",
        "fa": "باید از گذرواژهٔ قوی استفاده کنی.",
        "note": "توصیه"
      },
      {
        "en": "You must never share your password.",
        "fa": "هرگز نباید گذرواژه‌ات را به اشتراک بگذاری.",
        "note": "هشدار قوی"
      },
      {
        "en": "If a message looks suspicious, tell a trusted adult.",
        "fa": "اگر پیامی مشکوک به نظر رسید، به بزرگسال مورد اعتماد خبر بده.",
        "note": "اقدام امن"
      }
    ],
    "connectors": [
      {
        "en": "first of all",
        "fa": "پیش از هر چیز"
      },
      {
        "en": "if…",
        "fa": "اگر ..."
      },
      {
        "en": "never",
        "fa": "هرگز"
      },
      {
        "en": "finally",
        "fa": "در پایان"
      }
    ],
    "mistakes": [
      {
        "wrong": "You must to protect your password.",
        "right": "You must protect your password.",
        "reason": "پس از must فعل ساده و بدون to می‌آید."
      },
      {
        "wrong": "Click on every link.",
        "right": "Do not click suspicious links.",
        "reason": "توصیهٔ ایمن باید رفتار دقیق و کم‌خطر را بیان کند."
      }
    ]
  },
  "future-plans": {
    "intro": "برای توضیح برنامهٔ آینده، هدف را روشن و سپس به گام‌های عملی تقسیم کن. از be going to برای قصد یا برنامه و از will برای پیش‌بینی یا تصمیم استفاده کن؛ در یک متن کوتاه، کاربردها را بی‌دلیل مخلوط نکن.",
    "steps": [
      {
        "title": "۱. هدف",
        "detail": "جملهٔ اول بگو در آینده چه می‌خواهی انجام دهی."
      },
      {
        "title": "۲. گام‌ها",
        "detail": "سه اقدام واقعی و زمان‌بندی‌پذیر بنویس."
      },
      {
        "title": "۳. نتیجه",
        "detail": "توضیح بده تلاش و تمرین چطور به هدف کمک می‌کند."
      }
    ],
    "frames": [
      {
        "en": "I am going to improve my English.",
        "fa": "قصد دارم انگلیسی‌ام را بهتر کنم.",
        "note": "هدف و قصد"
      },
      {
        "en": "First, I will practise for twenty minutes a day.",
        "fa": "اول، روزی بیست دقیقه تمرین خواهم کرد.",
        "note": "گام اجرایی"
      },
      {
        "en": "I hope these steps will help me succeed.",
        "fa": "امیدوارم این گام‌ها کمک کنند موفق شوم.",
        "note": "انتظار نتیجه"
      }
    ],
    "connectors": [
      {
        "en": "first / also / finally",
        "fa": "اول / همچنین / در پایان"
      },
      {
        "en": "in order to",
        "fa": "برای اینکه"
      },
      {
        "en": "as a result",
        "fa": "در نتیجه"
      }
    ],
    "mistakes": [
      {
        "wrong": "I going to study harder.",
        "right": "I am going to study harder.",
        "reason": "ساختار going to به فعل be نیاز دارد."
      },
      {
        "wrong": "I will to practise.",
        "right": "I will practise.",
        "reason": "پس از will فعل ساده می‌آید."
      }
    ]
  },
  "study-effectively": {
    "intro": "راهنمای مطالعهٔ مؤثر به مرحله‌های قابل اجرا نیاز دارد، نه جمله‌های کلی مانند «بیشتر درس بخوان». کارها را به ترتیب بیان کن و در پایان راهی برای بررسی موفقیت پیشنهاد بده.",
    "steps": [
      {
        "title": "۱. هدف مطالعه",
        "detail": "مشخص کن قرار است چه چیزی را یاد بگیری."
      },
      {
        "title": "۲. مراحل دقیق",
        "detail": "مثلاً برنامه‌ریزی، مطالعهٔ کوتاه، تمرین بدون نگاه‌کردن به پاسخ و مرور."
      },
      {
        "title": "۳. بررسی نتیجه",
        "detail": "یک روش اندازه‌گیری بنویس؛ مثلاً پاسخ‌دادن به پنج پرسش از حافظه."
      }
    ],
    "frames": [
      {
        "en": "First, choose one clear study goal.",
        "fa": "اول، یک هدف روشن برای مطالعه انتخاب کن.",
        "note": "شروع دستورالعمل"
      },
      {
        "en": "Next, study for twenty minutes without distractions.",
        "fa": "سپس بیست دقیقه بدون حواس‌پرتی مطالعه کن.",
        "note": "مرحلهٔ عملی"
      },
      {
        "en": "Finally, test yourself without looking at your notes.",
        "fa": "در پایان، بدون نگاه‌کردن به یادداشت‌ها از خودت آزمون بگیر.",
        "note": "سنجش یادگیری"
      }
    ],
    "connectors": [
      {
        "en": "first / next / after that",
        "fa": "اول / سپس / پس از آن"
      },
      {
        "en": "without",
        "fa": "بدون"
      },
      {
        "en": "finally",
        "fa": "در پایان"
      }
    ],
    "mistakes": [
      {
        "wrong": "You should making a plan.",
        "right": "You should make a plan.",
        "reason": "پس از should شکل سادهٔ فعل می‌آید."
      },
      {
        "wrong": "Study more is useful.",
        "right": "Studying more can be useful.",
        "reason": "وقتی فعالیت را به‌عنوان موضوع جمله می‌آوریم، شکل ing می‌تواند اسم‌واره باشد."
      }
    ]
  },
  "problem-solution": {
    "intro": "متن مسئله و راهکار با توصیف دقیق مشکل و اثر آن شروع می‌شود. اگر ممکن است یک دلیل بیاور، سپس راهکار را طوری بنویس که خواننده بداند چه کسی چه کاری انجام دهد و چگونه نتیجه بررسی شود.",
    "steps": [
      {
        "title": "۱. مسئله و اثر",
        "detail": "به جای کلی‌گویی، بگو مشکل چیست و چه پیامدی دارد."
      },
      {
        "title": "۲. دلیل احتمالی",
        "detail": "دلیلی بنویس که واقعاً با مسئله ارتباط دارد."
      },
      {
        "title": "۳. راهکار و سنجش",
        "detail": "یک اقدام عملی پیشنهاد کن و مشخص کن از چه نشانه‌ای می‌فهمیم کار کرده است."
      }
    ],
    "frames": [
      {
        "en": "Many students feel stressed before exams.",
        "fa": "بسیاری از دانش‌آموزان پیش از امتحان احساس استرس می‌کنند.",
        "note": "تعریف مسئله"
      },
      {
        "en": "One reason may be poor planning.",
        "fa": "یک دلیل ممکن است برنامه‌ریزی ضعیف باشد.",
        "note": "دلیل احتمالی"
      },
      {
        "en": "They can make a weekly plan and check their progress.",
        "fa": "می‌توانند برنامهٔ هفتگی بسازند و پیشرفتشان را بررسی کنند.",
        "note": "راهکار و ارزیابی"
      }
    ],
    "connectors": [
      {
        "en": "one problem is",
        "fa": "یک مشکل این است که"
      },
      {
        "en": "because",
        "fa": "چون؛ برای دلیل"
      },
      {
        "en": "one solution is",
        "fa": "یک راهکار این است که"
      },
      {
        "en": "as a result",
        "fa": "در نتیجه"
      }
    ],
    "mistakes": [
      {
        "wrong": "The problem because students are tired.",
        "right": "The problem is that students are tired.",
        "reason": "جمله به فعل یا ساختار کامل نیاز دارد."
      },
      {
        "wrong": "Students should makes a plan.",
        "right": "Students should make a plan.",
        "reason": "پس از should فعل ساده می‌آید."
      }
    ]
  }
};
