import Cloth from '../../../lib/models/cloth';

export default async function handler(req, res) {
    try {
        const { userId } = req.query;
        const userCloths = await Cloth.fetchUserCloths(userId);
        res.status(200).json({ cloths: userCloths });
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro ao buscar roupas do usuário' });
    }
}