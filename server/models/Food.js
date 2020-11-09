const mongoose = require("mongoose");

//Collection format fo table (document)

const FoodSchema = new mongoose.Schema({
  FoodName: {
    type: String,
  },
  daysSinceIAte: {
    type: Number,
  },
});

const Food = mongoose.model("FoodData", FoodSchema);
module.exports = Food;
