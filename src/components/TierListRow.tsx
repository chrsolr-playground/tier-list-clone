const TierLisrRowHead = ({ title }: { title: string }) => {
  return (
    <div className="flex bg-slate-800 w-36 p-4 justify-center items-center rounded-md mr-1">
      <div>{title}</div>
    </div>
  )
}

const TierListRowItem = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="flex justify-center items-center w-36 h-36 hover:cursor-pointer mx-1">
      <div
        className="w-full h-full bg-center border-slate-900 border-2 bg-cover"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      />
    </div>
  )
}

const TierListRowSetting = ({
  id,
  onUpClicked,
  onDownClicked,
}: {
  id: string
  onUpClicked: (id: string) => void
  onDownClicked: (id: string) => void
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

const TierListRow = ({
  id,
  title,
  items,
  onUpClicked,
  onDownClicked,
}: {
  id: string
  title: string
  items: { [x: string]: string }[]
  onUpClicked: (id: string) => void
  onDownClicked: (id: string) => void
}) => {
  return (
    <div className="flex bg-slate-600 text-slate-50 mb-4 rounded-md">
      <TierLisrRowHead title={title} />

      <div className="flex flex-1 flex-wrap">
        {items.map((item) => (
          <TierListRowItem imageUrl={item.imageUrl} />
        ))}
      </div>

      <TierListRowSetting
        id={id}
        onUpClicked={onUpClicked}
        onDownClicked={onDownClicked}
      />
    </div>
  )
}

export default TierListRow
