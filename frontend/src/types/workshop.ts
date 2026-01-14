import type { Category } from "./category";

export interface Workshop {
  id: number;
  name: string;
  description: string;
  start_date: string;
  category: number;
}
export interface WorkshopForm {
  name: string;
  description: string;
  start_date: string;
  category: number;
}