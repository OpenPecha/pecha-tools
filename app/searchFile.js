"use client";
import { useState } from "react";
export default function SearchFile() {
  const [fileName, setFileName] = useState();
  return (
    <>
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl">Search File</h1>
        <input
          type="text"
          className="text-black border"
          onChange={(e) => setFileName(e.target.value)}
        />
        <button
          className="border"
          onClick={() => {
            fetch(`https://pecha.tools/api/files/${fileName}`)
              .then((res) => res.json())
              .then((data) => {
                if (data.data.length == 0) {
                  alert("No results found");
                } else {
                  const ans = data.data
                    .map((result) => {
                      return `Transcriber: ${result.username}\nTranscript: ${result.transcript}\nSubmitted on: ${result.submitted_on}`;
                    })
                    .join("\n\n");
                  alert(ans);
                }
              });
          }}
        >
          Search
        </button>
      </div>
    </>
  );
}
