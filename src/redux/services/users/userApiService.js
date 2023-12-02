import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { apiService } from "../emptySplitApi/apiSerivce";
import { db } from "../../../firebase/config";
import { storeImage } from "../../../helpers/firebaseHelpers";

export const usersApiService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        updateUserProfile: builder.mutation({
            queryFn: async (updatedProfile) => {
                const { userId, updates, avatarFile } = updatedProfile;
                try {
                   
                    if (avatarFile) {
                        const imageUrl = await storeImage(userId, "images", avatarFile);
                        const userRef = doc(db, "users", userId);
                        await updateDoc(userRef, {...updates,avatar:imageUrl});
                    }else{
                        const userRef = doc(db, "users", userId);
                        await updateDoc(userRef, updates);
                    }
                    return { data: "ok" };
                } catch (error) {
                    console.log(error);
                    throw Error(error.code);
                }
            },
            invalidatesTags: ["Profile"],
        }),
        getAllUsers: builder.query({
            queryFn: async () => {
                try {
                    const usersCollectionRef = collection(db, "users");
                    const q = query(usersCollectionRef,where('role','==','USER'));
                    const { docs } = await getDocs(q);
                    const allUsers = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    console.log(allUsers);
                    return { data: allUsers };
                } catch (error) {
                    console.log(error);
                    throw Error(error);
                }
            },
        }),
    }),
});

export const { useUpdateUserProfileMutation, useGetAllUsersQuery } = usersApiService;
