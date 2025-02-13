// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import Parallax from "parallax-js"

/**
 * Gsap library usage statement.
 */
gsap.registerPlugin(ScrollTrigger);

/**
 * Global constants
 */
const MAX_LEVEL = 5;
const MIN_LEVEL = 1;
/**
 * Global parameter variables.
 */
let gameLevel = MIN_LEVEL;
/**
 * Classes of the elements to which an animation will be applied using gsap.
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
const loadingButtonOkSelector = "#loadingButtonOk";
const buttonOkSelector = "#buttonOk";

/**
 * Dom elements.
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
const loadingButtonOk = document.querySelector(loadingButtonOkSelector);
const buttonOk = document.querySelector(buttonOkSelector);
/**
 * Parallax effect when moving the mouse, using the parallax-js library.
 */
const parallaxInstance  =  new  Parallax( parallaxScene );

/**
 * Motion animations when scrolling, using the gsap library.
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
        trigger: sectDescripSelector,
        start: "top center",
        end: "bottom bottom",
        scrub: true
    }
});

/**
 * Gsap animation timelines.
 */
const blinkSunTl = gsap.timeline({
    repeat: -1,
    yoyo: true
});

const blinkModalLightTl = gsap.timeline({
    repeat: -1,
    yoyo: true
});

const buttonOkTl = gsap.timeline({
    repeat: -1,
    paused: true,
});

/**
 * Gsap animations based on timelines.
 */
blinkSunTl
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
            opacity: 0.2,
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
            ease:  "none",
        },
        0.8
    )

blinkModalLightTl
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

buttonOkTl
    .to(
        loadingButtonOkSelector,
        {
            duration: 1,
            rotation: "180deg",
            ease: "none"
        }
    )


/**
 * Dom element events
 */
/**
 * Opening animation of the modal window for the selection of the game level.
 */
buttonStart.onclick = function(){
    const offsetY = window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.overflow = "hidden";
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
/**
 * Modal window closing animation for game level selection.
 */
modalBackdrop.onclick = async function(){
    document.body.style.overflow = "";
    await gsap.to(backdropSelector, {
        opacity: 0,
        duration: 0.1
    });
    await gsap.to(modalSelector, {
        scale: 0,
        duration: 0.05
    });
    modalContainer.style.display = "none";
}


/**
 * This funcion is responsible for establishing the opacity level of the light as the element that represents the sun in the banner moves.
 */
    
window.onscroll = function(event) {
    const OCCULTATION_COMPLETED = 250;
    const OCCULTATION_START = 60;
    const offSetY = window.pageYOffset || document.documentElement.scrollTop;
    let sunOcultation;
    if(offSetY > OCCULTATION_START){
        blinkSunTl.pause();
        if(offSetY < OCCULTATION_COMPLETED)
            sunOcultation = 1 - offSetY/OCCULTATION_COMPLETED;
        else
            sunOcultation = 0;
        sunLight1.style.opacity = sunOcultation;
        sunLight2.style.opacity = sunOcultation;
        }
    else {
        sunLight1.style.opacity = "";
        sunLight2.style.opacity = "";
        blinkSunTl.play(); 
    }
    
}

/**
 * Clicking on the right level selector will increase the number of lines that will indicate the level graphically.
 */
levelSelectorRight.onclick = function(event){
    if(gameLevel < MAX_LEVEL){
        ++gameLevel;
        gameLevelText.textContent = gameLevel;
        const newLevelLine = ModalLevelLinesContainer.childNodes[1].cloneNode();
        ModalLevelLinesContainer.appendChild(newLevelLine);
    }
}

/**
 * Clicking on the left level selector will decrease the number of lines that will indicate the level graphically.
 */
    
levelSelectorLeft.onclick = function(event){
    if(gameLevel > MIN_LEVEL){
        --gameLevel;
        gameLevelText.textContent = gameLevel;
        const deleteLine = [...ModalLevelLinesContainer.childNodes].pop();
        ModalLevelLinesContainer.removeChild(deleteLine);
    }
}

/**
 * Activation of the loading animation of the ok button in the game level selection modal.
 */
buttonOk.onclick = function(){
    buttonOkTl.paused(false);
}

/**
 * This function is a test.
 * @param {String} name name of the person.
 * @param {String} age age of the person.
 * @returns {void}
 */
function test(name, age){
    console.log(name + age);
    return age
}


test();