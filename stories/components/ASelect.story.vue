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
          tag-color="tertiary"
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
          color="primary"
          arrow-color="primary"
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
- `arrow-color` (string, optional): Specifies the color of the arrow Default is transparent.
</docs>
