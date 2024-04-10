<script setup lang="ts">
import type { ApiRecipeRecipe } from '~/types/generated/contentTypes';
import type { Strapi4ResponseData } from '@nuxtjs/strapi';
const { find } = useStrapi();

const recipes: Ref<Strapi4ResponseData<ApiRecipeRecipe>[]> = ref([]);

onMounted(async () => {
  const response = await find<ApiRecipeRecipe>('recipes', { populate: 'deep' });

  console.log('response', response);
  recipes.value = response?.data ?? [];
});

definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <div class="max-w-screen-xl">
    <div
      v-for="recipe of recipes"
      :key="`${recipe.id}-recipe`"
    >
    </div>
  </div>
</template>

<style scoped>

</style>