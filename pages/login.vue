<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const { login } = useStrapiAuth()
const router = useRouter()
const accessTokenCookie = useCookie('accessToken');

const formSchema = toTypedSchema(z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(6)
}));

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: formSchema,
})

const [email] = defineField('email');
const [password] = defineField('password');

const onSubmit = handleSubmit(async  ({ email, password }) => {
  try {
    await login({ identifier: email, password }).then(res => {
      accessTokenCookie.value = res.jwt;
    })

    await router.push('/');
  } catch (e) {}
});
</script>
<template>
  <form class="w-1/4 space-y-6" @submit="onSubmit">
    <div class="flex flex-col justify-center">
      <h1 class="text-2xl mb-6 text-center">Login form</h1>
      <div class="flex flex-col justify-center mb-6">
        <div class="mb-2">
          <label for="email">Email</label>
          <InputText v-model="email" id="email" name="username" type="email" class="w-full h-10" aria-describedby="username-help" />
          <InlineMessage v-if="errors.email" severity="error" class="w-full mt-1">
            {{ errors.email }}
          </InlineMessage>
        </div>

        <div class="mb-2">
          <label for="password">Password</label>
          <InputText v-model="password" id="password" name="password" type="password" class="w-full h-10" />
          <InlineMessage v-if="errors.password" severity="error" class="w-full mt-1">
            {{ errors.password }}
          </InlineMessage>
        </div>
      </div>

      <Button label="Login" type="submit" />
    </div>
  </form>
</template>