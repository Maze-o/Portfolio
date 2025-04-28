import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";
import './styles.scss';

initScrollReveal(targetElements, defaultProps);
initTiltEffect();

// 헤더 스크롤 시 디자인 변경
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-wrapper');

    if (window.scrollY > 104) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// 로고 클릭 시 젤 위로
const logoBtn = document.querySelector('.header-logo');
logoBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// 헤더 버튼들 클릭 시 위치 이동
document.querySelectorAll('.header-nav button').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // 조건에 따라 스크롤 위치 보정값 조절
            const offset = (targetId === '#skills' || targetId === '#projects') ? 0 : 65;

            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

 // 이미지를 클릭하면 모달에 해당 이미지를 띄우는 함수
 const zoomImages = document.querySelectorAll('#modal-img');
 zoomImages.forEach(image => {
   image.addEventListener('click', function() {
     const modalImage = document.getElementById('modalImage');
     modalImage.src = this.src;  // 클릭한 이미지의 src를 모달에 반영
   });
 });