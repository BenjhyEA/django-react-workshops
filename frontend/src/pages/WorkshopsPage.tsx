import { Button, useDisclosure } from "@heroui/react"

import WorkshopCard from "../components/WorkshopCard";
import { Plus } from "lucide-react";
import { getAllWorkshops } from "../api/workshop.api";
import { useEffect, useState } from "react";

import type { Workshop } from "../types/workshop";
import WorkshopModal from "../components/WorkshopFormModal";
import type { Category } from "../types/category";
import { getAllCategories } from "../api/category.api";

function WorkshopsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
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

  return (
    <main className="min-h-screen flex justify-center ">
      <div className="w-200 mt-5 p-4">
        <h1 className="text-3xl font-semibold" >Catálogo de Talleres</h1>
        <div className=" my-3">
          <Button onPress={onOpen} color="primary" className=""> Agregar <Plus /></Button>
          <WorkshopModal isOpen={isOpen} onOpenChange={onOpenChange} categories={categories} onCreated={loadWorkshops} />
        </div>
        <div className="flex flex-wrap gap-3 pr-2 overflow-y-auto max-h-[calc(100vh-160px)]">
          {
            workshops.map(workshop => (
              <WorkshopCard  workshop={workshop} key={workshop.id} categories={categories} />
            ))
          }
        </div>
      </div>
    </main>
  )
}

export default WorkshopsPage
