<template>
  <div style="overflow-y: auto; overflow-x: hidden;">
    <!-- The container for both stair cases and the base -->
    <div
      style="
        max-height: 70vh;
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        padding: 20px 0;
        width: 100%;
      "
    >
      <!-- The "stair case" -->
      <div
        style="
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
        "
      >
        <template
          v-for="(activity, index) in activities"
          :key="`${activity.name}-${index}-students-steps`"
        >
          <!-- Students + Step -->
          <v-card
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              background-color: transparent;
            "
            :width="`${100 / activities.length }%`"
            flat
            tile
          >
            <!-- The students -->
            <v-card
              v-if="
                board[activity.order] &&
                board[activity.order].length > 0
              "
              style="display: flex; flex-direction: row; align-self: center;"
              class="pa-6 pb-0"
              flat
              tile
            >
              <!-- Only one student on this level -->
              <template v-if="board[activity.order].length < 2">
                <v-badge
                  floating
                  location="top left"
                  color="blue"
                  :content="board[activity.order][0]"
                  :title="
                    board[activity.order][0] == 'YOU'
                      ? 'You are here!'
                      : 'One of your colleagues is here!'
                  "
                >
                  <v-icon
                    :color="
                      board[activity.order][0] == 'YOU' ? 'purple accent-3' : 'cyan darken-1'
                    "
                    :size="board[activity.order][0] == 'YOU' ? 50 : 40"
                    :title="
                      board[activity.order][0] == 'YOU'
                        ? 'You are here!'
                        : 'One of your colleagues is here!'
                    "
                    class="mb-n1"
                  >
                    {{
                      index === activities.length - 1
                        ? 'mdi-trophy'
                        : 'mdi-walk'
                    }}
                  </v-icon>
                </v-badge>
              </template>

              <!-- Two or more students on this level -->
              <template v-else>
                <!-- The current student is among the students -->
                <v-badge
                  v-if="board[activity.order].includes('YOU')"
                  floating
                  location="top left"
                  color="blue"
                  :content="getContent(activity.order)"
                  title="You and some of your colleagues are here!"
                >
                  <v-icon
                    color="purple accent-3"
                    size="50"
                    class="mb-n1"
                    title="You and some of your colleagues are here!"
                  >
                    {{
                      index === activities.length - 1
                        ? 'mdi-trophy'
                        : 'mdi-walk'
                    }}
                  </v-icon>
                </v-badge>

                <!-- The current student is not among the students -->
                <v-badge
                  v-else
                  floating
                  location="top left"
                  color="blue"
                  :content="getContent(activity.order)"
                  title="Some of your colleagues are here!"
                >
                  <v-icon
                    color="cyan darken-1"
                    size="40"
                    class="mb-n1"
                    title="Some of your colleagues are here!"
                  >
                    {{
                      index === activities.length - 1
                        ? 'mdi-trophy'
                        : 'mdi-walk'
                    }}
                  </v-icon>
                </v-badge>
              </template>
            </v-card>

            <!-- The staircase steps -->
            <v-card
              :height="30 * activity.order"
              :color="
                index === activities.length - 1
                  ? 'purple darken-1'
                  : getCyanMix(index)
              "
              tile
            >
              <v-row align="center" justify="center">
                <v-col class="text-center" cols="12">
                  <div :style="`font-size: ${activity.order * 5}px; color: black;`">
                    <b style="background-color: white;">{{ activity.order }}</b>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-card>
        </template>
      </div>

      <!-- The staircase base, with the activity labels and actions -->
      <div style="width: 100%; display: flex; flex-direction: row;">
        <v-card
          v-for="(activity, index) in activities"
          :key="index"
          :color="
            index === activities.length - 1
              ? 'purple darken-1'
              : getCyanMix(index)
          "
          height="120"
          :width="`${100 / activities.length}%`"
          tile
          flat
        >
          <div>
            <h6 class="text-center mt-1 mb-n1">
              {{ activity.name }}
            </h6>
            <p class="text-center">
              <v-btn
                class="mt-2 text-none"
                :color="
                  activity.order <= current
                    ? 'green'
                    : activity.order === current + 1
                      ? 'blue'
                      : 'red'
                "
                size="small"
                :disabled="!(activity.order === current + 1)"
                :loading="learning && [current + 1, current + 2].includes(activity.order)"
                @click.prevent="takeTraining"
              >
                <span v-if="activity.order <= current">Completed</span>
                <span v-else-if="activity.order === current + 1">Take training</span>
                <span v-else><v-icon class="mr-1">mdi-lock</v-icon> Locked</span>
              </v-btn>
            </p>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LadderBoard',
  props: {
    activities: {
      type: Array,
      required: true,
      default: () => [],
    },
    progress: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data: () => ({
    learning: false,
  }),
  computed: {
    board() {
      return this.progress.board
    },
    current() {
      return this.progress.current
    },
  },
  methods: {
    getContent(order) {
      const students = this.board[order]
      return students.length
    },
    getCyanMix(index) {
      const darkCyan = Math.floor(255 / (index + 1) + 25)
      return `rgba(0, ${darkCyan}, ${darkCyan}, 1)`
    },
    takeTraining() {
      this.learning = true
      setTimeout(() => {
        this.learning = false
      }, 1000)
    },
  },
}
</script>
