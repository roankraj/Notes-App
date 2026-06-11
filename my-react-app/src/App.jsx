import Header from "./Header.jsx";
import Notes from "./Notes.jsx";
import Note from "./Note.jsx";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

function App() {
  const [open, setOpen] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [notes, setNotes] = useState([]);
  const [id, setId] = useState(null); // id of the note opened from the notes section
  const [currentId, setCurrentId] = useState(0); // next available id
  const [deleteNoteList, setDeleteNoteList] = useState([]);
  const notesCopyRef = useRef([]);

  function fetchNotes() {
    fetch("http://localhost:8000/api/home")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        notesCopyRef.current = data;
        setCurrentId(Math.max(...data.map((n) => n.id)) + 1);
      });
  }

  function fetchDeleteList() {
    fetch("http://localhost:8000/api/deleteList")
      .then((res) => res.json())
      .then((data) => {
        setDeleteNoteList(data);
      });
  }

  useEffect(() => {
    fetchNotes();
    fetchDeleteList();
  }, []);

  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="font-42dot bg-[#1e1e1e]"
    >
      <Header
        setOpen={setOpen}
        setIsInput={setIsInput}
        setNotes={setNotes}
        fetchNotes={fetchNotes}
        notesCopyRef={notesCopyRef}
      />
      <div>
        <Notes
          setOpen={setOpen}
          setIsInput={setIsInput}
          setId={setId}
          notes={notes}
          setDeleteNoteList={setDeleteNoteList}
          deleteNoteList={deleteNoteList}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          >
            <Note
              setOpen={setOpen}
              id={id}
              isInput={isInput}
              title={isInput ? "" : notes.find((obj) => obj.id === id).title}
              text={isInput ? "" : notes.find((obj) => obj.id === id).text}
              currentId={currentId}
              setNotes={setNotes}
              setCurrentId={setCurrentId}
              notesCopyRef={notesCopyRef}
              notes={notes}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
