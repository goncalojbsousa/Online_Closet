import Navbar from "@/components/Navbar";
import {Button, Card, CardBody, Input, Tab, Tabs, Textarea} from "@nextui-org/react";
import {Divider} from "@nextui-org/react";

import React, {useEffect, useState} from "react";
import {Image} from "@nextui-org/react";

import IoIosHelpCircleOutline from 'react-icons/io';
import { FaUserEdit } from 'react-icons/fa';
import { CiFileOn, CiLock, CiMail, CiUser } from 'react-icons/ci';
import {useRouter} from "next/router";




export default function App({ Component, pageProps }) {
    const variants = [
        "solid",
        "underlined",
        "bordered",
        "light",
    ];

    const colors = [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger"
    ];

    const router = useRouter();
    const [id, setId] = useState(null);
    const [user, setUser] = useState({ name: "", email: "" });
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [apiResponse, setApiResponse] = useState(null);
    const [image, setImage] = useState(null);

    //verifica se esta autenticado
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    // manda para a pagina de login quando nao tem token
                    router.push("/auth/login");
                } else {
                    const response = await fetch("/api/auth/check-auth", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();

                    if (!response.ok) {
                        // manda para o login se o token for invalido
                        router.push("/auth/login");
                    } else {
                        // guarda os dados
                        setUser(data.user);
                        setId(data.user.id);
                    }
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };

        checkAuthentication();
    }, []);

    useEffect(() => {
        // Fetch the user data based on the ID from the query parameter
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/auth/${id}`);
                const data = await response.json();
                console.log("----User Details---", data);
                setUser(data.user);
            } catch (error) {
                console.error("Ocurreu um erro:", error);
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id]);




    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('/api/user/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Image URL:', data.imageUrl);
                const imageUrl = data.imageUrl || null;
                console.log(imageUrl); // Verifique se a URL da imagem está correta

                await waitForPath(imageUrl, {
                    name,
                    email,
                    password,
                    confirmPassword,
                }, event);
            } else {
                console.error('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const waitForPath = async (imageUrl, userData, event) => {
        if (!imageUrl) {
            // Se a URL da imagem não estiver definida, aguardar por um curto período antes de verificar novamente
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await waitForPath(imageUrl, userData); // Chamada recursiva para verificar novamente
        } else {
            // verifica se as senhas introduzidas coincidem
            if (password !== confirmPassword) {
                setPasswordMatch(false);
                setApiResponse("As senhas não coincidem");
                return;
            }

            // recuperar os dados atualizados do usuário nos campos do formulário
            const formData = new FormData(event.target);
            const updatedUser = {
                name: formData.get("name"),
                email: formData.get("email"),
                password: formData.get("password"),
                confirmPassword: formData.get("confirmPassword"),
                imagePath: imageUrl,
                // outros campos...
            };

            try {
                // enviar os dados atualizados do user ao servidor para processamento
                const response = await fetch(`/api/auth/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedUser),
                });

                if (response.ok) {
                    console.log("usuario atualizado");
                    router.reload;
                } else {
                    console.error("Update falhou");
                }
            } catch (error) {
                console.error("Ocurreu um erro:", error);
            }
        }
    };







    if (!user) {
        return <p>Loading user...</p>;
    }

    return (
        <>

            <div className="fixed w-screen">
                <Navbar/>
                <div className="flex sticky h-screen">
                    <div className="w-1/3 bg-white flex flex-col items-center justify-center mt-[-250px]">
                        <Image
                            width={300}
                            height={200}
                            src={user.imagePath}
                            fallbackSrc="https://placehold.co/300x200?text=Loading..."
                            alt="NextUI Image with fallback"
                        />
                        <h1 className="mt-16 text-lg font-semibold">{user.name}</h1>
                        <p className="mt-2 text-md text-gray-500">{user.email}</p>
                    </div>
                        <div className="w-full p-7">
                            <Tabs aria-label="Options" variant="underlined" color="success">
                                <Tab key="perfil" title="Perfil" >
                                    <Divider className="mb-4" />
                                    <Card>
                                        <CardBody className="p-8">
                                            <h1 className="text-lg flex items-center space-x-4 text-green-500">
                                                <span>Editar Perfil</span><FaUserEdit />
                                            </h1>
                                            <div className="invalid-feedback">{!passwordMatch && <p>As palavras-passe não coincidem!</p>}</div>
                                            <form onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-2 gap-2 mt-40 mb-52 ml-40">
                                                <div className="space-y-4">
                                                    <Input
                                                        type="text"
                                                        className="w-10/12"
                                                        endContent={
                                                            <CiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                        }
                                                        label="Nome"
                                                        placeholder="Introduza o nome"
                                                        variant="bordered"
                                                        id="name"
                                                        name="name"
                                                        value={user.name}
                                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                                        required
                                                    />
                                                    <Input
                                                        type="email"
                                                        className="w-10/12"
                                                        endContent={
                                                            <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                        }
                                                        label="Email"
                                                        placeholder="Introduza o email"
                                                        variant="bordered"
                                                        id="email"
                                                        name="email"
                                                        value={user.email}
                                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="space-y-4">
                                                    <Input

                                                        className="w-10/12"
                                                        endContent={<CiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                                        label="Password"
                                                        placeholder="Introduza o nova password"
                                                        variant="bordered"
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                    <Input
                                                        type="password"
                                                        className="w-10/12"
                                                        endContent={<CiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                                        label="Confirmar Password"
                                                        placeholder="Confirme a nova password"
                                                        variant="bordered"
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-10/12 ml-72 mt-4">
                                                    <p className="mb-2 text-sm text-gray-500">Fotografia de perfil</p>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        variant="bordered"
                                                        endContent={<CiFileOn  className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                                        isRequired
                                                        name="image"
                                                        id="image"
                                                        onChange={handleImageChange}
                                                    />
                                                </div>
                                                </div>
                                                <div className="text-right">
                                                    <Button
                                                        type="submit"
                                                        className="w-52"
                                                        color="success"
                                                    >
                                                        Confirmar
                                                    </Button>
                                                </div>
                                            </form>
                                        </CardBody>
                                    </Card>
                                </Tab>
                                <Tab key="suporte" title="Suporte">
                                    <Divider className="mb-2" />
                                    <Card>
                                        <CardBody className="p-8">
                                            <h1 className="text-lg flex items-center space-x-4 text-green-500">
                                                <span>Suporte</span><IoIosHelpCircleOutline />
                                            </h1>
                                                <div className="w-80 ml-96 mt-40 mb-40 space-y-4">
                                                    <h1 className="text-2xl">Precisas de ajuda com algo?</h1>
                                                    <h1 className="text-xl">Contacta-nos</h1>
                                                    <Input
                                                        type="text"
                                                        className="w-96"
                                                        label="Assunto"
                                                        placeholder="Introduza o assunto"
                                                        variant="bordered"
                                                    />
                                                    <Textarea
                                                        className="w-96"
                                                        label="Mensagem"
                                                        placeholder="Escreva a sua mensagem aqui"
                                                        variant="bordered"
                                                    />
                                                    <div className="text-center">
                                                        <Button
                                                            className="w-52"
                                                            color="success"
                                                        >
                                                            Enviar
                                                        </Button>
                                                    </div>

                                            </div>
                                        </CardBody>
                                    </Card>
                                </Tab>
                            </Tabs>
                        </div>
                </div>
            </div>

        </>
    );
}
