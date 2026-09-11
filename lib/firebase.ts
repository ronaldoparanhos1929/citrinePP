import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  projectId: "gen-lang-client-0912322097",
  apiKey: "dummy-key-for-build", // Needed for Auth initialization to not throw
};

let app: any;
let db: any;
let auth: any;
let storage: any;

app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
db = getFirestore(app);
try {
  auth = getAuth(app);
} catch (e) {
  // Ignore auth initialization errors during build
}
try {
  storage = getStorage(app);
} catch (e) {
  // Ignore storage errors
}

export { app, db, auth, storage };
