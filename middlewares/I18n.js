import Gettext from 'node-gettext';
import { readFileSync } from 'fs';
import { join } from 'path';

export default class I18n {
  isInit = false;
  gettext = null;

  constructor({
    locales = ['en_EN'],
    defaultLanguage = 'en_EN',
    path = null,
  }) {
    this.locales = locales;
    this.defaultLanguage = defaultLanguage;
    this.path = path;

    // global.__ is here to let gettext parse the string to put them on .po file
    global.__ = string => string;

    this.gettext = new Gettext();
    this.gettext.setTextDomain(this.defaultLanguage);
    this.locales.forEach((locale) => {
      try {
        const file = readFileSync(join(this.path, `${locale}.po`));
        this.gettext.addTranslations(locale, file);
      } catch (err) {
        console.error(`[ERROR:I18n] can not find file ${locale}.po`);
      }
    });

  }
  get middleware() {
    return async (ctx, next) => {
      let locale = ctx.get('Accept-Language') || this.defaultLanguage;
      if (!this.locales.includes(locale)) {
        locale = this.defaultLanguage;
      }
      ctx.__ = ctx.state.__ = string => this.gettext.dgettext(locale, string);
      await next();
    }
  }
}
