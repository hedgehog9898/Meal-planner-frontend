<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const { login } = useStrapiAuth()
const router = useRouter()
const accessTokenCookie = useCookie('accessToken');

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6)
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async ({ username, password }) => {
  try {
    await login({ identifier: username, password }).then(res => {
      accessTokenCookie.value = res.jwt;
    })

    await router.push('/');
  } catch (e) {}
})
</script>
<template>
  <form class="w-1/4 space-y-6">
    <div class="flex flex-col justify-center">
      <h1 class="text-2xl mb-6 text-center">Login form</h1>
      <div class="mb-2">
        <label for="email">Email</label>
        <InputText id="email" name="username" type="email" class="w-full h-10" />
      </div>

      <div class="mb-2">
        <label for="password">Password</label>
        <InputText id="password" name="password" type="password" class="w-full h-10" />
      </div>

      <Button label="Submit" icon="pi pi-check" @click="onSubmit" />
    </div>
  </form>
</template>