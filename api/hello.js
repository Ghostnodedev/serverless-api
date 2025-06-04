export default async function handler(req, res) {
  // ✅ Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Respond to OPTIONS method (CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ✅ Your actual POST logic
  if (req.method === 'POST') {
    const { name, username, email, password, businessName, businessType, mobile } = req.body;

    if (!name || !username || !email || !password || !businessName || !businessType || !mobile) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    const adata = [{ name, username, email, password, businessName, businessType, mobile }];
    console.log('Received:', adata);

    return res.status(200).json({ message: 'Data received', data: adata });
  }

  // ❌ For all other methods
  return res.status(405).json({ message: 'Method Not Allowed' });
}
