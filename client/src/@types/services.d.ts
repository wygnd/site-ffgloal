import React from "react";

export interface IServiceItem {
  id: number;
  name: string;
  prices: IServicePrice[];
}

export interface IServicePrice {
  name: string;
  value: string;
}

export interface IServiceItemProps {
  className?: React.ReactNode;
  item: IServiceItem
}