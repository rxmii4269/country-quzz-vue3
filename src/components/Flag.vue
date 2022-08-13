<template>
  <div>
    <img class="small rounded" :src="flagUrl" alt="" />
    <p class="font-extrabold text-blue-900 py-4 text-2xl mr-6">
      Which country does this flag belong to?
    </p>
    <div>
      <p v-for="(answer, index) in answers" :key="index" class="
          text-lg
          border-2 border-solid
          rounded-lg
          p-1
          px-18
          pl-3
          m-2
          mx-0
          mb-5
          cursor-pointer
          hover:text-white hover:border-opacity-0
          text-purple-500
          hover:bg-orange-500
          border-purple-500
          flex flex-row
        " :class="{
          correct: answer.isCorrect && pickedAnswer,
          incorrect: !answer.isCorrect && pickedAnswer === answer,
          disabled:
            (!answer.isCorrect || answer.isCorrect) && correctAnswer,
        }" @click="selectAnswer(answer)">
        <span class="pr-4 text-2xl font-medium">
          {{ answerLetters[index] }}
        </span>
        <span class="flex-grow mt-3px">{{ answer.Ans }}</span>
        <mdicon name="check-circle-outline" v-if="answer.isCorrect && pickedAnswer" class="block-0 mt-1" />
        <mdicon name="close-circle-outline" v-if="!answer.isCorrect && pickedAnswer === answer" class="block-0 mt-1" />
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue'
import { quizStore } from '../stores/quiz';

const correctAnswer = ref('');
const pickedAnswer = ref(null);
const count = ref(false);

const store = quizStore()
const emit = defineEmits(['correct'])

const { answerLetters, flagUrl, answers, getCorrectAns } = storeToRefs(store)
const { incrementScore } = store

watch(count, (newVal, oldVal) => {
  emit('correct', newVal)
})

const selectAnswer = (answer: { Ans: string, isCorrect: boolean }) => {
  // @ts-ignore
  pickedAnswer.value = answer
  correctAnswer.value = getCorrectAns.value[0].Ans
  if (answer.Ans === correctAnswer.value) {
    incrementScore()
    count.value = true
  } else {
    // @ts-ignore
    count.value = "incorrect";
  }
}
</script>
<style scoped>
.small {
  height: 50px;
  width: 70px;
}
.correct {
  background-color: #60bf88;
  border-color: #60bf88;
  color: white;
}

.correct:hover {
  background-color: #60bf88;
}

.mt-3px {
  margin-top: 3px;
}

.incorrect {
  background-color: #ea8282;
  border-color: #ea8282;
  color: white;
}

.incorrect:hover {
  background-color: #ea8282;
}

.block-0>svg {
  display: unset;
}
</style>
