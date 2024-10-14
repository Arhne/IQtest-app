import { SvgProps } from "react-native-svg";
import { Categories, SubCategories } from "./enum";
import { icons } from "@/constants";
import { emotionalIqResult, generalIqResult, logicalResultData, memoryResult, quantitativeResult } from "./results";
import { adhdResult, anxietyResult, bipolarResult, depressionResult, internetResult, ptsdResult, schizophreniaResult } from "./results(1)";

export const SubCategoryConfig: Record<
  SubCategories,
  {
    title: string;
    objective?: string;
    categories: Categories;
    note?: string;
    interactionicon?: (props: SvgProps) => React.JSX.Element;
    resultData?: ResultDetails[];
  }
> = {
  [SubCategories.BIPOLAR]: {
    title: "Bipolar Disorder Test",
    interactionicon: icons.Bipolar,
    categories: Categories.MENTAL_TEST,
    objective: "",
    resultData: bipolarResult,
  },
  [SubCategories.DEPRESSION]: {
    title: "Depression Test",
    interactionicon: icons.Depression,
    categories: Categories.MENTAL_TEST,
    resultData: depressionResult,
  },
  [SubCategories.ENNEGRAM]: {
    title: "Enneagram Test",
    interactionicon: icons.Enneagram,
    categories: Categories.PERSONALITY,
    objective:
      'The Enneagram of Personality, or simply the Enneagram is a model of the human psyche which is principally understood and taught as a typology of nine interconnected personality types. As a typology the Enneagram defines nine personality types (sometimes called "enneatypes"), which are represented by the points of a geometric figure called an enneagram, which indicate connections between the types.',
  },
  [SubCategories.ADHD]: {
    title: "ADHD Test",
    interactionicon: icons.ADHD,
    categories: Categories.MENTAL_TEST,
    resultData: adhdResult,
  },
  [SubCategories.SCHIZ]: {
    title: "Schizophrenia Test",
    interactionicon: icons.Shizophrenia,
    categories: Categories.MENTAL_TEST,
    resultData: schizophreniaResult,
  },
  [SubCategories.SIXTEENPER]: {
    title: "16 Personalities Test",
    interactionicon: icons.Personality,
    categories: Categories.PERSONALITY,
    objective:
      'The Myers–Briggs Type Indicator (MBTI) is an introspective self-report questionnaire indicating differing psychological preferences in how people perceive the world and make decisions. The test attempts to assign four categories: introversion or extraversion, sensing or intuition, thinking or feeling, judging or perceiving. One letter from each category is taken to produce a four-letter test result, like "ISTJ" or "ENFP".',
  },
  [SubCategories.EMOLOGIC]: {
    title: "Emotions vs Logic Test",
    interactionicon: icons.Emotions,
    categories: Categories.PERSONALITY,

    objective:
      "This test is meant to assess your behavior in certain situations and as a result give an illustration regarding your emotional vs logical levels. Emotions are defined to be manifestations of your current mindset into human feeling. Logic is defined as the comprehension of current reality under a given set of assumptions following an ordered pattern.",
  },
  [SubCategories.INTERDISORDER]: {
    title: "Internet Disorder Test",
    interactionicon: icons.Internet,
    categories: Categories.MENTAL_TEST,
    resultData: internetResult,
  },
  [SubCategories.PTSD]: {
    title: "PTSD Test",
    interactionicon: icons.Ptsd,
    categories: Categories.MENTAL_TEST,
    resultData: ptsdResult,

  },
  [SubCategories.ANXIETY]: {
    title: "Anxiety Test",
    interactionicon: icons.Anxiety,
    categories: Categories.MENTAL_TEST,
    resultData: anxietyResult,

  },
  [SubCategories.LOGICAL]: {
    title: "Logical IQ Test",
    interactionicon: icons.Logical,
    categories: Categories.IQ_TEST,
    resultData: logicalResultData,
  },
  [SubCategories.INTROVERT]: {
    title: "Introvert and Extrovert Test",
    interactionicon: icons.Introvert,
    categories: Categories.PERSONALITY,

    objective:
      'The traits of extraversion (or extroversion) and introversion are a central dimension in some human personality theories. The terms introversion and extraversion were popularized by Carl Jung, although both the popular understanding and psychological usage differ from his original intent. Extraversion tends to be manifested in outgoing, talkative, energetic behavior, whereas introversion is manifested in more reserved and solitary behavior. Rather than focusing on interpersonal behavior, however, Jung defined introversion as an "attitude-type characterised by orientation in life through subjective psychic contents", and extraversion as "an attitude-type characterised by concentration of interest on the external object".',
  },
  [SubCategories.PERSONA]: {
    title: "Persona Bubble Test",
    interactionicon: icons.Persona,
    categories: Categories.PERSONALITY,
    objective:
      "The persona bubble aims to find out if your personal bubble that you have built for yourself since you were a child big or small. In this test, you will be answering questions that will determine the guard you have been building since you were a baby towards the external world. This concept is different than the concept of ego. Ego is the mask you've been using for protection while the persona bubble is the space you create to be comfortable.",
  },
  [SubCategories.EMOTIONALIQ]: {
    title: "Emotional IQ Test",
    interactionicon: icons.Emotions,
    categories: Categories.IQ_TEST,
    resultData: emotionalIqResult,
  },
  [SubCategories.EQ]: {
    title: "Emotional Intelligence (EQ) Test",
    interactionicon: icons.Emotions,
    categories: Categories.PERSONALITY,
    objective:
      "Emotional intelligence (EI), emotional leadership (EL), emotional quotient (EQ) and emotional intelligence quotient (EIQ), is the capability of individuals to recognize their own emotions and those of others, discern between different feelings and label them appropriately, use emotional information to guide thinking and behavior, and manage and/or adjust emotions to adapt to environments or achieve one's goals.",
  },
  [SubCategories.QUANTITATIVE]: {
    title: "Quantitative IQ Test",
    interactionicon: icons.Quantitative,
    categories: Categories.IQ_TEST,
    resultData: quantitativeResult,
  },
  [SubCategories.MEMORY]: {
    title: "Memory IQ Test",
    interactionicon: icons.Alzheimer,
    categories: Categories.IQ_TEST,
    objective:
    "This test will pop up items (a mixture of letters and numbers) for a few seconds and then ask the user to choose the correct option.",
    resultData: memoryResult,
  },
  [SubCategories.GENERAL]: {
    title: "General IQ Test",
    interactionicon: icons.Alzheimer,
    categories: Categories.IQ_TEST,
    resultData: generalIqResult,
  },
};

export const labelColorMap: Record<number, string> = {
  0: "#bf4be3",
  1: "#f9ae00",
  2: "#8fbf00",
  3: "#00bcbf",
  4: "#dd2e2e",
  // Add more labels and colors as needed
};
