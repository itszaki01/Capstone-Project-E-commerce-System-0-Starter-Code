import { addDoc, collection, doc, getDoc, getDocs, increment, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { apiService } from "../emptySplitApi/apiSerivce";

const apiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["Order", "Orders", "userOrders"],
});
const ordersApiService = apiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        //1: getAllOrder (ADMIN)
        getAllOrders: builder.query({
            queryFn: async () => {
                try {
                    const orderCollectionRef = collection(db, "orders");
                    const q = query(orderCollectionRef, orderBy("createdAt", "desc"));
                    const { docs } = await getDocs(q);
                    const allOrders = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    console.log(allOrders);
                    return { data: allOrders };
                } catch (error) {
                    console.log(error);
                    throw Error(error);
                }
            },
            providesTags: ["Orders"],
        }),
        //2: getOrderById
        getOrderById: builder.query({
            queryFn: async (orderID) => {
                try {
                    const docRef = doc(db, "orders", orderID);
                    const data = await getDoc(docRef);
                    return { data: { ...data.data() } };
                } catch (error) {
                    console.log(error);
                    throw Error(error);
                }
            },
            providesTags: ["Order"],
        }),
        //3: getUserOrders
        getUserOrders: builder.query({
            queryFn: async (userID) => {
                console.log(userID);
                try {
                    const collectionRef = collection(db, "orders");
                    const q = query(collectionRef, orderBy("createdAt", "desc"), where("userID", "==", userID));
                    const data = await getDocs(q);
                    const userOrders = data.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id };
                    });
                    return { data: userOrders };
                } catch (error) {
                    console.log(error);
                    throw Error(error);
                }
            },
            providesTags: ["userOrders"],
        }),
        //4: createNewOrder
        createNewOrder: builder.mutation({
            queryFn: async (orderData) => {
                try {
                    const ordersCollectionRef = collection(db, "orders");
                    await addDoc(ordersCollectionRef, orderData);
                    orderData.cartItems.map(async (items) => {
                        try {
                            const { id, quantity } = items;
                            const productRef = doc(db, "products", id);
                            await updateDoc(productRef, {
                                remainingQty: increment(-quantity),
                            });
                        } catch (error) {
                            console.log(error);
                            throw Error(error);
                        }
                    });

                    return { data: "ok" };
                } catch (error) {
                    console.log(error);
                    throw Error(error);
                }
            },
            invalidatesTags: ["Orders", "Products", "Product", "userOrders"],
        }),
        //5: updateOrder
        updateOrderStatus: builder.mutation({
            queryFn: async ({ id, status }) => {
                try {
                    const docRef = doc(db, "orders", id);
                    await updateDoc(docRef, {
                        orderStatus: status,
                    });
                    return { data: "ok" };
                } catch (error) {
                    console.log(error);
                    throw Error(error);
                }
            },
            invalidatesTags:['Orders','Order']
        }),
    }),
});

export const { useGetAllOrdersQuery, useGetOrderByIdQuery, useGetUserOrdersQuery, useCreateNewOrderMutation, useUpdateOrderStatusMutation } =
    ordersApiService;
