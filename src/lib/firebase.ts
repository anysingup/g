'''// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import type { Notice } from "@/lib/types";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "harinkhaine-result-portal",
  "appId": "1:582505928895:web:a638259cdc20c88d038e0a",
  "storageBucket": "harinkhaine-result-portal.firebasestorage.app",
  "apiKey": "AIzaSyBzlcg9ILW98ilAzWyvzrYM6snKOurFgXI",
  "authDomain": "harinkhaine-result-portal.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "582505928895",
  "databaseURL": "https://harinkhaine-result-portal-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

const noticesCollection = collection(db, 'notices');

// --- Firestore Helper Functions for Notices ---

export async function getNotices(): Promise<Notice[]> {
    const q = query(noticesCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notice));
}

export async function addNotice(notice: { title: string; description: string }): Promise<Notice> {
    const newNotice = {
        ...notice,
        createdAt: Date.now(),
    };
    const docRef = await addDoc(noticesCollection, newNotice);
    return { id: docRef.id, ...newNotice };
}

export async function deleteNotice(id: string): Promise<void> {
    const noticeDoc = doc(db, 'notices', id);
    await deleteDoc(noticeDoc);
}

export { app, db };
'''