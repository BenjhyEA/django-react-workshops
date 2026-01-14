import { Chip, Tooltip } from "@heroui/react";
import { EditIcon, Trash2 } from "lucide-react";
import type { Workshop } from "../types/workshop";
import type { Category } from "../types/category";

export default function WorkshopCard({
  workshop,
  categories,
  onAction
}: {
  workshop: Workshop;
  onAction: (workshop: Workshop) => void;
  categories: Category[]
}) {

  const getCategoryName = (id: number) => {
    return categories.find(c => c.id === id)?.name ?? "Sin categoría";
  }

  return (
    <div className="w-full max-w-4xl rounded-xl border border-default-200 bg-default-50 p-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <Chip color="primary" variant="flat">
          {getCategoryName(workshop.category)}
        </Chip>

        <div className="flex gap-3">
          <Tooltip content="Editar">
            <span className="cursor-pointer text-default-400 active:opacity-50">
              <EditIcon size={22} />
            </span>
          </Tooltip>

          <Tooltip color="danger" content="Eliminar">
            <span className="cursor-pointer text-danger active:opacity-50" onClick={() => onAction(workshop)}>
              <Trash2 size={22} />
            </span>
          </Tooltip>
        </div>
      </div>

      {/* Title */}
      <h2 className="mt-2 text-2xl font-semibold">
        {workshop.name}
      </h2>

      {/* Description */}
      {workshop.description && (
        <p className="mt-1 text-base text-gray-700">
          {workshop.description}
        </p>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center gap-2">
        {/*  <CalendarDays size={16} className="text-default-400" /> */}
        <Chip variant="dot">
          Inicio:{" "}
          {new Date(workshop.start_date).toLocaleDateString("es-PE")}
        </Chip>
      </div>
    </div>

    
  );
}
