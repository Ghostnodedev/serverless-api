// pages/api/cart.js (serverless function)
"use strict";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const url = "https://serverless-api-nine-dun.vercel.app/api/cart";
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  }

  if (req.method === "POST") {
    const { title, id, price, image } = req.body;

    if (!title || !id || !price) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const postData = [{ title, id, price, image }];
    console.log("Posted data:", postData);
    return res.status(201).json({
      message: "Data posted successfully",
      data: postData,
    });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
