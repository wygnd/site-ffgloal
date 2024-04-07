import React, {FC, MouseEvent, MouseEventHandler, ReactEventHandler, useEffect, useState} from 'react';
import {ISelectProps} from "@/@types/form";
import clsx from "clsx";
import "./Select.scss";

const Select: FC<ISelectProps> = (
    {
      className,
      values,
      defaultValue,
      icon,
      result,
      clear = false
    }) => {

    if (!values) {
      return null;
    }

    const [showValues, setShowValues] = useState<boolean>(false);
    const [defaultVal, setDefaultValue] = useState<string>(defaultValue);

    const selectValue = (event: MouseEvent<HTMLLIElement>) => {
      const {value, textContent} = event.target as HTMLLIElement
      setDefaultValue(textContent);
      result(value);
      setShowValues(false);
    }

    useEffect(() => {
      setDefaultValue(defaultValue);
    }, [clear])


    return (
      <span className={clsx(className, "select-input")}>
      {defaultValue &&
	      <span className="select-input_default" onClick={() => setShowValues(!showValues)}>
          <span className="select-input_default-title">{defaultVal}</span>
          {icon &&
			      <span className="select-input_default-toggler">{icon}</span>
          }
        </span>
      }
        {
          values.length &&
          showValues &&
					<ul className="select-input_values">
            {values.map(v =>
              <li key={v.value} value={v.value} className="select-input_values-item" onClick={selectValue}>{v.name}</li>
            )}
					</ul>
        }
</span>
    )
      ;
  }
;

export default Select;