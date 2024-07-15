import express from "express";
import Yup from "yup";
import Food from "./food.model.js";
import mongoose from "mongoose";

const router = express.Router();

//* add food item
router.post(
  "/add",
  async (req, res, next) => {
    const data = req.body;

    const addFoodSchema = Yup.object({
      name: Yup.string().required().trim().max(50),
      price: Yup.number().required().min(0),
    });

    try {
      const validatedData = await addFoodSchema.validate(data);
      req.body = validatedData;
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }

    next();
  },
  async (req, res) => {
    //extract new data from req body
    const newFoodItem = req.body;

    //insert to DB
    await Food.create(newFoodItem);

    //send res
    return res.status(201).send({ message: "Food is added successfully" });
  }
);

//*get all food items
router.get("/list", async (req, res) => {
  const foodItems = await Food.find();

  return res.status(201).send({ message: "Success", foodList: foodItems });
});

//*get product detail by id
router.get(
  "/detail/:id",

  //!to check the validity of the mongoID
  (req, res, next) => {
    //extract id from params
    const id = req.params.id;
    // console.log(id);

    //check for mongoID validation
    const isValidId = mongoose.isValidObjectId(id);

    //if not valid mongoID, throw error
    if (!isValidId) {
      return res.status(400).send({ message: "Invalid mongoID" });
    }

    next();
  },

  //! to get the food detail by id
  async (req, res, next) => {
    //extract foodID from req.params
    const id = req.params.id;

    //find food using foodID
    const requiredFoodDetail = await Food.findById(id);

    //if not food then throw error
    if (!requiredFoodDetail) {
      return res.status(400).send({ message: "Food item does not exist" });
    }
    req.foodItem = requiredFoodDetail;

    next();
  },

  //! send response
  (req, res) => {
    return res.status(200).send({ message: "Success", foodItem: req.foodItem });
  }
);

export default router;