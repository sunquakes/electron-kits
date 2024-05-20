<template>
  <a-row>
    <a-col class="left" :span="16"></a-col>
    <a-col class="right" :span="8">
      <a-form :model="formState" name="normal_login" class="login-form" @finish="handleSubmit">
        <a-form-item
          name="username"
          :rules="[{ required: true, message: t('login.username_required') }]"
          :validateStatus="usernameError ? 'error' : ''"
          :help="usernameError"
        >
          <a-input :placeholder="t('login.username')" v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: t('login.password_required') }]"
          :validateStatus="passwordError ? 'error' : ''"
          :help="passwordError"
        >
          <a-input-password :placeholder="t('login.password')" v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">Forgot password</a>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button"> Log in </a-button>
          Or
          <a href="">register now!</a>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { reactive, computed, watch, ref } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import router from '../router'
import { useI18n } from 'vue-i18n'
import { login } from '../api/user'
import { useStore } from 'vuex'

const { t } = useI18n({ useScope: 'global' })
const store = useStore()

interface FormState {
  username: string
  password: string
  remember: boolean
}
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true
})

watch(
  () => formState.username,
  (_val) => {
    usernameError.value = ''
  }
)

watch(
  () => formState.password,
  (_val) => {
    passwordError.value = ''
  }
)

const usernameError = ref('')
const passwordError = ref('')

const handleSubmit = async (values: any) => {
  const user = await login(formState.username, formState.password)
  if (user instanceof Error) {
    if (user.message === 'login.username_not_exist') {
      usernameError.value = t(user.message)
      return
    }
    if (user.message === 'login.wrong_password') {
      passwordError.value = t(user.message)
      return
    }
  } else {
    store.dispatch('setUser', user)
    router.push({ path: '/' })
  }
}
</script>

<style lang="scss" scoped>
.ant-row {
  height: 100%;
}
.left {
  height: 100%;
  background: url(../assets/images/login.png) no-repeat center center/ 100%;
}
.right {
  display: flex;
  align-items: center;
  form {
    margin: 0 auto;
  }
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
