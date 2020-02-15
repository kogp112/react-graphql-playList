import * as React from 'react';
import { TreeItem,TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SelectedCategory from '../selected-category';

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
    body: JSON.stringify({ query })
}

interface Category {
    title: string,
    categories: Array<any>
}

type PropsType = {
    subgenres?: Array<string>,
    subgenre?: string[],
    handleClick?: Function
}

const GenreTreeView: React.FunctionComponent<PropsType> = (props) => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <SubGenreTreeItem subgenre={props.subgenres} handleClick={props.handleClick} />
    </TreeView>
  );
}

const SubGenreTreeItem: React.FunctionComponent<PropsType> = (props) => {
  const renderLabel = item => (
    <span
      onClick={event => {
        props.handleClick(item)
        event.preventDefault()
      }}
    >
      {splitGenreName(item)}
    </span>
  )
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
    )
  } else {
    return null
  }
}

function splitGenreName(name: string) {
  let splitName = name.split('\/r\/')
  return splitName[1]
}

export default function TreeViewCategory() {
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
    
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [selectValues, setSelectValues] = React.useState<string[]>([])
    
    const handleClick = (event: React.ChangeEvent<{value: string}>) => {
      console.log('event',event)
      let values = [];
      let newvalue = splitGenreName(event);
      selectValues.push(newvalue);
      console.log('values',typeof selectValues)
      setSelectValues(selectValues)
    }
    
    return (
        <>
            {Object.keys(categories).map((category: string, index: number) => (
                <GenreTreeView key={String(index)} subgenres={categories[index]} handleClick={handleClick} />
            ))}
            <SelectedCategory category={selectValues} />
        </>
    )
}


