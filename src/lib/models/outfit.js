import pool from '../db';

class Outfit {
    static async findById(id){
        const query = 'SELECT * FROM outfits WHERE id = ?';
        const values = [id];
        return new Promise((resolve, reject) => {
            pool.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    };

    static async findClothsById(id){
        const query = `
            SELECT o.id             AS outfitId,
                   o.idTronco,
                   tronco.marca     AS troncoMarca,
                   tronco.categoria AS troncoCategoria,
                   tronco.path      AS troncoPath,

                   o.idPernas,
                   pernas.marca     AS pernasMarca,
                   pernas.categoria AS pernasCategoria,
                   pernas.path      AS pernasPath,

                   o.idPes,
                   pes.marca        AS pesMarca,
                   pes.categoria    AS pesCategoria,
                   pes.path         AS pesPath

            FROM outfits o
                     LEFT JOIN cloths AS tronco ON o.idTronco = tronco.id
                     LEFT JOIN cloths AS pernas ON o.idPernas = pernas.id
                     LEFT JOIN cloths AS pes ON o.idPes = pes.id
            WHERE o.id = ?`;
        const values = [id];
        return new Promise((resolve, reject) => {
            pool.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    };



    static async createOutfit(idTronco, idPernas, idPes, estacao, temperatura, userId, path) {
        const query = 'INSERT INTO outfits (idTronco, idPernas, idPes, estacao, temperatura, userId, path) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [idTronco, idPernas, idPes, estacao, temperatura, userId, path];

        return new Promise((resolve, reject) => {
            pool.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    }

    static async fetchUserOutfits(userId) {
        const query = 'SELECT * FROM outfits WHERE userId = ?';
        const values = [userId];

        return new Promise((resolve, reject) => {
            pool.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async deleteOutfit(outfitId) {
        const query = 'DELETE FROM outfits WHERE id = ?';
        const values = [outfitId];

        return new Promise((resolve, reject) => {
            pool.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.affectedRows);
                }
            });
        });
    }

    static async updateOutfit(outfitId, outfitData) {
        const { idTronco, idPernas, idPes, idAcessorio, estacao, temperatura } = outfitData;
        const query = 'UPDATE outfits SET idTronco = ?, idPernas = ?, idPes = ?, idAcessorio = ?, estacao = ?, temperatura = ? WHERE id = ?';
        const values = [idTronco, idPernas, idPes, idAcessorio, estacao, temperatura, outfitId];

        return new Promise((resolve, reject) => {
            pool.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.affectedRows);
                }
            });
        });
    }
}

export default Outfit;
