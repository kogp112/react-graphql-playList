import * as React from 'react'
import SelectedCategory from '../selected-category'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
};

export default function PulldownCategory() {
    React.useEffect(() => {
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            setCategories(responseJson.data.reddits);
        })
        .catch((error) =>{
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
    )
}

interface Category {
    title: string,
    subGenre: Array<any>
}


