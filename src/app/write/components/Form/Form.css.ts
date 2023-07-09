import { style } from '@vanilla-extract/css';
import { screenMQ, themeTokens } from '@/styles/theme.css';

const { space } = themeTokens;
export const formWrapper = style({
  width: '100%',
  display: 'grid',
  gridAutoFlow: 'row',
  gap: '3.5rem',
});

export const sectionGap = style({
  display: 'grid',
  gridAutoFlow: 'row',
  gap: space.xl,
});

export const inputGap = style({
  width: 'inherit',
  display: 'grid',
  gridAutoFlow: 'row',
  gap: space.md,
});

export const submitButton = style({
  width: '100%',
  '@media': {
    [screenMQ.m]: {
      marginTop: space['5xl'],
    },
  },
});
