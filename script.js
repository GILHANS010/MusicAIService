// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------
    // 1. 코어 UI 및 네비게이션 스크립트
    // --------------------------------------------------

    // 부드러운 스크롤 이동
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 저작권 연도 자동 업데이트
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 스크롤에 따른 네비게이션 메뉴 활성화
    const navItems = document.querySelectorAll('nav ul li a');
    const sectionsForNav = document.querySelectorAll('main section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;

        sectionsForNav.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // --------------------------------------------------
    // 2. 스크롤 애니메이션
    // --------------------------------------------------

    // 섹션 나타나는 효과
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 한 번 실행 후 관찰 중지
            }
        });
    }, {
        threshold: 0.15,
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --------------------------------------------------
    // 3. 인터랙티브 컴포넌트 (모달, FAQ)
    // --------------------------------------------------

    // 가사 보기 팝업(모달) 스크립트
    const modalContainer = document.getElementById('lyrics-modal-container');
    if (modalContainer) {
        const lyricsButtons = document.querySelectorAll('.lyrics-button');
        const modalTitle = document.getElementById('modal-title');
        const modalLyrics = document.getElementById('modal-lyrics');
        const closeModalButton = document.querySelector('.close-modal-button');
        const modalOverlay = document.querySelector('.modal-overlay');

        const openModal = (title, lyrics) => {
            modalTitle.textContent = title;
            modalLyrics.textContent = lyrics.trim();
            modalContainer.classList.add('active');
        };

        const closeModal = () => {
            modalContainer.classList.remove('active');
        };

        lyricsButtons.forEach(button => {
            button.addEventListener('click', () => {
                openModal(button.dataset.title, button.dataset.lyrics);
            });
        });

        closeModalButton.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modalContainer.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // FAQ 아코디언 스크립트
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const answer = faqItem.querySelector('.faq-answer');

            // 다른 열려있는 항목들을 닫기 (선택사항)
            // faqItem.parentElement.querySelectorAll('.faq-item').forEach(item => {
            //     if (item !== faqItem && item.classList.contains('active')) {
            //         item.classList.remove('active');
            //         item.querySelector('.faq-answer').style.maxHeight = '0';
            //     }
            // });

            faqItem.classList.toggle('active');

            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // --------------------------------------------------
    // 4. 문의하기 관련 스크립트
    // --------------------------------------------------
    
    // 이메일 문의 버튼 스크립트
    const emailInquiryButton = document.getElementById('email-inquiry-button');
    if (emailInquiryButton) {
        const email = 'contact@qlaudio.com';
        const subject = 'QLAUDIO AI 음원 제작 문의';
        const bodyTemplate = `
안녕하세요, QLAUDIO AI 서비스 관련하여 문의드립니다.

1. 이름 / 닉네임:
2. 연락처:
3. 원하시는 서비스 플랜: (예: AI 자작곡 프로듀싱)
4. 문의 내용:


감사합니다.
`;
        const encodedBody = encodeURIComponent(bodyTemplate.trim());
        emailInquiryButton.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodedBody}`;
    }

    // --- 고객 후기 캐러셀 스크립트 ---
    const carousel = document.querySelector('.testimonial-carousel');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const nextButton = document.querySelector('.carousel-nav.next');

    if (carousel && prevButton && nextButton) {
        const scrollAmount = 320; // 한 번에 스크롤할 너비 (카드 너비 + 갭)

        prevButton.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextButton.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // --- 이미지 확대(라이트박스) 스크립트 ---
    const lightboxContainer = document.getElementById('image-lightbox-container');
    if (lightboxContainer) {
        const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
        const lightboxImage = document.getElementById('lightbox-image');
        const closeLightboxButton = document.querySelector('.close-lightbox-button');
        const lightboxOverlay = lightboxContainer.querySelector('.modal-overlay');

        const openLightbox = (imageUrl) => {
            lightboxImage.setAttribute('src', imageUrl);
            lightboxContainer.classList.add('active');
        };

        const closeLightbox = () => {
            lightboxContainer.classList.remove('active');
        };

        lightboxTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault(); // 링크의 기본 동작 방지
                openLightbox(trigger.href);
            });
        });

        closeLightboxButton.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', closeLightbox);
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && lightboxContainer.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

}); // End DOMContentLoaded