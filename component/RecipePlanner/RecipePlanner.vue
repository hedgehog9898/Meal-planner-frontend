<template>
  <div>
    <RecipePlannerTable :saved-recipes="props.savedRecipes" @delete-planned-recipe="deletePlannedRecipe" class="mb-4" />
    <RecipePlannerForm @plan-recipe="planRecipe" />
  </div>
</template>

<script setup lang="ts">
import RecipePlannerForm from '~/component/RecipePlanner/RecipePlannerForm.vue';
import RecipePlannerTable from '~/component/RecipePlanner/RecipePlannerTable.vue';
import type { IApiSavedRecipeSavedRecipe } from '~/types/recipe-interfaces';

interface RecipePlannerProps {
  savedRecipes: IApiSavedRecipeSavedRecipe[]
}
const props = defineProps<RecipePlannerProps>();
const emit = defineEmits<{
  (e: 'plan-recipe', recipe: IApiSavedRecipeSavedRecipe): void,
  (e: 'delete-planned-recipe', recipeId: number): void
}>()

const planRecipe = (recipe: IApiSavedRecipeSavedRecipe) => {
  emit('plan-recipe', recipe);
}

const deletePlannedRecipe = (recipeId: number) => {
  emit('delete-planned-recipe', recipeId);
}
</script>

<style scoped>
@import "qalendar/dist/style.css";
</style>