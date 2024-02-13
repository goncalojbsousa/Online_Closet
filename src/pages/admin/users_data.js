import { useState, useEffect } from "react";

const useUserColumns = () => {
    const columns = [
        { name: "ID", uid: "id", sortable: true },
        { name: "NOME", uid: "name", sortable: true },
        { name: "IDADE", uid: "idade", sortable: true },
        { name: "SCORE", uid: "score" },
        { name: "TEAM", uid: "team" },
        { name: "EMAIL", uid: "email" },
        { name: "STATUS", uid: "status" },
        { name: "ACTIONS", uid: "actions" },
    ];
    return columns;
};

const useUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/auth/users');

                if (response.ok) {
                    const data = await response.json();
                    if (data && data.users) {
                        setUsers(data.users);
                        console.log("Usuários recebidos:", data.users);
                    } else {
                        console.log("Nenhum usuário recebido ou resposta vazia.");
                    }
                } else {
                    throw new Error("Falha ao obter usuários");
                }
            } catch (error) {
                console.error("Ocorreu um erro ao buscar usuários:", error);
            }
        };

        fetchUsers();
    }, []);

    return users;
};

const useStatusOptions = () => {
    const statusOptions = [
        { name: "Admin", uid: "admin" },
        { name: "Utilizador", uid: "utilizador" },
    ];
    return statusOptions;
};

export { useUserColumns, useUsers, useStatusOptions };
