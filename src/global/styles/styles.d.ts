/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';
import theme from './geb';

declare module 'styled-components' {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType { }
}
