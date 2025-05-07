import React from 'react'
import { RenderBlocks } from '../RenderBlocks'
import type { Page } from '@/payload-types'

interface StackedBlockProps {
  block: {
    blockType: 'stackedBlock'
    items: {
      content: Page['layout'][0][]
      zIndex: number
    }[]
  }
  disableInnerContainer?: boolean
}

const StackedBlock: React.FC<StackedBlockProps> = ({ block }) => {
  console.log('StackedBlock component mounted')
  console.log('Block props:', block)

  if (!block || !block.items) {
    console.log('No block or items found')
    return null
  }

  const { items } = block
  console.log('Items:', items)

  return (
    <div className="relative w-full">
      {items.map((item, index) => {
        console.log('Rendering item:', { item, index })
        return (
          <div key={index} className="absolute top-0 left-0 w-full" style={{ zIndex: item.zIndex }}>
            <div className="relative w-full">
              {item.content && item.content.length > 0 ? (
                <RenderBlocks blocks={item.content} />
              ) : (
                <div className="p-4 text-red-500">No content to render</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StackedBlock
