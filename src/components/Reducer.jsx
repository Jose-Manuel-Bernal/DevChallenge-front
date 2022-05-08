function reducer(state, action) {
  switch (action.type) {
    case "get-notes":
      // const stateWithAllTheNotes = {
      //   ...state,
      //   listOfNotes: action.payload,
      // };
      return null;
    case "add-note":
      // const newNote = action.payload;
      // const newListOfNotesAddedOne = [...state.listOfNotes, newNote];
      // const newStateAddNote = {
      //   ...state,
      //   listOfNotes: newListOfNotesAddedOne,
      // };
      return null;
    case "remove-note":
      // const newListOfNotesWithoutPayloadNote = state.listOfNotes.filter(
      //   (note) => note.id !== action.payload.id
      // );
      // const newStateWithNoteDeleted = {
      //   ...state,
      //   listOfNotes: newListOfNotesWithoutPayloadNote,
      // };
      return null;
    case "update-note":
      // const newListOfNotes = state.listOfNotes.map((note) => {
      //   if (note.id === action.payload.id) {
      //     return action.payload;
      //   }
      //   return note;
      // });

      // const newStateModifiedCheckbox = {
      //   ...state,
      //   listOfNotes: newListOfNotes,
      // };
      return null;
    case "add-category":
      const newCategory = action.payload;
      const newListOfCategories = [...state.categoryList, newCategory];
      const newStateAddCategory = {
        ...state,
        categoryList: newListOfCategories,
      };
      return newStateAddCategory;
    case "get-categories":
      const stateWithAllCategories = {
        ...state,
        categoryList: action.payload.categoryList,
      };
      console.log(action.payload);
      return stateWithAllCategories;
    case "remove-category":
      const newListOfCategoriesWithoutPayloadCategory =
        state.categoryList.filter(
          (category) => category.id !== action.payload.id
        );
      const newStateWithoutCategoryDeleted = {
        ...state,
        categoryList: newListOfCategoriesWithoutPayloadCategory,
      };
      return newStateWithoutCategoryDeleted;
  }
}

export default reducer;
