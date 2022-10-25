<template>
  <div>
    <Head>
      <Title>Register | Laravel9 et Nuxt 3</Title>
    </Head>
    <section class="h-screen">
      <div class="px-6 h-full text-gray-800">
        <div
          class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
        >
          <div
            class="grow-0 shrink-1 flex items-center justify-center md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
          >
            <img src="/images/image.jpg" class="w-5/6" alt="Sample image" />
          </div>
          <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form @submit.prevent="submit">
              <!-- Name input -->
              <div class="mb-6">
                <input
                  type="text"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Nom"
                  v-model="form.name"
                />
                <FormError v-if="errors.name" :text="errors.name" />
              </div>
              <!-- Email input -->
              <div class="mb-6">
                <input
                  type="text"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Addresse Email"
                  v-model="form.email"
                />
                <FormError v-if="errors.email" :text="errors.email" />
              </div>

              <!-- Password input -->
              <div class="mb-6">
                <input
                  type="password"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Mot de passse"
                  v-model="form.password"
                />
                <FormError v-if="errors.password" :text="errors.password" />
              </div>
              <!-- Password input -->
              <div class="mb-6">
                <input
                  type="password"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Confirmation mot de passse"
                  v-model="form.password_confirmation"
                />
              </div>

              <div class="text-center lg:text-left">
                <button
                  type="submit"
                  class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  :class="{ 'opacity-30': isLoading }"
                >
                  Créer un compte
                </button>
                <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                  Vous avez déjà un compte ?
                  <nuxt-link
                    to="/"
                    class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >Se connecter</nuxt-link
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { useAuth } from "~~/store/auth";

definePageMeta({
  middleware: ["guest"],
});

const auth = useAuth();

const isLoading = ref(false);

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const errors = reactive({
  name: "",
  email: "",
  password: "",
});

const submit = async () => {
  resetError();
  isLoading.value = true;
  await auth
    .register({ ...form })
    .then((response) => {
      resetForm();
      auth.user = response.data.user;
      auth.isLoggedIn = true;
      navigateTo("/verify_email");
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

const resetError = () => {
  for (let index in errors) {
    errors[index] = "";
  }
};
const resetForm = () => {
  for (let index in form) {
    form[index] = "";
  }
};
</script>
