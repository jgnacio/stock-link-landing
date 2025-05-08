'use client'

import React, { createContext } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'
import { defaultTheme, getImplicitPreference, themeLocalStorageKey } from './shared'
import { themeIsValid } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: 'dark',
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeContext value={initialContext}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => {
  // Implementation of useTheme function
  throw new Error('useTheme function not implemented')
}
