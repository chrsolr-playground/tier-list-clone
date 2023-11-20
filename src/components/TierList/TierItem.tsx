import { type Item } from '.'

type Props = {
  item: Item
  onDragStart: (e: React.DragEvent, itemId: string) => void
}

const TierItem = ({ item, onDragStart }: Props) => {
  return (
    <div
      className="flex justify-center items-center overflow-hidden relative w-36 h-36 cursor-grab rounded-md mx-1 my-2"
      onDragStart={(e) => onDragStart(e, item.id)}
    >
      <div
        className="w-full h-full bg-center border-slate-900 border-2 bg-cover rounded-md"
        style={{
          backgroundImage: `url('${item.imageUrl}')`,
        }}
      />
    </div>
  )
}

export default TierItem
