import { Link } from '@mui/material';
import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import "./style.css";
function Menu(props) {
    const category = useSelector(state => state.category)
        const renderCategory = (categories) => {
        
            let category_list = [];
        for (var category of categories) {
            category_list.push(
                <li key={category.name}>
                    {
                        category.parentId ? <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a> :
                        <span> {category.name}</span>
                    }
                    {category.children.length > 0 ? (<ul>{renderCategory(category.children)} </ul>) : null}
                </li>
            )
        }
        return category_list;
    }
    return (
        <nav className="nav">
            <ul>
               {category.categories.length > 0 ? renderCategory(category.categories) : null} 
            </ul>
        </nav>
    )
}
export default Menu;

