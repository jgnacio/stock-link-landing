import { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TextWidthMedia: Block = {
  slug: 'textWidthMedia',
  interfaceName: 'textWidthMedia',
  labels: {
    singular: 'Texto con Imagen',
    plural: 'Textos con Imágenes',
  },
  fields: [
    {
      name: 'spacing',
      type: 'group',
      label: 'Espaciado',
      fields: [
        {
          name: 'verticalOffset',
          type: 'number',
          label: 'Desplazamiento hacia arriba (px)',
          defaultValue: 16,
          min: 0,
          max: 100,
          admin: {
            description:
              'Controla cuánto se desplaza el bloque hacia arriba usando posicionamiento relativo',
          },
        },
        {
          name: 'paddingTop',
          type: 'number',
          label: 'Espacio superior interno (px)',
          defaultValue: 16,
          min: 0,
          max: 100,
          admin: {
            description: 'Espacio interno superior del contenido',
          },
        },
        {
          name: 'verticalPadding',
          type: 'group',
          label: 'Espaciado vertical interno',
          fields: [
            {
              name: 'mobile',
              type: 'number',
              label: 'Móvil (px)',
              defaultValue: 6,
              min: 0,
              max: 100,
              admin: {
                description: 'Espaciado vertical en dispositivos móviles',
              },
            },
            {
              name: 'tablet',
              type: 'number',
              label: 'Tablet (px)',
              defaultValue: 12,
              min: 0,
              max: 100,
              admin: {
                description: 'Espaciado vertical en tablets',
              },
            },
            {
              name: 'desktop',
              type: 'number',
              label: 'Desktop (px)',
              defaultValue: 16,
              min: 0,
              max: 100,
              admin: {
                description: 'Espaciado vertical en desktop',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'text',
      type: 'richText',
      label: 'Texto',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen',
      required: true,
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Diseño',
      options: [
        {
          label: 'Imagen a la derecha',
          value: 'right',
        },
        {
          label: 'Imagen a la izquierda',
          value: 'left',
        },
      ],
      defaultValue: 'right',
    },
    {
      name: 'darkMode',
      type: 'group',
      label: 'Modo Oscuro',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Habilitar modo oscuro',
          defaultValue: false,
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Color de fondo (hex)',
          defaultValue: '#1a1a1a',
          admin: {
            description: 'Ingresa un color en formato hexadecimal (ej: #1a1a1a)',
            condition: (data, siblingData) => siblingData?.enabled === true,
          },
        },
        {
          name: 'textColor',
          type: 'text',
          label: 'Color del texto (hex)',
          defaultValue: '#ffffff',
          admin: {
            description: 'Ingresa un color en formato hexadecimal (ej: #ffffff)',
            condition: (data, siblingData) => siblingData?.enabled === true,
          },
        },
      ],
    },
    {
      name: 'mediaEffects',
      type: 'group',
      label: 'Efectos de Media',
      fields: [
        {
          name: 'shadow',
          type: 'checkbox',
          label: 'Sombra',
          defaultValue: false,
        },
        {
          name: 'floatingTriangles',
          type: 'checkbox',
          label: 'Efecto 3D con triángulos flotantes',
          defaultValue: false,
        },
        {
          name: 'hover',
          type: 'checkbox',
          label: 'Efecto de hover',
          defaultValue: false,
        },
        {
          name: 'hoverEffect',
          type: 'group',
          label: 'Configuración de Hover',
          fields: [
            {
              name: 'rotation',
              type: 'checkbox',
              label: 'Rotación',
              defaultValue: false,
            },
            {
              name: 'glow',
              type: 'checkbox',
              label: 'Brillo',
              defaultValue: false,
            },
            {
              name: 'gradient',
              type: 'checkbox',
              label: 'Gradiente',
              defaultValue: false,
            },
            {
              name: 'rotationAngle',
              type: 'number',
              label: 'Ángulo de rotación (grados)',
              defaultValue: 5,
              min: 1,
              max: 20,
              admin: {
                condition: (data, siblingData) => siblingData?.rotation === true,
              },
            },
            {
              name: 'gradientColor',
              type: 'text',
              label: 'Color del gradiente (hex)',
              defaultValue: '#000000',
              admin: {
                description: 'Ingresa un color en formato hexadecimal (ej: #000000)',
                condition: (data, siblingData) => siblingData?.gradient === true,
              },
            },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.hover === true,
          },
        },
      ],
    },
    {
      name: 'showOnScroll',
      type: 'checkbox',
      label: 'Mostrar imagen al hacer scroll',
      defaultValue: false,
    },
    {
      name: 'textAnimation',
      type: 'group',
      label: 'Animación del Texto',
      fields: [
        {
          name: 'animateOnScroll',
          type: 'checkbox',
          label: 'Animar texto al hacer scroll',
          defaultValue: false,
        },
        {
          name: 'animationType',
          type: 'select',
          label: 'Tipo de Animación',
          options: [
            {
              label: 'Stagger por letra',
              value: 'letterStagger',
            },
            {
              label: 'Stagger por palabra',
              value: 'wordStagger',
            },
          ],
          defaultValue: 'letterStagger',
          admin: {
            condition: (data, siblingData) => siblingData?.animateOnScroll === true,
          },
        },
        {
          name: 'animationDuration',
          type: 'number',
          label: 'Duración de la animación (segundos)',
          defaultValue: 1,
          min: 0.1,
          max: 5,
          admin: {
            condition: (data, siblingData) => siblingData?.animateOnScroll === true,
          },
        },
      ],
    },
  ],
}
