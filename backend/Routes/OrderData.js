const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  // console.log(req, req.body);
  let data = req.body.order_data;
  // console.log("first");
  // console.log(data);
  // console.log("second");
  //order_date: req.body.order_date
  // console.log(req.body.order_date);

  await data.splice(0, 0, { "Order date": req.body.order_date });

  let eId = await Order.findOne({ email: req.body.email });
  console.log(eId);

  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        Order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

router.post('/myorderData', async(req,res)=>{
  try {
    let myData = await Order.findOne({'email':req.body.email})
    res.json({order_data:myData})
  } catch (error) {
      res.send("Server Error", error.message);

  }
})
module.exports = router;
