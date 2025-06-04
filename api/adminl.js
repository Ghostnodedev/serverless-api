export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const {username, password, businessName , email } = req.body;

    if ( !username || !email || !password || !businessName ) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    const adata = [{  username, email, password, businessName }];
    console.log('Received:', adata);

    return res.status(200).json({ message: 'Data received', data: adata });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
