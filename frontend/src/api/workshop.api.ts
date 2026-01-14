import type { WorkshopForm } from "../types/workshop";

const BASE_URL = "http://localhost:8000/whorshop/api/v1/workshop/";

export const getAllWorkshops = async () => {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
    }

    return res.json();
} 
export const createWorkshop = async (workshop: WorkshopForm) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workshop),
  });

  if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status}`);
  }

  return res.json();
};

export const deleteWorkshop = async (idWorkshop:number) => {
  const res = await fetch(`${BASE_URL}${idWorkshop}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status}`);
  }
  
  return true;
};

export const editWorkshop = async (id: number, workshop: WorkshopForm) => {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workshop),
  });

  if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status}`);
  }

  return res.json();
};
