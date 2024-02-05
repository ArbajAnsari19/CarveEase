const mongoose = require("mongoose");

// const password = "mASRZs7eE9wOMbWC";
// const url = `mongodb+srv://goFood:${password}@cluster0.u3szpsz.mongodb.net/gofoodmern`;
const url = `mongodb+srv://Arbaj19:lgkFWz2rZenUghtp@cluster0.kezlp3u.mongodb.net/craveease`;


async function main() {
  try {
    await mongoose.connect(url);
    console.log("Connected");

    const db = mongoose.connection;
    const collection = db.collection("food_item");
    const foodCategory = db.collection("food_categ");

    const data = await collection.find({}).toArray();
    const catData = await foodCategory.find({}).toArray();

    global.food_items = data;
    global.food_categ = catData;

    // Additional processing or logging if needed

  } catch (err) {
    console.error(err);
  }
}

module.exports = main;
