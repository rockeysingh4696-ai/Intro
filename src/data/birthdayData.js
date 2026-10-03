const image = (id, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const birthdayData = {
  recipientName: 'Shristi',
  senderName: 'Harsh Pandey',
  hero: {
    image: '/images/hero-photo.png',
    kicker: 'A small universe, made just for you',
    message: 'May the year ahead bring you slow mornings, loud laughter, and more reasons to feel wonderfully alive.',
  },
  letter: { pages: [
    { title: 'Dear [NAME],', content: 'Some people make an ordinary day feel like it has been quietly rearranged for the better. You do that without even trying. It is in the way you notice the small things, the way you make room for people, and the warmth you leave behind after every conversation. I hope today gives a little of that goodness back to you.' },
    { title: 'A wish for your next year,', content: 'I hope you keep finding the things that make your eyes light up. I hope you take the long way home when the evening is beautiful, say yes to the plans that make your heart race, and give yourself the same kindness you offer everyone else. You deserve a year that feels like you: thoughtful, bright, and entirely your own.' },
  ] },
  reasons: [
    { title: 'You make people feel at home.', description: 'There is a rare ease in your company. People can simply be themselves around you.' },
    { title: 'You notice what others miss.', description: 'The small details matter to you, and that makes the people around you feel seen.' },
    { title: 'Your laugh changes the room.', description: 'It arrives like sunlight through an open window. The whole place feels lighter.' },
    { title: 'You are braver than you know.', description: 'Even on uncertain days, you keep showing up with a beautiful kind of courage.' },
    { title: 'You make ordinary things lovely.', description: 'A walk, a story, a quiet afternoon. Somehow, everything is better when you are there.' },
    { title: 'You are wholly, wonderfully you.', description: 'There is nobody else who sees the world quite the way you do. That is a gift.' },
  ],
  memories: [
    { id: 1, image: '/images/memory-01.png', alt: 'Shristi taking a warm-toned close-up selfie indoors', title: 'The golden hour', note: 'One of those days we wished would last.' },
    { id: 2, image: '/images/memory-02.jpg', alt: 'Shristi looking out from a misty mountain viewpoint', title: 'The long way home', note: 'We were in no hurry to get anywhere.' },
    { id: 3, image: '/images/memory-03.jpg', alt: 'Shristi taking a black-and-white mirror selfie in a patterned outfit', title: 'Salt in our hair', note: 'The sea kept our secrets that day.' },
    { id: 4, image: '/images/memory-04.jpg', alt: 'Shristi in a traditional outfit, covering part of her face with her hand', title: 'A little escape', note: 'Fresh air and absolutely no plans.' },
    { id: 5, image: '/images/memory-05.jpg', alt: 'Shristi standing by the water in a black top and jeans', title: 'Somewhere new', note: 'The best part was getting there.' },
    { id: 6, image: '/images/memory-06.jpg', alt: 'Shristi taking a full-length monochrome mirror selfie', title: 'Room to breathe', note: 'A quiet moment, kept close.' },
  ],
  voiceNote: { audio: '/audio/voice-note.mp3', artwork: '/images/voice-artwork.jpg', description: 'A little hello for whenever you need to hear one.' },
  openWhen: [
    {
      title: 'You are beautiful in every way',
      message: `Happy Birthday to the most beautiful girl I have ever met. ❤️\n\nBeauty with a brain, yes — but khoobsurat sirf surat se nahi, seerat se bhi.\n\nI genuinely love the way you think, the way you act, the way you care, and the way you understand people.\n\nThere is something about you that makes you genuinely rare, and I hope you always remember that.`,
    },
    {
      title: 'You understand me like few people do',
      message: `I genuinely love the way you understand me — sometimes even better than I understand myself. 🫶🏻\n\nThe way you listen, the way you notice little things, and sometimes the way you make me understand things too… it all means more than I probably say.\n\nYou have this beautiful ability to make someone feel heard without making a big deal out of it.`,
    },
    {
      title: 'Somehow, you became someone special',
      message: `Somewhere, I'll always be grateful to Bhagwan for bringing you into my life. ❤️\n\nKehne ko toh aap mujhse door ho, but you have never really made me feel that distance.\n\nSomehow, you've always been there. And that presence — even from far away — has meant a lot to me.\n\nSome people simply become a part of your life, and some quietly become a part of your heart.`,
    },
    {
      title: 'You brought out my happiest side',
      message: `I have smiled so much around you, and honestly, I don't think I had ever blushed this much before. 😂❤️\n\nYa seedha kahun toh shayad main apna yeh wala roop kabhi dekh hi nahi paata — ki haan, main aisa bhi hoon.\n\nKahin na kahin, you unlocked that childish, carefree side of me that I didn't even know was still there.\n\nAnd honestly, I feel lucky that I got to discover that version of myself with you.`,
    },
    {
      title: 'Never change the beautiful you',
      message: `You are one of the bravest girls I know. ❤️\n\nThe way you keep your family upfront, the way you dream, the way you carry your ambitions, and that smile of yours — all of it makes you who you are.\n\nSo please, never feel like you need to change yourself just to fit someone else's expectations.\n\nStay exactly the way you are — with your dreams, your craziness, your strength, your smile, and that little childish side too.`,
    },
    {
      title: 'Keep dreaming. Keep smiling.',
      message: `At last, Happy Birthday, Shree. 🥹❤️\n\nMast raho, khush raho, hamesha smile karti raho, aur life mein jo bhi dream dekho, usse achieve karo.\n\nThink big, dream bigger, and achieve even bigger — because I genuinely believe you are capable of it, and I know tum kar logi.\n\nBas aise hi rehna… and keep smiling.\n\nOnce again, Happy Birthday, Shree. ❤️🎂✨`,
    },
  ],
  surprise: {
    eyebrow: 'A little surprise for you',
    title: 'Happy birthday, [NAME].',
    message: 'The best part of every memory is that I got to share it with you. Here is to collecting a thousand more.',
    image: '/images/surprise-placeholder.jpg',
  },
  closing: { message: 'If this little corner of the internet made you smile, then it has done exactly what I hoped it would.' },
}