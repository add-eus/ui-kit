<script setup lang="ts">
import ASpreadsheet from "../../components/ASpreadsheet.vue";
import "../../index.scss";

const titles = ["Keywords", "Occurrences", "Change"];
const keys = ["2020", "2021", "2022", "2023"];
const actual = ["100", "200", "150", "300"];
const before = ["120", "180", "160", "250"];
</script>

<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <Variant title="default">
      <ASpreadsheet
        :titles="titles"
        :keys="keys"
        :actual="actual"
        :before="before"
      />
    </Variant>
    <Variant title="custom titles">
      <ASpreadsheet
        :titles="['Year', 'Current', 'Previous']"
        :keys="keys"
        :actual="actual"
        :before="before"
      />
    </Variant>
    <Variant title="fewer columns">
      <ASpreadsheet
        :titles="['Year', 'Data']"
        :keys="['2021', '2022']"
        :actual="['300', '200']"
        :before="['250', '220']"
      />
    </Variant>
    <Variant title="different data">
      <ASpreadsheet
        :titles="['Category', 'This Year', 'Last Year']"
        :keys="['A', 'B', 'C']"
        :actual="['500', '400', '300']"
        :before="['450', '420', '320']"
      />
    </Variant>
  </Story>
</template>

<docs lang="md">
# ASpreadsheet

Le composant `ASpreadsheet` permet de visualiser des données sous forme de tableau avec des colonnes personnalisables et des indicateurs de changement.

## Utilisation

Le composant `ASpreadsheet` propose les options suivantes :

- `titles` (array, requis) : Un tableau contenant les titres des colonnes.
- `keys` (array, requis) : Un tableau de clés représentant les lignes du tableau.
- `actual` (array, requis) : Les valeurs actuelles des données.
- `before` (array, requis) : Les valeurs précédentes à comparer avec les actuelles.

Le composant calcule automatiquement la différence entre les valeurs actuelles et précédentes et affiche une icône d'indicateur (`arrow_upward` ou `arrow_downward`) selon que la différence est positive ou négative.

## Exemples

Différentes variations du composant `ASpreadsheet` montrent comment personnaliser les titres, les colonnes et les données.
</docs>
