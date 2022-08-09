import React from 'react';

class ListElement extends React.Component {

    constructor(props){
        super(props);
        this.state = {src: ''};
        this.onLoad = this.onLoad.bind(this);    
    }

    componentWillMount(){
        this.props.loadFunction(... this.props.args).then( (link) => {
            this.onLoad(link);
        })
    }

    onLoad(newSrc){
        this.setState({src: newSrc})
    }

    render(){
        return (
            <img src={this.state.src} alt="Loading image ..."/>
        )
    }    

}

export default ListElement;