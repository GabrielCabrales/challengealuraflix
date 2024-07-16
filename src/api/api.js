import axios from "axios";

const api = axios.create({
    baseURL: "https://6691b54626c2a69f6e907f80.mockapi.io/"
})

export const buscar = async (url, setData) => {
    const respuesta = await api.get(url);
    setData(respuesta.data);
}

export const CreateNewVideo = async (nuevoVideoData) => {
    try {
        const response = await api.post('/videos', nuevoVideoData);
        if (response.status === 201) {
            return response.data;
        } else {
            console.error("Error al crear video");
            throw new Error("Error crear");
        }
    } catch (error) {
        console.error("Error al enviar datos: ", error);
    }
}

export const CreateNewCategory = async (newCategoryData) => {
    try {
        const response = await api.post('/categorias', newCategoryData);
        if (response.status === 201) {
            return response.data;
        } else {
            console.error("Error al crear categoría");
            throw new Error("Error crear");
        }
    } catch (error) {
        console.error("Error al enviar datos: ", error);
    }
}

export const UpdateCategory = async (updatedCategory) => {
    try {
        const response = await api.put(`/categorias/${updatedCategory.id}`, updatedCategory);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const DeleteCategory = async (categoryId) => {
    try {
        const response = await api.delete(`/categorias/${categoryId}`);
        if (response.status === 200 || response.status === 204) {
            return { success: true, message: "Categoria borrada exitosamente" };
        } else {
            throw new Error("Error para eliminar");
        }
    } catch (error) {
        throw error;
    }
};

export const loadVideosByCategory = async (category) => {
    try {
        const response = await api.get(`/videos?category=${category}`);
        return response.data;
    } catch (error) {
        console.error("Error al cargar los datos por categoría: ", error);
        throw error;
    }
}

export const DeleteVideo = async (videoId) => {
    try {
        const response = await api.delete(`/videos/${videoId}`);
        if (response.status === 200 || response.status === 204) {
            return { success: true, message: "Video borrado exitosamente" };
        } else {
            throw new Error("Error para eliminar");
        }
    } catch (error) {
        throw new Error("Error al procesar la solicitud de eliminación");
    }
}

export const UpdateVideo = async (updatedVideo) => {
    try {
        const response = await api.put(`/videos/${updatedVideo.id}`, updatedVideo);
        return response.data;
    } catch (error) {
        throw error;
    }
}