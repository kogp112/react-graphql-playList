import * as React from "react";
import { createStyles, Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default function SelectedCategory(props: Props) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "display": "flex",
        "justifyContent": "flex-start",
        "flexWrap": "wrap",
        "& > *": {
          margin: theme.spacing(0.5),
        },
      },
    }),
  );
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      {Object.keys(props.genres).map((value, index) => (
        <CategoryButton key={value} text={props.genres[index]} onClickCategoryButton={props.handleClick} />
      ))}
    </Grid >
  );
}

const CategoryButton: React.FunctionComponent<CategoryButtonProps> = (props: CategoryButtonProps) => {
  const [buttonText, setButtonText] = React.useState("");
  if (buttonText === props.text) {
    return (
      <Button style={{ backgroundColor: "pink", color: "black" }}
        onClick={(event) => {
          getMusicLists(props.text, props.onClickCategoryButton);
          setButtonText(props.text);
          event.preventDefault();
        }}
      >{props.text}</Button>
    );
  } else {
    return (
      <Button style={{ backgroundColor: "blue", color: "white" }}
        onClick={(event) => {
          getMusicLists(props.text, props.onClickCategoryButton);
          setButtonText(props.text);
          event.preventDefault();
        }}
      >{props.text}</Button>
    );
  }
};

function getMusicLists(genre: string, onClick: (e: MusicList) => void) {
  const json = (param: string) => `{
      playlist(redditUrls: ["` + param + `"]) {
        name
        songs {
          name
          url
          imageUrl
        }
      }
    }
  `;
  const url = "https://reddit-music-graphql.herokuapp.com/";
  const opts = (param: string) => {
    const query = json(param);
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    };
  };

  async function fetchData() {
    try {
      const response = await fetch(url, opts(genre));
      const responseJson = await response.json();
      const eventData = responseJson.data.playlist;
      onClick(eventData[0]);
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();
}

interface Props {
  genres: string[];
  handleClick: (event: MusicList) => void;
}

interface CategoryButtonProps {
  text: string;
  onClickCategoryButton: (event: MusicList) => void;
}

interface MusicList {
  name: string;
  songs: Songs[];
}

interface Songs {
  name: string;
  url: string;
  imageUrl: string;
}
