import { DocumentData, DocumentSnapshot, Query, QueryDocumentSnapshot, collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../config/Firebase";

export const getLinks = async (
    data: string,
    number: number = 6,
    lastDoc?: DocumentSnapshot<DocumentData> | null
) => {

    let collectionRef: Query<DocumentData> = collection(db, data);

    if (lastDoc) {
        collectionRef = query(collection(db, data), orderBy('title'), startAfter(lastDoc), limit(number));
    } else {
        collectionRef = query(collection(db, data), orderBy('title'), limit(number));
    }

    const querySnapshot = await getDocs(collectionRef);

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const linksToolsDocs: DocumentData[] = querySnapshot.docs.map(doc => doc.data());

    return { linksToolsDocs, lastVisible };
};

export const getLinksId = async (data: string) => {
    try {
        const collectionRef = query(collection(db, data));
        const queryCollection = await getDocs(collectionRef);
        const docs: DocumentData[] = [];
        queryCollection.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            docs.push(doc);
        });
        return docs;
    }
    catch (error) {
        console.error(`Nao foi possível acessar ao documento: ${error}`);
        throw error;
    }
}

