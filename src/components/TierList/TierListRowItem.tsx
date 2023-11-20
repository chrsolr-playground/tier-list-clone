export type RowItem = {
  id: string
  isSelected: boolean
  imageUrl: string
}

const TierListRowItem = ({
  imageUrl,
  id,
  rowId,
  onClick,
  onRightClick,
  isSelected = false,
  margin = 'mx-1 my-2',
}: {
  id: string
  rowId: string
  imageUrl: string
  isSelected?: boolean
  margin?: string
  onClick: ({
    rowId,
    itemId,
    isSelected,
  }: {
    rowId: string
    itemId: string
    isSelected: boolean
  }) => void
  onRightClick?: ({
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
    <div
      className={`flex justify-center items-center overflow-hidden relative w-36 h-36 hover:cursor-pointer rounded-md ${margin}`}
      onClick={(e) => {
        e.stopPropagation()
        onClick({ rowId, itemId: id, isSelected: !isSelected })
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        if (onRightClick) {
          onRightClick({ rowId, itemId: id, isSelected: !isSelected })
        }
      }}
    >
      {isSelected && (
        <div className="bg-black opacity-70 w-full h-full absolute" />
      )}
      <div
        className="w-full h-full bg-center border-slate-900 border-2 bg-cover rounded-md"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      />
    </div>
  )
}

export default TierListRowItem
