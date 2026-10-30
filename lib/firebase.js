import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCo5cduIoN5rC0ilXmpSfUh0mTV15d-bNU",
  databaseURL: "https://mi-panel-anime-default-rtdb.firebaseio.com",
  projectId: "mi-panel-anime"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getDatabase(app);