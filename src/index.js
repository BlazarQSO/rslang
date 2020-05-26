import './style/style.scss';
import header from './components/header/header';
import Main from './components/main/main';

window.addEventListener('load', () => {
    header();
    const main = new Main();
    main.createCard();
    if (main.checkCreateList) main.createList();

    document.body.addEventListener('click', (e) => {
        const nav = document.getElementById('nav');
        if (nav.classList.length > 1 && !(e.target.tagName === 'NAV' || !e.target.tagName === 'LI')) {
            nav.classList.remove('nav__show');
        }
    });

    document.getElementById('liMain').classList.add('decoration');
    // document.getElementById('start').addEventListener('click', () => {
    //     document.getElementById('startPage').classList.add('hide');
    //     document.getElementById('header').classList.remove('hide');
    //     document.getElementById('settings').classList.remove('hide');
    //     document.getElementById('footer').classList.remove('hide');
    //     document.getElementById('main').classList.remove('hide');
    //     document.getElementById('liMain').classList.add('decoration');
    //     header();
    // });
});
