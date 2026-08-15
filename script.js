// 导航栏滚动效果
const navbar = document.querySelector('header');
const backTopBtn = document.querySelector('#backTop');
const fadeEl = document.querySelector('.fade-in');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
        if (backTopBtn) backTopBtn.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        if (backTopBtn) backTopBtn.classList.remove('show');
    }
});

// 回到顶部
if (backTopBtn) {
    backTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 页面载入滚动渐入，增加null判断，其他页面不会报错
window.addEventListener('load', () => {
    setTimeout(() => {
        if (fadeEl) fadeEl.classList.add('show');
    }, 120);
});

// 移动端汉堡菜单
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
    });

    // 点击导航链接关闭移动端菜单
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburger.classList.remove('open');
        });
    });
}
