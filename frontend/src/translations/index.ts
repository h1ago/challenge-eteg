import i18n from 'i18next';
import * as ptBR from './pt-BR.json';

const resources = {
  'pt-BR': { translation: ptBR },
};

i18n.init({
  resources,
  fallbackLng: 'pt-BR',
  keySeparator: '.',
});

export default i18n;
