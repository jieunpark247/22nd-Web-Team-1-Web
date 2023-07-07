import { themeTokens } from '@/styles/theme.css';
import { style, globalStyle } from '@vanilla-extract/css';
import { fontVariant } from '@/styles/variant.css';
import { recipe } from '@vanilla-extract/recipes';
const { color, zIndices } = themeTokens;

export const titleWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
});
globalStyle(`${titleWrapper} > div`, {
  ...fontVariant.title3,
  color: color.secondary,
});
globalStyle(`${titleWrapper} > button`, {
  marginRight: '-4px',
});
export const background = recipe({
  base: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    bottom: '0',
    background: color.black,
    opacity: '0.3',
    zIndex: zIndices.overlay,
  },
  variants: {
    open: {
      true: {},
      false: {
        display: 'none',
      },
    },
  },
  defaultVariants: {
    open: false,
  },
});
export const wrap = recipe({
  base: {
    position: 'fixed',
    display: 'flex',
    bottom: '0',
    width: '100%',
    background: color.white,
    zIndex: zIndices.modal,
    padding: '20px',
    borderRadius: '14px 14px 0px 0px',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  variants: {
    open: {
      true: {
        transform: 'translate3d(0, 0, 0)',
        transition: 'all 300ms',
      },
      false: {
        transform: 'translate3d(0, 100%, 0)',
        transition: 'all 300ms',
      },
    },
  },
  defaultVariants: {
    open: false,
  },
});
