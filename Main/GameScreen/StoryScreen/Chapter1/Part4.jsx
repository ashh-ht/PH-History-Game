export const Chapter1_Part4 = [

  // PROLOGUE
  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "Rizal has left Manila, but the struggle did not leave with him."
  },

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "Soon, Bonifacio and his companions would give that struggle a new name."
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 1: THE FOUNDING NIGHT
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Founding Night",
    date: "July 7, 1892",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    // SFX: oil lamp being lit
    sfx: "oilLamp"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Katipunan initiation ritual.png"),
    text: "After Rizal's exile, Bonifacio and his companions decide that\npeaceful requests alone will not bring the change they seek.",
    music: "suspense",
    stopSfx: true
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Katipunan initiation ritual.png"),
    text: "The small group gathers to form a secret brotherhood. Their goal:\nhelp one another and work for the Philippines' independence.",
    unlock: ["diaz-2", "diwa-2"]
  },

  {
    type: "dialogue",
    speaker: "DEODATO ARELLANO",
    background: require("../../../../Background Images/Part 4/Katipunan initiation ritual.png"),
    characters: [
      {
        name: "DEODATO ARELLANO",
        source: require("../../../../Character Images/Chapter 4/Arellano Talking.png"),
        position: "left"
      },
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 4/Bonifacio Unsure R.png"),
        position: "right"
      }
    ],
    text: "Let's give this brotherhood a name. Not a league. Not another reform\ngroup. A Katipunan."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 4/Katipunan initiation ritual.png"),
    characters: [
      {
        name: "DEODATO ARELLANO",
        source: require("../../../../Character Images/Chapter 4/Arellano Neutral.png"),
        position: "left"
      },
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 4/Bonifacio Talking R.png"),
        position: "right"
      }
    ],
    text: "Then let this be our promise: we stand together and work\nfor the freedom of our country."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Katipunan initiation ritual.png"),
    text: "They agree on its full name: \"Kataastaasan Kagalang-galangang\nKatipunan ng mga Anak ng Bayan.\""
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Katipunan initiation ritual.png"),
    text: "Each man makes a small, symbolic cut on his arm and signs the\nfounding register, pledging himself to the brotherhood."
  },

  { type: "bloodtrace" },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Katipunan initiation ritual.png"),
    text: "The Katipunan is born. A secret society committed to independence,\nmutual support, good values, and education.",
    unlock: ["Timeline_1892_07-07"]
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 2: REDEFINING A NATION
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "Redefining a Nation",
    date: "Mid-to-Late 1892",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    // SFX: papers being stamped
    sfx: "stampPapers"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Tondo_Caloocan street and market.png"),
    text: "Bonifacio and his young adviser, Emilio Jacinto, want people\nfrom different islands to share one national identity.",
    unlock: ["jacinto-1", "Timeline_1892_MidLate"]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Tondo_Caloocan street and market.png"),
    text: "Back then, the word Filipino was mostly used for Spaniards\nborn in the islands. Bonifacio and Jacinto want that to change."
  },

  // T3_4 HERE

  {
    type: "dialogue",
    speaker: "EMILIO JACINTO",
    background: require("../../../../Background Images/Part 4/Kartilya ng Katipunan Emilio Jacinto, writng room.png"),
    characters: [
      {
        name: "EMILIO JACINTO",
        source: require("../../../../Character Images/Chapter 4/Jacinto Talking.png"),
        position: "right"
      },
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 4/Bonifacio Unsure.png"),
        position: "left"
      }
    ],
    text: "If we wait for Spain to call us Filipino, Andrés, we'll wait forever.\nWe need our own words."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 4/Kartilya ng Katipunan Emilio Jacinto, writng room.png"),
    characters: [
      {
        name: "EMILIO JACINTO",
        source: require("../../../../Character Images/Chapter 4/Jacinto Neutral.png"),
        position: "right"
      },
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 4/Bonifacio Talking.png"),
        position: "left"
      }
    ],
    text: "Then let us reclaim the word Tagalog. Not just for one province,\nbut as a name for our people."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 4/Kartilya ng Katipunan Emilio Jacinto, writng room.png"),
    characters: [
      {
        name: "EMILIO JACINTO",
        source: require("../../../../Character Images/Chapter 4/Jacinto Neutral.png"),
        position: "right"
      },
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 4/Bonifacio Talking.png"),
        position: "left"
      }
    ],
    text: "Mula ngayon, Bisaya man, Iloko man, Kapampangan man,\nat iba pa ay Tagalog din.",
    translation: "From now on, whether Bisaya, Ilocano, Kapampangan, or others, all are Tagalog too."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Kartilya ng Katipunan Emilio Jacinto, writng room.png"),
    text: "They call this imagined homeland Katagalugan. A nation belonging\nto its people across the archipelago.",
    unlock: ["bonifacio-3"]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Kartilya ng Katipunan Emilio Jacinto, writng room.png"),
    text: "But a growing movement faces another challenge: how can it recruit\nmore members without exposing its secrets?"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Kartilya ng Katipunan Emilio Jacinto, writng room.png"),
    text: "The Triangle System offers one solution. Each member recruits two\nothers, who do not learn each other's identities."
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 4.1
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "choice",
    title: "Choice 4.1: You are Andrés Bonifacio",
    question: "The Triangle System protects the Katipunan, but it is too slow\nto build a large movement.",
    background: require("../../../../Background Images/Part 4/Kartilya ng Katipunan Emilio Jacinto, writng room.png"),
    choices: [
      {
        text: "Switch to faster, more open recruiting.",
        speaker: "ANDRÉS BONIFACIO",
        dialogue: "Hindi sasapat ang tatluhang grupo. Kailangan natin ng libu-libo.",
        translation: "Groups of three won't be enough. We need thousands.",
        characters: [
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 4/Bonifacio Talking.png"),
            position: "center"
          }
        ]
      },
      {
        text: "Keep the system a while longer\nand weigh the risks.",
        speaker: "ANDRÉS BONIFACIO",
        dialogue: "Mabagal man, ligtas naman. Mag-isip pa tayo bago magbago.",
        translation: "It's slow, but it's safe. Let's think it over before we change it.",
        characters: [
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 4/Bonifacio Talking.png"),
            position: "center"
          }
        ]
      }
    ]
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Tondo_Caloocan street and market.png"),
    text: "The Triangle System helps keep members hidden, but it cannot\nkeep up with the movement's growing needs."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Tondo_Caloocan street and market.png"),
    text: "Around October 1892, the Katipunan begins recruiting more openly.\nBy 1896, its membership has grown to tens of thousands.",
    unlock: ["Timeline_1892_10"]
  },

  // T1_4 HERE

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 3: DEGREES, PASSWORDS, AND SECRET SIGNS
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "Degrees, Passwords, and Secret Signs",
    date: "1892–1894",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    // SFX: quill writing
    sfx: "quillWriting"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Katipunan initiation ritual.png"),
    text: "Inspired partly by Masonic traditions, the Katipunan develops\nits own ceremonies and levels of membership."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Katipunan initiation ritual.png"),
    text: "Members advance through three levels: Katipon, Kawal, and Bayani.\nEach has its own clothing, signs, and passwords."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Katipunan initiation ritual.png"),
    text: "Katipon wears a black hood with a white triangle. Kawal wears green,\nwhile Bayani wears a red mask and sash."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Katipunan initiation ritual.png"),
    text: "New members also take part in a quiet initiation. They reflect on\nthe nation's past, present, and future before pledging themselves."
  },

  { type: "oathtrace" },

  // SCENE 4: THE KARTILYA


  {
    type: "scene",
    title: "The Kartilya",
    date: "1892–1893",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    // SFX: quill writing
    sfx: "quillWriting"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Kartilya ng Katipunan Emilio Jacinto, writng room.png"),
    text: "Bonifacio writes a set of rules for the society called the Decalogue.\nBut Jacinto has a guide of his own: the Kartilya ng Katipunan."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Kartilya ng Katipunan Emilio Jacinto, writng room.png"),
    text: "Its thirteen teachings call for honor, kindness, sacrifice,\nand respect for people as equals.",
    unlock: ["jacinto-2", "Timeline_1894-1896"]
  },

  {
    type: "dialogue",
    speaker: "EMILIO JACINTO",
    background: require("../../../../Background Images/Part 4/Kartilya ng Katipunan Emilio Jacinto, writng room.png"),
    characters: [
      {
        name: "EMILIO JACINTO",
        source: require("../../../../Character Images/Chapter 4/Jacinto Talking R.png"),
        position: "left"
      },
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 4/Bonifacio Happy.png"),
        position: "right"
      }
    ],
    text: "Read this line, Andrés: \"All people are equal,\nwhether their skin is light or dark.\""
  },

  {
    type: "dialogue",
    speaker: "EMILIO JACINTO",
    background: require("../../../../Background Images/Part 4/Kartilya ng Katipunan Emilio Jacinto, writng room.png"),
    characters: [
      {
        name: "EMILIO JACINTO",
        source: require("../../../../Character Images/Chapter 4/Jacinto Talking R.png"),
        position: "left"
      },
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 4/Bonifacio Happy.png"),
        position: "right"
      }
    ],
    text: "Someone may be richer or wiser, but that doesn't make them\nmore human. Every member should live by this principle."
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 4.2
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "choice",
    title: "Choice 4.2: You are Andrés Bonifacio",
    question: "You've written the Decalogue, but Jacinto's Kartilya offers\na clearer guide for the society.",
    background: require("../../../../Background Images/Part 4/Kartilya ng Katipunan Emilio Jacinto, writng room.png"),
    choices: [
      {
        text: "Adopt Jacinto's Kartilya.",
        speaker: "ANDRÉS BONIFACIO",
        dialogue: "Mas malalim ang isinulat mo kaysa sa akin, Emilio. Ito na ang gagamitin natin.",
        translation: "What you wrote goes deeper than mine, Emilio. This is what we'll use.",
        characters: [
          {
            name: "EMILIO JACINTO",
            source: require("../../../../Character Images/Chapter 4/Jacinto Neutral R.png"),
            position: "left"
          },
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 4/Bonifacio Talking R.png"),
            position: "right"
          }
        ]
      },
      {
        text: "Improve your Decalogue together first.",
        speaker: "ANDRÉS BONIFACIO",
        dialogue: "Tulungan mo akong pagandahin ang sa akin bago tayo magpasya.",
        translation: "Help me improve mine before we decide.",
        characters: [
          {
            name: "EMILIO JACINTO",
            source: require("../../../../Character Images/Chapter 4/Jacinto Neutral R.png"),
            position: "left"
          },
          {
            name: "ANDRÉS BONIFACIO",
            source: require("../../../../Character Images/Chapter 4/Bonifacio Talking R.png"),
            position: "right"
          }
        ]
      }
    ]
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Kartilya ng Katipunan Emilio Jacinto, writng room.png"),
    text: "Jacinto's Kartilya becomes the Katipunan's main guide. It reminds\nmembers that a person's worth isn't measured by wealth or skin color."
  },

  // Q2_4 HERE

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 5: THE LAKAMBINI AND THE RAIDS
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Lakambini and the Raids",
    date: "1895–1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    // SFX: door opening
    sfx: "doorOpen"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Tondo_Caloocan street and market.png"),
    text: "As the Katipunan grows, Spanish suspicion grows with it.\nAuthorities begin searching homes in Tondo and Caloocan."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Safe-house interior (Gregoria's scenes).png"),
    text: "Gregoria de Jesús, Bonifacio's wife and the Katipunan's Lakambini,\nguards its secret papers, seals, and supplies.",
    unlock: ["gregoria-1", "gregoria-2", "Timeline_1895-1896"]
  },

  // T4_4 HERE

  {
    type: "dialogue",
    speaker: "GREGORIA DE JESÚS",
    background: require("../../../../Background Images/Part 4/Safe-house interior (Gregoria's scenes).png"),
    characters: [
      {
        name: "GREGORIA DE JESÚS",
        source: require("../../../../Character Images/Chapter 4/Gregoria Neutral.png"),
        position: "center"
      }
    ],
    text: "Kung mahuli ako, mahuhuli ang buong Katipunan kasama ko.",
    translation: "If I'm caught, the whole Katipunan gets caught with me."
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 4.3
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "choice",
    title: "Choice 4.3: You are Gregoria de Jesús",
    question: "Spanish authorities are searching homes for Katipunan materials.",
    background: require("../../../../Background Images/Part 4/Safe-house interior (Gregoria's scenes).png"),
    choices: [
      {
        text: "Keep moving the documents\nfrom house to house.",
        speaker: "GREGORIA DE JESÚS",
        dialogue: "Isa pang bahay. Isa pa.",
        translation: "One more house. Just one more.",
        characters: [
          {
            name: "GREGORIA DE JESÚS",
            source: require("../../../../Character Images/Chapter 4/Gregoria Neutral.png"),
            position: "center"
          }
        ]
      },
      {
        text: "Hide everything in one\nwell-concealed place.",
        speaker: "GREGORIA DE JESÚS",
        dialogue: "Kung may isang lugar na talagang ligtas, doon ko na lang itatago lahat.",
        translation: "If there's one truly safe place, I'll hide everything there.",
        characters: [
          {
            name: "GREGORIA DE JESÚS",
            source: require("../../../../Character Images/Chapter 4/Gregoria Neutral.png"),
            position: "center"
          }
        ]
      }
    ]
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Tandang Sora Melchora Aquino house.png"),
    text: "Gregoria keeps protecting the movement's papers and supplies,\nhelping preserve its plans for the struggle ahead."
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 6: KALAYAAN AND THE SURGE
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "Kalayaan and the Surge",
    date: "March 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    // SFX: newspaper printing
    sfx: "newspaper"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/19th century hand press printing shop.png"),
    text: "In March 1896, Emilio Jacinto helps spread the Katipunan's message\nthrough a secret newspaper called Kalayaan or \"Freedom.\"",
    unlock: ["jacinto-3", "Timeline_1896_03"]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/19th century hand press printing shop.png"),
    text: "The paper uses a false printing location and a decoy editor's name\nto confuse Spanish investigators. Even one edition makes an impact."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Tondo_Caloocan street and market.png"),
    text: "More Filipinos join. By 1896, the Katipunan has grown\nto tens of thousands of members."
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 7: DISCOVERY AND THE NATIONAL ASSEMBLY
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "Discovery and the National Assembly",
    date: "August 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    // SFX: urgent marching
    sfx: "marching"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Tondo_Caloocan street and market.png"),
    text: "On August 19, 1896, Spanish authorities discover the Katipunan.\nRaids and arrests put the secret movement in immediate danger.",
    unlock: ["Timeline_1896_08-19", "patino-1", "patino-2", "honoria-1", "teresa-1"]
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 4/Tondo_Caloocan street and market.png"),
    characters: [
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 4/Bonifacio Talking Mad.png"),
        position: "center"
      }
    ],
    text: "Nahanap na tayo. Wala nang panahon para sa mas maraming pagpaplano.",
    translation: "We've been discovered. There's no more time for more planning."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Melchora's barn, Banlat, Kalookan.png"),
    text: "On August 24, Bonifacio gathers Katipunan leaders in a barn\nin Banlat, Kalookan, owned by Melchora Aquino.",
    unlock: ["Timeline_1896_08-24", "melchora-1", "melchora-2"]
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Melchora's barn, Banlat, Kalookan.png"),
    text: "The leaders decide to push forward with the struggle for independence\nand organize their movement for the fight ahead."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 4/Melchora's barn, Banlat, Kalookan.png"),
    characters: [
      {
        name: "ANDRÉS BONIFACIO",
        source: require("../../../../Character Images/Chapter 4/Bonifacio Talking Mad.png"),
        position: "center"
      }
    ],
    text: "Mula ngayon, hindi na tayo lihim na samahan lamang.\nTayo na ang pamahalaan ng Katagalugan!",
    translation: "From now on, we are no longer just a secret society. We are the government of Katagalugan."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 4/Melchora's barn, Banlat, Kalookan.png"),
    text: "With Bonifacio as its leader, the Katipunan takes another step\ntoward building a nation free from Spanish rule.",
    unlock: ["bonifacio-4"]
  },

  // ENDING

  {
    type: "scene",
    title: "The Katipunan is no longer a secret.",
    date: "Its dream of independence is about to become a revolution.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "The Katipunan has grown from a small secret group into a large movement."
  },

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "Its members are ready to fight for independence.\nBut Spain has discovered their secret."
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // QUIZ TIME
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "Test Your Knowledge!",
    date: "How well do you remember the Katipunan?",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "quiz",
    question: "What was the main goal of the Katipunan when it was founded?",
    options: [
      "To support Spanish rule",
      "To win independence for the Philippines",
      "To become a political party in Spain",
      "To replace La Liga Filipina as a reform group"
    ],
    correctIndex: 1,
    unlock: ["remnant-part4-1"]
  },

  {
    type: "quiz",
    question: "What name did the Katipunan use for the nation it imagined?",
    options: [
      "Filipinas",
      "Nueva España",
      "Katagalugan",
      "Manila"
    ],
    correctIndex: 2,
    unlock: ["remnant-part4-2"]
  },

  {
    type: "quiz",
    question: "What was the purpose of the Triangle System?",
    options: [
      "To organize military battles",
      "To train members in writing",
      "To recruit members while limiting\nwhat each member knew",
      "To divide the Katipunan into three armies"
    ],
    correctIndex: 2,
    unlock: ["remnant-part4-3"]
  },

  {
    type: "quiz",
    question: "Who wrote the Kartilya ng Katipunan?",
    options: [
      "Andrés Bonifacio",
      "Emilio Jacinto",
      "José Rizal",
      "Deodato Arellano"
    ],
    correctIndex: 1,
    unlock: ["remnant-part4-4"]
  },

  {
    type: "quiz",
    question: "What happened after the Katipunan was discovered by\nSpanish authorities in August 1896?",
    options: [
      "The Katipunan immediately surrendered",
      "Bonifacio returned to Spain",
      "The movement moved toward open revolt",
      "La Liga Filipina was restored"
    ],
    correctIndex: 2,
    unlock: ["remnant-part4-5"]
  },

  {
    type: "quiz",
    question: "Who was the Lakambini of the Katipunan who safeguarded its secret documents?",
    options: [
      "Melchora Aquino",
      "Gregoria de Jesús",
      "Teodora Alonso",
      "Trinidad Tecson"
    ],
    correctIndex: 1,
    unlock: ["remnant-part4-6"]
  },

  {
    type: "scene",
    title: "Chapter Complete.",
    date: "The secret is out.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "scene",
    title: "What began in secret would soon shake the entire country.",
    date: " ",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  }

];