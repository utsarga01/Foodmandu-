import express from "express";
import Restaurant from "./restaurant.model.js";
import Yup from "yup";
import mongoose from "mongoose";

const router = express.Router();

// add restaurant

router.post(
  "/add",
  async (req, res, next) => {
    const restaurantValidationSchema = Yup.object({
      name: Yup.string()
        .required("Name is required.")
        .trim()
        .max(55, "Name must be at most 55 characters.")
        .lowercase(),
      contact: Yup.string().required().trim().min(10).max(15),
      location: Yup.string().trim().required().max(55),
      ownerName: Yup.string().max(55).default(null).nullable(),
    });

    try {
      const validatedData = await restaurantValidationSchema.validate(req.body);
      req.body = validatedData;
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }

    next(); //middleware
  },
  async (req, res) => {
    //extract new values from req.body
    const newRestaurant = req.body;

    //insert into db
    await Restaurant.create(newRestaurant);
    return res
      .status(201)
      .send({ message: "Restaurant is added successfully" });
  }
);

// ?delete a restaurant

router.delete(
  "/delete/:id",
  (req, res, next) => {
    //extract restaurant id from req.params
    const id = req.params.id;

    //check for mongo validity
    const isValidId = mongoose.isValidObjectId(id);

    //if not valid mongo id, throw error
    if (!isValidId) {
      return res.status(400).send({ message: "Invalid mongo id" });
    }

    next();
  },

  async (req, res) => {
    // extract restaurant id from req.params
    const restaurantId = req.params.id;

    // find restaurant
    const requiredRestaurant = await Restaurant.findById(restaurantId);
    //if not restaurant, throw error
    if (!requiredRestaurant) {
      return res.status(404).send({ message: "Restaurant doesnot exist" });
    }

    //delete restaurant
    await Restaurant.findByIdAndDelete(restaurantId);
    return res
      .status(200)
      .send({ message: "Restaurant is deleted successfully" });
  }
);

export default router;
