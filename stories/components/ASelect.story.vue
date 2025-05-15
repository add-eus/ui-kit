<script setup lang="ts">
import { ref } from "vue";
import ASelect from "../../components/ASelect.vue";

const options = ["Option 1", "Option 2", "Option 3"];
const value1 = ref([]);

const value2 = ref([]);
const value3 = ref(undefined);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 300 }">
    <Variant title="tag-color">
      <div class="story-select">
        <ASelect
          v-model="value1"
          label="Tags"
          tag-color="primary"
          no-results="No results found"
          no-options="The list is empty"
          placeholder="Type your tag.."
          :options="options"
        ></ASelect>
      </div>
    </Variant>
    <Variant title="mode multiple">
      <div class="story-select">
        <ASelect
          v-model="value2"
          mode="multiple"
          label="Multiple"
          color="primary"
          no-results="No results found"
          no-options="The list is empty"
          placeholder="Type your tag.."
          :options="options"
        ></ASelect>
      </div>
    </Variant>
    <Variant title="single/color">
      <div class="story-select">
        <ASelect
          v-model="value3"
          mode="single"
          label="Single"
          color="primary"
          no-results="No results found"
          no-options="The list is empty"
          placeholder="Type your tag.."
          :options="options"
        ></ASelect>
      </div>
    </Variant>
  </Story>
</template>

<style lang="scss" scoped>
.story-select {
  height: 200px;
}
</style>

<docs lang="md">
# ASelect

The `ASelect` component is a versatile and customizable select input that supports tagging and multiple selections.

## Usage

The `ASelect` component accepts the following properties:

- `v-model` (Array<string>, required): Binds the selected value to a variable.
- `options` (Array<string>, required): List of options to be displayed.
- `no-results` (string, optional): Text displayed when no results are found. Default is "No results found".
- `no-options` (string, optional): Text displayed when the options list is empty. Default is "The list is empty".
- `placeholder` (string, optional): Placeholder text for the input. Default is "Type your tag..".
- `color` (string, optional): Specifies the color of the input.
- `tag-color` (string, optional): Specifies the color of the tag.
- `mode` (string, optional): Specifies the mode of the select input. Possible values are `single` and `multiple`. Default is `tags`.
- `disabled` (boolean, optional): Disables the input. Default is `false`.
- `createOption` (boolean, optional): Allows the creation of new options. Default is `false`.
- `openDirection` (string, optional): Specifies the direction in which the dropdown should open. Possible values are `top` and `bottom`.
- `required` (boolean, optional): Marks the input as required. Default is `false`.
- `searchable` (boolean, optional): Enables search functionality. Default is `true`.
- `name` (string, optional): Specifies the name attribute of the input.
- `label` (string, optional): Specifies the label text.
- `closeOnSelect` (boolean, optional): Determines whether the dropdown should close after selecting an option. Default is `true`.
- `appendToBody` (boolean, optional): Appends the dropdown to the body. Default is `false`.
</docs>
