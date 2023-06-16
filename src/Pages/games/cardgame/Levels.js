import "./Levels.css"

export default function Levels({setLevel}) {
  return (
    <>
      <button onClick={() => setLevel(1)}>Level 1</button>
      <button onClick={() => setLevel(2)}>Level 2</button>
      <button onClick={() => setLevel(3)}>Level 3</button>
    </>
  );
}