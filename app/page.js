"use client";
import Sidebar from "./sidebar";
import { useState, useEffect } from "react";
import UsernameDropdown from "./usernameDropdown";
import WorkDropdown from "./workDropdown";
import WelcomeMessage from "./welcomeMessage";
import Histories from "./histories";

export default function Home() {
  const [username, setUsername] = useState();
  const [workSpace, setWorkSpace] = useState();

  const [usernames, setUsernames] = useState([]);
  const [workSpaces, setWorkSpaces] = useState([]);

  const [histories, setHistories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsernames(data.data);
      });
    fetch("http://localhost:3000/api/workSpaces")
      .then((res) => res.json())
      .then((data) => {
        setWorkSpaces(data.data);
      });
  }, []);

  useEffect(() => {
    if (username && workSpace) {
      fetch(
        `http://localhost:3000/api/histories?username=${username}&workSpace=${workSpace}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setHistories(data.data);
        });
    }
  }, [username, workSpace]);

  return (
    <>
      {username && workSpace ? (
        <iframe
          src={`https://pecha.tools/${workSpace}/?session=${username}`}
          className="w-screen h-screen"
        />
      ) : (
        <div className="grid content-center w-screen h-screen justify-evenly">
          <h1 className="text-2xl">welcome to pecha.tools</h1>
        </div>
      )}
      <Sidebar>
        <WelcomeMessage username={username} workSpace={workSpace} />
        <UsernameDropdown setUsername={setUsername} usernames={usernames} />
        <WorkDropdown setWorkSpace={setWorkSpace} workSpaces={workSpaces} />
        <Histories histories={histories} />
      </Sidebar>
    </>
  );
}
