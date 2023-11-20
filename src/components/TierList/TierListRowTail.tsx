const TierListRowSetting = ({
  id,
  onUpClick: onUpClicked,
  onDownClick: onDownClicked,
}: {
  id: string
  onUpClick: (id: string) => void
  onDownClick: (id: string) => void
}) => {
  return (
    <div className="flex flex-col bg-slate-800 p-4 justify-center items-center rounded-md ml-1">
      <button
        type="button"
        className="px-4 py-2 bg-sky-500 rounded mb-2"
        onClick={() => onUpClicked(id)}
      >
        ^
      </button>
      <button
        type="button"
        className="px-4 py-2 bg-sky-500 rounded mt-2"
        onClick={() => onDownClicked(id)}
      >
        v
      </button>
    </div>
  )
}

export default TierListRowSetting
