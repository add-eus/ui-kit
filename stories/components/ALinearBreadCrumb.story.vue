<script setup lang="ts">
import ALinearBreadCrumb from "../../components/ALinearBreadCrumb.vue";
import "../../index.scss";
import { ref, computed } from "vue";

const path = ref("Step I/Step II/Step III");
const pathSegments = computed(() => path.value.split("/").filter(Boolean));

// Méthode appelée lors de la mise à jour du chemin
const updatePath = (newPath: string) => {
  path.value = newPath;
};
</script>

<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <Variant title="default">
      <ALinearBreadCrumb
        :pathSegments="pathSegments"
        :path="path"
        @update:path="updatePath"
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
