export default class Statistics {
    constructor() {
        this.data = [];
    }

    create() {
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';
        const fragmentTable = new DocumentFragment();
        for (let i = 0, len = this.data.length; i < len; i += 1) {
            const row = document.createElement('tr');
            const tdCategory = document.createElement('td');
            tdCategory.setAttribute('data-col', 'Category:');
            const english = document.createElement('td');
            english.setAttribute('data-col', 'Word:');
            const russian = document.createElement('td');
            russian.setAttribute('data-col', 'Translate:');
            const train = document.createElement('td');
            train.setAttribute('data-col', 'Train:');
            const play = document.createElement('td');
            play.setAttribute('data-col', 'Play:');
            const count = document.createElement('td');
            count.setAttribute('data-col', 'Error:');
            const percent = document.createElement('td');
            percent.setAttribute('data-col', '%:');
            [
                tdCategory.innerHTML,
                english.innerHTML,
                russian.innerHTML,
                train.innerHTML,
                play.innerHTML,
                count.innerHTML,
                percent.innerHTML,
            ] = this.data[i];
            row.append(tdCategory);
            row.append(english);
            row.append(russian);
            row.append(train);
            row.append(play);
            row.append(count);
            row.append(percent);
            fragmentTable.append(row);
        }
        tbody.append(fragmentTable);
    }

    sortAlphabet(id, inverse) {
        this.parseStorage();
        if (inverse) {
            this.data.sort((a, b) => (a[id] > b[id] ? 1 : -1));
        } else {
            this.data.sort((a, b) => (a[id] < b[id] ? 1 : -1));
        }
        this.create(true);
    }

    sortNamber(id, inverse) {
        this.parseStorage();
        if (inverse) {
            this.data.sort((a, b) => b[id] - a[id]);
        } else {
            this.data.sort((a, b) => a[id] - b[id]);
        }
        this.create(true);
    }

    reset() {
        for (let i = 0; i < this.data.length; i += 1) {
            this.data[i][3] = 0;
            this.data[i][4] = 0;
            this.data[i][5] = 0;
            this.data[i][6] = 0;
            localStorage.removeItem(this.data[i][1]);
        }
        this.create();
    }
}

const statistics = new Statistics();

function eventStatistics(e) {
    try {
        if (e.target.tagName === 'TH') {
            const inverse = e.target.classList.contains('inverse-sort');
            if (e.target.id.slice(0, 3) === 'num') {
                document.getElementById(e.target.id).classList.toggle('inverse-sort');
                statistics.sortNamber(+e.target.id.replace('num', ''), inverse);
            } else {
                document.getElementById(e.target.id).classList.toggle('inverse-sort');
                statistics.sortAlphabet(+e.target.id.replace('alph', ''), inverse);
            }
            const headers = document.querySelectorAll('th');
            Array.from(headers).forEach((item) => {
                item.classList.remove('inverse-sort-click');
                if (item.id !== e.target.id) {
                    item.classList.remove('inverse-sort');
                }
            });
            document.getElementById(e.target.id).classList.add('inverse-sort-click');
        }
    } catch (error) {
        eventStatistics.errorMessage = error.message;
    }
}

document.getElementById('statistics').addEventListener('click', eventStatistics);
document.getElementById('reset').addEventListener('click', statistics.reset.bind(statistics));
