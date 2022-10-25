import { useAuth } from "~~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => 
    {  
        const auth = useAuth();
        
        const router = useRouter();
        if (process.client) {
            if (auth.user) {
                if (!auth.user.email_verified_at || auth.user.email_verified_at === null) {    
                    router.push('/verify_email');
                } 
            }

        } 

    }
)