import * as React from 'react'
import SelectedCategory from '../selected-category'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function PulldownCategory() {
    const [selectValues, setSelectValues] = React.useState<string[]>([]);
    const handleChange = (event: React.ChangeEvent<{value: string[]}>) => {
        event.preventDefault();
        console.log('selectValues is',selectValues);
        setSelectValues(event.target.value);
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
    'Edm',
    'House',
    'Techno'
];
