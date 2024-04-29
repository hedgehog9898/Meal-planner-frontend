<script setup lang="ts">
import type { ApiRecipeRecipe } from '~/types/generated/contentTypes';

interface IngredientsViewerProps {
  recipe: ApiRecipeRecipe
}

const props = defineProps<IngredientsViewerProps>();
const ingredients = computed(() => {
  return props.recipe.attributes.ingredients.map((ingredient: any) => { return { name: ingredient.name, count: `${ingredient.count_number} ${ingredient.count_name}` } });
})
</script>

<template>
  <div>{{ ingredients?.map((ingredient: any) => `${ingredient.name} ${ingredient.count}`).join(', ') }}</div>
</template>

<style scoped>

</style>