import { useAuth } from "~~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => 
    {  
        const auth = useAuth();
        
        const router = useRouter();
       
            if (auth.isLoggedIn && auth.user.email_verified_at != null) {    
                router.push('/');
            } 
        

    }
)