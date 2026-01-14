import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@heroui/react";
import { useForm } from "react-hook-form";
import type { Category } from "../types/category";
import type { Workshop, WorkshopForm } from "../types/workshop";
import { editWorkshop } from "../api/workshop.api";
import { useEffect } from "react";


export default function EditWorkshopModal({
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
    workshopSelect: Workshop;
}) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<WorkshopForm>();

    useEffect(() => {
        if (workshopSelect) {
            reset({
                name: workshopSelect.name,
                description: workshopSelect.description,
                start_date: workshopSelect.start_date.slice(0, 16),
                category: workshopSelect.category,
            });
        }
    }, [workshopSelect, reset]);

    function validateDate(value: string) {
        const selectedDate = new Date(value);
        const now = new Date();

        if (selectedDate < now) {
            return "La fecha no puede ser anterior a la actual";
        }

        return true;
    }

    const onSubmit = async (data: WorkshopForm, onClose: () => void) => {
        if (!workshopSelect) return;
        await editWorkshop(workshopSelect.id, data);
        onEdit();
        onClose();
        reset();
    };

    return (
        <Modal
            isOpen={isOpen}
            placement="top-center"
            backdrop="blur"
            onOpenChange={() => {
                reset()
                onOpenChange();
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit((data) => onSubmit(data, onClose))}>
                        <ModalHeader>Editar Taller</ModalHeader>
                        <ModalBody className="gap-4">
                            <Input
                                label="Nombre"
                                variant="bordered"
                                isRequired
                                isInvalid={!!errors.name}
                                {...register("name", { required: "El nombre es obligatorio" })}
                            />
                            <Input
                                label="Fecha de inicio"
                                type="datetime-local"
                                variant="bordered"
                                isRequired
                                isInvalid={!!errors.start_date}
                                errorMessage={errors.start_date?.message as string}
                                {...register("start_date", {
                                    required: "La fecha es obligatoria",
                                    validate: validateDate,
                                })}
                            />
                            <Select
                                label="Categoría"
                                variant="bordered"
                                placeholder="Selecciona una categoría"
                                isRequired
                                isInvalid={!!errors.category}
                                errorMessage={errors.category?.message as string}
                                {...register("category", {
                                    required: "Por favor selecciona una categoría",
                                    valueAsNumber: true,
                                })}
                            >
                                {categories.map(cat => (
                                    <SelectItem key={cat.id} >{cat.name}</SelectItem>
                                ))}
                            </Select>
                            <Textarea
                                label="Descripción"
                                variant="bordered"
                                minRows={6}
                                isRequired
                                isInvalid={!!errors.description}
                                errorMessage={errors.description?.message as string}
                                {...register("description", { required: "Por favor ingresa una descripción" })}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="flat"
                                onPress={() => {
                                    onClose();
                                    reset();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button color="primary" type="submit">Guardar</Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}

