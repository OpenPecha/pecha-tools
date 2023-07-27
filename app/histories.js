export default function Histories({ histories }) {
  return (
    <>
      {histories.length > 0 ? (
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl text-center">Histories</h1>
          <ul className="h-[82vh] overflow-y-auto">
            {histories.map((history, id) => (
              <li key={id} className="p-1 m-1 border">
                <div className="flex flex-col">
                  <p className="text-xs">{history.file_name}</p>
                  <div>
                    {history.user}{" "}
                    <span className="text-xs">({history.submitted_on})</span>:{" "}
                  </div>
                  <div>
                    {history.transcript}
                  </div>
                </div>
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
