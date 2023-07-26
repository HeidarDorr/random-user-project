/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Documentation Section

const titleOverlay = document.querySelector('.documentation-container h3 .overlay')
const titleOverlayI = document.querySelector('.documentation-container h3 .overlay i')

let isWelcomeAnimRan = false
let isWelcomeAnimOn = false

function welcomeTextAnimation() {
    document.querySelectorAll('.documentation-container h3 span').forEach(i => i.style.display = 'none')
    titleOverlay.style.left = '0'
    titleOverlay.style.display = 'block'
    titleOverlay.style.animation = ''
    titleOverlayI.style.display = 'block'
    titleOverlayI.style.animation = 'typingAnimI 1s steps(1) infinite'

    window.onscroll = () => {
        if (!isWelcomeAnimRan && document.querySelector('.documentation-container').getBoundingClientRect().bottom < window.innerHeight) {
            isWelcomeAnimRan = true
            isWelcomeAnimOn = true

            setTimeout(() => {
                titleOverlayI.style.animation = ''
                titleOverlay.style.animation = 'typingAnim 2.1s steps(19) forwards'
                setTimeout(() => {
                    titleOverlayI.style.animation = 'typingAnimI 1s steps(1) infinite'
                }, 2600)
                setTimeout(() => {
                    titleOverlayI.style.animation = ''
                    titleOverlay.style.left = '100%'
                    titleOverlay.style.animation = 'typingAnim2 .7s steps(6) forwards'
                }, 3000)
                setTimeout(() => {
                    document.querySelectorAll('.documentation-container h3 span')[0].style.display = 'inline'
                    document.querySelectorAll('.documentation-container h3 span')[1].style.display = 'inline'
                    titleOverlay.style.left = '8rem'
                    titleOverlay.style.animation = 'typingAnim 1.7s steps(17) forwards'
                }, 4200)
                setTimeout(() => {
                    titleOverlayI.style.animation = 'typingAnimI 1s steps(1) infinite'
                }, 6400)
                setTimeout(() => {
                    document.querySelectorAll('.documentation-container h3 span')[2].style.display = 'inline'
                }, 7000)
                setTimeout(() => {
                    titleOverlayI.style.display = 'none'

                    isWelcomeAnimOn = false
                }, 9500)
            }, 2000)
        }
    }
}

document.querySelectorAll('.documentation-li').forEach(i => i.addEventListener('click', () => {
    isWelcomeAnimRan = false

    if (!isWelcomeAnimOn) {
        welcomeTextAnimation()
    }
}))

window.addEventListener('load', () => {
    console.log(document.cookie)
    if (!document.cookie.split(';').find(row => row.trim().startsWith('welcomeTextAnimRan'))) {
        welcomeTextAnimation()

        const now = new Date()
        now.setTime(now.getTime() + 60 * 1000)
        document.cookie = `welcomeTextAnimRan;path=/;expires=${now}`
    }
    else if (document.location.hash === '#documentation-section') {
        welcomeTextAnimation()
    }
})



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Pagination Section

const firstPage = document.querySelector('.pagination-container .page')

let pageItemsCount = window.innerWidth > 992 ? 8 : 6
let allItemsCount = 24

let paginationBtnsAnimationTimeout

function paginationGenerator() {
    firstPage.innerHTML = ''
    document.querySelector('.pagination-btns').innerHTML = '<span class="pagination-btn active">1<span><i id="dynamic-underline"></i></span></span>'

    const card = `
        <div class="page-card">
            <a><img src="../images/black-user-member-guest-icon-31634946589seopngzc1t-2.png"></a>
            <span><span style="visibility: hidden">.........</span></span>
        </div>
    `

    for (let i = 0; i < pageItemsCount; i++) {
        firstPage.insertAdjacentHTML('beforeend', card)
    }

    for (let i = 1; i < Math.ceil(allItemsCount / pageItemsCount); i++) {
        let page = document.createElement('div')
        page.classList.add('page')
        page.setAttribute('style', `position: absolute; right: -${i}00%`)

        if (i === Math.ceil(allItemsCount / pageItemsCount) - 1) {
            let lastPageItems = allItemsCount % pageItemsCount
            if (lastPageItems === 0) lastPageItems = pageItemsCount

            for (let i = 0; i < lastPageItems; i++) {
                page.insertAdjacentHTML('beforeend', card)
            }
        } else {
            for (let i = 0; i < pageItemsCount; i++) {
                page.insertAdjacentHTML('beforeend', card)
            }
        }

        firstPage.append(page)

        document.querySelector('.pagination-btns').insertAdjacentHTML('beforeend', `
            <span class="pagination-btn">${i + 1}<span><i id="dynamic-underline"></i></span></span>
        `)
    }

    paginationBtns()
    paginationBtnsMobile()
}

window.addEventListener('load', paginationGenerator)

/////////////////////////////////////////////////////////////////////////////////////////// Pagination Btns Handler & Animation

function paginationBtns() {
    document.querySelectorAll('.pagination-btn')[0].style.setProperty('--pagination-btn-gradient', '100%')

    document.querySelectorAll('.pagination-btn').forEach(btn => btn.addEventListener('click', () => {
        if (window.innerWidth > 992) {
            paginationBtnsAnimation(document.querySelector('.pagination-btn.active'), btn)

            document.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'))
            btn.classList.add('active')

            firstPage.style.transform = `translateX(-${btn.textContent - 1}00%)`
        }
    }))
}

function paginationBtnsAnimation(prevBtn, btn) {
    if (prevBtn === btn) return
    clearTimeout(paginationBtnsAnimationTimeout)

    let i1 = 100
    const interval = setInterval(() => {
        prevBtn.style.setProperty('--pagination-btn-gradient', `${i1}%`)
        i1--

        if (i1 <= -1) clearInterval(interval)
    }, 4)

    paginationBtnsAnimationTimeout = setTimeout(() => {
        let i2 = 0
        const interval2 = setInterval(() => {
            btn.style.setProperty('--pagination-btn-gradient', `${i2}%`)
            i2++

            if (i2 >= 100) clearInterval(interval2)
        }, 4)
    }, 500)
}

///////////////////////////////////////////////////////////////////////////////////////////// Pagination Btns Mobile Animation

const firstPageLeftRect = firstPage.getBoundingClientRect().left

function paginationBtnsMobile() {
    const pages = document.querySelectorAll('.page')
    const allPaginationBtns = document.querySelectorAll('.pagination-btn')

    document.querySelector('.pagination-container').onscroll = () => {
        let leftPersentage = Math.floor(((firstPage.getBoundingClientRect().left - firstPageLeftRect) / ((pages[pages.length - 1].getBoundingClientRect().left - firstPage.getBoundingClientRect().left) / (pages.length - 1))) * -100)

        let leftPersentage0 = leftPersentage + 100
        let leftPersentage1 = leftPersentage
        let leftPersentage2 = leftPersentage - 100
        let leftPersentage3 = leftPersentage - 200
        let leftPersentage4 = leftPersentage - 300
        let leftPersentage5 = leftPersentage - 400
        let leftPersentage6 = leftPersentage - 500
        let leftPersentage7 = leftPersentage - 600
        let leftPersentage8 = leftPersentage - 700
        let leftPersentage9 = leftPersentage - 800

        if (leftPersentage0 > 100) leftPersentage0 = leftPersentage0 - ((leftPersentage0 - 100) * 2)
        allPaginationBtns[0].style.setProperty('--pagination-btn-gradient', `${leftPersentage0}%`)
        if (leftPersentage1 > 100) leftPersentage1 = leftPersentage1 - ((leftPersentage1 - 100) * 2)
        allPaginationBtns[1].style.setProperty('--pagination-btn-gradient', `${leftPersentage1}%`)
        if (!allPaginationBtns[2]) return
        if (leftPersentage2 > 100) leftPersentage2 = leftPersentage2 - ((leftPersentage2 - 100) * 2)
        allPaginationBtns[2].style.setProperty('--pagination-btn-gradient', `${leftPersentage2}%`)
        if (!allPaginationBtns[3]) return
        if (leftPersentage3 > 100) leftPersentage3 = leftPersentage3 - ((leftPersentage3 - 100) * 2)
        allPaginationBtns[3].style.setProperty('--pagination-btn-gradient', `${leftPersentage3}%`)
        if (!allPaginationBtns[4]) return
        if (leftPersentage4 > 100) leftPersentage4 = leftPersentage4 - ((leftPersentage4 - 100) * 2)
        allPaginationBtns[4].style.setProperty('--pagination-btn-gradient', `${leftPersentage4}%`)
        if (!allPaginationBtns[5]) return
        if (leftPersentage5 > 100) leftPersentage5 = leftPersentage5 - ((leftPersentage5 - 100) * 2)
        allPaginationBtns[5].style.setProperty('--pagination-btn-gradient', `${leftPersentage5}%`)
        if (!allPaginationBtns[6]) return
        if (leftPersentage6 > 100) leftPersentage6 = leftPersentage6 - ((leftPersentage6 - 100) * 2)
        allPaginationBtns[6].style.setProperty('--pagination-btn-gradient', `${leftPersentage6}%`)
        if (!allPaginationBtns[7]) return
        if (leftPersentage7 > 100) leftPersentage7 = leftPersentage7 - ((leftPersentage7 - 100) * 2)
        allPaginationBtns[7].style.setProperty('--pagination-btn-gradient', `${leftPersentage7}%`)
        if (!allPaginationBtns[8]) return
        if (leftPersentage8 > 100) leftPersentage8 = leftPersentage8 - ((leftPersentage8 - 100) * 2)
        allPaginationBtns[8].style.setProperty('--pagination-btn-gradient', `${leftPersentage8}%`)
        if (!allPaginationBtns[9]) return
        if (leftPersentage9 > 100) leftPersentage9 = leftPersentage9 - ((leftPersentage9 - 100) * 2)
        allPaginationBtns[9].style.setProperty('--pagination-btn-gradient', `${leftPersentage9}%`)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////// Hand Pointer Guide For Mobile

document.querySelector('.pagination-btns').addEventListener('click', () => {
    if (window.innerWidth < 992) {
        document.querySelector('#pagination-section .hand-pointer').style.animation = ''
        setTimeout(() => document.querySelector('#pagination-section .hand-pointer').style.animation = 'hand-pointer-anim 4s', 0)
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////// Pagination Fetch Data & Set

let i = 1

function paginationGetData() {
    fetch('https://randomuser.me/api/')
        .then(res => res.json())
        .then(data => {
            paginationSetData(i - 1, data.results[0], data.info.seed)

            if (i < allItemsCount) {
                paginationGetData()
                i++
            }
        })
}

function paginationSetData(i, data, seed) {
    document.querySelectorAll('.page-card img')[i].src = data.picture.large
    document.querySelectorAll('.page-card img')[i].style.outline = '1px var(--color-5) solid'

    document.querySelectorAll('.page-card a')[i].classList.add('loading-off')
    document.querySelectorAll('.page-card a')[i].href = `../product-page/product.html?seed=${seed}`
    document.querySelectorAll('.page-card a')[i].title = `Click to see more about ${data.name.first} ${data.name.last}!`

    document.querySelectorAll('.page-card span')[i].textContent = (data.name.first + ' ' + data.name.last).length >= 17 ? (data.name.first + ' ' + data.name.last).slice(0, 15).concat('...') : data.name.first + ' ' + data.name.last
    document.querySelectorAll('.page-card span')[i].style.backgroundColor = '#fcfcfc'
}

window.addEventListener('load', paginationGetData)

//////////////////////////////////////////////////////////////////////////////////////////////////////// Pagination Options Box

const perPageItems = [...document.querySelectorAll('.per-page-item')]
const perPageItemsMobile = [...document.querySelectorAll('.per-page-items.mobile .per-page-item')]
const allUsersItems = [...document.querySelectorAll('.all-users-item')]
const confirmCheck = document.querySelector('.options-box .confirm')

let confirmTimeout
let isPerItemClicked = false
let isAllItemClicked = false

function paginationOptionsAnimation(prevItem, item, items, roundI, gradientPosition, gradientPosCssVar, container, gradientPercentage, roundILeft) {
    let gradientPos = gradientPosition

    let prevAndCurrentItemDistance = items.indexOf(prevItem) > items.indexOf(item) ? items.indexOf(prevItem) - items.indexOf(item) : items.indexOf(item) - items.indexOf(prevItem)

    let intervalSpeed
    if (prevAndCurrentItemDistance === 3) intervalSpeed = 25
    else if (prevAndCurrentItemDistance === 2) intervalSpeed = 16
    else if (prevAndCurrentItemDistance === 1) intervalSpeed = 13

    document.querySelector(roundI).style.left = `calc(${items.indexOf(item) * gradientPercentage}% + ${roundILeft}px)`

    const theInterval = setInterval(() => {
        document.querySelector(container).style.setProperty(gradientPosCssVar, `${gradientPos}%`)

        if (items.indexOf(prevItem) < items.indexOf(item)) {
            gradientPos += 2
            if (gradientPos > items.indexOf(item) * gradientPercentage) clearInterval(theInterval)
        } else {
            gradientPos -= 2
            if (gradientPos < items.indexOf(item) * gradientPercentage) clearInterval(theInterval)
        }
    }, intervalSpeed)
}

function confirmCheckHandler() {
    clearTimeout(confirmTimeout)
    confirmTimeout = setTimeout(backToPrevPos, 4000)

    confirmCheck.style.visibility = 'visible'
    confirmCheck.style.opacity = '1'
    confirmCheck.style.transform = 'rotate(45deg) translate(-1px, -1px)'

    confirmCheck.onclick = () => {
        clearTimeout(confirmTimeout)

        firstPage.style.transform = 'translateX(0)'
        confirmCheckShowOf()

        pageItemsCount = +document.querySelector('.per-page-item.active').textContent
        allItemsCount = +document.querySelector('.all-users-item.active').textContent
        i = 1
        paginationGenerator()
        paginationGetData()
    }
}

function confirmCheckShowOf() {
    confirmCheck.style.transform = 'rotate(45deg) translate(0px, 0px)'
    confirmCheck.style.opacity = '0'
    confirmCheck.style.visibility = 'hidden'
}

function backToPrevPos() {
    if (isPerItemClicked) {
        if (window.innerWidth > 992) {
            let defaultItem = perPageItems.find(i => {
                return +i.textContent === pageItemsCount
            })
            let prevItem = document.querySelector('.per-page-item.active')
            let gradientPos = perPageItems.indexOf(prevItem) < perPageItems.indexOf(defaultItem) ? (perPageItems.indexOf(defaultItem) - 1) * 33.5 : (perPageItems.indexOf(defaultItem) + 1) * 33.5

            if (prevItem !== defaultItem) {
                perPageItems.forEach(i => i.classList.remove('active'))
                defaultItem.classList.add('active')

                paginationOptionsAnimation(prevItem, defaultItem, perPageItems, '.per-page-items i', gradientPos, '--per-page-items-gradient-pos', '.per-page-items', 33.5, 4)
            }
        }

        else {
            let defaultItem = perPageItemsMobile.find(i => {
                return +i.textContent === pageItemsCount
            })
            let prevItem = document.querySelector('.per-page-items.mobile .per-page-item.active')
            let gradientPos = perPageItemsMobile.indexOf(prevItem) < perPageItemsMobile.indexOf(defaultItem) ? (perPageItemsMobile.indexOf(defaultItem) - 1) * 33.5 : (perPageItemsMobile.indexOf(defaultItem) + 1) * 33.5

            if (prevItem !== defaultItem) {
                perPageItems.forEach(i => i.classList.remove('active'))
                defaultItem.classList.add('active')

                paginationOptionsAnimation(prevItem, defaultItem, perPageItemsMobile, '.per-page-items.mobile i', gradientPos, '--per-page-items-gradient-pos', '.per-page-items.mobile', 33.5, 2)
            }
        }
    }


    if (isAllItemClicked) {
        let defaultItem = allUsersItems.find(i => {
            return +i.textContent === allItemsCount
        })
        let prevItem = document.querySelector('.all-users-item.active')
        let gradientPos = allUsersItems.indexOf(prevItem) < allUsersItems.indexOf(defaultItem) ? (allUsersItems.indexOf(defaultItem) - 1) * 25 : (allUsersItems.indexOf(defaultItem) + 1) * 25

        if (prevItem !== defaultItem) {
            allUsersItems.forEach(i => i.classList.remove('active'))
            defaultItem.classList.add('active')

            paginationOptionsAnimation(prevItem, defaultItem, allUsersItems, '.all-users-items i', gradientPos, '--all-users-items-gradient-pos', '.all-users-items', 25, 4)
        }
    }

    isPerItemClicked = false
    isAllItemClicked = false
    confirmCheckShowOf()
}



perPageItems.forEach(i => i.addEventListener('click', () => {
    let prevItem = document.querySelector('.per-page-item.active')
    let gradientPos = perPageItems.indexOf(prevItem) < perPageItems.indexOf(i) ? (perPageItems.indexOf(i) - 1) * 33.5 : (perPageItems.indexOf(i) + 1) * 33.5

    let prevItemMobile = document.querySelector('.per-page-items.mobile .per-page-item.active')
    let gradientPosMobile = perPageItemsMobile.indexOf(prevItemMobile) < perPageItemsMobile.indexOf(i) ? (perPageItemsMobile.indexOf(i) - 1) * 33.5 : (perPageItemsMobile.indexOf(i) + 1) * 33.5

    if (window.innerWidth > 992) {
        paginationOptionsAnimation(prevItem, i, perPageItems, '.per-page-items i', gradientPos, '--per-page-items-gradient-pos', '.per-page-items', 33.5, 4)
    } else {
        paginationOptionsAnimation(prevItemMobile, i, perPageItemsMobile, '.per-page-items.mobile i', gradientPosMobile, '--per-page-items-gradient-pos', '.per-page-items.mobile', 33.5, 2)
    }

    perPageItems.forEach(i => i.classList.remove('active'))
    i.classList.add('active')

    isPerItemClicked = true
    confirmCheckHandler()
}))

allUsersItems.forEach(i => i.addEventListener('click', () => {
    let prevItem = document.querySelector('.all-users-item.active')
    let gradientPos = allUsersItems.indexOf(prevItem) < allUsersItems.indexOf(i) ? (allUsersItems.indexOf(i) - 1) * 25 : (allUsersItems.indexOf(i) + 1) * 25

    paginationOptionsAnimation(prevItem, i, allUsersItems, '.all-users-items i', gradientPos, '--all-users-items-gradient-pos', '.all-users-items', 25, 4)

    allUsersItems.forEach(i => i.classList.remove('active'))
    i.classList.add('active')

    isAllItemClicked = true
    confirmCheckHandler()
}))

window.addEventListener('load', () => { if (window.innerWidth < 992) perPageItems[1].classList.remove('active') })