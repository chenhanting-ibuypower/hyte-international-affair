import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { locale, content } = req.body;

        return res.status(200).json({});
      } catch (error) {
        return res.status(500).json({ error: 'Server error' });
      }

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}