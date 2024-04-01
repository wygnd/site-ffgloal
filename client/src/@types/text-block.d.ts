export interface TextBlockComponent {
  block_id: number;
  is_reverse?: boolean;
  title?: string;
  description?: string;
  button?: TextBlockComponentButton;
  image?: string;
  className?: string | string[];
}

export type TextBlockComponentButton = {
  text: string;
  link: string;
}
