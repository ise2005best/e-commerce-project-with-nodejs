import { getAuth,   createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { app } from '../firebase.utils';


const auth = getAuth(app);
export const db = getFirestore();

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}


export const createUserDocumentFromAuth = async (userAuthentication, additionalInformation = {}) => {

    if (!userAuthentication) return;
    const userDocRef = doc(db, 'users', userAuthentication.uid);

    // getdoc used to retrieve the content of a document from the database
    const userSnapshot = await getDoc(userDocRef);


    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuthentication;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { // this writes to the firestore database and saves the needed objects
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        }
        catch (error) {
            console.error('error creating the user', error.message);
        }
    }
    return userDocRef;
}
 export const verifyEmail = async (user) =>{
    await sendEmailVerification(user)
}