import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalHeader, ModalBody, TableHeader, TableColumn, TableBody, TableRow, TableCell, Table } from "@heroui/react";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { editCategory, createCategory, deleteCategory } from "../api/category.api";
import type { Category, CategoryForm } from "../types/category";



export default function CategoryManagementModal({
    isOpen,
    onOpenChange,
    categories,
    loadCategories,
}: {
    isOpen: boolean;
    onOpenChange: () => void;
    categories: Category[];
    loadCategories: () => void;
}) {
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const { control, handleSubmit, reset } = useForm<CategoryForm>({
        defaultValues: { name: "" },
    });

    useEffect(() => {
        reset({ name: editingCategory?.name ?? "" });
    }, [editingCategory, reset]);

    const refreshAndReset = () => {
        loadCategories();
        reset();
        setEditingCategory(null);
    };

    const onSubmit = async (data: CategoryForm) => {
        if (editingCategory) {
            await editCategory(editingCategory.id, data);
        } else {
            await createCategory(data);
        }
        refreshAndReset();
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar esta categoría?")) return
        await deleteCategory(id);
        loadCategories()

    };

    const handleClose = () => {
        refreshAndReset();
        onOpenChange();
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={handleClose}
            placement="top-center"
            backdrop="blur"
            scrollBehavior="inside"
        >
            <ModalContent>
                <ModalHeader>Gestión de Categorías</ModalHeader>

                <ModalBody className="gap-4">
                    {/* Formulario */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex gap-2 items-start"
                    >
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: "Campo obligatorio",
                                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    isRequired
                                    placeholder="Nombre de la categoría"
                                    variant="bordered"
                                    className="flex-1"
                                />
                            )}
                        />

                        <div className="flex gap-2">
                            {editingCategory && (
                                <Button variant="flat" onPress={refreshAndReset}>
                                    Cancelar
                                </Button>
                            )}

                            <Button type="submit" color="primary">
                                {editingCategory ? "Actualizar" : "Agregar"}
                            </Button>
                        </div>
                    </form>

                    {/* Tabla */}
                    <div className="max-h-[450px] overflow-y-auto ">
                        <Table
                            aria-label="Tabla de categorías"
                            removeWrapper
                            className="border border-default-200 rounded-lg"
                        >
                            <TableHeader>
                                <TableColumn>ID</TableColumn>
                                <TableColumn>NOMBRE</TableColumn>
                                <TableColumn width={120}>ACCIONES</TableColumn>
                            </TableHeader>

                            <TableBody emptyContent="No hay categorías registradas">
                                {categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.id}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    color="primary"
                                                    onPress={() => handleEdit(category)}
                                                >
                                                    <Pencil size={16} />
                                                </Button>

                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    color="danger"
                                                    onPress={() => handleDelete(category.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
