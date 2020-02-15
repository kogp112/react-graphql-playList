import * as React from 'react'
import SelectedCategory from '../selected-category'
//import Select from '@material-ui/core/Select';
//import MenuItem from '@material-ui/core/MenuItem';
import { TreeItem,TreeView } from '@material-ui/lab';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";


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
    subgenres: Category[],
    subgenre: Array<any>
}

const GenreTreeView = (props: PropsType) => {
   console.log('subgenres is',props.subgenres)
    return (
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <SubGenreTreeItem subgenre={props.subgenres} />
      </TreeView>
    );
}

const SubGenreTreeItem = (props: PropsType) => {
  console.log('subgenre is',props.subgenre.subGenreUrlList)
    return (
      <TreeItem nodeId={"1"} label={props.subgenre.title}>
        {Object.keys(props.subgenre.subGenreUrlList).map((category: string, index: number) => (
          <TreeItem
            nodeId={String(index)}
            label={props.subgenre.subGenreUrlList[index]}
          />
        ))}
      </TreeItem>
    )
}

export default function PulldownCategory() {
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
    
    const [selectValues, setSelectValues] = React.useState<string[]>([])
    const [categories, setCategories] = React.useState<Category[]>([])

    const handleChange = (event: React.ChangeEvent<{value: string[]}>) => {
        event.preventDefault()
        setSelectValues(event.target.value)
    }
    
    return (
        <>
            {Object.keys(categories).map((category: string, index: number) => (
                <GenreTreeView subgenres={categories[index]} />
            ))}
        </>
    )
}

/*
return (
    <div>
        <Select name="category" onChange={handleChange} value={selectValues} multiple>
            {Object.keys(categories).map((category: string, index: number) => (
                <MenuItem key={index} value={categories[index].title} >
                    {categories[index].title}
                </MenuItem>
            ))}
        </Select>
        <SelectedCategory category={selectValues} />
    </div>
)*/

