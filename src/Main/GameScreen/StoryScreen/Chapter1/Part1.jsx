//Guideline for formatting:
//   { type: "system", text }
//   { type: "scene", title, date } (this is not shown, might use it for saving progress idk yet)
//   { type: "narrator", text }
//   { type: "dialogue", speaker, characters, text, translation(if applicable) }
//   { type: "choice", title, question, choices: [{ text, speaker, dialogue, translation }], nextScene }

//Note: waley pa background images, pwde ilagay source here just write:
//background: require("../../../../assets/background/idk.png")

export const Chapter1_Part1 = [
  {
    type: "system",
    text: "Your fingers slide across the old parchment of the heavy book. The text fades as a vivid, painted landscape of 1565 Samar appears..."
  },
  {
    type: "scene",
    title: "Scene 1 — Cibabao, Samar",
    date: "February 13, 1565"
  },
  {
    type: "narrator",
    text: "After weeks at sea, five Spanish ships under General Miguel López de Legazpi drop anchor off Cibabao, Samar. The local people gather along the shore, watching the huge foreign sails with careful eyes."
  },
  {
    type: "narrator",
    text: "Ferdinand Magellan had visited these islands back in 1521, but he didn't stay. Now Spain sends Legazpi to try again — this time, to build something permanent."
  },
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    characters: [
      { source: require("../../../../../assets/characters/legazpi.png"), position: "center" }
    ],
    text: "We have finally arrived. As the King ordered, we will speak with the local people peacefully first. We come to talk, not to fight. Bring out the gifts."
  },
  {
    type: "narrator",
    text: "From the treeline, the people of Samar watch closely. They've heard stories about foreign ships before, and they're not sure yet whether these visitors mean peace or trouble."
  },
  {
    type: "dialogue",
    speaker: "FRANCISCO GOMEZ",
    characters: [
      { source: require("../../../../../assets/characters/francisco_gomez.png"), position: "left" }
    ],
    text: "Peace! We'd like to offer a sandugo — a blood compact — as a sign of friendship."
  },
  {
    type: "narrator",
    text: "A warrior steps out from the trees, spear in hand, and blocks Gomez's path — not attacking, just making it very clear: not yet."
  },
  {
    type: "choice",
    title: "Choice 1.1 — You are a Chieftain of Samar",
    question: "A Spanish sailor has offered a blood compact. Your people aren't sure yet whether to trust these strangers.",
    choices: [
      {
        text: "Turn him away for now.",
        speaker: "CHIEFTAIN",
        dialogue: "Hindi pa kami handa. Umalis muna kayo.",
        translation: "We are not ready yet. Please leave for now."
      },
      {
        text: "Hear him out, but keep your guard up.",
        speaker: "CHIEFTAIN",
        dialogue: "Makinig muna tayo — pero mag-ingat.",
        translation: "Let's listen first — but stay careful."
      }
    ],
    nextScene: 9
  },
  {
    type: "narrator",
    text: "No lasting Spanish settlement is built in Samar. Legazpi's ships continue on toward Leyte and Bohol, just as they really did."
  },
  {
    type: "scene",
    title: "Scene 2 — Formal Claims & Island Hopping",
    date: "February 15 – April 1565"
  },
  {
    type: "narrator",
    text: "A couple of days later, Legazpi lands on a quiet stretch of shore to formally claim the territory for Spain."
  },
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    characters: [
      { source: require("../../../../../assets/characters/legazpi.png"), position: "right" }
    ],
    text: "Let this cross mark the start of our mission here, in the name of King Philip II."
  },
  {
    type: "narrator",
    text: "On Spanish maps, Samar now belongs to the empire — though Legazpi hasn't won a single town's trust yet."
  },
  {
    type: "narrator",
    text: "The fleet continues through the Visayas. Food is scarce in Leyte, but in Bohol, something different happens: real friendship."
  },
  {
    type: "narrator",
    text: "In Bohol, Legazpi meets Datu Sikatuna. His respectful manner earns the chief's trust, and the two seal a sacred sandugo."
  },
  {
    type: "dialogue",
    speaker: "DATU SIKATUNA",
    characters: [
      { source: require("../../../../../assets/characters/datu_sikatuna.png"), position: "left" }
    ],
    text: "Take this cup. Our blood is now one — a promise between us. If you're looking for Cebu, the great trading port, sail west. But be careful — Rajah Tupas is proud, and he guards his shores fiercely."
  },
  {
    type: "scene",
    title: "Scene 3 — The Ultimatum in Cebu",
    date: "April 27, 1565"
  },
  {
    type: "narrator",
    text: "Forty-four years after Magellan's fleet passed through nearby Mactan, Legazpi's ship enters Cebu's harbor. Rajah Tupas stands on the shore with more than two thousand warriors behind him."
  },
  {
    type: "dialogue",
    speaker: "RAJAH TUPAS",
    characters: [
      { source: require("../../../../../assets/characters/rajah_tupas.png"), position: "right" }
    ],
    text: "Sino kayo at bakit kayo naririto sa aming isla? Hindi ako pumapayag sa inyong pakikipag-usap!",
    translation: "Who are you, and why are you here on our island? I do not agree to your terms!"
  },
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    characters: [
      { source: require("../../../../../assets/characters/legazpi.png"), position: "left" }
    ],
    text: "Rajah Tupas, I am Miguel López de Legazpi. We don't wish to repeat old conflicts. I'll give you three days to consider a peace agreement. My men are hungry, and I hope we can find a way to share this port peacefully."
  },
  {
    type: "choice",
    title: "Choice 1.2 — You are Rajah Tupas of Cebu",
    question: "The three-day deadline is almost up. Spanish messengers come ashore one more time to ask for peace.",
    choices: [
      {
        text: "Refuse, and retreat to the mountains to prepare.",
        speaker: "RAJAH TUPAS",
        dialogue: "Magtago kayo sa itaas ng bundok. Ipagtanggol natin ang ating lupain.",
        translation: "Hide up in the mountains. Let's defend our land."
      },
      {
        text: "Send a messenger to ask for more time first.",
        speaker: "RAJAH TUPAS",
        dialogue: "Ipadala ninyo ang aking sagot — hihingi tayo ng karagdagang panahon.",
        translation: "Send my answer — we will ask for more time."
      }
    ],
    nextScene: 23
  },
  {
    type: "narrator",
    text: "Tupas and his people leave the village and move to safety in the hills. Legazpi's forces take the empty village and begin building a settlement there."
  },
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    characters: [
      { source: require("../../../../../assets/characters/legazpi.png"), position: "right" }
    ],
    text: "We offered peace, and I wish this could have gone differently. Still — we must survive. We'll build our settlement here, and call it Villa de Santísimo Nombre de Jesús."
  },
  {
    type: "narrator",
    text: "The years that follow are hard for everyone. Food is scarce, there are disagreements within the Spanish camp, and Rajah Tupas and his people keep their distance from the new settlement for a long time. It will take years before things settle down."
  },
  {
    type: "narrator",
    text: "The next day, a sailor named Juan de Camus is exploring the quiet village when he finds something surprising in an untouched hut."
  },
  {
    type: "dialogue",
    speaker: "JUAN DE CAMUS",
    characters: [
      { source: require("../../../../../assets/characters/juan_de_camus.png"), position: "left" }
    ],
    text: "Señor General! Look what I found!"
  },
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    characters: [
      { source: require("../../../../../assets/characters/legazpi.png"), position: "right" }
    ],
    text: "The Santo Niño... left behind by Magellan's crew, forty-four years ago. It's still here, safe."
  },
  {
    type: "narrator",
    text: "Ground is broken for Fort San Pedro. Cebu becomes Spain's first lasting settlement in the islands — though it takes years of hard work, patience, and hardship before it's truly stable."
  },
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    characters: [
      { source: require("../../../../../assets/characters/legazpi.png"), position: "right" }
    ],
    text: "We can't keep surviving on so little. We should move the settlement to the richer lands of Panay, where there's more food."
  },
  {
    type: "narrator",
    text: "The settlement moves to the Panay River. Life is steadier there. Traders speak of a wealthy, walled city to the north: Maynila."
  },
  {
    type: "dialogue",
    speaker: "MIGUEL LÓPEZ DE LEGAZPI",
    characters: [
      { source: require("../../../../../assets/characters/legazpi.png"), position: "right" }
    ],
    text: "I'd like you and my grandson, Juan de Salcedo, to sail north to Manila. Try friendship and alliance first. That's always our first choice."
  },
  {
    type: "system",
    text: "Turn the page to Chapter 1, Part 2, to follow Goiti and Salcedo's journey north to Maynila..."
  },
  {
    type: "scene",
    title: "Scene 4 — The Sandugo of Manila",
    date: "June 1571"
  },
  {
    type: "narrator",
    text: "After early tensions with Rajah Sulayman's forces, Legazpi arrives in Manila Bay in June 1571 with a large fleet. Sensing how serious the danger is, Lakan Dula of Tondo steps in to help find a peaceful path forward."
  },
  {
    type: "dialogue",
    speaker: "LAKAN DULA",
    characters: [
      { source: require("../../../../../assets/characters/lakan_dula.png"), position: "left" }
    ],
    text: "Aking pamangkin, tingnan mo ang kanilang mga barko at armas. Kung lalabanan natin sila nang tuwiran, mawawala lahat sa atin. Makipag-usap tayo, para maligtas ang ating mga barangay.",
    translation: "My nephew, look at their ships and weapons. If we fight them head-on, we could lose everything. Let's talk, to protect our people."
  },
  {
    type: "choice",
    title: "Choice 1.3 — You are Rajah Sulayman",
    question: "Legazpi has arrived with a large force. Your uncle is urging you to talk instead of fight.",
    choices: [
      {
        text: "Agree right away and go speak with Legazpi.",
        speaker: "RAJAH SULAYMAN",
        dialogue: "Sige, tito. Susubukan nating makipag-usap.",
        translation: "Alright, uncle. Let's try talking."
      },
      {
        text: "Hesitate at first, but let your uncle keep making his case.",
        speaker: "RAJAH SULAYMAN",
        dialogue: "Hindi ako sigurado, tito... pero sabihin mo pa ang iyong plano.",
        translation: "I'm not sure, uncle... but tell me more of your plan."
      }
    ],
    nextScene: 39
  },
  {
    type: "narrator",
    text: "Sulayman agrees to talk before things get worse. He and Legazpi's people seal the peace with a sandugo."
  },
  {
    type: "narrator",
    text: "Manila is spared from further conflict. On June 24, 1571, Legazpi declares it the capital of a new colony. Local leaders and their families remain part of the community — their story isn't over. It will continue for centuries, all the way to the fight for independence yet to come."
  },

  // ---- MINIGAMES / CHAPTER REVIEW ----
  {
    type: "system",
    text: "The warm study fades. The old parchment turns to a new page, showing the shores of Cebu once more..."
  },
  {
    type: "system",
    text: "Chapter Review: Let's test what we've learned!"
  },
  {
    type: "system",
    text: "Did You Know? The famous statue of the Santo Niño (Child Jesus), left behind by Magellan's crew in 1521, was found safe in a hut in Cebu when the Spanish arrived in 1565 — 44 years later!"
  },
  {
    type: "quiz",
    question: "Who discovered the Philippine islands in 1521 but was unable to rule them?",
    options: [
      "Miguel López de Legazpi",
      "Ferdinand Magellan",
      "Juan de Salcedo",
      "Lakan Dula"
    ],
    correctIndex: 1 // Ferdinand Magellan
  },
  {
    type: "quiz",
    question: "Two days after landing, what did Legazpi plant on a quiet beach to officially claim the islands for the Spanish Empire?",
    options: [
      "A stone castle wall",
      "A tall wooden cross and the Spanish flag",
      "A row of coconut trees",
      "A brass cannon pointing at the sea"
    ],
    correctIndex: 1 // A tall wooden cross and the Spanish flag
  },
  {
    type: "quiz",
    question: "It is an old Filipino tradition where two people each cut their arm, mixed a drop of blood with wine, and drank it together as a sign of trust and friendship.",
    options: [
      "Revolution",
      "Blood Compact (Sanduguan)",
      "Panata",
      "Kamustahan"
    ],
    correctIndex: 1 // Blood Compact
  },
  {
    type: "quiz",
    question: "Who was the brave, young ruler of Manila who fiercely guarded his wooden fortress with bronze cannons?",
    options: [
      "Lakan Dula",
      "Rajah Sulayman",
      "Rajah Tupas",
      "Datu Sikatuna"
    ],
    correctIndex: 1 // Rajah Sulayman
  },
  {
    type: "quiz",
    question: "Who is the Spanish explorer that sailed to the Philippines in 1565?",
    options: [
      "Ferdinand Magellan",
      "Sikatuna",
      "Miguel Lopez de Legazpi",
      "Jose Rizal"
    ],
    correctIndex: 2 // Miguel Lopez de Legazpi
  },
  {
    type: "system",
    text: "Fun Fact! Legazpi's grandson, Juan de Salcedo, was only 21 years old when he was sent on the dangerous mission to explore and map the rugged terrain of northern Luzon."
  },
  {
    type: "system",
    text: "Did You Know? The Spanish forces conquered Luzon much faster than the southern islands of Mindanao because Luzon had a weaker Islamic influence to politically unify its native kingdoms."
  },
  {
    type: "quiz",
    question: "Who was the wise, elderly chieftain of Tondo who stepped in to stop the war and convinced his nephew Sulayman to negotiate peace with Legazpi?",
    options: [
      "Datu Sikatuna",
      "Lakan Dula",
      "Rajah Tupas",
      "Datu Urrao"
    ],
    correctIndex: 1 // Lakan Dula
  },
  {
    type: "system",
    text: "Turn the page to Chapter 1, Part 2..."
  }
];