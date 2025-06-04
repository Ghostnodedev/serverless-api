export default async function handler(req, res) {
  const adata = [];
  console.log(adata)

  if (req.method === 'POST') {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { name, username, email, password, businessName, businessType, mobile } = req.body;
    console.log(name, username, email, password, businessName, businessType, mobile);
    if(!name||!username ||!email ||!password ||!businessName ||!businessType ||! mobile){
        res.status(400).send({message: 'Please fill in all fields.'})
    }
    adata.push({name,username, email,password,businessName,businessType,mobile})
    console.log(adata)
    res.status(200).json({ message: 'Data received', data: adata });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
