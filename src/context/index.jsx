import { createContext, useEffect, useRef, useState } from "react";

import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth, storage } from "../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import mapboxgl from "mapbox-gl";

const MyContext = createContext();
const MyProvider = (props) => {

    const [list, setList] = useState([]);

        
    const [newMovieTitle,setNewMovieTitle] = useState("");
    const [newReleaseDate,setNewReleaseDate] = useState(0);
    const [newIsOscar,setIsOscar] = useState(false);
    const movieCollectionRef = collection(db, "movies")
    const [updatedTitle,setUpdatedTitle] = useState("");
    const [fileUpload, setFileUpload] = useState(null);

    const mapContainer = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);


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

    const uploadFile = async () => {
        if (!fileUpload) return;
        console.log("It runs")
        const fileFolderRef = ref(storage,`projectFiles/${fileUpload.name}`);
        try {
            await uploadBytes(fileFolderRef, fileUpload)
            console.log("File Uploaded")
        } catch (err) {
            console.error(err);
        }
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
            uploadFile:uploadFile,
            setFileUpload:setFileUpload,
            mapContainer:mapContainer,

        }}>
            { props.children }
        </MyContext.Provider>
    )
}


export {MyContext,MyProvider}