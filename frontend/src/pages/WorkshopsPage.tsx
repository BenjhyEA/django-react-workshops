import { Button } from "@heroui/react"

import WorkshopCard from "../components/WorkshopCard";
import { Plus } from "lucide-react";
import { getAllWorkshops } from "../api/workshop.api";
import { useEffect, useState } from "react";
import type { Workshop } from "../types/workshop";

function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);


  useEffect(() => {
    async function loadWorkshops() {
      const data = await getAllWorkshops();
      setWorkshops(data);
    }

    loadWorkshops()


  }, []);


  return (
    <main className="min-h-screen flex justify-center ">
      <div className="w-200 mt-5 p-4">
        <h1 className="text-3xl font-semibold" >Catálogo de Talleres</h1>
        <div className=" my-3">
          <Button color="primary" className=""> Agregar <Plus /></Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {
            workshops.map(workshop => (
              <WorkshopCard workshop={workshop} />
            ))
          }
        </div>
      </div>
    </main>
  )
}

export default WorkshopsPage
