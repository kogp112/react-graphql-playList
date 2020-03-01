import * as React from "react";
import Button from "@material-ui/core/Button";

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
  lists?: string[],
  handleClick?: Function,
}

const getLists = (genre: string, handleClick: Function) => {
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url, opts(genre));
        const responseJson = await response.json();
        handleClick(responseJson['data']['playlist']);
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
};

const GenreButton: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <Button color="secondary"
        onClick={getLists(props.children, props.handleClick)}>
        {props.children}
      </Button>
    </>
  )
}

class SelectedCategory extends React.Component<Props, {}> {
  public render() {
    return (
      <>
        {Object.keys(this.props.genres).map((value, index) => (
          <GenreButton handleClick={this.props.handleClick} children={this.props.genres[index]} />
        ))}
      </>
    );
  }
}

export default SelectedCategory;
