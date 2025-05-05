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
              label: 'Color del gradiente',
              defaultValue: '#000000',
              admin: {
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
