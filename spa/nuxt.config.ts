// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs-alt/axios',
        '@pinia/nuxt',
        '@vueuse/nuxt',
    ],
    ssr:false,
    plugins:["@/plugins/persistedstate.js"],
    build:{
        postcss:{
            postcssOptions:{
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            }
        }
    },
    css:["~/assets/css/tailwind.css"],
    axios:{
        credentials:true,
        baseURL:"http://localhost:8000"
    }
})
