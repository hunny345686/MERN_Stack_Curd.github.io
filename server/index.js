const express = require("express");
const app = express();
const mongoose = require("mongoose");
const FoodModel = require("./models/Food");
const cors = require("cors");

app.use(express.json());
app.use(cors());

///connect to database

mongoose.connect(
  "mongodb+srv://prem:NBQ64Mzz7cDxlJcv@cluster0.ubjn0.mongodb.net/food?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//Inser data in databse

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  //console.log(foodName);
  const days = req.body.days;
  const food = new FoodModel({ FoodName: foodName, daysSinceIAte: days });
  try {
    await food.save();
  } catch (err) {
    console.log(err);
  }
});

//Fatch data from databse

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

//Update data in databse

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  //console.log(foodName);
  const id = req.body.id;
  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.FoodName = newFoodName;
      updatedFood.save();
      res.send("updated");
    });
  } catch (err) {
    console.log(err);
  }
});

// delete data from database

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

//Serever runing on the port no 2000

app.listen(2000, () => {
  console.log("done");
});
