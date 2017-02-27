import React, {Component} from "react"; 

//{video} = the param has a property called video. please grab the property 
//and put the the variables called video

class CatListItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            errorFlag: false,
            style: {},
        };

        this.catinfo = props.catinfo;
        this.onCatRemove = props.onCatRemove;
        this.imgUrl = this.catinfo.url;
        this.fact = this.catinfo.fact;

        this.onImageError = this.onImageError.bind(this);
        this.onImageSuccess = this.onImageSuccess.bind(this);
    }

    onImageError () { 
        // if image wasn't loaded, not render this li element
        this.setState({errorFlag: true});
        // tell app to remove this cat info from cats map
        this.onCatRemove(this.catinfo);
    }

    onImageSuccess ({target:img}) {
        // when image loaded, set the text width to be the same as image width
        this.setState({style: {width:img.clientWidth + "px"}});
    }

    render () {
        if (this.state.errorFlag)
            return null;
        //else
        return (
            <li className="myListItem"
                key={this.catinfo.id}
                onClick={()=>this.onCatRemove(this.catinfo)}>
                <img src={this.imgUrl} onError={this.onImageError} onLoad={this.onImageSuccess}/>
                <p className="fact" style={this.state.style}>{this.fact}</p>
            </li>
        );
    }
}

export default CatListItem;
