import Outfit from '../../../lib/models/outfit'; // Importa o modelo de Outfit

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { idTronco, idPernas, idPes, estacao, temperatura, userId, path } = req.body; // Atualiza os campos recebidos no corpo da requisição

    try {
        // Cria o outfit na base de dados
        const outfit = await Outfit.createOutfit(idTronco, idPernas, idPes, estacao, temperatura, userId, path);

        if (outfit) {
            return res.status(201).json({ message: 'Outfit adicionado com sucesso', outfit });
        } else {
            return res.status(500).json({ message: 'Erro ao adicionar outfit' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao adicionar outfit', error: error.message });
    }
}
