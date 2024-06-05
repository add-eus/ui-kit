<script setup lang="ts">
import AChatBot from "../../components/AChatBot.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 350, height: 650 }">
    <Variant title="default">
      <AChatBot />
    </Variant>

    <Variant title="size/color/placeholder/title/content">
      <AChatBot
        :containerWidth="250"
        :containerHeight="350"
        title="Support Chat"
        placeholder="Type your message..."
        color="secondary"
        :conversation="[
          { sender: 'user', text: 'Hello' },
          { sender: 'bot', text: 'Hi there! How can I assist you today?' },
        ]"
      />
    </Variant>
  </Story>
</template>

<docs lang="md">
# AChatBot

This is a chatbot component.

## Props

- `containerWidth` (number, optional, default: 300): Specifies the width of the chat container.
- `containerHeight` (number, optional, default: 550): Specifies the height of the chat container.
- `title` (string, optional, default: "Happy"): Specifies the title displayed at the top of the chat.
- `placeholder` (string, optional, default: "Write your message.."): Specifies the placeholder text in the input field.
- `color` (string, optional, default: "grey"): Specifies the color of user messages and other highlighted elements.
- `conversation` (array, optional, default: see below): Specifies the initial conversation as an array of message objects.
</docs>
