import * as React from "react";
import TreeViewCategory from "./components/treeview-category";
import SelectedCategory from "./components/selected-category";
import PlayList from "./components/play-list";
import MovieArea from "./components/movie-area";
import "./App.css";
import Grid from "@material-ui/core/Grid";

export default function App() {
  const [selectValues, setSelectValues] = React.useState<string[]>([]);
  const [selectLists, setSelectLists] = React.useState<string[]>([]);
  const [selectUrl, setSelectUrl] = React.useState<string>();

  const handleClick = (event: React.ChangeEvent<{ value: string[] }>) => {
    setSelectValues([...selectValues, event]);
  };

  const handleClickButton = (event: React.ChangeEvent<{ value: string[] }>) => {
    setSelectLists(event);
  };

  const handleClickPlayList = (event: React.ChangeEvent<{ value: string }>) => {
    setSelectUrl(event);
  };

  return (
    <>
      <h1 className="h1">Reddit PlayList</h1>
      <Grid container spacing={1}>
        <Grid item>
          <TreeViewCategory handleClick={handleClick} />
        </Grid>
        <Grid item>
          <SelectedCategory genres={selectValues} handleClick={handleClickButton} />
          <MovieArea url={selectUrl} />
        </Grid>
        <Grid item>
          <PlayList list={selectLists} handleClickPlayList={handleClickPlayList} />
        </Grid>
      </Grid>
    </>
  );
}
