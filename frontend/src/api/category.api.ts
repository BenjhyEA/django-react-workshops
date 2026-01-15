import type { CategoryForm } from "../types/category";

const BASE_URL = "http://localhost:8000/whorshop/api/v1/category/";

export const getAllCategories = async () => {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
    }

    return res.json();
} 

export const createCategory = async (category: CategoryForm) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });

    if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
    }

    return res.json();
}

export const editCategory = async (id: number, data: CategoryForm) => {
    const res = await fetch(`${BASE_URL}${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
    }

    return res.json();
}

export const deleteCategory = async (id: number) => {
    const res = await fetch(`${BASE_URL}${id}/`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
    }

    return true;
}