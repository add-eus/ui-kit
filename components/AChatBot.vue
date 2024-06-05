<script setup lang="ts">
import { defineProps, PropType, ref, computed } from "vue";
import { Colors, useColor } from "../stores/color";

const props = defineProps({
  containerWidth: {
    type: Number,
    default: 300,
  },
  containerHeight: {
    type: Number,
    default: 550,
  },
  title: {
    type: String,
    default: "Happy",
  },
  placeholder: {
    type: String,
    default: "Write your message..",
  },
  color: {
    type: String as PropType<Colors>,
    default: "grey",
  },
  conversation: {
    type: Array,
    default: [
      { sender: "user", text: "Bonjour" },
      { sender: "bot", text: "Bonjour, comment puis-je vous aider ?" },
      {
        sender: "user",
        text: "Je cherche des informations sur votre produit.",
      },
      { sender: "bot", text: "Bien sûr, quel produit vous intéresse ?" },
      { sender: "bot", text: "Choisissez une catégorie" },
      { content: "true" },
    ],
  },
});

const color = useColor(
  computed(() => {
    return props.color;
  })
);
const model = defineModel();
</script>

<template>
  <div
    class="a-chat-bot"
    :style="{
      '--width': containerWidth + 'px',
      '--height': containerHeight + 'px',
      '--color': color,
    }"
  >
    <div class="chat-header">
      <div class="chat-avatar">
        <slot name="avatar">
          <img
            src="https://static.vecteezy.com/system/resources/previews/024/091/758/non_2x/happy-kawaii-face-free-png.png"
            alt="happy"
          />
        </slot>
      </div>
      <p>{{ title }}</p>
    </div>
    <div class="chat-body">
      <div
        v-for="message in conversation"
        :key="message.text"
        :class="
          message.sender === 'user'
            ? 'user-message'
            : message.sender === 'bot'
            ? 'bot-message'
            : ''
        "
        class="chat-message"
      >
        {{ message.text }}
        <slot name="content" v-if="message.content">
          <p>Custom content</p>
        </slot>
      </div>
    </div>
    <div class="chat-footer">
      <input v-bind="$attrs" v-model="model" :placeholder="placeholder" />

      <button>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.0712 5.50989L6.51124 1.22989C0.76124 -1.65011 -1.59876 0.70989 1.28124 6.45989L2.15124 8.19989C2.40124 8.70989 2.40124 9.29989 2.15124 9.80989L1.28124 11.5399C-1.59876 17.2899 0.75124 19.6499 6.51124 16.7699L15.0712 12.4899C18.9112 10.5699 18.9112 7.42989 15.0712 5.50989ZM11.8412 9.74989H6.44124C6.03124 9.74989 5.69124 9.40989 5.69124 8.99989C5.69124 8.58989 6.03124 8.24989 6.44124 8.24989H11.8412C12.2512 8.24989 12.5912 8.58989 12.5912 8.99989C12.5912 9.40989 12.2512 9.74989 11.8412 9.74989Z"
            :fill="color"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a-chat-bot {
  display: flex;
  flex-direction: column;
  width: var(--width);
  height: var(--height);
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 1rem 0 rgba(10, 10, 10, 0.2);
  background: var(--a-white);
  overflow: hidden;
  padding: 15px;

  .chat-header {
    height: 55px;
    border-bottom: 1px solid var(--a-grey-lightest);
    display: flex;
    padding-bottom: 10px;
    align-items: center;
    justify-content: center;

    .chat-avatar {
      height: 35px;
      width: 35px;
      border-radius: 35px;
      background: var(--color);
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      :slotted(img) {
        height: 70%;
        width: 70%;
        object-fit: content;
      }
    }

    p {
      font-size: 26px;
      margin: 7px;
      font-weight: bold;
      color: var(--a-grey-darkest);
    }
  }

  .chat-body {
    /* all - header - footer */
    height: calc(100% - 55px - 35px);
    padding: 15px 0 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;

    .chat-message {
      border-radius: 8px;
      padding: 5px;

      &.user-message {
        padding: 5px 10px;
        color: var(--a-white);
        background: var(--color);
        border-top-right-radius: 0;
      }

      &.bot-message {
        padding: 5px 10px;
        background: var(--a-grey-lightest);
        border-top-left-radius: 0;
      }
    }
  }

  .chat-footer {
    position: relative;
    height: 35px;
    padding-top: 5px;

    &::after {
      content: "";
      position: absolute;
      top: -25px;
      left: 0;
      height: 25px;
      width: 100%;
      background: linear-gradient(transparent, var(--a-white) 90%);
    }

    input {
      margin-left: 5%;
      width: 90%;
      height: 100%;
      border: 1px solid var(--a-grey-lighter);
      border-radius: 8px;
      padding: 0 40px 0 20px;
      transition: border 0.15s ease-in;

      &:focus {
        outline: none !important;
        border: 1px solid var(--color);
      }
    }

    button {
      cursor: pointer;
      position: absolute;
      top: 4px;
      right: 6%;
      height: 100%;
      border: none;
      background: transparent;
    }
  }
}
</style>
