import book1 from '../../data/book1';
import book2 from '../../data/book2';
import book3 from '../../data/book3';
import book4 from '../../data/book4';
import book5 from '../../data/book5';
import book6 from '../../data/book6';

export default class Main {
    constructor() {
        this.data = [];
        this.settings = {};
        this.listToday = [];
        this.cardIndex = 0;
        this.nextNewWord = 0;
        this.consecutive = 0;
        this.newConsecutive = 0;
        this.newWordsToday = 0;
        this.correctAnswer = 0;
        this.incorrectAnswer = 0;
        this.currentMistake = false;
        this.allStudyWords = [];
        this.checkCreateListFn();
        this.setSettings();
    }

    createCard() {
        const card = document.createElement('section');
        card.className = 'card';
        card.id = 'card';
        const playBtn = document.createElement('button');
        playBtn.id = 'cardPlay';
        playBtn.className = 'card__play';
        const img = document.createElement('img');
        img.id = 'cardImg';
        img.src = './img/default.jpg';
        img.setAttribute('alt', '');
        const explanation = document.createElement('p');
        explanation.id = 'cardMeaning';
        const translation = document.createElement('p');
        translation.id = 'cardMeaningTranslation';
        const sentence = document.createElement('p');
        sentence.id = 'cardExample';
        const sentenceTranslation = document.createElement('p');
        sentenceTranslation.id = 'cardExampleTranslation';

        const input = document.createElement('div');
        input.className = 'card__input';
        input.id = 'cardInput';
        const text = document.createElement('input');
        text.setAttribute('type', 'text');
        text.id = 'inputWord';
        text.className = 'card__input-item';
        const correctText = document.createElement('span');
        correctText.id = 'cardCorrect';
        correctText.className = 'card__input-correct';
        input.append(text);
        input.append(correctText);

        const wrapTranslation = document.createElement('div');
        wrapTranslation.className = 'card__translation';
        const spanTranslation = document.createElement('span');
        spanTranslation.id = 'translationWord';
        spanTranslation.innerHTML = 'word';
        const spanTranscription = document.createElement('span');
        spanTranscription.id = 'transcriptionWord';
        spanTranscription.innerHTML = '[word]';
        wrapTranslation.append(spanTranslation);
        wrapTranslation.append(spanTranscription);

        const answer = document.createElement('div');
        answer.className = 'card__answer';
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = 'Remove the word';
        removeBtn.id = 'cardRemove';
        const showBtn = document.createElement('button');
        showBtn.innerHTML = 'Show the answer';
        showBtn.id = 'cardShow';
        answer.append(removeBtn);
        answer.append(showBtn);

        const interval = document.createElement('div');
        interval.className = 'card__interval';
        interval.id = 'intervalBtns';
        const againBtn = document.createElement('button');
        againBtn.innerHTML = 'Again';
        againBtn.id = 'cardAgain';
        const difficultBtn = document.createElement('button');
        difficultBtn.innerHTML = 'Difficult';
        difficultBtn.id = 'cardDiff';
        const goodBtn = document.createElement('button');
        goodBtn.innerHTML = 'Good';
        goodBtn.id = 'cardGood';
        const easyBtn = document.createElement('button');
        easyBtn.innerHTML = 'Easy';
        easyBtn.id = 'cardEasy';
        interval.append(againBtn);
        interval.append(difficultBtn);
        interval.append(goodBtn);
        interval.append(easyBtn);

        const wrapRange = document.createElement('div');
        wrapRange.className = 'card__range';
        const firstNumber = document.createElement('span');
        firstNumber.id = 'firstNumber';
        const secondNumber = document.createElement('span');
        secondNumber.id = 'secondNumber';
        const range = document.createElement('progress');
        range.setAttribute('value', 0);
        range.id = 'rangeWords';
        wrapRange.append(firstNumber);
        wrapRange.append(range);
        wrapRange.append(secondNumber);

        const buttonLeft = document.createElement('button');
        buttonLeft.className = 'card__left';
        buttonLeft.id = 'cardLeft';
        const buttonRight = document.createElement('button');
        buttonRight.className = 'card__right';
        buttonRight.id = 'cardRight';

        const wrapCard = document.createElement('div');
        wrapCard.className = 'card__wrapper';
        wrapCard.append(playBtn);
        wrapCard.append(img);
        wrapCard.append(explanation);
        wrapCard.append(translation);
        wrapCard.append(sentence);
        wrapCard.append(sentenceTranslation);
        wrapCard.append(input);
        wrapCard.append(wrapTranslation);
        wrapCard.append(answer);
        wrapCard.append(interval);
        wrapCard.append(wrapRange);
        card.append(buttonLeft);
        card.append(wrapCard);
        card.append(buttonRight);
        document.getElementById('main').append(card);
        document.getElementById('main').append(this.endTraining());
        this.input = document.getElementById('inputWord');
        this.input.focus();
        this.createList();
        this.setWordInCard();
        this.createEvent();
    }

    endTraining() {
        const wrapper = document.createElement('section');
        wrapper.id = 'message';
        wrapper.className = 'finished';
        const message = document.createElement('h3');
        message.className = 'finished__message';
        message.innerHTML = 'План на сегодня выполнен!';

        const statistics = document.createElement('div');
        statistics.className = 'finished__statistics';
        const wrapCount = document.createElement('div');
        const countMes = document.createElement('span');
        countMes.className = 'finished__statistics-count';
        countMes.id = 'statCountMes';
        countMes.innerHTML = 'Карточек завершено:';
        const count = document.createElement('span');
        count.className = 'finished__statistics-count';
        count.id = 'statCount';
        wrapCount.append(countMes);
        wrapCount.append(count);

        const wrapCorrect = document.createElement('div');
        const correctMes = document.createElement('span');
        correctMes.className = 'finished__statistics-correct';
        correctMes.id = 'statCorrectMes';
        correctMes.innerHTML = 'Правильных ответов:';
        const correct = document.createElement('span');
        correct.className = 'finished__statistics-correct';
        correct.id = 'statCorrect';
        wrapCorrect.append(correctMes);
        wrapCorrect.append(correct);

        const wrapNew = document.createElement('div');
        const newMes = document.createElement('span');
        newMes.className = 'finished__statistics-new';
        newMes.id = 'statNewMes';
        newMes.innerHTML = 'Новые слова:';
        const newWord = document.createElement('span');
        newWord.className = 'finished__statistics-new';
        newWord.id = 'statNewWords';
        wrapNew.append(newMes);
        wrapNew.append(newWord);

        const wrapLong = document.createElement('div');
        const longMes = document.createElement('span');
        longMes.className = 'finished__statistics-long';
        longMes.id = 'statLongMes';
        longMes.innerHTML = 'Серия правильных ответов:';
        const long = document.createElement('span');
        long.className = 'finished__statistics-long';
        long.id = 'statLong';
        wrapLong.append(longMes);
        wrapLong.append(long);

        const btn = document.createElement('button');
        btn.innerHTML = 'Учить ещё';
        btn.className = 'finished__btn';
        btn.id = 'addition';
        statistics.append(wrapCount);
        statistics.append(wrapCorrect);
        statistics.append(wrapNew);
        statistics.append(wrapLong);
        wrapper.append(message);
        wrapper.append(statistics);
        wrapper.append(btn);
        return wrapper || this.blank;
    }

    checkCreateListFn() {
        let date = new Date();
        date = `${date.getDate()}${(date.getMonth + 1)}${date.getFullYear}`;
        this.checkCreateList = localStorage.getItem('listDay') === date;
        // статистику сделать в одну строку с id = todayStat, разделённые запятыми,
        // split(',') создать массив и диструкторизацией передать значения в нужные переменные.
        // елси новый день тогда '0,0,0,0...'
        if (!this.checkCreateList) {
            localStorage.setItem('passedToday', 0);
            this.passedToday = 0;
            localStorage.setItem('newWordsToday', 0);
            this.newWordsToday = 0;
            localStorage.setItem('consecutive', 0);
            this.consecutive = 0;
            localStorage.setItem('newConsecutive', 0);
            this.newConsecutive = 0;
            localStorage.setItem('correctAnswer', 0);
            this.correctAnswer = 0;
            localStorage.setItem('incorrectAnswer', 0);
            this.incorrectAnswer = 0;
        } else {
            this.passedToday = +(localStorage.getItem('passedToday') || '0');
            this.newWordsToday = +(localStorage.getItem('newWordsToday') || '0');
            this.consecutive = +(localStorage.getItem('consecutive') || '0');
            this.newConsecutive = +(localStorage.getItem('newConsecutive') || '0');
            this.correctAnswer = +(localStorage.getItem('correctAnswer') || '0');
            this.incorrectAnswer = +(localStorage.getItem('incorrectAnswer') || '0');
        }
    }

    createEvent() {
        document.getElementById('addition').onclick = () => {
            document.getElementById('message').classList.remove('show');
            document.getElementById('card').classList.remove('hide');
            document.getElementById('intervalBtns').classList.add('show');
            this.passedToday = 0;
            this.cardIndex = 0;
            this.newWordsToday = 0;
            this.consecutive = 0;
            this.newConsecutive = 0;
            this.correctAnswer = 0;
            this.incorrectAnswer = 0;
            this.listToday = [];
            this.createList();
            this.setWordInCard();
        };
        document.getElementById('cardLeft').onclick = () => {
            if (this.cardIndex > 0) {
                this.setAnswerInCard('left');
                this.input.setAttribute('readonly', 'readonly');
                this.input.classList.add('correct-color');
                const cardCorrect = document.getElementById('cardCorrect');
                cardCorrect.innerHTML = '';
                cardCorrect.classList.remove('opacity-correct');
                document.getElementById('cardRemove').classList.add('lock-element');
            }
        };
        document.getElementById('cardPlay').onclick = this.playWord.bind(this);
        this.input.oninput = () => {
            const cardCorrect = document.getElementById('cardCorrect');
            cardCorrect.innerHTML = '';
            cardCorrect.classList.remove('opacity-correct');
        };
        document.body.onkeydown = (e) => {
            if (e.code === 'Enter') this.eventRight();
        };
        document.getElementById('cardRight').onclick = this.eventRight.bind(this);
        document.getElementById('cardRemove').onclick = this.eventRemove.bind(this);
        document.getElementById('cardAgain').onclick = this.eventCardAgain.bind(this);
    }

    eventRight() {
        const right = document.getElementById('cardRight');
        if (right.classList.contains('go-next')
            && this.cardIndex + 1 === (this.passedToday + Number(this.currentMistake))) {
            right.classList.remove('go-next');
            this.clearCard();
            if (this.passedToday === +document.getElementById('maxWords').value) {
                document.getElementById('card').classList.add('hide');
                document.getElementById('message').classList.add('show');
                this.inputTodayStatistics();
            } else {
                this.setWordInCard(true);
            }
        } else if (this.cardIndex === this.passedToday) {
            this.setAnswerInCard();
        } else {
            this.setAnswerInCard('right');
        }
    }

    eventRemove() {
        // удалённое слово добавить во вкладку "удалённые слова" в словаре
        // сделать проверку настройки, если указана галочка напротив только повторение,
        // тогда добавлять из списка на повторение и не увеличивать nextNewWord.

        if (!document.getElementById('cardRemove').classList.contains('lock-element')) {
            this.listToday.splice(this.cardIndex, 1);
            let allWords = [...book1, ...book2, ...book3, ...book4, ...book5, ...book6];
            this.listToday.push(allWords[this.nextNewWord]);
            this.nextNewWord += 1;
            allWords = null;
            this.setWordInCard();
        }
    }

    eventCardAgain() {
        if (!this.currentMistake) {
            const answer = this.input.value.toLowerCase();
            if (!this.allStudyWords.includes(answer)) this.newWordsToday -= 1;
            const cutWord = this.listToday.splice(this.cardIndex, 1)[0];
            this.listToday.push(cutWord);
            this.currentMistake = true;
            this.passedToday -= 1;
            this.changeRange(false);
        }
    }

    createList() {
        // учитывать настройку Alternately - New - Repetitions
        // учитывать прошлые ошибки Mini games
        // учитвать все слова стоящие на повторение
        // после создания списка добавляем в seasonStorage по слову listDay значение ДатаМесяцГод
        // также добавляется в seasonStorage сам список
        // изменения в изучении списка (в прохождении карточек) добавляем изменения в список и в seasonStorage
        // новые слова выбираются вподряд т.к. они расположены не по алфавиту а по частотности
        // если новое слово есть в списке изучаемых удалённых сложных или выученых, тогда оно пропускается.
        // список всех слов хранится под кодовым словом user в seasonStorage
        // В seasonStorage хранятся слова закладками (изучаемые, сложные, удалённые, выученные) в виде json:
        // [learning:[word1,word2,word3],diff:[],del:[word1],learned:[word1,word2]]
        // word: {count: 10, mistake: 3, ...}
        // затем парсим и добавляем в this.data
        // this.data уже может использоватся в statistics dictionary

        // взять количество слов из настройки
        // все изменения настроек должны сразу же сохранятся в seasonStorage
        // при загрузке странице берётся из seasonStorage все настройки и заносятся в соответствующие элементы.
        const userWords = [];

        const words = sessionStorage.getItem('userAllStudyWords');
        if (words) {
            this.allStudyWords = JSON.parse(words);
            // userWords = [...this.allStudyWords.learning, ...this.allStudyWords.diff, ...this.allStudyWords.del];
        }
        const allWords = [...book1, ...book2, ...book3, ...book4, ...book5, ...book6];

        for (let i = 0, count = 0; i < allWords.length && count < this.settings.maxWords; i += 1) {
            this.nextNewWord += 1;
            if (!userWords.includes(allWords[i].word)) {
                this.listToday.push(allWords[i]);
                count += 1;
            }
        }
    }

    async getTranslation(word) {
        try {
            const urlTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200414T065147Z.a71577dc7e766811.2ac9a58088466495232d9a8fdb280040dbb99bd2&text=${word}&lang=en-ru`;
            const response = await fetch(urlTranslate);
            if (response.statusText !== 'Bad Request') {
                const json = await response.json();
                if (json) {
                    return Promise.resolve(json.text[0]);
                }
            }
            return Promise.resolve(false);
        } catch (error) {
            this.error = error.message;
        }
        return Promise.resolve(false);
    }

    getCheckRadio(name) {
        const elements = document.getElementsByName(name);
        for (let i = 0; i < elements.length; i += 1) {
            if (elements[i].checked) {
                this.settings[name] = elements[i].id;
            }
        }
    }

    setSettings() {
        const json = sessionStorage.getItem('settings');
        if (json) {
            this.settings = JSON.parse(json);
            const keys = Object.keys(this.settings);
            keys.forEach((item) => {
                document.getElementById('item').value = this.settings[item];
            });
        } else {
            this.getCheckRadio('answer');
            this.getCheckRadio('remove');
            this.getCheckRadio('difficult');
            this.getCheckRadio('list');
            this.getCheckRadio('interval');
            this.getCheckRadio('audio');
            this.settings.transcription = document.getElementById('transcription').value;
            this.settings.imagesWords = document.getElementById('imagesWords').value;
            this.settings.explanationWords = document.getElementById('explanationWords').value;
            this.settings.sentenceWords = document.getElementById('sentenceWords').value;
            this.settings.newWords = document.getElementById('newWords').value;
            this.settings.maxWords = document.getElementById('maxWords').value;
        }
    }

    async setWordInCard(next) {
        // проверка всех настроек
        // взять из seasonStorage данные по текущим словам, там должн быть данные по количеству пройденых слов
        // на текущий день, которые занесутся в левый span в блоке range, максимальное количесов в правый.
        if (document.getElementById('maxWords').value === this.passedToday) {
            document.getElementById('card').classList.add('hide');
            document.getElementById('message').classList.add('show');
        } else {
            if (next && !this.currentMistake) this.cardIndex += 1;
            this.currentMistake = false;
            const word = this.listToday[this.cardIndex];
            document.getElementById('cardImg').src = word.image;
            document.getElementById('cardMeaning').innerHTML = word.textMeaning;
            document.getElementById('cardExample').innerHTML = word.textExample;
            document.getElementById('translationWord').innerHTML = await this.getTranslation(word.word);
            document.getElementById('transcriptionWord').innerHTML = word.transcription;
            this.changeRange(false);
        }
    }

    async setAnswerInCard(prev) {
        // применить ко всем добавляемым значением настройки
        if (prev === 'left') {
            this.cardIndex -= 1;
            await this.setWordInCard(false);
        } else if (prev === 'right') {
            this.cardIndex += 1;
            await this.setWordInCard(false);
        }

        const answer = this.input.value.toLowerCase();
        const word = this.listToday[this.cardIndex];
        word.word = word.word.toLowerCase();
        const showAnswer = (answer === word.word);

        if (showAnswer || prev) {
            this.input.value = word.word;
            const meaning = await this.getTranslation(word.textMeaning.replace('<i>', ''));
            document.getElementById('cardMeaningTranslation').innerHTML = meaning;
            const example = await this.getTranslation(word.textExample.replace('<b>', ''));
            document.getElementById('cardExampleTranslation').innerHTML = example;
            document.getElementById('translationWord').innerHTML = await this.getTranslation(word.word);
            document.getElementById('cardPlay').classList.add('show');
            document.getElementById('cardRight').classList.add('go-next');
            if (showAnswer) {
                // this.playWord();
                this.input.setAttribute('readonly', 'readonly');
                this.input.classList.add('correct-color');
                document.getElementById('cardRemove').classList.add('lock-element');
                document.getElementById('intervalBtns').classList.add('show');
                this.newConsecutive += 1;
                this.correctAnswer += 1;
                if (this.newConsecutive > this.consecutive) this.consecutive = this.newConsecutive;
                if (!this.currentMistake) {
                    if (!this.allStudyWords.includes(answer)) this.newWordsToday += 1;
                    this.changeRange(true);
                } else {
                    const cutWord = this.listToday.splice(this.cardIndex, 1)[0];
                    this.listToday.push(cutWord);
                }
            }
        } else {
            this.currentMistake = true;
            this.newConsecutive = 0;
            this.incorrectAnswer += 1;
            this.incorrectWord(answer, word.word);
        }
    }

    changeRange(next) {
        if (next) {
            this.passedToday += 1;
            localStorage.setItem('passedToday', this.passedToday);
        }
        document.getElementById('firstNumber').innerHTML = this.passedToday;
        const secondNumber = document.getElementById('maxWords').value;
        document.getElementById('secondNumber').innerHTML = secondNumber;
        const range = document.getElementById('rangeWords');
        range.setAttribute('min', 0);
        range.setAttribute('max', secondNumber);
        range.value = this.passedToday;
    }

    playWord() {
        // проверить настройками какой текст воспроизводить
        // также дополнить порядок воспроизведения если некоторые опции отключены
        const word = this.listToday[this.cardIndex];
        const playWord = new Audio();
        playWord.src = word.audio;
        const playMeaning = new Audio();
        playMeaning.src = word.audioMeaning;
        const playExample = new Audio();
        playExample.src = word.audioExample;
        playWord.play();
        playWord.onended = () => {
            playMeaning.play();
        };
        playMeaning.onended = () => {
            playExample.play();
        };
    }

    incorrectWord(answer, word) {
        let mistakes = 0;
        mistakes = Math.abs(answer.length - word.length);
        for (let i = 0; i < word.length; i += 1) {
            if (answer && answer.length > i) {
                if (answer[i] !== word[i]) mistakes += 1;
            }
        }
        const color = (mistakes < 3) ? 'orange' : 'red';
        let text = '';
        for (let i = 0; i < word.length; i += 1) {
            if (answer && answer.length > i) {
                if (answer[i] !== word[i]) {
                    text += `<font color="${color}">${word[i]}</font>`;
                } else {
                    text += `<font color="green">${word[i]}</font>`;
                }
            } else {
                text += `<font color="${color}">${word[i]}</font>`;
            }
        }
        this.input.value = '';
        this.input.focus();
        const correct = document.getElementById('cardCorrect');
        correct.innerHTML = text;
        setTimeout(() => correct.classList.add('opacity-correct'), 2000);
    }

    clearCard() {
        document.getElementById('cardRemove').classList.remove('lock-element');
        document.getElementById('intervalBtns').classList.remove('show');
        document.getElementById('cardMeaningTranslation').innerHTML = '';
        document.getElementById('cardExampleTranslation').innerHTML = '';
        // document.getElementById('cardImg').src = './img/default.jpg';
        document.getElementById('cardMeaning').innerHTML = '';
        document.getElementById('cardExample').innerHTML = '';
        document.getElementById('translationWord').innerHTML = '';
        document.getElementById('transcriptionWord').innerHTML = '';
        document.getElementById('cardPlay').classList.remove('show');
        this.input.removeAttribute('readonly');
        this.input.classList.remove('correct-color');
        this.input.value = '';
        this.input.focus();
    }

    inputTodayStatistics() {
        // добавить в статистику общее количество попыток и количество невернхы попыток
        document.getElementById('statCount').innerHTML = this.passedToday;
        document.getElementById('statCorrect')
            .innerHTML = `${Math.floor((this.correctAnswer / (this.incorrectAnswer + this.correctAnswer)) * 100)}%`;
        document.getElementById('statNewWords').innerHTML = this.newWordsToday;
        document.getElementById('statLong').innerHTML = this.consecutive;
    }
}
