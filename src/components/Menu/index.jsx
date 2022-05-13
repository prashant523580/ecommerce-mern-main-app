import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory} from '../../actions';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
// import { NavLink } from 'react-router-dom';
import "./style.css";
function Menu(props) {
    const [navWidth,setNavWidth] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory());
        // dispatch(getInitialData());  
      },[]);
    const category = useSelector(state => state.category)
        const renderCategory = (categories) => {
        
            let category_list = [];
        for (var category of categories) {
            category_list.push(
                <li key={category.name}>
                    {
                        category.parentId ?<>
                         {/* <div className="nav-header"> 
                    <div  className='nav-back-btn'>back</div>
                    <div className="dropdown-btn">down</div>
                     </div> */}
                         <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}> {category.name}</a> 
                        </>
                         :
                         <>
                        <div> {category.name}</div>
                        </>
                    }
                    {category.children.length > 0 ? (<ul> 
                    
                        {renderCategory(category.children)} </ul>) : null}
                </li>
            )
        }
        return category_list;
    }
    
    const toggleNav = () => {
        if(navWidth == 0){
            setNavWidth(200)
        }else{
            setNavWidth(0)
        }
    }
    const nextNav = (e) => {
        console.log(e)  
    }
    // if(navWidth < 2){
    //     window.addEventListener("click",() => {
    
    //             setNavWidth(0)
    //         })
    //     }
    return (

            <nav className="nav">
            <button className='menu-btn' onClick={toggleNav}><MenuIcon/></button>
            <ul>
        
               {category.categories.length > 0 ? renderCategory(category.categories) : null} 
            </ul>
        </nav>
    )
}
export default Menu;

