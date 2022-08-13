<template>
  <div class="relative">

    <h1 class="font-extrabold text-3xl uppercase text-white pb-2">
      Country Quiz
    </h1>
    <img v-if="!gameOver" class="test absolute" :src="imgUrl" alt="" />
    <div class="round bg-gray-200 max-w-sm overflow-hidden px-12">
      <div class="py-8 pt-8">
        <CapitalQuestion v-if="!gameOver && component == 0" :key="capital" @correct="correctValue"></CapitalQuestion>
        <FlagQuestion v-if="!gameOver && component == 1" :key="flag" @correct="correctValue"></FlagQuestion>

        <ResultContainer v-if="gameOver" @resetGame="gameOverValue"></ResultContainer>
        <div class="flex justify-end">
          <button v-if="count == true" class="
              rounded-lg
              bg-orange-500
              px-6
              py-2
              text-white
              font-extrabold
              text-lg
            " @click="nextQuestion">
            Next
          </button>
          <button v-if="typeof count === 'string' && count === 'incorrect'" class="
              rounded-lg
              bg-orange-500
              px-6
              py-2
              text-white
              font-extrabold
              text-lg
            " @click="showScore">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import imgUrl from '../assets/images/undraw_adventure_4hum 1.svg'
import { onMounted, ref } from "vue";
import { quizStore } from "../stores/quiz";
import CapitalQuestion from "./Captial.vue"
import FlagQuestion from './Flag.vue'
import ResultContainer from './Result.vue'

const store = quizStore()

const { getCountries, generateQuestion } = store

const count = ref(false)
const flag = ref(1)
const capital = ref(0)
const gameOver = ref(false)
const component = ref(0)

onMounted(async () => {
  await getCountries()
})

const nextQuestion = () => {
  component.value = Math.floor(Math.random() * 2)
  generateQuestion()
  flag.value += 1
  capital.value += 1
  count.value = false
}
const correctValue = (value: any) => {
  count.value = value

}
const showScore = () => {
  gameOver.value = true
  // @ts-ignore
  count.value = null
}
const gameOverValue = (value: any) => {
  gameOver.value = value
}
</script>
<style scoped>
.test {
  height: 70px;
  top: 30px;
  right: 30px;
}

.round {
  border-radius: 9px;
}
</style>