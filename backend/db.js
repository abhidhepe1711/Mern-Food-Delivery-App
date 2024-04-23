const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://abhishekdhepe123:nothingpassword12@cluster0.rre8nsz.mongodb.net/Gofoodmern?retryWrites=true&w=majority&appName=Cluster0";
 

const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) console.log("---", err);
      else {
        console.log("connected");
         const fethed_data = await mongoose.connection.db.collection("food_items");
         fethed_data.find({}).toArray(async function (err, data) {
          const foodCategory =await mongoose.connection.db.collection("foodCategory")
          foodCategory.find({}).toArray(function(err,catData){
             if (err) console.log(err);
            else {
                global.food_items = data
                global.foodCategory = catData
            }
          })
          //  if (err) console.log(err);
          // else {
          //     global.food_items = data
              
          // }
        });
      }
    }
  );
};

module.exports = mongoDB;
