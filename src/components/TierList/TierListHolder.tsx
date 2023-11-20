import { TierListSelectItem } from '.'
import TierListRowItem from './TierListRowItem'

const TierListHolder = ({
  id,
  items,
  onItemClick,
}: {
  id: string
  items: { id: string; isSelected: boolean; imageUrl: string }[]
  onItemClick: ({ rowId, itemId, isSelected }: TierListSelectItem) => void
}) => {
  return (
    <div className="flex rounded-md bg-slate-400 text-slate-50 mb-4 min-h-[10rem]">
      <div className="flex flex-1 flex-wrap">
        {items.map((item) => (
          <TierListRowItem
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

export default TierListHolder
