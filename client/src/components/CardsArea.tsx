import { useQuery } from "@tanstack/react-query";
import CardType from "../types/CardType";
import Card from "./Card";

const CardsArea = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/cards");
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "Network response was not ok");
      }
      const cards = (await response.json()) as CardType[];

      console.log(cards);
      return cards;
    },
  });
  return (
    <div className="h-screen py-10">
      {/* Cards area */}
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <h1>Loading...</h1>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-full">
          <h1>Error: {error.message}</h1>
        </div>
      )}
      {data && (
        <div className="grid grid-cols-3 gap-10">
          {data.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              content={card.content}
              size={card.size}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardsArea;
