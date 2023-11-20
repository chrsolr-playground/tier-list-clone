import { useState } from 'react'
import TierListRow from './TierListRow'

const TierList = ({ title = 'Tier List' }: { title?: string }) => {
  const data = [
    {
      id: '1',
      title: 'Row #1',
      items: [
        {
          id: '10',
          imageUrl:
            'https://tiermaker.com/images/chart/chart/nfl-qbs-tier-list-2022-23-396637/965cad30-9cd2-4aaa-9cc6-07e8517ca88fpng.png',
        },
      ],
    },
    {
      id: '2',
      title: 'Row #2',
      items: [
        {
          id: '11',
          imageUrl:
            'https://tiermaker.com/images/chart/chart/nfl-qbs-tier-list-2022-23-396637/caad75b5-51df-4110-aeb7-ae4eb84c5571png.png',
        },
        {
          id: '12',
          imageUrl:
            'https://tiermaker.com/images/chart/chart/nfl-qbs-tier-list-2022-23-396637/5d13af71-a7a9-404d-8f63-0f16a4210545png.png',
        },
      ],
    },
    {
      id: '3',
      title: 'Row #3',
      items: [
        {
          id: '13',
          imageUrl:
            'https://tiermaker.com/images/chart/chart/nfl-qbs-tier-list-2022-23-396637/e041bc80-4879-42c8-a886-642427adf7bepng.png',
        },
      ],
    },
  ]

  const [items, setItems] = useState(data)

  const handleMoveUp = (id: string) => {
    const currentIndex = items.findIndex((v) => v.id === id)

    if (currentIndex === 0) {
      return
    }

    const currentItem = items[currentIndex]
    const nextItem = items[currentIndex - 1]

    items[currentIndex] = nextItem
    items[currentIndex - 1] = currentItem

    setItems([...items])
  }

  const handleMoveDown = (id: string) => {
    const currentIndex = items.findIndex((v) => v.id === id)

    if (currentIndex === items.length - 1) {
      return
    }

    const currentItem = items[currentIndex]
    const nextItem = items[currentIndex + 1]

    items[currentIndex] = nextItem
    items[currentIndex + 1] = currentItem

    setItems([...items])
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="flex flex-col">
        {items.map((item) => (
          <TierListRow
            key={item.id.toString()}
            id={item.id}
            title={item.title}
            items={item.items}
            onUpClicked={handleMoveUp}
            onDownClicked={handleMoveDown}
          />
        ))}
      </div>
    </div>
  )
}

export default TierList
