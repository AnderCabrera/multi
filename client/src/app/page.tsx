"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <h1>{counter}</h1>
    </>
  );
}
