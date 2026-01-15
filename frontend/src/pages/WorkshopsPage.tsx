import { Button, Input, Select, SelectItem, Tooltip, useDisclosure } from "@heroui/react"
import WorkshopCard from "../components/WorkshopCard";
import WorkshopModal from "../components/WorkshopFormModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { ArrowDown01, ArrowUp01, LayersPlus, MoonIcon, Plus, SearchIcon, SunIcon } from "lucide-react";
import { deleteWorkshop, getAllWorkshops } from "../api/workshop.api";
import { useEffect, useState } from "react";
import type { Workshop } from "../types/workshop";
import type { Category } from "../types/category";
import { getAllCategories } from "../api/category.api";
import EditWorkshopModal from "../components/EditWorkshopModal";
import { useTheme } from "@heroui/use-theme";
import CategoryManagementModal from "../components/CategoryManagementModal";

function WorkshopsPage() {
  const { theme, setTheme } = useTheme()

  const fromModal = useDisclosure();
  const deleteModal = useDisclosure();
  const editModal = useDisclosure();
  const categoryModal = useDisclosure();

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedWorkshops = [...workshops].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
  const filteredWorkshops = sortedWorkshops.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? w.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };


  return (
    <>
      {/* Modals */}
      <WorkshopModal
        isOpen={fromModal.isOpen}
        onOpenChange={fromModal.onOpenChange}
        categories={categories}
        onCreated={loadWorkshops}
      />

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

      <CategoryManagementModal
        isOpen={categoryModal.isOpen}
        onOpenChange={categoryModal.onOpenChange} categories={categories} loadCategories={loadcategories} />
      {/* Buttons */}
      <div className=" fixed flex top-4 right-4 z-50 gap-2">
        <Tooltip content="Gestionar categorias">
          <Button
            isIconOnly
            variant="flat"
            onPress={categoryModal.onOpen}
            className="rounded-full border border-default-200"
            aria-label="Cambiar tema"
          >
            <LayersPlus size={20} />
          </Button>
        </Tooltip>
        <Tooltip content={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}>
          <Button
            isIconOnly
            variant="flat"
            onPress={toggleTheme}
            className="rounded-full border border-default-200"
            aria-label="Cambiar tema"
          >
            {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </Button >
        </Tooltip>
      </div>

      {/* Main */}
      <main className="min-h-screen flex justify-center ">
        <div className="w-200 mt-5 p-4">
          <h1 className="text-3xl font-semibold" >Catálogo de Talleres</h1>
          <div className="my-3 flex flex-col md:flex-row md:items-center gap-2">
            <Input
              isClearable
              className="w-full md:flex-[2] rounded-xl border border-default-200"
              placeholder="Buscar taller..."
              startContent={<SearchIcon />}
              value={searchTerm}
              onValueChange={(e) => setSearchTerm(e)}
            />

            <div className="flex gap-2 w-full md:flex-1 md:min-w-[250px]">

              <Select
                className="flex-1 rounded-xl border border-default-200"
                selectedKeys={categoryFilter !== null ? [String(categoryFilter)] : ["all"]}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0];
                  setCategoryFilter(selectedKey === "all" ? null : Number(selectedKey));
                }}
                placeholder="Todas las categorías"
              >
                {[
                  { id: "all", name: "Todas las categorías" },
                  ...categories.map(cat => ({ id: String(cat.id), name: cat.name }))
                ].map((cat) => (
                  <SelectItem key={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </Select>
              <Tooltip content="Ordenar por id">
                <Button
                  variant="flat"
                  onPress={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className=" rounded-xl border border-default-200 md:w-auto min-w-[48px]"
                >
                  {sortOrder === 'asc' ? (
                    <ArrowUp01 size={20} />
                  ) : (
                    <ArrowDown01 size={20} />
                  )}
                </Button>
              </Tooltip>
            </div>

            <Button
              onPress={fromModal.onOpen}
              color="primary"
              className="w-full md:w-auto md:min-w-[140px]"
            >
              <Plus size={20} />
              Agregar
            </Button>


          </div>


          <div className="pr-2 overflow-y-auto max-h-[calc(100vh-160px)]">
            {filteredWorkshops.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-2 text-default-500">
                <p className="text-lg font-medium">
                  No hay talleres registrados
                </p>

                {categories.length === 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <span>
                      Si no tienes categorías registradas, regístralas en
                    </span>
                    <span
                      className="flex items-center gap-1 font-medium text-primary cursor-pointer"
                      onClick={categoryModal.onOpen}
                    >
                      Gestionar categoría
                      <LayersPlus size={18} />
                    </span>
                  </div>
                )}

              
              </div>
          ) : (
          <div className="flex flex-wrap gap-3">
            {filteredWorkshops.map((workshop) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                categories={categories}
                onAction={(w, action) => {
                  setSelectedWorkshop(w);

                  if (action === "delete") deleteModal.onOpen();
                  if (action === "edit") editModal.onOpen();
                }}
              />
            ))}
          </div>
            )}
        </div>

      </div>
    </main >
    </>
  )
}

export default WorkshopsPage

