import { create } from 'zustand';


export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async(newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image) {
            return { success: false, message: 'Please fill all fields' };
        }
        const response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log("response:", response);
        const data = await response.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
        },
        fetchProducts: async() => {
            const response = await fetch('/api/products');
            const data = await response.json();
            set({ products: data.data });
        },
    }));

