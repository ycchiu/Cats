import React, {Component} from "react"; 

//{video} = the param has a property called video. please grab the property 
//and put the the variables called video

class CatListItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            show: true,
            textStyle: {},
            compClass: ["myListItem"],
        };

        this.catinfo = props.catinfo;
        this.onCatRemove = props.onCatRemove;
        this.imgUrl = this.catinfo.url;
        this.fact = this.catinfo.fact;

        this.onImageError = this.onImageError.bind(this);
        this.onImageSuccess = this.onImageSuccess.bind(this);
        this.onClickAndRemove = this.onClickAndRemove.bind(this);
        this.transitionEnd = this.transitionEnd.bind(this);
    }
    
    onImageSuccess ({target:img}) {
        // when image loaded, set the text width to be the same as image width
        this.setState({textStyle: {width:img.clientWidth + "px"}});

        // add 'addImage' css class to component
        this.setState({compClass: ["myListItem", "addImage"]});
    }

    onImageError () { 
        // if image wasn't loaded, not render this li element
        this.setState({show: false});

        // tell app to remove this cat info from cats map
        this.onCatRemove(this.catinfo);
    }

    onClickAndRemove () {
        // add 'removeImage' css class to component
        this.setState({compClass: ["myListItem", "removeImage"]});
    }

    transitionEnd () {
        if (this.state.compClass.indexOf("removeImage") > -1) {
            this.onCatRemove(this.catinfo);
        }
    }

    render () {
        if (!this.state.show)
            return null;
        //else
        return (
            <li className={this.state.compClass.join(" ")}
                key={this.catinfo.id}
                onTransitionEnd={this.transitionEnd}
                onClick={this.onClickAndRemove}>
                <img src={this.imgUrl} 
                    onError={this.onImageError} 
                    onLoad={this.onImageSuccess}/>
                <p className="fact" style={this.state.textStyle}>{this.fact}</p>
            </li>
        );
    }
}

export default CatListItem;
