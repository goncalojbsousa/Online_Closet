import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tooltip,
    useDisclosure
} from "@nextui-org/react";
import { CiWarning } from "react-icons/ci";
import { GiConfirmed } from "react-icons/gi";
import React, { useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";

export default function ModalApagar() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [apagarSucesso, setApagarSucesso] = useState(false);

    const handleApagar = () => {
        // Lógica para excluir o usuário (chamada à API, etc.)
        // ...

        // Após a exclusão bem-sucedida, atualize o estado
        setApagarSucesso(true);
    };

    // Reseta o estado ao fechar o modal
    const handleClose = () => {
        setApagarSucesso(false);
        onOpenChange();
    };

    return (
        <>
            <Tooltip color="danger" content="Apagar utilizador">
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <Button isIconOnly color="danger" variant="light" onPress={onOpen}>
            <MdOutlineDeleteForever />
          </Button>
        </span>
            </Tooltip>
            <Modal
                isOpen={isOpen}
                onOpenChange={handleClose}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col items-center gap-1">
                                {apagarSucesso ? (
                                    <GiConfirmed style={{ fontSize: "5rem", color: "green" }} />
                                ) : (
                                    <CiWarning style={{ fontSize: "5rem", color: "red" }} />
                                )}
                            </ModalHeader>
                            <ModalBody className="text-center">
                                {apagarSucesso ? (
                                    <p>Utilizador apagado com sucesso</p>
                                ) : (
                                    <p>Tem a certeza que pretende apagar este utilizador?</p>
                                )}
                            </ModalBody>
                            <ModalFooter className="flex justify-center">
                                {!apagarSucesso ? (
                                    <>
                                        <Button color="warning" variant="flat" onPress={handleClose}>
                                            Cancelar
                                        </Button>
                                        <Button color="danger" onPress={handleApagar}>
                                            Apagar
                                        </Button>
                                    </>
                                ) : (
                                    <Button color="success" onPress={handleClose}>
                                        OK
                                    </Button>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
