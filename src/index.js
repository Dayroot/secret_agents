// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import Parallax from "parallax-js"

/*
    Gsap library usage statement
*/
gsap.registerPlugin(ScrollTrigger);

/* 
    Global constants
*/
const MAX_LEVEL = 5;
const MIN_LEVEL = 1;
/* 
    Global parameter variables
*/
let gameLevel = MIN_LEVEL;
/* 
    Classes of the elements to which an animation will be applied using gsap 
*/
const parallaxSceneSelector = ".banner-parallax";
const sunSelector = ".banner-parallax__item--sun";
const sunImgSelector = ".banner-parallax__img--sun";
const sunLight1Selector = "#sunLight1";
const sunLight2Selector = "#sunLight2";
const groundTransitionSelector = ".ground-transition";
const sectDescripSelector = ".section-description";
const sectDescripContentSelector = ".section-description__content";
const backdropSelector = ".backdrop";
const modalSelector = ".modal";
const modalLightSelector = "#modalLight";

/*
    Dom elements 
*/
const parallaxScene = document.querySelector(parallaxSceneSelector);
const buttonStart = document.querySelector("#buttonStart");
const modalContainer = document.querySelector("#modalContainer");
const modalBackdrop = document.querySelector(backdropSelector);
const sunLight1 = document.querySelector(sunLight1Selector);
const sunLight2 = document.querySelector(sunLight2Selector);
const ModalLevelLinesContainer = document.querySelector( "#ModalLevelLinesContainer" );
const levelSelectorRight = document.querySelector("#levelSelectorRight");
const levelSelectorLeft = document.querySelector("#levelSelectorLeft");
const gameLevelText = document.querySelector("#gameLevelText");
/*
    Parallax effect when moving the mouse, using the parallax-js library 
*/
const parallaxInstance  =  new  Parallax( parallaxScene );

/* 
    Motion animations when scrolling, using the gsap library
*/
gsap.to(sunImgSelector, {
    yPercent: 100,
    ease: "none",
    scrollTrigger: {
        trigger: sunSelector,
        start: "top top",
        end: "bottom top",
        scrub: true,
    }  
});
gsap.to(sectDescripSelector, {
    yPercent: -15,
    ease: "none",
    scrollTrigger: {
        trigger: groundTransitionSelector,
        start: "top center",
        end: "bottom bottom",
        scrub: true
    }
});

/*
    Gsap animation timelines
*/
const blinkSun = gsap.timeline({
    repeat: -1,
    yoyo: true
});

const blinkModalLight = gsap.timeline({
    repeat: -1,
    yoyo: true
});

/* 
    Gsap animations based on timelines 
*/
blinkSun
    .to(
        sunLight1Selector, 
        { 
            duration: 0.8,
            opacity: 0.6
        },
        0
    )
    .to(
        sunLight2Selector, 
        { 
            duration: 0.8,
            opacity: 0.4,
        },
        0
    )
    .to(
        sunLight1Selector, 
        { 
            duration: 1,
            opacity: 1,
            ease:  "power1.out",
        },
        0.8
    )
    .to(
        sunLight2Selector, 
        { 
            duration: 1,
            opacity: 0.6,
            ease:  "power1.out",
        },
        0.8
    )

blinkModalLight
    .to(
        modalLightSelector, 
        { 
            duration: 0.8,
            opacity: 0.4,
        }
    )
    .to(
        modalLightSelector, 
        { 
            duration: 1,
            opacity: 1,
            ease:  "power1.out",
        }
    )



/* 
    Dom element events 
*/
buttonStart.onclick = function(){
    const offsetY = window.pageYOffset || document.documentElement.scrollTop;
    //disableScrollY(offsetY);
    modalContainer.style.display = "";
    modalContainer.style.top = `${offsetY}px`;
    gsap.to(backdropSelector, {
        opacity: 1,
        duration: 0.15
    });
    gsap.to(modalSelector, {
        scale: 1,
        duration: 0.15
    });
}

modalBackdrop.onclick = async function(){
    await gsap.to(backdropSelector, {
        opacity: 0,
        duration: 0.1
    });
    await gsap.to(modalSelector, {
        scale: 0,
        duration: 0.05
    });
    modalContainer.style.display = "none";
    //enableScrollY();
}

// function disableScrollY(offsetY) {
//     window.scrollTop(offsetY);
// }

// function enableScrollY(){
//     window.onscroll = function() {};
// }

/*
    This funcion is responsible for establishing the opacity level of the light
    as the element that represents the sun in the banner moves.
*/
window.onscroll = function(event) {
    const OCCULTATION_COMPLETED = 300;
    const OCCULTATION_START = 80;
    const offSetY = window.pageYOffset || document.documentElement.scrollTop;
    let sunOcultation;
    if(offSetY > OCCULTATION_START){
        blinkSun.pause();
        if(offSetY < OCCULTATION_COMPLETED)
            sunOcultation = 1 - offSetY/OCCULTATION_COMPLETED;
        else
            sunOcultation = 0;
        sunLight2.style.opacity = sunOcultation;
        }
    else {
        sunLight2.style.opacity = "";
        blinkSun.play(); 
    }
    
}

levelSelectorRight.onclick = function(event){
    if(gameLevel < MAX_LEVEL){
        ++gameLevel;
        gameLevelText.textContent = gameLevel;
        const newLevelLine = ModalLevelLinesContainer.childNodes[1].cloneNode();
        ModalLevelLinesContainer.appendChild(newLevelLine);
    }
}

levelSelectorLeft.onclick = function(event){
    if(gameLevel > MIN_LEVEL){
        --gameLevel;
        gameLevelText.textContent = gameLevel;
        const deleteLine = [...ModalLevelLinesContainer.childNodes].pop();
        console.log(deleteLine);
        ModalLevelLinesContainer.removeChild(deleteLine);
    }
}