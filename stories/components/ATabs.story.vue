<script setup lang="ts">
import ATabs from "../../components/ATabs.vue";
import AIcon from "../../components/AIcon.vue";
import "../../index.scss";

const tabs = [
  { label: "Home", value: "home", icon: "home" },
  { label: "Profile", value: "profile", icon: "account_circle" },
  { label: "Settings", value: "settings", icon: "settings" },
  { label: "About", value: "about", icon: "info" },
];
</script>

<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <Variant title="default">
      <ATabs :tabs="tabs" />
    </Variant>
    <Variant title="with initial selection">
      <ATabs :tabs="tabs" modelValue="profile" />
    </Variant>
    <Variant title="custom color">
      <ATabs :tabs="tabs" color="primary" modelValue="settings" />
    </Variant>
    <Variant title="slow transition">
      <ATabs :tabs="tabs" color="success" modelValue="home" slow>
        <template #tab> </template>
        <template #tab-link-label="{ tab }">
          <AIcon :icon="tab.icon" type="rounded" />
          <Translate>{{ tab.label }}</Translate>
        </template>
      </ATabs>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ATabs

The `ATabs` component allows you to create a set of tabs with customizable styling.

## Usage

The `ATabs` component offers the following options:

- `tabs` (array, required): A list of objects representing the tabs. Each object should have a `label` (string) and a `value` (string). The `icon` (string) option is optional.
- `selected` (string, optional): The value of the currently selected tab.
- `modelValue` (string or number, optional): The value of the selected tab, used for two-way binding.
- `color` (string, optional): Specifies the color of the active tabs. Possible values: `primary`, `danger`, `success`, etc.
- `slow` (boolean, optional): Applies a slower transition when changing tabs.
</docs>
