import React, {FC, SVGProps} from "react";

export interface IAdvantage {
  id: number;
  icon: any;
  name: string;
  desc: string
}

export interface IAdvantageItemProps {
  className?: React.ReactNode;
  item: IAdvantage
}