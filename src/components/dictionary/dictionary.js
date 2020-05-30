export default class Dictionary {
    constructor() {
        this.allStudyWords = [];
        this.settings = JSON.parse(localStorage.getItem('settings'));
    }

    create() {
        const userWords = localStorage.getItem('userAllStudyWords');
        if (userWords) {
            this.allStudyWords = JSON.parse(userWords);
            // this.allStudyWords.sort((a, b) => a.nextTime - b.nextTime);
        }

        this.wordsInPage = +document.getElementById('selectPages').value;
        this.allWords = this.allStudyWords.length;
        this.allPages = Math.ceil(this.allWords / this.wordsInPage);
        this.createNextPage(1);
        this.createPagination();
        this.createEvent();
    }

    createNextPage(curPage) {
        const list = document.getElementById('listDictionary');
        list.innerHTML = '';
        const prevWords = (curPage - 1) * this.wordsInPage;
        const length = prevWords + this.wordsInPage;
        for (let i = prevWords; i < length && i < this.allWords; i += 1) {
            const li = document.createElement('li');
            li.append(this.getWord(i));
            li.append(this.getTranslate(i));
            if (this.settings.dictMeaning) {
                li.append(this.getMeaning(i));
            }
            if (this.settings.dictExapmle) {
                li.append(this.getExample(i));
            }
            if (this.settings.dictTime) {
                li.append(this.getTime(i));
            }
            if (this.settings.dictRepeat || this.settings.dictRating) {
                li.append(this.getRating(i));
            }
            list.append(li);
        }
    }

    createPagination() {
        document.getElementById('alltWords').innerHTML = this.allWords;
        document.getElementById('allPages').innerHTML = this.allPages;
        document.getElementById('curPage').innerHTML = '1';

        const pages = document.getElementById('pages');
        pages.innerHTML = '';
        const VISUAL_BTNS = 5;
        for (let i = 1; i <= this.allPages && i <= VISUAL_BTNS; i += 1) {
            const button = document.createElement('button');
            button.className = 'pagination__pages-btn';
            button.setAttribute('data-page', i);
            button.id = `page${i}`;
            button.innerHTML = i;
            pages.append(button);
        }

        document.getElementById('page1').classList.add('checked-element');
        if (VISUAL_BTNS >= this.allPages) {
            document.getElementById('prevBtn').classList.add('lock-element');
            document.getElementById('firstBtn').classList.add('lock-element');
            document.getElementById('nextBtn').classList.add('lock-element');
            document.getElementById('lastBtn').classList.add('lock-element');
        } else {
            document.getElementById('prevBtn').classList.remove('lock-element');
            document.getElementById('firstBtn').classList.remove('lock-element');
            document.getElementById('nextBtn').classList.remove('lock-element');
            document.getElementById('lastBtn').classList.remove('lock-element');
        }
    }

    createEvent() {
        document.getElementById('prevBtn').onclick = () => {
            if (!document.getElementById('prevBtn').classList.contains('lock-elememnt')) {
                const prevPage = +document.getElementById('page5').dataset.page;
                const VISUAL_BTNS = 5;
                if (prevPage > VISUAL_BTNS) {
                    const buttons = document.getElementById('pages').children;
                    Array.from(buttons).forEach((item) => {
                        item.classList.remove('checked-element');
                        item.dataset.page -= 1;
                        item.innerHTML = item.dataset.page;
                    });
                    document.getElementById('page1').classList.add('checked-element');
                    document.getElementById('curPage').innerHTML = prevPage - VISUAL_BTNS;
                    this.createNextPage(prevPage - 1);
                }
            }
        };
        document.getElementById('nextBtn').onclick = () => {
            if (!document.getElementById('nextBtn').classList.contains('lock-element')) {
                const nextPage = +document.getElementById('page5').dataset.page;
                if (nextPage < this.allPages) {
                    const buttons = document.getElementById('pages').children;
                    Array.from(buttons).forEach((item) => {
                        item.classList.remove('checked-element');
                        item.dataset.page = +item.dataset.page + 1;
                        item.innerHTML = item.dataset.page;
                    });
                    document.getElementById('page5').classList.add('checked-element');
                    document.getElementById('curPage').innerHTML = nextPage + 1;
                    this.createNextPage(nextPage + 1);
                }
            }
        };
        document.getElementById('firstBtn').onclick = () => {
            if (!document.getElementById('firstBtn').classList.contains('lock-element')) {
                const buttons = document.getElementById('pages').children;
                Array.from(buttons).forEach((item, index) => {
                    item.classList.remove('checked-element');
                    item.dataset.page = index + 1;
                    item.innerHTML = item.dataset.page;
                });
                document.getElementById('page1').classList.add('checked-element');
                document.getElementById('curPage').innerHTML = '1';
                this.createNextPage(1);
            }
        };
        document.getElementById('lastBtn').onclick = () => {
            if (!document.getElementById('lastBtn').classList.contains('lock-element')) {
                const buttons = document.getElementById('pages').children;
                Array.from(buttons).forEach((item, index) => {
                    item.classList.remove('checked-element');
                    item.dataset.page = this.allPages - buttons.length + index + 1;
                    item.innerHTML = item.dataset.page;
                });
                document.getElementById('page5').classList.add('checked-element');
                document.getElementById('curPage').innerHTML = this.allPages;
                this.createNextPage(this.allPages);
            }
        };
        document.getElementById('pages').onclick = (e) => {
            if (e.target.tagName === 'BUTTON') {
                const buttons = document.getElementById('pages').children;
                Array.from(buttons).forEach((item) => {
                    item.classList.remove('checked-element');
                });
                e.target.classList.add('checked-element');
                document.getElementById('curPage').innerHTML = e.target.dataset.page;
                this.createNextPage(e.target.dataset.page);
            }
        };
        document.getElementById('selectPages').onchange = () => {
            this.wordsInPage = +document.getElementById('selectPages').value;
            this.allPages = Math.ceil(this.allWords / this.wordsInPage);
            this.createNextPage(1);
            this.createPagination();
        };
        document.getElementById('settings').onchange = (e) => {
            if (e.target.tagName === 'INPUT') {
                this.getSettings();
                localStorage.setItem('settings', JSON.stringify(this.settings));
            }
        };
    }

    getWord(index) {
        const word = document.createElement('div');
        word.className = 'list__word';
        const wordItem = document.createElement('span');
        wordItem.innerHTML = this.allStudyWords[index].word;
        wordItem.className = 'list__word-item';
        word.append(wordItem);
        if (this.settings.dictTranscription) {
            const transcription = document.createElement('span');
            transcription.innerHTML = this.allStudyWords[index].transcription;
            transcription.className = 'list__word-transcription';
            word.append(transcription);
        }
        if (this.settings.dictSound) {
            const wordSound = document.createElement('button');
            wordSound.className = 'list__sound';
            wordSound.setAttribute('data-src', this.allStudyWords[index].audio);
            word.append(wordSound);
        }
        return word;
    }

    getTranslate(index) {
        const translate = document.createElement('div');
        translate.className = 'list__translate';
        const translateItem = document.createElement('span');
        translateItem.innerHTML = this.allStudyWords[index].translate;
        translateItem.className = 'list__translate-item';
        translate.append(translateItem);

        if (this.settings.dictImage) {
            const translateImg = document.createElement('img');
            translateImg.className = 'list__translate-img';
            translateImg.src = this.allStudyWords[index].image;
            translateImg.setAttribute('alt', '');
            translate.append(translateImg);
        }
        return translate;
    }

    getMeaning(index) {
        const meaning = document.createElement('div');
        meaning.className = 'list__meaning';
        const meaningItem = document.createElement('span');
        meaningItem.className = 'list__meaning-item';
        meaningItem.innerHTML = this.allStudyWords[index].textMeaning;
        meaning.append(meaningItem);
        if (this.settings.dictSound) {
            const meaningSound = document.createElement('button');
            meaningSound.className = 'list__sound';
            meaningSound.setAttribute('data-src', this.allStudyWords[index].audioMeaning);
            meaning.append(meaningSound);
        }
        return meaning;
    }

    getExample(index) {
        const example = document.createElement('div');
        example.className = 'list__example';
        const exampleItem = document.createElement('span');
        exampleItem.className = 'list__example-item';
        exampleItem.innerHTML = this.allStudyWords[index].textExample;
        example.append(exampleItem);
        if (this.settings.dictSound) {
            const exampleSound = document.createElement('button');
            exampleSound.className = 'list__sound';
            exampleSound.setAttribute('data-set', this.allStudyWords[index].audioExample);
            example.append(exampleSound);
        }
        return example;
    }

    getTime(index) {
        const time = document.createElement('div');
        time.className = 'list__time';
        const last = document.createElement('span');
        last.className = 'list__time-last';
        last.innerHTML = 'Last Time:';
        const lastDate = document.createElement('span');
        lastDate.className = 'list__time-date';
        lastDate.innerHTML = new Date(this.allStudyWords[index].lastTime).toJSON().slice(0, 16).replace('T', ' ');
        const next = document.createElement('span');
        next.className = 'list__time-next';
        next.innerHTML = 'Next Time:';
        const nextDate = document.createElement('span');
        nextDate.className = 'list__time-date';
        nextDate.innerHTML = new Date(this.allStudyWords[index].nextTime).toJSON().slice(0, 16).replace('T', ' ');
        time.append(last);
        time.append(lastDate);
        time.append(next);
        time.append(nextDate);
        return time;
    }

    getRating(index) {
        const rating = document.createElement('div');
        rating.className = 'list__rating';
        if (this.settings.dictRepeat) {
            const repeat = document.createElement('span');
            repeat.className = 'list__rating-discript';
            repeat.innerHTML = 'Repeat:';
            const count = document.createElement('span');
            count.className = 'list__rating-count';
            count.innerHTML = this.allStudyWords[index].count;
            rating.append(repeat);
            rating.append(count);
        }
        if (this.settings.dictRating) {
            const discript = document.createElement('span');
            discript.className = 'list__rating-discript';
            discript.innerHTML = 'Rating:';
            const visual = document.createElement('div');
            visual.className = 'list__rating-visual';
            const COUNT_RATING = 5;
            const wordRating = this.allStudyWords[index].rating;
            for (let s = 1; s <= COUNT_RATING; s += 1) {
                const span = document.createElement('span');
                span.className = `list__rating-color${wordRating}`;
                if (s > wordRating) span.classList.add('list__rating-bg');
                visual.append(span);
            }
            rating.append(discript);
            rating.append(visual);
        }
        return rating;
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
}
