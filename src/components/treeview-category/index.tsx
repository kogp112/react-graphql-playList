import * as React from "react";
import { TreeItem, TreeView } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";

export default function TreeViewCategory(props: Props) {
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

  const useStyles = makeStyles({
    root: {
      maxWidth: 400,
    },
  });

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

  const [categories, setCategories] = React.useState<Categories[] | []>([]);

  const classes = useStyles();
  return (
    <>
      {Object.keys(categories).map((key: string, index: number) => (
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          multiSelect
          key={key}
        >
          <TreeItemCategory subgenre={categories[index]} onClickTreeItem={props.handleClick} />
        </TreeView>
      ))}
    </>
  );
}

const TreeItemCategory: React.FunctionComponent<TreeItemProps> = (props) => {
  const title = props.subgenre.title;
  const subGenreUrlList = props.subgenre.subGenreUrlList;
  const renderLabel = (item: string) => (
    <span
      onClick={(event) => {
        props.onClickTreeItem(splitGenreName(item));
        event.preventDefault();
      }}
    >
      {splitGenreName(item)}
    </span>
  );

  return (
    <>
      <TreeItem nodeId={title} label={title}>
        {Object.keys(subGenreUrlList).map((key: string, index: number) => (
          <TreeItem
            key={key}
            nodeId={key}
            label={renderLabel(subGenreUrlList[index])}
          />
        ))}
      </TreeItem>
    </>
  );
};

function splitGenreName(name: string) {
  const splitName = name.split("\/r\/");
  return splitName[1];
}

interface Categories {
  title: string;
  subGenreUrlList: string[];
}

interface Props {
  handleClick: (event: string) => void;
}

interface TreeItemProps {
  subgenre: Categories;
  onClickTreeItem: (event: string) => void;
}
