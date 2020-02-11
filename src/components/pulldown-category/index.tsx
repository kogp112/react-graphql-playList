import * as React from 'react'
import SelectedCategory from '../selected-category'

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
            <select name="category" onChange={this.handleClick}>
                <option value="rock">Rock</option>
                <option value="EDM">EDM</option>
                <option value="techno">Techno</option>
            </select>
            <SelectedCategory category={this.state.category} />
            </div>
        )
    }
}

export default PulldownCategory;