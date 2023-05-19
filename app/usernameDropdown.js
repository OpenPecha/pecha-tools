export default function UsernameDropdown({setUsername, usernames}) {
  return (
    <div className="flex justify-around">
      <label htmlFor="username">select your username: </label>
      <select
        name="username"
        id="username"
        className="text-black"
        onChange={(e) => setUsername(e.target.value)}
      >
        <option>--select--</option>
        {usernames && usernames.map((username) => {
          return (
            <option key={username} value={username}>
              {username}
            </option>
          );
        })}
      </select>
    </div>
  );
}
