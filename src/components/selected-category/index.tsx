import * as React from 'react'

interface Props {
    category: string[],
}

class SelectedCategory extends React.Component<Props, {}> {
    render() {
        console.log('category is',this.props.category);
        return (
            <>
            {Object.keys(this.props.category).map((category: string, index: number) => (
                <span>
                    {category}
                </span>
            ))}
            </>
        )
    }
}

export default SelectedCategory;