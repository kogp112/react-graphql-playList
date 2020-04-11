import * as React from "react";
import { TreeItem, TreeView } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";

const query = `
  query {
    reddits {
      title
      subGenreUrlList
    }
  }
`;

const url = "https://reddit-music-graphql.herokuapp.com/";

const opts = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query }),
};

interface PropsType {
  subgenre?: {
    title: string;
    subGenreUrlList: string[];
  } | null;
  subgenres?: {
    title: string;
    subGenreUrlList: string[];
  } | null;
  category?: string[];
  handleClick: (event: string) => void;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
});

const GenreTreeView: React.FunctionComponent<PropsType> = (props) => {
  const classes = useStyles();
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
    >
      <SubGenreTreeItem subgenre={props.subgenres} handleClick={props.handleClick} />
    </TreeView>
  );
};

const SubGenreTreeItem: React.FunctionComponent<PropsType> = (props) => {
  const renderLabel = (item: string) => (
    <span
      onClick={(event) => {
        props.handleClick(splitGenreName(item));
        event.preventDefault();
      }}
    >
      {splitGenreName(item)}
    </span>
  );

  if (props.subgenre) {
    return (
      <>
        <TreeItem nodeId={"1"} label={props.subgenre.title}>
          {Object.keys(props.subgenre.subGenreUrlList).map((category: string, index: number) => (
            <TreeItem
              key={String(index)}
              nodeId={String(index)}
              label={renderLabel(props.subgenre.subGenreUrlList[index])}
            />
          ))}
        </TreeItem>
      </>
    );
  } else {
    return null;
  }
};

function splitGenreName(name: string) {
  const splitName = name.split("\/r\/");
  return splitName[1];
}

export default function TreeViewCategory(props: PropsType) {
  React.useEffect(() => {
    fetch(url, opts)
      .then((response) => response.json())
      .then((responseJson) => {
        setCategories(responseJson.data.reddits);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [categories, setCategories] = React.useState<string[][]>([]);

  return (
    <>
      {Object.keys(categories).map((category: string, index: number) => (
        <GenreTreeView subgenres={categories[index]} handleClick={props.handleClick} />
      ))}
    </>
  );
}
