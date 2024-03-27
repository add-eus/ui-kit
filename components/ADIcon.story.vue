<script setup lang="ts">
import ADIcon from "./ADIcon.vue";
import '../scss/_color.scss'; 
</script>

<template>
    <Story :layout="{ type: 'grid', width: 200 }">
        <Variant title="default">
            <ADIcon />
        </Variant>
        <Variant title="primary ">
            <ADIcon icon="arrow_forward" type="rounded" color="var(--ad-primary)"/>
        </Variant>
        <Variant title="danger">
            <ADIcon icon="close" type="sharp" color="var(--ad-danger)"/>
        </Variant>
        <Variant title="success">
            <ADIcon icon="check" type="outlined" color="var(--ad-success)"/>
        </Variant>
    </Story>
</template>

<docs lang="md">
# ADIcon

This is a icon component.

## Usage

The `ADIcon` component provides the following options:

- `color` (string, optional): Specifies the color of the button. Possible values are any valid color or variable like `var(--ad-primary)`.
- `icon` (string, optional): Specifies the icon to be displayed inside the button. Possible values are any valid icon name.
- `type` (string, optional): Specifies the type of the icon. Possible values are `rounded`, `outlined`, or `sharp`.
</docs>