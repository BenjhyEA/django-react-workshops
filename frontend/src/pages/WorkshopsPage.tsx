import { Button, useDisclosure } from "@heroui/react"
import WorkshopCard from "../components/WorkshopCard";
import WorkshopModal from "../components/WorkshopFormModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { Plus } from "lucide-react";
import { deleteWorkshop, getAllWorkshops } from "../api/workshop.api";
import { useEffect, useState } from "react";
import type { Workshop } from "../types/workshop";
import type { Category } from "../types/category";
import { getAllCategories } from "../api/category.api";
import EditWorkshopModal from "../components/editWorkshopModal";


function WorkshopsPage() {
  const fromModal = useDisclosure();
  const deleteModal = useDisclosure();
  const editModal = useDisclosure();

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  async function loadcategories() {
    const data = await getAllCategories();
    setCategories(data);
  }

  async function loadWorkshops() {
    const data = await getAllWorkshops();
    setWorkshops(data);
  }

  useEffect(() => {
    loadcategories();
    loadWorkshops();

  }, []);

  const handleDelete = async () => {
    if (!selectedWorkshop) return;

    await deleteWorkshop(selectedWorkshop.id);
    loadWorkshops();
    setSelectedWorkshop(null);

  };

  const handleEdit = async () => {
    if (!selectedWorkshop) return;
    loadWorkshops();
    setSelectedWorkshop(null);
  };

  return (
    <>
      <WorkshopModal
        isOpen={fromModal.isOpen}
        onOpenChange={fromModal.onOpenChange}
        categories={categories}
        onCreated={loadWorkshops} />

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onOpenChange={deleteModal.onOpenChange}
        onConfirm={handleDelete}
        description={
          selectedWorkshop
            ? `¿Deseas eliminar el taller "${selectedWorkshop.name}"?`
            : ""
        }
      />
      {selectedWorkshop && (
        <EditWorkshopModal
          isOpen={editModal.isOpen}
          onOpenChange={editModal.onOpenChange}
          onEdit={handleEdit}
          categories={categories}
          workshopSelect={selectedWorkshop}
        />
      )}
      <main className="min-h-screen flex justify-center ">
        <div className="w-200 mt-5 p-4">
          <h1 className="text-3xl font-semibold" >Catálogo de Talleres</h1>
          <div className=" my-3">
            <Button onPress={fromModal.onOpen} color="primary" className=""> Agregar <Plus /></Button>
          </div>
          <div className="flex flex-wrap gap-3 pr-2 overflow-y-auto max-h-[calc(100vh-160px)]">
            {
              workshops.map(workshop => (
                <WorkshopCard workshop={workshop} key={workshop.id} categories={categories} onAction={(w, action) => {
                  setSelectedWorkshop(w);
                  if (action === "delete") {
                    deleteModal.onOpen();
                  }

                  if (action === "edit") {
                    editModal.onOpen();
                  }
                }} />
              ))
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default WorkshopsPage
