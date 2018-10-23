import React from 'react';
import { loadGetInitialProps } from 'next/dist/lib/utils';
import { I18nextProvider } from 'react-i18next';
import startI18n, { getTranslation } from '../util/i18n';
import config from '../common/config';

// TODO - make dynamic
const lang = 'en';

export default ComposedComponent => class withLocale extends React.Component {
  constructor(props) {
    super(props);
    this.i18n = startI18n(props.translations, lang);
  }
  static async getInitialProps(ctx) {
    const translations = await getTranslation(
      lang,
      ['common'],
      config.app.locales_url,
    );
    return {
      translations,
      ...await loadGetInitialProps(ComposedComponent, ctx),
    };
  }

  render() {
    return (
      <I18nextProvider i18n={this.i18n}>
        <ComposedComponent {...this.props} />
      </I18nextProvider>
    );
  }
};
