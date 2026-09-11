import { db, storage } from './firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadFile = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export const getProducts = async (filters?: { category?: string, isLaunch?: boolean, isHighlight?: boolean }) => {
  let q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  
  if (filters) {
    if (filters.category) {
      q = query(q, where('categories', 'array-contains', filters.category));
    }
    if (filters.isLaunch) {
      q = query(q, where('isLaunch', '==', true));
    }
    if (filters.isHighlight) {
      q = query(q, where('isHighlight', '==', true));
    }
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProduct = async (id: string) => {
  const docRef = doc(db, 'products', id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  return null;
};

export const addProduct = async (data: any) => {
  return await addDoc(collection(db, 'products'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const updateProduct = async (id: string, data: any) => {
  const docRef = doc(db, 'products', id);
  return await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

export const getOrders = async () => {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateOrderStatus = async (id: string, status: string) => {
  const docRef = doc(db, 'orders', id);
  return await updateDoc(docRef, { status });
};
