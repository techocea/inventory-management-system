import { v4 } from "uuid";
import Header from "./Header";
import React, { useState } from "react";

export interface ProductFormData {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
}

interface ProoductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: ProductFormData) => void;
}

const ProductModal = ({ isOpen, onClose, onCreate }: ProoductModalProps) => {
    const [formData, setFormData] = useState({
        productId: v4(),
        name: "",
        price: 0,
        stockQuantity: 0,
        rating: 0,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:
                name === "price" || name === "stockQuantity" || name === "rating"
                    ? parseFloat(value)
                    : value,
        });
    };

    if (!isOpen) return null;

    const labelCssStyles = "block text-sm font-medium text-gray-700";
    const inputCssStyles =
        "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

    return (
        <div className="fixed inset-0 bg-gray-600 backdrop-opacity-50 overflow-y-auto h-full w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Create New Product" />
                <form onSubmit={handleSubmit} className="mt-5">
                    {/* PRODUCT NAME */}
                    <label htmlFor="productName" className={labelCssStyles}>
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        value={formData.name}
                        className={inputCssStyles}
                        required
                    />

                    {/* PRICE */}
                    <label htmlFor="productPrice" className={labelCssStyles}>
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                        value={formData.price}
                        className={inputCssStyles}
                        required
                    />

                    {/* STOCK QUANTITY */}
                    <label htmlFor="stockQuantity" className={labelCssStyles}>
                        Stock Quantity
                    </label>
                    <input
                        type="number"
                        name="stockQuantity"
                        placeholder="Stock Quantity"
                        onChange={handleChange}
                        value={formData.stockQuantity}
                        className={inputCssStyles}
                        required
                    />

                    {/* RATING */}
                    <label htmlFor="rating" className={labelCssStyles}>
                        Rating
                    </label>
                    <input
                        type="number"
                        name="rating"
                        placeholder="Rating"
                        onChange={handleChange}
                        value={formData.rating}
                        className={inputCssStyles}
                        required
                    />

                    {/* CREATE ACTIONS */}
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Create
                    </button>
                    <button
                        onClick={onClose}
                        type="button"
                        className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
