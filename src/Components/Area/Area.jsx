import React from "react";
import LifeSquare from "../LifeSquare/LifeSquare";
import '../Area/Area.css';

export default function Area ({...prop}) {
    let ter = prop.territory;
    
    return (
        <div className="container">
            {ter.map((item, i) => (
                <LifeSquare key={i} row={prop.lifeCicleRow} idx={i} callFun={prop.fop} color={item} info={item}/>
            ))}
        </div>
    )
}