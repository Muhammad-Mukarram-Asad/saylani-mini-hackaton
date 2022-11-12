// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  getDoc,
  onSnapshot,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRnjXEaprTiOBax0HaBcR3ssBVKN2Pr-s",
  authDomain: "mini-hackaton-2f891.firebaseapp.com",
  projectId: "mini-hackaton-2f891",
  storageBucket: "mini-hackaton-2f891.appspot.com",
  messagingSenderId: "363749451798",
  appId: "1:363749451798:web:aa351b023a2be35feded37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// sign-in method:
function signInFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

async function uploadImage(image) {
  const storageREf = ref(storage, `images/${image.name}`); // storage --> images --> image jo upload kri hai
  const snapshot = await uploadBytes(storageREf, image);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

function postStudentDetailsToDB(
  s_name,
  f_name,
  r_num,
  contact_num,
  cnic_num,
  imageURl,
  st_course_name
) {
  const userId = auth.currentUser.uid;
  const userEmail = auth.currentUser.email;
  return addDoc(collection(db, "students_log"), {
    s_name,
    f_name,
    r_num,
    contact_num,
    cnic_num,
    imageURl,
    st_course_name,
  });
}

function postClassDetailsToDB(c_time, c_schedule, t_name, s_name, course_name, b_number) {
  return addDoc(collection(db, "class_log"), {
    c_time,
    c_schedule,
    t_name,
    s_name,
    course_name,
    b_number,
  });
}

async function options() {
  const querySnapshot = await getDocs(collection(db, "class_log"))
  const ads = []
  querySnapshot.forEach((doc) => {
      ads.push({ id: doc.id, ...doc.data() });
  })
  return ads
}

function getRealtimeCard(roll_number) {
  
  console.log(`chat firebase.`);
    const q = query(collection(db,"student_log"),where(`${r_num}`, "==", roll_number))
    onSnapshot(q, (querySnapshot) => {
        const student_details = []
        querySnapshot.forEach((doc) => {
            student_details.push({ id: doc.id, ...doc.data() })
        })
        console.log(student_details);
        // callback(student_details)
    })
  
  }

  function getRealtimeAds(callback) {
    //2
    onSnapshot(collection(db, "ads"), (querySnapshot) => {
        const ads = []
  
        querySnapshot.forEach((doc) => {
            ads.push({ id: doc.id, ...doc.data() })
        });
        //3
        callback(ads)
    })
  }
export { signInFirebase, uploadImage, postClassDetailsToDB, postStudentDetailsToDB, options,getRealtimeCard};
