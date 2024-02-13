import {
    Button,
    Checkbox,
    Input,
    Modal,
    ModalBody,
    ModalContent, ModalFooter,
    ModalHeader, Select, SelectItem,
    useDisclosure
} from "@nextui-org/react";
import {CiLock, CiMail, CiUser} from "react-icons/ci";
import React, {useState} from "react";

export default function ModalAdicionar() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
                <Button onPress={onOpen} color="success">Adicionar Utilizador</Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Adicionar utilizador</ModalHeader>
                                <ModalBody>
                                    <Input
                                        isRequired
                                        autoFocus
                                        endContent={
                                            <CiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Nome"
                                        placeholder="Introduza o nome"
                                        variant="bordered"
                                    />
                                    <Input
                                        isRequired
                                        endContent={
                                            <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Email"
                                        placeholder="Introduza o Email"
                                        type="email"
                                        variant="bordered"
                                    />
                                    <Input
                                        isRequired
                                        endContent={
                                            <CiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Password"
                                        placeholder="Introduza a password"
                                        type="password"
                                        variant="bordered"
                                    />
                                    <Select
                                        isRequired
                                        variant="bordered"
                                        label="Genero"
                                        placeholder="Introduza o genero"
                                        className="max-w-lg"
                                    >
                                        <SelectItem>Masculino</SelectItem>
                                        <SelectItem>Feminino</SelectItem>
                                        <SelectItem>Outro</SelectItem>
                                    </Select>
                                    <div className="flex py-2 px-1 justify-between">
                                        <Checkbox
                                            classNames={{
                                                label: "text-small",
                                            }}
                                        >
                                            Admin
                                        </Checkbox>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button color="success" onPress={onClose}>
                                        Adicionar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
    );
}