<script setup lang="ts">
import type { AutoCompleteCompleteEvent } from 'primevue/autocomplete';
import type { ApiRecipeRecipe } from '~/types/generated/contentTypes';
import { ref, type WritableComputedRef } from "vue";
import { debounce } from '@antfu/utils';
const { find } = useStrapi();

const emits = defineEmits<{
  (e: 'recipe-selected', recipe: string): void
}>()

const selectedRecipe = ref<string>('');
const selectedRecipeComputed: WritableComputedRef<string> = computed({
  get(): string {
    return selectedRecipe.value;
  },
  set(newValue: string): void {
    selectedRecipe.value = newValue;
    emits('recipe-selected', selectedRecipe.value);
  },
});

const filteredRecipes = ref();

const search = (event: AutoCompleteCompleteEvent) => {
  debounce(250, async () => {
    const trimmedValue: string = event.query.trim();

    console.log('trimmedValue', trimmedValue);
    if (trimmedValue.length) {
      const response = await find<ApiRecipeRecipe>('recipes', { filters: { name: { $contains: trimmedValue }  } } );
      const data = response?.data ?? [];
      filteredRecipes.value = data.map((recipe) => {
        return recipe.attributes.name;
      });
    }
  })();
}
</script>

<template>
  <div class="card flex justify-content-center">
    <AutoComplete v-model="selectedRecipeComputed" :suggestions="filteredRecipes" @complete="search">
      <template #option="slotProps">
        <div class="flex align-options-center">
          <div>{{ slotProps.option }}</div>
        </div>
      </template>
    </AutoComplete>
  </div>
</template>

<style scoped>

</style>