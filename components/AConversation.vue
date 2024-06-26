<script setup lang="ts">
import type { PropType } from "vue";
import { defineProps, computed, ref, onMounted } from "vue";
import { Colors, useColor } from "../stores/color";
import ATyping from "./ATyping.vue";

const props = defineProps({
  color: {
    type: String as PropType<Colors>,
    default: "primary",
  },
  sender: {
    type: String,
    default: "bot",
    validator: (value) => {
      return ["bot", "user"].includes(value);
    },
  },
  text: {
    type: String,
    default: "Bonjour comment allez vous ? ",
  },
  avatar: {
    type: Boolean,
    default: false,
  },
});

const color = useColor(
  computed(() => {
    return props.color;
  })
);

const showTyping = ref(true);

onMounted(() => {
  setTimeout(() => {
    showTyping.value = false;
  }, 1500);
});
</script>

<template>
  <div
    class="a-conversation-bot"
    :style="{
      '--color': color,
    }"
  >
    <div class="conversation-body">
      <div
        :key="index"
        class="conversation-row"
        :class="[
          sender === 'user'
            ? 'user-message'
            : sender === 'bot'
            ? 'bot-message'
            : '',
          !avatar && 'message-margin',
        ]"
      >
        <!-- <div class="avatar-sam" v-if="index == 0">hola</div> -->
        <div v-if="avatar" class="conversation-avatar">
          <slot name="avatar">
            <img
              src="https://static.vecteezy.com/system/resources/previews/024/091/758/non_2x/happy-kawaii-face-free-png.png"
              alt="happy"
            />
          </slot>
        </div>
        <div
          class="conversation-message"
          :class="{ 'bot-typing': showTyping, 'bot-typed': !showTyping }"
        >
          <div v-if="showTyping && sender === 'bot'">
            <ATyping />
          </div>
          <span v-else>
            {{ text }}
          </span>
        </div>
        <div class="conversation-action">
          <slot name="action"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a-conversation-bot {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow: hidden;
  padding: 0 10px;
  width: 100%;

  .conversation-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    overflow-x: hidden;

    .conversation-row {
      border-radius: 8px;
      padding: 5px;
      display: flex;
      min-height: 20px;

      .conversation-avatar {
        position: relative;
        height: 50px;
        min-height: 50px;
        width: 50px;
        min-width: 50px;
        margin: 10px 10px 10px 0;
        border-radius: 50px;
        background: var(--color);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        width: 10%;

        :slotted(img) {
          height: 70%;
          width: 70%;
          object-fit: content;
        }
      }

      .conversation-message {
        width: fit-content;
        height: fit-content;
        border-radius: 20px;
        max-width: 80%;
      }

      &.user-message {
        display: flex;
        justify-content: flex-end;

        .conversation-message {
          padding: 5px 10px;
          color: var(--a-white);
          background: var(--color);
          border-top-right-radius: 0;
          text-align: right;
        }
      }

      &.bot-message {
        .conversation-message {
          padding: 5px 10px;
          background: var(--a-grey-lightest);
          border-bottom-left-radius: 0;
          color: var(--a-grey-darker);
          font-weight: 500;
          overflow: hidden;
        }

        .bot-typing {
          max-height: 30px;
          transition: max-height 0.5s ease-in-out;
        }
        .bot-typed {
          max-height: 2000px;
          transition: max-height 0.5s ease-in-out;
        }
      }

      &.message-margin {
        margin-left: 60px;
      }

      .conversation-action {
        width: 10%;
        display: flex;
        align-items: center;

        :slotted(button) {
          background: transparent;
          cursor: pointer;
        }

        :slotted(span) {
          color: var(--a-grey-darker);
          font-size: 17px;
        }
      }
    }
  }
}
</style>
