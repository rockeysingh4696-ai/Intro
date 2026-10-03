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
    { title: 'You need a soft place to land', message: 'You do not have to have it all figured out today. Take one breath, then another. You are allowed to rest before you try again, and you do not have to earn the right to be cared for. I am here, always.' },
    { title: 'You miss me a little', message: 'I hope you know that somewhere, in the middle of an ordinary day, I am probably thinking about you too. Until we get to be in the same place, keep a little corner of this note close. I will meet you there.' },
    { title: 'You need a bit of courage', message: 'Think of everything you once thought you could not do, and everything you did anyway. That person is still you. You have more in you than this moment is letting you see.' },
    { title: 'The night feels too long', message: 'Let the day be done. Nothing needs solving at this hour. Get comfortable, put the phone down when you can, and remember that morning has a way of making things feel possible again.' },
    { title: 'You forget how loved you are', message: 'Here is your reminder, in writing, so you can come back to it: you are important to me. Not for what you do or how well you are doing, but simply because you are you.' },
    { title: 'You could use a small smile', message: 'Official notice: you are allowed to have dessert first, dance to the wrong part of the song, and send me a photo of whatever made you smile. I would very much like to see it.' },
  ],
  surprise: {
    eyebrow: 'A little surprise for you',
    title: 'Happy birthday, [NAME].',
    message: 'The best part of every memory is that I got to share it with you. Here is to collecting a thousand more.',
    image: '/images/surprise-placeholder.jpg',
  },
  closing: { message: 'If this little corner of the internet made you smile, then it has done exactly what I hoped it would.' },
}