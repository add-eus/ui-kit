<script setup lang="ts">
import ADMessage from "./ADMessage.vue";
import '../index.scss';
</script>

<template>
    <Story :layout="{ type: 'grid', width: 200 }">
        <Variant title="default">
            <ADMessage>error message</ADMessage>
        </Variant>
        <Variant title="danger">
            <ADMessage color="danger">error message</ADMessage>
        </Variant>
        <Variant title="warning">
            <ADMessage color="warning">warning message</ADMessage>
        </Variant>
        <Variant title="success">
            <ADMessage color="success">success message</ADMessage>
        </Variant>
    </Story>
</template>

<docs lang="md">
# ADMessage

This is a message component.

## Usage

The `ADMessage` component provides the following options:

- `color` (string, optional): Specifies the color of message (danger, warning, success, default to error).
</docs>