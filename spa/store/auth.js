import { defineStore} from "pinia";

export  const useAuth = defineStore("auth", ()=>{

        $axios.onRequest((config) => {
            config.withCredentials = true;
            return config;
        });

        const user = ref(null);


        const isLoggedIn = ref(false);

        const login = async (user)=>{
            await $axios.get('/sanctum/csrf-cookie');
            return await $axios.post('/api/login', user);
        }

        const register = async (user)=>{
            await $axios.get('/sanctum/csrf-cookie');
            return await $axios.post('/api/register', user);
        }
        const router = useRouter();
        const logout = async ()=>{

            await $axios.get('/sanctum/csrf-cookie');

            await $axios.post('/api/logout');
            localStorage.removeItem("auth");
            isLoggedIn.value = false;
            user.value = null;

            return router.push("/");
        }

        return {
            isLoggedIn,
            login,
            register,
            logout,
            user
        }
    },
)