import { set, connect } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { sample_foods, sample_users } from "../data.js";
import bcrypt from "bcryptjs";
import { FoodModel } from "../models/food.model.js";
set("strictQuery", true);
const PASSWORD_HASH_SALT_ROUNDS = 10;

export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await seedFoods();
    await seedUsers();
    console.log("connected succesfully !");
  } catch (error) {
    console.log(error);
  }
};

async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log("users seeding is already done");
    return;
  }
  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }
  console.log("users seeding is done");
}

async function seedFoods() {
  const foodCount = await FoodModel.countDocuments();
  if (foodCount > 0) {
    console.log("food sedding is already done");
    return;
  }
  for (const food of sample_foods) {
    food.imageUrl = `/foods/${food.imageUrl}`;
    await FoodModel.create(food);
  }
  console.log("food seeding is done");
}
