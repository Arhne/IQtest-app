interface IQuestions {
  questionNo: number;
  question: string;
  answer: string;
  subcategoryId: SubCategories;
  options: {
    option: string;
    optionlabel: string;
    points: string;
  }[];
  categoryId: Categories;
  image: (props: SvgProps) => JSX.Element;
  categoryTitle: string;
  type: string;
  choices?: string[];
}

interface SubCategoryProgress {
  answered: number;
  total: number;
}

interface QuestionDetails {
  questionNo: number;
  answer: string;
  points: number;
  questionLabel: string;
}

interface AnsweredDetails {
  dateAnswered: string;
  totalPoints: number;
  questionsAnswered: QuestionDetails[];
}

interface ResultDetails  {
  score: number | [number, number];
  scoreDisplay?: string;
  label?: string;
  careerTracks: string[];
  strengths: string | string[];
  weaknesses: string | string[];
  romanticType?: string;
  celebrities?: string[];
};
