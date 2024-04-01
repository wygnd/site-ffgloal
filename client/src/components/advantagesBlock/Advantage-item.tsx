import React, {FC} from 'react';
import clsx from "clsx";
import {IAdvantageItemProps} from "@/@types/advantages";


const AdvantageItem: FC<IAdvantageItemProps> = ({className, item}) => {

  const {icon, name, desc} = item;

  return (
    <li className={clsx("advantage-item", className)}>
      {icon &&
				<div className="advantage-item_icon">{icon}</div>
      }
      {name &&
				<div className="advantage-item_name">{name}</div>
      }
      {desc &&
				<div className="advantage-item_desc">{desc}</div>
      }
    </li>
  );
};

export default AdvantageItem;