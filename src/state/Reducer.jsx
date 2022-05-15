function reducer(state, action) {
  switch (action.type) {
    case "get-notes":
      // const stateWithAllTheNotes = {
      //   ...state,
      //   listOfNotes: action.payload,
      // };
      return null;
    case "add-note":
      const newNote = action.payload;
      const categoryFiltered = state.categoryList.filter(
        (category) => newNote.idOfCategory === category.id
      )[0];
      const newListOfNotes = [...categoryFiltered.notes, newNote];
      const categoryWithNote = { ...categoryFiltered, notes: newListOfNotes };
      const newListOfCategoriesForNewNote = state.categoryList.map(
        (category) => {
          if (category.id === categoryWithNote.id) {
            return categoryWithNote;
          }
          return category;
        }
      );
      const newStateWithNote = {
        ...state,
        categoryList: newListOfCategoriesForNewNote,
      };
      return newStateWithNote;
    case "remove-note":
      const noteToRemove = action.payload;
      const categoryForRemove = state.categoryList.filter(
        (category) => noteToRemove.idOfCategory === category.id
      )[0];
      const updatedListForRemove = categoryForRemove.notes.filter(
        (note) => note.id !== noteToRemove.id
      );
      const categoryWithoutNote = {
        ...categoryForRemove,
        notes: updatedListForRemove,
      };
      const newListOfCategoriesWithoutNote = state.categoryList.map(
        (category) => {
          if (category.id === categoryWithoutNote.id) {
            return categoryWithoutNote;
          }
          return category;
        }
      );
      const newStateWithoutNote = {
        ...state,
        categoryList: newListOfCategoriesWithoutNote,
      };
      return newStateWithoutNote;
    case "update-note":
      const updatedNote = action.payload;
      const categoryToFilter = state.categoryList.filter(
        (category) => updatedNote.idOfCategory === category.id
      )[0];
      const updatedListOfNotes = categoryToFilter.notes.map((note) => {
        if (note.id === updatedNote.id) {
          return updatedNote;
        }
        return note;
      });
      const categoryWithUpdatedNote = {
        ...categoryToFilter,
        notes: updatedListOfNotes,
      };
      const newListOfCategoriesForUpdatedNote = state.categoryList.map(
        (category) => {
          if (category.id === categoryWithUpdatedNote.id) {
            return categoryWithUpdatedNote;
          }
          return category;
        }
      );
      const newStateWithUpdatedNote = {
        ...state,
        categoryList: newListOfCategoriesForUpdatedNote,
      };
      return newStateWithUpdatedNote;
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
