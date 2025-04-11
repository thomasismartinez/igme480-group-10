// ar.js

import { drawInit } from "./draw.js";

// <a-assets> element which holds <img> elements as referances for <a-scene>
let assets;

// temp for while assets are purely stored in html
let imgIndex;



//firebase functions
const db = window.firebaseDB;
const dbRef = window.firebaseRef(db, 'graffiti');
const push = window.firebasePush;
const onChildAdded = window.firebaseOnChildAdded;



const arInit = () => {
    assets = document.querySelector('a-assets');

    // house click event
    AFRAME.registerComponent('clicker', {
        init: function () {
            this.el.addEventListener('click', e => {
                // open drawing panel
                drawInit();
            });
        }
    });

    imgIndex = 0;

    //firebase listen for updates
    onChildAdded(dbRef, snapshot => {
        const { data } = snapshot.val();
        spawnGraffiti(data);
    });
}


const addGraffiti = (imgData) => {
    //save to firebase
    push(dbRef, {
        data: imgData,
        timestamp: Date.now()
    });

    //local add to firebase
    spawnGraffiti(imgData);
}


// add graffiti to ar scene
const spawnGraffiti = (imgData) => {
    // create img element
    let img = document.createElement('img');
    img.src = imgData;
    img.id = `graffiti-img-${imgIndex}`;

    // add img to asset references
    assets.appendChild(img);

    // create ar image element
    let arImg = document.createElement('a-image');
    arImg.setAttribute('src', `#graffiti-img-${imgIndex}`);

    //needs updating based on model size 
    arImg.setAttribute('position', '0 1 0.5');

    //updates attaching drawing to house model instead of the marker
    arImg.setAttribute('rotation', '0 0 0');
    arImg.setAttribute('scale', '0.5 0.5 0.5');



    const house = document.querySelector('#house');
    if (house) {
        house.appendChild(arImg);
    } else {
        console.log("house model not found. changing to deault marker");
        document.querySelector('a-marker').appendChild(arImg);
    }

    // iterate index
    imgIndex++;
}

export { arInit, addGraffiti };