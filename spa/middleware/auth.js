import { useAuth } from "~~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => 
    {  
        const auth = useAuth();
        
        const router = useRouter();
        if (process.client) {
            if (!auth.isLoggedIn) {    
                router.push('/');
            } 
        } 

    }
)