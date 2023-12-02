import { apiService } from "../emptySplitApi/apiSerivce";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "/src/firebase/config";
import defaultAvatar from "../../../assets/defaultAvatar.png";
import { provider } from "../../../firebase/config";
const authApiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["Profile"],
});
export const authApiService = authApiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        //1:SignUp
        signUp: builder.mutation({
            queryFn: async (data) => {
                const { email, password, fullname } = data;
                try {
                    const { user } = await createUserWithEmailAndPassword(auth, email, password);
                    const userRef = doc(db, "users", user.uid);
                    const userDoc = {
                        id: user.uid,
                        fullname,
                        email,
                        avatar: defaultAvatar,
                        countey: "",
                        city: "",
                        adress: "",
                        mobile: user.phoneNumber,
                        postal_code: "",
                        role: "USER",
                        date_joined: user.metadata.creationTime || new Date().getDate(),
                    };
                    await setDoc(userRef, userDoc);
                    return { data: "ok" };
                } catch (error) {
                    console.log(error);
                    throw Error(error);
                }
            },
        }),
        //2: SignIn
        signIn: builder.mutation({
            queryFn: async ({ email, password }) => {
                try {
                    await signInWithEmailAndPassword(auth, email, password);
                    return { data: "ok" };
                } catch (error) {
                    throw Error(error.code);
                }
            },
        }),
        //3:SignIn With Google
        signInWithGoogle: builder.mutation({
            queryFn: async () => {
                try {
                    const { user } = await signInWithPopup(auth, provider);
                    return { data: "ok" };
                } catch (error) {
                    console.log(error);
                    throw Error(error.code);
                }
            },
        }),
        //4: ForgetPassword
        forgetPassword: builder.mutation({
            queryFn: async (email) => {
                try {
                    await sendPasswordResetEmail(auth, email);
                    return { data: "ok" };
                } catch (error) {
                    throw Error(error.code);
                }
            },
        }),
        //5:VerifyEmail
        verifyEmail: builder.mutation({
            queryFn: async ()=>{
                try {
                    await sendEmailVerification(auth.currentUser)
                    return { data: "ok" };
                } catch (error) {
                    throw Error(error.code);
                }
            }
        }),
        //6:SignOut
        signOut: builder.mutation({
            queryFn: async () => {
                try {
                    await signOut(auth);
                    return { data: "ok" };
                } catch (error) {
                    console.log(error);
                    throw Error(error);
                }
            },
        }),
        //7:GetAuthUserData
        getAuthUser: builder.query({
            queryFn: async (user) => {
                try {
                    const userRef = doc(db, "users", user.uid);
                    let userDoc = await getDoc(userRef);
                    if (!userDoc.data()) {
                        const userNewDoc = {
                            id: user.uid,
                            fullname: user.displayName,
                            email: user.email,
                            avatar: user.photoURL,
                            countey: "",
                            city: "",
                            adress: "",
                            mobile: user.phoneNumber,
                            postal_code: "",
                            role: "USER",
                            date_joined: user.metadata.creationTime || new Date().getDate(),
                        };
                        await setDoc(userRef, userNewDoc);
                        userDoc = await getDoc(userRef);
                    }
                    return { data: userDoc.data() };
                } catch (error) {
                    console.log(error);
                    throw Error(error.code);
                }
            },
            providesTags: ["Profile"],
        }),
    }),
});

export const {
    useSignUpMutation,
    useSignInMutation,
    useSignInWithGoogleMutation,
    useForgetPasswordMutation,
    useVerifyEmailMutation,
    useSignOutMutation,
    useGetAuthUserQuery,
} = authApiService;
