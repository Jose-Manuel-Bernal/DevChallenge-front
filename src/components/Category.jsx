import React, { useContext, useState, useRef, useEffect } from "react";
import { Store } from "./StoreProvider";

const Category = () => {
  const { state, dispatch } = useContext(Store);

  const [title, setTitle] = useState("");

  const [tag, setTag] = useState("");

  const formRef = useRef(null);

  useEffect(() => {
    let categoyList = fetchAllCategories().then((categories) => {
      let action = {
        type: "get-categories",
        payload: categories,
      };
      dispatch(action);
    });
  }, []);

  const fetchAllCategories = async () => {
    let response = await fetch("http://localhost:8081/to-do/api/get/dto");
    let data = await response.json();
    return data;
  };

  const newList = async (event) => {
    event.preventDefault();
    if (title && tag) {
      const newCategory = {
        title,
        tag,
      };

      let categorySavedPromise = await fetch(
        "http://localhost:8081/to-do/api/save/category",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newCategory),
        }
      );

      let categorySaved = await categorySavedPromise.json();

      dispatch({
        type: "add-category",
        payload: categorySaved,
      });

      formRef.current.reset();
    }
  };

  const addingTitle = (e) => {
    setTitle(e.target.value);
  };

  const addingTag = (e) => {
    setTag(e.target.value);
  };

  return (
    <form ref={formRef}>
      <input
        onChange={addingTitle}
        type="text"
        name="title"
        placeholder="To Do List"
      />
      <input
        onChange={addingTag}
        type="text"
        name="tag"
        placeholder="Note tag"
      />
      <button onClick={newList}>New List</button>
    </form>
  );
};

export default Category;
