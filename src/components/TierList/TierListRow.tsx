import { TierListSelectItem } from '.'
import TierListRowHead from './TierListRowHead'
import TierListRowItem, { type RowItem } from './TierListRowItem'
import TierListRowTail from './TierListRowTail'

export type Row = {
  id: string
  title: string
  items: RowItem[]
}

const RowContainer = ({
  id,
  title,
  items,
  onRowClick,
  onItemClick,
  onUpClick,
  onDownClick,
  onRightClick,
}: {
  id: string
  title: string
  items: { id: string; isSelected: boolean; imageUrl: string }[]
  onRowClick: (id: string) => void
  onUpClick: (id: string) => void
  onDownClick: (id: string) => void
  onItemClick: ({ rowId, itemId, isSelected }: TierListSelectItem) => void
  onRightClick: ({ rowId, itemId, isSelected }: TierListSelectItem) => void
}) => {
  return (
    <div className="flex bg-slate-600 text-slate-50 mb-4 rounded-md min-h-[10rem]">
      <TierListRowHead title={title} />

      <div className="flex flex-1 flex-wrap" onClick={() => onRowClick(id)}>
        {items.map((item) => (
          <TierListRowItem
            key={item.id}
            id={item.id}
            rowId={id}
            imageUrl={item.imageUrl}
            onRightClick={onRightClick}
            onClick={onItemClick}
            isSelected={!!item.isSelected}
          />
        ))}
      </div>

      <TierListRowTail
        id={id}
        onUpClick={onUpClick}
        onDownClick={onDownClick}
      />
    </div>
  )
}

export default RowContainer
