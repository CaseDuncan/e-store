import axios from "axios";

const createProductReview = async (review) => {
    const user = JSON.parse(localStorage.getItem('user'))

    const config = {
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${user.acces}`
        }
    }

    const response = await axios.post('http://localhost:8000/api/products/create/', config, review)
    return response.data
}

const getReviews = async (id) => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await axios.get('http://localhost:8000/api/products/create/', config, productData)
    return response.data
}

const deleteReview = async (id) => {

    const user = JSON.parse(localStorage.getItem('user'))

    const config = {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${user.acces}`
    }

    const response = await axios.delete('http://localhost:8000/api/products/create/', config, id)
    return response.data
}