import React, { useState, useRef } from "react";

const Category = () => {
  const formRef = useRef(null);

  const [title, setTitle] = useState("");

  const newList = (event) => {
    event.preventDefault();

    formRef.current.reset();
  };

  //   const fetchCategories async () =>{

  //   }

  const addingTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form ref={formRef}>
      <input
        onChange={addingTitle}
        type="text"
        name="title"
        placeholder="To Do List"
      />
      <button onClick={newList}>New List</button>
    </form>
  );
};

export default Category;
