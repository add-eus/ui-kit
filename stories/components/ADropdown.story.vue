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
          <ADropdownItem>
            <template #default> Step I </template>
          </ADropdownItem>
        </template>
      </ADropdown>
    </Variant>

    <Variant title="color">
      <ADropdown color="primary">
        <template #action="{ toggle }">
          <AButton @click="toggle()" color="primary">
            <AIcon icon="more_horiz" type="rounded" />
          </AButton>
        </template>
        <template #content>
          <ADropdownItem>
            <template #default> Step I </template>
          </ADropdownItem>
          <ADropdownItem>
            <template #default> Step II </template>
          </ADropdownItem>
          <ADropdownItem>
            <template #default> Step III </template>
          </ADropdownItem>
        </template>
      </ADropdown>
    </Variant>

    <Variant title="position/default/subtitle">
      <ADropdown position="right" color="tertiary">
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
- `color` (string, optional): Specifies the color of the button. Possible values are `default`,`grey`, `primary`, `secondary`, `tertiary`, `danger`, `warning`, `success` & `info`
- `position` (string, optional): Specifies the position of the dropdown. Possible values are `left`, `right`, `auto`
</docs>
