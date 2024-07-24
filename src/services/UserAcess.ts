import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/Firebase";

export const getUserData = async (uid: string) => {
    try {
        const userReference = query(collection(db, 'users'), where('userUid', '==', uid));
        const querySnapshot = await getDocs(userReference);

        const userData: DocumentData[] = []
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                userData.push(doc);
            })
            return userData
        } else {
            throw new Error('Usuário não encontrado.');
        }

    }
    catch (error) {
        console.log(error);
    }
}