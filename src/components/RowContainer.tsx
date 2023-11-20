import RowHead from './RowHead'
import RowItem from './RowItem'
import RowSetting from './RowSetting'

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
  onItemClick: ({
    rowId,
    itemId,
    isSelected,
  }: {
    rowId: string
    itemId: string
    isSelected: boolean
  }) => void
  onRightClick: ({
    rowId,
    itemId,
    isSelected,
  }: {
    rowId: string
    itemId: string
    isSelected: boolean
  }) => void
}) => {
  return (
    <div className="flex bg-slate-600 text-slate-50 mb-4 rounded-md min-h-[10rem]">
      <RowHead title={title} />

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div className="flex flex-1 flex-wrap" onClick={() => onRowClick(id)}>
        {items.map((item) => (
          <RowItem
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

      <RowSetting id={id} onUpClick={onUpClick} onDownClick={onDownClick} />
    </div>
  )
}

export default RowContainer
