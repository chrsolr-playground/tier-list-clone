import { useState } from 'react'
import { defaultTiers, tierItems } from '../../data/dataSet'
import TierItem from './TierItem'
import TierRow from './TierRow'

export type Item = {
  id: string
  tier: string
  imageUrl: string
}

const TierList = ({ title = 'Tier List' }: { title?: string }) => {
  const [tiers, setTiers] = useState<string[]>(defaultTiers)
  const [items, setItems] = useState<Item[]>(tierItems)

  const moveTierRow = (fromIndex: number, toIndex: number) => {
    const updatedTiers = [...tiers]
    const [removed] = updatedTiers.splice(fromIndex, 1)

    updatedTiers.splice(toIndex, 0, removed)
    setTiers(updatedTiers)
  }

  const handleDragStart = (event: React.DragEvent, itemId: string) => {
    event.dataTransfer.setData('text/plain', itemId)
  }

  const handleDragOver = (event: React.DragEvent) => {
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
        {tiers.map((tier, index) => (
          <TierRow
            title={tier}
            index={index}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            moveTierRow={moveTierRow}
            disableUp={index === 0}
            disableDown={index === tiers.length - 1}
          >
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