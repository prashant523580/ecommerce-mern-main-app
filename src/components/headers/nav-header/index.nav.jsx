import React, { useState } from "react";
import "./modal.css";
import "./dropdown.css";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
const Modal = (props) => {
    if (!props.visible) {
        return null;
    }

    return (
        <div className="modal-main">

        <div className={props.classname ? `modal ${props.classname}` : `modal`}>
                {props.title &&
                
                <div className="modal-header">
                <h4>{props.title} </h4>
                <span className="close" onClick={props.onClick}>X</span>             
            </div>
                }
            <div className="modal-body">
                {props.children}
            </div>
        </div>
                </div>
    )
}
const Dropdown = (props) => {
    const [isDropDown,setIsDropDown] = useState(false);
    const toggleDropdown = () => {
        if(isDropDown){
            setIsDropDown(false)
        }else{
            setIsDropDown(true);
        }
    }
    
    return (
        <div className="dropdown" onClick={toggleDropdown}>
            <div className={isDropDown ? `dropdown-btn active-lightblue` : "dropdown-btn"}>{props.menu}</div>
            {isDropDown && <div className="dropdown-content">
                <ArrowDropUpIcon> </ArrowDropUpIcon>
                <div className="dropdown-links">
                    {props.setFormMenu}
                    {props.menus.map((navLi, ind) =>
                        <a key={ind}
                        href={navLi.href}
                        onClick={(e) => {
                            if(navLi.onClick){
                                e.preventDefault();
                                navLi.onClick && navLi.onClick()
                            }
                        }}
                        > {navLi.label}</a>
                    )}
                </div>
            </div>}
        </div>
    )
}

export { Modal, Dropdown };