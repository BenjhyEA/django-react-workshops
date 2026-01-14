import { Button, useDisclosure } from "@heroui/react"

import WorkshopCard from "../components/WorkshopCard";
import { Plus } from "lucide-react";
import { deleteWorkshop, getAllWorkshops } from "../api/workshop.api";
import { useEffect, useState } from "react";

import type { Workshop } from "../types/workshop";
import WorkshopModal from "../components/WorkshopFormModal";
import type { Category } from "../types/category";
import { getAllCategories } from "../api/category.api";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

function WorkshopsPage() {
  const fromModal = useDisclosure();
  const deleteModal = useDisclosure();

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

  return (
    <main className="min-h-screen flex justify-center ">
      <div className="w-200 mt-5 p-4">
        <h1 className="text-3xl font-semibold" >Catálogo de Talleres</h1>
        <div className=" my-3">
          <Button onPress={fromModal.onOpen} color="primary" className=""> Agregar <Plus /></Button>
          <WorkshopModal isOpen={fromModal.isOpen} onOpenChange={fromModal.onOpenChange} categories={categories} onCreated={loadWorkshops} />
        </div>
        <ConfirmDeleteModal
          isOpen={deleteModal.isOpen}
          onOpenChange={deleteModal.onOpenChange}
          onConfirm={handleDelete}
          description={
            selectedWorkshop
              ? `¿Deseas eliminar el taller "${selectedWorkshop.name}"?`
              : ""
          } />
        <div className="flex flex-wrap gap-3 pr-2 overflow-y-auto max-h-[calc(100vh-160px)]">
          {
            workshops.map(workshop => (
              <WorkshopCard workshop={workshop} key={workshop.id} categories={categories} onAction={(w) => {
                setSelectedWorkshop(w);
                deleteModal.onOpen();
              }} />
            ))
          }
        </div>
      </div>
    </main>
  )
}

export default WorkshopsPage
