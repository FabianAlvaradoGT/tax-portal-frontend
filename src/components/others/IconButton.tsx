import type { Theme } from '@mui/material/styles'
import type { LoadingButtonProps } from '@mui/lab'
import type { ChipProps, ButtonProps, SliderProps, IconButtonProps } from '@mui/material'

import { alpha, styled, useTheme } from '@mui/material/styles'

export type ButtonVariantProps = 'contained' | 'light' | 'outlined' | 'dashed' | 'text' | 'shadow'
export type IconButtonShapeProps = 'rounded' | 'square'
export type ColorProps =
  | ChipProps['color']
  | ButtonProps['color']
  | LoadingButtonProps['color']
  | IconButtonProps['color']
  | SliderProps['color']
export type AvatarTypeProps = 'filled' | 'outlined' | 'combined'
export type SizeProps = 'badge' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ExtendedStyleProps = {
  color: ColorProps
  theme: Theme
}

const getColors = (theme: Theme, color?: ColorProps) => {
  switch (color!) {
    case 'secondary':
      return theme.palette.secondary
    case 'error':
      return theme.palette.error
    case 'warning':
      return theme.palette.warning
    case 'info':
      return theme.palette.info
    case 'success':
      return theme.palette.success
    default:
      return theme.palette.primary
  }
}

import type { Ref, ReactNode, ReactChild, ReactPortal, ReactFragment } from 'react'

import { forwardRef } from 'react'

import MuiIconButton from '@mui/material/IconButton'

const getShadow = (theme: Theme, shadow: string) => {
  switch (shadow) {
    case 'secondary':
      return theme.customShadows.secondary
    case 'error':
      return theme.customShadows.error
    case 'warning':
      return theme.customShadows.warning
    case 'info':
      return theme.customShadows.info
    case 'success':
      return theme.customShadows.success
    case 'primaryButton':
      return theme.customShadows.primary
    case 'secondaryButton':
      return theme.customShadows.secondary
    case 'errorButton':
      return theme.customShadows.error
    case 'warningButton':
      return theme.customShadows.warning
    case 'infoButton':
      return theme.customShadows.info
    case 'successButton':
      return theme.customShadows.success
    default:
      return theme.customShadows.primary
  }
}

interface IconButtonStyleProps extends ExtendedStyleProps {
  variant?: ButtonVariantProps
}

function getColorStyle({ variant, theme, color }: IconButtonStyleProps) {
  const colors = getColors(theme, color)
  const { light, dark, main, contrastText } = colors

  const buttonShadow = `${color}Button`
  const shadows = getShadow(theme, buttonShadow)

  const commonShadow = {
    '&::after': {
      boxShadow: `0 0 6px 6px ${alpha(main, 0.9)}`,
    },
    '&:active::after': {
      boxShadow: `0 0 0 0 ${alpha(main, 0.9)}`,
    },
    '&:focus-visible': {
      outline: `2px solid ${dark}`,
      outlineOffset: 2,
    },
  }

  switch (variant) {
    case 'contained':
      return {
        color: contrastText,
        backgroundColor: main,
        '&:hover': {
          backgroundColor: dark,
        },
        ...commonShadow,
      }
    case 'light':
      return {
        color: main,
        backgroundColor: light,
        '&:hover': {
          backgroundColor: light,
        },
        ...commonShadow,
      }
    case 'shadow':
      return {
        boxShadow: shadows,
        color: contrastText,
        backgroundColor: main,
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: dark,
        },
        ...commonShadow,
      }
    case 'outlined':
      return {
        '&:hover': {
          backgroundColor: 'transparent',
          color: dark,
          borderColor: dark,
        },
        ...commonShadow,
      }
    case 'dashed':
      return {
        backgroundColor: light,
        '&:hover': {
          color: dark,
          borderColor: dark,
        },
        ...commonShadow,
      }
    case 'text':
    default:
      return {
        '&:hover': {
          color: dark,
          backgroundColor: light,
        },
        ...commonShadow,
      }
  }
}

interface StyleProps extends IconButtonStyleProps {
  shape?: IconButtonShapeProps
}

const IconButtonStyle = styled(MuiIconButton, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'shape',
})(({ theme, variant, shape, color }: StyleProps) => ({
  position: 'relative',
  '::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: shape === 'rounded' ? '50%' : 4,
    opacity: 0,
    transition: 'all 0.5s',
  },

  ':active::after': {
    position: 'absolute',
    borderRadius: shape === 'rounded' ? '50%' : 4,
    left: 0,
    top: 0,
    opacity: 1,
    transition: '0s',
  },
  ...(shape === 'rounded' && {
    borderRadius: '50%',
  }),
  ...(variant === 'outlined' && {
    border: '1px solid',
    borderColor: 'inherit',
  }),
  ...(variant === 'dashed' && {
    border: '1px dashed',
    borderColor: 'inherit',
  }),
  ...(variant !== 'text' && {
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[200],
    },
  }),
  ...getColorStyle({ variant, theme, color }),
}))

export interface Props extends IconButtonProps {
  shape?: IconButtonShapeProps
  variant?: ButtonVariantProps
  children: ReactNode
  tooltip?: boolean | ReactChild | ReactFragment | ReactPortal
}

const IconButton = forwardRef(
  (
    { variant = 'text', shape = 'square', children, color = 'primary', tooltip, ...others }: Props,
    ref: Ref<HTMLButtonElement>
  ) => {
    const theme = useTheme()

    return (
      <IconButtonStyle
        ref={ref}
        disableRipple
        variant={variant}
        shape={shape}
        theme={theme}
        color={color}
        {...others}
      >
        {children}
      </IconButtonStyle>
    )
  }
)

IconButton.displayName = 'IconButton'

export default IconButton
