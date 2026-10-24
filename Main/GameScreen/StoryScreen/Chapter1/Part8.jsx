export const Chapter1_Part8 = [

  {
    type: "scene",
    title: "The Road to Kawit",
    date: "December 1897 – May 1898",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "narrator",
    text: "After Bonifacio's death, Aguinaldo continues leading the Revolution. By\nlate 1897, his forces retreat to Biak-na-Bato in Bulacan.",
    background: require("../../../../Background Images/Part 8/Manila Bay_mock battle.png")
  },

  {
    type: "narrator",
    text: "Spain and the revolutionaries agree to the Pact of Biak-na-Bato. Aguinaldo and\nother leaders leave for Hong Kong, while Spain promises money and reforms.",
    background: require("../../../../Background Images/Part 8/Victoria Harbour, hong kong 19th century.png")
  },

  {
    type: "narrator",
    text: "In April 1898, war breaks out between Spain and the United States.\nAguinaldo sees a chance to return and continue the fight against Spain.",
    background: require("../../../../Background Images/Part 8/colonial Singapore, exterior 1.png")
  },

  {
    type: "dialogue",
    speaker: "E. SPENCER PRATT",
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Pratt.png"),
        position: "left"
      }
    ],
    text: "Bumalik kayo sa Pilipinas at ipagpatuloy ang laban sa Espanya.\nMakikipagtulungan ang Amerika laban sa kanila.",
    translation: "Return to the Philippines and continue the fight against Spain. America will cooperate against them.",
    background: require("../../../../Background Images/Part 8/U.S. Consul Pratt's office, Singapore 2.png")
  },

  {
    type: "narrator",
    text: "Aguinaldo returns to the Philippines on May 19, 1898.",
    background: require("../../../../Background Images/Part 8/American ship deck and Cavite landing (Dewey conversation).png")
  },

  {
    type: "scene",
    title: "Alapan and the First Flag",
    date: "May 28, 1898",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "On May 28, 1898, Filipino forces defeat Spanish troops at Alapan, Cavite. After the\nvictory, the Filipino flag sewn in Hong Kong is raised on Philippine soil.",
    background: require("../../../../Background Images/Part 8/Alapan Cavite City HQ (first flag unfurled).png")
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
        position: "right"
      }
    ],
    text: "Ito na. Ito ang unang beses na lalantad ang watawat na ito sa\nhangin ng ating sariling bayan.",
    translation: "This is it. This is the first time this flag will fly in the wind of our own homeland.",
    background: require("../../../../Background Images/Part 8/Alapan Cavite City HQ (first flag unfurled).png")
  },

  {
    type: "narrator",
    text: "The victory gives the revolutionaries hope. More towns come under\nFilipino control, and Spanish forces retreat toward Manila.",
    background: require("../../../../Background Images/Part 8/Manila Bay_mock battle.png")
  },

  //T3_8 here

  {
    type: "scene",
    title: "The Draft of the Acta",
    date: "Early June 1898",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "Aguinaldo's government prepares a declaration of independence.\nAmbrosio Rianzares Bautista writes the document, which\nincludes friendly words about the United States.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png")
  },

  {
    type: "dialogue",
    speaker: "AMBROSIO RIANZARES BAUTISTA",
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bautista.png"),
        position: "left"
      }
    ],
    text: "...sa ilalim ng pangangalaga ng makapangyarihan at makataong bansang\nHilagang Amerika, ating kaibigan at tagapagtanggol...",
    translation: "...under the protection of the mighty and humane North American nation, our friend and protector...",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png")
  },

  //Q3_8 here

  {
    type: "choice",
    title: "Choice 8.1: You are Emilio Aguinaldo",
    question: "Bautista is reading his draft which speaks warmly of the United States.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png"),
    choices: [
      {
        text: "Approve the Acta as written to secure American goodwill.",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Panatiliin muna natin ang mga salitang ito. Kailangan natin ang\nkanilang suporta sa ngayon.",
        translation: "Let's keep these words. We need their support for now.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
            position: "right"
          }
        ]
      },

      {
        text: "Ask Bautista to soften the pro-American language.",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Bawasan natin ang papuri. Dapat malinaw na para sa atin\nang kalayaan.",
        translation: "Let's tone down the praise. It should be clear that this independence belongs to us.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
            position: "right"
          }
        ]
      }
    ],
    nextScene: 14
  },

  // CONTINUE

  {
    type: "narrator",
    text: "The declaration is prepared for a public reading in Kawit. The\nrevolutionaries are ready to announce their independence.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png")
  },

  //Q2_8 here

  {
    type: "scene",
    title: "The Declaration at Kawit",
    date: "June 12, 1898",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "On June 12, 1898, Aguinaldo declares Philippine independence from his home in\nKawit, Cavite. The Filipino flag is raised as the declaration is read aloud.",
    background: require("../../../../Background Images/Part 8/Aguinaldo Shrine (with crowd, cannons, bells, flag).png")
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
        position: "right"
      }
    ],
    text: "Sa ngalan ng Diyos, ipinapahayag ko at ipinapaalam na malaya\nat independiyente ang Pilipinas! <i>shouts loudly</i>",
    translation: "In the name of God, I declare and proclaim that the Philippines is free and independent! <i>shouts loudly</i>",
    background: require("../../../../Background Images/Part 8/Aguinaldo Shrine (with crowd, cannons, bells, flag).png")
  },

  {
    type: "system",
    text: "For the revolutionaries, this is a moment of hope. But other countries\nhave not yet recognized the Philippines as an independent nation.",
    background: require("../../../../Background Images/Part 8/Aguinaldo Shrine (with crowd, cannons, bells, flag).png")
  },

  //Q1_8 here

  {
    type: "scene",
    title: "Dictator or President?",
    date: "June 23, 1898",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "Aguinaldo and his advisers must decide how to organize the new government.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png")
  },

  {
    type: "narrator",
    text: "Apolinario Mabini argues that the country needs clear laws and institutions.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png")
  },

  {
    type: "dialogue",
    speaker: "APOLINARIO MABINI",
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Mabini.png"),
        position: "left"
      }
    ],
    text: "Kung gusto nating kilalanin tayo bilang isang tunay na bansa, kailangan natin ng\npamahalaang may malinaw na saligan, hindi kapangyarihang nasa isang tao lamang.",
    translation: "If we want to be recognized as a true nation, we need a government with a clear foundation, not power resting in one person.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png")
  },

  {
    type: "choice",
    title: "Choice 8.2: You are Emilio Aguinaldo",
    question: "Mabini wants the revolutionary government reorganized.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png"),
    choices: [
      {
        text: "Accept Mabini's proposal.",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Gagawin natin ito nang maayos, Apolinario. Kailangan natin ng\npamahalaang may malinaw na saligan.",
        translation: "We'll do this properly, Apolinario. We need a government with a clear foundation.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
            position: "right"
          }
        ]
      },

      {
        text: "Ask Mabini to explain the plan first.",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Ipaliwanag mo muna sa akin ang buong plano bago tayo magpasya.",
        translation: "Explain the whole plan to me first before we decide.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
            position: "right"
          }
        ]
      }
    ],
    nextScene: 24
  },

  {
    type: "narrator",
    text: "On June 23, 1898, the Dictatorial Government is\nreplaced by a Revolutionary Government.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png")
  },

  //Q4_8 here

  {
    type: "scene",
    title: "The Siege of Manila",
    date: "July – August 1898",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "By July, Filipino forces surround Manila.\nAmerican forces also move toward the city.",
    background: require("../../../../Background Images/Part 8/Siege of Manila 1898 trenches.png")
  },

  {
    type: "narrator",
    text: "The Filipinos and Americans have fought against Spain, but\nthey do not agree about who should control Manila.",
    background: require("../../../../Background Images/Part 8/Siege of Manila 1898 trenches.png")
  },

  {
    type: "choice",
    title: "Choice 8.3: You are Emilio Aguinaldo",
    question: "Manila is surrounded, but American forces are also moving toward the city.",
    background: require("../../../../Background Images/Part 8/Siege of Manila 1898 trenches.png"),
    choices: [
      {
        text: "Wait and coordinate with the Americans.",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Maghintay tayo. Ayaw kong mauwi ito sa labanan sa\npagitan ng magkakampi.",
        translation: "Let's wait. I don't want this to turn into a fight between allies.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
            position: "right"
          }
        ]
      },

      {
        text: "Push forward carefully while still keeping communication open with the Americans",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Ipagpatuloy natin ang pagkubkob, pero panatilihin nating\nbukas ang usapan sa mga Amerikano.",
        translation: "Let's continue the siege, but keep communication open with the Americans.",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
            position: "right"
          }
        ]
      }
    ],
    nextScene: 29
  },

  // CONTINUE

  {
    type: "narrator",
    text: "On August 13, 1898, American and Spanish forces fight the\nBattle of Manila. Filipino forces are kept outside the city and\nare not included in the surrender negotiations.",
    background: require("../../../../Background Images/Part 8/Siege of Manila 1898 trenches.png")
  },

  {
    type: "scene",
    title: "The Treaty of Paris",
    date: "August – December 1898",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "On December 10, 1898, Spain and the United States sign the Treaty of Paris.\nSpain gives the Philippines, Guam, and Puerto Rico to the United States.",
    background: require("../../../../Background Images/Part 8/Treaty of Paris.png")
  },

  {
    type: "narrator",
    text: "Filipino leaders declared independence months earlier, but\nthey were not included in this agreement. The future of the\nPhilippines was being decided without them.",
    background: require("../../../../Background Images/Part 8/Treaty of Paris.png")
  },

  //T2_8 here

  {
    type: "scene",
    title: "Santa Mesa",
    date: "February 4, 1899",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    text: "On February 4, 1899, fighting breaks out between Filipino\nand American soldiers near Santa Mesa, Manila.",
    background: require("../../../../Background Images/Part 8/San Juan Bridge Sociego Street Feb 4 1899.png")
  },

  {
    type: "system",
    intro: true,
    text: "The Philippine-American War has begun.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    text: "The Filipinos who fought Spain must now face a new\nstruggle for their country's independence.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  // END YAH

  {
    type: "scene",
    title: "Test Your Knowledge!",
    date: "How well do you remember the final chapter?",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "quiz",
    question: "What agreement ended the fighting between Spain and\nthe revolutionaries at the end of 1897?",
    options: [
      "Treaty of Paris",
      "Pact of Biak-na-Bato",
      "Naic Agreement",
      "Treaty of Manila"
    ],
    correctIndex: 1
  },

  {
    type: "quiz",
    question: "Where did Aguinaldo and other revolutionary leaders\ngo after the Pact of Biak-na-Bato?",
    options: [
      "Japan",
      "Spain",
      "Hong Kong",
      "Singapore"
    ],
    correctIndex: 2
  },

  {
    type: "quiz",
    question: "What happened on June 12, 1898?",
    options: [
      "The Battle of Manila was fought",
      "The Philippine flag was first designed",
      "Philippine independence was declared in Kawit",
      "The Treaty of Paris was signed"
    ],
    correctIndex: 2
  },

  {
    type: "quiz",
    question: "Who helped prepare the Act of the Declaration\nof Independence?",
    options: [
      "Emilio Jacinto",
      "Ambrosio Rianzares Bautista",
      "Mariano Trías",
      "Daniel Tirona"
    ],
    correctIndex: 1
  },

  {
    type: "quiz",
    question: "What happened when Spain and the United States signed\nthe Treaty of Paris in December 1898?",
    options: [
      "Spain recognized Philippine independence",
      "The Philippines was ceded\nto the United States",
      "Aguinaldo became president\nof the United States",
      "The Philippine-American War ended"
    ],
    correctIndex: 1
  },

  {
    type: "quiz",
    question: "What event marked the beginning of the Philippine-American War?",
    options: [
      "The Declaration of Independence",
      "The Battle of Alapan",
      "The fighting near Santa Mesa on\nFebruary 4, 1899",
      "The signing of the Treaty of Paris"
    ],
    correctIndex: 2
  },

  {
    type: "scene",
    title: "Final Chapter Complete.",
    date: " ",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  // END YAH

  {
    type: "system",
    intro: true,
    text: "From the first Spanish ships to the declaration at Kawit,\ngenerations of Filipinos fought for their homeland.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    text: "Their choices, sacrifices, and hopes became part of our history.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    text: "That is pamana — what one generation leaves for the next.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    text: "The story is now yours to remember.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "scene",
    title: "PAMANA:",
    date: "Chronicles of Philippine History",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

];