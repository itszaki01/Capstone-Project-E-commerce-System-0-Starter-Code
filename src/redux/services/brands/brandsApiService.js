import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { apiService } from "../emptySplitApi/apiSerivce";
import { db } from "../../../firebase/config";

const apiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["brands"],
});

const brandsApiService = apiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        //1: Get All Brands
        getAllBrands: builder.query({
            queryFn: async () => {
                try {
                    const brandsRef = collection(db, "brands");
                    const { docs } = await getDocs(brandsRef);
                    const brandsList = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    return { data: brandsList };
                } catch (error) {
                    console.log(error);
                    throw Error(error);
                }
            },
            providesTags: ["brands"],
        }),
        //2: CreateNewBrand
        createNewBrands: builder.mutation({
            queryFn:async (brand)=>{
                try{
                    const brandsRef = collection(db, "brands");
                    await addDoc(brandsRef,brand)
                    return { data: 'ok' }
                }catch(error){
                    console.log(error)
                    throw Error(error)
                }
            },
            invalidatesTags:['brands']
        }),
        //3: EditBrand
        editeBrand: builder.mutation({
            queryFn:async (editedBrand)=>{
                try{
                    const brandsRef = doc(db, "brands",editedBrand.id);
                    await updateDoc(brandsRef,editedBrand)
                    return { data: 'ok' }
                }catch(error){
                    console.log(error)
                    throw Error(error)
                }
            },
            invalidatesTags:['brands']
        }),
        //4: deleteBrand
        deleteBrand: builder.mutation({
            queryFn:async (id)=>{
                try{
                    const brandsRef = doc(db, "brands",id);
                    await deleteDoc(brandsRef)
                    return { data: 'ok' }
                }catch(error){
                    console.log(error)
                    throw Error(error)
                }
            },
            invalidatesTags:['brands']
        }),
    }),
});


export const {useGetAllBrandsQuery,useEditeBrandMutation,useDeleteBrandMutation,useCreateNewBrandsMutation} = brandsApiService