import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please provides all fields from front-end" };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: data.message };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    console.log("Avant set({ products: data.data });");
    set({ products: data.data });
    console.log("Apres set({ products: data.data });");
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    // Update the state so the UI refresh immediatly
    set((state) => ({ products: state.products.filter((product) => product._id !== id) }));
    return { success: true, message: data.message };
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    // Update the state so the UI refresh immediatly
    set((state) => ({
      products: state.products.map((product) => (product._id === id ? data.data : product)),
    }));
    return { success: true, message: data.message };
  },
}));
