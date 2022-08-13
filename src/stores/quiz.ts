import axios from 'axios'
import { defineStore } from 'pinia'
import { shuffle } from '../composables/useHelpers'

const instance = axios.create({
    baseURL: "https://restcountries.com/v3.1/"
})

interface Country {
    capital: string
    name: {common: string}
}

interface Answer {
    Ans: string
    isCorrect: boolean
}

interface State {
    countries: Country[]
    score: number
    answers: Answer[],
    question: string,
    answerLetters: ['A', 'B', 'C', 'D']
    flagUrl: string
}

export const quizStore = defineStore('quiz', {
    state: (): State => ({
        countries: [],
        score: 0,
        answers: [],
        question: '',
        answerLetters: ['A', 'B', 'C', 'D'],
        flagUrl: ""
    }),
    getters: {
        getCorrectAns: (state) => state.answers.filter(answers => answers.isCorrect)
    },
    actions: {
        incrementScore() {
            this.score++
        },
        resetGame() {
            this.score = 0
        },
        async getCountries() {
            try {
                const response = await instance.get('all')
                this.countries = response.data
                this.generateQuestion()

            } catch (error) {
                throw new Error(`API ${error}`)
            }
        },
        getAnswers(correctAns: { common: any }) {
            let answers: Answer[] = []
            answers.push({ Ans: correctAns.common, isCorrect: true })
            for (let i = 0; i < 3; i++) {
                const rand = this.countries[Math.floor(Math.random() * 250)].name
                if (rand.common !== correctAns.common && typeof rand !== 'boolean') {
                    answers.push({ Ans: rand.common, isCorrect: false })
                } else {
                    const country = this.countries[Math.floor(Math.random() * 250)].name.common
                    answers.push({
                        Ans: country !== correctAns.common ? country : this.countries[Math.floor(Math.random() * 250)].name.common,
                        isCorrect: false
                    })
                }

            }
            this.answers = shuffle(answers) as Answer[]
        },
        generateQuestion() {
            let countries = this.countries
            let randNum = Math.floor(Math.random() * countries.length)
            let randomCapital = countries[randNum].capital
            if (randomCapital === "") {
                randNum = Math.floor(Math.random() * countries.length)
                randomCapital = countries[randNum].capital
            }
            let randCountry = countries[randNum]
            let question = `${randomCapital} is the capital of`

            if (typeof randNum !== 'undefined') {
                this.question = question
                this.generateFlagUrl(randCountry)

                countries.forEach(country => {
                    if (randomCapital === country.capital) {
                        this.getAnswers(country.name)
                    }
                })
            }
        },
        generateFlagUrl(randCountry: any) {
            let randomFlag = randCountry.flags.svg
            this.flagUrl = randomFlag
        }
    }
})