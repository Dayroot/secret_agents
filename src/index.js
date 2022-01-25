// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import Parallax from 'parallax-js'

/* Gsap library usage statement */
gsap.registerPlugin(ScrollTrigger);

/* Classes of the elements to which an animation will be applied using gsap */
const parallaxSceneSelector = ".banner-parallax";
const sunSelector = ".banner-parallax__item--sun";
const sunImgSelector = ".banner-parallax__img--sun";
const groundTransitionSelector = ".ground-transition";
const sectDescripSelector = ".section-description";
const sectDescripContentSelector = ".section-description__content"

/* Dom elements */
const parallaxScene = document.querySelector(parallaxSceneSelector);
const buttonStart = document.querySelector('#buttonStart');

/* Parallax effect when moving the mouse, using the parallax-js library */
const parallaxInstance  =  new  Parallax( parallaxScene );

/* Motion animations when scrolling, using the gsap library*/
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
        scrub: true,
    }
});

