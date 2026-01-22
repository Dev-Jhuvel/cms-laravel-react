import { create } from "zustand";
import {login as apiLogin, logout as apiLogout, register as apiRegister, getUser} from '../Services/authService';
const useAuthStore = create((set) =>({
    user: null,
    token: null,
    errors: null,
    message: null,
    isAuthenticated: false,
    
    login: async (credentials) => {
        set({errors: null});
        try {
            const {token, user} = await apiLogin(credentials);
            set({user, token, isAuthenticated: true, errors: null, });
            localStorage.setItem('token', token);
        } catch(error){
            console.error("Login failed", error);
            if (error.response) {
                set({errors: error.response.data.errors, message:{type:'error', text:'Login Failed!'}});
            }
        }
    },

    register: async (form) =>{
        set({errors: null});
        try{
            const {token, user} = await apiRegister(form);
            set({user, token, isAuthenticated: true, errors: null, message:{type:'success', text:'Registration Successfully!'}});
        } catch(error){
            console.error("Registration failed", error);
            if (error.response) {
                set({errors: error.response.data.errors, message:{type:'error', text:'Registration Failed!'}});
            }
        }
    },

    fetchUser: async () => {
        const token = localStorage.getItem('token');
        if(!token) return;
        try {
            const user = getUser(token);
            set({user, token, isAuthenticated: true});
        } catch (error) {
            set({user: null, token: null, isAuthenticated: false});
        }
    },

    logout: () => {
        const token = localStorage.getItem("token");
        if(token){
            apiLogout(token);
        }
        localStorage.removeItem('token');
        console.log('Logout Successfully!');
        set({user: null, token: null, isAuthenticated: false, message:{type:'success', text:'Logout Successfully!'}});
    },

    authResetter: () => set({errors: null, message: null}),

}));

export default useAuthStore;