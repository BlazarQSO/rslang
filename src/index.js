import './style/style.scss';
import header from './components/header/header';

window.addEventListener('load', () => {
    header();
    const nav = document.getElementById('nav');
    document.getElementById('liMain').classList.add('decoration');

    document.body.addEventListener('click', (e) => {
        if (nav.classList.length > 1 && !(e.target.tagName === 'NAV' || !e.target.tagName === 'LI')) {
            nav.classList.remove('nav__show');
        }
    });
});
