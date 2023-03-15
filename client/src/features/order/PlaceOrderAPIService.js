import axios from "axios";


const CREATE_ORDER_URL = 'http://127.0.0.1:8000/api/products/orders/create/'
const ORDERS_URL ='http://localhost:8000/api/products/orders/all/'

const createOrder = async (orderData) => {
    const user = JSON.parse(localStorage.getItem('user'))

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access}`
        }
    }
    const response = await axios.post(CREATE_ORDER_URL, orderData, config)
    if (response.data) {
        localStorage.removeItem('cartItems')
        localStorage.removeItem('checkoutDetails')
        localStorage.removeItem('cartQuantity')
    }
    return response.data
}
const getOrders = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access}`
        },
    }
    const response = await axios.get(ORDERS_URL, config)

    return response.data
}
const fetchOrderDetails = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access}`
        },
    }
    const response = await axios.get(`http://localhost:8000/api/products/orders/details/${id}`, config)

    return response.data

}

const updateOrder = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access}`
        },
    }
    const response = await axios.post(`http://localhost:8000/api/orders/update/${id}`, config)

    return response.data

}

const deleteOrder = async (id) => {
    const { token } = JSON.parse(localStorage.getItem('user'))
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }
    const response = await axios.delete(`http://localhost:8000/api/orders/delete/${id}`, config)

    return response.data

}

const orderAPIService = { createOrder,getOrders, fetchOrderDetails, updateOrder, deleteOrder };
export default orderAPIService;