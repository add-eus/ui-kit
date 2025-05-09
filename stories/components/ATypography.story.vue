<script setup lang="ts">
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <Variant title="Heading">
      <h1>Heading h1</h1>
      <h2>Heading h2</h2>
      <h3>Heading h3</h3>
      <h4>Heading h4</h4>
      <h5>Heading h5</h5>
    </Variant>
    <Variant title="Subhead">
      <h1 class="subhead">Subhead h1 -> 'subhead'</h1>
      <h2 class="subhead">Subhead h2 -> 'subhead'</h2>
      <h3 class="subhead">Subhead h3 -> 'subhead'</h3>
      <h4 class="subhead">Subhead h4 -> 'subhead'</h4>
      <h5 class="subhead">Subhead h5 -> 'subhead'</h5>
    </Variant>
    <Variant title="Body medium">
      <p class="p1 medium">Body -> 'p1 medium'</p>
      <p class="p2 medium">Body -> 'p2 medium'</p>
      <p class="p3 medium">Body -> 'p3 medium'</p>
      <p class="p4 medium">Body -> 'p4 medium'</p>
      <p class="p5 medium">Body -> 'p5 medium'</p>
    </Variant>
    <Variant title="Body regular">
      <p class="p1">Body regular -> 'p1'</p>
      <p class="p2">Body regular -> 'p2'</p>
      <p class="p3">Body regular -> 'p3'</p>
      <p class="p4">Body regular -> 'p4'</p>
      <p class="p5">Body regular -> 'p5'</p>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ATypography

The `ATypography` component is a simple component to display text with different styles.
</docs>
