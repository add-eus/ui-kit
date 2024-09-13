<script setup lang="ts">
import ADropdown from "../../components/ADropdown.vue";
import ADropdownItem from "../../components/ADropdownItem.vue";
import AButton from "../../components/AButton.vue";
import AIcon from "../../components/AIcon.vue";
import { ref } from "vue";
import "../../index.scss";

const open = ref(false);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ADropdown>
        <template #action="{ toggle }">
          <AButton @click="toggle()">Click me</AButton>
        </template>
        <template #content>
          <AButton>Option 1</AButton>
        </template>
      </ADropdown>
    </Variant>

    <Variant title="icon/ellipsis">
      <ADropdown>
        <template #action="{ toggle }">
          <AButton @click="toggle()" color="primary">
            <AIcon icon="more_horiz" type="rounded" />
          </AButton>
        </template>
        <template #content>
          <AButton
            ><span class="ellipsis">Option 1 Option 1 Option 1</span></AButton
          >
          <AButton
            ><span class="ellipsis">Option 2 Option 2 Option 2</span></AButton
          >
        </template>
      </ADropdown>
    </Variant>

    <Variant title="ADropdownItem">
      <ADropdown>
        <template #action="{ toggle }">
          <AButton @click="toggle()" color="tertiary">Click me</AButton>
        </template>
        <template #content>
          <ADropdownItem>
            <template #default>
              <AIcon icon="add_box" />
              Step action
            </template>
            <template #subtitle> Subtitle </template>
          </ADropdownItem>
          <ADropdownItem>
            <template #default>
              <AIcon icon="forms_add_on" />
              Step Title
            </template>
          </ADropdownItem>
        </template>
      </ADropdown>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ADropdown

This is a dropdown component.

## Usage

The `ADropdown` component provides the following options:

- `isOpen` (boolean, optional): Specifies state open.
</docs>
