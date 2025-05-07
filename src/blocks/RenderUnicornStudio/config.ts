import type { Block } from 'payload'

export interface UnicornStudioConfig {
  projectId: string
  scale: number
  dpi: number
  lazyLoad: boolean
  production: boolean
  altText: string
  ariaLabel: string
  disableMobile: boolean
}

export const defaultConfig: Omit<UnicornStudioConfig, 'projectId'> = {
  scale: 1,
  dpi: 1.5,
  lazyLoad: true,
  production: true,
  altText: 'Bienvenido a Unicorn Studio',
  ariaLabel: 'Esta es una escena de canvas',
  disableMobile: false,
}

export const UnicornStudioBlock: Block = {
  slug: 'unicornStudio',
  labels: {
    singular: 'Unicorn Studio',
    plural: 'Unicorn Studios',
  },
  fields: [
    {
      name: 'projectId',
      type: 'text',
      required: true,
      label: 'ID del Proyecto',
    },
    {
      name: 'scale',
      type: 'number',
      label: 'Escala',
      defaultValue: defaultConfig.scale,
    },
    {
      name: 'dpi',
      type: 'number',
      label: 'DPI',
      defaultValue: defaultConfig.dpi,
    },
    {
      name: 'lazyLoad',
      type: 'checkbox',
      label: 'Carga Diferida',
      defaultValue: defaultConfig.lazyLoad,
    },
    {
      name: 'production',
      type: 'checkbox',
      label: 'Modo Producción',
      defaultValue: defaultConfig.production,
    },
    {
      name: 'altText',
      type: 'text',
      label: 'Texto Alternativo',
      defaultValue: defaultConfig.altText,
    },
    {
      name: 'ariaLabel',
      type: 'text',
      label: 'Etiqueta ARIA',
      defaultValue: defaultConfig.ariaLabel,
    },
    {
      name: 'disableMobile',
      type: 'checkbox',
      label: 'Deshabilitar en Móvil',
      defaultValue: defaultConfig.disableMobile,
    },
  ],
}
