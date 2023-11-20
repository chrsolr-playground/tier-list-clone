import { useState } from 'react'
import { getUniqueKey } from '../../utils'
import TierListRow, { type Row } from './TierListRow'
import { type RowItem } from './TierListRowItem'
import { rows as data, images } from '../../data/dataSet'
import TierListHolder from './TierListHolder'

/**
 * TODO:
 * - add row
 *   - title
 *   - color
 * - remove row
 * - row color
 * - add images
 * - change add to row from click on the row to clicking on the row head
 */

const TierList = ({ title = 'Tier List' }: { title?: string }) => {
  const [rows, setRows] = useState<Row[]>(data)
  const [items, setItems] = useState<RowItem[]>(images)
  const [selectedRow, setSelectedRow] = useState<
    { rowIndex: number; itemIndex: number; item: RowItem } | undefined
  >()
  const [selectedItem, setSelectedItem] = useState<RowItem | undefined>()

  const findRowIndexById = (rowId: string): number =>
    rows.findIndex(({ id }) => id === rowId)

  const moveRow = (rowId: string, direction: 'UP' | 'DOWN') => {
    const currentIndex = findRowIndexById(rowId)

    if (
      (direction === 'UP' && currentIndex === 0) ||
      (direction === 'DOWN' && currentIndex === rows.length - 1)
    ) {
      return
    }

    const currentRows = [...rows]
    const moveToIndex = direction === 'UP' ? currentIndex - 1 : currentIndex + 1
    const row = currentRows[currentIndex]
    const nextRow = currentRows[moveToIndex]

    currentRows[currentIndex] = nextRow
    currentRows[moveToIndex] = row

    setRows(currentRows)
  }

  const handleMoveUp = (id: string) => moveRow(id, 'UP')
  const handleMoveDown = (id: string) => moveRow(id, 'DOWN')

  const handleOnItemClick = ({
    rowId,
    itemId,
    isSelected,
  }: {
    rowId: string
    itemId: string
    isSelected: boolean
  }) => {
    const currentRowIndex = rows.findIndex((v) => v.id === rowId) as number
    const currentItemIndex = rows[currentRowIndex].items.findIndex(
      (v) => v.id === itemId,
    ) as number

    if (!selectedRow) {
      rows[currentRowIndex].items[currentItemIndex].isSelected = isSelected
      const currentSelectedItem = rows[currentRowIndex].items[currentItemIndex]

      setSelectedRow({
        item: currentSelectedItem,
        rowIndex: currentRowIndex,
        itemIndex: currentItemIndex,
      })
    } else {
      const currentItem = rows[currentRowIndex].items[currentItemIndex]

      selectedRow.item.isSelected = false
      rows[currentRowIndex].items[currentItemIndex] = selectedRow.item
      rows[selectedRow.rowIndex].items[selectedRow.itemIndex] = currentItem

      setSelectedRow(undefined)
    }
  }

  const handleOnRowClick = (id: string) => {
    if (!selectedRow) {
      if (selectedItem) {
        const currentRowIndex = rows.findIndex((v) => v.id === id) as number
        const selectedItemIndex = items.findIndex(
          (v) => v.id === selectedItem.id,
        )

        selectedItem.isSelected = false
        rows[currentRowIndex].items.push(selectedItem)

        items.splice(selectedItemIndex, 1)

        setRows([...rows])
        setSelectedItem(undefined)
      }
      return
    }

    const currentRowIndex = rows.findIndex((v) => v.id === id) as number

    selectedRow.item.isSelected = false
    rows[currentRowIndex].items.push(selectedRow.item)

    rows[selectedRow.rowIndex].items.splice(selectedRow.itemIndex, 1)

    setRows([...rows])
    setSelectedRow(undefined)
  }

  const handleOnUnusedItemClick = ({
    itemId,
    isSelected,
  }: {
    rowId: string
    itemId: string
    isSelected: boolean
  }) => {
    const selectedItemIndex = items.findIndex((v) => v.id === itemId)

    unselectEverything()

    items[selectedItemIndex].isSelected = isSelected

    setItems([...items])
    setSelectedItem(items[selectedItemIndex])
  }

  const unselectEverything = () => {
    for (const value of items) {
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
    const currentRowIndex = rows.findIndex((v) => v.id === rowId) as number
    const currentItemIndex = rows[currentRowIndex].items.findIndex(
      (v) => v.id === itemId,
    ) as number

    const currentSelectedItem = rows[currentRowIndex].items[currentItemIndex]

    rows[currentRowIndex].items.splice(currentItemIndex, 1)

    items.push(currentSelectedItem)

    setRows([...rows])
    setItems([...items])
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="flex flex-col">
        {rows.map((item) => (
          <TierListRow
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
        <TierListHolder
          key={getUniqueKey()}
          id="UNUSED"
          items={items}
          onItemClick={handleOnUnusedItemClick}
        />
      </div>
    </div>
  )
}

export default TierList
