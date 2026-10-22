export type ReadingWord = { word: string; meaning: string };
export type ReadingLesson = {
  id: string;
  grade: 7 | 8 | 9;
  title: string;
  topic: string;
  level: string;
  text: string;
  translation: string;
  vocabulary: ReadingWord[];
};

// LINGUAPRO_READING_PRACTICE_V1 — graded read-aloud passages, not comprehension quizzes.
export const readingLessons: ReadingLesson[] = [
  {
    id: "g7-school-morning", grade: 7, title: "My Morning at School", topic: "School", level: "آسان",
    text: "I get up at seven o'clock every morning. I wash my face and eat breakfast with my family. Then I put my books in my bag and walk to the bus stop. My first class is English. I like reading short stories with my classmates.",
    translation: "من هر روز صبح ساعت هفت بیدار می‌شوم. صورتم را می‌شویم و با خانواده‌ام صبحانه می‌خورم. سپس کتاب‌هایم را در کیفم می‌گذارم و تا ایستگاه اتوبوس پیاده می‌روم. اولین کلاس من انگلیسی است. دوست دارم با هم‌کلاسی‌هایم داستان‌های کوتاه بخوانم.",
    vocabulary: [{ word: "every morning", meaning: "هر صبح" }, { word: "bus stop", meaning: "ایستگاه اتوبوس" }, { word: "classmate", meaning: "هم‌کلاسی" }]
  },
  {
    id: "g7-family-garden", grade: 7, title: "Our Family Garden", topic: "Family", level: "آسان",
    text: "My family has a small garden behind our house. My father grows tomatoes, and my mother takes care of the flowers. I water the plants after school. On Fridays, we sit outside and drink tea together. The garden is a quiet and happy place.",
    translation: "خانوادهٔ من پشت خانه‌مان باغچهٔ کوچکی دارد. پدرم گوجه‌فرنگی می‌کارد و مادرم از گل‌ها مراقبت می‌کند. من بعد از مدرسه به گیاهان آب می‌دهم. جمعه‌ها بیرون می‌نشینیم و با هم چای می‌نوشیم. باغچه جایی آرام و دل‌نشین است.",
    vocabulary: [{ word: "garden", meaning: "باغچه" }, { word: "grow", meaning: "پرورش دادن / کاشتن" }, { word: "take care of", meaning: "مراقبت کردن از" }]
  },
  {
    id: "g7-library", grade: 7, title: "A Visit to the Library", topic: "Reading", level: "آسان",
    text: "On Tuesday, Mina goes to the school library. She wants a book about animals. The librarian shows her a book about dolphins. Mina sits near the window and reads for twenty minutes. Before she leaves, she borrows the book to read at home.",
    translation: "سه‌شنبه، مینا به کتابخانهٔ مدرسه می‌رود. او یک کتاب دربارهٔ حیوانات می‌خواهد. کتابدار کتابی دربارهٔ دلفین‌ها به او نشان می‌دهد. مینا نزدیک پنجره می‌نشیند و بیست دقیقه مطالعه می‌کند. پیش از رفتن، کتاب را امانت می‌گیرد تا در خانه بخواند.",
    vocabulary: [{ word: "librarian", meaning: "کتابدار" }, { word: "dolphin", meaning: "دلفین" }, { word: "borrow", meaning: "امانت گرفتن" }]
  },
  {
    id: "g7-breakfast", grade: 7, title: "A Healthy Breakfast", topic: "Daily Life", level: "آسان",
    text: "Breakfast gives me energy for the day. I usually eat bread, cheese, and a boiled egg. I also drink a glass of milk or water. My sister likes fruit, so she eats an apple with her breakfast. We try not to leave home with an empty stomach.",
    translation: "صبحانه برای روز به من انرژی می‌دهد. معمولاً نان، پنیر و یک تخم‌مرغ آب‌پز می‌خورم. همچنین یک لیوان شیر یا آب می‌نوشم. خواهرم میوه دوست دارد، پس همراه صبحانه سیب می‌خورد. سعی می‌کنیم با شکم خالی از خانه بیرون نرویم.",
    vocabulary: [{ word: "energy", meaning: "انرژی" }, { word: "usually", meaning: "معمولاً" }, { word: "empty stomach", meaning: "شکم خالی" }]
  },
  {
    id: "g7-school-bus", grade: 7, title: "The School Bus", topic: "School", level: "آسان",
    text: "Our school bus comes at half past seven. I wait with two friends at the corner of our street. When the bus arrives, we get on quietly and sit down. The driver is kind and careful. We arrive at school before the first bell rings.",
    translation: "اتوبوس مدرسهٔ ما ساعت هفت و نیم می‌آید. من با دو دوست در گوشهٔ خیابان منتظر می‌مانم. وقتی اتوبوس می‌رسد، آرام سوار می‌شویم و می‌نشینیم. راننده مهربان و محتاط است. پیش از به صدا درآمدن زنگ اول به مدرسه می‌رسیم.",
    vocabulary: [{ word: "corner", meaning: "گوشه" }, { word: "arrive", meaning: "رسیدن" }, { word: "careful", meaning: "محتاط" }]
  },
  {
    id: "g7-class-project", grade: 7, title: "Our Class Project", topic: "School", level: "آسان",
    text: "Our teacher asks us to make a poster about animals. I draw a tiger, and my friend Sara writes three facts about it. Other students add pictures of birds and fish. We work together and share our ideas. At the end, our poster looks colorful and interesting.",
    translation: "معلم از ما می‌خواهد پوستری دربارهٔ حیوانات درست کنیم. من ببری نقاشی می‌کنم و دوستم سارا سه نکته دربارهٔ آن می‌نویسد. دانش‌آموزان دیگر تصاویر پرندگان و ماهی‌ها را اضافه می‌کنند. با هم کار می‌کنیم و ایده‌هایمان را به اشتراک می‌گذاریم. در پایان، پوسترمان رنگارنگ و جالب می‌شود.",
    vocabulary: [{ word: "poster", meaning: "پوستر" }, { word: "fact", meaning: "واقعیت / نکته" }, { word: "share", meaning: "به اشتراک گذاشتن" }]
  },
  {
    id: "g7-best-friend", grade: 7, title: "My Best Friend", topic: "Friends", level: "آسان",
    text: "My best friend is Amir. He is friendly and helpful. We walk to school together and play football during the break. When I do not understand a lesson, Amir explains it to me. I help him with English words. We learn from each other.",
    translation: "بهترین دوست من امیر است. او خوش‌برخورد و کمک‌کننده است. با هم به مدرسه می‌رویم و در زنگ تفریح فوتبال بازی می‌کنیم. وقتی درسی را نمی‌فهمم، امیر آن را برایم توضیح می‌دهد. من هم در واژه‌های انگلیسی به او کمک می‌کنم. ما از یکدیگر یاد می‌گیریم.",
    vocabulary: [{ word: "helpful", meaning: "کمک‌کننده" }, { word: "break", meaning: "زنگ تفریح" }, { word: "each other", meaning: "یکدیگر" }]
  },
  {
    id: "g7-rainy-day", grade: 7, title: "A Rainy Afternoon", topic: "Weather", level: "آسان",
    text: "It is raining this afternoon, so I stay at home. I finish my homework and make a cup of tea. Then I choose a storybook and sit beside the window. I can hear the rain on the roof. Reading makes the quiet afternoon enjoyable.",
    translation: "امروز بعدازظهر باران می‌بارد، پس در خانه می‌مانم. تکالیفم را تمام می‌کنم و یک فنجان چای درست می‌کنم. سپس داستانی انتخاب می‌کنم و کنار پنجره می‌نشینم. صدای باران را روی سقف می‌شنوم. مطالعه این بعدازظهر آرام را لذت‌بخش می‌کند.",
    vocabulary: [{ word: "rainy", meaning: "بارانی" }, { word: "beside", meaning: "کنار" }, { word: "enjoyable", meaning: "لذت‌بخش" }]
  },

  {
    id: "g8-science-club", grade: 8, title: "The Science Club", topic: "Science", level: "متوسط",
    text: "Every Wednesday, a group of students meets in the science room. This week, they are learning how plants use sunlight. Their teacher gives each team a small plant and a notebook. The students record its height and the number of new leaves. They will compare their results next month.",
    translation: "هر چهارشنبه گروهی از دانش‌آموزان در اتاق علوم دور هم جمع می‌شوند. این هفته یاد می‌گیرند گیاهان چگونه از نور خورشید استفاده می‌کنند. معلم به هر گروه گیاهی کوچک و دفتری می‌دهد. دانش‌آموزان ارتفاع گیاه و تعداد برگ‌های تازه را ثبت می‌کنند. ماه آینده نتایجشان را مقایسه خواهند کرد.",
    vocabulary: [{ word: "sunlight", meaning: "نور خورشید" }, { word: "record", meaning: "ثبت کردن" }, { word: "compare", meaning: "مقایسه کردن" }]
  },
  {
    id: "g8-community", grade: 8, title: "Helping Our Community", topic: "Community", level: "متوسط",
    text: "Last Saturday, our class joined a community clean-up. We collected paper and plastic bottles from the park. A few students planted flowers near the walking path, while others sorted the rubbish for recycling. The work took two hours, but the park looked much better afterward. We decided to return next month.",
    translation: "شنبهٔ گذشته کلاس ما در پاک‌سازی محله شرکت کرد. کاغذها و بطری‌های پلاستیکی را از پارک جمع کردیم. چند دانش‌آموز نزدیک مسیر پیاده‌روی گل کاشتند و بقیه زباله‌ها را برای بازیافت جدا کردند. کار دو ساعت طول کشید، اما پس از آن پارک خیلی بهتر به نظر می‌رسید. تصمیم گرفتیم ماه آینده برگردیم.",
    vocabulary: [{ word: "community", meaning: "جامعه / محله" }, { word: "recycling", meaning: "بازیافت" }, { word: "afterward", meaning: "پس از آن" }]
  },
  {
    id: "g8-coast", grade: 8, title: "A Trip to the Coast", topic: "Travel", level: "متوسط",
    text: "During the spring holiday, my family travelled to a town near the sea. In the morning, we walked along the beach and watched fishing boats return to the harbor. A local guide told us about sea turtles and the importance of keeping the water clean. Before leaving, we bought postcards for our friends.",
    translation: "در تعطیلات بهاری، خانواده‌ام به شهری نزدیک دریا سفر کرد. صبح در ساحل قدم زدیم و بازگشت قایق‌های ماهیگیری به بندر را تماشا کردیم. راهنمایی محلی دربارهٔ لاک‌پشت‌های دریایی و اهمیت پاک نگه‌داشتن آب برایمان گفت. پیش از رفتن، برای دوستانمان کارت‌پستال خریدیم.",
    vocabulary: [{ word: "coast", meaning: "ساحل" }, { word: "harbor", meaning: "بندر" }, { word: "importance", meaning: "اهمیت" }]
  },
  {
    id: "g8-shopping-plan", grade: 8, title: "Shopping with a Plan", topic: "Daily Life", level: "متوسط",
    text: "Before going to the market, Leila writes a shopping list. She checks the kitchen to see what her family already has. At the market, she compares prices and chooses fresh vegetables. Because she follows her list, she does not buy many things she does not need. Planning helps her save both time and money.",
    translation: "لیلا پیش از رفتن به بازار فهرست خرید می‌نویسد. او آشپزخانه را بررسی می‌کند تا ببیند خانواده‌اش چه چیزهایی دارد. در بازار قیمت‌ها را مقایسه می‌کند و سبزیجات تازه انتخاب می‌کند. چون از فهرستش پیروی می‌کند، چیزهای غیرضروری زیادی نمی‌خرد. برنامه‌ریزی به او کمک می‌کند هم در وقت و هم در پول صرفه‌جویی کند.",
    vocabulary: [{ word: "market", meaning: "بازار" }, { word: "compare", meaning: "مقایسه کردن" }, { word: "save", meaning: "صرفه‌جویی کردن" }]
  },
  {
    id: "g8-map", grade: 8, title: "Learning to Read a Map", topic: "Travel", level: "متوسط",
    text: "Our teacher gives us a map of the town and asks us to find the museum. First, we look at the symbols and read the street names. Then we follow the main road and turn left at the bridge. The map helps us plan our route before we begin walking. By the end, everyone can explain the directions.",
    translation: "معلم نقشهٔ شهر را به ما می‌دهد و می‌خواهد موزه را پیدا کنیم. ابتدا نمادها را نگاه می‌کنیم و نام خیابان‌ها را می‌خوانیم. سپس از جادهٔ اصلی می‌رویم و کنار پل به چپ می‌پیچیم. نقشه کمک می‌کند پیش از راه افتادن مسیرمان را برنامه‌ریزی کنیم. در پایان، همه می‌توانند مسیر را توضیح دهند.",
    vocabulary: [{ word: "symbol", meaning: "نماد" }, { word: "route", meaning: "مسیر" }, { word: "direction", meaning: "جهت / مسیر" }]
  },
  {
    id: "g8-wildlife", grade: 8, title: "Protecting Wildlife", topic: "Nature", level: "متوسط",
    text: "Wild animals need safe places to live. When forests disappear, many animals lose their homes and food. People can help by protecting natural areas and never leaving rubbish in the countryside. We should also learn about endangered species and respect the rules of national parks. Small actions can make a difference when many people take part.",
    translation: "حیوانات وحشی به مکان‌های امنی برای زندگی نیاز دارند. وقتی جنگل‌ها از بین می‌روند، بسیاری از حیوانات خانه و غذایشان را از دست می‌دهند. مردم می‌توانند با حفاظت از مناطق طبیعی و رها نکردن زباله در طبیعت کمک کنند. همچنین باید دربارهٔ گونه‌های در معرض خطر یاد بگیریم و قوانین پارک‌های ملی را رعایت کنیم. کارهای کوچک با مشارکت افراد زیادی اثرگذار می‌شوند.",
    vocabulary: [{ word: "wildlife", meaning: "حیات وحش" }, { word: "endangered", meaning: "در معرض خطر" }, { word: "take part", meaning: "شرکت کردن" }]
  },
  {
    id: "g8-team-sports", grade: 8, title: "More Than a Game", topic: "Sports", level: "متوسط",
    text: "Our school basketball team practises twice a week. The coach reminds us that winning is not the only goal. We must communicate, respect the other team, and encourage players who make mistakes. During the final match, we lost by two points, but we congratulated our opponents. We learned that good teamwork matters more than one result.",
    translation: "تیم بسکتبال مدرسهٔ ما هفته‌ای دو بار تمرین می‌کند. مربی یادآوری می‌کند که بردن تنها هدف نیست. باید با هم ارتباط برقرار کنیم، به تیم مقابل احترام بگذاریم و بازیکنانی را که اشتباه می‌کنند تشویق کنیم. در مسابقهٔ پایانی با اختلاف دو امتیاز باختیم، اما به حریف تبریک گفتیم. یاد گرفتیم کار تیمی خوب از یک نتیجه مهم‌تر است.",
    vocabulary: [{ word: "coach", meaning: "مربی" }, { word: "opponent", meaning: "حریف" }, { word: "encourage", meaning: "تشویق کردن" }]
  },
  {
    id: "g8-new-skill", grade: 8, title: "Learning a New Skill", topic: "Learning", level: "متوسط",
    text: "At first, Nima found it difficult to play the guitar. His fingers hurt, and the notes did not sound right. Instead of giving up, he practised for fifteen minutes each day. After a few weeks, he could play a simple song for his family. Nima discovered that regular practice is more useful than one long session.",
    translation: "نیما ابتدا نواختن گیتار را دشوار می‌دانست. انگشتانش درد می‌گرفت و نت‌ها درست صدا نمی‌دادند. او به‌جای تسلیم شدن، هر روز پانزده دقیقه تمرین کرد. پس از چند هفته توانست آهنگی ساده برای خانواده‌اش بنوازد. نیما فهمید تمرین منظم از یک جلسهٔ طولانی مفیدتر است.",
    vocabulary: [{ word: "instead of", meaning: "به‌جای" }, { word: "give up", meaning: "تسلیم شدن" }, { word: "regular", meaning: "منظم" }]
  },

  {
    id: "g9-good-habits", grade: 9, title: "The Power of Good Habits", topic: "Learning", level: "پیشرفته‌تر",
    text: "Successful students do not always study for many hours at once. They build small habits and follow them regularly. For example, a student can review new words for ten minutes after dinner and prepare a short plan before going to bed. These actions may seem simple, but they reduce stress and make learning easier over time.",
    translation: "دانش‌آموزان موفق همیشه ساعت‌های طولانی و یک‌باره درس نمی‌خوانند. آن‌ها عادت‌های کوچک می‌سازند و مرتب انجامشان می‌دهند. برای مثال، دانش‌آموز می‌تواند پس از شام ده دقیقه واژه‌های جدید را مرور کند و پیش از خواب برنامه‌ای کوتاه بنویسد. این کارها ساده به نظر می‌رسند، اما در طول زمان استرس را کم و یادگیری را آسان‌تر می‌کنند.",
    vocabulary: [{ word: "habit", meaning: "عادت" }, { word: "regularly", meaning: "به‌طور منظم" }, { word: "reduce", meaning: "کاهش دادن" }]
  },
  {
    id: "g9-small-invention", grade: 9, title: "A Small Invention", topic: "Science", level: "پیشرفته‌تر",
    text: "A student named Aria noticed that her classroom plants often became dry during school holidays. She designed a simple watering system using a bottle, a piece of string, and a small container. Water moved slowly from the bottle into the soil. Her teacher helped her test the idea, and the plants stayed healthier while the class was away.",
    translation: "دانش‌آموزی به نام آریا متوجه شد گیاهان کلاس در تعطیلات مدرسه اغلب خشک می‌شوند. او با یک بطری، تکه‌ای نخ و ظرفی کوچک سیستم ساده‌ای برای آبیاری طراحی کرد. آب به‌آرامی از بطری به خاک منتقل می‌شد. معلم به او در آزمایش ایده کمک کرد و گیاهان وقتی کلاس تعطیل بود سالم‌تر ماندند.",
    vocabulary: [{ word: "notice", meaning: "متوجه شدن" }, { word: "design", meaning: "طراحی کردن" }, { word: "soil", meaning: "خاک" }]
  },
  {
    id: "g9-plastic", grade: 9, title: "Life Without So Much Plastic", topic: "Environment", level: "پیشرفته‌تر",
    text: "Plastic is useful, but single-use items create a large amount of waste. A family can make a difference by carrying reusable bags, choosing a refillable water bottle, and avoiding unnecessary packaging. Shops and schools can also provide recycling bins. These changes will not solve every environmental problem, yet they are practical steps toward cleaner streets and rivers.",
    translation: "پلاستیک کاربردی است، اما وسایل یک‌بارمصرف زبالهٔ زیادی تولید می‌کنند. یک خانواده با همراه داشتن کیسه‌های چندبارمصرف، انتخاب بطری آب قابل‌پرکردن و پرهیز از بسته‌بندی غیرضروری می‌تواند اثرگذار باشد. فروشگاه‌ها و مدارس نیز می‌توانند سطل‌های بازیافت بگذارند. این تغییرها همهٔ مشکلات زیست‌محیطی را حل نمی‌کنند، اما گام‌هایی عملی برای خیابان‌ها و رودخانه‌های پاک‌ترند.",
    vocabulary: [{ word: "single-use", meaning: "یک‌بارمصرف" }, { word: "reusable", meaning: "چندبارمصرف" }, { word: "packaging", meaning: "بسته‌بندی" }]
  },
  {
    id: "g9-volunteer", grade: 9, title: "A Day as a Volunteer", topic: "Community", level: "پیشرفته‌تر",
    text: "On Friday morning, a group of teenagers visited a local care centre. They read stories to younger children, arranged books, and helped prepare a small art activity. At first, some students felt nervous because they had never volunteered before. By the end of the day, they felt useful and proud. They learned that helping others can strengthen a community.",
    translation: "صبح جمعه، گروهی از نوجوانان به مرکز مراقبت محلی رفتند. برای کودکان کوچک‌تر داستان خواندند، کتاب‌ها را مرتب کردند و به آماده‌سازی فعالیت هنری کوچکی کمک کردند. ابتدا بعضی از دانش‌آموزان نگران بودند، چون قبلاً داوطلب نشده بودند. در پایان روز احساس مفید بودن و افتخار داشتند. فهمیدند کمک به دیگران می‌تواند جامعه را قوی‌تر کند.",
    vocabulary: [{ word: "volunteer", meaning: "داوطلب" }, { word: "nervous", meaning: "نگران / مضطرب" }, { word: "strengthen", meaning: "قوی‌تر کردن" }]
  },
  {
    id: "g9-technology", grade: 9, title: "Using Technology Wisely", topic: "Technology", level: "پیشرفته‌تر",
    text: "Digital tools can help students research a topic, practise a language, and work with classmates. However, technology is most useful when people choose their purpose before opening an app. Taking regular breaks protects the eyes, and keeping personal information private improves online safety. A balanced plan leaves time for study, exercise, sleep, and face-to-face conversations.",
    translation: "ابزارهای دیجیتال می‌توانند به دانش‌آموزان در پژوهش، تمرین زبان و همکاری با هم‌کلاسی‌ها کمک کنند. بااین‌حال، فناوری زمانی مفیدتر است که افراد پیش از بازکردن برنامه هدفشان را مشخص کنند. استراحت منظم از چشم‌ها محافظت می‌کند و خصوصی نگه‌داشتن اطلاعات شخصی امنیت آنلاین را بهتر می‌کند. برنامه‌ای متعادل برای درس، ورزش، خواب و گفت‌وگوی حضوری وقت می‌گذارد.",
    vocabulary: [{ word: "purpose", meaning: "هدف" }, { word: "personal information", meaning: "اطلاعات شخصی" }, { word: "balanced", meaning: "متعادل" }]
  },
  {
    id: "g9-train", grade: 9, title: "A Journey by Train", topic: "Travel", level: "پیشرفته‌تر",
    text: "Travelling by train gave our class a chance to observe the landscape slowly. We passed farms, small villages, and hills covered with trees. Our teacher asked us to notice how the scenery changed from one region to another. Some students took notes, while others drew pictures. The journey reminded us that travel can be both enjoyable and educational.",
    translation: "سفر با قطار فرصتی به کلاس ما داد تا منظره‌ها را به‌آرامی مشاهده کنیم. از کنار مزرعه‌ها، روستاهای کوچک و تپه‌های پوشیده از درخت گذشتیم. معلم خواست توجه کنیم که منظره از منطقه‌ای به منطقهٔ دیگر چگونه تغییر می‌کند. برخی یادداشت برداشتند و برخی نقاشی کشیدند. سفر یادآوری کرد که گردش هم می‌تواند لذت‌بخش باشد و هم آموزشی.",
    vocabulary: [{ word: "landscape", meaning: "چشم‌انداز" }, { word: "scenery", meaning: "منظره" }, { word: "region", meaning: "منطقه" }]
  },
  {
    id: "g9-local-history", grade: 9, title: "Stories from Our Town", topic: "Culture", level: "پیشرفته‌تر",
    text: "Every town has stories that connect the present with the past. In our history project, we interviewed an older neighbour about the old market and the first school in the area. She shared photographs and described how people travelled before there were many buses. Her memories helped us understand that local history is not only found in books; it also lives in people's experiences.",
    translation: "هر شهری داستان‌هایی دارد که امروز را به گذشته پیوند می‌دهند. در پروژهٔ تاریخمان با همسایه‌ای سالمند دربارهٔ بازار قدیمی و نخستین مدرسهٔ منطقه مصاحبه کردیم. او عکس‌هایی نشان داد و توضیح داد مردم پیش از زیادشدن اتوبوس‌ها چگونه سفر می‌کردند. خاطراتش کمک کرد بفهمیم تاریخ محلی فقط در کتاب‌ها نیست؛ در تجربه‌های مردم هم زنده است.",
    vocabulary: [{ word: "interview", meaning: "مصاحبه کردن" }, { word: "memory", meaning: "خاطره" }, { word: "experience", meaning: "تجربه" }]
  },
  {
    id: "g9-water", grade: 9, title: "Every Drop Matters", topic: "Environment", level: "پیشرفته‌تر",
    text: "Clean water is essential for people, animals, and plants, but it is not unlimited. Leaving a tap running while brushing your teeth wastes water every day. Fixing leaks, taking shorter showers, and using only the water we need are simple ways to save it. Schools can discuss local water challenges and help students turn awareness into useful daily habits.",
    translation: "آب پاک برای انسان‌ها، حیوانات و گیاهان ضروری است، اما نامحدود نیست. بازگذاشتن شیر آب هنگام مسواک‌زدن هر روز آب را هدر می‌دهد. تعمیر نشتی‌ها، کوتاه‌تر حمام‌کردن و استفاده از مقدار موردنیاز، راه‌های سادهٔ صرفه‌جویی هستند. مدارس می‌توانند دربارهٔ چالش‌های محلی آب گفت‌وگو کنند و به دانش‌آموزان کمک کنند آگاهی را به عادت‌های روزانهٔ مفید تبدیل کنند.",
    vocabulary: [{ word: "essential", meaning: "ضروری" }, { word: "unlimited", meaning: "نامحدود" }, { word: "awareness", meaning: "آگاهی" }]
  }
];
