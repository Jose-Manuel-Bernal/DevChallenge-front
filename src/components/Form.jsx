import React, { useContext, useState, useRef, useEffect } from "react";
import { Store } from "../state/StoreProvider";
import ListOfToDo from "./ListOfToDo";

const Form = () => {
  const formRef = useRef(null);

  const { state, dispatch } = useContext(Store);

  const [message, setMessage] = useState("");

  const [searchValue, setSearchValue] = useState("");

  const onAddNote = async (event, category) => {
    event.preventDefault();
    if (message) {
      const noteFromForm = {
        message,
        done: false,
        idOfCategory: category.id,
      };

      let noteSavedPromise = await fetch(
        "http://localhost:8081/to-do/api/save/note",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(noteFromForm),
        }
      );

      let noteSaved = await noteSavedPromise.json();

      dispatch({
        type: "add-note",
        payload: noteSaved,
      });
      //formRef.current.reset();
      setMessage("");
    }
  };

  const onDeleteCategory = async (event, category) => {
    event.preventDefault();
    let response = await fetch(
      `http://localhost:8081/to-do/api/delete/category/${category.id}`,
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

  const addingMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <form className="col-md-6">
        <input
          className="form-control"
          onChange={handleChangeSearchValue}
          type="text"
          name={searchValue}
          placeholder="Filter tag"
        />
      </form>
      <ul className="card p-5">
        {console.log(state.categoryList)}
        {state.categoryList
          .filter((category) =>
            category.tag.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((category) => {
            return (
              <li key={category.id + 1}>
                <form>
                  <h1>
                    {category.title}{" "}
                    <button
                      className="btn btn-outline-danger"
                      onClick={(event) => onDeleteCategory(event, category)}
                    >
                      Delete
                    </button>
                  </h1>
                  <h3>#{category.tag} </h3>
                  <br />
                  <input
                    className="form-control"
                    value={message}
                    onChange={addingMessage}
                    type="text"
                    name="message"
                    placeholder="What do you plan to do?"
                  />
                  <button
                    className="btn btn-primary"
                    onClick={(event) => onAddNote(event, category)}
                  >
                    Add note
                  </button>
                  <br />
                  <ListOfToDo category={category} />
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
