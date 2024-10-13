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
}

interface AnsweredDetails {
  dateAnswered: string;
  questionsAnswered: QuestionDetails[];
}

interface ResultDetails  {
  score: number | [number, number];
  scoreDisplay?: string;
  careerTracks: string[];
  strengths: string;
  weaknesses: string;
  romanticType: string;
  celebrities: string[];
};
