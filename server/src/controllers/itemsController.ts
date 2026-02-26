import { Request, Response } from "express";
import { ItemSchema, Item } from "../types";

let items: Item[] = [
  {
    id: "1",
    name: "Object 1",
    description: "Object 1 Desc",
  },
  {
    id: "2",
    name: "Object 2",
    description: "Object 2 Desc",
  },
];

export const getItems = (req: Request, res: Response) => {
  res.json(items);
};

export const createItem = (req: Request, res: Response) => {
  try {
    const validatedItem = ItemSchema.parse(req.body);
    const newItem = { ...validatedItem, id: Date.now().toString() };
    items.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};
