import express from "express";
import { createOrder } from "../payment/createOrder.js";

const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    console.log("========== CREATE ORDER ==========");
    console.log("BODY:");
    console.log(JSON.stringify(req.body, null, 2));

    const result = await createOrder(req.body);

    console.log("ORDER CREATED:");
    console.log(result);

    res.json(result);
  } catch (error) {
    console.error("CREATE ORDER ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;