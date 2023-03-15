import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './AuthAPIService'

const userInfo = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: userInfo ? userInfo : null,
    loading: false,
    success: false,
    error: false,
    message: '',
    registeredUser: null
}

//registration
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await authService.userRegistration(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})

//login
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        return await authService.userLogin(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})

//logout
export const logoutUser = createAsyncThunk("auth/logout", async (thunkAPI) => {
    return authService.logout()
})

//profile update
export const profileUpdate = createAsyncThunk('profile/update', async (token,thunkAPI)=>{
    try{
        return await authService.updateProfile(token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message)
    }
})



export const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.success = false
            })

            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.success = true
            })

            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.message = action.payload
                state.user = null
            })

            //login action creators
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.success = false
            })

            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.success = true
                state.error = false
            })

            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.message = action.payload
                state.error = true
                state.user = ''
            })

            //logout action creators
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.success = false
            })

            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = null
                state.success = true
                state.message = "You logged out"
            })

            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false
                state.message = action.payload
                state.error = true
            })

             //profile update action creators
             .addCase(profileUpdate.pending, (state) => {
                state.loading = true;
                state.success = false
            })

            .addCase(profileUpdate.fulfilled, (state, action) => {
                state.loading = false
                state.user = null
                state.success = true
                state.message = "profile updated succcessfully"
            })

            .addCase(profileUpdate.rejected, (state, action) => {
                state.loading = false
                state.message = action.payload
                state.error = true
            })
    }
})

export const { reset } = authSlice.actions;

export default authSlice.reducer;

