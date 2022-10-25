<template>
  <div>
    <Head>
      <Title>Reset password | Laravel9 & Nuxt 3</Title>
    </Head>
    <div class="w-3/6 mx-auto mt-10">
      <div class="w-4/6 mb-6">
        <div class="p-2 mb-2 bg-green-600 text-white rounded" v-if="succed">
          Le mail de réinitialisation a été envoyé. Consultez votre boite mail !
        </div>
        <input
          type="text"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Email address"
          v-model="form.email"
        />
        <FormError v-if="errors.email" :text="errors.email" />
        <button
          class="block px-5 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-5"
          :class="{ 'opacity-50': isLoading }"
          @click.prevent="send"
        >
          Envoyer
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import useUser from "~~/composables/user";

const { sendResetPasswordLink } = useUser();
const form = reactive({
  email: "",
});
const errors = reactive({
  email: "",
});

const isLoading = ref(false);
const succed = ref(false);

const send = async () => {
  resetError();
  isLoading.value = true;
  succed.value = false;
  await sendResetPasswordLink(form.email)
    .then((response) => {
      resetForm();
      succed.value = true;
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
