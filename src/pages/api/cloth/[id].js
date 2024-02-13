import Cloth from "../../../lib/models/cloth";

export default async function handler(req, res){
    const clothId = req.query.id;
    const {
        query: { id },
        method,
    } = req;

    if (req.method === "DELETE") {
        try {
            // apaga a peça do id fornecido
            await Cloth.deleteCloth(clothId);

            res.status(200).json({ message: "Roupa eliminada com sucesso" });
        } catch (error) {
            console.error("An error occurred:", error);
            res.status(500).json({ error: "Incapaz de apagar a peça de roupa" });
        }
    } else if (req.method === "GET") {
        try {
            // procura roupa por id
            const cloth = await Cloth.findById(id);

            if (!cloth) {
                res.status(404).json({ error: "Roupa nao encontrada" });
                return;
            }

            res.status(200).json({ cloth });
        } catch (error) {
            console.error("An error occurred:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else if (method === "PUT") {
        const { marca, tecido, categoria, cor, tamanho, estacao, temperatura } = req.body;

        try {
            // atualizar o cloth
            const updatedCloth = await Cloth.updateCloth(id, { marca, tecido, categoria, cor, tamanho, estacao, temperatura });

            res.status(200).json({ cloth: updatedCloth });
        } catch (error) {
            console.error("An error occurred:", error);
            res.status(500).json({ error: "Incapaz de atualizar a roupa" });
        }
    } else {
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).json({ error: "Method not allowed" });
    }
}