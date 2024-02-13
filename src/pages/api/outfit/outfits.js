import Outfit from '../../../lib/models/outfit';

export default async function handler(req, res) {
    try {
        const { userId } = req.query;
        const userOutfits = await Outfit.fetchUserOutfits(userId);
        res.status(200).json({ outfits: userOutfits }); // Corrigindo para 'outfits'
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro ao buscar roupas do usuário' });
    }
}
