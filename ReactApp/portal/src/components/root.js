import React from 'react';
import { Provider } from 'react-redux';
import App from './App'
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

const Root = ({ store }) => (
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </Provider>

);

export default Root;

