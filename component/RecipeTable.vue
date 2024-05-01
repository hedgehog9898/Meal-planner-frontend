<script setup lang="ts">
import IngredientsViewer from '~/component/IngredientsViewer.vue';
import type { IApiRecipe } from '~/types/recipe-interfaces';

interface RecipeTableProps {
  recipes: IApiRecipe[]
}
const props = defineProps<RecipeTableProps>();
</script>

<template>
  <DataTable :value="props.recipes" scrollable scrollHeight="400px">
    <template #header>
      <div class="flex flex-wrap align-items-center justify-content-between gap-2">
        <span class="text-xl text-900 font-bold">Рецепты</span>
      </div>
    </template>
    <Column field="attributes.name" header="Название"></Column>
    <Column field="attributes.description" header="Описание"></Column>
    <Column field="attributes.ingredients" header="Ингредиенты">
      <template #body="slotProps">
        <IngredientsViewer :recipe="slotProps.data" />
      </template>
    </Column>
    <template #footer> Всего {{ recipes ? recipes.length : 0 }} рецептов. </template>
  </DataTable>
</template>

<style scoped>

</style>