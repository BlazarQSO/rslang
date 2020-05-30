export default class Dictionary {
    constructor() {
        this.allStudyWords = [];
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
            const word = document.createElement('div');
            word.className = 'list__word';
            const wordItem = document.createElement('span');
            wordItem.innerHTML = this.allStudyWords[i].word;
            wordItem.className = 'list__word-item';
            const transcription = document.createElement('span');
            transcription.innerHTML = this.allStudyWords[i].transcription;
            transcription.className = 'list__word-transcription';
            const wordSound = document.createElement('button');
            wordSound.className = 'list__sound';
            wordSound.setAttribute('data-src', this.allStudyWords[i].audio);
            word.append(wordItem);
            word.append(transcription);
            word.append(wordSound);

            const translate = document.createElement('div');
            translate.className = 'list__translate';
            const translateItem = document.createElement('span');
            // translateItem.innerHTML = this.allStudyWords[i].translate;
            translateItem.className = 'list__translate-item';
            const translateImg = document.createElement('img');
            translateImg.className = 'list__translate-img';
            translateImg.src = this.allStudyWords[i].image;
            translateImg.setAttribute('alt', '');
            translate.append(translateItem);
            translate.append(translateImg);

            const meaning = document.createElement('div');
            meaning.className = 'list__meaning';
            const meaningItem = document.createElement('span');
            meaningItem.className = 'list__meaning-item';
            meaningItem.innerHTML = this.allStudyWords[i].textMeaning;
            const meaningSound = document.createElement('button');
            meaningSound.className = 'list__sound';
            meaningSound.setAttribute('data-src', this.allStudyWords[i].audioMeaning);
            meaning.append(meaningItem);
            meaning.append(meaningSound);

            const example = document.createElement('div');
            example.className = 'list__example';
            const exampleItem = document.createElement('span');
            exampleItem.className = 'list__example-item';
            exampleItem.innerHTML = this.allStudyWords[i].textExample;
            const exampleSound = document.createElement('button');
            exampleSound.className = 'list__sound';
            exampleSound.setAttribute('data-set', this.allStudyWords[i].audioExample);
            example.append(exampleItem);
            example.append(exampleSound);

            const time = document.createElement('div');
            time.className = 'list__time';
            const last = document.createElement('span');
            last.className = 'list__time-last';
            last.innerHTML = 'Last Time:';
            const lastDate = document.createElement('span');
            lastDate.className = 'list__time-date';
            lastDate.innerHTML = new Date(this.allStudyWords[i].lastTime).toJSON().slice(0, 16).replace('T', ' ');
            const next = document.createElement('span');
            next.className = 'list__time-next';
            next.innerHTML = 'Next Time:';
            const nextDate = document.createElement('span');
            nextDate.className = 'list__time-date';
            nextDate.innerHTML = new Date(this.allStudyWords[i].nextTime).toJSON().slice(0, 16).replace('T', ' ');
            time.append(last);
            time.append(lastDate);
            time.append(next);
            time.append(nextDate);

            const rating = document.createElement('div');
            rating.className = 'list__rating';
            const repeat = document.createElement('span');
            repeat.className = 'list__rating-discript';
            repeat.innerHTML = 'Repeat:';
            const count = document.createElement('span');
            count.className = 'list__rating-count';
            count.innerHTML = this.allStudyWords[i].count;
            const discript = document.createElement('span');
            discript.className = 'list__rating-discript';
            discript.innerHTML = 'Rating:';
            const visual = document.createElement('div');
            visual.className = 'list__rating-visual';
            const COUNT_RATING = 5;
            const wordRating = this.allStudyWords[i].rating;
            for (let s = 1; s <= COUNT_RATING; s += 1) {
                const span = document.createElement('span');
                span.className = `list__rating-color${wordRating}`;
                if (s > wordRating) span.classList.add('list__rating-bg');
                visual.append(span);
            }
            rating.append(repeat);
            rating.append(count);
            rating.append(discript);
            rating.append(visual);
            rating.append(wordRating);

            li.append(word);
            li.append(translate);
            li.append(meaning);
            li.append(example);
            li.append(time);
            li.append(rating);
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
    }
}
