import book1 from '../../data/book1';
import book2 from '../../data/book2';
import book3 from '../../data/book3';
import book4 from '../../data/book4';
import book5 from '../../data/book5';
import book6 from '../../data/book6';

export default class Main {
    constructor() {
        this.data = [];
        this.listToday = [];
        this.cardIndex = 0;
        this.nextNewWord = 0;
        this.consecutive = 0;
        this.newConsecutive = 0;
        this.newWordsToday = 0;
        this.correctAnswer = 0;
        this.incorrectAnswer = 0;
        this.currentMistake = false;
        this.next = false;
        this.allStudyWords = [];
        this.settings = localStorage.getItem('settings');
        this.getTodayStatStorage();
        if (this.settings) {
            this.setSettings();
        } else {
            this.getSettings();
        }
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
        const spanTranscription = document.createElement('span');
        spanTranscription.id = 'transcriptionWord';
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
        if (this.listToday.length !== this.passedToday) {
            this.setWordInCard();
        } else {
            document.getElementById('card').classList.add('hide');
            document.getElementById('message').classList.add('show');
            this.inputTodayStatistics();
        }

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

    getTodayStatStorage() {
        let date = new Date();
        date = `${date.getDate()}${(date.getMonth() + 1)}${date.getFullYear()}`;
        this.checkCreateList = localStorage.getItem('lastDate') === date;
        localStorage.setItem('lastDate', date);
        this.listToday = JSON.parse(localStorage.getItem('listToday'));
        if (!this.checkCreateList) {
            this.passedToday = 0;
            this.cardIndex = 0;
            this.newWordsToday = 0;
            this.consecutive = 0;
            this.newConsecutive = 0;
            this.correctAnswer = 0;
            this.incorrectAnswer = 0;
            this.generatedListToday = false;
            this.currentMistake = false;
            this.setTodayStatStorage();
        } else {
            [
                this.passedToday,
                this.cardIndex,
                this.newWordsToday,
                this.consecutive,
                this.newConsecutive,
                this.correctAnswer,
                this.incorrectAnswer,
                this.generatedListToday,
                this.currentMistake,
            ] = (localStorage.getItem('todayTraining') || '0,0,0,0,0,0,0,false,false').split(',').map((item) => {
                if (item === 'false') return false;
                if (item === 'true') return true;
                return +item;
            });
        }
    }

    setTodayStatStorage() {
        localStorage.setItem('todayTraining', [
            this.passedToday,
            this.passedToday,
            this.newWordsToday,
            this.consecutive,
            this.newConsecutive,
            this.correctAnswer,
            this.incorrectAnswer,
            this.generatedListToday,
            this.currentMistake,
        ].join(','));
        localStorage.setItem('listToday', JSON.stringify(this.listToday));
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
            this.generatedListToday = false;
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
                document.getElementById('cardShow').classList.add('lock-element');
                document.getElementById('intervalBtns').classList.remove('show');
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
        document.getElementById('cardShow').onclick = () => {
            if (!document.getElementById('cardShow').classList.contains('lock-element')) {
                this.input.value = this.listToday[this.cardIndex].word;
                const cardCorrect = document.getElementById('cardCorrect');
                cardCorrect.innerHTML = '';
                cardCorrect.classList.remove('opacity-correct');
                this.eventRight();
            }
        };

        document.getElementById('cardDiff').onclick = () => {
            const word = this.listToday[this.cardIndex];
            const INTERVAL_FACTOR = 1;
            this.updateAllStudyWords(word, false, true, false, false, INTERVAL_FACTOR, 'difficult');
        };
        document.getElementById('cardGood').onclick = () => {
            const word = this.listToday[this.cardIndex];
            const INTERVAL_FACTOR = 3;
            this.updateAllStudyWords(word, false, true, false, false, INTERVAL_FACTOR, 'study');
        };
        document.getElementById('cardEasy').onclick = () => {
            const word = this.listToday[this.cardIndex];
            const INTERVAL_FACTOR = 5;
            this.updateAllStudyWords(word, false, true, false, false, INTERVAL_FACTOR, 'study');
        };
        // document.getElementById('cardRemove').onclick = () => {
        //     const word = this.listToday[this.cardIndex];
        //     const INTERVAL_FACTOR = 0;
        //     this.updateAllStudyWords(word, false, true, false, false, INTERVAL_FACTOR, 'remove');
        // };

        document.getElementById('settings').onchange = (e) => {
            if (e.target.tagName === 'INPUT') {
                this.getSettings();
                localStorage.setItem('settings', JSON.stringify(this.settings));
            }
        };

        const idChecks = ['translate', 'transcription', 'imgWord', 'meaningWord', 'exampleWord'];
        idChecks.forEach((item) => {
            document.getElementById(item).onclick = () => {
                if (idChecks.filter((el) => document.getElementById(el).checked).length < 1) {
                    document.getElementById(item).checked = true;
                }
            };
        });
    }

    eventRight() {
        const right = document.getElementById('cardRight');
        if (right.classList.contains('go-next')
            && this.cardIndex + 1 === (this.passedToday + Number(this.next))) {
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
            this.setAnswerInCard(false);
        } else {
            this.setAnswerInCard('right');
        }
    }

    eventRemove() {
        // удалённое слово добавить во вкладку "удалённые слова" в словаре
        // сделать проверку настройки, если указана галочка напротив только повторение,
        // тогда добавлять из списка на повторение и не увеличивать nextNewWord.

        if (!document.getElementById('cardRemove').classList.contains('lock-element')) {
            const removeWord = this.listToday.splice(this.cardIndex, 1);
            const INTERVAL_FACTOR = 0;
            if (this.allStudyWords.find((item) => item.word === removeWord.word.toLowerCase())) {
                this.updateAllStudyWords(removeWord, false, true, false, false, INTERVAL_FACTOR, 'remove');
            } else {
                this.nextNewWord += 1;
                this.updateAllStudyWords(removeWord, true, false, false, false, INTERVAL_FACTOR, 'remove');
            }
            let allWords = [...book1, ...book2, ...book3, ...book4, ...book5, ...book6];
            this.listToday.push(allWords[this.nextNewWord]);
            allWords = null;
            this.setWordInCard();
        }
        this.setTodayStatStorage();
    }

    eventCardAgain() {
        if (!document.getElementById('cardAgain').classList.contains('lock-element')) {
            document.getElementById('cardAgain').classList.add('lock-element');
            const answer = this.input.value.toLowerCase();
            if (!this.allStudyWords.find((item) => item.word === answer)) this.newWordsToday -= 1;
            const cutWord = this.listToday.splice(this.cardIndex, 1)[0];
            this.listToday.push(cutWord);
            this.passedToday -= 1;
            this.next = true;
            this.changeRange(false);
            this.setTodayStatStorage();
        }
    }

    createList() {
        // КОММЕНТАРИИ не удалять, могут понадобится в описании на стартовой странице.
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

        // если выбран checkbox показывать только повторение то берутся без разбора начиная с самых ранних повторений
        // если выбран вперемежку тогда берутся из повторения только те которые должны повторятся только сегодня.

        // Если указано миксовать то в качестве повтора идут слова, чей срок подошёл к повторению
        // Но можно также принудительно добавлять для повторения если указан микс.
        // Если указано только повторы, то слова собираются принудительно не дожидаясь их срока повтора
        // Если слово было неверно отвечено в мини игре тогда nextTime = 0; и при сортировке будут вприоритете.

        if (!this.generatedListToday) {
            this.listToday = [];
            const userWords = localStorage.getItem('userAllStudyWords');
            if (userWords) {
                this.allStudyWords = JSON.parse(userWords);
                this.allStudyWords.sort((a, b) => a.nextTime - b.nextTime);
            }
            const allWords = [...book1, ...book2, ...book3, ...book4, ...book5, ...book6];
            this.nextNewWord = this.allStudyWords.length;
            const max = +this.settings.maxWords;
            if (this.settings.listNew) {
                this.addToList(max, allWords, true, false);
            } else if (this.settings.listRepeat) {
                this.addToList(max, allWords, false, false);
            } else if (this.settings.listAlternately) {
                this.addToList(max, allWords, false, true);
            }
            this.generatedListToday = true;
        }
    }

    addToList(max, allWords, onlyNew, alternately) {
        // протестировать после создания списка слов с указанными интервалами повторения
        // соответственно надо будет добавить сортировку по интервалам.
        let count = 0;
        if (!onlyNew) {
            let repeatWords = max;
            if (alternately) repeatWords = max - this.settings.newWords;
            for (let i = 0; i < this.allStudyWords.length && count < repeatWords; i += 1) {
                this.listToday.push(this.allStudyWords[i]);
                count += 1;
            }
        }
        if (max > this.listToday.length) {
            for (let i = this.nextNewWord; i < allWords.length && count < max; i += 1) {
                this.nextNewWord += 1;
                if (!this.allStudyWords.includes(allWords[i].word)) {
                    this.listToday.push(allWords[i]);
                    count += 1;
                }
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
                this.settings[elements[i].id] = true;
            } else {
                this.settings[elements[i].id] = false;
            }
        }
    }

    setSettings() {
        this.settings = JSON.parse(this.settings);
        const keys = Object.keys(this.settings);
        keys.forEach((item) => {
            document.getElementById(item).checked = this.settings[item];
        });
        document.getElementById('newWords').value = this.settings.newWords;
        document.getElementById('maxWords').value = this.settings.maxWords;
    }

    getSettings() {
        this.settings = {};
        this.getCheckRadio('listType');
        const checkBoxes = document.querySelectorAll('[type=checkbox]');
        Array.from(checkBoxes).forEach((item) => {
            this.settings[item.id] = item.checked;
        });
        this.settings.newWords = document.getElementById('newWords').value;
        this.settings.maxWords = document.getElementById('maxWords').value;
    }

    async setWordInCard(next) {
        // проверка всех настроек
        // взять из seasonStorage данные по текущим словам, там должн быть данные по количеству пройденых слов
        // на текущий день, которые занесутся в левый span в блоке range, максимальное количесов в правый.
        // sentenceWords" />explanationWords" />imagesWords" />transcription" />translate
        if (document.getElementById('maxWords').value === this.passedToday) {
            document.getElementById('card').classList.add('hide');
            document.getElementById('message').classList.add('show');
        } else {
            const again = document.getElementById('cardAgain').classList.contains('lock-element');
            document.getElementById('cardAgain').classList.remove('lock-element');
            if (next && !again && !this.next) this.cardIndex += 1;
            this.currentMistake = false;
            const word = this.listToday[this.cardIndex];
            if (this.settings.removeWord) {
                document.getElementById('cardRemove').classList.remove('hide');
            } else {
                document.getElementById('cardRemove').classList.add('hide');
            }
            if (this.settings.showAnswer) {
                document.getElementById('cardShow').classList.remove('hide');
            } else {
                document.getElementById('cardShow').classList.add('hide');
            }
            if (this.settings.numberLetters && this.cardIndex === this.passedToday) {
                this.input.setAttribute('maxlength', word.word.length);
                this.incorrectWord('', '*'.repeat(word.word.length));
            } else {
                this.input.setAttribute('maxlength', 80);
            }
            if (this.settings.imgWord) {
                document.getElementById('cardImg').classList.remove('hide');
                document.getElementById('cardImg').src = word.image;
            } else {
                document.getElementById('cardImg').classList.add('hide');
            }
            if (this.settings.meaningWord) {
                document.getElementById('cardMeaning').innerHTML = word.textMeaning;
            }
            if (this.settings.exampleWord) {
                document.getElementById('cardExample').innerHTML = word.textExample;
            }
            if (this.settings.transcription) {
                document.getElementById('transcriptionWord').innerHTML = word.transcription;
            }
            if (this.settings.translate) {
                document.getElementById('translationWord').innerHTML = await this.getTranslation(word.word);
            }
            this.changeRange(false);
            this.next = false;
        }
        this.setTodayStatStorage();
    }

    async setAnswerInCard(prev) {
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
            if (this.settings.meaningWord) {
                const meaning = await this.getTranslation(word.textMeaning.replace('<i>', ''));
                document.getElementById('cardMeaningTranslation').innerHTML = meaning;
            }
            if (this.settings.exampleWord) {
                const example = await this.getTranslation(word.textExample.replace('<b>', ''));
                document.getElementById('cardExampleTranslation').innerHTML = example;
            }
            if (this.settings.removeWord) {
                document.getElementById('cardRemove').classList.remove('hide');
            } else {
                document.getElementById('cardRemove').classList.add('hide');
            }
            if (this.settings.showAnswer) {
                document.getElementById('cardShow').classList.remove('hide');
            } else {
                document.getElementById('cardShow').classList.add('hide');
            }

            document.getElementById('cardPlay').classList.add('show');
            document.getElementById('cardRight').classList.add('go-next');
            if (showAnswer) {
                if (this.settings.sound) {
                    this.playWord();
                }
                this.input.setAttribute('readonly', 'readonly');
                this.input.classList.add('correct-color');
                document.getElementById('cardShow').classList.add('lock-element');
                document.getElementById('cardRemove').classList.add('lock-element');
                if (this.settings.interval) {
                    document.getElementById('intervalBtns').classList.add('show');
                }
                this.newConsecutive += 1;
                this.correctAnswer += 1;
                if (this.newConsecutive > this.consecutive) this.consecutive = this.newConsecutive;
                if (this.allStudyWords.find((item) => item.word === answer) && !prev) {
                    this.updateAllStudyWords(word, false, true, true, false);
                } else {
                    this.newWordsToday += 1;
                    this.updateAllStudyWords(word, true, false, true, false, false, 'study');
                }
                if (!this.currentMistake) {
                    this.changeRange(true);
                } else {
                    const cutWord = this.listToday.splice(this.cardIndex, 1)[0];
                    this.listToday.push(cutWord);
                }
                if (this.currentMistake) this.next = true;
                this.currentMistake = false;
            }
        } else {
            this.currentMistake = true;
            this.newConsecutive = 0;
            this.incorrectAnswer += 1;
            if (this.allStudyWords.find((item) => item.word === word.word) && !prev) {
                this.updateAllStudyWords(word, false, true, true, true);
            } else {
                this.newWordsToday += 1;
                this.updateAllStudyWords(word, true, false, true, true, false, 'study');
            }
            this.incorrectWord(answer, word.word);
        }
        this.setTodayStatStorage();
    }

    changeRange(next) {
        if (next) this.passedToday += 1;
        document.getElementById('firstNumber').innerHTML = this.passedToday;
        const secondNumber = document.getElementById('maxWords').value;
        document.getElementById('secondNumber').innerHTML = secondNumber;
        const range = document.getElementById('rangeWords');
        range.setAttribute('min', 0);
        range.setAttribute('max', secondNumber);
        range.value = this.passedToday;
    }

    playWord() {
        const word = this.listToday[this.cardIndex];
        const playWord = new Audio();
        playWord.src = word.audio;
        const playMeaning = new Audio();
        playMeaning.src = word.audioMeaning;
        const playExample = new Audio();
        playExample.src = word.audioExample;
        playWord.play();
        playWord.onended = () => {
            if (this.settings.meaningWord) {
                playMeaning.play();
            } else if (this.settings.exampleWord) {
                playExample.play();
            }
        };
        playMeaning.onended = () => {
            if (this.settings.exampleWord) {
                playExample.play();
            }
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
        document.getElementById('cardShow').classList.remove('lock-element');
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
        this.generatedListToday = false;
        this.listToday = [];
    }

    updateAllStudyWords(word, isNew, isUpdate, isCount, mistake, customRating, state) {
        const DAY_INTERVAL = 5;
        const DAY = 60 * 60 * 24 * 1000;
        if (isNew) {
            word.count = 1;
            word.mistakes = Number(mistake);
            word.state = state; // study|difficult|remove|learned
            word.customRating = customRating; // undefine|complexity|normal|easy (false|1|3|5)
            word.rating = this.getRating(word.count, word.mistakes);
            word.lastTime = new Date().getTime();

            if (customRating) {
                word.nextTime = word.lastTime + customRating * DAY * DAY_INTERVAL;
            } else {
                word.nextTime = word.lastTime + word.rating * DAY * DAY_INTERVAL;
            }
            this.allStudyWords.push(word);
        } else if (isUpdate) {
            const index = this.allStudyWords.findIndex((item) => item.word === word.word);
            if (isCount) this.allStudyWords[index].count += 1;
            if (mistake) this.allStudyWords[index].mistakes += 1;
            if (state) this.allStudyWords[index].state = state;
            if (customRating) this.allStudyWords[index].customRating = customRating;
            const counts = this.allStudyWords[index].count;
            const { mistakes } = this.allStudyWords[index];
            this.allStudyWords[index].rating = this.getRating(counts, mistakes);
            this.allStudyWords[index].lastTime = new Date().getTime();

            if (this.allStudyWords[index].customRating) {
                const delta = this.allStudyWords[index].customRating * DAY * DAY_INTERVAL;
                this.allStudyWords[index].nextTime = this.allStudyWords[index].lastTime + delta;
            } else {
                const delta = this.allStudyWords[index].rating * DAY * DAY_INTERVAL;
                this.allStudyWords[index].nextTime = this.allStudyWords[index].lastTime + delta;
            }
        }
        localStorage.setItem('userAllStudyWords', JSON.stringify(this.allStudyWords));
    }

    getRating(count, mistakes) {
        let rating = 1;
        try {
            const correctPercent = (1 - mistakes / count) * 100;
            if (correctPercent >= 20 && correctPercent < 40) {
                rating = 2;
            } else if (correctPercent >= 40 && correctPercent < 65) {
                rating = 3;
            } else if (correctPercent >= 65 && correctPercent < 90) {
                rating = 4;
            } else if (correctPercent >= 90) rating = 5;
        } catch (error) {
            this.error = error.message;
        }
        return rating;
    }
}
