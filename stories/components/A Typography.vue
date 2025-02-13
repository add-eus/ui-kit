<script setup lang="ts">
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <Variant title="default">
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>

      <p>Subhead 1</p>
      <p>Subhead 2</p>
      <p>Subhead 3</p>
      <p>Subhead 4</p>
      <p>Subhead 5</p>

      <p>Body medium 1</p>
      <p>Body medium 2</p>
      <p>Body medium 3</p>
      <p>Body medium 4</p>
      <p>Body medium 5</p>

      <p>Body regular 1</p>
      <p>Body regular 2</p>
      <p>Body regular 3</p>
      <p>Body regular 4</p>
      <p>Body regular 5</p>

      <p>Body bold</p>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ATabs

The `ATabs` component allows you to create a set of tabs with customizable styling.
</docs>
