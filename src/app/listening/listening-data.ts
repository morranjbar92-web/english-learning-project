export type ListeningTurn = { speaker: string; en: string; fa: string };
export type ListeningQuestion = { q: string; options: string[]; answerIndex: number };
export type ListeningLesson = {
  grade: 7 | 8 | 9; slug: string; title: string; category: string; level: string;
  place: string; goal: string; outcome: string; keyPhrase: string;
  turns: ListeningTurn[]; vocabulary: { word: string; meaning: string }[];
  questions: ListeningQuestion[];
};
export const listeningLessons: ListeningLesson[] = [
  {
    "grade": 7,
    "slug": "a-new-classmate",
    "title": "A New Classmate",
    "category": "school",
    "level": "مقدماتی",
    "place": "the classroom",
    "goal": "introduce himself",
    "outcome": "sit together at lunch",
    "keyPhrase": "Let's sit together at lunch.",
    "turns": [
      {
        "speaker": "Sara",
        "en": "Welcome to our classroom, Ali.",
        "fa": "به کلاس ما خوش آمدی، علی."
      },
      {
        "speaker": "Ali",
        "en": "Thank you. I want to introduce myself.",
        "fa": "ممنونم. می‌خواهم خودم را معرفی کنم."
      },
      {
        "speaker": "Sara",
        "en": "My name is Sara. What is your name?",
        "fa": "اسم من سارا است. اسم تو چیست؟"
      },
      {
        "speaker": "Ali",
        "en": "I am Ali. Let's sit together at lunch.",
        "fa": "من علی هستم. بیا موقع ناهار کنار هم بنشینیم."
      }
    ],
    "vocabulary": [
      {
        "word": "classroom",
        "meaning": "کلاس درس"
      },
      {
        "word": "introduce",
        "meaning": "معرفی کردن"
      },
      {
        "word": "together",
        "meaning": "با هم"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the science room",
          "the kitchen",
          "the classroom",
          "the school library"
        ],
        "answerIndex": 2
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "choose a healthy breakfast",
          "introduce himself",
          "find a book about animals",
          "make a poster about plants"
        ],
        "answerIndex": 1
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "sit together at lunch",
          "borrow a book today",
          "finish the poster on Friday",
          "eat eggs and bread"
        ],
        "answerIndex": 0
      }
    ]
  },
  {
    "grade": 7,
    "slug": "at-the-library",
    "title": "At the Library",
    "category": "school",
    "level": "مقدماتی",
    "place": "the school library",
    "goal": "find a book about animals",
    "outcome": "borrow a book today",
    "keyPhrase": "Can I borrow this book today?",
    "turns": [
      {
        "speaker": "Mina",
        "en": "We are in the school library.",
        "fa": "ما در کتابخانه مدرسه هستیم."
      },
      {
        "speaker": "Reza",
        "en": "I want to find a book about animals.",
        "fa": "می‌خواهم کتابی درباره حیوانات پیدا کنم."
      },
      {
        "speaker": "Mina",
        "en": "Look at the shelf beside the window.",
        "fa": "به قفسه کنار پنجره نگاه کن."
      },
      {
        "speaker": "Reza",
        "en": "I found one. Can I borrow this book today?",
        "fa": "یکی پیدا کردم. می‌توانم امروز این کتاب را امانت بگیرم؟"
      }
    ],
    "vocabulary": [
      {
        "word": "library",
        "meaning": "کتابخانه"
      },
      {
        "word": "shelf",
        "meaning": "قفسه"
      },
      {
        "word": "borrow",
        "meaning": "امانت گرفتن"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the classroom",
          "the science room",
          "the kitchen",
          "the school library"
        ],
        "answerIndex": 3
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "make a poster about plants",
          "choose a healthy breakfast",
          "find a book about animals",
          "introduce himself"
        ],
        "answerIndex": 2
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "eat eggs and bread",
          "borrow a book today",
          "sit together at lunch",
          "finish the poster on Friday"
        ],
        "answerIndex": 1
      }
    ]
  },
  {
    "grade": 7,
    "slug": "science-project",
    "title": "Our Science Project",
    "category": "school",
    "level": "مقدماتی",
    "place": "the science room",
    "goal": "make a poster about plants",
    "outcome": "finish the poster on Friday",
    "keyPhrase": "Let's finish the poster on Friday.",
    "turns": [
      {
        "speaker": "Teacher",
        "en": "We are meeting in the science room.",
        "fa": "ما در اتاق علوم جمع شده‌ایم."
      },
      {
        "speaker": "Amir",
        "en": "I want to make a poster about plants.",
        "fa": "می‌خواهم درباره گیاهان یک پوستر بسازم."
      },
      {
        "speaker": "Neda",
        "en": "I can draw the flowers, and you can write the facts.",
        "fa": "من می‌توانم گل‌ها را نقاشی کنم و تو اطلاعات را بنویس."
      },
      {
        "speaker": "Amir",
        "en": "Great. Let's finish the poster on Friday.",
        "fa": "عالی است. بیا جمعه پوستر را تمام کنیم."
      }
    ],
    "vocabulary": [
      {
        "word": "poster",
        "meaning": "پوستر"
      },
      {
        "word": "plant",
        "meaning": "گیاه"
      },
      {
        "word": "fact",
        "meaning": "واقعیت / اطلاعات"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school library",
          "the kitchen",
          "the science room",
          "the classroom"
        ],
        "answerIndex": 2
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "choose a healthy breakfast",
          "make a poster about plants",
          "introduce himself",
          "find a book about animals"
        ],
        "answerIndex": 1
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "finish the poster on Friday",
          "sit together at lunch",
          "borrow a book today",
          "eat eggs and bread"
        ],
        "answerIndex": 0
      }
    ]
  },
  {
    "grade": 7,
    "slug": "breakfast-time",
    "title": "Breakfast Time",
    "category": "daily",
    "level": "مقدماتی",
    "place": "the kitchen",
    "goal": "choose a healthy breakfast",
    "outcome": "eat eggs and bread",
    "keyPhrase": "I will have eggs and bread.",
    "turns": [
      {
        "speaker": "Mom",
        "en": "You are in the kitchen early today.",
        "fa": "امروز زود به آشپزخانه آمده‌ای."
      },
      {
        "speaker": "Kian",
        "en": "I want to choose a healthy breakfast.",
        "fa": "می‌خواهم یک صبحانه سالم انتخاب کنم."
      },
      {
        "speaker": "Mom",
        "en": "We have eggs, bread, and fruit.",
        "fa": "تخم‌مرغ، نان و میوه داریم."
      },
      {
        "speaker": "Kian",
        "en": "I will have eggs and bread, please.",
        "fa": "لطفاً تخم‌مرغ و نان می‌خورم."
      }
    ],
    "vocabulary": [
      {
        "word": "breakfast",
        "meaning": "صبحانه"
      },
      {
        "word": "healthy",
        "meaning": "سالم"
      },
      {
        "word": "fruit",
        "meaning": "میوه"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the science room",
          "the kitchen",
          "the classroom",
          "the school library"
        ],
        "answerIndex": 1
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "choose a healthy breakfast",
          "introduce himself",
          "find a book about animals",
          "make a poster about plants"
        ],
        "answerIndex": 0
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "sit together at lunch",
          "borrow a book today",
          "finish the poster on Friday",
          "eat eggs and bread"
        ],
        "answerIndex": 3
      }
    ]
  },
  {
    "grade": 7,
    "slug": "weekend-at-the-park",
    "title": "At the Park",
    "category": "daily",
    "level": "مقدماتی",
    "place": "the park",
    "goal": "ride his bicycle",
    "outcome": "meet at ten on Saturday",
    "keyPhrase": "Let's meet at ten on Saturday.",
    "turns": [
      {
        "speaker": "Arman",
        "en": "I am going to the park this weekend.",
        "fa": "این آخر هفته به پارک می‌روم."
      },
      {
        "speaker": "Yasmin",
        "en": "I want to ride my bicycle there.",
        "fa": "می‌خواهم آنجا دوچرخه‌سواری کنم."
      },
      {
        "speaker": "Arman",
        "en": "I can bring my ball, too.",
        "fa": "من هم می‌توانم توپم را بیاورم."
      },
      {
        "speaker": "Yasmin",
        "en": "Good idea. Let's meet at ten on Saturday.",
        "fa": "فکر خوبی است. بیا شنبه ساعت ده همدیگر را ببینیم."
      }
    ],
    "vocabulary": [
      {
        "word": "weekend",
        "meaning": "آخر هفته"
      },
      {
        "word": "bicycle",
        "meaning": "دوچرخه"
      },
      {
        "word": "idea",
        "meaning": "ایده / فکر"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school library",
          "the science room",
          "the park",
          "the classroom"
        ],
        "answerIndex": 2
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "make a poster about plants",
          "ride his bicycle",
          "introduce himself",
          "find a book about animals"
        ],
        "answerIndex": 1
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "meet at ten on Saturday",
          "sit together at lunch",
          "borrow a book today",
          "finish the poster on Friday"
        ],
        "answerIndex": 0
      }
    ]
  },
  {
    "grade": 7,
    "slug": "helping-at-home",
    "title": "Helping at Home",
    "category": "daily",
    "level": "مقدماتی",
    "place": "the dining room",
    "goal": "help with the dishes",
    "outcome": "clear the table together",
    "keyPhrase": "We can clear the table together.",
    "turns": [
      {
        "speaker": "Dad",
        "en": "Dinner is finished in the dining room.",
        "fa": "شام در اتاق غذاخوری تمام شده است."
      },
      {
        "speaker": "Leila",
        "en": "I want to help with the dishes.",
        "fa": "می‌خواهم در شستن ظرف‌ها کمک کنم."
      },
      {
        "speaker": "Dad",
        "en": "Thank you. I will wash, and you can dry.",
        "fa": "ممنون. من می‌شویم و تو می‌توانی خشک کنی."
      },
      {
        "speaker": "Leila",
        "en": "Then we can clear the table together.",
        "fa": "بعد می‌توانیم با هم میز را جمع کنیم."
      }
    ],
    "vocabulary": [
      {
        "word": "dish",
        "meaning": "ظرف"
      },
      {
        "word": "dry",
        "meaning": "خشک کردن"
      },
      {
        "word": "clear the table",
        "meaning": "جمع کردن میز"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the science room",
          "the dining room",
          "the classroom",
          "the school library"
        ],
        "answerIndex": 1
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "help with the dishes",
          "introduce himself",
          "find a book about animals",
          "make a poster about plants"
        ],
        "answerIndex": 0
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "sit together at lunch",
          "borrow a book today",
          "finish the poster on Friday",
          "clear the table together"
        ],
        "answerIndex": 3
      }
    ]
  },
  {
    "grade": 7,
    "slug": "buying-apples",
    "title": "Buying Apples",
    "category": "community",
    "level": "مقدماتی",
    "place": "the local market",
    "goal": "buy some apples",
    "outcome": "buy one kilo of apples",
    "keyPhrase": "Please give me one kilo of apples.",
    "turns": [
      {
        "speaker": "Seller",
        "en": "Welcome to the local market.",
        "fa": "به بازار محلی خوش آمدید."
      },
      {
        "speaker": "Sara",
        "en": "I want to buy some apples.",
        "fa": "می‌خواهم مقداری سیب بخرم."
      },
      {
        "speaker": "Seller",
        "en": "These red apples are fresh today.",
        "fa": "این سیب‌های قرمز امروز تازه‌اند."
      },
      {
        "speaker": "Sara",
        "en": "They look good. Please give me one kilo of apples.",
        "fa": "خوب به نظر می‌رسند. لطفاً یک کیلو سیب به من بدهید."
      }
    ],
    "vocabulary": [
      {
        "word": "market",
        "meaning": "بازار"
      },
      {
        "word": "fresh",
        "meaning": "تازه"
      },
      {
        "word": "kilo",
        "meaning": "کیلو"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the local market",
          "the classroom",
          "the school library",
          "the science room"
        ],
        "answerIndex": 0
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "introduce himself",
          "find a book about animals",
          "make a poster about plants",
          "buy some apples"
        ],
        "answerIndex": 3
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "borrow a book today",
          "finish the poster on Friday",
          "buy one kilo of apples",
          "sit together at lunch"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 7,
    "slug": "the-bus-to-school",
    "title": "The Bus to School",
    "category": "community",
    "level": "مقدماتی",
    "place": "the bus stop",
    "goal": "take the bus to school",
    "outcome": "catch the bus at eight",
    "keyPhrase": "We must catch the bus at eight.",
    "turns": [
      {
        "speaker": "Nima",
        "en": "We are waiting at the bus stop.",
        "fa": "ما در ایستگاه اتوبوس منتظریم."
      },
      {
        "speaker": "Reza",
        "en": "I want to take the bus to school.",
        "fa": "می‌خواهم با اتوبوس به مدرسه بروم."
      },
      {
        "speaker": "Nima",
        "en": "The bus comes in five minutes.",
        "fa": "اتوبوس پنج دقیقه دیگر می‌آید."
      },
      {
        "speaker": "Reza",
        "en": "Then we must catch the bus at eight.",
        "fa": "پس باید اتوبوس ساعت هشت را بگیریم."
      }
    ],
    "vocabulary": [
      {
        "word": "bus stop",
        "meaning": "ایستگاه اتوبوس"
      },
      {
        "word": "minute",
        "meaning": "دقیقه"
      },
      {
        "word": "catch the bus",
        "meaning": "به اتوبوس رسیدن"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the classroom",
          "the school library",
          "the science room",
          "the bus stop"
        ],
        "answerIndex": 3
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "find a book about animals",
          "make a poster about plants",
          "take the bus to school",
          "introduce himself"
        ],
        "answerIndex": 2
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "finish the poster on Friday",
          "catch the bus at eight",
          "sit together at lunch",
          "borrow a book today"
        ],
        "answerIndex": 1
      }
    ]
  },
  {
    "grade": 7,
    "slug": "finding-the-museum",
    "title": "Finding the Museum",
    "category": "community",
    "level": "مقدماتی",
    "place": "the town square",
    "goal": "find the city museum",
    "outcome": "follow the map to the museum",
    "keyPhrase": "Let's follow the map to the museum.",
    "turns": [
      {
        "speaker": "Tourist",
        "en": "Excuse me, we are at the town square.",
        "fa": "ببخشید، ما در میدان شهر هستیم."
      },
      {
        "speaker": "Local",
        "en": "Where do you want to go?",
        "fa": "کجا می‌خواهید بروید؟"
      },
      {
        "speaker": "Tourist",
        "en": "I want to find the city museum.",
        "fa": "می‌خواهم موزه شهر را پیدا کنم."
      },
      {
        "speaker": "Local",
        "en": "It is near the river. Let's follow the map to the museum.",
        "fa": "نزدیک رودخانه است. بیا نقشه را تا موزه دنبال کنیم."
      }
    ],
    "vocabulary": [
      {
        "word": "square",
        "meaning": "میدان"
      },
      {
        "word": "museum",
        "meaning": "موزه"
      },
      {
        "word": "map",
        "meaning": "نقشه"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school library",
          "the science room",
          "the town square",
          "the classroom"
        ],
        "answerIndex": 2
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "make a poster about plants",
          "find the city museum",
          "introduce himself",
          "find a book about animals"
        ],
        "answerIndex": 1
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "follow the map to the museum",
          "sit together at lunch",
          "borrow a book today",
          "finish the poster on Friday"
        ],
        "answerIndex": 0
      }
    ]
  },
  {
    "grade": 7,
    "slug": "rainy-picnic",
    "title": "A Rainy Picnic",
    "category": "world",
    "level": "مقدماتی",
    "place": "the park",
    "goal": "have a family picnic",
    "outcome": "move the picnic indoors",
    "keyPhrase": "Let's move the picnic indoors.",
    "turns": [
      {
        "speaker": "Mina",
        "en": "We are at the park for our picnic.",
        "fa": "برای پیک‌نیک در پارک هستیم."
      },
      {
        "speaker": "Dad",
        "en": "I want to have a family picnic, but look at the clouds.",
        "fa": "می‌خواهم پیک‌نیک خانوادگی داشته باشیم، اما به ابرها نگاه کن."
      },
      {
        "speaker": "Mina",
        "en": "It is starting to rain.",
        "fa": "باران دارد شروع می‌شود."
      },
      {
        "speaker": "Dad",
        "en": "That's okay. Let's move the picnic indoors.",
        "fa": "اشکالی ندارد. بیا پیک‌نیک را به داخل خانه منتقل کنیم."
      }
    ],
    "vocabulary": [
      {
        "word": "picnic",
        "meaning": "پیک‌نیک"
      },
      {
        "word": "cloud",
        "meaning": "ابر"
      },
      {
        "word": "indoors",
        "meaning": "داخل ساختمان"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school library",
          "the science room",
          "the park",
          "the classroom"
        ],
        "answerIndex": 2
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "make a poster about plants",
          "have a family picnic",
          "introduce himself",
          "find a book about animals"
        ],
        "answerIndex": 1
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "move the picnic indoors",
          "sit together at lunch",
          "borrow a book today",
          "finish the poster on Friday"
        ],
        "answerIndex": 0
      }
    ]
  },
  {
    "grade": 7,
    "slug": "a-lost-dog",
    "title": "A Lost Dog",
    "category": "world",
    "level": "مقدماتی",
    "place": "the animal clinic",
    "goal": "help a lost dog",
    "outcome": "call the phone number on its collar",
    "keyPhrase": "Let's call the number on its collar.",
    "turns": [
      {
        "speaker": "Omid",
        "en": "We are outside the animal clinic.",
        "fa": "ما بیرون درمانگاه حیوانات هستیم."
      },
      {
        "speaker": "Roya",
        "en": "I want to help this lost dog.",
        "fa": "می‌خواهم به این سگ گمشده کمک کنم."
      },
      {
        "speaker": "Omid",
        "en": "It has a collar with a phone number.",
        "fa": "قلاده‌ای با یک شماره تلفن دارد."
      },
      {
        "speaker": "Roya",
        "en": "Let's call the number on its collar.",
        "fa": "بیا با شماره روی قلاده‌اش تماس بگیریم."
      }
    ],
    "vocabulary": [
      {
        "word": "clinic",
        "meaning": "درمانگاه"
      },
      {
        "word": "lost",
        "meaning": "گمشده"
      },
      {
        "word": "collar",
        "meaning": "قلاده"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the science room",
          "the animal clinic",
          "the classroom",
          "the school library"
        ],
        "answerIndex": 1
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "help a lost dog",
          "introduce himself",
          "find a book about animals",
          "make a poster about plants"
        ],
        "answerIndex": 0
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "sit together at lunch",
          "borrow a book today",
          "finish the poster on Friday",
          "call the phone number on its collar"
        ],
        "answerIndex": 3
      }
    ]
  },
  {
    "grade": 7,
    "slug": "school-garden",
    "title": "The School Garden",
    "category": "world",
    "level": "مقدماتی",
    "place": "the school garden",
    "goal": "water the plants",
    "outcome": "water the plants every Monday",
    "keyPhrase": "We will water the plants every Monday.",
    "turns": [
      {
        "speaker": "Teacher",
        "en": "We are in the school garden.",
        "fa": "ما در باغچه مدرسه هستیم."
      },
      {
        "speaker": "Amir",
        "en": "I want to help water the plants.",
        "fa": "می‌خواهم برای آبیاری گیاهان کمک کنم."
      },
      {
        "speaker": "Teacher",
        "en": "Plants need water and sunlight.",
        "fa": "گیاهان به آب و نور خورشید نیاز دارند."
      },
      {
        "speaker": "Amir",
        "en": "We will water the plants every Monday.",
        "fa": "هر دوشنبه گیاهان را آبیاری خواهیم کرد."
      }
    ],
    "vocabulary": [
      {
        "word": "garden",
        "meaning": "باغچه"
      },
      {
        "word": "sunlight",
        "meaning": "نور خورشید"
      },
      {
        "word": "water",
        "meaning": "آبیاری کردن"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school library",
          "the science room",
          "the school garden",
          "the classroom"
        ],
        "answerIndex": 2
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "make a poster about plants",
          "water the plants",
          "introduce himself",
          "find a book about animals"
        ],
        "answerIndex": 1
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "water the plants every Monday",
          "sit together at lunch",
          "borrow a book today",
          "finish the poster on Friday"
        ],
        "answerIndex": 0
      }
    ]
  },
  {
    "grade": 8,
    "slug": "ordering-lunch",
    "title": "Ordering Lunch",
    "category": "community",
    "level": "متوسط",
    "place": "the café",
    "goal": "order a chicken sandwich",
    "outcome": "have orange juice with lunch",
    "keyPhrase": "I'd like orange juice with my sandwich.",
    "turns": [
      {
        "speaker": "Waiter",
        "en": "Welcome to the café. Are you ready to order?",
        "fa": "به کافه خوش آمدید. آماده سفارش هستید؟"
      },
      {
        "speaker": "Mina",
        "en": "I want to order a chicken sandwich.",
        "fa": "می‌خواهم ساندویچ مرغ سفارش بدهم."
      },
      {
        "speaker": "Waiter",
        "en": "Would you like a drink with that?",
        "fa": "نوشیدنی هم میل دارید؟"
      },
      {
        "speaker": "Mina",
        "en": "Yes, I'd like orange juice with my sandwich.",
        "fa": "بله، لطفاً همراه ساندویچم آب پرتقال می‌خواهم."
      }
    ],
    "vocabulary": [
      {
        "word": "order",
        "meaning": "سفارش دادن"
      },
      {
        "word": "sandwich",
        "meaning": "ساندویچ"
      },
      {
        "word": "drink",
        "meaning": "نوشیدنی"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the train station",
          "the school nurse’s office",
          "the school gym",
          "the café"
        ],
        "answerIndex": 3
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "ask for help because he has a cold",
          "join the volleyball team",
          "order a chicken sandwich",
          "buy a ticket to Shiraz"
        ],
        "answerIndex": 2
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "practise on Thursday",
          "have orange juice with lunch",
          "take the nine o’clock train",
          "rest and tell his parent"
        ],
        "answerIndex": 1
      }
    ]
  },
  {
    "grade": 8,
    "slug": "train-ticket",
    "title": "Buying a Train Ticket",
    "category": "world",
    "level": "متوسط",
    "place": "the train station",
    "goal": "buy a ticket to Shiraz",
    "outcome": "take the nine o’clock train",
    "keyPhrase": "I need a ticket for the nine o’clock train.",
    "turns": [
      {
        "speaker": "Clerk",
        "en": "Good morning. This is the train station ticket desk.",
        "fa": "صبح بخیر. این باجه بلیت ایستگاه قطار است."
      },
      {
        "speaker": "Arman",
        "en": "I want to buy a ticket to Shiraz.",
        "fa": "می‌خواهم بلیت شیراز بخرم."
      },
      {
        "speaker": "Clerk",
        "en": "There is a train at nine and another at eleven.",
        "fa": "یک قطار ساعت نه و یکی ساعت یازده هست."
      },
      {
        "speaker": "Arman",
        "en": "I need a ticket for the nine o’clock train.",
        "fa": "برای قطار ساعت نه بلیت می‌خواهم."
      }
    ],
    "vocabulary": [
      {
        "word": "ticket",
        "meaning": "بلیت"
      },
      {
        "word": "station",
        "meaning": "ایستگاه"
      },
      {
        "word": "clerk",
        "meaning": "کارمند باجه"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school gym",
          "the train station",
          "the café",
          "the school nurse’s office"
        ],
        "answerIndex": 1
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "buy a ticket to Shiraz",
          "order a chicken sandwich",
          "ask for help because he has a cold",
          "join the volleyball team"
        ],
        "answerIndex": 0
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "have orange juice with lunch",
          "rest and tell his parent",
          "practise on Thursday",
          "take the nine o’clock train"
        ],
        "answerIndex": 3
      }
    ]
  },
  {
    "grade": 8,
    "slug": "feeling-unwell",
    "title": "Feeling Unwell",
    "category": "daily",
    "level": "متوسط",
    "place": "the school nurse’s office",
    "goal": "ask for help because he has a cold",
    "outcome": "rest and tell his parent",
    "keyPhrase": "I will rest and tell my parent.",
    "turns": [
      {
        "speaker": "Nurse",
        "en": "You are in the school nurse’s office. What is wrong?",
        "fa": "در اتاق بهداشت مدرسه هستی. چه مشکلی داری؟"
      },
      {
        "speaker": "Kian",
        "en": "I have a sore throat and a cold.",
        "fa": "گلودرد و سرماخوردگی دارم."
      },
      {
        "speaker": "Nurse",
        "en": "You should rest and drink water. Please tell your parent, too.",
        "fa": "بهتر است استراحت کنی و آب بنوشی. لطفاً به والدت هم بگو."
      },
      {
        "speaker": "Kian",
        "en": "I will rest and tell my parent.",
        "fa": "استراحت می‌کنم و به والدم می‌گویم."
      }
    ],
    "vocabulary": [
      {
        "word": "sore throat",
        "meaning": "گلودرد"
      },
      {
        "word": "rest",
        "meaning": "استراحت کردن"
      },
      {
        "word": "parent",
        "meaning": "والد"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the train station",
          "the school gym",
          "the school nurse’s office",
          "the café"
        ],
        "answerIndex": 2
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "join the volleyball team",
          "ask for help because he has a cold",
          "order a chicken sandwich",
          "buy a ticket to Shiraz"
        ],
        "answerIndex": 1
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "rest and tell his parent",
          "have orange juice with lunch",
          "take the nine o’clock train",
          "practise on Thursday"
        ],
        "answerIndex": 0
      }
    ]
  },
  {
    "grade": 8,
    "slug": "volleyball-practice",
    "title": "Volleyball Practice",
    "category": "school",
    "level": "متوسط",
    "place": "the school gym",
    "goal": "join the volleyball team",
    "outcome": "practise on Thursday",
    "keyPhrase": "I'll come to practise on Thursday.",
    "turns": [
      {
        "speaker": "Coach",
        "en": "We are meeting in the school gym after class.",
        "fa": "بعد از کلاس در سالن ورزشی مدرسه جمع می‌شویم."
      },
      {
        "speaker": "Sara",
        "en": "I want to join the volleyball team.",
        "fa": "می‌خواهم به تیم والیبال بپیوندم."
      },
      {
        "speaker": "Coach",
        "en": "We practise on Tuesday and Thursday.",
        "fa": "سه‌شنبه و پنجشنبه تمرین می‌کنیم."
      },
      {
        "speaker": "Sara",
        "en": "I'll come to practise on Thursday.",
        "fa": "پنجشنبه برای تمرین می‌آیم."
      }
    ],
    "vocabulary": [
      {
        "word": "team",
        "meaning": "تیم"
      },
      {
        "word": "coach",
        "meaning": "مربی"
      },
      {
        "word": "practise",
        "meaning": "تمرین کردن"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the train station",
          "the school nurse’s office",
          "the school gym",
          "the café"
        ],
        "answerIndex": 2
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "ask for help because he has a cold",
          "join the volleyball team",
          "order a chicken sandwich",
          "buy a ticket to Shiraz"
        ],
        "answerIndex": 1
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "practise on Thursday",
          "have orange juice with lunch",
          "take the nine o’clock train",
          "rest and tell his parent"
        ],
        "answerIndex": 0
      }
    ]
  },
  {
    "grade": 8,
    "slug": "study-group",
    "title": "The Study Group",
    "category": "school",
    "level": "متوسط",
    "place": "the public library",
    "goal": "prepare for a science quiz",
    "outcome": "divide the tasks between the group",
    "keyPhrase": "Let's divide the tasks between us.",
    "turns": [
      {
        "speaker": "Reza",
        "en": "Our study group is meeting at the public library.",
        "fa": "گروه مطالعاتی ما در کتابخانه عمومی جمع می‌شود."
      },
      {
        "speaker": "Neda",
        "en": "We need to prepare for the science quiz.",
        "fa": "باید برای آزمون علوم آماده شویم."
      },
      {
        "speaker": "Reza",
        "en": "I can make notes, and you can find examples.",
        "fa": "من می‌توانم یادداشت بردارم و تو مثال پیدا کن."
      },
      {
        "speaker": "Neda",
        "en": "Good. Let's divide the tasks between us.",
        "fa": "خوب است. بیا کارها را بین خودمان تقسیم کنیم."
      }
    ],
    "vocabulary": [
      {
        "word": "study group",
        "meaning": "گروه مطالعاتی"
      },
      {
        "word": "quiz",
        "meaning": "آزمون کوتاه"
      },
      {
        "word": "divide",
        "meaning": "تقسیم کردن"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school nurse’s office",
          "the public library",
          "the café",
          "the train station"
        ],
        "answerIndex": 1
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "prepare for a science quiz",
          "order a chicken sandwich",
          "buy a ticket to Shiraz",
          "ask for help because he has a cold"
        ],
        "answerIndex": 0
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "have orange juice with lunch",
          "take the nine o’clock train",
          "rest and tell his parent",
          "divide the tasks between the group"
        ],
        "answerIndex": 3
      }
    ]
  },
  {
    "grade": 8,
    "slug": "choosing-a-jacket",
    "title": "Choosing a Jacket",
    "category": "daily",
    "level": "متوسط",
    "place": "the clothing store",
    "goal": "find a warm jacket",
    "outcome": "choose the blue jacket",
    "keyPhrase": "I’ll take the blue jacket, please.",
    "turns": [
      {
        "speaker": "Shop assistant",
        "en": "Welcome to the clothing store. Can I help you?",
        "fa": "به فروشگاه لباس خوش آمدید. کمکی لازم دارید؟"
      },
      {
        "speaker": "Yasmin",
        "en": "I need to find a warm jacket for winter.",
        "fa": "برای زمستان به یک کت گرم نیاز دارم."
      },
      {
        "speaker": "Shop assistant",
        "en": "This blue jacket is warmer than the grey one.",
        "fa": "این کت آبی از مدل خاکستری گرم‌تر است."
      },
      {
        "speaker": "Yasmin",
        "en": "I’ll take the blue jacket, please.",
        "fa": "لطفاً همان کت آبی را می‌خرم."
      }
    ],
    "vocabulary": [
      {
        "word": "jacket",
        "meaning": "کت"
      },
      {
        "word": "warm",
        "meaning": "گرم"
      },
      {
        "word": "choose",
        "meaning": "انتخاب کردن"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school nurse’s office",
          "the clothing store",
          "the café",
          "the train station"
        ],
        "answerIndex": 1
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "find a warm jacket",
          "order a chicken sandwich",
          "buy a ticket to Shiraz",
          "ask for help because he has a cold"
        ],
        "answerIndex": 0
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "have orange juice with lunch",
          "take the nine o’clock train",
          "rest and tell his parent",
          "choose the blue jacket"
        ],
        "answerIndex": 3
      }
    ]
  },
  {
    "grade": 8,
    "slug": "party-invitation",
    "title": "A Party Invitation",
    "category": "community",
    "level": "متوسط",
    "place": "Sara’s home",
    "goal": "invite a friend to her birthday party",
    "outcome": "arrive at six on Friday",
    "keyPhrase": "Can you arrive at six on Friday?",
    "turns": [
      {
        "speaker": "Sara",
        "en": "I am calling you from home.",
        "fa": "از خانه با تو تماس می‌گیرم."
      },
      {
        "speaker": "Mina",
        "en": "Hi, Sara. Is everything okay?",
        "fa": "سلام سارا. همه‌چیز خوب است؟"
      },
      {
        "speaker": "Sara",
        "en": "I want to invite you to my birthday party.",
        "fa": "می‌خواهم تو را به جشن تولدم دعوت کنم."
      },
      {
        "speaker": "Mina",
        "en": "Of course! Can you arrive at six on Friday?",
        "fa": "حتماً! می‌توانی جمعه ساعت شش بیایی؟"
      }
    ],
    "vocabulary": [
      {
        "word": "invite",
        "meaning": "دعوت کردن"
      },
      {
        "word": "birthday party",
        "meaning": "جشن تولد"
      },
      {
        "word": "arrive",
        "meaning": "رسیدن"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the train station",
          "the school nurse’s office",
          "Sara’s home",
          "the café"
        ],
        "answerIndex": 2
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "ask for help because he has a cold",
          "invite a friend to her birthday party",
          "order a chicken sandwich",
          "buy a ticket to Shiraz"
        ],
        "answerIndex": 1
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "arrive at six on Friday",
          "have orange juice with lunch",
          "take the nine o’clock train",
          "rest and tell his parent"
        ],
        "answerIndex": 0
      }
    ]
  },
  {
    "grade": 8,
    "slug": "which-bus",
    "title": "Which Bus?",
    "category": "community",
    "level": "متوسط",
    "place": "the bus stop near the bank",
    "goal": "find the bus to the city park",
    "outcome": "take bus number twelve",
    "keyPhrase": "We should take bus number twelve.",
    "turns": [
      {
        "speaker": "Tourist",
        "en": "Excuse me, we are at the bus stop near the bank.",
        "fa": "ببخشید، ما در ایستگاه اتوبوس نزدیک بانک هستیم."
      },
      {
        "speaker": "Student",
        "en": "Where do you want to go?",
        "fa": "کجا می‌خواهید بروید؟"
      },
      {
        "speaker": "Tourist",
        "en": "I want to find the bus to the city park.",
        "fa": "می‌خواهم اتوبوس پارک شهر را پیدا کنم."
      },
      {
        "speaker": "Student",
        "en": "We should take bus number twelve.",
        "fa": "بهتر است اتوبوس شماره دوازده را بگیریم."
      }
    ],
    "vocabulary": [
      {
        "word": "near",
        "meaning": "نزدیک"
      },
      {
        "word": "number",
        "meaning": "شماره"
      },
      {
        "word": "city park",
        "meaning": "پارک شهر"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the train station",
          "the school nurse’s office",
          "the bus stop near the bank",
          "the café"
        ],
        "answerIndex": 2
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "ask for help because he has a cold",
          "find the bus to the city park",
          "order a chicken sandwich",
          "buy a ticket to Shiraz"
        ],
        "answerIndex": 1
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "take bus number twelve",
          "have orange juice with lunch",
          "take the nine o’clock train",
          "rest and tell his parent"
        ],
        "answerIndex": 0
      }
    ]
  },
  {
    "grade": 8,
    "slug": "community-cleanup",
    "title": "Community Clean-up",
    "category": "world",
    "level": "متوسط",
    "place": "the community centre",
    "goal": "organise a neighbourhood clean-up",
    "outcome": "meet on Saturday morning",
    "keyPhrase": "Let’s meet on Saturday morning.",
    "turns": [
      {
        "speaker": "Leila",
        "en": "The meeting is at the community centre.",
        "fa": "جلسه در مرکز اجتماع محله است."
      },
      {
        "speaker": "Arman",
        "en": "We want to organise a neighbourhood clean-up.",
        "fa": "می‌خواهیم یک برنامه پاک‌سازی محله برگزار کنیم."
      },
      {
        "speaker": "Leila",
        "en": "We can bring gloves and rubbish bags.",
        "fa": "می‌توانیم دستکش و کیسه زباله بیاوریم."
      },
      {
        "speaker": "Arman",
        "en": "Great. Let’s meet on Saturday morning.",
        "fa": "عالی است. شنبه صبح همدیگر را می‌بینیم."
      }
    ],
    "vocabulary": [
      {
        "word": "community",
        "meaning": "جامعه / محله"
      },
      {
        "word": "gloves",
        "meaning": "دستکش"
      },
      {
        "word": "rubbish",
        "meaning": "زباله"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the train station",
          "the school nurse’s office",
          "the community centre",
          "the café"
        ],
        "answerIndex": 2
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "ask for help because he has a cold",
          "organise a neighbourhood clean-up",
          "order a chicken sandwich",
          "buy a ticket to Shiraz"
        ],
        "answerIndex": 1
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "meet on Saturday morning",
          "have orange juice with lunch",
          "take the nine o’clock train",
          "rest and tell his parent"
        ],
        "answerIndex": 0
      }
    ]
  },
  {
    "grade": 8,
    "slug": "computer-lab",
    "title": "A File Problem",
    "category": "school",
    "level": "متوسط",
    "place": "the computer lab",
    "goal": "fix a presentation file",
    "outcome": "save a copy on a USB drive",
    "keyPhrase": "Let’s save a copy on the USB drive.",
    "turns": [
      {
        "speaker": "Neda",
        "en": "We are in the computer lab, and my presentation will not open.",
        "fa": "در آزمایشگاه رایانه هستیم و ارائه‌ام باز نمی‌شود."
      },
      {
        "speaker": "Amir",
        "en": "We need to fix the presentation file before class.",
        "fa": "باید قبل از کلاس فایل ارائه را درست کنیم."
      },
      {
        "speaker": "Neda",
        "en": "I found an older version in my folder.",
        "fa": "یک نسخه قدیمی‌تر در پوشه‌ام پیدا کردم."
      },
      {
        "speaker": "Amir",
        "en": "Let’s save a copy on the USB drive.",
        "fa": "بیا یک نسخه روی فلش ذخیره کنیم."
      }
    ],
    "vocabulary": [
      {
        "word": "presentation",
        "meaning": "ارائه"
      },
      {
        "word": "version",
        "meaning": "نسخه"
      },
      {
        "word": "USB drive",
        "meaning": "فلش مموری"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school nurse’s office",
          "the computer lab",
          "the café",
          "the train station"
        ],
        "answerIndex": 1
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "fix a presentation file",
          "order a chicken sandwich",
          "buy a ticket to Shiraz",
          "ask for help because he has a cold"
        ],
        "answerIndex": 0
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "have orange juice with lunch",
          "take the nine o’clock train",
          "rest and tell his parent",
          "save a copy on a USB drive"
        ],
        "answerIndex": 3
      }
    ]
  },
  {
    "grade": 8,
    "slug": "hotel-check-in",
    "title": "Checking In",
    "category": "world",
    "level": "متوسط",
    "place": "the hotel lobby",
    "goal": "check in to a reservation",
    "outcome": "get room number 204",
    "keyPhrase": "Your room number is 204.",
    "turns": [
      {
        "speaker": "Receptionist",
        "en": "Good evening. Welcome to the hotel lobby.",
        "fa": "عصر بخیر. به لابی هتل خوش آمدید."
      },
      {
        "speaker": "Guest",
        "en": "I want to check in. I have a reservation.",
        "fa": "می‌خواهم پذیرش شوم. رزرو دارم."
      },
      {
        "speaker": "Receptionist",
        "en": "May I see your booking name, please?",
        "fa": "لطفاً نام رزرو را می‌فرمایید؟"
      },
      {
        "speaker": "Guest",
        "en": "Here it is. Your room number is 204.",
        "fa": "بفرمایید. شماره اتاق شما ۲۰۴ است."
      }
    ],
    "vocabulary": [
      {
        "word": "lobby",
        "meaning": "لابی"
      },
      {
        "word": "reservation",
        "meaning": "رزرو"
      },
      {
        "word": "receptionist",
        "meaning": "مسئول پذیرش"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school nurse’s office",
          "the hotel lobby",
          "the café",
          "the train station"
        ],
        "answerIndex": 1
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "check in to a reservation",
          "order a chicken sandwich",
          "buy a ticket to Shiraz",
          "ask for help because he has a cold"
        ],
        "answerIndex": 0
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "have orange juice with lunch",
          "take the nine o’clock train",
          "rest and tell his parent",
          "get room number 204"
        ],
        "answerIndex": 3
      }
    ]
  },
  {
    "grade": 8,
    "slug": "making-pasta",
    "title": "Making Pasta",
    "category": "daily",
    "level": "متوسط",
    "place": "the kitchen",
    "goal": "make pasta for dinner",
    "outcome": "add tomato sauce at the end",
    "keyPhrase": "Add the tomato sauce at the end.",
    "turns": [
      {
        "speaker": "Mum",
        "en": "We are in the kitchen making dinner.",
        "fa": "در آشپزخانه در حال درست کردن شام هستیم."
      },
      {
        "speaker": "Parisa",
        "en": "I want to make pasta tonight.",
        "fa": "امشب می‌خواهم پاستا درست کنم."
      },
      {
        "speaker": "Mum",
        "en": "Boil the pasta first, then prepare the sauce.",
        "fa": "اول پاستا را بجوشان، بعد سس را آماده کن."
      },
      {
        "speaker": "Parisa",
        "en": "Okay. I will add the tomato sauce at the end.",
        "fa": "باشه. در پایان سس گوجه را اضافه می‌کنم."
      }
    ],
    "vocabulary": [
      {
        "word": "boil",
        "meaning": "جوشاندن"
      },
      {
        "word": "sauce",
        "meaning": "سس"
      },
      {
        "word": "at the end",
        "meaning": "در پایان"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the café",
          "the train station",
          "the school nurse’s office",
          "the kitchen"
        ],
        "answerIndex": 3
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "buy a ticket to Shiraz",
          "ask for help because he has a cold",
          "make pasta for dinner",
          "order a chicken sandwich"
        ],
        "answerIndex": 2
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "rest and tell his parent",
          "add tomato sauce at the end",
          "have orange juice with lunch",
          "take the nine o’clock train"
        ],
        "answerIndex": 1
      }
    ]
  },
  {
    "grade": 9,
    "slug": "career-advice",
    "title": "Career Advice",
    "category": "community",
    "level": "پیشرفته‌تر",
    "place": "the career office",
    "goal": "prepare for a job interview",
    "outcome": "practise answers tonight",
    "keyPhrase": "I’ll practise my answers tonight.",
    "turns": [
      {
        "speaker": "Counsellor",
        "en": "Welcome to the career office. What brings you here?",
        "fa": "به دفتر راهنمایی شغلی خوش آمدی. برای چه آمده‌ای؟"
      },
      {
        "speaker": "Mahan",
        "en": "I want to prepare for a job interview.",
        "fa": "می‌خواهم برای مصاحبه شغلی آماده شوم."
      },
      {
        "speaker": "Counsellor",
        "en": "Research the organisation and prepare examples of your skills.",
        "fa": "درباره سازمان تحقیق کن و برای مهارت‌هایت مثال آماده کن."
      },
      {
        "speaker": "Mahan",
        "en": "That makes sense. I’ll practise my answers tonight.",
        "fa": "منطقی است. امشب پاسخ‌هایم را تمرین می‌کنم."
      }
    ],
    "vocabulary": [
      {
        "word": "career",
        "meaning": "مسیر شغلی"
      },
      {
        "word": "interview",
        "meaning": "مصاحبه"
      },
      {
        "word": "skill",
        "meaning": "مهارت"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the airport departure hall",
          "the career office",
          "the science laboratory",
          "the school hall"
        ],
        "answerIndex": 1
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "prepare for a job interview",
          "complete an experiment about water",
          "reduce single-use plastic",
          "find the correct boarding gate"
        ],
        "answerIndex": 0
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "compare the results with the prediction",
          "bring reusable bottles next week",
          "go to gate seven",
          "practise answers tonight"
        ],
        "answerIndex": 3
      }
    ]
  },
  {
    "grade": 9,
    "slug": "water-experiment",
    "title": "The Water Experiment",
    "category": "school",
    "level": "پیشرفته‌تر",
    "place": "the science laboratory",
    "goal": "complete an experiment about water",
    "outcome": "compare the results with the prediction",
    "keyPhrase": "We should compare our results with the prediction.",
    "turns": [
      {
        "speaker": "Teacher",
        "en": "Your group is working in the science laboratory.",
        "fa": "گروه شما در آزمایشگاه علوم کار می‌کند."
      },
      {
        "speaker": "Tara",
        "en": "We want to complete an experiment about water filtration.",
        "fa": "می‌خواهیم آزمایشی درباره تصفیه آب انجام دهیم."
      },
      {
        "speaker": "Teacher",
        "en": "Record what you observe before you draw a conclusion.",
        "fa": "پیش از نتیجه‌گیری، مشاهداتتان را ثبت کنید."
      },
      {
        "speaker": "Tara",
        "en": "We should compare our results with the prediction.",
        "fa": "باید نتایج را با پیش‌بینی مقایسه کنیم."
      }
    ],
    "vocabulary": [
      {
        "word": "filtration",
        "meaning": "تصفیه / فیلتراسیون"
      },
      {
        "word": "observe",
        "meaning": "مشاهده کردن"
      },
      {
        "word": "prediction",
        "meaning": "پیش‌بینی"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the career office",
          "the school hall",
          "the airport departure hall",
          "the science laboratory"
        ],
        "answerIndex": 3
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "reduce single-use plastic",
          "find the correct boarding gate",
          "complete an experiment about water",
          "prepare for a job interview"
        ],
        "answerIndex": 2
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "go to gate seven",
          "compare the results with the prediction",
          "practise answers tonight",
          "bring reusable bottles next week"
        ],
        "answerIndex": 1
      }
    ]
  },
  {
    "grade": 9,
    "slug": "less-plastic",
    "title": "Less Plastic at School",
    "category": "world",
    "level": "پیشرفته‌تر",
    "place": "the school hall",
    "goal": "reduce single-use plastic",
    "outcome": "bring reusable bottles next week",
    "keyPhrase": "Let’s bring reusable bottles next week.",
    "turns": [
      {
        "speaker": "Student A",
        "en": "Our discussion is in the school hall today.",
        "fa": "امروز گفت‌وگوی ما در سالن مدرسه است."
      },
      {
        "speaker": "Student B",
        "en": "We want to reduce single-use plastic at school.",
        "fa": "می‌خواهیم پلاستیک یک‌بارمصرف را در مدرسه کاهش دهیم."
      },
      {
        "speaker": "Student A",
        "en": "We could replace disposable cups with washable ones.",
        "fa": "می‌توانیم لیوان‌های یک‌بارمصرف را با لیوان‌های قابل شست‌وشو جایگزین کنیم."
      },
      {
        "speaker": "Student B",
        "en": "Let’s bring reusable bottles next week.",
        "fa": "بیا هفته آینده بطری‌های چندبارمصرف بیاوریم."
      }
    ],
    "vocabulary": [
      {
        "word": "single-use",
        "meaning": "یک‌بارمصرف"
      },
      {
        "word": "disposable",
        "meaning": "دورریختنی"
      },
      {
        "word": "reusable",
        "meaning": "چندبارمصرف"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school hall",
          "the career office",
          "the science laboratory",
          "the airport departure hall"
        ],
        "answerIndex": 0
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "prepare for a job interview",
          "complete an experiment about water",
          "find the correct boarding gate",
          "reduce single-use plastic"
        ],
        "answerIndex": 3
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "compare the results with the prediction",
          "go to gate seven",
          "bring reusable bottles next week",
          "practise answers tonight"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 9,
    "slug": "airport-announcement",
    "title": "At the Airport",
    "category": "world",
    "level": "پیشرفته‌تر",
    "place": "the airport departure hall",
    "goal": "find the correct boarding gate",
    "outcome": "go to gate seven",
    "keyPhrase": "Please proceed to gate seven.",
    "turns": [
      {
        "speaker": "Passenger",
        "en": "We are in the airport departure hall.",
        "fa": "ما در سالن خروج فرودگاه هستیم."
      },
      {
        "speaker": "Staff",
        "en": "What do you need help with?",
        "fa": "برای چه چیزی کمک می‌خواهید؟"
      },
      {
        "speaker": "Passenger",
        "en": "I need to find the boarding gate for my flight.",
        "fa": "باید گیت پروازم را پیدا کنم."
      },
      {
        "speaker": "Staff",
        "en": "Your flight is boarding soon. Please proceed to gate seven.",
        "fa": "پرواز شما به‌زودی سوارگیری دارد. لطفاً به گیت هفت بروید."
      }
    ],
    "vocabulary": [
      {
        "word": "departure",
        "meaning": "خروج"
      },
      {
        "word": "boarding gate",
        "meaning": "گیت سوارشدن"
      },
      {
        "word": "proceed",
        "meaning": "حرکت کردن"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the career office",
          "the science laboratory",
          "the school hall",
          "the airport departure hall"
        ],
        "answerIndex": 3
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "complete an experiment about water",
          "reduce single-use plastic",
          "find the correct boarding gate",
          "prepare for a job interview"
        ],
        "answerIndex": 2
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "bring reusable bottles next week",
          "go to gate seven",
          "practise answers tonight",
          "compare the results with the prediction"
        ],
        "answerIndex": 1
      }
    ]
  },
  {
    "grade": 9,
    "slug": "reliable-sources",
    "title": "Finding Reliable Sources",
    "category": "world",
    "level": "پیشرفته‌تر",
    "place": "the school library",
    "goal": "research a topic for an assignment",
    "outcome": "use two reliable sources",
    "keyPhrase": "We should use two reliable sources.",
    "turns": [
      {
        "speaker": "Neda",
        "en": "Our research meeting is at the school library.",
        "fa": "جلسه تحقیق ما در کتابخانه مدرسه است."
      },
      {
        "speaker": "Reza",
        "en": "I need to research a topic for my assignment.",
        "fa": "باید برای تکلیفم درباره یک موضوع تحقیق کنم."
      },
      {
        "speaker": "Neda",
        "en": "Check who wrote the article and when it was published.",
        "fa": "بررسی کن مقاله را چه کسی نوشته و چه زمانی منتشر شده است."
      },
      {
        "speaker": "Reza",
        "en": "We should use two reliable sources.",
        "fa": "باید از دو منبع قابل‌اعتماد استفاده کنیم."
      }
    ],
    "vocabulary": [
      {
        "word": "assignment",
        "meaning": "تکلیف"
      },
      {
        "word": "publish",
        "meaning": "منتشر کردن"
      },
      {
        "word": "reliable",
        "meaning": "قابل‌اعتماد"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the career office",
          "the science laboratory",
          "the school hall",
          "the school library"
        ],
        "answerIndex": 3
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "complete an experiment about water",
          "reduce single-use plastic",
          "research a topic for an assignment",
          "prepare for a job interview"
        ],
        "answerIndex": 2
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "bring reusable bottles next week",
          "use two reliable sources",
          "practise answers tonight",
          "compare the results with the prediction"
        ],
        "answerIndex": 1
      }
    ]
  },
  {
    "grade": 9,
    "slug": "internet-problem",
    "title": "Solving an Internet Problem",
    "category": "school",
    "level": "پیشرفته‌تر",
    "place": "the computer room",
    "goal": "solve an internet connection problem",
    "outcome": "check the cables and restart the router",
    "keyPhrase": "Let’s check the cables and restart the router.",
    "turns": [
      {
        "speaker": "Amir",
        "en": "The connection is not working in the computer room.",
        "fa": "اتصال اینترنت در اتاق رایانه کار نمی‌کند."
      },
      {
        "speaker": "Technician",
        "en": "We need to solve the internet connection problem.",
        "fa": "باید مشکل اتصال اینترنت را حل کنیم."
      },
      {
        "speaker": "Amir",
        "en": "The router lights are on, but the computer is offline.",
        "fa": "چراغ‌های روتر روشن است، اما رایانه آفلاین است."
      },
      {
        "speaker": "Technician",
        "en": "Let’s check the cables and restart the router.",
        "fa": "بیا کابل‌ها را بررسی کنیم و روتر را دوباره راه‌اندازی کنیم."
      }
    ],
    "vocabulary": [
      {
        "word": "connection",
        "meaning": "اتصال"
      },
      {
        "word": "offline",
        "meaning": "آفلاین"
      },
      {
        "word": "router",
        "meaning": "روتر"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school hall",
          "the computer room",
          "the career office",
          "the science laboratory"
        ],
        "answerIndex": 1
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "solve an internet connection problem",
          "prepare for a job interview",
          "complete an experiment about water",
          "reduce single-use plastic"
        ],
        "answerIndex": 0
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "practise answers tonight",
          "compare the results with the prediction",
          "bring reusable bottles next week",
          "check the cables and restart the router"
        ],
        "answerIndex": 3
      }
    ]
  },
  {
    "grade": 9,
    "slug": "exam-stress",
    "title": "Managing Exam Stress",
    "category": "daily",
    "level": "پیشرفته‌تر",
    "place": "the school counsellor’s office",
    "goal": "find healthy ways to manage exam stress",
    "outcome": "take short breaks while studying",
    "keyPhrase": "I’ll take short breaks while I study.",
    "turns": [
      {
        "speaker": "Counsellor",
        "en": "We are meeting in the school counsellor’s office.",
        "fa": "در دفتر مشاور مدرسه ملاقات می‌کنیم."
      },
      {
        "speaker": "Sara",
        "en": "I want to find healthy ways to manage exam stress.",
        "fa": "می‌خواهم راه‌های سالمی برای مدیریت استرس امتحان پیدا کنم."
      },
      {
        "speaker": "Counsellor",
        "en": "Try a study plan, enough sleep, and short breaks.",
        "fa": "یک برنامه مطالعه، خواب کافی و استراحت‌های کوتاه را امتحان کن."
      },
      {
        "speaker": "Sara",
        "en": "I’ll take short breaks while I study.",
        "fa": "هنگام مطالعه استراحت‌های کوتاه می‌کنم."
      }
    ],
    "vocabulary": [
      {
        "word": "manage",
        "meaning": "مدیریت کردن"
      },
      {
        "word": "stress",
        "meaning": "استرس"
      },
      {
        "word": "break",
        "meaning": "استراحت"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school counsellor’s office",
          "the career office",
          "the science laboratory",
          "the school hall"
        ],
        "answerIndex": 0
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "prepare for a job interview",
          "complete an experiment about water",
          "reduce single-use plastic",
          "find healthy ways to manage exam stress"
        ],
        "answerIndex": 3
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "compare the results with the prediction",
          "bring reusable bottles next week",
          "take short breaks while studying",
          "practise answers tonight"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 9,
    "slug": "volunteer-shift",
    "title": "Volunteering on Sunday",
    "category": "community",
    "level": "پیشرفته‌تر",
    "place": "the volunteer centre",
    "goal": "help with a community project",
    "outcome": "join the Sunday morning shift",
    "keyPhrase": "I can join the Sunday morning shift.",
    "turns": [
      {
        "speaker": "Coordinator",
        "en": "Thank you for visiting the volunteer centre.",
        "fa": "ممنون که به مرکز داوطلبان آمده‌ای."
      },
      {
        "speaker": "Kian",
        "en": "I want to help with a community project.",
        "fa": "می‌خواهم در یک پروژه اجتماعی کمک کنم."
      },
      {
        "speaker": "Coordinator",
        "en": "We are sorting donated books and preparing food parcels.",
        "fa": "کتاب‌های اهدایی را مرتب می‌کنیم و بسته‌های غذا آماده می‌کنیم."
      },
      {
        "speaker": "Kian",
        "en": "I can join the Sunday morning shift.",
        "fa": "می‌توانم در نوبت صبح یکشنبه شرکت کنم."
      }
    ],
    "vocabulary": [
      {
        "word": "volunteer",
        "meaning": "داوطلب"
      },
      {
        "word": "donated",
        "meaning": "اهداشده"
      },
      {
        "word": "shift",
        "meaning": "نوبت کاری"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school hall",
          "the volunteer centre",
          "the career office",
          "the science laboratory"
        ],
        "answerIndex": 1
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "help with a community project",
          "prepare for a job interview",
          "complete an experiment about water",
          "reduce single-use plastic"
        ],
        "answerIndex": 0
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "practise answers tonight",
          "compare the results with the prediction",
          "bring reusable bottles next week",
          "join the Sunday morning shift"
        ],
        "answerIndex": 3
      }
    ]
  },
  {
    "grade": 9,
    "slug": "part-time-job",
    "title": "A Part-time Job",
    "category": "daily",
    "level": "پیشرفته‌تر",
    "place": "the job centre",
    "goal": "apply for a part-time job",
    "outcome": "send the résumé before Friday",
    "keyPhrase": "I’ll send my résumé before Friday.",
    "turns": [
      {
        "speaker": "Advisor",
        "en": "We are at the job centre to review your application.",
        "fa": "در مرکز کاریابی هستیم تا درخواستت را بررسی کنیم."
      },
      {
        "speaker": "Yasmin",
        "en": "I want to apply for a part-time job after school.",
        "fa": "می‌خواهم بعد از مدرسه برای یک کار پاره‌وقت درخواست بدهم."
      },
      {
        "speaker": "Advisor",
        "en": "Highlight your relevant skills and check your contact details.",
        "fa": "مهارت‌های مرتبطت را برجسته کن و اطلاعات تماس را بررسی کن."
      },
      {
        "speaker": "Yasmin",
        "en": "I’ll send my résumé before Friday.",
        "fa": "رزومه‌ام را پیش از جمعه می‌فرستم."
      }
    ],
    "vocabulary": [
      {
        "word": "apply",
        "meaning": "درخواست دادن"
      },
      {
        "word": "part-time",
        "meaning": "پاره‌وقت"
      },
      {
        "word": "résumé",
        "meaning": "رزومه"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school hall",
          "the job centre",
          "the career office",
          "the science laboratory"
        ],
        "answerIndex": 1
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "apply for a part-time job",
          "prepare for a job interview",
          "complete an experiment about water",
          "reduce single-use plastic"
        ],
        "answerIndex": 0
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "practise answers tonight",
          "compare the results with the prediction",
          "bring reusable bottles next week",
          "send the résumé before Friday"
        ],
        "answerIndex": 3
      }
    ]
  },
  {
    "grade": 9,
    "slug": "school-uniform-debate",
    "title": "A Classroom Debate",
    "category": "school",
    "level": "پیشرفته‌تر",
    "place": "the English classroom",
    "goal": "prepare arguments about school uniforms",
    "outcome": "present both sides respectfully",
    "keyPhrase": "We should present both sides respectfully.",
    "turns": [
      {
        "speaker": "Teacher",
        "en": "The debate will take place in the English classroom.",
        "fa": "مناظره در کلاس انگلیسی برگزار می‌شود."
      },
      {
        "speaker": "Mina",
        "en": "Our team needs to prepare arguments about school uniforms.",
        "fa": "تیم ما باید استدلال‌هایی درباره لباس فرم مدرسه آماده کند."
      },
      {
        "speaker": "Ali",
        "en": "We should listen carefully and support our ideas with reasons.",
        "fa": "باید با دقت گوش کنیم و از ایده‌هایمان با دلیل پشتیبانی کنیم."
      },
      {
        "speaker": "Mina",
        "en": "We should present both sides respectfully.",
        "fa": "باید هر دو دیدگاه را محترمانه مطرح کنیم."
      }
    ],
    "vocabulary": [
      {
        "word": "debate",
        "meaning": "مناظره"
      },
      {
        "word": "argument",
        "meaning": "استدلال"
      },
      {
        "word": "respectfully",
        "meaning": "محترمانه"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the school hall",
          "the English classroom",
          "the career office",
          "the science laboratory"
        ],
        "answerIndex": 1
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "prepare arguments about school uniforms",
          "prepare for a job interview",
          "complete an experiment about water",
          "reduce single-use plastic"
        ],
        "answerIndex": 0
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "practise answers tonight",
          "compare the results with the prediction",
          "bring reusable bottles next week",
          "present both sides respectfully"
        ],
        "answerIndex": 3
      }
    ]
  },
  {
    "grade": 9,
    "slug": "online-account-safety",
    "title": "Protecting an Online Account",
    "category": "daily",
    "level": "پیشرفته‌تر",
    "place": "the computer lab",
    "goal": "protect an online account",
    "outcome": "enable two-factor authentication",
    "keyPhrase": "Let’s enable two-factor authentication.",
    "turns": [
      {
        "speaker": "Teacher",
        "en": "Our digital safety workshop is in the computer lab.",
        "fa": "کارگاه امنیت دیجیتال ما در آزمایشگاه رایانه است."
      },
      {
        "speaker": "Arman",
        "en": "I want to protect my online account.",
        "fa": "می‌خواهم از حساب آنلاینم محافظت کنم."
      },
      {
        "speaker": "Teacher",
        "en": "Use a unique password and never share verification codes.",
        "fa": "از گذرواژه منحصربه‌فرد استفاده کن و کدهای تأیید را هرگز به اشتراک نگذار."
      },
      {
        "speaker": "Arman",
        "en": "Let’s enable two-factor authentication.",
        "fa": "بیا تأیید دومرحله‌ای را فعال کنیم."
      }
    ],
    "vocabulary": [
      {
        "word": "account",
        "meaning": "حساب کاربری"
      },
      {
        "word": "verification",
        "meaning": "تأیید"
      },
      {
        "word": "authentication",
        "meaning": "احراز هویت"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the computer lab",
          "the career office",
          "the science laboratory",
          "the school hall"
        ],
        "answerIndex": 0
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "prepare for a job interview",
          "complete an experiment about water",
          "reduce single-use plastic",
          "protect an online account"
        ],
        "answerIndex": 3
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "compare the results with the prediction",
          "bring reusable bottles next week",
          "enable two-factor authentication",
          "practise answers tonight"
        ],
        "answerIndex": 2
      }
    ]
  },
  {
    "grade": 9,
    "slug": "university-fair",
    "title": "Planning for the Future",
    "category": "community",
    "level": "پیشرفته‌تر",
    "place": "the university fair",
    "goal": "explore university programmes",
    "outcome": "collect brochures and compare programmes",
    "keyPhrase": "Let’s collect brochures and compare programmes.",
    "turns": [
      {
        "speaker": "Counsellor",
        "en": "Welcome to the university fair.",
        "fa": "به نمایشگاه دانشگاه خوش آمدی."
      },
      {
        "speaker": "Mahan",
        "en": "I want to explore university programmes in engineering.",
        "fa": "می‌خواهم رشته‌های دانشگاهی مهندسی را بررسی کنم."
      },
      {
        "speaker": "Counsellor",
        "en": "Compare the course content, entry requirements, and costs.",
        "fa": "محتوای درس‌ها، شرایط پذیرش و هزینه‌ها را مقایسه کن."
      },
      {
        "speaker": "Mahan",
        "en": "Let’s collect brochures and compare programmes.",
        "fa": "بیا بروشورها را جمع کنیم و رشته‌ها را مقایسه کنیم."
      }
    ],
    "vocabulary": [
      {
        "word": "programme",
        "meaning": "برنامه / رشته تحصیلی"
      },
      {
        "word": "requirement",
        "meaning": "شرط / الزام"
      },
      {
        "word": "brochure",
        "meaning": "بروشور"
      }
    ],
    "questions": [
      {
        "q": "Where does the conversation take place?",
        "options": [
          "the career office",
          "the science laboratory",
          "the school hall",
          "the university fair"
        ],
        "answerIndex": 3
      },
      {
        "q": "What does the speaker want to do?",
        "options": [
          "complete an experiment about water",
          "reduce single-use plastic",
          "explore university programmes",
          "prepare for a job interview"
        ],
        "answerIndex": 2
      },
      {
        "q": "What do they decide or plan at the end?",
        "options": [
          "bring reusable bottles next week",
          "collect brochures and compare programmes",
          "practise answers tonight",
          "compare the results with the prediction"
        ],
        "answerIndex": 1
      }
    ]
  }
];
export const listeningCategories = [
 { id: "school", title: "مدرسه و یادگیری", description: "کلاس، پروژه، درس و کار گروهی", icon: "📚" },
 { id: "daily", title: "زندگی روزمره", description: "خانه، خوراک، خرید و برنامه‌ها", icon: "☀️" },
 { id: "community", title: "جامعه و ارتباط", description: "رفت‌وآمد، خدمات و تعامل روزمره", icon: "🧭" },
 { id: "world", title: "جهان پیرامون", description: "محیط‌زیست، سفر و مسائل امروز", icon: "🌍" },
] as const;
