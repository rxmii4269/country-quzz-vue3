<template>
  <div class="text-center my-4 mx-4">
    <img class="winners mb-8" :src="imgUrl" alt="" />
    <h1 class="capitalize text-5xl text-center mb-1 font-extrabold text-blue-900">
      Results
    </h1>
    <p class="text-blue-900 text-lg mb-10">
      You got
      <span class="text-green-400 text-3xl font-bold">{{ score }}</span>
      correct <span v-if="score > 1">answers</span> <span v-else>answer</span>
    </p>
    <button class="
        border-2
        font-bold
        text-center text-blue-900
        border-blue-900
        hover:bg-blue-900 hover:text-white
        rounded-lg
        py-3
        px-10
        text-base
      " @click="tryAgain">
      Try again
    </button>
  </div>
</template>
<script setup lang="ts">
import imgUrl from '../assets/images/undraw_winners_ao2o 2.svg'
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { quizStore } from '../stores/quiz';


const emit = defineEmits(['resetGame'])

const store = quizStore()
const { score } = storeToRefs(store)
const { resetGame, generateQuestion } = store

const gameOver = ref(true)


watch(gameOver, (newVal, oldVal) => {
  emit('resetGame', newVal)
})

const tryAgain = () => {
  resetGame()
  generateQuestion()
  gameOver.value = false
}
</script>

<style scoped>
.winners {
  height: 100px;
  width: 200px;
  display: inline-block;
}
</style>