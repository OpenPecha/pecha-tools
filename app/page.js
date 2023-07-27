"use client";
import Sidebar from "./sidebar";
import { useState, useEffect } from "react";
import UsernameDropdown from "./usernameDropdown";
import WorkDropdown from "./workDropdown";
import WelcomeMessage from "./welcomeMessage";
import Histories from "./histories";
import SearchFile from "./searchFile";
export default function Home() {
  const [username, setUsername] = useState();
  const [workSpace, setWorkSpace] = useState();

  const [usernames, setUsernames] = useState([]);
  const [workSpaces, setWorkSpaces] = useState([]);

  const [histories, setHistories] = useState([]);

  useEffect(() => {
    fetch("https://work.pecha.tools/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsernames(data.data);
      });
    fetch("https://work.pecha.tools/api/workspaces")
      .then((res) => res.json())
      .then((data) => {
        setWorkSpaces(data.data);
      });
  }, []);

  useEffect(() => {
    if (workSpace) {
      fetch(`https://work.pecha.tools/api/histories?workSpace=${workSpace}`)
        .then((res) => res.json())
        .then((data) => {
          setHistories(data.data);
        });
    }
  }, [workSpace]);

  return (
    <>
      {username && workSpace ? (
        <iframe
          src={`https://work.pecha.tools/${workSpace}/?session=${username}`}
          className="w-screen h-screen"
        />
      ) : (
        <div className="grid content-center w-screen h-screen justify-evenly">
          <h1 className="text-2xl">welcome to work.pecha.tools</h1>
          Please select username and workspace to start working.
        </div>
      )}
      <Sidebar>
        <WelcomeMessage username={username} workSpace={workSpace} />
        <WorkDropdown setWorkSpace={setWorkSpace} workSpaces={workSpaces} />
        <UsernameDropdown setUsername={setUsername} usernames={usernames} />
        <SearchFile />
        <Histories histories={histories} />
      </Sidebar>
    </>
  );
}
