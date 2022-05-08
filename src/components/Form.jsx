import React, { useContext, useState, useRef } from "react";
import { Store } from "./StoreProvider";

const Form = () => {
  const formRef = useRef(null);

  const { state, dispatch } = useContext(Store);

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

  const onDeleteCategory = async (event, category) => {
    event.preventDefault();
    let response = await fetch(
      "http://localhost:8081/to-do/api/delete/category/17",
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      dispatch({
        type: "remove-category",
        payload: category,
      });
    }
  };

  const [message, setMessage] = useState("");

  const addingMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <ul>
        {state.categoryList.map((category) => {
          return (
            <li key={category.id + 1}>
              <form>
                <h1>
                  {category.title}{" "}
                  <button
                    onClick={(event) => onDeleteCategory(event, category)}
                  >
                    Delete
                  </button>
                </h1>
                <br />
                <input
                  onChange={addingMessage}
                  type="text"
                  name="message"
                  placeholder="What do you plan to do?"
                />
                <button onClick={onAdd}>Add note</button>
                <br /> <br />
              </form>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Form;
