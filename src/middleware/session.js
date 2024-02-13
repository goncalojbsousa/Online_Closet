import jwt from 'jsonwebtoken';
import pool from '../lib/db';


function session(handler) {
  return async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      return handler(req, res);
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
}


export async function verificaAdmin(req, res, next) {
  const userId = req.userId;

  try {
    const user = await pool.query('SELECT admin FROM users WHERE id = ?', [userId]);

    if (user.length > 0 && user[0].admin === 1) {
      // Se for um administrador, pode prosseguir
      next();
    } else {
      // Se não for um administrador, retorna um erro ou redireciona para uma página de acesso negado
      res.status(403).json({ message: 'Acesso negado. Esta área é restrita aos administradores.' });
    }
  } catch (error) {
    console.error('Erro ao verificar administrador:', error);
    res.status(500).json({ message: 'Erro interno' });
  }
}


export default session;