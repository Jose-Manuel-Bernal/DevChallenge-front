import React, { useContext, useState, useRef } from "react";
import { Store } from "./StoreProvider";

const Form = () => {
  const formRef = useRef(null);

  const onAdd = async (event) => {
    event.preventDefault();
    // if (title && message) {
    //   const noteFromForm = {
    //     title,
    //     message,
    //     done: false,
    //   };

    //   let noteSavedPromise = await fetch(
    //     "http://localhost:8081/api/save/note",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //       body: JSON.stringify(noteFromForm),
    //     }
    //   );

    //   let noteSaved = await noteSavedPromise.json();

    //   dispatch({
    //     type: "add-note",
    //     payload: noteSaved,
    //   });

    // }
    formRef.current.reset();
  };

  const { state, dispatch } = useContext(Store);

  const [message, setMessage] = useState("");

  const addingMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <ul>
        {state.map((category) => {
          return (
            <li>
              <form>
                {state.map((category) => {
                  <h1>category.title</h1>;
                })}
                <label>Message: </label>
                <input onChange={addingMessage} type="text" name="message" />
                <button onClick={onAdd}>Add note</button>
              </form>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Form;
