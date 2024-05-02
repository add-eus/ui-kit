<script setup lang="ts">
import ADButton from "../../components/ADButton.vue";
import ADIcon from "../../components/ADIcon.vue";
import '../../index.scss'; 
// import '../scss/_color.scss'; 
// import '../scss/_color-declaration.scss'; 
</script>

<template>
    <Story :layout="{ type: 'grid', width: 200 }">
        <Variant title="default/grey">
            <ADButton>ADButton</ADButton>
        </Variant>
        <Variant title="primary ">
            <ADButton color="primary">
                ADButton
                <ADIcon icon="arrow_forward" type="rounded" />
            </ADButton>
        </Variant>
        <Variant title="danger">
            <ADButton color="danger">
                <ADIcon icon="close"/>
                ADButton
            </ADButton>
        </Variant>
        <Variant title="success">
            <ADButton color="success">
                ADButton
                <ADIcon icon="check"/>
            </ADButton>
        </Variant>
        <Variant title="icon">
            <ADButton color="primary">
                <ADIcon icon="face"/>
            </ADButton>
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
