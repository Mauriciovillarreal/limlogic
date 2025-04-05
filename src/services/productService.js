// src/services/productService.js
import { db } from '../firebase/config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const productsRef = collection(db, 'products');

export const getAllProducts = async () => {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (product) => {
  await addDoc(productsRef, product);
};

export const updateProduct = async (id, updatedProduct) => {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, updatedProduct);
};

export const deleteProduct = async (id) => {
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
};
