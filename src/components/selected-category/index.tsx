import * as React from "react";
import Button from "@material-ui/core/Button";
import { Grid, createMuiTheme, ThemeProvider, makeStyles, createStyles, Theme } from "@material-ui/core";
import { lightBlue, pink } from "@material-ui/core/colors";

const json = (genre: string) => `{
    playlist(redditUrls: ["` + genre + `"]) {
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

const opts = (genre: string) => {
  const query = json(genre);
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  };
};

interface Props {
  genres: string[];
  handleClick: (event: string[]) => void;
}

interface PropsType {
  text?: string;
}

function getLists(genre: string, handleClick: Function) {
  async function fetchData() {
    try {
      const response = await fetch(url, opts(genre));
      const responseJson = await response.json();
      handleClick(responseJson['data']['playlist']);
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "flex-start",
      flexWrap: "wrap",
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }),
);

const theme = createMuiTheme({
  spacing: 2,
  palette: {
    primary: {
      main: lightBlue[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

function SelectedCategory(props: Props) {
  const classes = useStyles();
  const [buttonText, setButtonText] = React.useState("");

  const onClickButton = (value: string) => {
    setButtonText(value);
  };

  const ShowButton: React.FunctionComponent<PropsType> = (prop) => {
    if (prop.text === buttonText) {
      return (
        <Button variant="contained" color="secondary"
          onClick = {(event) => {
            getLists(prop.text, props.handleClick);
            onClickButton(prop.text);
            event.preventDefault();
          }}
        >{prop.text}</Button>
        )
    } else {
      return (
        <Button variant="contained" color="primary"
          onClick={(event) => {
            getLists(prop.text, props.handleClick);
            onClickButton(prop.text);
            event.preventDefault();
          }}
        >{prop.text}</Button>
      )
    }
  };

  return (
    <Grid className={classes.root}>
      <ThemeProvider theme={theme}>
        {Object.keys(props.genres).map((value, index) => (
          <ShowButton text={props.genres[index]} />
        ))}
      </ThemeProvider>
    </Grid >
  );
}

export default SelectedCategory;
