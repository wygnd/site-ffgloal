import React, {FC} from 'react';
import {IServiceItemProps} from "@/@types/services";
import clsx from "clsx";
import "./Services-block.scss";

const ServiceItem: FC<IServiceItemProps> = ({className, item}) => {

  const {name, prices} = item;

  return (
    <li className={clsx("service-item", className)}>
      {item &&
				<div className="service-item_name">{name}</div>
      }
      {prices &&
				<ul className="service-item_prices">
          {prices.map(price =>
            <li key={price.name} className="price-item">
              {price.name &&
								<div className="price-item_name">{price.name}</div>
              }
              {price.value &&
								<div className="price-item_value">{price.value}</div>
              }
            </li>
          )}
				</ul>
      }
    </li>
  );
};

export default ServiceItem;