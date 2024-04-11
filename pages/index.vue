<script setup lang="ts">
import type { ApiRecipeRecipe } from '~/types/generated/contentTypes';
import IngredientsViewer from '~/component/IngredientsViewer.vue';
import RecipeSearch from '~/component/RecipeSearch.vue';
const { find } = useStrapi();

const { data: recipes, error } = await useAsyncData(async () => {
  const response = await find<ApiRecipeRecipe>('recipes', { populate: 'deep' });
  return response?.data ?? [];
})

const recipeSelected = (recipe: string) => {
  console.log('recipe', recipe);
}

definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <div class="max-w-screen-xl">
    <RecipeSearch @recipe-selected="recipeSelected" />

    <DataTable :value="recipes" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Recipes</span>
        </div>
      </template>
      <Column field="attributes.name" header="Name"></Column>
      <Column field="attributes.description" header="Description"></Column>
      <Column field="attributes.ingredients.data" header="Ingredients">
        <template #body="slotProps">
          <IngredientsViewer :recipe="slotProps.data" />
        </template>
      </Column>
      <template #footer> In total there are {{ recipes ? recipes.length : 0 }} recipes. </template>
    </DataTable>
  </div>
</template>

<style scoped>

</style>