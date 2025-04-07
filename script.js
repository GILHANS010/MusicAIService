// script.js

document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling for Navigation Links
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

                // Optional: Close mobile menu if open
            }
        });
    });

    // Dynamic Copyright Year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Optional: Simple Fade-in Animation on Scroll
    const sections = document.querySelectorAll('.section');

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after revealed to improve performance
                // observer.unobserve(entry.target);
            }
            // Optional: Remove 'visible' class if element scrolls out of view
            // else {
            //     entry.target.classList.remove('visible');
            // }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null, // relative to the viewport
        threshold: 0.15, // trigger when 15% of the element is visible
        // rootMargin: '-50px' // Adjust trigger point if needed
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Optional: Add active class to nav link on scroll
    const navItems = document.querySelectorAll('nav ul li a');
    const sectionsForNav = document.querySelectorAll('main section[id]'); // Assuming main sections have IDs

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;

        sectionsForNav.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // Adjust offset as needed
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            // Check if the link's href matches the current section ID
            // Ensure the link actually has an href attribute before trying to access it
            const hrefAttribute = li.getAttribute('href');
             if (hrefAttribute && hrefAttribute.includes(current)) {
                li.classList.add('active');
             } else if (!current && hrefAttribute === '#hero') {
                 // Highlight 'Home' when at the top
                 li.classList.add('active');
             }
        });
    });


    // --- Mobile Navigation Toggle (Basic Example) ---
    // Add HTML for a hamburger button first:
    // e.g., in <header><nav> add: <button class="mobile-nav-toggle" aria-label="메뉴 열기"><i class="fas fa-bars"></i></button>
    // Then use JS like this (uncomment and adapt):
    /*
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('nav ul'); // Adjust selector if needed

    if (mobileNavToggle && primaryNav) {
        mobileNavToggle.addEventListener('click', () => {
            primaryNav.classList.toggle('active'); // Add CSS rules for .active state (e.g., display: flex)
            // Toggle ARIA expanded attribute and icon
            const isExpanded = primaryNav.classList.contains('active');
            mobileNavToggle.setAttribute('aria-expanded', isExpanded);
            mobileNavToggle.querySelector('i').classList.toggle('fa-bars', !isExpanded);
            mobileNavToggle.querySelector('i').classList.toggle('fa-times', isExpanded);
        });
    }
    */

// Add this inside the DOMContentLoaded event listener in script.js

const mailtoButton = document.getElementById('mail-inquiry-button');
if (mailtoButton) {
    const email = 'contact@qlaudio.com'; // 문의받을 이메일 주소
    const subject = 'QLAUDIO AI 곡 제작 문의'; // 이메일 제목
    const bodyTemplate = `안녕하세요, QLAUDIO AI 곡 제작 관련하여 문의드립니다.

아래 양식에 맞춰 작성 부탁드립니다.
-------------------------------------
1. 이름:

2. 연락처:

3. 선택 상품 (아래 가격표 참고하여 기재 또는 복사):
[ ] AI MR 제작 (49,000원)
[ ] 개인 AI 곡 제작 (79,000원)
[ ] 내 목소리 AI 커버곡 (129,000원)
[ ] AI 자작곡 만들기 (198,000원)
[ ] AI 듀엣 자작곡 만들기 (280,000원)
[ ] 프로 퀄리티 AI 자작곡 (500,000원)

4. 제작 기한 (희망 완료일):

5. 음원 레퍼런스 (유사한 느낌의 곡 유튜브 URL 또는 곡명/아티스트):

6. 기타 요청사항:

-------------------------------------

감사합니다.
`;
    // URL 인코딩 (줄바꿈 포함)
    const encodedBody = encodeURIComponent(bodyTemplate).replace(/%0A/g, '%0D%0A');

    mailtoButton.addEventListener('click', (event) => {
        // Set the href dynamically on click to avoid potential issues on page load
        event.currentTarget.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodedBody}`;
        // Allow the default mailto link behavior to proceed
    });
}

}); // End DOMContentLoaded