import { Rate } from "./rate";

export interface Dish{
    key?: string;
    name: string;
    type: string;
    category: string;
    ingredients: string[];
    maxPositions: number;
    price: number;
    description: string;
    images: string[];
    basketQuantity: number;
    rates: Rate[];
    rating?: number[];
}