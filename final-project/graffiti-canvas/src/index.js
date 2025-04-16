import { arInit } from "./ar.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";


const init = () => {
    arInit();
    //setupControls();
}

const setupControls = () => { // possibly defunt, will probably gain new uses later
    document.getElementById('draw-begin-button').onclick = () => {
        drawInit();
        console.log('open drawing panel');
    }
}

init();