import Hero from "./components/Hero";
import CardsArea from "./components/CardsArea";
import AddCard from "./components/AddCard";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <div className="flex flex-col gap-20  p-10 bg-neutral-500">
      <ReactQueryDevtools initialIsOpen={false} />
      <Hero />
      <div>
        <AddCard />
        <CardsArea />
      </div>
    </div>
  );
}

export default App;
