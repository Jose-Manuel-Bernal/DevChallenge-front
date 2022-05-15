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
    <form className="row g-3 m-4" ref={formRef}>
      <div className="col-md-6">
        <input
          className="form-control"
          onChange={addingTitle}
          type="text"
          name="title"
          placeholder="To Do List"
        />
      </div>
      <div className="col-md-6">
        <input
          className="form-control"
          onChange={addingTag}
          type="text"
          name="tag"
          placeholder="Note tag"
        />
      </div>
      <button className="btn btn-primary" onClick={newList}>
        New List
      </button>
    </form>
  );
};

export default Category;
