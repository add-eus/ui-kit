<script setup lang="ts">
import ADButton from "../../components/ADButton.vue";
import '../../index.scss'; 
import {useNotification} from "../../stores/notification";
// import '../scss/_color.scss'; 
// import '../scss/_color-declaration.scss'; 

const { success } = useNotification();
</script>

<template>
    <Story :layout="{ type: 'grid', width: 200 }">
        <Variant title="success">
            <ADButton @click="success('Success')" color="success">Success</ADButton>
        </Variant>
        
    </Story>
</template>

<docs lang="md">
# ADButton

This is a button component that can be used to trigger an action.

## Usage

The `ADButton` component provides the following options:

- `color` (string, optional): Specifies the color of the button. Possible values are `primary`, `danger` or `success`
</docs>
