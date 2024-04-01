import React, {FC} from 'react';
import clsx from "clsx";
import {IReviewItemProps} from "@/@types/reviews";

const ReviewItem: FC<IReviewItemProps> = ({className, item}) => {

  const {icon, name, company, review} = item;

  return (
    <li className={clsx(className, "review-item")}>
      <div className="review-item_head">
        {icon &&
					<div className="review-item_head-icon">{icon}</div>
        }
        <div className="review-item_head-info">
          {name &&
						<div className="review-item_head-name">{name}</div>
          }
          {company &&
						<div className="review-item_head-company">{company}</div>
          }
        </div>
      </div>
      {review &&
				<div className="review-item_review">{review}</div>
      }
    </li>
  );
};

export default ReviewItem;