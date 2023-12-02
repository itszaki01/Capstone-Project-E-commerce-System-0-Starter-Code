import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { apiService } from "../emptySplitApi/apiSerivce";
import { db, storage } from "../../../firebase/config";
import { generateKey, storeImage } from "../../../helpers/firebaseHelpers";
import { deleteObject, ref } from "firebase/storage";
const apiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["Products", "Product"],
});

const productsApiService = apiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            queryFn: async () => {
                try {
                    const productsRef = collection(db, "products");
                    const q = query(productsRef, orderBy("dateAdded", "desc"));
                    const { docs } = await getDocs(q);
                    const productList = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    return { data: productList };
                } catch (error) {
                    console.log(error);
                    throw Error(error);
                }
            },
            providesTags: ["Products"],
        }),
        //2: GetProduct by Type
        getProductsByType: builder.query({
            queryFn: async (type) => {
                try {
                    const collectionRef = collection(db, "products");
                    const q = query(collectionRef, where(type, "==", true));
                    const data = await getDocs(q);
                    const productsList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    return { data: productsList };
                } catch (error) {
                    console.log(error);
                    throw Error(error);
                }
            },
        }),
        //3: GetProduct by id
        getProductById: builder.query({
            queryFn: async (productId) => {
                try {
                    const productDocRef = doc(db, "products", productId);
                    const data = await getDoc(productDocRef);
                    return { data: { ...data.data(), id: data.id } };
                } catch (error) {
                    console.log(error);
                    throw Error(error);
                }
            },
            providesTags: ["Product"],
        }),
        //4: Search Products
        searchProductByName: builder.query({
            queryFn: async (searchKey) => {
                try {
                    const collectionRef = collection(db, "products");
                    const q = query(collectionRef, where('name_lower', ">=", searchKey),where('name_lower', "<=", `${searchKey}\uf8ff`));
                    const data = await getDocs(q);
                    const productsList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    return { data: productsList };
                } catch (error) {
                    console.log(error);
                    throw Error(error);
                }
            },
        }),
        //5:Create New Product
        createNewProduct: builder.mutation({
            queryFn: async (product) => {
                const { imageCollection } = product;

                try {
                    const key = generateKey();
                    const downloadURL = await storeImage(key, "products", product.image);
                    const image = { id: key, url: downloadURL };
                    let images = [];
                    if (imageCollection.length != 0) {
                        const imagekeys = imageCollection.map(() => generateKey());
                        const imageCollectionPromises = Array.from(imageCollection, (img, i) => storeImage(imagekeys[i], "products", img.file));
                        const downloadURLs = await Promise.all(imageCollectionPromises);
                        images = downloadURLs.map((url, i) => ({
                            id: imagekeys[i],
                            url,
                        }));
                    }
                    const productDoc = {
                        ...product,
                        image: downloadURL,
                        imageCollection: [image, ...images],
                    };
                    const productRef = doc(db, "products", key);
                    await setDoc(productRef, productDoc);
                    return { data: "ok" };
                } catch (error) {
                    console.log(error);
                    throw Error(error.code);
                }
            },
            invalidatesTags: ["Products"],
        }),
        //6:Edit Proudct
        editProduct: builder.mutation({
            queryFn: async ({ productData, product: oldProductData }) => {
                try {
                    const { id, image, imageCollection } = productData;
                    let updatedProduct = { ...productData };
                    if (image.constructor === File) {
                        console.log("called");
                        const key = generateKey();
                        // await deleteObject(ref(storage, oldProductData.image));
                        const downloadURL = await storeImage(key, "products", image);
                        updatedProduct = { ...updatedProduct, image: downloadURL, imageCollection: [{ id: key, url: downloadURL }] };
                    }

                    let newImages = [];
                    const oldImagesArray = oldProductData.imageCollection.map((img) => img.url);
                    const notUpdatedImagesArray = imageCollection.filter((img) => oldImagesArray.includes(img.url));
                    if (imageCollection?.length >= 1) {
                        const newImageCollectionPromises = Array.from(imageCollection, async (img) => {
                            if (img.file) {
                                const key = generateKey();
                                const downloadURL = await storeImage(key, "products", img.file);
                                newImages.push({ id: key, url: downloadURL });
                            }
                        });
                        await Promise.all(newImageCollectionPromises);
                    }
                    updatedProduct = {
                        ...updatedProduct,
                        imageCollection: [...newImages, ...notUpdatedImagesArray],
                    };
                    const productDocRef = doc(db, "products", id);
                    await updateDoc(productDocRef, updatedProduct);
                    return { data: "ok" };
                } catch (error) {
                    console.log(error);
                    throw Error(error.code);
                }
            },
            invalidatesTags: ["Product", "Products"],
        }),
        //7:Delete Product
        deleteProduct: builder.mutation({
            queryFn: async (prodcutData) => {
                try {
                    const deletPromises = prodcutData.imageCollection.map(async (img) => await deleteObject(ref(storage, img.url)));
                    const productDocRef = doc(db, "products", prodcutData.id);
                    await deleteDoc(productDocRef);
                    return { data: "ok" };
                } catch (error) {
                    console.log(error);
                    throw Error(error.code);
                }
            },
            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useGetProductsByTypeQuery,
    useCreateNewProductMutation,
    useEditProductMutation,
    useDeleteProductMutation,
    useSearchProductByNameQuery,
} = productsApiService;
