export default async function handler(req, res) {
  const { method, body } = req;

  console.log("Incoming data:", body);

  if (method === "GET") {
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
  }

  else if (method === "POST") {
    const { title, description, price, image } = body;

    if (!title || !description || !price || !image) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const postData = [{ title, description, price, image }];
    console.log("Posted data:", postData);

    // You could forward this data to a database or API here
    return res.status(201).json({
      message: "Data posted successfully",
      data: postData,
    });
  }

  else {
    // Method not allowed
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
