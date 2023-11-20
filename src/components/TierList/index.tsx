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
  const [holderItems, setHolderItems] = useState<RowItem[]>(images)
  const [selectedRow, setSelectedRow] = useState<
    { rowIndex: number; itemIndex: number; item: RowItem } | undefined
  >()
  const [selectedItem, setSelectedItem] = useState<RowItem | undefined>()

  const removeItemFromRow = (rowIndex: number, rowItemIndex: number) =>
    rows[rowIndex].items.splice(rowItemIndex, 1)

  const findRowIndexById = (rowId: string): number =>
    rows.findIndex(({ id }) => id === rowId)

  const findRowItemIndexById = (rowIndex: number, itemId: string): number => {
    return rows[rowIndex].items.findIndex(({ id }) => id === itemId)
  }

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

  const onRowItemClick = ({
    rowId,
    itemId,
    isSelected,
  }: {
    rowId: string
    itemId: string
    isSelected: boolean
  }) => {
    const currentRowIndex = findRowIndexById(rowId)
    const currentRowItemIndex = findRowItemIndexById(currentRowIndex, itemId)
    const currentRows = [...rows]
    let currentSelectedRow = undefined

    let currentSelectedItem =
      currentRows[currentRowIndex].items[currentRowItemIndex]

    if (!selectedRow) {
      currentSelectedItem.isSelected = isSelected
      currentSelectedRow = {
        item: currentSelectedItem,
        rowIndex: currentRowIndex,
        itemIndex: currentRowItemIndex,
      }
    } else {
      selectedRow.item.isSelected = false
      currentRows[currentRowIndex].items[currentRowItemIndex] = selectedRow.item
      currentRows[selectedRow.rowIndex].items[selectedRow.itemIndex] =
        currentSelectedItem
    }

    setSelectedRow(currentSelectedRow)
    setRows(currentRows)
  }

  const onRowClick = (id: string) => {
    const currentRows = [...rows]
    const currentRowIndex = findRowIndexById(id)

    if (!selectedRow && selectedItem) {
      const currentRowIndex = rows.findIndex((v) => v.id === id) as number
      const selectedItemIndex = holderItems.findIndex(
        (v) => v.id === selectedItem.id,
      )

      selectedItem.isSelected = false
      currentRows[currentRowIndex].items.push(selectedItem)

      holderItems.splice(selectedItemIndex, 1)

      setRows(currentRows)
      setSelectedItem(undefined)

      return
    }

    if ((!selectedRow && !selectedItem) || !selectedRow) {
      return
    }

    selectedRow.item.isSelected = false

    currentRows[currentRowIndex].items.push(selectedRow.item)

    removeItemFromRow(currentRowIndex, selectedRow.itemIndex)

    setRows(currentRows)
    setSelectedRow(undefined)
  }

  const onHolderItemClick = ({
    itemId,
    isSelected,
  }: {
    rowId: string
    itemId: string
    isSelected: boolean
  }) => {
    for (const value of holderItems) {
      value.isSelected = false
    }

    const selectedHolderItemIndex = holderItems.findIndex(
      (v) => v.id === itemId,
    )

    const selectedItem = holderItems[selectedHolderItemIndex]
    const currentItems = [...holderItems]

    currentItems[selectedHolderItemIndex].isSelected = isSelected

    setHolderItems(currentItems)
    setSelectedItem(selectedItem)
  }

  const onRowItemRightClick = ({
    rowId,
    itemId,
  }: {
    rowId: string
    itemId: string
    isSelected: boolean
  }) => {
    const rowIndex = findRowIndexById(rowId)
    const rowItemIndex = findRowItemIndexById(rowIndex, itemId)

    const currentRows = [...rows]
    const rowItemToRemove = currentRows[rowIndex].items[rowItemIndex]

    removeItemFromRow(rowIndex, rowItemIndex)

    holderItems.push(rowItemToRemove)

    setRows(currentRows)
    setHolderItems(holderItems)
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
            onRowClick={onRowClick}
            onItemClick={onRowItemClick}
            onUpClick={handleMoveUp}
            onDownClick={handleMoveDown}
            onRightClick={onRowItemRightClick}
          />
        ))}
        <TierListHolder
          key={getUniqueKey()}
          id="UNUSED"
          items={holderItems}
          onItemClick={onHolderItemClick}
        />
      </div>
    </div>
  )
}

export default TierList
