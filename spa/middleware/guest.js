import { useAuth } from "~~/store/auth";
export default defineNuxtRouteMiddleware((to, from) => 
    {  
        const auth = useAuth();
        if (auth.isLoggedIn) {    
            return navigateTo('/')
        }  

    }
)