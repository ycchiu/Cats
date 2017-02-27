import React, {Component} from "react"; 
import ReactDOM from "react-dom";
import DataServer from "./services/dataserver";
import CatList from "./components/cat_list";
import ScrollDetector from "./components/scroll_detector";


class App extends Component {
    constructor (props) {
        super(props);
        this.state = {cats: new Map()};
        this.server = new DataServer();
        
        this.load();
    }

    load () {
        Promise.all([this.server.loadImages(), this.server.loadFacts()])
                .then(values => {
                    let images = values[0];
                    let facts = values[1];
                    let cats = this.state.cats;
                    for(let i=0; i<images.length; i++) {
                        let cat = images[i];
                        cat.fact = facts[i];
                        cats.set(cat.id, cat);
                    }
                    this.setState({cats});
                });
    }

    reload () {
        if (this.state.cats.size === 0)
            return;
        //else
        this.load();
    }

    removeCat (clickedCat) {
        if (!clickedCat)
            return;
        let cats = this.state.cats;
        cats.delete(clickedCat.id);
        this.setState(cats);
    }

    render () {
        return (
            <div>
            <CatList 
                cats={this.state.cats}
                onCatSelected={(clickedCat) =>{this.removeCat(clickedCat)}} />
            <ScrollDetector
                onPageBottom={()=>this.reload()}/>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.querySelector(".myContainer"));