export default function Histories({ histories }) {
  return (
    <>
      {histories.length > 0 ? (
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl">Histories</h1>
          {histories.map((history) => (
            <div key={history.id} className="flex flex-col space-y-2">
              <h1 className="text-xl">{history.data}</h1>
            </div>
          ))}
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
