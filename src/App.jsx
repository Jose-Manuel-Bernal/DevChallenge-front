import "./App.css";
import Category from "./components/Category";
//import Form from "./components/Form";
//import ListOfToDo from "./components/ListOfToDo";
import StoreProvider from "./components/StoreProvider";

function App() {
  return (
    <div className="container">
      <h1>To do List App</h1>
      <StoreProvider>
        <Category />
      </StoreProvider>
    </div>
  );
}

export default App;
