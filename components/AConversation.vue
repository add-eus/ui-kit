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
  duo: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: Number,
    default: 0,
  },
});

const color = useColor(
  computed(() => {
    return props.color;
  })
);

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, props.delay);
});

const showTyping = ref(true);

onMounted(() => {
  setTimeout(() => {
    showTyping.value = false;
  }, 1500 + props.delay);
});
</script>

<template>
  <div
    v-if="isVisible"
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
  /* overflow: hidden; */
  padding: 0 10px;
  width: 100%;

  .conversation-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* overflow-y: auto; */
    /* overflow-x: hidden; */

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
        font-size: 12px;
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
          overflow: hidden;
          animation: messageAppear 1.5s cubic-bezier(0.85, 0, 0.15, 1) forwards;

          &.duo {
            border-radius: 20px 20px 0 20px;
          }
        }

        @keyframes messageAppear {
          0% {
            color: var(--a-transparent);
            max-height: 0px;
          }
          100% {
            color: var(--a-white);
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
