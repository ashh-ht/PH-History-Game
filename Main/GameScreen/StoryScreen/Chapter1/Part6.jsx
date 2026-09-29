export const Chapter1_Part6 = [

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "The Revolution had begun, but the first battles had come at a heavy cost."
  },

  {
    type: "system",
    intro: true,
    background: require("../../../../Background Images/Usuals/Black Background.jpg"),
    text: "As the fighting spread to Cavite, a new question began to emerge: who would lead?"
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 1
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Sword of War",
    date: "August 24–30, 1896",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/San Mateo Rizal 1896 revolution.png"),
    text: "The Revolution has now begun, but its first attacks have already shown how\ndifficult the fight against Spain will be."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/San Mateo Rizal 1896 revolution.png"),
    text: "Bonifacio's forces have suffered heavy losses, and Governor-General Ramón\nBlanco has placed eight provinces under a state of war."
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 2
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Rise of Cavite",
    date: "Autumn 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Cavite revolution 1896 plaza.png"),
    text: "While Bonifacio's forces struggle around Manila, the revolution gains ground in Cavite."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Cavite revolution 1896 plaza.png"),
    text: "Revolutionary forces capture Spanish positions and take control of several towns.\nBut their victories also bring an old problem into the open: who should lead?"
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), outside.png"),
    text: "Two factions emerge. The Magdiwang, led by Mariano Álvarez,\nremains closely aligned with Bonifacio."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), outside.png"),
    text: "The Magdalo, led by Baldomero Aguinaldo, is gaining influence\nunder his cousin Emilio Aguinaldo."
  },

  {
    type: "dialogue",
    speaker: "MARIANO ÁLVAREZ",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), inside.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Alvarez.png"),
        position: "center"
      }
    ],
    text: "Tell the Supremo that Cavite still stands with the Katipunan. We may have\nour own forces here, but we fight for the same cause."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), outside.png"),
    text: "As Spanish reinforcements arrive, the rivalry between the two factions\nmakes cooperation increasingly difficult."
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 3
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "Remembering Dr. José Rizal",
    date: "December 30, 1896",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Rizal execution.png"),
    text: "Months earlier, José Rizal had been arrested and exciled for his\nalleged connection to the revolution."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Rizal execution.png"),
    text: "On December 30, 1896, Rizal is executed at Bagumbayan."
  },

  {
    type: "dialogue",
    speaker: "DR. JOSÉ RIZAL",
    background: require("../../../../Background Images/Part 6/Rizal execution.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Rizal.png"),
        position: "center"
      }
    ],
    text: "Consummatum est.",
    translation: "It is finished."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Rizal execution.png"),
    text: "His death shocks Filipinos across the colony. Rizal becomes a powerful symbol\nof the growing struggle against Spanish rule."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Rizal execution.png"),
    text: "To this day, Rizal is remembered each year on December 30 as a national hero\nand a symbol of the Filipino people's fight for freedom."
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 4
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Naic Letter",
    date: "Early 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Naik camp hut interior.png"),
    text: "By early 1897, Bonifacio is in Cavite, trying to deal with the growing\nconflict between the Magdiwang and Magdalo factions."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Naik camp hut interior.png"),
    text: "From Naic, he writes to Emilio Jacinto about an alleged offer of amnesty\nand the possibility of negotiations."
  },

  {
    type: "dialogue",
    speaker: "ANDRÉS BONIFACIO",
    background: require("../../../../Background Images/Part 6/Naik camp hut interior.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Bonifacio.png"),
        position: "right"
      }
    ],
    text: "Emilio, may alok daw ng amnestiya. Pero kung pagsuko ang kapalit,\nhindi natin basta matatanggap iyon.",
    translation: "Emilio, there's supposedly an offer of amnesty. But if surrender is the price,\nwe can't simply accept it."
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 6.1
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "choice",
    title: "Choice 6.1: You are Emilio Aguinaldo",
    background: require("../../../../Background Images/Part 6/Naik camp hut interior.png"),
    question: "Father Pio Pi offers a full pardon if you surrender, but you want to know\nwhether real terms can be negotiated.",
    choices: [
      {
        text: "Contact the Magdiwang leaders first without telling Bonifacio.",
        speaker: "EMILIO AGUINALDO",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
            position: "right"
          }
        ],
        dialogue: "Huwag munang sabihin kay Bonifacio. Kailangan nating maghanda,\nhindi lamang siya.",
        translation: "Don't tell Bonifacio yet. We need to prepare too, not just him."
      },

      {
        text: "Bring the offer to Bonifacio and discuss it openly.",
        speaker: "EMILIO AGUINALDO",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
            position: "right"
          }
        ],
        dialogue: "Hindi ako makikipagkasundo nang lihim, Supremo. Ito ang alok nila.\nPag-usapan natin.",
        translation: "I won't make a secret deal, Supremo. Here's their offer. Let's discuss it."
      }
    ],
    nextScene: 23
  },


  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Naik camp hut interior.png"),
    text: "The offer does not resolve the deeper conflict between the revolutionary factions.\nCavite's leaders continue to build separate centers of support."
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 5
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Question of Loyalty",
    date: "Early 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), outside.png"),
    text: "As Spanish forces put more pressure on Cavite, Emilio Aguinaldo pushes\nfor a more unified command."
  },

  {
    type: "dialogue",
    speaker: "EMILIO AGUINALDO",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), inside.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Aguinaldo.png"),
        position: "left"
      }
    ],
    text: "Kailangan natin ng iisang utos, Don Mariano. Hindi tayo mananalo\nkung hati-hati tayo.",
    translation: "We need one command, Don Mariano. We won't win if we're divided."
  },

  {
    type: "dialogue",
    speaker: "MARIANO ÁLVAREZ",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), inside.png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Alvarez.png"),
        position: "right"
      }
    ],
    text: "Ang aking utos ay galing sa Supremo. Hindi ako maaaring sumunod sa\ndalawang pinuno nang sabay.",
    translation: "My orders come from the Supremo. I can't follow two leaders at once."
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 6.2
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "choice",
    title: "Choice 6.2: You are Mariano Álvarez",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), inside.png"),
    question: "Aguinaldo wants a unified command in Cavite, but you remain loyal to Bonifacio.",
    choices: [
      {
        text: "Keep your forces under Bonifacio's authority.",
        speaker: "MARIANO ÁLVAREZ",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Alvarez.png"),
            position: "right"
          }
        ],
        dialogue: "Mananatili ako sa panig ng Supremo. Hindi ko siya tatalikuran ngayon.",
        translation: "I will remain on the Supremo's side. I won't turn against him now."
      },

      {
        text: "Agree to cooperate in battle without giving up your command.",
        speaker: "MARIANO ÁLVAREZ",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Alvarez.png"),
            position: "right"
          }
        ],
        dialogue: "Maaari tayong magtulungan sa labanan, pero mananatili sa akin\nang aking mga tauhan.",
        translation: "We can fight together, but my men will remain under my command."
      }
    ],
    nextScene: 29
  },

  // CONTINUE

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Magdiwang HQ (Noveleta), outside.png"),
    text: "The two factions continue working side by side when necessary, but the\nrivalry between them remains."
  },



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SCENE 6
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "scene",
    title: "The Breaking Point in Tanza",
    date: "Early 1897",
    background: require("../../../../Background Images/Usuals/Brown Background.jpg")
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/st augustine church tanza (surrender scene).png"),
    text: "Spanish forces continue their advance through Cavite, putting the revolutionary\nforces under increasing pressure."
  },

  {
    type: "dialogue",
    speaker: "DANIEL TIRONA",
    background: require("../../../../Background Images/Part 6/st augustine church tanza (surrender scene).png"),
    characters: [
      {
        source: require("../../../../Character Images/Temporary Placeholders/Tirona.png"),
        position: "left"
      }
    ],
    text: "Wala na tayong sapat na armas. Kung magpapatuloy tayo, baka\nlalo lang tayong malugi.",
    translation: "We don't have enough weapons. If we keep going, we may only lose more."
  },

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // CHOICE 6.3
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  {
    type: "choice",
    title: "Choice 6.3: You are Daniel Tirona",
    background: require("../../../../Background Images/Part 6/st augustine church tanza (surrender scene).png"),
    question: "Spanish forces are pushing deeper into Cavite.\nYour men are exhausted and short on weapons.",
    choices: [
      {
        text: "Surrender and save the men who are left.",
        speaker: "DANIEL TIRONA",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Tirona.png"),
            position: "right"
          }
        ],
        dialogue: "Ibaba na natin ang mga armas. Hindi ko hahayaang mamatay\npa ang mga natitira.",
        translation: "Lay down your weapons. I won't let the men who remain die."
      },

      {
        text: "Hold your position a little longer and look for a way out.",
        speaker: "DANIEL TIRONA",
        characters: [
          {
            source: require("../../../../Character Images/Temporary Placeholders/Tirona.png"),
            position: "right"
          }
        ],
        dialogue: "Maghintay pa tayo nang kaunti. Baka makahanap pa tayo\nng paraan para makaalis.",
        translation: "Let's hold on a little longer. We may still find a way out."
      }
    ],
    nextScene: 34
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/st augustine church tanza (surrender scene).png"),
    text: "The situation in Cavite grows more desperate. Revolutionary forces retreat from the\nadvancing Spanish army, and the struggle over leadership becomes harder to ignore."
  },

  {
    type: "narrator",
    background: require("../../../../Background Images/Part 6/Cavite revolution 1896 plaza.png"),
    text: "The revolution has survived its first months, but defeating Spain is only one challenge.\nThe revolutionaries must also decide who will lead them."
  },


  {
    type: "scene",
    title: "Defeating spain is only one challenge.",
    date: "The revolutionaries must also decide who will lead them.",
    background: require("../../../../Background Images/Usuals/Black Background.jpg")
  },


];