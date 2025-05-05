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
      name: 'imageEffect',
      type: 'select',
      label: 'Efecto de Imagen',
      options: [
        {
          label: 'Sin efecto',
          value: 'none',
        },
        {
          label: 'Efecto 3D con triángulos flotantes',
          value: 'floatingTriangles',
        },
      ],
      defaultValue: 'none',
    },
    {
      name: 'showOnScroll',
      type: 'checkbox',
      label: 'Mostrar imagen al hacer scroll',
      defaultValue: false,
    },
  ],
}
