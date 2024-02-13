import pool from '../db';

class Cloth {
    static async findById(id){
        const query = 'SELECT * FROM cloths WHERE id = ?';
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

    static async createCloth (marca, tecido, categoria, cor, tamanho, estacao, temperatura, userId, path) {
        const query = 'INSERT INTO cloths (marca, tecido, categoria, cor, tamanho, estacao, temperatura, userId, path) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)';
        const values = [marca, tecido, categoria, cor, tamanho, estacao, temperatura, userId, path]

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

    static async fetchUserCloths(userId) {
        const query = 'SELECT * FROM cloths WHERE userId = ?';
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

    static async deleteCloth(clothId) {
        const query = 'DELETE FROM cloths WHERE id = ?';
        const values = [clothId];

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

    static async updateCloth(clothId, clothData) {
        const { marca, tecido, categoria, cor, tamanho, estacao, temperatura } = clothData;
        const query = 'UPDATE cloths SET marca = ?, tecido = ?, categoria = ?, cor = ?, tamanho = ?, estacao = ?, temperatura = ? WHERE id = ?';
        const values = [marca, tecido, categoria, cor, tamanho, estacao, temperatura, clothId];

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

export default Cloth;