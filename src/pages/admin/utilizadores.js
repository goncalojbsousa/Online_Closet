import BaseLayout from "@/components/BaseLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
} from "@nextui-org/react";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

const statusColorMap = {
    admin: "success",
    utilizador: "primary",
};

const INITIAL_VISIBLE_COLUMNS = ["id", "name", "email", "status", "actions"];

export default function Utilizadores() {
    const router = useRouter();
    const [users, setUsers] = useState([]);

    const checkAuthentication = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/auth/login");
            } else {
                const response = await fetch("/api/auth/check-auth", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                if (!response.ok) {
                    router.push("/auth/login");
                } else {
                    setUser(data.user);
                }
                if (data.user && !data.user.admin) {
                    router.push("/armario");
                } else if (data.user && data.user.admin) {
                    console.log("conta admin pode passar");
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/auth/users");
                const data = await response.json();
                setUsers(
                    data.users.map((user) => ({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        status: user.admin ? "admin" : "utilizador",
                    }))
                );
            } catch (error) {
                console.error("Ocorreu um erro ao buscar os usuários:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleProfileUpdate = async () => {
        try {
            const response = await fetch("/api/auth/update-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json",},body: JSON.stringify({
                    name: "John Doe",
                    email: "tugrp@example.com",
                    password: "password",
                })
            });
        }
        catch (error) {
            console.error("Ocorreu um erro:", error);
        }
    }

    const handleEdit = (userId) => {
        const { id } = userId;
        router.push(`/edit-user/${id}`);
    };


    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`/api/auth/${userId}`, {
                method: 'DELETE',
            });
            const delUser = await response.json();
            if (response.ok) {
                console.log("Utilizador eliminado")
                router.reload();
                // refetch user list
            } else {
                console.error('Delete falhou');
            }
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    };

    const columns = [
        { name: 'Foto', key: 'foto' },
        { name: 'ID', key: 'id' },
        { name: 'Name', key: 'name' },
        { name: 'Email', key: 'email' },
        { name: 'Status', key: 'status' },
        { name: 'Actions', key: 'actions' },
    ];

    return (
        <BaseLayout>
            <Table
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                columns={columns}
            >
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.key}>
                            {column.name}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <img
                                    src={user.path || "/users/fotoPadrao.png"}
                                    width={50}
                                    height={50}
                                    alt="Foto de perfil"
                                />
                            </TableCell>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Chip color={statusColorMap[user.status]}>
                                    {user.status}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => handleEdit(user)}>
                                    Editar
                                </Button>
                                <Button title="Delete" onClick={() => handleDelete(users.id)}>
                                    Apagar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </BaseLayout>
    );
}
