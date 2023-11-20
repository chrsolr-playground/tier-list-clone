import { useState } from 'react'
import { getUniqueKey } from '../utils'
import RowContainer from './RowContainer'
import RowUnusedContainer from './RowUnusedContainer'

type RowItem = {
  id: string
  isSelected: boolean
  imageUrl: string
}

type Row = {
  id: string
  title: string
  items: RowItem[]
}

const TierList = ({ title = 'Tier List' }: { title?: string }) => {
  const unused = [
    {
      id: getUniqueKey(),
      isSelected: false,
      imageUrl:
        'https://tiermaker.com/images/chart/chart/nfl-qbs-tier-list-2022-23-396637/965cad30-9cd2-4aaa-9cc6-07e8517ca88fpng.png',
    },

    {
      id: getUniqueKey(),
      isSelected: false,
      imageUrl:
        'https://tiermaker.com/images/chart/chart/nfl-qbs-tier-list-2022-23-396637/caad75b5-51df-4110-aeb7-ae4eb84c5571png.png',
    },
    {
      id: getUniqueKey(),
      isSelected: false,
      imageUrl:
        'https://tiermaker.com/images/chart/chart/nfl-qbs-tier-list-2022-23-396637/5d13af71-a7a9-404d-8f63-0f16a4210545png.png',
    },
    {
      id: getUniqueKey(),
      isSelected: false,
      imageUrl:
        'https://tiermaker.com/images/chart/chart/nfl-qbs-tier-list-2022-23-396637/e041bc80-4879-42c8-a886-642427adf7bepng.png',
    },
  ]

  const data = [
    {
      id: getUniqueKey(),
      title: 'Row #1',
      items: [],
    },
    {
      id: getUniqueKey(),
      title: 'Row #2',
      items: [],
    },
    {
      id: getUniqueKey(),
      title: 'Row #3',
      items: [],
    },
  ]

  const [items, setItems] = useState<Row[]>(data)
  const [unusedItems, setUnusedItems] = useState<RowItem[]>(unused)
  const [selectedItem, setSelectedItem] = useState<
    { rowIndex: number; itemIndex: number; item: RowItem } | undefined
  >()
  const [selectedUnusedItem, setSelectedUnusedItem] = useState<
    RowItem | undefined
  >()

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

  const handleOnItemClick = ({
    rowId,
    itemId,
    isSelected,
  }: {
    rowId: string
    itemId: string
    isSelected: boolean
  }) => {
    const currentRowIndex = items.findIndex((v) => v.id === rowId) as number
    const currentItemIndex = items[currentRowIndex].items.findIndex(
      (v) => v.id === itemId,
    ) as number

    if (!selectedItem) {
      items[currentRowIndex].items[currentItemIndex].isSelected = isSelected
      const currentSelectedItem = items[currentRowIndex].items[currentItemIndex]

      setSelectedItem({
        item: currentSelectedItem,
        rowIndex: currentRowIndex,
        itemIndex: currentItemIndex,
      })
    } else {
      const currentItem = items[currentRowIndex].items[currentItemIndex]

      selectedItem.item.isSelected = false
      items[currentRowIndex].items[currentItemIndex] = selectedItem.item
      items[selectedItem.rowIndex].items[selectedItem.itemIndex] = currentItem

      setSelectedItem(undefined)
    }
  }

  const handleOnRowClick = (id: string) => {
    if (!selectedItem) {
      if (selectedUnusedItem) {
        const currentRowIndex = items.findIndex((v) => v.id === id) as number
        const selectedItemIndex = unusedItems.findIndex(
          (v) => v.id === selectedUnusedItem.id,
        )

        selectedUnusedItem.isSelected = false
        items[currentRowIndex].items.push(selectedUnusedItem)

        unusedItems.splice(selectedItemIndex, 1)

        setItems([...items])
        setSelectedUnusedItem(undefined)
      }
      return
    }

    const currentRowIndex = items.findIndex((v) => v.id === id) as number

    selectedItem.item.isSelected = false
    items[currentRowIndex].items.push(selectedItem.item)

    items[selectedItem.rowIndex].items.splice(selectedItem.itemIndex, 1)

    setItems([...items])
    setSelectedItem(undefined)
  }

  const handleOnUnusedItemClick = ({
    itemId,
    isSelected,
  }: {
    rowId: string
    itemId: string
    isSelected: boolean
  }) => {
    const selectedItemIndex = unusedItems.findIndex((v) => v.id === itemId)

    unselectEverything()

    unusedItems[selectedItemIndex].isSelected = isSelected

    setUnusedItems([...unusedItems])
    setSelectedUnusedItem(unusedItems[selectedItemIndex])
  }

  const unselectEverything = () => {
    for (const value of unusedItems) {
      value.isSelected = false
    }
  }

  const handleOnRightClick = ({
    rowId,
    itemId,
  }: {
    rowId: string
    itemId: string
    isSelected: boolean
  }) => {
    const currentRowIndex = items.findIndex((v) => v.id === rowId) as number
    const currentItemIndex = items[currentRowIndex].items.findIndex(
      (v) => v.id === itemId,
    ) as number

    const currentSelectedItem = items[currentRowIndex].items[currentItemIndex]

    items[currentRowIndex].items.splice(currentItemIndex, 1)

    unusedItems.push(currentSelectedItem)

    setItems([...items])
    setUnusedItems([...unusedItems])
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="flex flex-col">
        {items.map((item) => (
          <RowContainer
            key={item.id}
            id={item.id}
            title={item.title}
            items={item.items}
            onRowClick={handleOnRowClick}
            onItemClick={handleOnItemClick}
            onUpClick={handleMoveUp}
            onDownClick={handleMoveDown}
            onRightClick={handleOnRightClick}
          />
        ))}
        <RowUnusedContainer
          key={getUniqueKey()}
          id="UNUSED"
          items={unusedItems}
          onItemClick={handleOnUnusedItemClick}
        />
      </div>
    </div>
  )
}

export default TierList
