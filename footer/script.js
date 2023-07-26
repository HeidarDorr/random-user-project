const builderImages = document.querySelectorAll('.builder img')

function getDataFooter(builderImage) {
    fetch("https://randomuser.me/api/")
        .then(res => res.json())
        .then(data => data.results[0])
        .then(data => {
            builderImage.src = data.picture.large
            builderImage.title = data.name.first + ' ' + data.name.last
        })
}
window.addEventListener('load', () => {
    setTimeout( () => {
        getDataFooter(builderImages[0])
        getDataFooter(builderImages[1])
    }, 0)
})



/////////////////////////////////////////////////////////////////////////////////////////////////////////////// goUpBtn Animation

const goUpBtn = document.querySelectorAll('.go-up-btn')[0]

let goUpBtnFocus = false

goUpBtn.addEventListener('click', () => {
    goUpBtnFocus = true
    
    window.scrollTo({ top: 0, behavior: "smooth" })
    
    document.querySelector('header').classList.remove('anim-header-down')
    document.querySelector('header').classList.add('anim-header-up')

    window.onscroll = () => {
        if (window.scrollY === 0) { goUpBtnFocus = false }
    }
})

export { goUpBtnFocus }

//////////////////////////////////////////////////////////////////////////////////////////////////////////// goUpBtn Mobile Animation

const goUpBtnMobile = document.querySelector('.go-up-btn-mobile')

goUpBtnMobile.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    
    goUpBtnMobileAnim()
})

function goUpBtnMobileAnim() {
    let goUpBtnDistanceToBottom = window.innerHeight - goUpBtnMobile.getBoundingClientRect().bottom
    let goUpBtnDistanceToLeft = goUpBtnMobile.getBoundingClientRect().left

    let isScrolledUp = false

    const goUpBtnKeyFrames = new KeyframeEffect(
        goUpBtnMobile,
        {
            bottom: ['.5rem']
        }, {
        duration: 700,
        fill: 'forwards',
        easing: 'ease'
    })
    const goUpBtnAnimation = new Animation(goUpBtnKeyFrames, document.timeline)

    const goUpBtnKeyFrames2 = new KeyframeEffect(
        goUpBtnMobile,
        {
            bottom: ['-2.5rem']
        }, {
        duration: 300,
        fill: 'forwards',
        easing: 'ease'
    })
    const goUpBtnAnimation2 = new Animation(goUpBtnKeyFrames2, document.timeline)

    goUpBtnMobile.style.position = 'fixed'
    goUpBtnMobile.style.top = 'unset'
    goUpBtnMobile.style.bottom = goUpBtnDistanceToBottom + 'px'
    goUpBtnMobile.style.right = 'unset'
    goUpBtnMobile.style.left = goUpBtnDistanceToLeft + 'px'

    goUpBtnAnimation.play()

    window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            setTimeout(() => {
                goUpBtnAnimation2.play()
            }, 150)

            setTimeout(() => {
                goUpBtnBackToDefaultPos()

                goUpBtnAnimation.cancel()
                goUpBtnAnimation2.cancel()
            }, 450)

            isScrolledUp = true
        }
    })

    setTimeout(() => {
        if (!isScrolledUp) {
            goUpBtnMobile.animate({
                transform: ['translateX(-1px)', 'translateX(2px)', 'translateX(-2px)', 'translateX(2px)', 'translateX(-2px)', 'translateX(2px)', 'translateX(-2px)', 'translateX(1px)']
            }, 500)

            setTimeout(() => {
                goUpBtnAnimation2.play()

                setTimeout(() => {
                    goUpBtnBackToDefaultPos()

                    goUpBtnAnimation.cancel()
                    goUpBtnAnimation2.cancel()
                }, 300)
            }, 700)
        }
    }, 1000)
}

function goUpBtnBackToDefaultPos() {
    goUpBtnMobile.style.position = 'absolute'
    goUpBtnMobile.style.bottom = 'unset'
    goUpBtnMobile.style.top = '-.65rem'
    goUpBtnMobile.style.left = 'unset'
    goUpBtnMobile.style.right = '0'
}