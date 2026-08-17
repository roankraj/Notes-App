import NoteCard from "./NoteCard.jsx";
import { motion, AnimatePresence } from "motion/react";

function Notes({
  setOpen,
  setIsInput,
  setId,
  notes,
  setDeleteNoteList,
  deleteNoteList,
}) {
  if (!notes) return <h1>Loading...</h1>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <div className="flex flex-wrap gap-6 w-210 mx-auto pb-10.5 ">
        <AnimatePresence>
          {notes
            .filter((item) => !deleteNoteList.includes(item.id))
            .slice()
            .reverse()
            .map((item) => {
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    },
                    opacity: {
                      duration: 0.2,
                    },
                  }}
                >
                  <NoteCard
                    setDeleteNoteList={setDeleteNoteList}
                    deleteNoteList={deleteNoteList}
                    setOpen={setOpen}
                    setId={setId}
                    id={item.id}
                    setIsInput={setIsInput}
                    title={item.title}
                    text={item.text}
                    key={item.id}
                  />
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Notes;
