import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromNotes } from "../redux/noteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const AllNotes = () => {
  const allNotes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = allNotes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(note) {
    dispatch(removeFromNotes(note));
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative mb-6 ">
        <div className="flex items-center border hover:ring-gray-500">
          <i className="material-icons absolute left-3 text-gray-500">search</i>
          <input
            type="search"
            name="NoteSearchForm"
            className="w-full px-10 py-2 border min-w-[800px] bg-white text-gray-500 rounded-lg outline-none hover:ring-gray-500 focus:shadow-md"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredData.length >= 0 &&
          filteredData.map((note) => {
            return (
              <div
                className="border border-[#cec9c9] rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
                key={note?._id}
              >
                <div className="flex justify-between gap-4">
                  <div className="text-left">
                    <h2 className="text-xl font-semibold text-black  mb-2 line-clamp-1">
                      {note.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-2">{note.content}</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                      <NavLink to={`/?noteId=${note?._id}`} className="p-2 border border-[#CECECE] rounded-lg hover:bg-[#f7fafc] ">
                        <i className="material-icons inline-block pt-2 ">
                          edit
                        </i>
                      </NavLink>

                      <NavLink to={`/notes/${note?._id}`} className="p-2 border border-[#CECECE] rounded-lg hover:bg-[#f7fafc] ">
                        <i className="material-icons inline-block pt-2 ">
                          visibility
                        </i>
                      </NavLink>
                      
                      <button onClick={(e) => handleDelete(note)} className="note-btn rounded-lg hover:bg-[#f7fafc]">
                        <i className="material-icons">
                          delete
                        </i>
                      </button>
                      <button className="note-btn rounded-lg outline-none border-none hover:border-none"
                        onClick={() => {
                          navigator.clipboard.writeText(note?.content);
                          toast.success("Copied Successfully!!");
                        }}
                      >
                        <i className="material-icons ">
                          content_copy
                        </i>
                      </button>
                      {/* Check if the browser supports Web Share API and if yes, render button */}
                      {navigator.share && (
                        <button className="note-btn rounded-lg hover:bg-gray-100"
                          onClick={() => {
                            navigator
                              // The share method returns a promise that resolves when the share is successful and rejects if there is an error.
                              .share({
                                title: note.title,
                                text: note.content,
                                url: window.location.href,
                              })
                              .then(() => {
                                toast.success("Note shared successfully!");
                              })
                              .catch((error) => {
                                toast.error(
                                  "Failed to share note: " + error.message
                                );
                              });
                          }}
                        >
                          <i className="material-icons">
                            share
                          </i>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center  justify-center text-sm text-gray-500">
                      <i className="material-icons mr-2">
                        calendar_today
                      </i>
                      {note.createdAt}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllNotes;
