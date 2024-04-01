import React, {FC, useState} from 'react';
import {IQuestionItemProps} from "@/@types/questions";
import clsx from "clsx";
import TogglerIcon from "./images/question-item_toogler.svg";

const QuestionItem: FC<IQuestionItemProps> = ({className, item}) => {

  const {answer, question} = item;
  const [toggle, setToggle] = useState<boolean>(false);

  const clickItemHandler = () => {
    setToggle(!toggle);
  }

  return (
    <>

      <li className={clsx("question-item", className, toggle && "opened")} onClick={clickItemHandler}>
        <div className="question-item_head">
          <div className="question-item_question">{question}</div>
          <div className="question-item_toggler">
            <TogglerIcon/>
          </div>
        </div>
        <div className="question-item_answer">{answer}</div>
      </li>
    </>
  );
};

export default QuestionItem;