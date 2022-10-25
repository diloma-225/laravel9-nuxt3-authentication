<template>
  <div>
    <Head>
      <Title>Profile | Laravel9 & Nuxt 3</Title>
    </Head>
    <div
      class="bg-gray-200 font-sans h-screen w-full relative flex flex-row justify-center items-center"
    >
      <div>
        <div class="card w-96 bg-white shadow-xl hover:shadow">
          <img
            class="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
            src="https://avatars.githubusercontent.com/u/67946056?v=4"
            alt=""
          />
          <div class="text-center mt-2 text-3xl font-medium">{{ auth.user.name }}</div>
          <div class="text-center mt-2 font-light text-sm">{{ auth.user.email }}</div>
          <hr class="mt-8" />
          <div class="flex p-2">
            <div class="w-full flex flex-col text-center">
              <button
                class="w-full font-bold bg-purple-600 p-2 text-white uppercase mb-2"
                :class="{ 'opacity-50': isLoading }"
                @click="logout"
              >
                Déconnexion
              </button>
              <nuxt-link
                to="/"
                class="w-full font-bold bg-gray-500 p-2 text-white uppercase"
              >
                Retour à la pas d'accueil
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAuth } from "~~/store/auth";

definePageMeta({
  middleware: ["auth", "verified"],
});
const auth = useAuth();

const isLoading = ref(false);

const logout = async () => {
  isLoading.value = true;
  await auth.logout();
  isLoading.value = false;
};
</script>
