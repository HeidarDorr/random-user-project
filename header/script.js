////////////////////////////////////////////////////////////////////////////////////////////////////// Right Nav (Mobile)

const rightNavIcons = document.querySelectorAll('.right-nav .icon')
const rightNavIcon = document.querySelectorAll('.right-nav .icon')[0]
const rightNavCloseIcon = document.querySelectorAll('.right-nav .icon')[1]
const rightNav = document.querySelector('.right-nav ul')
const afterDarkBg = document.querySelector('#after-dark-bg')
const blurLayer = document.querySelector('.blur-layer')

let rightNavVisibility = false

function openRightVav() {
    rightNav.style.right = '0rem'
    rightNav.style.setProperty('--right-nav-li-X', '-.25rem')
    setTimeout(() => { rightNav.style.setProperty('--right-nav-li-X', '0') }, 350)
    blurLayer.style.visibility = 'visible'
    blurLayer.style.opacity = '1'
    setTimeout(() => { rightNavIcon.style.right = '-3rem' }, 400)
    setTimeout(() => { rightNavCloseIcon.style.right = '1.4rem' }, 500)
    setTimeout(() => { rightNavVisibility = true }, 500)
}

function closeRightNav(dur) {
    rightNav.style.right = '-15.5rem'
    rightNav.style.setProperty('--right-nav-li-X', '3rem')
    blurLayer.style.visibility = 'hidden'
    blurLayer.style.opacity = '0'
    setTimeout(() => { rightNavCloseIcon.style.right = '-3rem' }, dur)
    setTimeout(() => { rightNavIcon.style.right = '1.4rem' }, 500)
    setTimeout(() => { rightNavVisibility = false }, 500)
}

rightNavIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        if (!rightNavVisibility) openRightVav()
        else if (rightNavVisibility) closeRightNav(400)
    })
})

window.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
        if (rightNavVisibility) {
            closeRightNav(300)
        }
    }
})

window.addEventListener('click', e => {
    if (!e.target.closest('.right-nav ul') && !e.target.closest('.right-nav i')) {
        if (rightNavVisibility) {
            closeRightNav(300)
        }
    }
})

document.querySelectorAll('.right-nav a.for-close-nav').forEach(item => {
    item.addEventListener('click', () => {
        closeRightNav(300)
    })
})

///////////////////////////////////////////////////////////////////////////////////////////////// Right Nav Icon Changing Color

function rightNavIconsColorHandler() {
    if (afterDarkBg.getBoundingClientRect().y > 36) {
        rightNavIcons.forEach(i => i.style.setProperty('--icon-color', '#fff'))
    } else {
        rightNavIcons.forEach(i => i.style.setProperty('--icon-color', 'var(--color-1)'))
    }
}

window.addEventListener('scroll', () => {
    if (document.location.pathname === '/product-page/product.html') {
        if (document.querySelector('#preload').style.display === 'none') rightNavIconsColorHandler()
    } else {
        rightNavIconsColorHandler()
    }
})

window.addEventListener('load', () => {
    rightNavIconsColorHandler()
})



//////////////////////////////////////////////////////////////////////////////////////////////////// Header Animation (PC)

import { goUpBtnFocus } from "../footer/script.js"

const navbar = document.querySelector('header')
const after100vh = document.querySelector('#after-100vh')

let isAnimHeaderOn = false

function headerAnim() {
    if (!goUpBtnFocus) {
        if (after100vh.getBoundingClientRect().y < 0) {
            navbar.classList.remove('anim-header-up')
            navbar.classList.add('anim-header-down')

            isAnimHeaderOn = true
        } else {
            if (isAnimHeaderOn) {
                navbar.classList.remove('anim-header-down')
                navbar.classList.add('anim-header-up')
            }
            isAnimHeaderOn = false
        }
    }
}

window.addEventListener('scroll', () => {
    if (document.location.pathname === '/product-page/product.html') {
        if (document.querySelector('#preload').style.display === 'none') headerAnim()
    } else headerAnim()
})



/////////////////////////////////////////////////////////////////////////////// Copy right Flash Light Round Animation (PC)

const roundLight = document.querySelector('.around-light-container i')
let isLi2Clicked = false

document.querySelector('.copy-right-li').addEventListener('click', () => {
    roundLight.style.animation = ''

    if (+(window.scrollY + window.innerHeight) > document.body.clientHeight - 5) {
        roundLight.style.animation = 'around-light-anim 1.7s'
    } else {
        window.onscroll = () => {
            isLi2Clicked = true

            if (isLi2Clicked && +(window.scrollY + window.innerHeight) > document.body.clientHeight - 5) {
                setTimeout(() => {
                    roundLight.style.animation = 'around-light-anim 1.7s'
                    isLi2Clicked = false
                }, 200)
            }
        }
    }
})

//////////////////////////////////////////////////////////////////////////////// Copy right title lighting animation (Mobile)

let isLiClicked = false

function titleLightingAnim() {
    let i_1 = -200
    let i_2 = -190
    let i_3 = -10
    let i_4 = 0

    const theInterval = setInterval(() => {
        document.querySelector('.copy-right-h3-container').setAttribute('style', `
            background: linear-gradient(150deg, var(--color-4) ${i_1}%, var(--color-3) ${i_2}% ${i_3}%, var(--color-4) ${i_4}%);
            -webkit-background-clip: text;
            -moz-background-clip: text;
            -webkit-text-fill-color: transparent;
            -moz-text-fill-color: transparent;
        `)
        i_1++; i_2++; i_3++; i_4++

        if (i_1 >= 100) clearInterval(theInterval)
    }, 1)
}

document.querySelector('.copy-right-li-mobile').addEventListener('click', () => {
    if (+(window.scrollY + window.innerHeight) > document.body.clientHeight - 5) {
        setTimeout(titleLightingAnim, 400)
    } else {
        isLiClicked = true

        window.onscroll = () => {
            if (isLiClicked && +(window.scrollY + window.innerHeight) > document.body.clientHeight - 5) {
                setTimeout(() => {
                    titleLightingAnim()
                    isLiClicked = false
                }, 400)
            }
        }
    }
})



////////////////////////////////////////////////////////////////////////////////////////////////// Auto Scroll to Sections

window.addEventListener('load', () => {
    if (location.hash === '#documentation-section') {
        window.scrollTo({top: document.querySelector('#documentation-section').getBoundingClientRect().y, behavior: 'smooth'})
    }
    else if (location.hash === '#pagination-section') {
        window.scrollTo({top: document.querySelector('#pagination-section').getBoundingClientRect().y, behavior: 'smooth'})
    }
})