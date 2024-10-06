

import { sortDataByCategory } from "@/utils/helper-functions";
import { Assessment } from "./categories";
import { Categories, SubCategories } from "./enum";


export const SubCategoryConfig: Record<SubCategories, { title: string }> = {
    [SubCategories.BIPOLAR]: {
        title: 'Bipolar Disorder Test',
    },
    [SubCategories.DEPRESSION]: {
        title: 'Depression Test',
    },
    [SubCategories.ENNEGRAM]: {
        title: 'Enneagram Test',
    },
    [SubCategories.ADHD]: {
        title: 'ADHD Test',
    },
    [SubCategories.SCHIZ]: {
        title: 'Schizophrenia Test',
    },
    [SubCategories.SIXTEENPER]: {
        title: '16 Personalities Test',
    },
    [SubCategories.EMOLOGIC]: {
        title: 'Emotions vs Logic Test',
    },
    [SubCategories.INTERDISORDER]: {
        title: 'Internet Disorder Test',
    },
    [SubCategories.PTSD]: {
        title: 'PTSD Test',
    },
    [SubCategories.ANXIETY]: {
        title: 'Anxiety Test',
    },
    [SubCategories.LOGICAL]: {
        title: 'Logical IQ Test',
    },
    [SubCategories.INTROVERT]: {
        title: 'Introvert and Extrovert Test',
    },
    [SubCategories.PERSONA]: {
        title: 'Persona Bubble Test',
    },
    [SubCategories.EMOTIONALIQ]: {
        title: 'Emotional IQ Test',
    },
    [SubCategories.EQ]: {
        title: 'Emotional Intelligence (EQ) Test',
    },
    [SubCategories.QUANTITATIVE]: {
        title: 'Quantitative IQ Test',
    },
    [SubCategories.MEMORY]: {
        title: 'Memory IQ Test',
    },
    [SubCategories.GENERAL]: {
        title: 'General IQ Test',
    },
};


