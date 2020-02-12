import * as React from 'react'
import SelectedCategory from '../selected-category'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function PulldownCategory() {
    // Update the document title using the browser API
    React.useEffect(() => {
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        })
        .catch((error) =>{
          console.error(error);
        });
    });
    
    const [selectValues, setSelectValues] = React.useState<string[]>([])
    
    const handleChange = (event: React.ChangeEvent<{value: string[]}>) => {
        event.preventDefault()
        setSelectValues(event.target.value)
    }
    
    return (
        <div>
            <Select name="category" onChange={handleChange} value={selectValues} multiple>
                {categories.map(category => (
                    <MenuItem key={category} value={category} >
                        {category}
                    </MenuItem>
                ))}
            </Select>
            <SelectedCategory category={selectValues} />
        </div>
    )
}

const categories = [
    'Rock',
    'EDM',
    'House',
    'Techno'
];

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

