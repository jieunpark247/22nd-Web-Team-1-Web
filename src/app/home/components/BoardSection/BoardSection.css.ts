import { style } from '@vanilla-extract/css';
import { themeTokens } from '@/styles/theme.css';
import { sizeProp } from '@/utils/sizeProp';

const { color, space } = themeTokens;

export const section = style({
  background: color.grey50,
  width: '100%',
  padding: `${sizeProp('56px')} 0`, // 56px
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const title = style({
  marginBottom: space['5xl'],
});

export const listGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: space['2xl'],
});
