<script setup lang="ts">
import type { ApiRecipeRecipe } from '~/types/generated/contentTypes';

interface IngredientsViewerProps {
  recipe: ApiRecipeRecipe
}

const props = defineProps<IngredientsViewerProps>();
const ingredients = computed(() => {
  return props.recipe.attributes.ingredients.data.map((ingredient: any) => { return { name: ingredient.attributes.name, count: `${ingredient.attributes.count_number} ${ingredient.attributes.count_name}` } });
})
</script>

<template>
  <div>{{ ingredients?.map((ingredient: any) => `${ingredient.name} ${ingredient.count}`).join(', ') }}</div>
</template>

<style scoped>

</style>