import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/router';
import Link from "next/link";

export default function ModalRoupas({ product }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

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
        router.push(`/edit-cloth/${id}`);
    };


    const handleDelete = async (clothId) => {
        try {
            const response = await fetch(`/api/cloth/${clothId}`, {
                method: 'DELETE',
            });
            const delUser = await response.json();
            if (response.ok) {
                console.log("Peça de roupa eliminado")
                router.push("/armario").then(() => window.location.reload());
            } else {
                console.error('Delete falhou');
            }
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    };

    const abrirSite = () => {
        const url = "https://www.humana-portugal.org/?id=1https%3A%2F%2Fwww.humana-portugal.org%2F%3Fid%3D1";
        window.open(url, "_blank");
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
                <div className="mt-2 aspect-w-1 h-60 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                        src={product.path}
                        alt="Foto da peça de roupa"
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>
                <div className="text-lg">
                    <h3>{product.categoria} : {product.marca}</h3>
                    <p className="mt-1 text-md text-gray-500">{product.tamanho}</p>
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
                                            <div>
                                                <img src={product.path} className="w-full h-96 rounded-3xl" alt="Slide 1" />
                                            </div>
                                    </div>
                                    <div className="w-1/2 text-left mt-2 ml-2">
                                        {/* Informações sobre a peça de roupa */}
                                        <p className="text-md text-black font-bold">Categoria:</p>
                                        <p className="text-lg text-gray-700">{product.categoria}</p>
                                        <p className="text-md text-black font-bold">Marca:</p>
                                        <p className="text-lg text-gray-700">{product.marca}</p>
                                        <p className="text-md text-black font-bold">Tecido:</p>
                                        <p className="text-lg text-gray-700">{product.tecido}</p>
                                        <p className="text-md text-black font-bold">Estação do Ano:</p>
                                        <p className="text-lg text-gray-700">{product.estacao}</p>
                                        <p className="text-md text-black font-bold">Temperatura Indicada:</p>
                                        <p className="text-lg text-gray-700">{product.temperatura}°C</p>
                                        <p className="text-md text-black font-bold">Cor</p>
                                        <p className="text-lg text-gray-700">{product.cor}</p>
                                        <p className="text-md text-black font-bold">Tamanho:</p>
                                        <p className="text-lg text-gray-700">{product.tamanho}</p>
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
                                <Button color="primary" onClick={abrirSite} >
                                    Doar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
