<script setup lang="ts">
import { defineProps, computed, ref, onMounted } from "vue";
import AConversation from "../../components/AConversation.vue";
import AIcon from "../../components/AIcon.vue";

interface Message {
  sender: string;
  text: string;
}

const conversation = ref<Message[]>([
  { sender: "user", text: "hola" },
  {
    sender: "bot",
    text: "Bonjour, comment puis-je vous aider en cette belle journée? Dites moi tout et je ferais mon maximum pour vous appuyer dans vos démarches!",
  },
  {
    sender: "user",
    text: "Je cherche des informations sur votre produit.",
  },
  { sender: "bot", text: "Bien sûr, quel produit vous intéresse ?" },
  { sender: "bot", text: "Choisissez une catégorie" },
]);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 520 }">
    <Variant title="default">
      <div class="a-conversation-story">
        <AConversation />
      </div>
    </Variant>

    <Variant title="color">
      <div class="a-conversation-story">
        <AConversation
          color="secondary"
          sender="bot"
          text="Bonjour, comment puis-je vous aider en cette belle journée? Dites moi tout et je ferais mon maximum pour vous appuyer dans vos démarches!"
          avatar
        />

        <AConversation
          color="secondary"
          sender="user"
          text="Je cherche des informations sur votre produit."
        />
        <AConversation
          color="secondary"
          sender="bot"
          text="Bien sûr, quel produit vous intéresse ?"
        />
        <AConversation
          color="secondary"
          sender="bot"
          text="Choisissez une catégorie"
        />
        <AConversation color="secondary" sender="user" text="Mobilier">
          <template #action>
            <button>
              <AIcon icon="edit" />
            </button>
          </template>
        </AConversation>
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# AConversationBot

This is a conversation bot component.

## Props

- `color` (string, optional, default: primary): Specifies the color of the component.
- `sender` (string, optional, default: bot): Specifies the sender of the message. Possible values are `user` or `bot`.
- `text` (string, optional, default: "Bonjour comment allez vous ?"): Specifies the text of the message.
- `avatar` (boolean, optional, default: false): Specifies whether to show the avatar.

## Slots

- `avatar`: Slot for the avatar content.
- `action`: Slot for additional actions in the conversation row.
</docs>
