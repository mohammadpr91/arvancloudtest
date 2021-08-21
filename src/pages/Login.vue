<template>
  <div class="row window-border window-height flex-center">
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-9">
      <q-form
        class="login-submit-form q-pa-md silver"
        @submit="onSubmit"
      >
        <p
          v-html="registerForm ? 'Register' : 'Login'"
          class="text-h3 text-center q-mb-xl q-pt-xl header-login-page"
          color="--arv-warm-grey"
        >
        </p>
        <q-input
          v-if="registerForm"
          class="q-mb-lg"
          label="User name"
          stack-label
          v-model="user.username"
          outlined
          dense
          :rules=" [val => val && val != '' || 'Required field'] "
        />
        <q-input
          class="q-mb-lg"
          stack-label
          v-model="user.email"
          label="Email"
          outlined 
          dense
          :rules=" [val => /\S+@\S+\.\S+/.test(val) || 'Required field'] "
        />
        <q-input
          v-model="user.password"
          stack-label
          label="Password"
          outlined 
          dense
          :rules=" [val => /^.{8,}$/.test(val) || 'Required field'] "
        />
        <q-btn
          class="full-width q-mt-md"
          color="primary"
          filled
          :loading="loading"
          type="submit"
          :label="registerForm ? 'Register' : 'Login'"
        />
        <div class="q-mt-md">
          <span
            v-html="registerForm ? 'Already Registered?' : 'Don’t have account?'">
          </span>
          <a
            class="q-ml-sm cursor-pointer text-bold"
            v-html="registerForm ? 'Login' : 'Register Now'"
            @click="registerForm = !registerForm"
            :disabled="loading"
          ></a>
        </div>
      </q-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      registerForm: false,
      loading: false
    }   
  },
  mounted () {
  },
  methods: {
    async onSubmit () {
      this.loading = true
      if (this.registerForm) {
        this.$Service.post(
          this.$Path.APP_PATH + '/users',
          {
            user: this.user
          }
        ).then((res) => {
          this.loading = false
          this.seccessSubmit(res)
        })
        .catch(() => {
          this.loading = false
        })
      } else {
        delete this.user.username
        await this.$Service.request(
          "post",
          this.$Path.APP_PATH + '/users/login',
          {
            user: this.user
          },
          false
        )
        .then((response) => {
          this.loading = false
          this.seccessSubmit(response)
        })
        .catch(() => {
          this.loading = false
        })
      }

    },
    async seccessSubmit (response) {
      this.$store.commit("userConf/setToken", response.data.user.token)
      this.$store.commit("userConf/setUserName", response.data.user.username)
      this.$store.commit("userConf/setEmail", response.data.user.email)
      await this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
<style lang="scss">
  .login-submit-form {
    border-radius: 5px;
    background-color:  var(--arv-silver);

    .header-login-page {
      color: var(--arv-warm-grey);
    }
    
    .q-field--dense .q-field__label {
      top: -15px !important;
      font-size: 20px !important;
    }
    .q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
      background-color: var(--arv-white);;
    }
    .q-field__native {
      padding-top: 5px !important;
    }
  }
</style>