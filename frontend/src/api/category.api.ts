
export const getAllCategories = async () => {
    const res = await fetch("http://localhost:8000/whorshop/api/v1/category");

    if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
    }

    return res.json();
} 