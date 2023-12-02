import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase/config";
import { collection, doc } from "firebase/firestore";


//Generate random id 
export const generateKey = () => doc(collection(db, "products")).id;


//Store Image in cloud storage 
export const storeImage = async (id, folder, imageFile) => {
  // console.log(id, folder, imageFile);

  const storageRef = ref(storage, `${folder}/${id}`);

  const snapshot = await uploadBytes(storageRef, imageFile);

  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
};


//Delete Image from cloud storage 
export const deleteImage = async (id) => {
  // console.log(id);

  const storageRef = ref(storage, `products/${id}`);
  // console.log(storageRef);

  await deleteObject(storageRef).then(() => {
    console.log("image deleted successfully")
  }).catch((error) => {
    console.error('Failed to delete image ', error);
  })
}