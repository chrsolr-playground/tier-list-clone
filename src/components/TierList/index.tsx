import { useState } from 'react'
import { defaultTiers, tierItems } from '../../data/dataSet'
import TierItem from './TierItem'
import TierRow from './TierRow'

export type Item = {
  id: string
  imageUrl: string
  tier: string
}

const TierList = ({ title = 'Tier List' }: { title?: string }) => {
  const [tiers, setTiers] = useState<string[]>(defaultTiers)
  const [items, setItems] = useState<Item[]>(tierItems)

  const handleDragStart = (event: React.DragEvent, itemId: string) => {
    event.dataTransfer.setData('text/plain', itemId)
  }

  const handleDrapOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent, tier: string) => {
    event.preventDefault()

    const itemId = event.dataTransfer.getData('text/plain')
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, tier } : item,
    )

    setItems(updatedItems)
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="flex flex-col">
        {tiers.map((tier) => (
          <TierRow title={tier} onDragOver={handleDrapOver} onDrop={handleDrop}>
            {items
              .filter((item) => item.tier === tier)
              .map((item) => (
                <TierItem item={item} onDragStart={handleDragStart} />
              ))}
          </TierRow>
        ))}
      </div>
    </div>
  )
}

export default TierList
