import Statistics from '../statistics/statistics';
import Main from '../main/main';
import Dictionary from '../dictionary/dictionary';

function eventNav(e) {
    if (e.target.tagName === 'LI') {
        const mainPage = document.getElementById('main');
        if (e.target.id === 'liMain' && !e.target.classList.contains('decoration')) {
            document.getElementById('statistics').classList.remove('show');
            mainPage.classList.remove('hide');
            (new Main()).createCard();
        } else if (e.target.id === 'liStatistics') {
            // mainPage.innerHTML = '';
            mainPage.classList.add('hide');
            new Statistics().create();
            document.getElementById('statistics').classList.add('show');
        } if (e.target.id === 'liDictionary') {
            mainPage.classList.add('hide');
            document.getElementById('dictionary').classList.add('show');
            new Dictionary().create();
        }

        const list = document.getElementById('list');
        Array.from(list.children).forEach((el) => el.classList.remove('decoration'));
        e.target.classList.add('decoration');
        document.getElementById('nav').classList.toggle('nav__show');
    }
}

export default function header() {
    const btn = document.getElementById('btn');
    btn.addEventListener('click', (e) => {
        btn.classList.toggle('header__click');
        document.getElementById('nav').classList.toggle('nav__show');
        e.stopPropagation();
    });

    const nav = document.getElementById('nav');
    nav.addEventListener('click', eventNav);
}
