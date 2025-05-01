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
    image.addEventListener('click', function () {
        const modalImage = document.getElementById('modalImage');
        modalImage.src = this.src;  // 클릭한 이미지의 src를 모달에 반영
    });
});


// 모달 열렸을 때 GitHub에서 ReadMe 파일 내용 불러오기 (TripPlanner)
document.getElementById('readMeModal1').addEventListener('shown.bs.modal', function () {
    fetch('https://api.github.com/repos/TripPlanner-MY/TripPlanner_BN/contents/README.md') // 수정된 GitHub API 주소
      .then(response => response.json())
      .then(data => {
        const decodedContent = atob(data.content); // base64 디코딩
        
        // TextDecoder를 사용하여 UTF-8로 디코딩
        const utf8DecodedContent = new TextDecoder('utf-8').decode(new Uint8Array([...decodedContent].map(c => c.charCodeAt(0))));

        // 이미지 경로를 절대 경로로 변경
        const updatedContent = utf8DecodedContent.replace(/src="(\/[^"]+)"/g, (match, p1) => {
          return `src="https://raw.githubusercontent.com/TripPlanner-MY/TripPlanner_BN/main${p1}"`;
        });

        // marked.js로 마크다운 변환
        document.getElementById('readMeContent1').innerHTML = marked.marked(updatedContent);
      })
      .catch(error => {
        console.error('Error fetching ReadMe file:', error);
        document.getElementById('readMeContent1').innerHTML = '<p>ReadMe 파일을 불러오는 데 문제가 발생했습니다.</p>';
      });
});


  

// 모달 열렸을 때 GitHub에서 ReadMe 파일 내용 불러오기 (PGR)
document.getElementById('readMeModal').addEventListener('shown.bs.modal', function () {
    fetch('https://api.github.com/repos/Maze-o/PGR/contents/README.md') // GitHub API를 통해 raw 콘텐츠 가져오기
      .then(response => response.json())
      .then(data => {
        const decodedContent = atob(data.content); // base64 디코딩
        
        // TextDecoder를 사용하여 UTF-8로 디코딩
        const utf8DecodedContent = new TextDecoder('utf-8').decode(new Uint8Array([...decodedContent].map(c => c.charCodeAt(0))));

        // 이미지 경로를 절대 경로로 변경
        const updatedContent = utf8DecodedContent.replace(/src="(\/[^"]+)"/g, (match, p1) => {
          return `src="https://raw.githubusercontent.com/Maze-o/PGR/main${p1}"`; // 상대 경로를 절대 경로로 변환
        });

        // marked.js로 마크다운 변환
        document.getElementById('readMeContent').innerHTML = marked.marked(updatedContent); // 변환된 마크다운을 HTML로 출력
      })
      .catch(error => {
        console.error('Error fetching ReadMe file:', error);
        document.getElementById('readMeContent').innerHTML = '<p>ReadMe 파일을 불러오는 데 문제가 발생했습니다.</p>';
      });
});

  