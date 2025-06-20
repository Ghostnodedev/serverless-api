export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS,GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { method } = req;

  // Manually parse JSON body if it's a raw string (Vercel behavior)
  let body = req.body;

  if (req.headers['content-type'] === 'application/json' && typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      console.error("Invalid JSON:", e.message);
      return res.status(400).json({ message: "Invalid JSON body" });
    }
  }

  console.log("Incoming data:", body);

  if (method === "GET") {
    // Example data response
    return res.status(200).json({
      message: "No products yet",
      data: [],
    });
  }

  if (method === "POST") {
    const { title, id, price, image } = body || {};

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
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `Method ${method} not allowed` });
}
