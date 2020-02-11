import * as React from 'react'

class SelectedCategory extends React.Component<{category: string[]}, {}> {
    constructor(props: {}) {
        super(props);
    }
    render() {
        return (
            <span>
                {this.props.category}
            </span>
        )
    }
}

export default SelectedCategory;