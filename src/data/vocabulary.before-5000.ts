export type VocabularyWord = {
  word: string;
  phonetic: string;
  meaning: string;
  type: string;
  example: string;
  level: string;
  topic: string;
};

export const vocabularyWords: VocabularyWord[] = [
  { word: "Hello", phonetic: "/həˈləʊ/", meaning: "سلام", type: "عبارت", example: "Hello, how are you?", level: "A1", topic: "سلام و احوال‌پرسی" },
  { word: "Goodbye", phonetic: "/ˌɡʊdˈbaɪ/", meaning: "خداحافظ", type: "عبارت", example: "Goodbye, see you tomorrow.", level: "A1", topic: "سلام و احوال‌پرسی" },
  { word: "Please", phonetic: "/pliːz/", meaning: "لطفاً", type: "قید", example: "Please open the door.", level: "A1", topic: "عبارات روزمره" },
  { word: "Thank", phonetic: "/θæŋk/", meaning: "تشکر کردن", type: "فعل", example: "I thank you for your help.", level: "A1", topic: "عبارات روزمره" },
  { word: "Friend", phonetic: "/frend/", meaning: "دوست", type: "اسم", example: "She is my best friend.", level: "A1", topic: "افراد" },
  { word: "Family", phonetic: "/ˈfæməli/", meaning: "خانواده", type: "اسم", example: "My family is very kind.", level: "A1", topic: "افراد" },
  { word: "House", phonetic: "/haʊs/", meaning: "خانه", type: "اسم", example: "Their house is big.", level: "A1", topic: "خانه" },
  { word: "Water", phonetic: "/ˈwɔːtə(r)/", meaning: "آب", type: "اسم", example: "I drink water every day.", level: "A1", topic: "غذا و نوشیدنی" },
  { word: "Food", phonetic: "/fuːd/", meaning: "غذا", type: "اسم", example: "The food is delicious.", level: "A1", topic: "غذا و نوشیدنی" },
  { word: "Book", phonetic: "/bʊk/", meaning: "کتاب", type: "اسم", example: "This is my English book.", level: "A1", topic: "آموزش" },
  { word: "Learn", phonetic: "/lɜːn/", meaning: "یاد گرفتن", type: "فعل", example: "I learn English every day.", level: "A1", topic: "آموزش" },
  { word: "Study", phonetic: "/ˈstʌdi/", meaning: "مطالعه کردن", type: "فعل", example: "I study after school.", level: "A1", topic: "آموزش" },
  { word: "Work", phonetic: "/wɜːk/", meaning: "کار کردن؛ کار", type: "اسم/فعل", example: "I work in an office.", level: "A1", topic: "کار" },
  { word: "Happy", phonetic: "/ˈhæpi/", meaning: "خوشحال", type: "صفت", example: "I am happy today.", level: "A1", topic: "احساسات" },
  { word: "Beautiful", phonetic: "/ˈbjuːtɪfəl/", meaning: "زیبا", type: "صفت", example: "It is a beautiful day.", level: "A1", topic: "توصیف" },
  { word: "Improve", phonetic: "/ɪmˈpruːv/", meaning: "بهبود دادن؛ بهتر شدن", type: "فعل", example: "I want to improve my English.", level: "A2", topic: "یادگیری" },
  { word: "Knowledge", phonetic: "/ˈnɒlɪdʒ/", meaning: "دانش", type: "اسم", example: "Knowledge is important.", level: "B1", topic: "آموزش" },
  { word: "Understand", phonetic: "/ˌʌndəˈstænd/", meaning: "درک کردن", type: "فعل", example: "I understand the question.", level: "A2", topic: "ارتباطات" },
  { word: "Remember", phonetic: "/rɪˈmembə(r)/", meaning: "به یاد آوردن", type: "فعل", example: "Please remember my name.", level: "A2", topic: "ذهن و حافظه" },
  { word: "Decide", phonetic: "/dɪˈsaɪd/", meaning: "تصمیم گرفتن", type: "فعل", example: "We need to decide today.", level: "A2", topic: "تصمیم‌گیری" },
  { word: "Important", phonetic: "/ɪmˈpɔːtənt/", meaning: "مهم", type: "صفت", example: "English is important for my job.", level: "A2", topic: "توصیف" },
  { word: "Possible", phonetic: "/ˈpɒsəbəl/", meaning: "ممکن", type: "صفت", example: "Is it possible to help?", level: "B1", topic: "مفاهیم عمومی" },
  { word: "Opportunity", phonetic: "/ˌɒpəˈtjuːnəti/", meaning: "فرصت", type: "اسم", example: "This is a great opportunity.", level: "B1", topic: "کار و زندگی" },
  { word: "Achieve", phonetic: "/əˈtʃiːv/", meaning: "دستیابی به؛ محقق کردن", type: "فعل", example: "You can achieve your goals.", level: "B1", topic: "موفقیت" },
  { word: "Environment", phonetic: "/ɪnˈvaɪrənmənt/", meaning: "محیط؛ محیط زیست", type: "اسم", example: "We must protect the environment.", level: "B1", topic: "طبیعت" },
  { word: "Challenge", phonetic: "/ˈtʃælɪndʒ/", meaning: "چالش", type: "اسم", example: "Learning a language is a challenge.", level: "B1", topic: "یادگیری" },
  { word: "Confident", phonetic: "/ˈkɒnfɪdənt/", meaning: "بااعتمادبه‌نفس", type: "صفت", example: "She feels confident when speaking.", level: "B2", topic: "شخصیت" },
  { word: "Require", phonetic: "/rɪˈkwaɪə(r)/", meaning: "نیاز داشتن؛ مستلزم بودن", type: "فعل", example: "This task requires patience.", level: "B2", topic: "کار و مهارت" },
  { word: "Significant", phonetic: "/sɪɡˈnɪfɪkənt/", meaning: "قابل‌توجه؛ مهم", type: "صفت", example: "There was a significant change.", level: "B2", topic: "مفاهیم عمومی" },
  { word: "Comprehensive", phonetic: "/ˌkɒmprɪˈhensɪv/", meaning: "جامع؛ فراگیر", type: "صفت", example: "We need a comprehensive plan.", level: "C1", topic: "دانش و تحلیل" }
];
