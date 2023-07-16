"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddTopic() {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  const router = useRouter();

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.title || !input.description) {
      alert("All the fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: input.title,
          description: input.description,
        }),
      });
      if (response.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create topic");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={input.title}
          placeholder="Topic Title"
          className="border border-slate-500 px-8 py-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={input.description}
          placeholder="Topic Description"
          className="border border-slate-500 px-8 py-2"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        >
          Add Topic
        </button>
      </form>
    </>
  );
}
