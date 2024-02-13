import Outfit from "../../../lib/models/outfit";

export default async function handler(req, res){
    const outfitId = req.query.id;
    const {
        query: { id },
        method,
    } = req;

    if (req.method === "DELETE") {
        try {
            // Delete the outfit with the provided id
            await Outfit.deleteOutfit(outfitId);

            res.status(200).json({ message: "Outfit successfully deleted" });
        } catch (error) {
            console.error("An error occurred:", error);
            res.status(500).json({ error: "Unable to delete the outfit" });
        }
    } else if (req.method === "GET") {
        try {
            // Find outfit by id
            const outfit = await Outfit.findById(id);

            if (!outfit) {
                res.status(404).json({ error: "Outfit not found" });
                return;
            }

            res.status(200).json({ outfit });
        } catch (error) {
            console.error("An error occurred:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else if (method === "PUT") {
        const { marca, tecido, categoria, cor, tamanho, estacao, temperatura } = req.body;

        try {
            // Update the outfit
            const updatedOutfit = await Outfit.updateOutfit(id, { idTronco, idPernas, idPes, estacao, temperatura});

            res.status(200).json({ outfit: updatedOutfit });
        } catch (error) {
            console.error("An error occurred:", error);
            res.status(500).json({ error: "Unable to update the outfit" });
        }
    } else {
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).json({ error: "Method not allowed" });
    }
}
