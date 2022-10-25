import { useAuth } from "~~/store/auth";

export default function useUser() {
    const auth = useAuth();

    const router = useRouter();

    const resend = async ()=>{
        $axios.onRequest((config) => {
            config.withCredentials = true;
            return config;
        });
        await $axios.get("/sanctum/csrf-cookie");
        await $axios
          .post("/api/resend", {
            email: auth.user.email,
          })
          .then((response) => {
            console.log(response);
          });
    }



    const sendResetPasswordLink = async (email)=>{
      $axios.onRequest((config) => {
        config.withCredentials = true;
        return config;
      });
      await $axios.get("/sanctum/csrf-cookie");
      await $axios.post('/api/forgot-password', {
        email: email
      })
    }

    const verifyEmail = async (url)=>{
      $axios.onRequest((config) => {
        config.withCredentials = true;
        return config;
      });

      await $axios.get("/sanctum/csrf-cookie");
      await $axios.get(url).then((response)=>{
        auth.user = response.data.user;
        auth.isLoggedIn = true;
        router.push("/profile");
      });
    }

    const resetPassword =  async (form)=>{
      $axios.onRequest((config) => {
        config.withCredentials = true;
        return config;
      });

      await $axios.get("/sanctum/csrf-cookie");
      await $axios.post("/api/reset-password", form);
    }

    return {
      resend,
      sendResetPasswordLink,
      resetPassword,
      verifyEmail
    }
}