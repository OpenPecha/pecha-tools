export default function WorkDropdown({ setWorkSpace, workSpaces }) {
  return (
    <div className="flex justify-around">
      <label htmlFor="work_space">select your work space: </label>
      <select
        name="work_space"
        id="work_space"
        className="text-black"
        onChange={(e) => setWorkSpace(e.target.value)}
      >
        <option>--select--</option>
        {workSpaces && workSpaces.map((work_space) => {
          return (
            <option key={work_space} value={work_space}>
              {work_space}
            </option>
          );
        })}
      </select>
    </div>
  );
}
