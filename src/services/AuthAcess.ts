import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase";

export const signIn = async (email:string, password:string) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    }
    catch(error){
        console.log(error);
    }
}