import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@heroui/react";
import { useForm } from "react-hook-form";
import type { Category } from "../types/category";
import type { Workshop, WorkshopForm } from "../types/workshop";
import { editWorkshop } from "../api/workshop.api";
import { useEffect } from "react";



export default function EeditWorkshopModal({
    isOpen,
    onOpenChange,
    onEdit,
    categories,
    workshopSelect,
}: {
    isOpen: boolean;
    onOpenChange: () => void;
    onEdit: () => void;
    categories: Category[];
    workshopSelect: Workshop
}) {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        if (!workshopSelect) return;

        setValue("name", workshopSelect.name);
        setValue("description", workshopSelect.description);
        setValue(
            "start_date",
            workshopSelect.start_date.slice(0, 16)
        );
        setValue("category", workshopSelect.category);
    }, [workshopSelect, setValue]);

    function validateDate(value: string) {
        const selectedDate = new Date(value);
        const now = new Date();

        if (selectedDate < now) {
            return "La fecha no puede ser anterior a la actual";
        }

        return true;
    }

    async function setWorkshop(data: WorkshopForm) {
        if (!workshopSelect) return;
        await editWorkshop(workshopSelect.id, data);
        onEdit();
    }


    return (
        <Modal
            isOpen={isOpen}
            placement="top-center"
            backdrop="blur"
            onOpenChange={onOpenChange}>

            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit((data) => {
                        reset();
                        onClose();
                        setWorkshop(data as WorkshopForm)
                    })}>
                        <ModalHeader>Registrar Taller</ModalHeader>

                        <ModalBody className="gap-4">

                            <Input
                                label="Nombre"
                                variant="bordered"
                                errorMessage="Porfavor ingresa un nombre"
                                isInvalid={!!errors.name}
                                {...register("name", { required: true })}
                            />

                            <Input
                                label="Fecha de inicio"
                                type="datetime-local"
                                variant="bordered"
                                placeholder="Ingresa fecha"
                                errorMessage={errors.start_date?.message as string}
                                isInvalid={!!errors.start_date}
                                {...register("start_date", {
                                    required: "La fecha es obligatoria",
                                    validate: validateDate,
                                })}
                            />

                            <Select
                                label="Categoría"
                                variant="bordered"
                                errorMessage="Porfavor seleciona una categoría"
                                placeholder="Selecciona una categoría"
                                isInvalid={!!errors.category}
                                {...register("category", {
                                    required: true,
                                    valueAsNumber: true,
                                })}
                            >
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </Select>


                            {/* Columna derecha */}
                            <Textarea
                                label="Descripción"
                                errorMessage="Porfavor ingresa una descripción"
                                isInvalid={!!errors.description}
                                variant="bordered"
                                minRows={6}
                                {...register("description", { required: true })

                                }
                            />

                        </ModalBody>

                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="flat"
                                onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button color="primary" type="submit">
                                Guardar
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}
