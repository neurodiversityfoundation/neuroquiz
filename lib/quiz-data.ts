export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Title tiers based on percentage of correct answers (out of 20)
export interface TitleTier {
  title: string;
  subtitle: string;
  description: string;
  minPct: number;
}

export const TITLE_TIERS: TitleTier[] = [
  {
    title: "Expert",
    subtitle: "Neurodiversity Language Expert",
    description:
      "You answered every question correctly — a perfect score. Your command of neurodiversity language is exceptional. The words neurodivergent, neurodiverse, and neurodiversity are tools you use with precision and care.",
    minPct: 100,
  },
  {
    title: "Knowledgeable Person",
    subtitle: "Knowledgeable in Neurodiversity Language",
    description:
      "You answered 90–99% of questions correctly — an outstanding result. You have a strong, nuanced grasp of these terms and their distinctions. A little more practice and you'll reach perfect mastery.",
    minPct: 90,
  },
  {
    title: "Intermediate",
    subtitle: "Intermediate Level in Neurodiversity Language",
    description:
      "You answered 60–89% of questions correctly — a solid performance. You understand the core distinctions and are building real fluency. Revisiting a few edge cases will sharpen your precision further.",
    minPct: 60,
  },
  {
    title: "Beginner",
    subtitle: "Beginner in Neurodiversity Language",
    description:
      "You answered fewer than 60% of questions correctly — a great start on your learning journey. The distinctions between neurodivergent, neurodiverse, and neurodiversity take time to internalise. Keep going!",
    minPct: 0,
  },
];

export function getTitleForScore(correctCount: number): TitleTier {
  const pct = (correctCount / TOTAL_ROUNDS) * 100;
  return TITLE_TIERS.find((t) => pct >= t.minPct) ?? TITLE_TIERS[TITLE_TIERS.length - 1];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "Word Usage",
    question: "A psychiatrist says: 'Our clinic serves a neurodiverse caseload.' Is this sentence correct?",
    options: [
      "No — neurodiverse can only describe individuals",
      "Yes — neurodiverse correctly describes a group containing different brain types",
      "No — the correct word here is neurodivergent",
      "Yes — neurodiverse and neurodivergent mean exactly the same thing",
    ],
    correctIndex: 1,
    explanation:
      "'Neurodiverse' correctly applies to a group or population that includes varied neurotypes. Just as 'diverse' describes a varied group, 'neurodiverse' signals that the group as a whole contains different brain types.",
  },
  {
    id: 2,
    category: "Word Usage",
    question: "A conference speaker says: 'She identifies as neurodiverse.' Is this correct?",
    options: [
      "Yes — neurodiverse is the standard individual label",
      "Yes — any neurodiversity-related term may be used interchangeably",
      "No — a single person cannot be neurodiverse; the correct individual label is neurodivergent",
      "No — individuals should only use diagnostic terms like 'autistic'",
    ],
    correctIndex: 2,
    explanation:
      "A single person cannot be neurodiverse — that would be like saying one person is 'diverse.' The individual opt-in label is 'neurodivergent,' meaning one's neurotype diverges from the most common (neurotypical) pattern.",
  },
  {
    id: 3,
    category: "Neurodiversity",
    question: "Which statement best captures what 'Neurodiversity' (as a concept) refers to?",
    options: [
      "The medical classification of brain-based disorders",
      "The observable fact that human brains differ in how they operate and develop",
      "A movement that opposes all psychiatric diagnosis",
      "A synonym for intellectual disability",
    ],
    correctIndex: 1,
    explanation:
      "Neurodiversity is a descriptive concept — it refers to the natural variation in how human brains function, just as biodiversity refers to variety in life. It is a value-neutral observation, not a diagnosis or movement label.",
  },
  {
    id: 4,
    category: "Word Usage",
    question: "A researcher writes: 'The neurodivergent brain processes information differently.' Is the term used correctly?",
    options: [
      "Yes — neurodivergent here refers correctly to an individual whose neurotype diverges from neurotypical",
      "No — neurodivergent can only be used by autistic people",
      "No — the sentence should say neurodiverse brain",
      "Yes — but only if the person has a formal diagnosis",
    ],
    correctIndex: 0,
    explanation:
      "'Neurodivergent' correctly describes an individual (or their brain) whose neurotype diverges from the neurotypical norm. It does not require a specific diagnosis — it is an opt-in identity label encompassing various less common neurotypes.",
  },
  {
    id: 5,
    category: "Neurodiversity",
    question: "Neurodiversity as a concept was popularised by sociologist Judy Singer in the late 1990s. What was its original purpose?",
    options: [
      "To replace all diagnostic categories with a single umbrella term",
      "To reframe neurological differences as natural human variation rather than purely deficits",
      "To argue that neurodivergent people do not need clinical support",
      "To describe only the autistic population",
    ],
    correctIndex: 1,
    explanation:
      "Judy Singer introduced 'neurodiversity' to shift the framing of conditions like autism from purely deficit-based to one that recognises natural human neurological variation. It does not deny the need for support, nor does it apply only to autism.",
  },
  {
    id: 6,
    category: "Word Usage",
    question: "A hospital policy reads: 'All neurodivergent patients should be offered adjustments.' Is this usage correct?",
    options: [
      "No — neurodivergent cannot be used in formal clinical documents",
      "No — the policy should say neurodiverse patients",
      "Yes — neurodivergent correctly refers to individuals whose neurotypes diverge from neurotypical",
      "Yes — but only if patients have self-identified with the label",
    ],
    correctIndex: 2,
    explanation:
      "'Neurodivergent' is the correct individual-level descriptor here. Saying 'neurodiverse patients' would be incorrect because neurodiverse applies to a group with varied neurotypes, not to individual patients within that group.",
  },
  {
    id: 7,
    category: "Neurotypical",
    question: "What does 'neurotypical' mean in the neurodiversity framework?",
    options: [
      "A person with above-average cognitive ability",
      "A person whose neurological development follows the most common pattern",
      "A person without any mental health history",
      "A person who supports the neurodiversity movement",
    ],
    correctIndex: 1,
    explanation:
      "'Neurotypical' describes individuals whose neurological development and functioning aligns with what is statistically most common or socially expected. It is the counterpart to 'neurodivergent' and is not a value judgement.",
  },
  {
    id: 8,
    category: "Word Usage",
    question: "A team leader says: 'Our team is neurodivergent — we have ADHD, autistic, and dyslexic members.' Is this correct?",
    options: [
      "Yes — a group of neurodivergent individuals can be called neurodivergent",
      "No — the correct word for a varied group is neurodiverse",
      "Yes — neurodivergent and neurodiverse mean the same at group level",
      "No — the team should be described as neurologically diverse",
    ],
    correctIndex: 1,
    explanation:
      "A group that contains varied neurotypes is 'neurodiverse,' not 'neurodivergent.' Neurodivergent is an individual label. Calling the team neurodiverse correctly signals the mixture of neurotypes present.",
  },
  {
    id: 9,
    category: "Neurodiversity",
    question: "Which of the following is consistent with the neurodiversity paradigm?",
    options: [
      "ADHD and autism are disorders that should always be treated to eliminate the underlying traits",
      "Neurological differences may require support but are not inherently deficits that need to be 'cured'",
      "Neurodivergent people never benefit from medication",
      "Neurodiversity only applies to autism spectrum conditions",
    ],
    correctIndex: 1,
    explanation:
      "The neurodiversity paradigm holds that brain differences are part of natural human variation. This is compatible with offering support, therapy, or medication for disabling aspects — but rejects the idea that the neurotype itself must be eliminated.",
  },
  {
    id: 10,
    category: "Word Usage",
    question: "An article headline reads: 'Neurodiversity in the Workplace Is Rising.' What does this most likely mean?",
    options: [
      "More neurodivergent individuals are entering the workforce",
      "The concept of neurodiversity itself is increasing",
      "Companies are creating more neurotypical roles",
      "Neurodiverse brains are evolving more quickly",
    ],
    correctIndex: 0,
    explanation:
      "When used in headlines like this, 'neurodiversity' is often used colloquially to mean the presence of neurodivergent individuals. Strictly speaking, neurodiversity (natural brain variation) doesn't rise — what rises is recognition of, or representation by, neurodivergent people.",
  },
  {
    id: 11,
    category: "Word Usage",
    question: "A parent says: 'My child is neurodivergent — they have ADHD and dyslexia.' Is this correct?",
    options: [
      "No — neurodivergent can only describe autistic people",
      "Yes — the child's neurotypes diverge from the neurotypical norm",
      "No — having two diagnoses means the child is neurodiverse",
      "Yes — but only if the child self-identifies with the label",
    ],
    correctIndex: 1,
    explanation:
      "'Neurodivergent' applies to any individual whose neurotype diverges from neurotypical, regardless of which specific neurotype(s) are involved. It is not exclusive to autism. The parent is using the term correctly.",
  },
  {
    id: 12,
    category: "Opt-in Label",
    question: "Why is 'neurodivergent' described as an opt-in label?",
    options: [
      "Because it requires formal psychiatric diagnosis before use",
      "Because it is only valid after age 18",
      "Because individuals choose whether to adopt it as part of their identity — it is not assigned by clinicians",
      "Because it is only used in academic research contexts",
    ],
    correctIndex: 2,
    explanation:
      "'Neurodivergent' is an opt-in identity label — people choose whether it resonates with their sense of self. A clinician may diagnose ADHD, but it is up to the individual whether they identify as neurodivergent. This respects personal agency.",
  },
  {
    id: 13,
    category: "Word Usage",
    question: "A clinical study reports: 'Subjects were selected from a neurodiverse population.' Is this accurate?",
    options: [
      "No — you cannot use neurodiverse in research; use diagnostic terms only",
      "Yes — neurodiverse correctly signals the study population included varied neurotypes",
      "No — neurodiverse is only used in advocacy contexts",
      "Yes — neurodiverse means the same as neurodivergent in academic writing",
    ],
    correctIndex: 1,
    explanation:
      "In a research context, 'neurodiverse population' correctly indicates that the group included participants with varied neurotypes. It is accurate and appropriate to use neurodiverse when referring to a group — not an individual.",
  },
  {
    id: 14,
    category: "Neurodiversity",
    question: "Which neurotypes are most commonly included under the neurodivergent umbrella?",
    options: [
      "Only autism and ADHD",
      "Only conditions with a genetic cause",
      "A broad range including autism, ADHD, dyslexia, dyscalculia, dyspraxia, Tourette syndrome, and others",
      "Any condition listed in the DSM-5",
    ],
    correctIndex: 2,
    explanation:
      "The neurodivergent umbrella is broad and includes autism, ADHD, dyslexia, dyscalculia, dyspraxia, Tourette syndrome, and often conditions like anxiety and depression when they constitute a person's primary neurotype. It is community-defined, not DSM-defined.",
  },
  {
    id: 15,
    category: "Word Usage",
    question: "A journalist writes: 'The neurodiversity of the panel made for a rich discussion.' Is this correct?",
    options: [
      "Yes — neurodiversity here refers to the varied neurotypes represented on the panel",
      "No — they should have written the neurodivergence of the panel",
      "No — neurodiversity can only describe scientific concepts, not social situations",
      "Yes — neurodiversity means the same as diversity in all contexts",
    ],
    correctIndex: 0,
    explanation:
      "'Neurodiversity of the panel' is a natural and correct use — it refers to the variety of neurotypes present. This is the group-level use of the term. 'Neurodivergence' would refer to the state of being neurodivergent, which is a different noun.",
  },
  {
    id: 16,
    category: "Word Usage",
    question: "Which sentence uses all three terms correctly?",
    options: [
      "'She is neurodiverse; her team is neurodivergent; neurodiversity explains it all.'",
      "'She is neurodivergent; her team is neurodiverse; neurodiversity refers to the natural variation in brain function.'",
      "'She is neurodiversity; her team is neurodiverse; being neurodivergent is a diagnosis.'",
      "'She is neurodiverse and neurodivergent; her team practices neurodiversity.'",
    ],
    correctIndex: 1,
    explanation:
      "The correct usage: neurodivergent = individual label for someone whose neurotype diverges from neurotypical; neurodiverse = group descriptor for a group with varied neurotypes; neurodiversity = the broader concept of natural neurological variation in humanity.",
  },
  {
    id: 17,
    category: "Neurotypical",
    question: "Is 'neurotypical' a diagnosis?",
    options: [
      "Yes — it appears in ICD-11 as a baseline reference category",
      "No — it is a descriptive term for the most common neurotype, not a clinical diagnosis",
      "Yes — neurotypical is assigned when no neurodivergent condition is found",
      "No — it is only used informally by the autistic community",
    ],
    correctIndex: 1,
    explanation:
      "'Neurotypical' is not a clinical diagnosis. It is a descriptive term — originating in autistic community discourse — to describe people whose neurological development follows the dominant, most common pattern. It has no ICD or DSM entry.",
  },
  {
    id: 18,
    category: "Word Usage",
    question: "A policy document states: 'We celebrate neurodiversity and support our neurodivergent staff.' Is this correct?",
    options: [
      "No — you cannot use both terms in the same sentence",
      "No — neurodivergent staff should be called neurodiverse staff",
      "Yes — neurodiversity (the concept) is celebrated at organisational level; neurodivergent (individual label) describes specific staff members",
      "Yes — but the sentence should add that neurotypical staff are excluded",
    ],
    correctIndex: 2,
    explanation:
      "This is a model sentence. 'Neurodiversity' is invoked as a value or concept to celebrate; 'neurodivergent staff' correctly uses the individual label for staff members whose neurotypes diverge from neurotypical. Both are used appropriately.",
  },
  {
    id: 19,
    category: "Neurodiversity",
    question: "How does the neurodiversity framework relate to the social model of disability?",
    options: [
      "It rejects the social model entirely in favour of the medical model",
      "It is fully aligned: disability arises from societal barriers, not from the neurotype itself",
      "It argues neurodivergent people are never disabled",
      "It applies only to non-disabled neurodivergent people",
    ],
    correctIndex: 1,
    explanation:
      "The neurodiversity framework aligns closely with the social model of disability: it holds that many of the difficulties neurodivergent people face arise from environments designed for neurotypical people, not from the neurotype per se. Appropriate adjustments can remove many barriers.",
  },
  {
    id: 20,
    category: "Word Usage",
    question: "Which of the following is the MOST precise and correct statement for a clinician to make?",
    options: [
      "'Neurodiversity is a disorder that affects one in five people.'",
      "'My patient is neurodiverse — they have ADHD.'",
      "'Neurodivergent is a synonym for having a psychiatric disorder.'",
      "'Neurodiversity describes natural variation in human brain function; my patient identifies as neurodivergent.'",
    ],
    correctIndex: 3,
    explanation:
      "The final option is fully correct: neurodiversity is the concept (natural variation), and neurodivergent is the opt-in individual identity label. Neurodiversity is not a disorder; a single person cannot be neurodiverse; and neurodivergent is not synonymous with having a psychiatric disorder.",
  },
];

export const TOTAL_ROUNDS = QUIZ_QUESTIONS.length; // 20
