import Card from "./components/Card";

function App() {
  return (
    <div className="flex flex-col gap-10 h-screen p-10">
      <div>
        <h1>Component Design</h1>
        <h2>Assignment 1</h2>
        <h3>Wendell Terence Dador</h3>
      </div>
      <h2 className="flex justify-center w-full">Component: Card</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-10">
        <Card
          title="Large Card"
          content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta cumque vero sed, possimus placeat veniam, temporibus velit atque similique expedita sequi. Temporibus, dolore?"
          size="large"
        />
        <Card
          title="Small Card"
          content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta cumque vero sed, possimus placeat veniam, temporibus velit atque similique expedita sequi. Temporibus, dolore?"
          size="small"
        />
      </div>
    </div>
  );
}

export default App;
