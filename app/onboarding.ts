import { ImageSourcePropType } from 'react-native';
// import { images } from "@/constants";


type OnboardingItem = {
    id: string;
    image: ImageSourcePropType;
    title: string;
    description: string;
};

const images = {
    educating: require('../assets/images/educating.png'),
    analytics: require('../assets/images/analytics.png'),
    schedule: require('../assets/images/schedule.png'),
};

export const onboarding: OnboardingItem[] = [
    {
        id: "1",
        image: images.educating,
        title: `Educating People`,
        description: `We have developed a comprehensive and detailed testing methodology that evaluates multiple aspects of your abilities through a single test.`,
    },
    {
        id: "2",
        image: images.analytics,
        title: `Maximizing Accuracy`,
        description: `For the most accurate result, try out as many tests as possible`,
    },
    {
        id: "3",
        image: images.schedule,
        title: `Learn on your schedule`,
        description: `Choose from 10000 online video courses with new additions every month`,
    },
]