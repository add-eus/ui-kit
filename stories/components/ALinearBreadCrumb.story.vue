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
# ALinearBreadCrumb

The `ALinearBreadCrumb` component is a simple breadcrumb component that allows users to navigate through a hierarchy of tabs.

## Usage

The `ALinearBreadCrumb` component offers the following options:

- `path` (string, required): The value of the currently selected tab.
- `updatePath` (function, required): A function that updates the value of the currently selected tab.
- `splitChar` (string, optional, default: "/"): The character used to split the path into segments.
- `separator` (string, optional, default: "/"): The character used visualy to separate the segments in the breadcrumb.
</docs>
