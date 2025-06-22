"use strict"
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, body } = req;
  console.log("Incoming data:", body);

 if (method === "POST") {
    const { title, id, price, image } = body;

    if (!title || !id || !price) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const postData = [{ title, id, price, image }];
    console.log("Posted data:", postData);

    return res.status(201).json({
      message: "Data posted successfully",
      data: postData,
    });
  } else if (method === "GET") {
    try {
      const url = "https://serverless-api-nine-dun.vercel.app/api/cart";
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      console.log("Fetched data:", responseData);
      res.status(200).json({
        message: "Data fetched successfully",
        data: responseData,
      });
    } catch (error) {
      console.error("Fetch error:", error.message);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
