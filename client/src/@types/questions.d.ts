export interface IQuestionItem {
  id: number;
  question: string;
  answer: string;
}

export interface IQuestionItemProps {
  className?: string | [string];
  item: IQuestionItem;
}