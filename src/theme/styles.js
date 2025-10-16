import {vh, vw} from './units';

export const header = {
  authHeight: vh * 18,
};

export const spacing = {
  xxsmall: vh * 0.2,
  xsmall: vh * 0.5,
  small: vh * 1,
  medium: vh * 2,
  large: vh * 2.8,
  xlarge: vh * 4,
  xxlarge: vh * 6,
  xxxlarge: vh * 30,
  xxxxlarge: vh * 33,
  xsmallh: vw * 0.5,
  smallh: vw * 1,
  mediumh: vw * 2.6,
  largeh: vw * 3,
  xlargeh: vw * 4,
  h3: vw * 20,
  h2: vw * 25,
  h1: vw * 30,
};

export const font = {
  xxxxsmall: vh * 0.8,
  xxxsmall: vh * 1,
  xxsmall: vh * 1.2,
  xsmall: vh * 1.4,
  small: vh * 1.6,
  medium: vh * 1.8,
  large: vh * 2,
  xlarge: vh * 2.25,
  xxlarge: vh * 2.7,
  xxxlarge: vh * 3,
  h6: vh * 3.2,
  h5: vh * 3.5,
  h4: vh * 3.8,
};

export const layout = {
  contentWidth: vw * 92,
  flex: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderRadius: vh * 5.25,
};

export const weight = {
  xxsmall: '100',
  xsmall: '200',
  small: '300',
  medium: '700',
  xlarge: '800',
  xxlarge: '900',
};

export default {
  layout,
  spacing,
  font,
  header,
  weight,
};
