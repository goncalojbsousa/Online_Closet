import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {Input} from "@nextui-org/react";

export default function EditUserPage() {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState({ name: "", email: "" });
    const [apiResponse, setApiResponse] = useState(null);
    const [idTronco, setIdTronco] = useState("");
    const [idPernas, setIdPernas] = useState("");
    const [idPes, setIdPes] = useState("");
    const [products, setProducts] = useState([]);
    const [estacao, setEstacao] = useState("");
    const [temperatura, setTemperatura] = useState("");

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
                    }
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };

        checkAuthentication();
    }, []);

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const response = await fetch(`/api/cloth/cloths?userId=${user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.cloths) {
                        setProducts(data.cloths);
                        console.log("Produtos do usuário recebidos:", data.cloths);
                    } else {
                        console.log("Nenhum produto do usuário recebido ou resposta vazia.");
                    }
                } else {
                    throw new Error("Falha ao obter produtos do usuário");
                }
            } catch (error) {
                console.error("Ocorreu um erro ao buscar produtos do usuário:", error);
            }
        };

        if (user) {
            fetchUserProducts();
        }
    }, [user]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/auth/${id}`);
                const data = await response.json();
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

    const handleSubmit = async (event, userId) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Image URL:', data.imageUrl);
                const imageUrl = data.imageUrl || null;
                console.log(imageUrl); // Verifique se a URL da imagem está correta

                await waitForPath(imageUrl, userId, {
                    idTronco,
                    idPes,
                    idPernas,
                    estacao,
                    temperatura,
                });
            } else {
                console.error('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const waitForPath = async (imageUrl, userId, outfitData) => {
        if (!imageUrl) {
            // Se a URL da imagem não estiver definida, aguardar por um curto período antes de verificar novamente
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await waitForPath(imageUrl, userId, outfitData); // Chamada recursiva para verificar novamente
        } else {
            try {
                const res = await fetch("/api/outfit/add-outfit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...outfitData, userId, path: imageUrl }),
                });

                const responseData = await res.json();
                console.log("---- Signup API Response ---");
                console.log(responseData);

                if (res.ok) {
                    router.push("/outfits").then(() => window.location.reload());
                } else {
                    console.error(responseData.message);
                    setApiResponse(responseData.message);
                }
            } catch (error) {
                console.error("Ocorreu um erro:", error);
            }
        }
    };

    if (!user) {
        return <p>Loading user...</p>;
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-center">
                <div className="w-1/2 bg-white shadow-md rounded p-6">
                    <h2 className="text-2xl mb-6">Criar outfit</h2>
                    <form onSubmit={(event) => handleSubmit(event, user ? user.id : null)} className="w-full">
                        <div className="mb-4">
                            <select value={idTronco} onChange={(e) => setIdTronco(e.target.value)}>
                                <option value="">Selecione a primeira roupa</option>
                                {products.map((cloth) => (
                                    <option key={cloth.id} value={cloth.id}>
                                        {cloth.marca} - {cloth.categoria}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <select value={idPernas} onChange={(e) => setIdPernas(e.target.value)}>
                                <option value="">Selecione a segunda roupa</option>
                                {products.map((cloth) => (
                                    <option key={cloth.id} value={cloth.id}>
                                        {cloth.marca} - {cloth.categoria}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <select value={idPes} onChange={(e) => setIdPes(e.target.value)}>
                                <option value="">Selecione a terceira roupa</option>
                                {products.map((cloth) => (
                                    <option key={cloth.id} value={cloth.id}>
                                        {cloth.marca} - {cloth.categoria}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input
                                isRequired
                                variant="bordered"
                                label="Estação do ano"
                                placeholder="Introduza a estação do ano a que mais se adequa"
                                className="max-w-lg"
                                type="text"
                                id="estacao"
                                value={estacao}
                                onChange={(e) => setEstacao(e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                isRequired
                                variant="bordered"
                                label="Temperatura"
                                placeholder="Introduza a temperatura que mais se adequa"
                                className="max-w-lg"
                                type="text"
                                id="temperatura"
                                value={temperatura}
                                onChange={(e) => setTemperatura(e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                isRequired
                                type="file"
                                accept="image/*"
                                variant="bordered"
                                name="image"
                                id="image"
                                onChange={handleImageChange}
                            />
                        </div>


                        <div className="flex gap-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Criar
                            </button>
                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                <Link href="/admin/utilizadores">Cancelar</Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}