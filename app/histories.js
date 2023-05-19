export default function Histories({ histories }) {
  return (
    <>
      {histories.length > 0 ? (
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl text-center">Histories</h1>
          <ul className="h-[82vh] overflow-y-auto">
          {histories.map((history) => (
            <li key={history.id} className="whitespace-nowrap">
              {history.data}
            </li>
          ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl">Histories</h1>
          <h1 className="">No histories yet</h1>
        </div>
      )}
    </>
  );
}
