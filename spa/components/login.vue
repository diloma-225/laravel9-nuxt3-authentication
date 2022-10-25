<template>
  <div>
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
            <nuxt-link
              to="/profile"
              class="absolute top-2 left-5 bg-purple-700 p-2 rounded text-white"
              v-if="auth.isLoggedIn"
              >Profile</nuxt-link
            >
            <form @submit.prevent="submit">
              <!-- Email input -->
              <div class="mb-6">
                <input
                  type="text"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                  v-model="form.email"
                />
                <FormError v-if="errors.email" :text="errors.email" />
              </div>

              <!-- Password input -->
              <div class="mb-6">
                <input
                  type="password"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  v-model="form.password"
                />
                <FormError v-if="errors.password" :text="errors.password" />
              </div>

              <div class="flex justify-between items-center mb-6">
                <div class="form-group form-check">
                  <input
                    type="checkbox"
                    class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    v-model="form.remember"
                  />
                  <label
                    class="form-check-label inline-block text-gray-800"
                    for="exampleCheck2"
                    >Se souvenir de moi</label
                  >
                </div>
                <nuxt-link to="/forgot-password" class="text-gray-800"
                  >Mot depasse oublié?</nuxt-link
                >
              </div>

              <div class="text-center lg:text-left">
                <button
                  type="sumit"
                  class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  :class="{ 'opacity-50': isLoading }"
                >
                  Se connecter
                </button>
                <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                  Vous n'avez pas encore de compte?
                  <nuxt-link
                    to="/register"
                    class="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
                    >Créer un compte</nuxt-link
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

const auth = useAuth();

const isLoading = ref(false);
const router = useRouter();
const form = reactive({
  email: "",
  password: "",
  remember: false,
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
    .login({ ...form })
    .then((response) => {
      resetForm();
      auth.user = response.data.user;
      auth.isLoggedIn = true;
      router.push("/profile");
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
