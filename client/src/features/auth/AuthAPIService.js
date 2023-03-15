import axios from 'axios'

const REGISTER_URL = 'http://localhost:8000/api/users/register/'
const LOGIN_URL = 'http://localhost:8000/api/users/login/'
const PROFILE_UPDATE_URL = 'http://localhost:8000/api/users/profile/update'

//register user
const userRegistration = async (userData) => {
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }

    const response = await axios.post(REGISTER_URL, userData, config);
    return response.data;
}

//user login
const userLogin = async (userData) => {
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }

    const response = await axios.post(LOGIN_URL, userData, config)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
}

//logout user
const logout = () => localStorage.removeItem('user')

//update user profile
const updateProfile = async () => {
    const { user } = JSON.parse(localStorage.getItem('user'))
    const config = {
        header: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        },
    }

    const response = await axios.post(PROFILE_UPDATE_URL, token, config)

    return response.data

}

const authService = { userRegistration, userLogin, logout, updateProfile };
export default authService;