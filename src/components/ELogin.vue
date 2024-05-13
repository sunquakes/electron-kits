<template>
  <a-row>
    <a-col class="left" :span="16"></a-col>
    <a-col class="right" :span="8">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: t('login.username_required') }]"
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
import { reactive, computed } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import router from '../router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

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
const onFinish = (values: any) => {
  router.push({ path: '/' })
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})
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
