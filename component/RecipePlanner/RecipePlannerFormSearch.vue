<script setup lang="ts">
import type { AutoCompleteCompleteEvent } from 'primevue/autocomplete';
import type { ApiRecipeRecipe } from '~/types/generated/contentTypes';
import { ref } from "vue";
import { debounce } from '@antfu/utils';
import type { Strapi4ResponseData } from '@nuxtjs/strapi';

const { find } = useStrapi();

interface RecipeSearchProps {
  id?: string,
  name?: string,
  placeholder?: string
}
const props = defineProps<RecipeSearchProps>();

const model = defineModel();
const filteredRecipes = ref<Strapi4ResponseData<ApiRecipeRecipe>[]>();

const search = (event: AutoCompleteCompleteEvent) => {
  debounce(250, async () => {
    const trimmedValue: string = event.query.trim();

    if (trimmedValue.length) {
      const response = await find<ApiRecipeRecipe>('recipes', { populate: 'deep', filters: { name: { $contains: trimmedValue }  } } );
      filteredRecipes.value = response?.data ?? []
    }
  })();
}
</script>

<template>
  <div class="card flex justify-content-center w-full">
    <AutoComplete v-model="model" v-bind="props" :suggestions="filteredRecipes" optionLabel="attributes.name" input-class="w-full" class="w-full" @complete="search">
      <template #option="slotProps">
        <div class="flex align-options-center">
          <div>{{ slotProps.option?.attributes?.name ?? '' }}</div>
        </div>
      </template>
    </AutoComplete>
  </div>
</template>

<style scoped>

</style>