import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateNote, createNote } from "../redux/noteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const noteId = searchParams.get("noteId");
  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    const noteIndex = allNotes.findIndex((n) => n._id == noteId);
    if (noteIndex != -1) {
      setTitle(allNotes[noteIndex].title);
      setValue(allNotes[noteIndex].content);
    }
  }, [noteId]);

  function create_Note(e) {
    if (title.trim().length == 0 || value.trim().length == 0) {
      toast.error("Input fields cannot be empty!");
      return;
    }

    const note = {
      title: title,
      content: value,
      _id: noteId || Date.now().toString(36),
      createdAt: getFormattedDate(),
    };

    if (noteId) dispatch(updateNote(note));
    else dispatch(createNote(note));

    // Cleaning
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  function getFormattedDate() {
    const date = new Date();
    // Options for formatting the date
    const options = { year: 'numeric', month: 'long', day: 'numeric'};

    // Convert to desired format directly
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className="w-full min-w-[600px] max-w-[1200px] h-full py-5 mt-2 mx-auto px-5 lg:px-0">
      <div className="w-full flex flex-row">
        <input
          required
          type="text"
          placeholder="Enter your title"
          className="text-black  min-w-[700px] pl-3 rounded-md outline-none border mr-2 focus:shadow-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="hover:ring-black outline-none  focus:ring-4 focus:bg-black focus:ring-black font-medium"
          onClick={(e) => create_Note(e)}
        >
          {noteId ? "Update" : "Create"}
        </button>
      </div>

      <div className="mt-2">
        <textarea
          required
          className="mt-2 rounded-xl outline outline-[#CECECE] p-4 min-w-[800px] focus:shadow-md text-black"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your notes"
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
