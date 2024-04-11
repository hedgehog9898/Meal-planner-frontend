<script setup lang="ts">
import type { ApiRecipeRecipe } from '~/types/generated/contentTypes';
import type { Strapi4ResponseData } from '@nuxtjs/strapi';
const { find } = useStrapi();

const recipes: Ref<Strapi4ResponseData<ApiRecipeRecipe>[]> = ref([]);

onMounted(async () => {
  const response = await find<ApiRecipeRecipe>('recipes', { populate: 'deep' });
  recipes.value = response?.data ?? [];
});

definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <div class="max-w-screen-xl">
    <DataTable :value="recipes" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Recipes</span>
        </div>
      </template>
      <Column field="attributes.name" header="Name"></Column>
      <Column field="attributes.description" header="Description"></Column>
      <template #footer> In total there are {{ recipes ? recipes.length : 0 }} recipes. </template>
    </DataTable>
  </div>
</template>

<style scoped>

</style>