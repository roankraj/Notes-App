import { useState } from "react";

function Header({ setOpen, setIsInput, setNotes, fetchNotes, notesCopyRef }) {
  const [inputText, setInputText] = useState("");

  function search(text) {
    if (text === "") {
      fetchNotes();
      return;
    }
    setNotes(
      notesCopyRef.current.filter(
        (item) =>
          item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.text.toLowerCase().includes(text.toLowerCase()),
      ),
    );
    console.log("search done");
  }

  function addNoteBox() {
    setIsInput(true); //opens the
    setOpen((o) => !o); //correct note input box
  }

  return (
    <div className="w-149 mx-auto flex items-center pt-8.5 pb-10.5 justify-between">
      <div className="flex pl-4 gap-4 w-103.5 h-8.5 bg-[#444444] rounded-full items-center">
        <ion-icon
          name="search-outline"
          className="text-[#b5b5b5] w-4 h-4"
        ></ion-icon>
        <input
          type="text"
          placeholder="Search"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            search(e.target.value);
          }}
          className="placeholder-[#b5b5b5] focus:outline-none text-[#eeeeee] caret-[#b8b8b8]"
        ></input>
      </div>
      <button
        onClick={addNoteBox}
        className="w-33.5 h-8.5 rounded-full bg-[#cccccc] text-[#111111] hover:cursor-pointer hover:bg-[#999999] active:text-blue-500"
      >
        New Note
      </button>
    </div>
  );
}

export default Header;
