import { useContext, useState } from "react";
import { MyContext } from "../context";

export const AddMovie = () => {

    const context = useContext(MyContext);
    
    return(
        <div>
            <input type="text" name="Title" placeholder="Title" onChange={(e) => context.setNewMovieTitle(e.target.value)}/>
            <input type="number" name="YOR" placeholder="Release Year" onChange={(e) => context.setNewReleaseDate(Number(e.target.value))}/>
            <input type="checkbox" name="oscar" id="checkOscar" checked={context.newIsOscar} onChange={(e)=>{context.setIsOscar(e.target.checked)}}/>
            <label htmlFor="checkOscar">Received an oscar?</label>
            <button onClick={context.onSubmitMovie}>Submit</button>
        </div>
    )
}