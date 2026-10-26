
export const Chapter1_Part8 = [

  // ===========================================
  // OPENING
  // ===========================================

  {
    type: "system",
    intro: true,
    text: "Spain's power was weakening, but the fight for freedom was not over.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    text: "Would the world recognize Philippine independence?",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  // ===========================================
  // SCENE 1: THE ROAD TO KAWIT
  // ===========================================

  {
    type: "scene",
    title: "The Road to Kawit",
    date: "December 1897 to May 1898",
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    sfx: "footstepsPavement"
  },

  {
    type: "narrator",
    text: "After the Pact of Biak-na-Bato, Aguinaldo and other leaders went into exile in Hong Kong.",
    background: require("../../../../Background Images/Part 8/Victoria Harbour, hong kong 19th century.png"),
    unlock: ["Timeline_1897_12-14", "aguinaldo-4", "diaz-3"]
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "center"
      }
    ],
    text: "Kung aalis tayo, hindi ibig sabihin na isusuko natin ang ating pangarap na kalayaan.",
    translation: "If we leave, it does not mean we are surrendering our dream of independence.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png")
  },

  {
    type: "system",
    intro: true,
    text: "In April 1898, war broke out between Spain and the United States.",
    background: require("../../../../Background Images/Part 8/colonial Singapore, exterior 1.png"),
    unlock: ["Timeline_1898_04", "Timeline_1898_05-01", "dewey-1"]
  },

  {
    type: "dialogue",
    speaker: "E. SPENCER PRATT",
    characters: [
      {
        name: "pratt",
        source: require("../../../../Character Images/Chapter 8/Pratt.png"),
        position: "left"
      },
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      }
    ],
    text: "General Aguinaldo, this war may give your Revolution another chance.",
    background: require("../../../../Background Images/Part 8/U.S. Consul Pratt's office, Singapore 2.png"),
    unlock: ["pratt-1"]
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      },
      {
        name: "pratt",
        source: require("../../../../Character Images/Chapter 8/Pratt.png"),
        position: "left"
      }
    ],
    text: "Will America recognize our independence?",
    background: require("../../../../Background Images/Part 8/U.S. Consul Pratt's office, Singapore 2.png")
  },

  {
    type: "dialogue",
    speaker: "E. SPENCER PRATT",
    characters: [
      {
        name: "pratt",
        source: require("../../../../Character Images/Chapter 8/Pratt.png"),
        position: "left"
      },
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      }
    ],
    text: "You should speak with Admiral Dewey. He commands the American fleet.",
    background: require("../../../../Background Images/Part 8/U.S. Consul Pratt's office, Singapore 2.png"),
    unlock: ["pratt-2", "wildman-1"]
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      },
      {
        name: "pratt",
        source: require("../../../../Character Images/Chapter 8/Pratt.png"),
        position: "left"
      }
    ],
    text: "A promise of help is not enough. Our country needs genuine independence.",
    background: require("../../../../Background Images/Part 8/U.S. Consul Pratt's office, Singapore 2.png")
  },

  {
    type: "narrator",
    text: "Aguinaldo returned to the Philippines on May 19, 1898, and resumed the Revolution.",
    background: require("../../../../Background Images/Part 8/American ship deck and Cavite landing (Dewey conversation).png"),
    unlock: ["Timeline_1898_05-19", "dewey-2"]
  },

  // ===========================================
  // SCENE 2: ALAPAN AND THE FIRST FLAG
  // ===========================================

  {
    type: "scene",
    title: "Alapan and the First Flag",
    date: "May 28, 1898",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "windyFlag"
  },

  {
    type: "narrator",
    text: "Filipino forces defeated Spanish troops at Alapan, Cavite.",
    background: require("../../../../Background Images/Part 8/Alapan Cavite City HQ (first flag unfurled).png"),
    music: "somber",
    unlock: ["Timeline_1898_05-24", "Timeline_1898_05-28"]
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "center"
      }
    ],
    text: "Itaas ang watawat! Ipakita natin kung ano ang ipinaglalaban natin.",
    translation: "Raise the flag! Let us show what we are fighting for.",
    background: require("../../../../Background Images/Part 8/Alapan Cavite City HQ (first flag unfurled).png")
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "center"
      }
    ],
    text: "Marami pa tayong kailangang gawin. Ngunit ngayon, may dahilan tayong umasa.",
    translation: "We still have much to do. But today, we have reason to hope.",
    background: require("../../../../Background Images/Part 8/Alapan Cavite City HQ (first flag unfurled).png"),
    unlock: ["trias-2", "diwa-3"]
  },

  // T3_8 here

  // ===========================================
  // SCENE 3: THE DRAFT OF THE ACTA
  // ===========================================

  {
    type: "scene",
    title: "The Draft of the Acta",
    date: "June 1898",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "stampPapers"
  },

  {
    type: "dialogue",
    speaker: "AMBROSIO RIANZARES BAUTISTA",
    characters: [
      {
        name: "bautista",
        source: require("../../../../Character Images/Chapter 8/Rianzares.png"),
        position: "left"
      },
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      }
    ],
    text: "General, inihahanda ko na ang dokumento ng ating kalayaan.",
    translation: "General, I am preparing the document declaring our independence.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png"),
    unlock: ["bautista-1"]
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      },
      {
        name: "bautista",
        source: require("../../../../Character Images/Chapter 8/Rianzares.png"),
        position: "left"
      }
    ],
    text: "Malinaw bang sinasabi nito na malaya ang Pilipinas?",
    translation: "Does it clearly state that the Philippines is free?",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png")
  },

  {
    type: "dialogue",
    speaker: "AMBROSIO RIANZARES BAUTISTA",
    characters: [
      {
        name: "bautista",
        source: require("../../../../Character Images/Chapter 8/Rianzares.png"),
        position: "left"
      },
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      }
    ],
    text: "Oo. Ngunit binabanggit din dito ang Amerika bilang kaibigan at tagapagtanggol.",
    translation: "Yes. But it also describes America as a friend and protector.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png")
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      },
      {
        name: "bautista",
        source: require("../../../../Character Images/Chapter 8/Rianzares.png"),
        position: "left"
      }
    ],
    text: "Kaibigan ba talaga sila? O may sarili rin silang layunin?",
    translation: "Are they truly our friends? Or do they have their own goals?",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png")
  },

  // Q3_8 here

  // ===========================================
  // CHOICE 8.1: AMERICAN GOODWILL
  // ===========================================

  {
    type: "choice",
    title: "Choice 8.1: You are Emilio Aguinaldo",
    question: "Bautista's draft describes the United States as a friend and protector.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png"),
    choices: [
      {
        text: "Keep the wording to encourage\nAmerican support.",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Panatilihin muna natin ito. Kailangan natin ang kanilang suporta.",
        translation: "Let us keep it for now. We need their support.",
        characters: [
          {
            name: "bautista",
            source: require("../../../../Character Images/Chapter 8/Rianzares.png"),
            position: "left"
          },
          {
            name: "aguinaldo",
            source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
            position: "right"
          }
        ]
      },
      {
        text: "Stress Filipino independence.",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Linawin nating ang kalayaan ay para sa Pilipinas, hindi sa ibang kapangyarihan.",
        translation: "Let us make clear that independence belongs to the Philippines, not another power.",
        characters: [
          {
            name: "bautista",
            source: require("../../../../Character Images/Chapter 8/Rianzares.png"),
            position: "left"
          },
          {
            name: "aguinaldo",
            source: require("../../../../Character Images/Chapter 8/Emilio Reading.png"),
            position: "right"
          }
        ]
      }
    ]
  },

  {
    type: "dialogue",
    speaker: "AMBROSIO RIANZARES BAUTISTA",
    characters: [
      {
        name: "bautista",
        source: require("../../../../Character Images/Chapter 8/Rianzares.png"),
        position: "left"
      },
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      }
    ],
    text: "Handa na ang dokumento. Kailangang marinig ito ng ating mga kababayan.",
    translation: "The document is ready. Our people must hear it.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png")
  },

  // Q2_8 here

  // ===========================================
  // SCENE 4: THE DECLARATION AT KAWIT
  // ===========================================

  {
    type: "scene",
    title: "The Declaration at Kawit",
    date: "June 12, 1898",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "windyFlag"
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious R.png"),
        position: "center"
      },
      {
        name: "crowd",
        source: require("../../../../Character Images/Chapter 5/cheeringcrowd.png"),
        position: "left"
      },
      {
        name: "crowd",
        source: require("../../../../Character Images/Chapter 5/cheeringcrowd.png"),
        position: "right"
      }
    ],
    text: "Ngayong araw, ipahahayag natin sa mundo ang kalayaang matagal nating ipinaglaban.",
    translation: "Today, we will proclaim to the world the freedom we have fought for so long.",
    background: require("../../../../Background Images/Part 8/Aguinaldo Shrine (with crowd, cannons, bells, flag).png"),
    unlock: ["Timeline_1898_06-12"]
  },

  {
    type: "dialogue",
    speaker: "AMBROSIO RIANZARES BAUTISTA",
    characters: [
      {
        name: "bautista",
        source: require("../../../../Character Images/Chapter 8/Rianzares.png"),
        position: "center"
      },
      {
        name: "crowd",
        source: require("../../../../Character Images/Chapter 5/cheeringcrowd.png"),
        position: "left"
      },
      {
        name: "crowd",
        source: require("../../../../Character Images/Chapter 5/cheeringcrowd.png"),
        position: "right"
      }
    ],
    text: "Mga kababayan, pakinggan ninyo ang pagpapahayag ng kalayaan ng ating bayan!",
    translation: "Compatriots, hear the proclamation of our country's independence!",
    background: require("../../../../Background Images/Part 8/Aguinaldo Shrine (with crowd, cannons, bells, flag).png"),
    unlock: ["bautista-2"]
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious R.png"),
        position: "center"
      },
      {
        name: "crowd",
        source: require("../../../../Character Images/Chapter 5/cheeringcrowd.png"),
        position: "left"
      },
      {
        name: "crowd",
        source: require("../../../../Character Images/Chapter 5/cheeringcrowd.png"),
        position: "right"
      }
    ],
    text: "Ito ang kalayaang pinangarap natin. Ngunit paano natin ito mapangangalagaan?",
    translation: "This is the freedom we dreamed of. But how will we protect it?",
    background: require("../../../../Background Images/Part 8/Aguinaldo Shrine (with crowd, cannons, bells, flag).png")
  },

  // Q1_8 here

  // ===========================================
  // SCENE 5: DICTATOR OR PRESIDENT?
  // ===========================================

  {
    type: "scene",
    title: "Dictator or President?",
    date: "June 23, 1898",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "chairSit"
  },

  {
    type: "dialogue",
    speaker: "APOLINARIO MABINI",
    characters: [
      {
        name: "mabini",
        source: require("../../../../Character Images/Chapter 8/Mabini.png"),
        position: "left"
      },
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      }
    ],
    text: "General, naipahayag na natin ang kalayaan. Anong uri ng pamahalaan ang itatayo natin?",
    translation: "General, we have declared independence. What kind of government will we build?",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png"),
    unlock: ["mabini-3"]
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      },
      {
        name: "mabini",
        source: require("../../../../Character Images/Chapter 8/Mabini.png"),
        position: "left"
      }
    ],
    text: "Marami pa tayong kalaban. Kailangan nating kumilos nang mabilis.",
    translation: "We still have many enemies. We must act quickly.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png")
  },

  {
    type: "dialogue",
    speaker: "APOLINARIO MABINI",
    characters: [
      {
        name: "mabini",
        source: require("../../../../Character Images/Chapter 8/Mabini.png"),
        position: "left"
      },
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      }
    ],
    text: "Kung walang malinaw na batas, paano natin mapoprotektahan ang bayan?",
    translation: "Without clear laws, how can we protect the country?",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png")
  },

  // ===========================================
  // CHOICE 8.2: BUILDING A GOVERNMENT
  // ===========================================

  {
    type: "choice",
    title: "Choice 8.2: You are Emilio Aguinaldo",
    question: "Mabini wants a government with clear laws and institutions.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png"),
    choices: [
      {
        text: "Accept Mabini's proposal.",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Sang-ayon ako. Bumuo tayo ng pamahalaang may malinaw na mga batas.",
        translation: "I agree. Let us build a government with clear laws.",
        characters: [
          {
            name: "mabini",
            source: require("../../../../Character Images/Chapter 8/Mabini.png"),
            position: "left"
          },
          {
            name: "aguinaldo",
            source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
            position: "right"
          }
        ]
      },
      {
        text: "Ask Mabini to explain first.",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Ipaliwanag mo muna ang plano. Kailangan kong maunawaan ang bawat hakbang.",
        translation: "Explain the plan first. I need to understand each step.",
        characters: [
          {
            name: "mabini",
            source: require("../../../../Character Images/Chapter 8/Mabini.png"),
            position: "left"
          },
          {
            name: "aguinaldo",
            source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
            position: "right"
          }
        ]
      }
    ]
  },

  {
    type: "narrator",
    text: "On June 23, Aguinaldo established a Revolutionary Government and became its president.",
    background: require("../../../../Background Images/Part 8/Aguinaldo's Kawit study (Acta and Mabini scenes).png"),
    unlock: ["Timeline_1898_06-23", "aguinaldo-5"]
  },

  // Q4_8 here

  // ===========================================
  // SCENE 6: THE SIEGE OF MANILA
  // ===========================================

  {
    type: "scene",
    title: "The Siege of Manila",
    date: "July to August 1898",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "marching"
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious R.png"),
        position: "center"
      }
    ],
    text: "Napapalibutan na natin ang Maynila. Bakit ayaw tayong papasukin ng mga Amerikano?",
    translation: "We have surrounded Manila. Why won't the Americans let us enter?",
    background: require("../../../../Background Images/Part 8/Siege of Manila 1898 trenches.png")
  },

  {
    type: "dialogue",
    speaker: "APOLINARIO MABINI",
    characters: [
      {
        name: "mabini",
        source: require("../../../../Character Images/Chapter 8/Mabini.png"),
        position: "left"
      },
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      }
    ],
    text: "Maaaring nais nilang sila lamang ang mamahala sa pagsuko ng mga Espanyol.",
    translation: "They may want to control the Spanish surrender themselves.",
    background: require("../../../../Background Images/Part 8/Siege of Manila 1898 trenches.png")
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      },
      {
        name: "mabini",
        source: require("../../../../Character Images/Chapter 8/Mabini.png"),
        position: "left"
      }
    ],
    text: "Kung hindi nila tayo kikilalanin ngayon, ano ang mangyayari sa ating kalayaan?",
    translation: "If they will not recognize us now, what will happen to our independence?",
    background: require("../../../../Background Images/Part 8/Siege of Manila 1898 trenches.png")
  },

  // ===========================================
  // CHOICE 8.3: THE FATE OF MANILA
  // ===========================================

  {
    type: "choice",
    title: "Choice 8.3: You are Emilio Aguinaldo",
    question: "American forces are preparing to capture Manila. What should you do?",
    background: require("../../../../Background Images/Part 8/Siege of Manila 1898 trenches.png"),
    choices: [
      {
        text: "Seek an agreement with the Americans.",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Makipag-usap tayo. Hindi natin kailangan ng panibagong kalaban.",
        translation: "Let us negotiate. We do not need another enemy.",
        characters: [
          {
            name: "aguinaldo",
            source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
            position: "center"
          }
        ]
      },
      {
        text: "Maintain the siege.",
        speaker: "EMILIO AGUINALDO",
        dialogue: "Ipagpatuloy ang pagkubkob. Dapat igalang ang karapatan ng ating bayan.",
        translation: "Continue the siege. Our people's rights must be respected.",
        characters: [
          {
            name: "aguinaldo",
            source: require("../../../../Character Images/Chapter 8/Emilio Serious R.png"),
            position: "center"
          }
        ]
      }
    ]
  },

  {
    type: "narrator",
    text: "On August 13, American forces captured Manila.\nFilipino troops were excluded from the surrender.",
    background: require("../../../../Background Images/Part 8/Siege of Manila 1898 trenches.png"),
    unlock: ["Timeline_1898_08-13_14"]
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious R.png"),
        position: "center"
      }
    ],
    text: "Tumulong tayong lumaban sa Espanya. Bakit tayo ngayon itinataboy?",
    translation: "We helped fight Spain. Why are we being pushed aside now?",
    background: require("../../../../Background Images/Part 8/Siege of Manila 1898 trenches.png")
  },

  // ===========================================
  // SCENE 7: THE TREATY OF PARIS
  // ===========================================

  {
    type: "scene",
    title: "The Treaty of Paris",
    date: "August to December 1898",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "chairSit"
  },

  {
    type: "dialogue",
    speaker: "APOLINARIO MABINI",
    characters: [
      {
        name: "mabini",
        source: require("../../../../Character Images/Chapter 8/Mabini.png"),
        position: "left"
      },
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      }
    ],
    text: "Nag-uusap ang Espanya at Amerika tungkol sa Pilipinas. Bakit wala tayong kinatawan?",
    translation: "Spain and America are discussing the Philippines. Why do we have no representative?",
    background: require("../../../../Background Images/Part 8/Treaty of Paris.png"),
    unlock: ["mckinley-1"]
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      },
      {
        name: "mabini",
        source: require("../../../../Character Images/Chapter 8/Mabini.png"),
        position: "left"
      }
    ],
    text: "Hindi ba dapat tayo ang magpasya sa ating kinabukasan?",
    translation: "Should we not decide our own future?",
    background: require("../../../../Background Images/Part 8/Treaty of Paris.png")
  },

  {
    type: "narrator",
    text: "On December 10, 1898, Spain ceded the Philippines to the\nUnited States through the Treaty of Paris.",
    background: require("../../../../Background Images/Part 8/Treaty of Paris.png"),
    unlock: ["Timeline_1898_12-10"]
  },

  {
    type: "dialogue",
    speaker: "APOLINARIO MABINI",
    characters: [
      {
        name: "mabini",
        source: require("../../../../Character Images/Chapter 8/Mabini.png"),
        position: "left"
      },
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "right"
      }
    ],
    text: "Ipinasa nila ang Pilipinas na para bang pag-aari nila ito. Paano natin hahayaang mangyari iyon?",
    translation: "They transferred the Philippines as though they owned it. How can we allow that?",
    background: require("../../../../Background Images/Part 8/Treaty of Paris.png"),
    unlock: ["Timeline_1898_12-21", "mckinley-2", "trias-3"]
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious R.png"),
        position: "center"
      }
    ],
    text: "Kung hindi nila kikilalanin ang ating kalayaan, patuloy natin itong ipagtatanggol.",
    translation: "If they will not recognize our independence, we will continue to defend it.",
    background: require("../../../../Background Images/Part 8/Treaty of Paris.png")
  },

  // T2_8 here

  // ===========================================
  // SCENE 8: SANTA MESA
  // ===========================================

  {
    type: "scene",
    title: "Santa Mesa",
    date: "February 4, 1899",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg"),
    sfx: "cannonFire"
  },

  {
    type: "dialogue",
    speaker: "APOLINARIO MABINI",
    characters: [
      {
        name: "mabini",
        source: require("../../../../Character Images/Chapter 8/Mabini.png"),
        position: "left"
      },
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious R.png"),
        position: "right"
      }
    ],
    text: "Lalong tumitindi ang tensyon sa paligid ng Maynila. Maiiwasan pa ba ang digmaan?",
    translation: "Tensions around Manila are growing. Can war still be avoided?",
    background: require("../../../../Background Images/Part 8/San Juan Bridge Sociego Street Feb 4 1899.png"),
    unlock: ["Timeline_1899_01-21"]
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious R.png"),
        position: "right"
      },
      {
        name: "mabini",
        source: require("../../../../Character Images/Chapter 8/Mabini.png"),
        position: "left"
      }
    ],
    text: "Sinabi nilang tutulong sila laban sa Espanya. Bakit tayo ngayon ang kanilang kinakalaban?",
    translation: "They said they would help fight Spain. Why are they now fighting us?",
    background: require("../../../../Background Images/Part 8/San Juan Bridge Sociego Street Feb 4 1899.png")
  },

  {
    type: "narrator",
    text: "On February 4, 1899, fighting broke out near Santa Mesa.\nThe Philippine-American War began.",
    background: require("../../../../Background Images/Part 8/San Juan Bridge Sociego Street Feb 4 1899.png"),
    unlock: ["Timeline_1899_02-04", "mabini-4", "mckinley-3"]
  },

  {
    type: "dialogue",
    speaker: "APOLINARIO MABINI",
    characters: [
      {
        name: "mabini",
        source: require("../../../../Character Images/Chapter 8/Mabini.png"),
        position: "left"
      },
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious R.png"),
        position: "right"
      }
    ],
    text: "Kung digmaan ang kanilang pinili, ano ang dapat nating ipaglaban ngayon?",
    translation: "If they have chosen war, what must we fight for now?",
    background: require("../../../../Background Images/Part 8/San Juan Bridge Sociego Street Feb 4 1899.png")
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    characters: [
      {
        name: "aguinaldo",
        source: require("../../../../Character Images/Chapter 8/Emilio Serious.png"),
        position: "center"
      }
    ],
    text: "Ang kalayaang ipinahayag natin. Hindi natin basta isusuko ang ating bayan.",
    translation: "The independence we declared. We will not simply surrender our country.",
    background: require("../../../../Background Images/Part 8/San Juan Bridge Sociego Street Feb 4 1899.png")
  },

  {
    type: "system",
    intro: true,
    text: "Independence had been declared, but the fight for freedom continued.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  // ===========================================
  // TIMELINE INTERACTION
  // ===========================================

  {
    type: "sortingtimeline"
  },

  // ===========================================
  // FINAL QUIZ
  // ===========================================

  {
    type: "scene",
    title: "Test Your Knowledge!",
    date: "How well do you remember the final chapter?",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "quiz",
    question: "What agreement led Aguinaldo and other leaders\nto go into exile in 1897?",
    options: [
      "Treaty of Paris",
      "Pact of Biak-na-Bato",
      "Naic Agreement",
      "Treaty of Manila"
    ],
    correctIndex: 1,
    unlock: ["remnant-part8-1"]
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
    correctIndex: 2,
    unlock: ["remnant-part8-2"]
  },

  {
    type: "quiz",
    question: "What happened on June 12, 1898?",
    options: [
      "The Battle of Manila was fought",
      "The Philippine flag was first designed",
      "Philippine independence\nwas declared in Kawit",
      "The Treaty of Paris was signed"
    ],
    correctIndex: 2,
    unlock: ["remnant-part8-3"]
  },

  {
    type: "quiz",
    question: "Who prepared and read the Act of the Declaration\nof Philippine Independence?",
    options: [
      "Emilio Jacinto",
      "Ambrosio Rianzares Bautista",
      "Mariano Trías",
      "Daniel Tirona"
    ],
    correctIndex: 1,
    unlock: ["remnant-part8-4"]
  },

  {
    type: "quiz",
    question: "What did the Treaty of Paris do in December 1898?",
    options: [
      "Spain recognized Philippine\nindependence",
      "Spain ceded the Philippines\nto the United States",
      "Aguinaldo became president\nof the United States",
      "The Philippine-American War ended"
    ],
    correctIndex: 1,
    unlock: ["remnant-part8-5"]
  },

  {
    type: "quiz",
    question: "What event marked the beginning of the\nPhilippine-American War?",
    options: [
      "The Declaration of Independence",
      "The Battle of Alapan",
      "The fighting near Santa\nMesa on February 4, 1899",
      "The signing of the Treaty of Paris"
    ],
    correctIndex: 2,
    unlock: ["remnant-part8-6"]
  },

  // ===========================================
  // ENDING: PAMANA
  // ===========================================

  {
    type: "scene",
    title: "Final Chapter Complete.",
    date: " ",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    text: "Generations of Filipinos fought for their homeland.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    text: "Their courage and sacrifices shaped the generations that followed.",
    background: require("../../../../Background Images/Usuals/ending.png")
  },

  {
    type: "system",
    intro: true,
    text: "From Sulayman and Lakan Dula to Dagohoy, Rizal, Bonifacio, and Aguinaldo.",
    background: require("../../../../Background Images/Usuals/Aurafarmers.png")
  },

  {
    type: "system",
    intro: true,
    text: "That is pamana: what one generation leaves behind, and what the next chooses to carry forward.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "system",
    intro: true,
    text: "Their story is now part of yours.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "scene",
    title: "PAMANA:",
    date: "Chronicles of Philippine History",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  }

];
