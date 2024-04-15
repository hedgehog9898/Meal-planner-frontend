<script setup lang="ts">
import type { IApiSavedRecipeSavedRecipe } from '~/types/recipe-interfaces';
import type { ApiIngredientIngredient } from '~/types/generated/contentTypes';

interface IngredientsPlannerTableProps {
  savedRecipes: IApiSavedRecipeSavedRecipe[]
}
const props = defineProps<IngredientsPlannerTableProps>();

const ingredientsData = computed(() => {
  // First, flatten the array of ingredients
  const allIngredients = props.savedRecipes.flatMap(plannedRecipe =>
      plannedRecipe.attributes.recipe.data.attributes.ingredients.data
  );

  const mergedIngredients = allIngredients.reduce((accum: ApiIngredientIngredient[], ingredient: ApiIngredientIngredient) => {
    // Find an existing ingredient with the same name
    const existingIngredient = accum.find((ing: ApiIngredientIngredient) => ing.attributes.name === ingredient.attributes.name);

    if ( existingIngredient ) {
      // If found, sum the count_number
      existingIngredient.attributes.count_number += ingredient.attributes.count_number;
    } else {
      // If not found, clone the ingredient and add it to the accumulator
      const clonedIngredient = structuredClone(toRaw(ingredient));
      accum.push(clonedIngredient);
    }

    return accum;
  }, []);

  return mergedIngredients.map((ingredient: ApiIngredientIngredient) => {
    return {
      name: ingredient.attributes.name,
      count: `${ingredient.attributes.count_number} ${ingredient.attributes.count_name}`
    }
  })
});
</script>

<template>
  <ClientOnly>
    <DataTable :value="ingredientsData" sortField="name" :sortOrder="1" class="mb-4">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Ингредиенты которые нужны для приготовления плана</span>
        </div>
      </template>
      <Column field="name" header="Название"></Column>
      <Column field="count" header="Кол-во"></Column>
    </DataTable>
  </ClientOnly>
</template>

<style scoped>

</style>