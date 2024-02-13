import Outfit from '../../../lib/models/outfit';

export default async function handler(req, res) {
    try {
        const { outfitId } = req.query;
        const outfitClothes = await Outfit.findClothsById(outfitId);
        res.status(200).json({ outfits: outfitClothes }); // Corrigindo para 'outfits'
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro ao buscar roupas do usuário' });
    }
}
