let mainProductSeed = new URLSearchParams(location.search).get('seed')

function getData() {
    if (!mainProductSeed) location.href = '../main-page/index.html'

    fetch('https://randomuser.me/api/?seed=' + mainProductSeed)
        .then(res => res.json())
        .then(data => {
            setData(data.results[0])
            preLoad()
        })
}

function setData(data) {
    document.querySelector('.section-top h3').innerHTML = 'About ' + data.name.first + ' ' + data.name.last

    document.querySelector('.img-container img').src = data.picture.large
    document.querySelector('.user-name span').innerHTML = data.name.first + ' ' + data.name.last
    ifUserNameIsTooLong()

    Object.entries(data).forEach(data => {
        if (data[0] === 'location') return

        if (!(typeof data[1] === 'object')) {
            document.querySelector('.user-info-container').insertAdjacentHTML('afterbegin', `
                <div class="user-info">
                    <ul>
                        <li>${data[0]}: <span>${data[1]}</span></li>
                    </ul>
                </div>
            `)
        } else {
            const div = document.createElement('div')
            div.className = 'user-info'
            document.querySelector('.user-info-container').append(div)

            const ul = document.createElement('ul')
            div.append(ul)

            const li = document.createElement('li')
            li.innerHTML = data[0]
            li.classList.add('header-title')
            ul.append(li)

            const ul2 = document.createElement('ul')
            li.append(ul2)

            Object.entries(data[1]).forEach(data => {

                const li2 = document.createElement('li')
                li2.innerHTML = data[0]
                ul2.append(li2)

                if (!(typeof data[1] === 'object')) {
                    const span = document.createElement('span')
                    span.innerHTML = data[1]

                    li2.innerHTML = li2.innerHTML + ': '
                    li2.append(span)

                    if (!span.innerHTML) { span.closest('.user-info').remove() }
                } else {
                    const ul3 = document.createElement('ul')
                    li2.append(ul3)

                    if (data[1]) {
                        Object.entries(data[1]).forEach(data => {

                            const li3 = document.createElement('li')
                            li3.innerHTML = data[0] + ': '
                            ul3.append(li3)

                            const span2 = document.createElement('span')
                            span2.innerHTML = data[1]
                            li3.append(span2)
                        })
                    }
                }
            })
        }
    })

    document.querySelectorAll('.user-info').forEach(div => div.classList.add('user-info-fade-in'))
}

function preLoad() {
    document.querySelector('#preload').style.transition = '.4s'
    document.querySelector('#preload').style.opacity = '0'
    document.querySelector('#preload').addEventListener('transitionend', () => { document.querySelector('#preload').style.display = 'none' })
}

window.addEventListener('load', getData)

////////////////////////////////////////////////////////////////////////////////////////////// if user name is too long for mobile

function ifUserNameIsTooLong() {
    let addToBoxMobileDistanceToEnd = document.querySelector('.section-top').getBoundingClientRect().right - document.querySelector('.add-to-box.mobile .add-to-box-shadow').getBoundingClientRect().right

    if (addToBoxMobileDistanceToEnd < 30) {
        document.querySelector('.user-name span').innerHTML = document.querySelector('.user-name span').innerHTML.slice(0, 17).concat('...')
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Add To Favorites

let favoritesArray = document.cookie.split(';').find(row => row.trim().startsWith('favoritesSeeds')) ? document.cookie.split(';').find(row => row.trim().startsWith('favoritesSeeds')).split('=')[1].split(',') : ['']

const addToBoxBorder = document.querySelector('.add-to-box.pc .add-to-box-shadow')
const myIconColumn = document.querySelector('.add-to-box.pc .column')
const myIconRow = document.querySelector('.add-to-box.pc .row')
const addToText = document.querySelector('.add-to-box.pc span')

let isMyIconAnimOn = false

function addSeedToCookie() {
    setTimeout(() => { addToText.innerHTML = 'Add to favorites' }, 400)

    addToBoxBorder.onmouseover = () => { }
    addToBoxBorder.onmouseleave = () => { }

    addToBoxBorder.onclick = () => {
        if (!favoritesArray.includes(mainProductSeed)) {

            favoritesArray.push(mainProductSeed)

            const now = new Date()
            now.setTime(now.getTime() + 30 * 24 * 60 * 60 * 1000)
            document.cookie = `favoritesSeeds=${favoritesArray};path=/;expires=${now}`

            addToText.innerHTML = 'Added to favorites'
            addToBoxBorder.style.width = 38 + addToText.getBoundingClientRect().width + 'px'

            isMyIconAnimOn = true

            setTimeout(() => {
                myIconColumn.style.animation = 'plus-to-check-c .5s forwards'
                myIconRow.style.animation = 'plus-to-check-r .5s forwards'
            }, 200)
            setTimeout(() => {
                addToBoxBorder.style.width = '2rem'
                addToText.style.transform = 'translateX(-110%)'

                isMyIconAnimOn = false
                removeSeedFromCookie()
            }, 1300)
        }
    }
}

function removeSeedFromCookie() {
    setTimeout(() => { addToText.innerHTML = 'Remove from favorites' }, 400)

    addToBoxBorder.onmouseover = () => {
        if (!isMyIconAnimOn) {
            setTimeout(() => {
                myIconColumn.style.animation = 'check-to-minus-c .4s forwards'
                myIconRow.style.animation = 'check-to-minus-r .4s forwards'
            }, 200)
        }
        addToBoxBorder.onmouseleave = () => {
            if (!isMyIconAnimOn) {
                setTimeout(() => {
                    myIconColumn.style.animation = 'minus-to-check-c .5s forwards'
                    myIconRow.style.animation = 'minus-to-check-r .5s forwards'
                }, 400)
            }
        }
    }

    addToBoxBorder.onclick = () => {
        favoritesArray.some(seed => {
            if (seed === mainProductSeed) {

                favoritesArray.splice(favoritesArray.indexOf(seed), 1)

                const now = new Date()
                now.setTime(now.getTime() + 30 * 24 * 60 * 60 * 1000)
                document.cookie = `favoritesSeeds=${favoritesArray};path=/;expires=${now}`

                addToText.innerHTML = 'Removed from favorites'
                addToBoxBorder.style.width = 38 + addToText.getBoundingClientRect().width + 'px'

                isMyIconAnimOn = true

                setTimeout(() => {
                    myIconColumn.style.animation = 'minus-to-check-c .5s forwards'
                    myIconRow.style.animation = 'minus-to-check-r .5s forwards'
                }, 200)
                setTimeout(() => {
                    addToBoxBorder.style.width = '2rem'
                    addToText.style.transform = 'translateX(-110%)'
                }, 1300)
                setTimeout(() => {
                    addSeedToCookie()
                }, 1500)
                setTimeout(() => {
                    myIconColumn.style.animation = 'check-to-plus-c .4s forwards'
                    myIconRow.style.animation = 'check-to-plus-r .4s forwards'

                    isMyIconAnimOn = false
                }, 2000)
            }
        })
    }
}

addToBoxBorder.addEventListener('mouseover', () => {
    if (!isMyIconAnimOn) {
        addToBoxBorder.style.width = 38 + addToText.getBoundingClientRect().width + 'px'
        addToText.style.transform = 'translateX(0)'
    }
})
addToBoxBorder.addEventListener('mouseleave', () => {
    if (!isMyIconAnimOn) {
        addToBoxBorder.style.width = '2rem'
        addToText.style.transform = 'translateX(-110%)'
    }
})

function productSecIconRefresh() {
    if (!favoritesArray || !favoritesArray.includes(mainProductSeed)) {
        myIconColumn.style.animation = 'check-to-plus-c 0s forwards'
        myIconRow.style.animation = 'check-to-plus-r 0s forwards'
        addSeedToCookie()
    } else {
        myIconColumn.style.animation = 'plus-to-check-c 0s forwards'
        myIconRow.style.animation = 'plus-to-check-r 0s forwards'
        removeSeedFromCookie()
    }
}

setInterval(() => {
    let favoritesArray2 = document.cookie.split(';').find(row => row.trim().startsWith('favoritesSeeds')) ? document.cookie.split(';').find(row => row.trim().startsWith('favoritesSeeds')).split('=')[1].split(',') : ['']

    if (favoritesArray.length > 0 && favoritesArray.length !== favoritesArray2.length) {
        favoritesArray = favoritesArray2

        productSecIconRefresh()
        productSecIconRefreshMobile()
    }
}, 1000)

window.addEventListener('load', () => { productSecIconRefresh() })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////// Add To Favorites Mobile

const addToBoxMobile = document.querySelector('.add-to-box.mobile')
const addToTextMobile = document.querySelector('.add-to-box.mobile p')
const addToTextContainerMobile = document.querySelector('.add-to-box.mobile .add-to-text')
const myIconColumnMobile = document.querySelector('.add-to-box.mobile .column')
const myIconRowMobile = document.querySelector('.add-to-box.mobile .row')
const addToBoxMobileBtn = document.querySelector('.add-to-box.mobile .yes')
const addToBoxMobileTimer = document.querySelector('.add-to-box.mobile .timer-line')

let isMyIconMobileAnimOn = false

function showAddToBox() {
    addToTextContainerMobile.style.visibility = 'visible'
    addToTextContainerMobile.style.opacity = '1'
    addToTextContainerMobile.style.transform = 'translateY(0)'
    document.querySelector('.add-to-box.mobile .add-to-box-shadow').style.backgroundColor = '#161c22'
    myIconColumnMobile.style.backgroundColor = '#fff'
    myIconRowMobile.style.backgroundColor = '#fff'
}

function hideAddToBox() {
    addToTextContainerMobile.style.visibility = 'hidden'
    addToTextContainerMobile.style.opacity = '0'
    addToTextContainerMobile.style.transform = 'translateY(5px)'
    document.querySelector('.add-to-box.mobile .add-to-box-shadow').style.backgroundColor = 'var(--color-1)'
    myIconColumnMobile.style.backgroundColor = 'var(--color-4)'
    myIconRowMobile.style.backgroundColor = 'var(--color-4)'
}

function addSeedToCookieMobile() {
    addToTextContainerMobile.style.width = '11rem'
    addToTextContainerMobile.style.height = '4.7rem'
    addToBoxMobileBtn.style.display = 'flex'
    addToTextMobile.innerHTML = 'Add to favorites?'
    addToBoxMobileTimer.style.animation = ''

    addToBoxMobile.onclick = () => { }
    window.onclick = () => { }

    addToBoxMobileBtn.onclick = () => {
        if (!favoritesArray.includes(mainProductSeed)) {

            favoritesArray.push(mainProductSeed)

            const now = new Date()
            now.setTime(now.getTime() + 30 * 24 * 60 * 60 * 1000)
            document.cookie = `favoritesSeeds=${favoritesArray};path=/;expires=${now}`

            isMyIconMobileAnimOn = true

            setTimeout(() => {
                hideAddToBox()
            }, 150)
            setTimeout(() => {
                addToTextContainerMobile.style.height = '2.8rem'
                addToTextContainerMobile.style.transform = 'translateY(3px)'
                addToTextContainerMobile.style.width = '11.5rem'
            }, 600)
            setTimeout(() => {
                addToBoxMobileBtn.style.display = 'none'
                addToTextMobile.innerHTML = 'Added to favorites.'
                showAddToBox()
            }, 800)
            setTimeout(() => {
                myIconColumnMobile.style.animation = 'plus-to-check-c .3s forwards'
                myIconRowMobile.style.animation = 'plus-to-check-r-mobile .3s forwards'
            }, 1000)
            setTimeout(() => {
                addToBoxMobileTimer.style.animation = 'timer-line 1.7s'
            }, 1400)
            setTimeout(() => {
                hideAddToBox()
            }, 3200)

            setTimeout(() => {
                isMyIconMobileAnimOn = false
                removeSeedFromCookieMobile()
            }, 4000)
        }
    }
}

function removeSeedFromCookieMobile() {
    addToTextContainerMobile.style.width = '14.5rem'
    addToTextContainerMobile.style.height = '4.7rem'
    addToBoxMobileBtn.style.display = 'flex'
    addToTextMobile.innerHTML = 'Remove from favorites?'
    addToBoxMobileTimer.style.animation = ''

    addToBoxMobile.onclick = () => {
        if (!isMyIconMobileAnimOn) {
            setTimeout(() => {
                myIconColumnMobile.style.animation = 'check-to-minus-c .4s forwards'
                myIconRowMobile.style.animation = 'check-to-minus-r-mobile .4s forwards'
            }, 200)

            window.onclick = e => {
                if (!e.target.closest('.add-to-box.mobile') && !isMyIconMobileAnimOn) {
                    setTimeout(() => {
                        myIconColumnMobile.style.animation = 'minus-to-check-c .5s forwards'
                        myIconRowMobile.style.animation = 'minus-to-check-r-mobile .5s forwards'
                    }, 200)
                }
            }
        }
    }

    addToBoxMobileBtn.onclick = () => {
        favoritesArray.some(seed => {
            if (seed === mainProductSeed) {

                favoritesArray.splice(favoritesArray.indexOf(seed), 1)

                const now = new Date()
                now.setTime(now.getTime() + 30 * 24 * 60 * 60 * 1000)
                document.cookie = `favoritesSeeds=${favoritesArray};path=/;expires=${now}`

                isMyIconMobileAnimOn = true

                setTimeout(() => {
                    hideAddToBox()
                }, 150)
                setTimeout(() => {
                    addToTextContainerMobile.style.height = '2.8rem'
                    addToTextContainerMobile.style.transform = 'translateY(3px)'
                    addToTextContainerMobile.style.width = '14rem'
                }, 600)
                setTimeout(() => {
                    addToBoxMobileBtn.style.display = 'none'
                    addToTextMobile.innerHTML = 'Removed from favorites.'
                    showAddToBox()
                }, 800)
                setTimeout(() => {
                    myIconColumnMobile.style.animation = 'minus-to-check-c .3s forwards'
                    myIconRowMobile.style.animation = 'minus-to-check-r-mobile .3s forwards'
                }, 1000)
                setTimeout(() => {
                    addToBoxMobileTimer.style.animation = 'timer-line 1.7s'
                }, 1400)
                setTimeout(() => {
                    hideAddToBox()
                    myIconColumnMobile.style.animation = 'check-to-plus-c .4s forwards'
                    myIconRowMobile.style.animation = 'check-to-plus-r-mobile .4s forwards'
                }, 3200)

                setTimeout(() => {
                    isMyIconMobileAnimOn = false
                    addSeedToCookieMobile()
                }, 4000)
            }
        })
    }
}

function productSecIconRefreshMobile() {
    if (!favoritesArray || !favoritesArray.includes(mainProductSeed)) {
        myIconColumnMobile.style.animation = 'check-to-plus-c 0s forwards'
        myIconRowMobile.style.animation = 'check-to-plus-r-mobile 0s forwards'
        addSeedToCookieMobile()
    } else {
        myIconColumnMobile.style.animation = 'plus-to-check-c 0s forwards'
        myIconRowMobile.style.animation = 'plus-to-check-r-mobile 0s forwards'
        removeSeedFromCookieMobile()
    }
}

addToBoxMobile.addEventListener('click', () => {
    if (!isMyIconMobileAnimOn) showAddToBox()
})

window.addEventListener('click', e => {
    if (!e.target.closest('.add-to-box.mobile') && !isMyIconMobileAnimOn) hideAddToBox()
})

window.addEventListener('load', () => { productSecIconRefreshMobile() })