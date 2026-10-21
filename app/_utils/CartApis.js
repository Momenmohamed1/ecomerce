import axiosClient from "./axiosClient";



const addToCart = (payload) => axiosClient.post('/carts', payload)

const getUserCartItems = (email) => axiosClient.get(`/carts?populate[projects][populate]=images&filters[email][$eq]=${email}`)

const deleteCartItem = (documentId) => axiosClient.delete(`/carts/${documentId}`)

const updateCartItem = (documentId, payload) => axiosClient.put(`/carts/${documentId}`, payload)

export default {
    addToCart,
    getUserCartItems,
    deleteCartItem,
    updateCartItem,
}; 