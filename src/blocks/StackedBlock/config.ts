import { Block } from 'payload'
import { Content } from '../Content/config'
import { MediaBlock } from '../MediaBlock/config'
import { CallToAction } from '../CallToAction/config'
import { Banner } from '../Banner/config'
import { TextWidthMedia } from '../TextWidthMedia/config'
import { UnicornStudioBlock } from '../RenderUnicornStudio/config'
export const StackedBlock: Block = {
  slug: 'stackedBlock',
  interfaceName: 'stackedBlock',
  labels: {
    singular: 'Bloque Apilado',
    plural: 'Bloques Apilados',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Elementos Apilados',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'content',
          type: 'blocks',
          label: 'Contenido',
          blocks: [Content, MediaBlock, CallToAction, Banner, TextWidthMedia, UnicornStudioBlock],
        },
        {
          name: 'zIndex',
          type: 'number',
          label: 'Nivel de Apilamiento (z-index)',
          required: true,
          defaultValue: 0,
          min: 0,
          max: 100,
          admin: {
            description: 'Controla el orden de apilamiento de los elementos (0-100)',
          },
        },
      ],
    },
  ],
}
