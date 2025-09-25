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
        deleteProduct: async(id) => {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if(!data.success) {
                return { success: false, message: data.message };
            }
            //update the ui immediately when the product is deleted, no need to refresh the page
            set((state) => ({ products: state.products.filter((product) => product._id !== id) }));
            return { success: true, message: data.message };
        },
        updateProduct: async(id, updatedProduct) => {
            try {
                console.log('Store: Starting update for product:', id, updatedProduct);
                const response = await fetch(`/api/products/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(updatedProduct),
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json();
                console.log('Store: API response:', data);
                
                if(!data.success) {
                    console.log('Store: Update failed:', data.message);
                    return { success: false, message: data.message };
                }
                //update the ui immediately when the product is updated, no need to refresh the page
                set((state) => ({ products: state.products.map((product) => product._id === id ? data.data : product) }));
                console.log('Store: Update successful, returning success');
                return { success: true, message: data.message };
            } catch (error) {
                console.error('Store: Update error:', error);
                return { success: false, message: 'Network error occurred' };
            }
        },
    }));

