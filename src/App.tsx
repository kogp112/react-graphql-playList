import * as React from "react";
import TreeViewCategory from "./components/treeview-category";
import SelectedCategory from "./components/selected-category";
import PlayList from "./components/play-list";
import MovieArea from "./components/movie-area";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import { createMuiTheme } from "@material-ui/core/styles";
import styled, { ThemeProvider } from "styled-components";
import {
  palette,
  PaletteProps,
  spacing,
  SpacingProps,
  typography,
  TypographyProps,
} from "@material-ui/system";

export default function App() {

  const Box = styled.div<
  PaletteProps & SpacingProps & TypographyProps
  >`${palette}${spacing}${typography}`;

  const theme = createMuiTheme();

  const [selectValues, setSelectValues] = React.useState<string[]>([]);
  const [playLists, setPlayLists] = React.useState<string[]>([""]);
  const [musicUrl, setMusicUrl] = React.useState<string>("");

  const onClickTreeView = (event: string) => {
    setSelectValues([...selectValues, event]);
  };

  const onClickSelectedCategory = (event: string[]) => {
    setPlayLists(event);
  };

  const onClickPlayList = (event: string) => {
    setMusicUrl(event);
  };

  function CenterRow() {
    return (
      <React.Fragment>
        <Grid item>
          <SelectedCategory
            genres={selectValues}
            handleClick={onClickSelectedCategory}
          />
        </Grid>
        <Grid item>
          <MovieArea
            url={musicUrl}
          />
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={{ xs: "h6.fontSize", sm: "h4.fontSize", md: "h3.fontSize" }}
          p={{ xs: 2, sm: 3, md: 4 }}
        >Music PlayList
        </Box>
      </ThemeProvider>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TreeViewCategory handleClick={onClickTreeView} />
        </Grid>
        <Grid item xs={5}>
          <CenterRow />
        </Grid>
        <Grid item xs={4}>
          <PlayList list={playLists} handleClickPlayList={onClickPlayList} />
        </Grid>
      </Grid>
    </>
  );
}
