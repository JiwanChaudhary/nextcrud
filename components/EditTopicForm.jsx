"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditTopicForm({ id, title, description }) {
  const router = useRouter();

  const [newInput, setNewInput] = useState({
    newTitle: title,
    newDescription: description,
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // console.log(name, value);
    setNewInput({ ...newInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle: newInput.newTitle,
          newDescription: newInput.newDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update topic");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={newInput.newTitle}
        type="text"
        name="newTitle"
        placeholder="Topic Title"
        className="border border-slate-500 px-8 py-2"
      />
      <input
        onChange={handleChange}
        value={newInput.newDescription}
        type="text"
        name="newDescription"
        placeholder="Topic Description"
        className="border border-slate-500 px-8 py-2"
      />
      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Update Topic
      </button>
    </form>
  );
}
