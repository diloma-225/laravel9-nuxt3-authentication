import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

import localforage from 'localforage';


export default defineNuxtPlugin((nuxtApp) => 
  {  
    nuxtApp.$pinia.use(createPersistedStatePlugin());
  }
)