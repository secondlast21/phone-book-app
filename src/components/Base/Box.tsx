import styled, { CSSObject } from '@emotion/styled'
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  fontSize,
  FontSizeProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  width,
  WidthProps,
} from 'styled-system'

export default function as<T extends keyof JSX.IntrinsicElements>(tag: T) {
  return styled(tag)<BaseProps<T>>`
    ${space}
    ${width}
      ${fontSize}
      ${color}
      ${flexbox}
      ${layout}
      ${typography}
      ${grid}
      ${background}
      ${border}
      ${position}
      ${shadow}

      ${({ css }) => css}
  `
}

type StyledSystemProps = SpaceProps &
  WidthProps &
  FontSizeProps &
  ColorProps &
  FlexboxProps &
  LayoutProps &
  TypographyProps &
  GridProps &
  BackgroundProps &
  BorderProps &
  PositionProps &
  ShadowProps

export type BaseProps<T extends keyof JSX.IntrinsicElements> = Omit<StyledSystemProps, 'children'> & {
  css?: CSSObject & { children?: React.ReactNode }
} & JSX.IntrinsicElements[T]

type BoxProps = BaseProps<'div'> & JSX.IntrinsicElements['div'] & { cursor?: string }

export const Box = styled(as('div'))<BoxProps>`
  cursor: ${({ cursor }) => cursor || 'default'};
`
