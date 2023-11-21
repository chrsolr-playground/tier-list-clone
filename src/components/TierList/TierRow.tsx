import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
  index: number
  disableUp?: boolean
  disableDown?: boolean
  moveTierRow: (fromIndex: number, toIndex: number) => void
  onDrop: (e: React.DragEvent, tier: string) => void
  onDragOver: (e: React.DragEvent) => void
}

const TierRow = ({
  children,
  title,
  index,
  disableUp = false,
  disableDown = false,
  moveTierRow,
  onDragOver,
  onDrop,
}: Props) => {
  return (
    <div
      className="flex bg-slate-600 select-none text-slate-50 mb-4 rounded-md min-h-[10rem]"
      onDrop={(e) => onDrop(e, title)}
      onDragOver={onDragOver}
    >
      <div className="flex bg-slate-800 min-w-[9rem] p-4 justify-center items-center rounded-md mr-1">
        <div>{title}</div>
      </div>

      <div className="flex flex-1 flex-wrap">{children}</div>

      <div className="flex flex-col bg-slate-800 p-4 justify-center items-center rounded-md ml-1">
        <button
          className="px-4 py-2 bg-sky-500 rounded mb-2 min-w-[6rem]"
          onClick={() => moveTierRow(index, index - 1)}
          disabled={disableUp}
        >
          Up
        </button>
        <button
          className="px-4 py-2 bg-sky-500 rounded mb-2 min-w-[6rem]"
          onClick={() => moveTierRow(index, index + 1)}
          disabled={disableDown}
        >
          Down
        </button>
      </div>
    </div>
  )
}

export default TierRow
