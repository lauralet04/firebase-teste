const firebaseConfig = {
  apiKey: "AIzaSyDu22IBaceAo1niutRZ4v7Br9KsOAnm_xM",
  authDomain: "teste-senai-c2d25.firebaseapp.com",
  projectId: "teste-senai-c2d25",
  storageBucket: "teste-senai-c2d25.firebasestorage.app",
  messagingSenderId: "417638495874",
  appId: "1:417638495874:web:a68f9dc466957d2fa8669b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ experimentalForceLongPolling: true });

async function addData() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  try {
    const docRef = await db.collection('users').add({
      name: name,
      age: Number.parseInt(age, 10)
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

async function getData() {
  try {
    const querySnapshot = await db.collection('users').get();
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement('li');
      listItem.textContent = `${data.name}, ${data.age}`;
      dataList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

window.addData = addData;
window.getData = getData;
