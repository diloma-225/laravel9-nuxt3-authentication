<template>
  <div>
    <div class="w-full h-screen flex justify-center items-center bg-gray-200">
      <div class="w-3/6 flex justify-center items-center flex-col">
        <h1 class="text-3xl mb-3">📨 Verifiez votre email</h1>
        <div class="flex flex-col items-center">
          <p class="text-center my-2">
            Nous avons envoyer un mail à {{ auth.user.email }} pour verifier votre
            addresse mail et activer votre compte. Le lien de vérification expirera dans
            24h.
          </p>

          <p class="text-center my-2">
            Clicker sur renvoyer email de vérification si vous n'avez pas reçu le mail
          </p>
          <button class="bg-blue-700 text-white p-2 rounded mb-3" @click="resend">
            Reenvoyer le mail
          </button>
          <nuxt-link to="/" class="underline">Page d'accueil</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAuth } from "~~/store/auth";
import useUser from "~~/composables/user";

definePageMeta({
  middleware: ["auth", "verify"],
});

const { resend } = useUser();

const auth = useAuth();
</script>
