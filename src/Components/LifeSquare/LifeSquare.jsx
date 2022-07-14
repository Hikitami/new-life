import React from "react";
import '../LifeSquare/LifeSquare.css';
export default function LifeSquare ({...prop}) {
    return (
        <div onClick={(e) => prop.callFun(prop.row, prop.idx)} className="lifeColor" style={prop.info == true ? {backgroundColor: 'green'} : {}}></div>
    )
}  