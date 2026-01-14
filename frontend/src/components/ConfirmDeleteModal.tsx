import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,  } from "@heroui/react";


export default function ConfirmDeleteModal({
    isOpen,
    onOpenChange,
    onConfirm,
    title = "Confirmar eliminación",
    description = "¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.",
}: {
    isOpen: boolean;
    onOpenChange: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
}) {
    return (
        <Modal
            isOpen={isOpen}
            placement="top-center"
            backdrop="blur"
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="text-danger">
                            {title}
                        </ModalHeader>

                        <ModalBody>
                            <p className="text-sm text-default-600">
                                {description}
                            </p>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                variant="flat"
                                onPress={onClose}
                            >
                                Cancelar
                            </Button>

                            <Button
                                color="danger"
                                onPress={() => {
                                    onConfirm();
                                    onClose();
                                }}
                            >
                                Eliminar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}