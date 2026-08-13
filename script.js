// 导航栏滚动效果
// 导航栏滚动效果
const navbar = document.querySelector('.navbar');
const backTopBtn = document.querySelector('#backTop');
const fadeEl = document.querySelector('.fade-in');

window.addEventListener('scroll',()=>{
    if(window.scrollY > 40){
        navbar.classList.add('scrolled');
        backTopBtn.classList.add('show');
    }else{
        navbar.classList.remove('scrolled');
        backTopBtn.classList.remove('show');
    }
})

// 回到顶部
backTopBtn.addEventListener('click',()=>{
    window.scrollTo({top:0,behavior:'smooth'})
})

// 页面载入滚动渐入，增加null判断，其他页面不会报错
window.addEventListener('load',()=>{
    setTimeout(()=>{
        if(fadeEl){
            fadeEl.classList.add('show')
        }
    },120)
})

// 移动端汉堡菜单
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click',()=>{
    navMenu.classList.toggle('open')
})

// 点击导航链接关闭移动端菜单
document.querySelectorAll('.nav-menu a').forEach(link=>{
    link.addEventListener('click',()=>{
        navMenu.classList.remove('open')
    })
})