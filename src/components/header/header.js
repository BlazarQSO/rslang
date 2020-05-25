import Statistics from '../statistics/statistics';
// import main from '../main/main';

function eventNav(e) {
    if (e.target.tagName === 'LI') {
        const mainPage = document.getElementById('main');
        if (e.target.id === 'liMain' && !e.target.classList.contains('decoration')) {
            document.getElementById('statistics').classList.remove('show');
            // main();
        } else if (e.target.id === 'liStatistics') {
            mainPage.innerHTML = '';
            new Statistics().create();
            document.getElementById('statistics').classList.add('show');
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
