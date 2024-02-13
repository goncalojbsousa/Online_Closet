import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import { CiWarning } from "react-icons/ci";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ModalEditRoupa({ product }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    return (
        <>
            <Button color="warning" onPress={onOpen}>
                Editar peça de roupa
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
                                                <img src={product.imageSrc} className="w-full h-96 rounded-3xl" alt="Slide 1" />
                                            </div>
                                            <div>
                                                <img src={product.imageSrc2} className="w-full h-96 rounded-3xl" alt="Slide 2" />
                                            </div>
                                            <div>
                                                <img src={product.imageSrc3} className="w-full h-96 rounded-3xl" alt="Slide 3" />
                                            </div>
                                        </Slider>
                                    </div>
                                    <div className="w-1/2 text-right mt-2">
                                        {/* Informações sobre a peça de roupa */}
                                        <p className="text-md text-black font-bold">Categorias:</p>
                                        <p className="text-lg text-gray-700">{product.categoria}</p>
                                        <p className="text-md text-black font-bold">Marca:</p>
                                        <p className="text-lg text-gray-700">{product.marca}</p>
                                        <p className="text-md text-black font-bold">Tamanho:</p>
                                        <p className="text-lg text-gray-700">{product.tamanho}</p>
                                        <p className="text-md text-black font-bold">Tecido:</p>
                                        <p className="text-lg text-gray-700">{product.tecido}</p>
                                        <p className="text-md text-black font-bold">2ª Mão:</p>
                                        <p className="text-lg text-gray-700">{product.segunda_mao}</p>
                                        <p className="text-md text-black font-bold">Estação do Ano:</p>
                                        <p className="text-lg text-gray-700">{product.EstacaoAno}</p>
                                        <p className="text-md text-black font-bold">Temperatura Indicada:</p>
                                        <p className="text-lg text-gray-700">{product.temperaturaIndicada}</p>
                                        {/* Adicione mais informações conforme necessário */}
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-right mt-0">
                                <Button color="danger" onPress={handleClose}>
                                    Cancelar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
