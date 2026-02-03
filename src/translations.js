export const UI_TRANSLATIONS = {
  id: {
    start: "mulai",
    continue: "lanjut",
    closeLetter: "tutup",
    returnAnytime: "Kamu boleh kembali kapan pun.",
    stayHere: "Aku tidak ke mana-mana.",
    theme: "Tema",
    language: "Bahasa",
    dark: "gelap",
    light: "terang",
  },
  en: {
    start: "start",
    continue: "continue",
    closeLetter: "close",
    returnAnytime: "You can return anytime.",
    stayHere: "I'm not going anywhere.",
    theme: "Theme",
    language: "Language",
    dark: "dark",
    light: "light",
  },
};

export const TITLE_TRANSLATIONS = {
  id: {
    title: "Surat Tengah Malam",
    subtitle: "Surat untuk bagian dirimu\nyang terus berjalan di kegelapan",
  },
  en: {
    title: "The Midnight Letter",
    subtitle: "A letter to the part of you\nthat keeps walking in the darkness",
  },
};

export const SCREEN_TRANSLATIONS = {
  id: {},
  en: {
    entry: {
      lines: ["You are not lost.", "You just stopped for a moment.", ""],
    },
    s01: {
      lines: [
        "I have been watching you for quite a while.",
        "I know how you stay silent and pretend.",
        "It's okay. I'm not here to judge.",
      ],
    },
    s02: {
      lines: ["If others see you today,", "they might say you look…", ""],
      choices: [
        { label: "seemingly fine", next: "s03a" },
        { label: "busy and strong", next: "s03b" },
        { label: "calm, yet empty", next: "s03c" },
        { label: "no one really sees", next: "s03d" },
      ],
    },
    s03a: {
      lines: [
        "Fine is the most exhausted word.",
        "I know how much energy you spend.",
        "To keep that word standing.",
      ],
    },
    s03b: {
      lines: [
        "Busy can be the gentlest way to hide.",
        "I watch you run from one thing to another.",
        "And never stop to ask yourself.",
      ],
    },
    s03c: {
      lines: [
        "Empty calm is the heaviest kind.",
        "People think it's peace when it's exhaustion.",
        "I know you know the difference.",
      ],
    },
    s03d: {
      lines: [
        "Being unseen is the most familiar feeling.",
        "Not because you're not there.",
        "But because you never take up space.",
      ],
    },
    s04a: {
      lines: [
        "But beneath all that, you more often feel…",
        "Things you don't bring outside the house.",
        "",
      ],
      choices: [
        { label: "tired without clear reason", next: "s05a" },
        { label: "sad without neat story", next: "s05b" },
        { label: "angry at yourself", next: "s05c" },
        { label: "longing for something unnamed", next: "s05d" },
      ],
    },
    s04b: {
      lines: [
        "In the gaps of your busyness, something waits.",
        "A feeling that never gets its turn to speak.",
        "",
      ],
      choices: [
        { label: "tired without clear reason", next: "s05a" },
        { label: "sad without neat story", next: "s05b" },
        { label: "angry at yourself", next: "s05c" },
        { label: "longing for something unnamed", next: "s05d" },
      ],
    },
    s04c: {
      lines: [
        "Behind that calm, something moves.",
        "Very slowly, very quietly, but it's there.",
        "",
      ],
      choices: [
        { label: "tired without clear reason", next: "s05a" },
        { label: "sad without neat story", next: "s05b" },
        { label: "angry at yourself", next: "s05c" },
        { label: "longing for something unnamed", next: "s05d" },
      ],
    },
    s04d: {
      lines: [
        "Precisely because no one sees, you're free.",
        "To acknowledge what's most hidden.",
        "",
      ],
      choices: [
        { label: "tired without clear reason", next: "s05a" },
        { label: "sad without neat story", next: "s05b" },
        { label: "angry at yourself", next: "s05c" },
        { label: "longing for something unnamed", next: "s05d" },
      ],
    },
    s05a: {
      lines: [
        "Tiredness without a name is the heaviest kind.",
        "Not because there's no reason.",
        "But because the reasons are too many to count.",
      ],
    },
    s05b: {
      lines: [
        "Messy sadness is the most honest sadness.",
        "It doesn't need a story to justify it.",
        "It exists, and that's enough to acknowledge it.",
      ],
    },
    s05c: {
      lines: [
        "Anger at yourself is usually not about mistakes.",
        "But about all the things you feel should have been.",
        "And never became what you imagined.",
      ],
    },
    s05d: {
      lines: [
        "Longing without an address is the strangest kind.",
        "Not about someone who left.",
        "But about a version of your life that never came.",
      ],
    },
    s06a: {
      lines: [
        "You might think this is about a certain person.",
        "But this exhaustion is too big for one name.",
        "It comes from somewhere deeper than that.",
      ],
    },
    s06b: {
      lines: [
        "Many would think you're sad because of someone.",
        "But this sadness is older than anyone.",
        "It existed before you knew any names.",
      ],
    },
    s06c: {
      lines: [
        "People often think this anger has a target.",
        "But it's not about who disappointed you.",
        "It's about the distance between you and your shadow.",
      ],
    },
    s06d: {
      lines: [
        "People think this longing has a face.",
        "But what you long for isn't someone.",
        "It's a version of your life that keeps going without you.",
      ],
    },
    s07_aa: {
      lines: [
        "Like a house always tidy but its lights never on.",
        "Everything in the right place.",
        "But something has left from within.",
      ],
    },
    s07_ab: {
      lines: [
        "Like a letter sent but never arrived.",
        "The words still inside the envelope.",
        "But the hand that wrote has moved on with life.",
      ],
    },
    s07_ac: {
      lines: [
        "Like a mirror hung perfectly but you dare not approach.",
        "The reflection is still there.",
        "And it waits for you patiently.",
      ],
    },
    s07_ad: {
      lines: [
        "Like a road you know by heart but pass too quickly.",
        "Every turn still there.",
        "But you never stop to sit.",
      ],
    },
    s07_ba: {
      lines: [
        "Like a machine running night and day.",
        "Its sound fills the entire room.",
        "But no one hears what it's asking for.",
      ],
    },
    s07_bb: {
      lines: [
        "Like music played in an empty room.",
        "The melody perfect and no one listening.",
        "And the player doesn't know when to stop.",
      ],
    },
    s07_bc: {
      lines: [
        "Like stairs you always climb.",
        "You reach the top and no one's waiting.",
        "Only air and the same question.",
      ],
    },
    s07_bd: {
      lines: [
        "Like a train always on schedule but never stops.",
        "You watch platforms pass from the window.",
        "And one of them should have been yours.",
      ],
    },
    s07_ca: {
      lines: [
        "Like a lake with a perfectly calm surface.",
        "No one knows how deep it is below.",
        "And the water never rises to tell.",
      ],
    },
    s07_cb: {
      lines: [
        "Like rain falling on an already dark night.",
        "No one sees but the ground stays wet.",
        "And in the morning everyone says the weather's nice.",
      ],
    },
    s07_cc: {
      lines: [
        "Like a garden that looks beautiful from outside the fence.",
        "But inside there's a tree long dried.",
        "And no one enters to water it.",
      ],
    },
    s07_cd: {
      lines: [
        "Like a beach in the very quiet morning.",
        "The waves still come and go as usual.",
        "But your footprints from yesterday are erased.",
      ],
    },
    s07_da: {
      lines: [
        "Like a light in a hallway with no photo of it.",
        "It shines every night without anyone knowing.",
        "And the breakthrough it gives is never recorded.",
      ],
    },
    s07_db: {
      lines: [
        "Like a book page never read to the end.",
        "The words still there every time the book opens.",
        "But no one knows what story waits.",
      ],
    },
    s07_dc: {
      lines: [
        "Like a shadow that always follows but never greeted.",
        "It's beside you every day.",
        "And it's starting to tire of waiting to be acknowledged.",
      ],
    },
    s07_dd: {
      lines: [
        "Like a door always open but no one enters.",
        "The wind still felt from inside the room.",
        "But no voice calls the name of that place.",
      ],
    },
    s08: {
      lines: [
        "You often think you should be somewhere else.",
        "A place where everything feels more certain and fitting.",
        "A place that feels more right than here.",
      ],
    },
    s09: {
      lines: [
        "But you are here.",
        "And what's most exhausting isn't your position.",
        "But the comparison with a life that never happened.",
      ],
      choices: [
        { label: "I know, and I'm tired of comparing", next: "s10a" },
        { label: "I don't know when I started doing that", next: "s10b" },
        { label: "I'm still trying to stop doing it", next: "s10c" },
        { label: "I'm not sure that's what I feel", next: "s10d" },
      ],
    },
    s10a: {
      lines: [
        "Exhaustion from comparison is the first real step.",
        "It doesn't mean you've arrived anywhere.",
        "But you're starting to stop measuring from the wrong line.",
      ],
    },
    s10b: {
      lines: [
        "Not knowing when it started is the most honest way to admit.",
        "Because it didn't enter through a visible door.",
        "It entered slowly, from the gaps of ordinary days.",
      ],
    },
    s10c: {
      lines: [
        "Trying to stop is itself a form of awareness.",
        "You already know something moving inside.",
        "And acknowledging it is the hardest of all.",
      ],
    },
    s10d: {
      lines: [
        "Not being sure is okay too.",
        "You don't have to understand everything tonight.",
        "It's enough you're here and honest with the unknowing.",
      ],
    },
    s11: {
      lines: [
        "All this time you thought I was talking about your life.",
        "When in fact, I'm speaking from within it.",
        "I'm not waiting ahead. I'm walking beside you.",
      ],
    },
    s12: {
      lines: [
        "I'm not a memory. I'm not a person. I'm not a feeling.",
        "I am the part of your life that keeps going.",
        "Even when you stop believing in yourself.",
      ],
    },
    s13: {
      lines: [
        "You haven't lost anything tonight.",
        "You just realized I've always been here.",
        "And though life feels heavy, you keep living it.",
      ],
    },
    end: {
      lines: ["You can return anytime.", "I'm not going anywhere.", ""],
    },
  },
};
