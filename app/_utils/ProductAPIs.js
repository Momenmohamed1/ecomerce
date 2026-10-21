import axiosClient from "./axiosClient";

const getlatestproduct = () => axiosClient.get("/projects?populate=*");
const getProjectById = (id) => axiosClient.get(`/projects/${id}?populate=*`);
const getProductByCategory = (category) => axiosClient.get(`/projects?filters[category][$eqi]=${category}&populate=*`);
export default {
    getlatestproduct,
    getProjectById,
    getProductByCategory,
};