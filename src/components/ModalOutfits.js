import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useRouter} from "next/router";

export default function ModalOutfits({ product }) {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [cloth, setCloth] = useState([]);

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const response = await fetch(`/api/outfit/outfitsCloth?outfitId=${product.id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.outfits) {
                        setCloth(data.outfits);
                        console.log("Produtos do usuário recebidos:", data.outfits);
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

        if (product) {
            fetchUserProducts();
        }
    }, [product]);


    const handleClose = () => {
        onOpenChange();
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleEdit = (product) => {
        const { id } = product;
        router.push(`/edit-outfit/${id}`);
    };


    const handleDelete = async (outfitId) => {
        try {
            const response = await fetch(`/api/outfit/${outfitId}`, {
                method: 'DELETE',
            });
            const delUser = await response.json();
            if (response.ok) {
                console.log("Peça de roupa eliminado")
                router.reload;
            } else {
                console.error('Delete falhou');
            }
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    };


    return (
        <>
            <Button
                key={product.id}
                onPress={onOpen}
                className="group h-full flex flex-col"
                variant="light"
                style={{ alignItems: 'flex-start', textAlign: 'left' }}
            >
                <div className="mt-2 mb-2 aspect-w-1 h-60 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                        src={product.path}
                        alt="Foto do outfit"
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={handleClose}
                placement="top-center"
                size="xl"  // Ajuste o tamanho conforme necessário
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="flex mt-4 p-3">
                                    <div className="w-1/2 mr-4"> {/* Ajuste o valor para alterar a largura */}
                                        <Slider {...settings} >
                                            <div>
                                                <img src={product.path} className="w-full h-96 rounded-3xl" alt="Slide 1" />
                                            </div>
                                        </Slider>
                                    </div>
                                    <div className="w-1/2 text-left mt-2 ml-2">
                                        {/* Informações sobre a peça de roupa */}
                                        <p className="text-md text-black font-bold mb-2">O que tem neste outfit?:</p>
                                        <Button
                                            key={product.id}
                                            onPress={onOpen}
                                            variant="light"
                                            className="h-20"
                                            style={{ alignItems: 'flex-start', textAlign: 'left' }}
                                        >
                                            <div className=" aspect-w-1 h-20 w-20 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                                <img
                                                    src={cloth.troncoPath}
                                                    alt={product.imageAlt}
                                                    className="h-20 w-full object-cover object-center group-hover:opacity-75"
                                                />
                                            </div>
                                            <div className="text-lg">
                                                <h3>{cloth.troncoCategoria}: {cloth.troncoMarca}</h3>
                                                <p className="mt-1 text-md text-gray-500">{product.tamanho}</p>
                                            </div>
                                        </Button>
                                        <Button
                                            key={product.id}
                                            onPress={onOpen}
                                            variant="light"
                                            className="h-20"
                                            style={{ alignItems: 'flex-start', textAlign: 'left' }}
                                        >
                                            <div className=" aspect-w-1 h-20 w-20 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                                <img
                                                    src={cloth.pernasPath}
                                                    alt={product.imageAlt}
                                                    className="h-20 w-full object-cover object-center group-hover:opacity-75"
                                                />
                                            </div>
                                            <div className="text-lg">
                                                <h3>{cloth.pernasCategoria}: {cloth.pernasMarca}</h3>
                                                <p className="mt-1 text-md text-gray-500">{product.tamanho}</p>
                                            </div>
                                        </Button>
                                        <Button
                                            key={product.id}
                                            onPress={onOpen}
                                            variant="light"
                                            className="h-20"
                                            style={{ alignItems: 'flex-start', textAlign: 'left' }}
                                        >
                                            <div className=" aspect-w-1 h-20 w-20 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                                <img
                                                    src={cloth.pesPath}
                                                    alt={product.imageAlt}
                                                    className="h-20 w-full object-cover object-center group-hover:opacity-75"
                                                />
                                            </div>
                                            <div className="text-lg">
                                                <h3>{cloth.pesCategoria}: {cloth.pesMarca}</h3>
                                                <p className="mt-1 text-md text-gray-500">42</p>
                                            </div>
                                        </Button>

                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-center mt-0">
                                <Button color="success" onPress={onOpen}>
                                    Utilizar
                                </Button>
                                <Button color="warning" title="Edit" onClick={() => handleEdit(product)}>
                                    Editar
                                </Button>
                                <Button color="danger"  title="Delete" onClick={() => handleDelete(product.id)}>
                                    Apagar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
