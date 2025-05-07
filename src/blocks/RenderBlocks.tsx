import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { TextWidthMedia } from './TextWidthMedia/Component'
import UnicornScene from './RenderUnicornStudio/Component'
import type { UnicornStudioConfig } from './RenderUnicornStudio/config'
import StackedBlock from './StackedBlock/StackedBlock'
import MainBlockComponent from './MainBlockDeleteThisAfterProd/Component'
type BlockComponent = React.ComponentType<any>

const blockComponents: Record<string, BlockComponent> = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  textWidthMedia: TextWidthMedia,
  unicornStudio: UnicornScene,
  stackedBlock: StackedBlock,
  mainBlock: MainBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              if (blockType === 'unicornStudio') {
                const {
                  projectId,
                  scale,
                  dpi,
                  lazyLoad,
                  production,
                  altText,
                  ariaLabel,
                  disableMobile,
                } = block
                const unicornConfig: Pick<UnicornStudioConfig, 'projectId'> &
                  Partial<Omit<UnicornStudioConfig, 'projectId'>> = {
                  projectId,
                  ...(scale !== null && { scale }),
                  ...(dpi !== null && { dpi }),
                  ...(lazyLoad !== null && { lazyLoad }),
                  ...(production !== null && { production }),
                  ...(altText !== null && { altText }),
                  ...(ariaLabel !== null && { ariaLabel }),
                  ...(disableMobile !== null && { disableMobile }),
                }
                return (
                  <div key={index}>
                    <UnicornScene config={unicornConfig} />
                  </div>
                )
              }
              if (blockType === 'stackedBlock') {
                return (
                  <div key={index}>
                    <Block block={block} disableInnerContainer />
                  </div>
                )
              }
              return (
                <div key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
