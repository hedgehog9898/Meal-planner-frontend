<script setup lang="ts">
import type { IApiSavedRecipeSavedRecipe, IIngredient } from '~/types/recipe-interfaces';

interface IngredientsPlannerTableProps {
  savedRecipes: IApiSavedRecipeSavedRecipe[]
}
const props = defineProps<IngredientsPlannerTableProps>();

const ingredientsData = computed(() => {
  // First, flatten the array of ingredients
  const allIngredients = props.savedRecipes.flatMap(plannedRecipe =>
      plannedRecipe.attributes.recipe.data.attributes.ingredients
  );

  const mergedIngredients = allIngredients.reduce((accum: IIngredient[], ingredient: IIngredient) => {
    // Find an existing ingredient with the same name
    const existingIngredient = accum.find((ing: IIngredient) => ing.name === ingredient.name);

    if ( existingIngredient ) {
      // If found, sum the count_number
      existingIngredient.count_number += ingredient.count_number;
    } else {
      // If not found, clone the ingredient and add it to the accumulator
      const clonedIngredient = structuredClone(toRaw(ingredient));
      accum.push(clonedIngredient);
    }

    return accum;
  }, []);

  return mergedIngredients.map((ingredient: IIngredient) => {
    return {
      name: ingredient.name,
      count: `${ingredient.count_number} ${ingredient.count_name}`
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