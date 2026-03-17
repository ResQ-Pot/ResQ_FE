// eslint-disable-next-line @typescript-eslint/no-require-imports
const raw = require('./tokens.js') as { colors: Tokens['colors'] };

export interface Tokens {
  colors: {
    green: Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;
    status: Record<'safe' | 'warning' | 'danger', string>;
    gray: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13, string>;
  };
}

export const colors = raw.colors;
