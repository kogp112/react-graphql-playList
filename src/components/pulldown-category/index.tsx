import * as React from 'react';

class pulldownCategory extends React.Component {
    render() {
        return (
            <select name='category'>
                <option value='rock'>Rock</option>
                <option value='EDM'>EDM</option>
                <option value='classic'>Classic</option>
                <option value='house'>House</option>
                <option value='techno'>Techno</option>
            </select>
        )
    }
};

export default pulldownCategory;