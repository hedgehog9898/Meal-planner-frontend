<script setup lang="ts">
import IngredientsPlannerTable from '~/component/IngredientsPlanner/IngredientsPlannerTable.vue';
import RecipePlanner from '~/component/RecipePlanner/RecipePlanner.vue';
import RecipeTable from '~/component/RecipeTable.vue';
import type { ApiRecipeRecipe, ApiSavedRecipeSavedRecipe } from '~/types/generated/contentTypes';
import { useIFetch } from '#imports';

const { find, create } = useStrapi();

const savedRecipes = ref<any[]>([]);
const { data: recipes } = await useAsyncData(async () => {
  const response = await find<ApiRecipeRecipe>('recipes', { populate: 'deep' });
  return response?.data ?? [];
})

await useAsyncData(async () => {
  await fetchSavedRecipes();
})

async function fetchSavedRecipes () {
  const response = await find<ApiSavedRecipeSavedRecipe>('saved-recipes', { populate: 'deep' });
  savedRecipes.value = response.data ?? [];
}

const planRecipe = async (recipe: ApiSavedRecipeSavedRecipe) => {
  await create<ApiSavedRecipeSavedRecipe>('saved-recipes', recipe);
  await fetchSavedRecipes();
}

const deletePlannedRecipe = async (recipeId: number) => {
  const url = useStrapiUrl();
  await useIFetch(`${url}/saved-recipes/${recipeId}`, { method: 'DELETE' });
  await fetchSavedRecipes();
}

definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <div class="w-full max-w-screen-xl">
    <IngredientsPlannerTable :saved-recipes="savedRecipes" />
    <RecipePlanner :saved-recipes="savedRecipes" @plan-recipe="planRecipe" @delete-planned-recipe="deletePlannedRecipe" class="mb-4" />
    <RecipeTable :recipes="recipes" />
  </div>
</template>

<style scoped>

</style>