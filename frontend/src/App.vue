<template>
  <template v-if="!user">
    <Login
      @login="logIn"
    />
  </template>
  <template v-else>
    <v-app id="mainApp">
      <!-- App navbar -->
      <v-app-bar elevation="2">
        <template #prepend>
          <v-app-bar-nav-icon />
        </template>

        <v-app-bar-title>Onboaring App</v-app-bar-title>
        <template #append>
          <v-btn
            class="ml-2"
            text
            icon
            fab
            @click.prevent="user = null"
          >
            {{ user }}
          </v-btn>
        </template>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-sheet width="90vw" class="mx-2">
                <h2>Your journey to the finish line</h2>
                <v-divider class="my-2" />
                <v-progress-linear
                  :model-value="progress.completed / progress.total * 100"
                  color="green"
                  height="20"
                >
                  {{ progress.completed / progress.total * 100 }}%
                </v-progress-linear>
                <LadderBoard
                  class="mt-2"
                  :activities="activities"
                  :progress="progress"
                />
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
</template>
<script>
import LadderBoard from '@/components/LadderBoard.vue'
import Login from '@/components/Login.vue'
export default {
  name: 'App',
  components: {
    LadderBoard,
    Login,
  },
  data: () => ({
    user: null,
    // Info about all training activities
    activities: [
      {
        name: 'Phase 1',
        order: 1,
      },
      {
        name: 'Phase 2',
        order: 2,
      },
      {
        name: 'Phase 3',
        order: 3,
      },
      {
        name: 'Phase 4',
        order: 4,
      },
      {
        name: 'Phase 5',
        order: 5,
      },
    ],
    // Actual progress of the student
    progress: {
      total: 5,
      completed: 3,
      current: 3,
      // Where the student is relative to other students
      board: {
        1: ['AA', ],
        2: ['AB'],
        3: ['YOU', 'AC'],
        4: ['AD'],
        5: ['AE'],
      }
    }
  }),
  methods: {
    logIn(username) {
      this.user = username
    },
  },
}
</script>
