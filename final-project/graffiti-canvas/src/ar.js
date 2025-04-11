// ar.js

import { drawInit } from "./draw.js";

// <a-assets> element which holds <img> elements as referances for <a-scene>
let assets;

// temp for while assets are purely stored in html
let imgIndex;

const arInit = () => {
    assets = document.querySelector('a-assets');

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

export { arInit, addGraffiti };