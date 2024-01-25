import { useEffect, useState } from "react"
import { db } from "../config/firebase"
import { getDocs, collection } from "firebase/firestore";

export const MovieList = () => {

    const [list, setList] = useState([]);

    const movieCollectionRef = collection(db, "movies")

    useEffect(()=>{
        const getList = async () => {
            try {
                const data = await getDocs(movieCollectionRef)
                const filteredData = data.docs.map((doc) => ({...doc.data(),id: doc.id}));
                setList(filteredData);
            } catch(err) {
                console.error(err)
            }
        }

        getList();
    },[])

    return (
        <div>
            {list.map((movie)=>(
                <div>
                    <h1>{movie.title}</h1>
                    <p>Year of release: {movie.YOR}</p><br/>
                    <p>Has it received an oscar?</p>
                    <p>The answer is: {movie.oscar ? "Yes!" : "No!"}</p>
                </div>
            ))}
        </div>
    )
}