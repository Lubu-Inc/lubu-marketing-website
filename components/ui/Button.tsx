'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-text-light hover:bg-accent-warm border border-accent hover:border-accent-warm',
  outline:
    'bg-transparent text-accent border border-accent hover:bg-accent hover:text-text-light',
  ghost:
    'bg-transparent text-text-muted hover:text-text-light border border-transparent',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-body-sm',
  md: 'px-6 py-3 text-body-base',
  lg: 'px-8 py-4 text-body-lg',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[
          'inline-flex items-center justify-center font-medium rounded-sm',
          'transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(' ')}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
