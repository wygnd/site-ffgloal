import React from "react";

export interface IReviewItem {
  id: number;
  icon: any;
  name: string;
  company: string;
  review: string;
}

export interface IReviewItemProps {
  className?: React.ReactNode;
  item: IReviewItem
}