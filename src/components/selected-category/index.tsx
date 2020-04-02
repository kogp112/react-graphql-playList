import * as React from "react";
import Button from "@material-ui/core/Button";
import { Grid, createMuiTheme, ThemeProvider } from "@material-ui/core";
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

function SelectedCategory(props: Props) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: lightBlue[500],
      },
      secondary: {
        main: pink[500],
      },
    },
  });
  const [buttonColor, setButtonColor] = React.useState("primary");
  const onClickButton = () => {
    setButtonColor("secondary");
  };
  return (
    <Grid>
      <ThemeProvider theme={theme}>
        {Object.keys(props.genres).map((value, index) => (
          <Button color={buttonColor}
            onClick={(event) => {
              getLists(props.genres[index], props.handleClick);
              onClickButton();
              event.preventDefault();
            }}
          >
            {props.genres[index]}
          </Button>
        ))}
      </ThemeProvider>
    </Grid>
  );
}

export default SelectedCategory;
