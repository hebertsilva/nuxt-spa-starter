<template>
  <div class="body">
    <div>
      <div v-if="loading['user.test']" class="loading mb20">
        <p>Loading...</p>
      </div>

      <div class="mb20">
        <h1 class="text-title">
          Teste request via api
        </h1>
      </div>

      <button @click="requestAPI">
        List todo
      </button>

      <div v-if="resultApi" class="result">
        <p>userId: {{ resultApi.userId }}</p>
        <p>id: {{ resultApi.id }}</p>
        <p>title: {{ resultApi.title }}</p>
        <p>completed: {{ resultApi.completed }}</p>
      </div>

      <div class="mt20 mb20">
        <h1 class="text-title">
          Teste request via Store
        </h1>
      </div>

      <button @click="requestStore">
        List todo
      </button>

      <div v-if="user" class="result">
        <p>userId: {{ user.userId }}</p>
        <p>id: {{ user.id }}</p>
        <p>title: {{ user.title }}</p>
        <p>completed: {{ user.completed }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    resultApi: null
  }),
  computed: {
    ...mapState({
      user: state => state.user.detail,
      loading: state => state.api.loading
    })
  },
  methods: {
    async requestAPI () {
      const id = 1
      const shouldDispatch = false // Default is True - Call the Store after the request
      const { data, status } = await this.$api.user.test({ id }, shouldDispatch)

      if (status === 200) {
        this.resultApi = data
      }
    },
    async requestStore () {
      const id = 1
      await this.$store.$api.user.test({ id })
    }
  }
}
</script>

<style lang="scss">
.body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  border: 1px solid map-get($colors, black100);
  padding: 20px;
}

h1 {
  @include font(1);
}

.result {
  border: 1px solid map-get($colors, black100);
  padding: 20px;
  margin-top: 20px;
}
</style>
