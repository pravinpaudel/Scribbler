import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote: (state, action) => {
      const note = action.payload;
      // Check if the note already exists
      const existingNote = state.notes.find((n) => n._id == note._id);
      if (existingNote) {
        toast.error("Note already exits");
        return;
      }
      // Push into store (central store)
      state.notes.push(note);
      // Push into local storage
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Note created successfully!!");
    },
    updateNote: (state, action) => {
      const note = action.payload;
      const noteIdx = state.notes.findIndex((n) => n._id == note._id);
      if (noteIdx == -1) {
        toast.error("Couldn't find the note");
        return;
      }
      state.notes[noteIdx] = note;
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Note updated successfully!!");
    },
    resetAllNotes: (state, action) => {
      state.notes = [];
      localStorage.removeItem("notes");
    },
    removeFromNotes: (state, action) => {
      const note = action.payload;
      const noteIdx = state.notes.findIndex((n) => n._id == note._id);
      if (noteIdx != -1) {
        state.notes.splice(noteIdx, 1);
        toast.success("Note deleted successfully!!");
        return;
      }
      toast.error("Note could not be deleted!!");
    },
  },
});

// Action creators are generated for each case reducer function
export const { createNote, updateNote, resetAllNotes, removeFromNotes } =
  notesSlice.actions;

export default notesSlice.reducer;
