import * as React from "react";
import TreeViewCategory from "./components/treeview-category";
import SelectedCategory from "./components/selected-category";
import PlayList from "./components/play-list";
import "./App.css";

export default function App() {
  const [selectValues, setSelectValues] = React.useState<string[]>([]);
  const [selectLists, setSelectLists] = React.useState<string[]>([]);

  const handleClick = (event: React.ChangeEvent<{ value: string[] }>) => {
    setSelectValues([...selectValues, event]);
  };

  const handleClickButton = (event: React.ChangeEvent<{ value: string[] }>) => {
    console.log('select event list is', event);
    setSelectLists(event);
  };

  return (
    <>
      <h1 className="h1">Reddit PlayList</h1>
      <div className="TreeViewCategory">
        <TreeViewCategory handleClick={handleClick} />
      </div>
      <div className="SelectedCategory">
        <SelectedCategory genres={selectValues} handleClick={handleClickButton} />
      </div>
      <div className="PlayList">
        <PlayList list={selectLists} />
      </div>
    </>
  );
}
