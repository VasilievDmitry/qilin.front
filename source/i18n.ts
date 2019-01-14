import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const locale = (window.localStorage.lang || window.navigator.language).split('-')[0];

const i18n = new VueI18n({
    locale,
    fallbackLocale: 'en',
});

export default i18n;

if (module.hot) {
    module.hot.accept([], () => {
        i18n.setLocaleMessage('en', require('./locale/en.json').default);
        i18n.setLocaleMessage('ru', require('./locale/ru.json').default);
    });
}
