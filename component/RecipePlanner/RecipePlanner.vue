<template>
  <div>
    <RecipePlannerTable :saved-recipes="props.savedRecipes" class="mb-4" />
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
  (e: 'plan-recipe', recipe: IApiSavedRecipeSavedRecipe): void
}>()

const planRecipe = (recipe: IApiSavedRecipeSavedRecipe) => {
  emit('plan-recipe', recipe);
}
</script>

<style scoped>
@import "qalendar/dist/style.css";
</style>