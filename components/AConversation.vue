<script setup lang="ts">
import type { PropType } from "vue";
import { defineProps, computed, ref, onMounted } from "vue";
import { Colors, useColor } from "../stores/color";
import ATyping from "./ATyping.vue";

interface AConversationProps {
  color: Colors;
  sender: "bot" | "user";
  text: string;
  avatar: boolean;
  duo: boolean;
}

const props = withDefaults(defineProps<AConversationProps>(), {
  color: "primary",
  sender: "bot",
  text: "Bonjour comment allez vous ? ",
  avatar: false,
  duo: false,
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
          :class="{
            'bot-typing': showTyping,
            'bot-typed': !showTyping,
            duo: duo,
          }"
        >
          <div v-if="showTyping && sender === 'bot'">
            <ATyping />
          </div>
          <span v-else>
            <slot name="content">
              {{ text }}
            </slot>
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
        max-width: 80%;
      }

      &.user-message {
        display: flex;
        justify-content: flex-end;

        .conversation-message {
          padding: 10px 15px;
          color: var(--a-white);
          background: var(--color);
          border-radius: 20px 0 20px 20px;
          text-align: right;
          max-height: 0px;
          animation: messageAppear 1.5s cubic-bezier(0.85, 0, 0.15, 1) forwards;

          &.duo {
            border-radius: 20px 20px 0 20px;
          }
        }

        @keyframes messageAppear {
          0% {
            max-height: 0px;
          }
          100% {
            max-height: 1000px;
          }
        }
      }

      &.bot-message {
        .conversation-message {
          padding: 10px 15px;
          background: var(--a-grey-lightest);
          border-radius: 0 20px 20px 20px;
          color: var(--a-grey-darker);
          font-weight: 500;
          overflow: hidden;

          &.duo {
            border-radius: 20px 20px 20px 0;
          }
        }

        .bot-typing {
          max-height: 30px;
          transition: max-height 1s cubic-bezier(0.85, 0, 0.15, 1);
        }
        .bot-typed {
          max-height: 2000px;
          transition: max-height 1.5s cubic-bezier(0.85, 0, 0.15, 1);
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
