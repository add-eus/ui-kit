<script setup lang="ts">
import AButton from "../../components/AButton.vue";
import "../../index.scss";
import { useNotification } from "../../stores/notification";

const notification = useNotification();
</script>
<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <AButton @click="notification.default('Default Text')" color="grey-light"
        >Default</AButton
      >
    </Variant>
    <Variant title="warning">
      <AButton
        @click="notification.warning('Warning Text')"
        color="warning-light"
        >Warning</AButton
      >
    </Variant>
    <Variant title="success">
      <AButton
        @click="notification.success('Success Text')"
        color="success-light"
        >Success</AButton
      >
    </Variant>
    <Variant title="info">
      <AButton @click="notification.info('Info Text')" color="info-light"
        >Info</AButton
      >
    </Variant>
    <Variant title="error">
      <AButton @click="notification.error('Error Text')" color="danger"
        >Error</AButton
      >
    </Variant>
  </Story>
</template>

<docs lang="md">
## useNotification

The `useNotification` function is a custom hook that provides methods for displaying success and error notifications.

### Methods

### default(message: string)

Displays a default notification with the specified message.

#### warning(message: string)

Displays a warning notification with the specified message.

#### success(message: string)

Displays a success notification with the specified message.

#### info(message: string)

Displays an info notification with the specified message.

#### error(message: string)

Displays an error notification with the specified message.
</docs>
