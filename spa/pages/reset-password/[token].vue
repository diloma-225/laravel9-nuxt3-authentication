<template>
  <div>
    <Head>
      <Title>Reset password | Laravel9 & Nuxt 3</Title>
    </Head>
    <div class="w-3/6 h-screen block mx-auto pt-20">
      <form class="w-4/6 flex flex-col" @submit.prevent="submit">
        <div class="p-2 mb-2 bg-green-600 text-white rounded" v-if="succed">
          Mot de passe réinitialiser avec succès !
        </div>
        <input
          type="email"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-2"
          placeholder="addresse email"
          v-model="form.email"
        />
        <span class="text-red-500" v-if="errors.email">{{ errors.email }}</span>
        <input
          type="password"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-2"
          placeholder="mot de passe"
          v-model="form.password"
        />
        <span class="text-red-500" v-if="errors.password">{{ errors.password }}</span>
        <input
          type="password"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-2"
          placeholder="confirmation mot de passe"
          v-model="form.password_confirmation"
        />
        <span class="text-red-500"></span>
        <div class="mt-4">
          <button
            type="submit"
            class="bg-blue-600 text-white p-2 rounded"
            :class="{ 'opacity-50': isLoading }"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import useUser from "~~/composables/user";

const route = useRoute();
const router = useRouter();
const { resetPassword } = useUser();
const form = reactive({
  email: route.query.email,
  password: "",
  password_confirmation: "",
  token: route.params.token,
});
const errors = reactive({
  email: "",
  password: "",
});

const succed = ref(false);

const isLoading = ref(false);

const submit = async () => {
  isLoading.value = true;
  await resetPassword({ ...form })
    .then((response) => {
      succed.value = true;
      setTimeout(() => {
        return router.push("/");
      }, 3000);
    })
    .catch((error) => {
      if (error.response) {
        for (let index in errors) {
          if (error.response.data.errors[index]) {
            errors[index] = error.response.data.errors[index][0];
          }
        }
      }
    });
  isLoading.value = false;
};
</script>
