const userTitle = document.querySelector('#user-title')
const userContent = document.querySelector('#user-content')

const icons = document.querySelectorAll('.icons-container i')
const userIcon = document.querySelectorAll('.icons-container i')[0]
const emailIcon = document.querySelectorAll('.icons-container i')[1]
const calendarIcon = document.querySelectorAll('.icons-container i')[2]
const phoneIcon = document.querySelectorAll('.icons-container i')[3]
const keyIcon = document.querySelectorAll('.icons-container i')[4]

const dots = document.querySelectorAll('.dots-container.pc .dot')

let sliderDataArray = []

function sliderObjectMaker() {
    for (let i = 0; i < dots.length; i++) {
        getData()
    }
}

function getData() {
    fetch("https://randomuser.me/api/")
        .then(res => res.json())
        .then(data => {
            sliderDataArray.push(data)
            if (sliderDataArray.length === dots.length) {
                setData()
            }
        })
}

function setData() {
    sliderImageGenerator()
    sliderIconsHandler(0)
    userNameDisplayer(0)
    dotsClickHandler()
    sliderTimer()
    onMouseOutOfSlider()
    handPointerGuide()

    arrows.forEach(arrow => arrow.style.visibility = 'visible')
}

function sliderGenerator(arrowsIndex, dotsIndex, indexsDiffrence) {
    userContent.style.opacity = '.7'

    setTimeout(() => {
        sliderIconsHandler(arrowsIndex)
        userNameDisplayer(dotsIndex)
    }, indexsDiffrence * 400)
}

function sliderIconsHandler(index) {
    userIcon.onmouseover = () => {
        userNameDisplayer(index)
    }

    emailIcon.onmouseover = () => {
        userTitle.innerHTML = 'My email address is'
        userContent.innerHTML = sliderDataArray[index].results[0].email

        iconsSetColorAndPos(emailIcon)
    }

    calendarIcon.onmouseover = () => {
        userTitle.innerHTML = 'My birthday is'
        userContent.innerHTML = sliderDataArray[index].results[0].dob.date.slice(0, 10)

        iconsSetColorAndPos(calendarIcon)
    }

    phoneIcon.onmouseover = () => {
        userTitle.innerHTML = 'My phone number is'
        userContent.innerHTML = sliderDataArray[index].results[0].phone

        iconsSetColorAndPos(phoneIcon)
    }

    keyIcon.onmouseover = () => {
        userTitle.innerHTML = 'My password is'
        userContent.innerHTML = sliderDataArray[index].results[0].login.password

        iconsSetColorAndPos(keyIcon)
    }
}

function userNameDisplayer(index) {
    userTitle.innerHTML = 'Hi, My name is'
    userContent.style.opacity = '1'
    userContent.innerHTML = sliderDataArray[index].results[0].name.first + ' ' + sliderDataArray[index].results[0].name.last + `<a href="${'../product-page/product.html?seed=' + sliderDataArray[index].info.seed}" title="${'More About ' + sliderDataArray[index].results[0].name.first + ' ' + sliderDataArray[index].results[0].name.last}"><i class="fa fa-external-link"></i></a>`

    iconsSetColorAndPos(userIcon)
}

function iconsSetColorAndPos(icon) {
    icons.forEach(icon => icon.style.color = '#ddd')
    icon.style.color = 'var(--color-3)'

    icons.forEach(icon => icon.style.transform = 'translateY(0)')
    icon.style.transform = 'translateY(-1px)'
}

window.addEventListener('load', () => { setTimeout(() => { sliderObjectMaker() }, 1) })



//////////////////////////////////////////////////////////////////////////////////////////////////////////////// Dots Click Handler

function dotsClickHandler() {
    dots.forEach(dot => {
        dot.onclick = () => {
            let dotsIndex = dot.className.slice(-1) - 1

            if (dotsIndex !== arrowsIndex && !isOnAnimation) {
                arrowsIndex = dotsIndex

                sliderAnimationGenarator(arrowsIndex)
                dotsAnimationGenerator(greenDot, arrowsIndex, indexsDiffrence, indexsDiffrence, .8, .5, 400)

                sliderGenerator(arrowsIndex, dotsIndex, indexsDiffrence)
            }
        }
    })
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////// Next-Prev & Timer

const sliderContainer = document.querySelector('.slider-container')
const arrows = document.querySelectorAll('.dots-container-pc-before i')
const arrowRight = document.querySelectorAll('.dots-container-pc-before i')[1]
const arrowLeft = document.querySelectorAll('.dots-container-pc-before i')[0]

let arrowsIndex = 0
let isMouseOverSliderContainer = false

function nextItem() {
    if (!isOnAnimation) {
        arrowsIndex++
        if (arrowsIndex > dots.length - 1) { arrowsIndex = 0 }

        sliderAnimationGenarator(arrowsIndex)
        dotsAnimationGenerator(greenDot, arrowsIndex, indexsDiffrence, indexsDiffrence, .8, .5, 400)

        sliderGenerator(arrowsIndex, arrowsIndex, indexsDiffrence)

        if (indexsDiffrence === dots.length - 1) { showArrow(arrowLeft, indexsDiffrence) }
    }
}

function prevItem() {
    if (!isOnAnimation) {
        arrowsIndex--
        if (arrowsIndex < 0) { arrowsIndex = dots.length - 1 }

        sliderAnimationGenarator(arrowsIndex)
        dotsAnimationGenerator(greenDot, arrowsIndex, indexsDiffrence, indexsDiffrence, .8, .5, 400)

        sliderGenerator(arrowsIndex, arrowsIndex, indexsDiffrence)

        if (indexsDiffrence === dots.length - 1) { showArrow(arrowRight, indexsDiffrence) }
    }
}

function sliderTimer() {
    const timer = setInterval(() => {
        if (!isMouseOverSliderContainer) {
            if (window.innerWidth > 992) { nextItem() }

            if (indexsDiffrence === 1) {
                showArrow(arrowRight, indexsDiffrence + 0.2)
            } else {
                showArrow(arrowLeft, indexsDiffrence)
            }
        }
    }, 4000)

    sliderContainer.onmouseover = () => {
        isMouseOverSliderContainer = true
    }
    sliderContainer.onmouseout = () => {
        isMouseOverSliderContainer = false
        clearInterval(timer)
    }
}
function onMouseOutOfSlider() { sliderContainer.onmouseout = () => { sliderTimer() } }

function showArrow(arrow, indexsDiffrence) {
    arrow.classList.add('show-arrow')
    setTimeout(() => { arrow.classList.remove('show-arrow') }, indexsDiffrence * 450)
}

arrowRight.addEventListener('click', nextItem)
arrowLeft.addEventListener('click', prevItem)



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Slider Animation

const imgContainer3 = document.querySelector('.img-container-3.pc')

let indexsDiffrence = 0
let prevIndex = 0

function sliderImageGenerator() {
    if (document.querySelector('.img-container-2.pc .random-user-icon')) {
        document.querySelector('.img-container-2.pc .random-user-icon').remove()
    }

    sliderDataArray.forEach(data => {
        let div = document.createElement('div')
        div.style.width = '10.2rem'
        div.style.height = '10.2rem'
        div.style.padding = '.2rem'

        let aTag = document.createElement('a')
        aTag.href = '../product-page/product.html?seed=' + data.info.seed
        aTag.style.cursor = 'unset'
        div.append(aTag)

        let img = document.createElement('img')
        img.src = data.results[0].picture.large
        img.title = 'Click to see more about ' + data.results[0].name.first + ' ' + data.results[0].name.last + '!'
        aTag.append(img)

        imgContainer3.append(div)
    })

    document.querySelector('.img-container').style.border = '1px solid var(--color-5)'
    greenDot.style.visibility = 'visible'

    setTimeout(() => { sliderImageGeneratorMobile() }, 1000)
}

function sliderAnimationGenarator(index) {
    if (index > prevIndex) {
        indexsDiffrence = index - prevIndex
    } else {
        indexsDiffrence = prevIndex - index
    }

    prevIndex = index

    sliderAnimation(index, indexsDiffrence).play()
}

const sliderAnimation = (index, indexsDiffrence) => {
    const keyFrame = new KeyframeEffect(imgContainer3,
        {
            transform: [`translateX(${index * -10.2}rem)`]
        }, {
        duration: indexsDiffrence * 400,
        fill: 'forwards',
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    })
    const animation = new Animation(keyFrame, document.timeline)

    return animation
}

////////////////////////////////////////////////////////////////////////////////////////////////////////// Slider Animation For Mobile

const imgContainer3Mobile = document.querySelector('.img-container-3.mobile')
const imgContainer2Mobile = document.querySelector('.img-container-2.mobile')
const dotsMobile = document.querySelectorAll('.dots-container.mobile .dot')

let sliderDisplayWidth = 0

function sliderImageGeneratorMobile() {
    if (document.querySelector('.img-container-2.mobile .random-user-icon')) {
        document.querySelector('.img-container-2.mobile .random-user-icon').remove()
    }

    sliderDataArray.forEach(data => {
        let div = document.createElement('div')
        div.style.width = '10.1rem'
        div.style.height = '10.1rem'
        div.style.padding = '.3rem'
        div.style.scrollSnapAlign = 'start'

        let aTag = document.createElement('a')
        aTag.href = '../product-page/product.html?seed=' + data.info.seed
        div.append(aTag)

        let img = document.createElement('img')
        img.src = data.results[0].picture.large
        aTag.append(img)

        imgContainer3Mobile.append(div)
    })

    imgContainer2Mobile.style.overflowX = 'scroll'
    imgContainer2Mobile.style.scrollSnapType = 'x mandatory'
    imgContainer3Mobile.style.padding = '0 10.1rem'

    greenDotMobile.style.visibility = 'visible'
    dotsMobile.forEach(dot => dot.style.visibility = 'visible')

    sliderDisplayWidth = -imgContainer2Mobile.getBoundingClientRect().width

    imgContainer2Mobile.addEventListener('scroll', () => { sliderMobileScrollHandler() })
}

function sliderMobileScrollHandler() {
    userContent.style.opacity = '.7'

    arrowsIndex = ((imgContainer3Mobile.getBoundingClientRect().x.toFixed(2) - imgContainer2Mobile.getBoundingClientRect().x.toFixed(2)) / sliderDisplayWidth).toFixed(2) - 1

    // Bug!
    if (arrowsIndex === 2.220446049250313e-16 || arrowsIndex === -2.220446049250313e-16) { arrowsIndex = 0 }
    // Bug!
    if (arrowsIndex === Infinity || arrowsIndex === -Infinity) {
        imgContainer3Mobile.innerHTML = ''
        sliderImageGeneratorMobile()
    }

    if (arrowsIndex % 1 === 0) {
        if (arrowsIndex >= 0 && arrowsIndex < dots.length) {

            if (!isPrevIndexSetted) { indexsDiffrenceMobileGenerator(arrowsIndex) }
            if (!isOnAnimation && indexsDiffrenceMobile) {
                dotsAnimationGenerator(greenDotMobile, arrowsIndex, 1, indexsDiffrenceMobile, .7, 1, 300)

                clearInterval(handPointerInterval)
            }

            sliderGenerator(arrowsIndex, arrowsIndex, 0)
        }
    }
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Dots Animation

const greenDot = document.querySelector('.dots-container.pc .green-dot')

let prevIndex2 = 0
let isOnAnimation = false

const dotsAnimation1 = (greenDot, indexsDiffrence, indexsDiffrenceForWidth, widthGap, width) => {
    const keyFrame = new KeyframeEffect(greenDot,
        {
            width: [(indexsDiffrenceForWidth * widthGap) + width + 'rem']
        }, {
        duration: indexsDiffrence * 100,
        fill: 'forwards',
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    })
    const animation = new Animation(keyFrame, document.timeline)

    return animation
}

const dotsAnimation2 = (greenDot, indexsDiffrence, width) => {
    const keyFrame = new KeyframeEffect(greenDot,
        {
            width: [width + 'rem']
        }, {
        duration: indexsDiffrence * 100,
        fill: 'forwards',
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    })
    const animation = new Animation(keyFrame, document.timeline)

    return animation
}

function dotsAnimationGenerator(greenDot, index, indexsDiffrence, indexsDiffrenceForWidth, widthGap, width, animDur) {
    isOnAnimation = true

    if (indexsDiffrence === 1) { indexsDiffrence = 1.5 }

    if (prevIndex2 < index) {
        greenDot.style.right = 'unset'
        dots[index].style.transform = 'translateX(-1px)'
        dots[prevIndex2].style.transform = 'translateX(4px)'
        dotsMobile[prevIndex2].style.transform = 'translateX(7px)'
    } else {
        greenDot.style.left = 'unset'
        dots[index].style.transform = 'translateX(1px)'
        dots[prevIndex2].style.transform = 'translateX(-4px)'
        dotsMobile[prevIndex2 + 1].style.transform = 'translateX(-7px)'
    }

    dotsAnimation1(greenDot, indexsDiffrence, indexsDiffrenceForWidth, widthGap, width).play()

    setTimeout(() => {
        dots[index].style.visibility = 'hidden'
        dots[prevIndex2].style.visibility = 'visible'
    }, 100)

    setTimeout(() => {
        if (prevIndex2 < index) {
            greenDot.style.left = 'unset'
            greenDot.style.right = widthGap * 4 - (widthGap * index) + 'rem'
        } else {
            greenDot.style.left = widthGap * index + 'rem'
            greenDot.style.right = 'unset'
        }

        dots.forEach(dot => dot.style.transform = 'translateX(0)')
        dotsMobile.forEach(dot => dot.style.transform = 'translateX(0)')

        dotsAnimation2(greenDot, indexsDiffrence, width).play()
    }, indexsDiffrence * (animDur - 100))

    setTimeout(() => {
        if (prevIndex2 < index) {
            greenDot.style.left = widthGap * index + 'rem'
        } else {
            greenDot.style.right = widthGap * 4 - (widthGap * index) + 'rem'
        }

        prevIndex2 = index
        isOnAnimation = false

        if (index !== arrowsIndex) {
            if (!(arrowsIndex % 1) && arrowsIndex >= 0 && arrowsIndex < dots.length) {
                dotsAnimationGenerator(greenDotMobile, arrowsIndex, 1, indexsDiffrenceMobile, .7, 1, 300)
            }
        }
    }, indexsDiffrence * animDur)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////// Dots Animation For Mobile

const greenDotMobile = document.querySelector('.dots-container.mobile .green-dot')

let indexsDiffrenceMobile = 0
let prevIndex3 = 0
let isPrevIndexSetted = false

function indexsDiffrenceMobileGenerator(index) {
    if (index > prevIndex3) {
        indexsDiffrenceMobile = index - prevIndex3
    } else {
        indexsDiffrenceMobile = prevIndex3 - index
    }

    prevIndex3 = index

    isPrevIndexSetted = true
    setTimeout(() => { isPrevIndexSetted = false }, 100)
}



////////////////////////////////////////////////////////////////////////////////////////////////////// Hand Pointer Guide For Mobile

const handPointer = document.querySelector('.dots-container.mobile .hand-pointer')
let handPointerInterval

function handPointerGuide() {
    handPointerInterval = setInterval(() => {
        if (imgContainer2Mobile.getBoundingClientRect().top > 0 && imgContainer2Mobile.getBoundingClientRect().bottom < window.innerHeight) {

            handPointer.style.animation = 'hand-pointer-anim 4s'
            setTimeout(() => { handPointer.style.animation = '' }, 4000)
            imgContainer2Mobile.onscroll = () => { handPointer.style.animation = '' }
        }
    }, 10000)
}