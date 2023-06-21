import "./Levels.css"

export default function Levels({setLevel}) {
  return (
    <>
    <div class="boxL">
    <table>
      <tr><h1>choisir votre niveau</h1></tr>
      <tr><button class="big-button" onClick={() => setLevel(1)}>Level 1</button></tr>
      <tr><button class="big-button" onClick={() => setLevel(2)}>Level 2</button></tr>
      <tr><button class="big-button" onClick={() => setLevel(3)}>Level 3</button></tr>
      
      
      
      
    </table></div>
    </>
  );
}