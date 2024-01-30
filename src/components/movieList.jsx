import { useContext, useEffect, useState } from "react"
import { MyContext } from "../context";

export const MovieList = () => {

    const context = useContext(MyContext);

    useEffect(()=> {
        context.getList()
    },[])

    return (
        <div>
            {context.list.map((movie)=>(
                <div>
                    <h1>{movie.title}</h1>
                    <p>Year of release: {movie.YOR}</p><br/>
                    <p>Has it received an oscar?</p>
                    <p>The answer is: {movie.oscar ? "Yes!" : "No!"}</p>
                    <button onClick={()=>context.deleteMovie(movie.id)}>Delete</button>
                    <input type="text" name="ChangeTitle" placeholder="New Title" onChange={(e)=>context.setUpdatedTitle(e.target.value)} />
                    <button onClick={()=>context.updateMovieTitle(movie.id)}>Update Title</button>
                </div>
            ))}
            <input type="file" onChange={(e)=>context.setFileUpload(e.target.files[0])}/>
            <button onClick={()=>context.uploadFile()}>Upload File</button>
        </div>
    )
}