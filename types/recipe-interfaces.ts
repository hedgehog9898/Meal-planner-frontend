import type { Strapi4ResponseData } from '@nuxtjs/strapi';
import type {
	ApiRecipeRecipe,
	ApiSavedRecipeSavedRecipe
} from '~/types/generated/contentTypes';

export interface IApiRecipe extends Strapi4ResponseData<ApiRecipeRecipe> {}
export interface IApiSavedRecipeSavedRecipe extends Strapi4ResponseData<ApiSavedRecipeSavedRecipe> {}

// Local Interfaces
export interface IIngredient {
	name: string,
	count_name: string,
	count_number: number
}
