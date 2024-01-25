import { useState } from "react"
import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try {
        await createUserWithEmailAndPassword(auth,email,password)
        } catch (err) {
            console.error(err)
        }

    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err)
        }
    }
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <>
            <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={signIn}>Sign In</button><br/><br/>
            <button onClick={signInWithGoogle}>Sign In With Google</button><br/><br/>
            <button onClick={logout}>Log Out</button>
        </>
    )
}