import React, {Component} from 'react'; 


class ScrollDetector extends Component {
    constructor(props) {
        super(props);        
        this.handlePageReachBottom = props.onPageBottom;
        this.handleScroll = this.handleScroll.bind(this);        
    }

    handleScroll() {
        const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max( body.scrollHeight, 
                                    body.offsetHeight, 
                                    html.clientHeight, 
                                    html.scrollHeight, 
                                    html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        
        if (windowBottom >= docHeight) {            
            this.handlePageReachBottom();
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return <div></div>;
    }
}

export default ScrollDetector;
