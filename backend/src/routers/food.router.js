import { Router } from "express";
import handler from "express";
import { FoodModel } from "../models/food.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const foods = await FoodModel.find({});
  if (foods) {
    res.send(foods);
  } else {
    console.log("foods is empty so 404");
    res.sendStatus(404);
  }
  // res.send(foods);
});

router.get("/tags", async (req, res) => {
  const tags = await FoodModel.aggregate([
    {
      $unwind: "$tags",
    },
    {
      $group: {
        _id: "$tags",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        count: "$count",
      },
    },
  ]).sort({ count: -1 });
  const all = {
    name: "All",
    count: await FoodModel.countDocuments(),
  };
  tags.unshift(all);
  res.send(tags);
});

router.get("/search/:searchTerm", async (req, res) => {
  const { searchTerm } = req.params;
  const searchRegex = new RegExp(searchTerm, i);
  const foods = await FoodModel.find({ name: { $regex: searchRegex } });
  res.send(foods);
});

router.get("/tag/:tag", async (req, res) => {
  const { tag } = req.params;
  const foods = await FoodModel.find({ tags: tag });
  res.send(foods);
});

router.get("/:foodId", async (req, res) => {
  const { foodId } = req.params;
  const food = await FoodModel.findById(foodId);
  res.send(food);
});

export default router;
