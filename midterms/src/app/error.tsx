"use client";

import Link from "next/link";

const ErrorPage = ({ error }: { error: { message: string } }) => {
  return (
    <div className="h-screen w-full items-center flex gap-5 justify-center flex-col ">
      <span className="text-center">
        <h1>An error occurred:</h1>
        <p>{error.message}</p>
      </span>
      <Link href={"/"}>
        <button className="bg-neutral-600 text-white px-4 py-2 rounded">
          Go back to home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
