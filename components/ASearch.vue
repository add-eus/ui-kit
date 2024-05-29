
<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue';
import AInput from './AInput.vue';
import ADropdown from './ADropdown.vue';
import AButton from './AButton.vue';

export interface Item {
    id: number;
    name: string;
}

const props = defineProps<{
    items: Item[]|any[];
}>();

const emit = defineEmits();

const searchTerm = ref('');

const filteredItems = computed(() => {
    return props.items.filter(item => item.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

const isOpen = computed(() => {
    return searchTerm.value.length > 0;
});
</script>
<template>
    <ADropdown v-model:isOpen="isOpen">
        <template #action>
            <AInput v-model="searchTerm" v-bind="$attrs"></AInput>
        </template>
        <template #content>

            <AButton v-for="item in filteredItems" :key="item.id" @click="emit('clickItem', item); searchTerm = ''">
                <slot name="item" :item="item">
                    <span class="ellipsis">
                        {{ item.name }}
                    </span>
                </slot>
            </AButton>
            
         
            <p v-if="filteredItems.length === 0">
                <slot name="empty"></slot>
            </p>
        </template>
    </ADropdown>
</template>
