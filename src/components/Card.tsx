import { motion as m } from "motion/react";

interface CardProps {
  title: string;
  content: string;
  size?: "small" | "large";
}

const Card = ({ title, content, size = "small" }: CardProps) => {
  return (
    <m.div
      whileHover={{ scale: 1.05 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className={`flex flex-col gap-4 p-6 bg-neutral-50 rounded-3xl text-neutral-900 drop-shadow-lg ${
        size === "small" ? "max-w-min" : size === "large" ? "max-w-78" : ""
      }`}
    >
      <h1>{title}</h1>
      <p>{content}</p>
    </m.div>
  );
};

export default Card;
