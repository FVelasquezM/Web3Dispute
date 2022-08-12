import React from 'react';

class ListElement extends React.Component {

    constructor(props){
        super(props);
        this.state = {src: ''};
        this.onLoad = this.onLoad.bind(this);    
    }

    componentWillMount(){
        console.log("PROPS ARGS");
        console.log(this.props.args);
        this.props.loadFunction(... this.props.args).then( (link) => {
            this.onLoad(link);
        })
    }

    onLoad(newSrc){
        console.log("loaded SRC");
        console.log(newSrc);
        this.setState({src: newSrc})
    }

    render(){
        return (
            <img src={this.state.src} style={{width:"100%", "max-width": "200px",}} alt="Loading image ..."/>
        )
    }    

}

export default ListElement;