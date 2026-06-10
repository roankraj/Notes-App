import { useState } from "react";

function Note({
  setOpen,
  id,
  isInput,
  title,
  text,
  currentId,
  setNotes,
  setCurrentId,
  notesCopyRef,
  notes,
}) {
  function closeNote() {
    setOpen((o) => !o);
  }

  function addNote() {
    fetch("http://localhost:8000/add-note", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: currentId,
        title: titleText,
        text: noteText,
      }),
    });
  }

  function editNote() {
    fetch("http://localhost:8000/edit-note", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: id,
        title: titleText,
        text: noteText,
      }),
    });
  }

  const [titleText, setTitleText] = useState(title);
  const [noteText, setNoteText] = useState(text);

  return (
    <div
      onClick={closeNote}
      className="fixed inset-0 flex items-center justify-center bg-black/50 "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-84 h-77 flex flex-col gap-3 p-4 border border-[#999999] bg-[#1e1e1e] rounded-xl"
      >
        <textarea
          type="text"
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
          placeholder="Title"
          className="h-9 placeholder:font-medium focus:outline-none caret-[#b8b8b8] placeholder:text-[#ffffff]/60 text-2xl font-medium text-[#ffffff] 
           overflow-auto hide-scrollbar "
        ></textarea>
        <textarea
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Note"
          className=" focus:outline-none caret-[#b8b8b8] placeholder:text-[#eeeeee]/60 text-xl text-[#eeeeee] overflow-auto hide-scrollbar"
        ></textarea>
        <div className="mt-auto flex justify-between">
          {isInput && (
            <button
              onClick={() => {
                if (titleText !== "" || noteText !== "") {
                  addNote();
                  setNotes((note) => [
                    ...note,
                    { id: currentId, title: titleText, text: noteText },
                  ]);
                  setCurrentId((id) => id + 1);
                }
                closeNote();
                console.log("it was done");
                notesCopyRef.current = [
                  ...notes,
                  { id: currentId, title: titleText, text: noteText },
                ];
              }}
              className="text-[#eeeeee] hover:cursor-pointer hover:bg-[#222] px-2 py-1 -ml-2 -mb-1 rounded-md"
            >
              Add Note
            </button>
          )}
          {isInput && (
            <button
              onClick={closeNote}
              className="text-[#eeeeee] hover:cursor-pointer hover:bg-[#222] px-2 py-1 -mr-2 -mb-1 rounded-md ml-auto"
            >
              Close
            </button>
          )}
          {!isInput && (
            <button
              onClick={() => {
                if (titleText !== "" || noteText !== "") {
                  editNote();
                  setNotes((note) =>
                    note.map((item) =>
                      item.id === id
                        ? { id: id, title: titleText, text: noteText }
                        : item,
                    ),
                  );
                  notesCopyRef.current = notes.map((item) => {
                    return item.id === id
                      ? { id, title: titleText, text: noteText }
                      : item;
                  });
                }
                closeNote();
              }}
              className="text-[#eeeeee] hover:cursor-pointer hover:bg-[#222] px-2 py-1 -ml-2 -mb-1 rounded-md"
            >
              Save Note
            </button>
          )}
          {!isInput && (
            <button
              onClick={closeNote}
              className="text-[#eeeeee] hover:cursor-pointer hover:bg-[#222] px-2 py-1 -mr-2 -mb-1 rounded-md ml-auto"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Note;
