// ar.js

import { drawInit } from "./draw.js";
import { getDocs, query, collection } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";


// <a-assets> element which holds <img> elements as referances for <a-scene>
let assets;

// temp for while assets are purely stored in html
let imgIndex;

const arInit = () => {
    assets = document.querySelector('a-assets');


    //load graffitit from firebase when loaded
    fetchGraffiti();

    // house click event
    AFRAME.registerComponent('clicker', {
        init: function() {
            this.el.addEventListener('click', e => {
                // open drawing panel
                drawInit();
            });
        }
    });

    imgIndex = 0;
}



// add graffiti to ar scene
const addGraffiti = (imgData) => {
    // create img element
    let img = document.createElement('img');
    img.src = imgData;
    img.id = `graffiti-img-${imgIndex}`;

    // add img to asset references
    assets.appendChild(img);
    
    // create ar image element
    let arImg = document.createElement('a-image');
    arImg.setAttribute('src', `#graffiti-img-${imgIndex}`);
    arImg.setAttribute('position', '1 0.5 1');
    document.querySelector('a-marker').appendChild(arImg);

    // iterate index
    imgIndex++;
}


const fetchGraffiti = async () => {
    //create a query for the collection
    const q = query(collection(firebaseDB, "graffiti"));

    try{
        //execute the query
        const querySnapshot = await getDocs(q);

        //loop through the docs
        querySnapshot.forEach((doc) => {
            const imgData = doc.data().image;

            //call function to add graffiti
            addGraffiti(imgData);
        });
    } catch (e) {
        console.error("error fetching the graffiti: ", e);
    }
}

export { arInit, addGraffiti };