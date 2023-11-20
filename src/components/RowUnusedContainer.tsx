import RowItem from './RowItem'

const RowUnusedContainer = ({
  id,
  items,
  onItemClick,
}: {
  id: string
  items: { id: string; isSelected: boolean; imageUrl: string }[]
  onItemClick: ({
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
    <div className="flex rounded-md bg-slate-400 text-slate-50 mb-4 min-h-[10rem]">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div className="flex flex-1 flex-wrap">
        {items.map((item) => (
          <RowItem
            key={item.id}
            id={item.id}
            rowId={id}
            imageUrl={item.imageUrl}
            onClick={onItemClick}
            isSelected={!!item.isSelected}
            margin="mx-2 my-2"
          />
        ))}
      </div>
    </div>
  )
}

export default RowUnusedContainer
