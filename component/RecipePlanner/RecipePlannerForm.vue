<script setup lang="ts">
import RecipePlannerFormSearch from '~/component/RecipePlanner/RecipePlannerFormSearch.vue';

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import type { IApiRecipe } from '~/types/recipe-interfaces';
import type { StrapiUser } from '@nuxtjs/strapi';
import { formatDateForBe } from '~/utils/date-helpers';

const user = useStrapiUser();

const emit = defineEmits<{
  (e: "plan-recipe", recipe: {
    date: string;
    recipe: IApiRecipe;
    time: string;
    user: StrapiUser | null
  }): void
}>()

const formSchema = toTypedSchema(z.object({
  recipe: z.custom<IApiRecipe>(),
  time: z.string(),
  date: z.date()
}));

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: formSchema,
})

const [recipe] = defineField('recipe');
const [time] = defineField('time');
const [date] = defineField('date');

const recipeTimes = ref(['Завтрак', 'Обед', 'Ужин']);

const onSubmit = handleSubmit(async  ({ recipe, time, date }) => {
  emit('plan-recipe', { recipe, time, date: formatDateForBe(date), user: user.value })
});
</script>
<template>
  <form class="w-100" @submit="onSubmit">
    <div class="flex flex-col justify-center">
      <h1 class="text-2xl mb-2 text-center">Форма планирования рецепта</h1>
      <div class="flex flex-col justify-center mb-4">
        <div class="mb-2">
          <label for="recipe-name">Название рецепта</label>
          <RecipePlannerFormSearch v-model="recipe" id="recipe-name" name="recipe-name"  placeholder="Авокадо тост" class="mt-1" />
          <InlineMessage v-if="errors.recipe" severity="error" class="w-full mt-1">
            {{ errors.recipe }}
          </InlineMessage>
        </div>

        <div class="mb-2">
          <label for="recipe-time">Время приема пиши</label>
          <Dropdown v-model="time" id="recipe-time" :options="recipeTimes" placeholder="Время приема" class="w-full mt-1" />
          <InlineMessage v-if="errors.time" severity="error" class="w-full mt-1">
            {{ errors.time }}
          </InlineMessage>
        </div>

        <div class="mb-2">
          <label for="recipe-day">Дата рецепта</label>
          <Calendar v-model="date" date-format="dd.mm.yy" id="recipe-day" name="recipe-day" placeholder="24.12.2024" class="w-full h-10" />
          <InlineMessage v-if="errors.date" severity="error" class="w-full mt-1">
            {{ errors.date }}
          </InlineMessage>
        </div>
      </div>

      <Button label="Запланировать рецепт!" type="submit" />
    </div>
  </form>
</template>