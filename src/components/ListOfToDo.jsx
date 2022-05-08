import React, { useContext, useEffect } from "react";
import { Store } from "./StoreProvider";

const ListOfToDo = ({ category }) => {
  const { state, dispatch } = useContext(Store);

  // useEffect(() => {
  //   let listOfNote = fetchAllNotes().then((notes) => {
  //     let action = {
  //       type: "get-notes",
  //       payload: notes,
  //     };
  //     dispatch(action);
  //   });
  // }, []);

  // const fetchAllNotes = async () => {
  //   let response = await fetch("http://localhost:8081/api/get/notes");
  //   let data = await response.json();
  //   return data;
  // };

  //const onCheckbox = async (event, note) => {
  //   const checked = event.currentTarget.checked;

  //   let noteWithCheckeboxInformation = { ...note, done: checked };

  //   let noteUpdatedPromise = await fetch(
  //     "http://localhost:8081/api/update/note",
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(noteWithCheckeboxInformation),
  //     }
  //   );

  //   let noteUpdated = await noteUpdatedPromise.json();

  //   dispatch({
  //     type: "update-note",
  //     payload: noteUpdated,
  //   });
  //};

  // const onDelete = async (note) => {
  //   let response = await fetch(
  //     `http://localhost:8081/api/delete/note/${note.id}`,
  //     {
  //       method: "DELETE",
  //     }
  //   );

  //   if (response.status === 200) {
  //     dispatch({
  //       type: "remove-note",
  //       payload: note,
  //     });
  //   }
  // };
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
                //onChange={(event) => onCheckbox(event, note)}
                type="checkbox"
                checked={note.done}
              />
              <button onClick={() => onDelete(note)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ListOfToDo;
