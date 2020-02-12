import * as React from 'react'

interface Props {
    category: string[],
}

class SelectedCategory extends React.Component<Props, {}> {
    render() {
        return (
            <span>
                {this.props.category}
            </span>
        )
    }
}

export default SelectedCategory;