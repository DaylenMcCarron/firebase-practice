import { createContext, useEffect, useState } from "react";

import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

const MyContext = createContext();
const MyProvider = (props) => {

    const [list, setList] = useState([]);

        
    const [newMovieTitle,setNewMovieTitle] = useState("");
    const [newReleaseDate,setNewReleaseDate] = useState(0);
    const [newIsOscar,setIsOscar] = useState(false);

    const movieCollectionRef = collection(db, "movies")

    const [updatedTitle,setUpdatedTitle] = useState("");
    
    const getList = async () => {
        try {
                const data = await getDocs(movieCollectionRef)
                const filteredData = data.docs.map((doc) => ({...doc.data(),id: doc.id}));
                setList(filteredData);
            } catch(err) {
                console.error(err)
            }
        }
    

    const onSubmitMovie = async () => {
        try {
        await addDoc(movieCollectionRef,{
            title: newMovieTitle,
            YOR: newReleaseDate,
            oscar: newIsOscar,
            userId: auth?.currentUser?.uid || "",
        })

        getList();
        } catch (err){
            console.error(err);
        }
    }

    const deleteMovie = async (id) => {
        const movieDoc = doc(db, "movies",id);
        await deleteDoc(movieDoc);
        getList();
    }

    const updateMovieTitle = async (id) => {
        const movieDoc = doc(db, "movies", id)
        await updateDoc(movieDoc, {title: updatedTitle})
        getList();
    }

    return(
        <MyContext.Provider value={{
            list:list,
            setNewMovieTitle:setNewMovieTitle,
            setNewReleaseDate:setNewReleaseDate,
            setIsOscar:setIsOscar,
            newIsOscar:newIsOscar,
            onSubmitMovie:onSubmitMovie,
            getList:getList,
            deleteMovie:deleteMovie,
            setUpdatedTitle:setUpdatedTitle,
            updateMovieTitle:updateMovieTitle,

        }}>
            { props.children }
        </MyContext.Provider>
    )
}


export {MyContext,MyProvider}