import User from '../../../lib/models/user';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  // validar name, email, and password
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Forneça um nome, e-mail e senha' });
  }

  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'e-mail já existe....' });
  }

  try {
    // cria o user na base de dados
    const user = await User.createUser(name, email, password);

    // cria a sessao jwt do user
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(201).json({ message: 'Registro feito com sucesso', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no registro' });
  }
}
