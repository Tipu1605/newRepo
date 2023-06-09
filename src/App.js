import { useState } from "react";
import "./App.css";
import FormElement from "./components/FormElement/FormElement";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import FilterSection from "./components/FilterSection/FilterSection";

function App() {
  const [data, setData] = useState([])
  const [item, setItem] = useState('')
  const [filter, setFilter] = useState(0)
  return (
    <div className="App">
      <Header />
      <FormElement setData={setData} data={data} item={item} setItem={setItem}/>
      <List setData={setData} data={data} filter={filter}/>
      <FilterSection setFilter={setFilter}/>
    </div>
  );
}

export default App;
