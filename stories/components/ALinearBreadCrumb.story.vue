<script setup lang="ts">
import ALinearBreadCrumb from "../../components/ALinearBreadCrumb.vue";
import "../../index.scss";
import { ref } from "vue";

const path = ref("Step I/Step II/Step III");
const path2 = ref("Step I-Step II-Step III-Step IV");

const updatePath = (newPath: string) => {
  path.value = newPath;
};

const updatePath2 = (newPath: string) => {
  path2.value = newPath;
};
</script>

<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <Variant title="default">
      <ALinearBreadCrumb :path="path" @updatePath="updatePath" />
    </Variant>
    <Variant title="splitChar/separator">
      <ALinearBreadCrumb
        :path="path2"
        splitChar="-"
        separator="*"
        @updatePath="updatePath2"
      />
    </Variant>
  </Story>
</template>

<docs lang="md">
# ATabs

The `ATabs` component allows you to create a set of tabs with customizable styling.

## Usage

The `ATabs` component offers the following options:

- `tabs` (array, required): A list of objects representing the tabs. Each object should have a `label` (string) and a `value` (string). The `icon` (string) option is optional.
</docs>
