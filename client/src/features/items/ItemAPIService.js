import axios from 'axios'
//get all products
const fetchProducts = async () => {
    const response = await axios.get('http://localhost:8000/api/products/listings/')
    return response.data
}

//get create products
const createProducts = async (productData) => {
    const user = JSON.parse(localStorage.getItem('user'))

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        },
    }
    const response = await axios.post('http://localhost:8000/api/products/create/', config, productData)
    return response.data
}

const deleteProducts = async (id) => {
    const { user } = JSON.parse(localStorage.getItem('user'))
    const config = {
        header: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access}`
        },
    }
    const response = await axios.delete(`http://127.0.0.1:8000/api/products/listings/${id}`, config)
    return response.data
}

const ItemAPIService = { fetchProducts, deleteProducts, createProducts }
export default ItemAPIService;