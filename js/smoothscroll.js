
// Smooth scrolling on mouse wheel
let isScrolling = false;

const smoothScroll = (event) => {
    event.preventDefault();

    if (isScrolling) return;

    isScrolling = true;

    const delta = event.deltaY * 3;  // to modify the distance when scrolling, change this number
    const start = window.scrollY;
    const end = start + delta;
    const duration = 500; // to modify the speed of the scrolling, change this number
    let startTime = null;

    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    const animateScroll = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = timeElapsed / duration;
        const scrollAmount = easeInOutCubic(progress);

        window.scrollTo(0, start + (end - start) * scrollAmount);

        if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
        } else {
            isScrolling = false;
        }
    }

    requestAnimationFrame(animateScroll);
}

window.addEventListener('wheel', smoothScroll, { passive: false });