const cardsContainer = document.querySelector('.favorites-container-2')
const loadLayerContainer = document.querySelector('.favorites-container-3')

let favoritesArray = document.cookie.split(';').find(row => row.trim().startsWith('favoritesSeeds')) ? document.cookie.split(';').find(row => row.trim().startsWith('favoritesSeeds')).split('=')[1].split(',') : ['']

let i = 1

function favoritesSecRefresh() {
    cardsContainer.style.display = 'none'
    cardsContainer.innerHTML = ''
    loadLayerContainer.innerHTML = ''

    if (favoritesArray[1]) {
        document.querySelectorAll('.template').forEach(item => item.style.display = 'none')

        i = 1

        loadLayer()
        getData(1)
    } else {
        document.querySelectorAll('.template').forEach(item => item.style.display = 'block')
    }
}

function getData(index) {
    fetch('https://randomuser.me/api/?seed=' + favoritesArray[index])
        .then(res => res.json())
        .then(data => {
            setData(data.results[0], data.info.seed)

            if (i < favoritesArray.length) {
                getData(i)
                i++
            }
        })
}

function setData(data, seed) {
    let ckeckIfSeedRepeat = false;
    [...document.querySelectorAll('.main-card')].forEach(i => {
        if (seed === i.dataset.seed) {
            ckeckIfSeedRepeat = true
            console.log('Seed Repeat bug')
        }
    })

    if (!ckeckIfSeedRepeat) {

        cardsContainer.insertAdjacentHTML('beforeend', `
            <div class="card main-card" data-seed="${seed}">
                <div class="card-top">
                    <a href="${'../product-page/product.html?seed=' + seed}"}"><img src="${data.picture.large}" title="${'Click to see more about ' + data.name.first + ' ' + data.name.last + '!'}"></a>
                    <span>${data.name.first + ' ' + data.name.last}</span>
                </div>
                <div class="card-bottom">
                    <ul>
                        <li>Country: <span>${data.location.country}</span></li>
                        <li>Phone: <span>${data.phone}</span></li>
                        <li>Username: <span class="username-span">${data.login.username}</span></li>
                        <li>Password: <span>${data.login.password}</span></li>
                    </ul>
                    <div class="icons-pc">
                        <div class="trash-container">
                            <div class="trash-box pc">
                                <p>Remove?</p>
                            </div>
                            <i class="fa fa-trash-o"></i>
                        </div>
                        <a href="${'../product-page/product.html?seed=' + seed}" title="${'More About ' + data.name.first + ' ' + data.name.last}"><i class="fa fa-external-link"></i></a>
                    </div>
                    <div class="icons-mobile">
                        <i class="fa fa-trash-o">
                            <div class="trash-box-mobile">
                                <p>Remove From Favorites?</p>
                                <div class="yes">Yes</div>
                            </div>
                        </i>
                        <a href="${'../product-page/product.html?seed=' + seed}" title="${'More About ' + data.name.first + ' ' + data.name.last}"><i class="fa fa-external-link"></i></a>
                    </div>
                </div>
            </div>
        `)
    }

    if (i === favoritesArray.length) {
        document.querySelectorAll('.username-span').forEach(i => {
            if (i.innerHTML.length > 13) {
                i.innerHTML = i.innerHTML.slice(0, 14).concat('...')
            }
        })

        loadLayerContainer.style.display = 'none'
        cardsContainer.style.display = 'flex'
        setTimeout(() => {
            document.querySelectorAll('.favorites-container-2 .card-top').forEach(item => { item.style.opacity = '1' })
            document.querySelectorAll('.favorites-container-2 .card-bottom').forEach(item => { item.style.opacity = '1' })
        }, 100)

        trashHandler()
        trashMobileHandler()
    }
}

function loadLayer() {
    loadLayerContainer.style.display = 'flex'

    for (let j = 0; j < favoritesArray.length - 1; j++) {
        loadLayerContainer.insertAdjacentHTML('beforeend', `
            <div class="card template-2">
                <div class="card-top">
                    <a><img src="../images/black-user-member-guest-icon-31634946589seopngzc1t-fafafa.png"></a>
                    <span><span style="visibility: hidden;">.</span></span>
                </div>
                <div class="card-bottom">
                    <ul>
                        <li><span style="visibility: hidden;">.</span></li>
                        <li><span style="visibility: hidden;">.</span></li>
                        <li><span style="visibility: hidden;">.</span></li>
                        <li><span style="visibility: hidden;">.</span></li>
                    </ul>
                </div>
            </div>
        `)
    }
}

setInterval(() => {
    let favoritesArray2 = document.cookie.split(';').find(row => row.trim().startsWith('favoritesSeeds')) ? document.cookie.split(';').find(row => row.trim().startsWith('favoritesSeeds')).split('=')[1].split(',') : ['']

    if (favoritesArray.length > 0 && favoritesArray.length !== favoritesArray2.length) {
        favoritesArray = favoritesArray2

        favoritesSecRefresh()
    }
}, 1000)

window.addEventListener('load', favoritesSecRefresh)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Trash

function trashHandler() {
    document.querySelectorAll('.trash-container .fa-trash-o').forEach(i => i.addEventListener('mouseover', () => {
        i.previousElementSibling.firstElementChild.style.transform = 'translateX(15%)'
        i.style.color = '#f00'
    }))
    document.querySelectorAll('.trash-container .fa-trash-o').forEach(i => i.addEventListener('mouseleave', () => {
        i.previousElementSibling.firstElementChild.style.transform = 'translateX(100%)'
        i.style.color = '#f00c'
    }))
    document.querySelectorAll('.trash-box.pc p').forEach(i => i.addEventListener('mouseover', () => {
        i.style.transform = 'translateX(15%)'
        i.parentElement.nextElementSibling.style.color = '#f00'
    }))
    document.querySelectorAll('.trash-box.pc p').forEach(i => i.addEventListener('mouseleave', () => {
        i.style.transform = 'translateX(100%)'
        i.parentElement.nextElementSibling.style.color = '#f00c'
    }))

    document.querySelectorAll('.trash-container .fa-trash-o').forEach(i => i.addEventListener('click', e => {
        doTrash(e.target.closest('.card'))
    }))
    document.querySelectorAll('.trash-box.pc p').forEach(i => i.addEventListener('click', e => {
        doTrash(e.target.closest('.card'))
    }))

    undoBox.style.display = 'block'
}

function doTrash(el) {
    el.style.animation = 'fade-out .35s forwards'
    el.style.opacity = '.9'

    favoritesArrayForRestore = document.cookie.split(';').find(row => row.trim().startsWith('favoritesSeeds')) ? document.cookie.split(';').find(row => row.trim().startsWith('favoritesSeeds')).split('=')[1].split(',') : ['']

    favoritesArray.some(seed => {
        if (seed === el.dataset.seed) {
            favoritesArray.splice(favoritesArray.indexOf(seed), 1)
        }

        const now = new Date()
        now.setTime(now.getTime() + 30 * 24 * 60 * 60 * 1000)
        document.cookie = `favoritesSeeds=${favoritesArray};path=/;expires=${now}`
    })

    if (favoritesArray.length !== favoritesArrayForRestore.length) {
        favoritesArrayForRestore2 = favoritesArrayForRestore
    }

    setTimeout(() => { favoritesSecRefresh() }, 500)

    undoBoxShowOff()
    clearTimeout(undoBoxShowOffTimeOut)
    clearTimeout(undoBoxShowOffTimeOut2)

    setTimeout(() => { undoBoxShowUp() }, 1500)
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Undo

const undoBox = document.querySelector('#undo')

let favoritesArrayForRestore
let favoritesArrayForRestore2

let undoBoxShowOffTimeOut
let undoBoxShowOffTimeOut2

let isMouseOverUndoBox = false
let isUndoBoxAnimOn = false

function undoBoxShowUp() {
    isUndoBoxAnimOn = true

    undoBox.style.visibility = 'visible'
    undoBox.style.opacity = '1'
    undoBox.style.transform = 'translateY(0)'

    setTimeout(() => {
        document.querySelector('#undo .timer-line').style.animation = 'timer-line-2 2.7s'
    }, 1000)

    undoBoxShowOffTimeOut = setTimeout(() => {
        if (!isMouseOverUndoBox) {
            undoBoxShowOff()
        }
    }, 4200)

    undoBoxShowOffTimeOut2 = setTimeout(() => {
        isUndoBoxAnimOn = false
    }, 4500)
}

function undoBoxShowOff() {
    undoBox.style.opacity = '0'
    undoBox.style.transform = 'translateY(5px)'

    setTimeout(() => {
        undoBox.style.visibility = 'hidden'
        document.querySelector('#undo .timer-line').style.animation = ''
    }, 300)
}

undoBox.addEventListener('mouseover', () => {
    isMouseOverUndoBox = true
})
undoBox.addEventListener('mouseleave', () => {
    isMouseOverUndoBox = false
    if (!isUndoBoxAnimOn) {
        undoBoxShowOff()
    }
})

undoBox.addEventListener('click', () => {
    favoritesArray = favoritesArrayForRestore2

    const now = new Date()
    now.setTime(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    document.cookie = `favoritesSeeds=${favoritesArray};path=/;expires=${now}`

    favoritesSecRefresh()

    undoBoxShowOff()
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////// trash & Undo For Mobile

let trashIcons

let favoritesArrayForRestoreMobile
let favoritesArrayForRestoreMobile2

function trashMobileHandler() {
    trashIcons = document.querySelectorAll('.icons-mobile .fa-trash-o')

    trashIcons.forEach(i => i.addEventListener('click', () => {
        showTrashMobileBox(i)

        window.addEventListener('click', e => {
            if (!e.target.closest('.trash-box-mobile') && !e.target.closest('.icons-mobile .fa-trash-o')) {
                hideTrashMobileBox()
            }
        })
    }))

    document.querySelectorAll('.trash-box-mobile .yes').forEach(i => i.addEventListener('click', e => {
        doTrashMobile(e.target.closest('.card'))
    }))
}

function showTrashMobileBox(i) {
    i.style.color = '#f00'

    i.firstElementChild.style.display = 'block'
    setTimeout(() => {
        i.firstElementChild.style.opacity = '1'
        i.firstElementChild.style.transform = 'translateY(0)'
    }, 0)
}

function hideTrashMobileBox() {
    trashIcons.forEach(i => i.style.color = '#f00c')

    trashIcons.forEach(i => i.firstElementChild.style.transform = 'translateY(5px)')
    trashIcons.forEach(i => i.firstElementChild.style.opacity = '0')
    setTimeout(() => {
        trashIcons.forEach(i => i.firstElementChild.style.display = 'none')
    }, 200)
}

function doTrashMobile(el) {
    if (document.querySelector('#undo-mobile')) {
        document.querySelector('#undo-mobile').parentElement.remove()
    }

    setTimeout(() => {
        hideTrashMobileBox()
    }, 10)

    el.style.animation = 'fade-out .7s forwards'
    setTimeout(() => {
        el.style.justifyContent = 'center'
        el.style.alignItems = 'center'
        el.style.border = '3px dotted #ddd'
        el.innerHTML = `
            <span id="undo-mobile" style="color: var(--color-5); font-size: 1.2rem; text-decoration: underline; cursor: pointer">
                undo
                <i class="fa fa-undo" style="color: var(--color-5)"></i>
            </span>
        `
        document.querySelector('#undo-mobile').addEventListener('click', () => { undoMobile() })
    }, 700)

    favoritesArrayForRestoreMobile = document.cookie.split(';').find(row => row.trim().startsWith('favoritesSeeds')) ? document.cookie.split(';').find(row => row.trim().startsWith('favoritesSeeds')).split('=')[1].split(',') : ['']

    favoritesArray.some(seed => {
        if (seed === el.dataset.seed) {
            favoritesArray.splice(favoritesArray.indexOf(seed), 1)
        }

        const now = new Date()
        now.setTime(now.getTime() + 30 * 24 * 60 * 60 * 1000)
        document.cookie = `favoritesSeeds=${favoritesArray};path=/;expires=${now}`
    })

    if (favoritesArray.length !== favoritesArrayForRestoreMobile.length) {
        favoritesArrayForRestoreMobile2 = favoritesArrayForRestoreMobile
    }
}

function undoMobile() {
    favoritesArray = favoritesArrayForRestoreMobile2

    const now = new Date()
    now.setTime(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    document.cookie = `favoritesSeeds=${favoritesArray};path=/;expires=${now}`

    favoritesSecRefresh()
}