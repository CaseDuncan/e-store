import axios from "axios"


//get product details
const fetchProductDetails = async (id) =>{
    const response = await axios.get(`http://localhost:8000/api/products/listings/${id}`)
    return response.data
}

const ItemDetailAPIService ={fetchProductDetails}
export default ItemDetailAPIService;