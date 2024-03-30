<template>
  <header>
    <h2>Please enter your username to log in</h2>
  </header>
  <main>
    <v-row>
      <v-col cols="12">
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
          <v-text-field
            v-model="username"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            label="Username"
            clearable
          />
          <v-btn
            :disabled="!form"
            :loading="loading"
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            block
          >
            Log In
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </main>
</template>
<script>
export default {
  name: 'LogIn',
  emits: ['login', ],
  data: () => ({
    form: false,
    username: null,
    loading: false,
  }),
  methods: {
    onSubmit () {
      if (!this.form) return
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$emit('login', this.username)
      }, 1000)
    },
    required (v) {
      return !!v || 'Field is required'
    },
  },
}
</script>
<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
