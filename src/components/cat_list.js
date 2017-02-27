import React from 'react'; 
import CatListItem from './cat_list_item';

const CatList = (props) => {
    if (!props.cats)
        return;

    const allcats = [];
    props.cats.forEach((cat) => {
        allcats.push(
            <CatListItem 
                key={cat.id} 
                catinfo={cat} 
                onCatRemove={props.onCatSelected}/>
        );
    });
    return (
        //list-group 
        <ul className='myList'>
            {allcats}
        </ul>
    );
} ;

export default CatList;