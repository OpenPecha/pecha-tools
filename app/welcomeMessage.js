export default function WelcomeMessage({ username, workSpace }) {
  return (
    <h3 className="mt-10 mb-2 text-4xl font-semibold text-white">
      {username && workSpace ? (
        <>
          Hi, {username}! welcome to {workSpace}
        </>
      ) : (
        <>select the options</>
      )}
    </h3>
  );
}
