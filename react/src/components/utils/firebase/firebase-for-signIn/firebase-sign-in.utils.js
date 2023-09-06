import { getAuth,  GoogleAuthProvider,  signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { app} from '../firebase.utils';

const proivder = new GoogleAuthProvider();

proivder.setCustomParameters({
    prompt: 'select_account'
})

export const db = getFirestore();
export const auth = getAuth(app);
export const signInWithGooglePopup = async () => {
   
    try {
        const result = await signInWithPopup(auth, proivder);
        return result.user;
    } catch (error) {
        console.error('Google sign-in error', error);
        throw error;
    }
};

export const createUserDocumentFromAuth = async (userAuthentication, additionalInformation = {}) => {

    if (!userAuthentication) return;
    const userDocRef = doc(db, 'users', userAuthentication.uid);

    // getdoc used to retrieve the content of a document from the database
    const userSnapshot = await getDoc(userDocRef);


    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuthentication;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
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

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const passwordResetEmailToUser = async(email) =>{
    try {
        await sendPasswordResetEmail(auth, email)
        window.alert('Password reset email sent!')
    } catch (error) {
        switch (error.code) {
            case 'auth/invalid-email':
                <p> Invalid email!</p>;
                break;
            case 'auth/user-not-found':
                <p>User not found in our database</p>
                break;
            default:
                console.log(error);
                break;
        }
    }
}
export const signUserOut = async () =>{
    await signOut(auth);
}

export const onAuthStateChangeListener = (callback) => {
    onAuthStateChanged(auth, callback)
}