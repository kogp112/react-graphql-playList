import * as React from 'react'
import SelectedCategory from '../selected-category'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class PulldownCategory extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.state = {category: ''}
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event: React.ChangeEvent) {
        event.preventDefault();
        this.setState({category: event.target.value})
    }
    render() {
        return (
            <div>
                <Select name="category" onChange={this.handleClick} value={selectedCategories} multiple>
                    {categories.map(category => (
                        <MenuItem key={category} value={category} >
                        {category}
                        </MenuItem>
                    ))}
                </Select>
                <SelectedCategory category={this.state.category} />
            </div>
        )
    }
}
const selectedCategories = [];

const categories = [
    'Rock',
    'Edm',
    'House',
    'Techno'
  ];

export default PulldownCategory;