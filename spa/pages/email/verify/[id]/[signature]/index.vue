<template>
  <div></div>
</template>
<script setup>
import useUser from "~~/composables/user";

const { verifyEmail } = useUser();
const route = useRoute();
await verifyEmail(
  route.path + "?expires=" + route.query.expires + "&signature=" + route.query.signature
);
</script>
