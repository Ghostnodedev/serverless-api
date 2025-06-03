export default function handler(req, res) {
    console.log("hello there")
  res.status(200).json({ message: 'Hello from serverless Node.js!' });
}
