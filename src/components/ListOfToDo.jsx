import React, { useContext, useEffect, useState } from "react";
import { Store } from "./StoreProvider";

const ListOfToDo = ({ category }) => {
  const { state, dispatch } = useContext(Store);

  const [newMessage, setNewMessage] = useState("");

  const showInput = (event, note) => {
    event.preventDefault();
    document.getElementById(`delete${note.id}`).setAttribute("class", "hidden");
    document.getElementById(`update${note.id}`).setAttribute("class", "hidden");
    document.getElementById(`cancel${note.id}`).setAttribute("class", "");
    document.getElementById(`input${note.id}`).setAttribute("class", "");
    document.getElementById(`change${note.id}`).setAttribute("class", "");
  };

  const hideInput = (event, note) => {
    event.preventDefault();
    document.getElementById(`delete${note.id}`).setAttribute("class", "");
    document.getElementById(`update${note.id}`).setAttribute("class", "");
    document.getElementById(`input${note.id}`).setAttribute("class", "hidden");
    document.getElementById(`change${note.id}`).setAttribute("class", "hidden");
    document.getElementById(`cancel${note.id}`).setAttribute("class", "hidden");
  };

  const onCheckbox = async (event, note) => {
    const checked = event.currentTarget.checked;

    let noteWithCheckboxInformation = { ...note, done: checked };

    let noteUpdatedPromise = await fetch(
      "http://localhost:8081/to-do/api/update/note",
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(noteWithCheckboxInformation),
      }
    );

    let noteUpdated = await noteUpdatedPromise.json();

    dispatch({
      type: "update-note",
      payload: noteUpdated,
    });
  };

  const onUpdate = async (event, note) => {
    event.preventDefault();
    hideInput(event, note);

    let newNoteUpdated = { ...note, message: newMessage };

    let noteUpdatedPromise = await fetch(
      "http://localhost:8081/to-do/api/update/note",
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newNoteUpdated),
      }
    );

    let noteUpdated = await noteUpdatedPromise.json();

    dispatch({
      type: "update-note",
      payload: noteUpdated,
    });
  };

  const onDelete = async (event, note) => {
    event.preventDefault();
    let response = await fetch(
      `http://localhost:8081/to-do/api/delete/note/${note.id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      dispatch({
        type: "remove-note",
        payload: note,
      });
    }
  };

  const inputSetMessage = (event) => {
    setNewMessage(event.target.value);
  };

  const categoryForNote = state.categoryList.filter(
    (categoryFromForm) => categoryFromForm.id === category.id
  )[0];
  return (
    <div>
      <ul>
        {categoryForNote.notes.map((note) => {
          return (
            <li
              style={note.done ? { textDecoration: "line-through" } : {}}
              key={note.id}
            >
              {note.message} <br />
              <input
                onChange={(event) => onCheckbox(event, note)}
                type="checkbox"
                checked={note.done}
              />
              <input
                id={`input${note.id}`}
                type="text"
                placeholder="New Message"
                className="hidden"
                value={newMessage}
                onChange={inputSetMessage}
              />
              <button
                id={`delete${note.id}`}
                onClick={(event) => onDelete(event, note)}
              >
                Delete
              </button>
              <button
                id={`update${note.id}`}
                onClick={(event) => showInput(event, note)}
                disabled={note.done}
              >
                Update
              </button>
              <button
                id={`change${note.id}`}
                onClick={(event) => onUpdate(event, note)}
                className="hidden"
              >
                Add Change
              </button>
              <button
                id={`cancel${note.id}`}
                onClick={(event) => hideInput(event, note)}
                className="hidden"
              >
                Cancel Update
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ListOfToDo;
