import {
    Button,
    Checkbox,
    Input,
    Modal,
    ModalBody,
    ModalContent, ModalFooter,
    ModalHeader, Select, SelectItem, Tooltip,
    useDisclosure
} from "@nextui-org/react";
import { GiRolledCloth } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { WiDayWindy } from "react-icons/wi";
import { Switch } from "@nextui-org/react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ModalAddRoupa({ categoriaInicial }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSelected, setIsSelected] = React.useState(true);
    const [categoria, setCategoria] = useState("");
    const [cor, setCor] = useState("");
    const [tamanho, setTamanho] = useState("");
    const [marca, setMarca] = useState("");
    const [tecido, setTecido] = useState("");
    const [estacao, setEstacao] = useState("");
    const [temperatura, setTemperatura] = useState("");
    const [apiResponse, setApiResponse] = useState(null);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [image, setImage] = useState(null);
    const [fileError, setFileError] = useState(null);

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
                console.log(imageUrl);

                await waitForPath(imageUrl, userId, {
                    marca,
                    tecido,
                    categoria,
                    cor,
                    tamanho,
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

    const waitForPath = async (imageUrl, userId, clothData) => {
        if (!imageUrl) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await waitForPath(imageUrl, userId, clothData);
        } else {
            try {
                const res = await fetch("/api/cloth/add-cloth", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...clothData, userId, path: imageUrl }),
                });

                const responseData = await res.json();
                console.log("---- Signup API Response ---");
                console.log(responseData);

                if (res.ok) {
                    router.push("/armario").then(() => window.location.reload());
                } else {
                    console.error(responseData.message);
                    setApiResponse(responseData.message);
                }
            } catch (error) {
                console.error("Ocorreu um erro:", error);
            }
        }
    };

    useEffect(() => {
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
                }
            } catch (error) {
                console.error("Ocorreu um erro:", error);
            }
        };
        checkAuthentication();
    }, []);

    useEffect(() => {
        setCategoria(categoriaInicial);
    }, [categoriaInicial]);

    return (
        <>
            <Tooltip  content="Adicionar Roupa">
                <span className="ml-2 cursor-pointer active:opacity-50">
                    <Button
                        isIconOnly
                        href="#"
                        color="success"
                        variant="light"
                        onPress={onOpen}
                    >
                        <IoMdAddCircleOutline style={{ fontSize: '1.5rem' }} />
                    </Button>
                </span>
            </Tooltip>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Adicionar peça de roupa</ModalHeader>
                            <form onSubmit={(event) => handleSubmit(event, user ? user.id : null)}>
                                <ModalBody>
                                    <Input
                                        isRequired
                                        variant="bordered"
                                        label="Marca"
                                        placeholder="Introduza o marca"
                                        className="max-w-lg"
                                        type="text"
                                        id="marca"
                                        value={marca}
                                        onChange={(e) => setMarca(e.target.value)}
                                    />
                                    <Input
                                        isRequired
                                        endContent={
                                            <GiRolledCloth className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Tecido"
                                        placeholder="Introduza a material do tecido"
                                        type="text"
                                        variant="bordered"
                                        id="tecido"
                                        value={tecido}
                                        onChange={(e) => setTecido(e.target.value)}
                                    />
                                    <Input
                                        isRequired
                                        variant="bordered"
                                        label="Tamanho"
                                        placeholder="Introduza o tamanho"
                                        className="max-w-lg"
                                        type="text"
                                        id="tamanho"
                                        value={tamanho}
                                        onChange={(e) => setTamanho(e.target.value)}
                                    />
                                    <Input
                                        isRequired
                                        variant="bordered"
                                        label="Categoria"
                                        placeholder={categoria}
                                        className="max-w-lg"
                                        type="text"
                                        id="categoria"
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}
                                        disabled
                                    />
                                    <Input
                                        isRequired
                                        variant="bordered"
                                        label="Cor"
                                        placeholder="Introduza a cor"
                                        className="max-w-lg"
                                        type="text"
                                        id="cor"
                                        value={cor}
                                        onChange={(e) => setCor(e.target.value)}
                                    />
                                    <Input
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
                                    <Input
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
                                    <Input
                                        isRequired
                                        type="file"
                                        accept="image/*"
                                        variant="bordered"
                                        name="image"
                                        id="image"
                                        onChange={handleImageChange}
                                    />

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit" color="success" >
                                        Adicionar
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}