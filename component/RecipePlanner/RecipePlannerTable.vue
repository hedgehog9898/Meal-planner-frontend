<script setup lang="ts">
import type { IApiSavedRecipeSavedRecipe } from '~/types/recipe-interfaces';
import { formatDate } from '~/utils/date-helpers';

interface RecipePlannerTableProps {
  savedRecipes: IApiSavedRecipeSavedRecipe[]
}
const props = defineProps<RecipePlannerTableProps>();
const emit = defineEmits<{
  (e: 'delete-planned-recipe', recipeId: number): void
}>();

const onDeletePlannedRecipe = (id: number) => {
  emit('delete-planned-recipe', id);
}
</script>

<template>
  <ClientOnly>
    <DataTable :value="props.savedRecipes" scrollable scrollHeight="400px" rowGroupMode="rowspan" groupRowsBy="attributes.date" sortMode="single" sortField="date" :sortOrder="1" class="mb-4">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Запланированные рецепты</span>
        </div>
      </template>
      <Column field="attributes.date" header="Дата">
        <template #body="slotProps">
          <span>{{ formatDate(slotProps.data.attributes.date) }}</span>
        </template>
      </Column>
      <Column field="attributes.time" header="Время приема"></Column>
      <Column field="attributes.recipe.data.attributes.name" header="Рецепт"></Column>
      <Column field="attributes.id" header="Действия">
        <template #body="slotProps">
          <Button
            severity="danger"
            @click="onDeletePlannedRecipe(slotProps.data.id)"
          >Удалить</Button>
        </template>
      </Column>
    </DataTable>
  </ClientOnly>
</template>

<style scoped>

</style>