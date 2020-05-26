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
        this.checkCreateListFn();
        this.setSettings();
    }

    createCard() {
        const card = document.createElement('section');
        card.className = 'card';
        const playBtn = document.createElement('button');
        playBtn.id = 'cardPlay';
        playBtn.className = 'card__play';
        const img = document.createElement('img');
        img.id = 'cardImg';
        img.src = './img/default.jpg';
        img.setAttribute('alt', '');
        const explanation = document.createElement('p');
        // explanation.innerHTML = 'Meaning word';
        explanation.id = 'cardMeaning';
        const translation = document.createElement('p');
        // translation.innerHTML = 'translation meaning word';
        translation.id = 'cardMeaningTranslation';
        const sentence = document.createElement('p');
        // sentence.innerHTML = 'example word';
        sentence.id = 'cardExample';
        const sentenceTranslation = document.createElement('p');
        // sentenceTranslation.innerHTML = 'translation example word';
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
        removeBtn.innerHTML = 'Remove word';
        removeBtn.id = 'cardRemove';
        const showBtn = document.createElement('button');
        showBtn.innerHTML = 'Show answer';
        showBtn.id = 'cardShow';
        answer.append(removeBtn);
        answer.append(showBtn);

        const interval = document.createElement('div');
        interval.className = 'card__interval';
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
        firstNumber.innerHTML = '10';
        const secondNumber = document.createElement('span');
        secondNumber.id = 'secondNumber';
        secondNumber.innerHTML = '20';
        const range = document.createElement('input');
        range.setAttribute('type', 'range');
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
        this.input = document.getElementById('inputWord');
        this.input.focus();
        this.createList();
        this.setWordInCard();
        this.createEvent();
    }

    checkCreateListFn() {
        let date = new Date();
        date = `${date.getDate()}${(date.getMonth + 1)}${date.getFullYear}`;
        this.checkCreateList = localStorage.getItem('listDay') === date;
        if (!this.checkCreateList) {
            localStorage.setItem('passedToday', 0);
            this.passedToday = 0;
        } else {
            this.passedToday = +(localStorage.getItem('passedToday') || '0');
        }
    }

    createEvent() {
        document.getElementById('cardLeft').onclick = () => {
            if (this.cardIndex > 0) {
                this.setAnswerInCard('left');
                this.input.setAttribute('readonly', 'readonly');
                this.input.classList.add('correct-color');
                const cardCorrect = document.getElementById('cardCorrect');
                cardCorrect.innerHTML = '';
                cardCorrect.classList.remove('opacity-correct');
            }
        };
        document.getElementById('cardPlay').onclick = this.playWord.bind(this);
        this.input.oninput = () => {
            const cardCorrect = document.getElementById('cardCorrect');
            cardCorrect.innerHTML = '';
            cardCorrect.classList.remove('opacity-correct');
        };
        document.body.onkeydown = (e) => {
            if (e.code === 'Enter') this.setAnswerInCard();
        };
        const right = document.getElementById('cardRight');
        right.onclick = () => {
            if (right.classList.contains('go-next') && this.cardIndex + 1 === this.passedToday) {
                right.classList.remove('go-next');
                document.getElementById('cardMeaningTranslation').innerHTML = '';
                document.getElementById('cardExampleTranslation').innerHTML = '';
                document.getElementById('cardPlay').classList.remove('show');
                this.input.removeAttribute('readonly');
                this.input.classList.remove('correct-color');
                this.input.value = '';
                this.setWordInCard(true);
            } else if (this.cardIndex === this.passedToday) {
                this.setAnswerInCard();
            } else {
                this.setAnswerInCard('right');
            }
        };
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
        const words = sessionStorage.getItem('userWords');
        if (words) {
            this.data = JSON.parse(words);
            // userWords = [...this.data.learning, this.data.diff,this.data.del,this.data.learned];
        }
        const allWords = [...book1, ...book2, ...book3, ...book4, ...book5, ...book6];

        for (let i = 0, count = 0; i < allWords.length && count < this.settings.maxWords; i += 1) {
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

        if (next) this.cardIndex += 1;
        const word = this.listToday[this.cardIndex];
        document.getElementById('cardImg').src = word.image;
        document.getElementById('cardMeaning').innerHTML = word.textMeaning;
        document.getElementById('cardExample').innerHTML = word.textExample;
        document.getElementById('translationWord').innerHTML = await this.getTranslation(word.word);
        document.getElementById('transcriptionWord').innerHTML = word.transcription;
        this.changeRange(false);
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
                this.playWord();
                this.changeRange(true);
                this.input.setAttribute('readonly', 'readonly');
                this.input.classList.add('correct-color');
            }
        } else {
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
}
