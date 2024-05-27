<script setup lang="ts">
import AButton from "../../components/AButton.vue";
import "../../index.scss";
import { useNotification } from "../../stores/notification";

const notification = useNotification();

</script>
<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="success">
      <AButton @click="notification.success('Success')" color="success">Success</AButton>
    </Variant>
    <Variant title="error">
      <AButton @click="notification.error('Success')" color="danger">Error</AButton>
    </Variant>
  </Story>
</template>

<docs lang="md">
  ## useNotification

  The `useNotification` function is a custom hook that provides methods for displaying success and error notifications.

  ### Methods

  #### success(message: string)

  Displays a success notification with the specified message.

  #### error(message: string)

  Displays an error notification with the specified message.

</docs>
