export default async function handler(req, res) {
  const adata = [];
  console.log(adata)

  if (req.method === 'POST') {
    const { name, age, rollno } = req.body;
    console.log(name, age, rollno);
    adata.push({ name, age, rollno });
    console.log(adata)
    res.status(200).json({ message: 'Data received', data: adata });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
