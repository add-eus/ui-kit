<script setup lang="ts">
import AButton from "../../components/AButton.vue";
import AIcon from "../../components/AIcon.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 250 }">
    <Variant title="default">
      <AButton>AButton</AButton>
    </Variant>
    <Variant title="grey">
      <AButton color="grey">AButton</AButton>
    </Variant>
    <Variant title="primary">
      <AButton color="primary">
        AButton
        <AIcon icon="arrow_forward" type="rounded" />
      </AButton>
    </Variant>
    <Variant title="danger">
      <AButton color="danger">
        <AIcon icon="close" />
        AButton
      </AButton>
    </Variant>
    <Variant title="success">
      <AButton color="success">
        AButton
        <AIcon icon="check" />
      </AButton>
    </Variant>
    <Variant title="warning/small">
      <AButton color="warning" size="small">
        AButton
        <AIcon icon="check" />
      </AButton>
    </Variant>
    <Variant title="warning/large">
      <AButton color="warning" size="large">
        AButton
        <AIcon icon="check" />
      </AButton>
    </Variant>
    <Variant title="info">
      <AButton color="info">
        AButton
        <AIcon icon="check" />
      </AButton>
    </Variant>
    <Variant title="icon">
      <AButton color="primary">
        <AIcon icon="face" />
      </AButton>
    </Variant>
    <Variant title="full">
      <AButton color="secondary" full> AButton Full </AButton>
    </Variant>
    <Variant title="disabled">
      <AButton color="tertiary" disabled> AButton Disabled </AButton>
    </Variant>
    <Variant title="outlined">
      <AButton color="primary" outlined>
        AButton
        <AIcon icon="arrow_forward" type="rounded" />
      </AButton>
    </Variant>
    <Variant title="tooltip">
      <AButton
        color="info"
        tooltip="Télécharger"
        size="small"
        :style="{ marginTop: '20px' }"
      >
        <AIcon icon="download" type="rounded" />
      </AButton>
    </Variant>
    <Variant title="tooltip bottom">
      <AButton
        color="info"
        tooltip="Télécharger"
        full
        tooltip-position="bottom"
        :style="{ marginTop: '20px' }"
      >
        <AIcon icon="download" type="rounded" />
      </AButton>
    </Variant>
    <Variant title="tooltip top">
      <AButton
        color="info"
        tooltip="Télécharger"
        full
        tooltip-position="top"
        :style="{ marginTop: '70px' }"
      >
        <AIcon icon="download" type="rounded" />
      </AButton>
    </Variant>
    <Variant title="tooltip left">
      <AButton
        color="info"
        tooltip="Télécharger"
        tooltip-position="left"
        size="small"
        :style="{ marginTop: '20px', marginLeft: '150px' }"
      >
        <AIcon icon="download" type="rounded" />
      </AButton>
    </Variant>
    <Variant title="congrat">
      <AButton
        :style="{ marginTop: '70px' }"
        color="primary"
        full
        congrat
        :images="['/components/assets/sparkle.png']"
        :images-number="10"
      >
        AButton Congrat Click
      </AButton>
    </Variant>
  </Story>
</template>

<docs lang="md">
# AButton

This is a button component that can be used to trigger an action.

## Usage

The `AButton` component provides the following options:

- `color` (string, optional): Specifies the color of the button. Possible values are `default`,`grey`, `primary`, `secondary`, `tertiary`, `danger`, `warning`, `success` & `info`
- `full` (boolean, optional): Specifies the size
- `size="large"` (boolean, optional): Specifies big padding. Possible values are `small`, `medium` & `large`
- `loading` (boolean, optional): Specifies if the button is in loading state
- `outlined` (boolean, optional): Specifies if the button is outlined
- `disabled` (boolean, optional): Specifies if the button is disabled
- `images` (array, optional): Specifies the images to be displayed in the animation
- `imagesNumber` (number, optional): Specifies the number of images to be displayed
- `tooltip` (string, optional): Specifies the tooltip text
</docs>
