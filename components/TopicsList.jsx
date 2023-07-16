import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getAllTopics = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    return response.json();
  } catch (error) {
    console.log("Failed to get topics:", error);
  }
};

export default async function TopicsList() {
  const { topics } = await getAllTopics();
  // console.log(topics);

  return (
    <>
      {topics.map((topic) => (
        <>
          {/* main Container */}
          <div
            className="p-4 border border-s-teal-400 flex justify-between my-3 gap-5 items-start"
            key={topic._id}
          >
            {/* Conent */}
            <div>
              <h2 className="text-2xl font-bold">{topic.title}</h2>
              <p>{topic.description}</p>
            </div>
            {/* Actions */}
            <div className="flex gap-3">
              <RemoveBtn id={topic._id} />
              <Link href={`/editTopic/${topic._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        </>
      ))}
    </>
  );
}
