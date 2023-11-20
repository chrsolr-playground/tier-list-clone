import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
  onDrop: (e: React.DragEvent, tier: string) => void
  onDragOver: (e: React.DragEvent) => void
}

const TierRow = ({ children, title, onDragOver, onDrop }: Props) => {
  return (
    <div
      className="flex bg-slate-600 text-slate-50 mb-4 rounded-md min-h-[10rem]"
      onDrop={(e) => onDrop(e, title)}
      onDragOver={onDragOver}
    >
      <div className="flex bg-slate-800 min-w-[9rem] p-4 justify-center items-center rounded-md mr-1">
        <div>{title}</div>
      </div>
      {children}
    </div>
  )
}

export default TierRow
