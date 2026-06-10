import { useState } from "react";

function NoteCard({
  setOpen,
  setIsInput,
  setId,
  id,
  title,
  text,
  setDeleteNoteList,
  deleteNoteList,
}) {
  function handleClick() {
    setIsInput(false);
    setOpen((o) => !o);
    setId(id);
  }

  function deleteNoteFunc() {
    setDeleteNoteList([...deleteNoteList, id]);
  }

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="w-48 h-44 flex flex-col gap-1 border p-4 pt-3.5 rounded-xl border-[#999999] overflow-auto hide-scrollbar hover:cursor-pointer relative bg-[#1e1e1e]"
    >
      <div className="text-[#ffffff] font-semibold">{title}</div>
      <div className="text-[#eeeeee] ">{text}</div>
      {isHover && (
        <div className="absolute bottom-0 right-0 pr-1.5">
          <ion-icon
            onClick={(e) => {
              e.stopPropagation();
              deleteNoteFunc();
            }}
            name="trash"
            className="text-white/80 h-4 w-4 p-2.5 rounded-full hover:bg-[#282828]"
          ></ion-icon>
        </div>
      )}
    </div>
  );
}

export default NoteCard;
