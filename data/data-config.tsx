
import { SvgProps } from "react-native-svg";
import { Categories, SubCategories } from "./enum";
import { icons } from "@/constants";

export const SubCategoryConfig: Record<
  SubCategories,
  {
    title: string;
    objective?: string;
    note?: string;
    interactionicon?:  (props: SvgProps) => React.JSX.Element;
  }
> = {
  [SubCategories.BIPOLAR]: {
    title: "Bipolar Disorder Test",
    interactionicon: icons.Bipolar ,
    objective:
      "Spatial reasoning tests is used to assess your capacity to manipulate 2D and 3D objects, spot patterns between shapes, and to visualise movements and change in those shapes. This could include identifying which answer option is a rotation of a given 2D imagesssss.",
  },
  [SubCategories.DEPRESSION]: {
    title: "Depression Test",
    interactionicon: icons.Depression,
  },
  [SubCategories.ENNEGRAM]: {
    title: "Enneagram Test",
    interactionicon: icons.Enneagram ,
  },
  [SubCategories.ADHD]: {
    title: "ADHD Test",
    interactionicon: icons.ADHD,
  },
  [SubCategories.SCHIZ]: {
    title: "Schizophrenia Test",
    interactionicon: icons.Shizophrenia ,
  },
  [SubCategories.SIXTEENPER]: {
    title: "16 Personalities Test",
    interactionicon: icons.Personality ,
  },
  [SubCategories.EMOLOGIC]: {
    title: "Emotions vs Logic Test",
    interactionicon: icons.Emotions ,
  },
  [SubCategories.INTERDISORDER]: {
    title: "Internal Disorder Test",
    interactionicon: icons.Internet ,
  },
  [SubCategories.PTSD]: {
    title: "PTSD Test",
    interactionicon: icons.Ptsd ,
  },
  [SubCategories.ANXIETY]: {
    title: "Anxiety Test",
    interactionicon: icons.Anxiety ,
  },
  [SubCategories.LOGICAL]: {
    title: "Logical IQ Test",
    interactionicon: icons.Logical ,
  },
  [SubCategories.INTROVERT]: {
    title: "Introvert and Extrovert Test",
    interactionicon: icons.Introvert ,
  },
  [SubCategories.PERSONA]: {
    title: "Persona Bubble Test",
    interactionicon: icons.Persona ,
  },
  [SubCategories.EMOTIONALIQ]: {
    title: "Emotional IQ Test",
    interactionicon: icons.Emotions ,
  },
  [SubCategories.EQ]: {
    title: "Emotional Intelligence (EQ) Test",
    interactionicon: icons.Emotions ,
  },
  [SubCategories.QUANTITATIVE]: {
    title: "Quantitative IQ Test",
    interactionicon: icons.Quantitative ,
  },
  [SubCategories.MEMORY]: {
    title: "Memory IQ Test",
    interactionicon: icons.Alzheimer ,
  },
  [SubCategories.GENERAL]: {
    title: "General IQ Test",
    interactionicon: icons.Alzheimer ,
  },
};
