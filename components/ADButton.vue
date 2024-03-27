<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: undefined,
    validator: (value) => {
        return ['primary', 'danger', 'success'].includes(value);
    },
  },
});

</script>

<template>
    <button :class="['ad-button', color]">
      <slot></slot>
    </button>
</template>
  
<style scoped lang="scss">
  .ad-button {
    border: none;
    border-radius: 50px;
    padding: 3px 8px;
    height: 35px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
    
    //DEFAULT
    background-color: var(--ad-grey-light);
    color: var(--ad-black);

    i {
      color: var(--ad-grey-light);
      transition: color 0.15s ease-in-out;
    }

    &:hover {
      background-color: var(--ad-grey);
      color: var(--ad-black);
      i {
        color: var(--ad-black);
      }
    }
    
    &:active {
      background-color: var(--ad-black);
      color: var(--ad-white);
      i {
        color: var(--ad-white);
      }
    }
    
    //PRIMARY
    &.primary {
      background-color: var(--ad-primary);
      color: var(--ad-white);

      i {
        color: var(--ad-white);
      }
      
      &:hover {
        background-color: var(--ad-primary-light);
        color: var(--ad-white);
        i {
          color: var(--ad-white);
        }
      }
      
      &:active {
        background-color: var(--ad-white);
        color: var(--ad-primary);
        i {
          color: var(--ad-primary);
        }
      }
    }

    //DANGER
    &.danger {
      background-color: var(--ad-danger);
      color: var(--ad-white);

      i {
        color: var(--ad-white);
      }

      &:hover {
        background-color: var(--ad-danger-light);
        color: var(--ad-white);
        i {
          color: var(--ad-white);
        }
      }

      &:active {
        background-color: var(--ad-white);
        color: var(--ad-danger);
        i {
          color: var(--ad-danger);
        }
      }
    }
    
    //SUCCESS
    &.success {
      background-color: var(--ad-success);
      color: var(--ad-white);

      i {
        color: var(--ad-white);
      }

      &:hover {
        background-color: var(--ad-success-light);
        color: var(--ad-white);
        i {
          color: var(--ad-white);
        }
      }

      &:active {
        background-color: var(--ad-white);
        color: var(--ad-success);
        i {
          color: var(--ad-success);
        }
      }
    }

    
  }
  
</style>