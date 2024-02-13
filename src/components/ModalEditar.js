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
import {CiEdit, CiLock, CiMail, CiUser} from "react-icons/ci";
import React from "react";
import {MdOutlineDeleteForever} from "react-icons/md";

export default function ModalEditar() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Tooltip content="Editar utilizador">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Button isIconOnly color="default" variant="light" onPress={onOpen}><CiEdit /> </Button>
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
                            <ModalHeader className="flex flex-col gap-1">Editar utilizador</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    endContent={
                                        <CiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Nome"
                                    placeholder="Introduza o nome"
                                    variant="bordered"
                                />
                                <Input
                                    endContent={
                                        <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Email"
                                    placeholder="Introduza o Email"
                                    type="email"
                                    variant="bordered"
                                />
                                <Input
                                    endContent={
                                        <CiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Password"
                                    placeholder="Introduza a password"
                                    type="password"
                                    variant="bordered"
                                />
                                <Select
                                    isDisabled
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
                                    Editar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}