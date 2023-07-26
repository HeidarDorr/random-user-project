let paginationAddress2

if (location.pathname === '/main-page/index.html' || location.pathname === '/') paginationAddress2 = '#pagination-section'
else paginationAddress2 = '../main-page/index.html#pagination-section'

document.write(`
<section id="favorites-section">
    <h3>Your Favorite Users</h3>
    <h3>Your Favorites</h3>
    <div class="favorites-container">
        <div class="card template">
            <div class="card-top">
                <a><img style="cursor: unset;" src="../images/black-user-member-guest-icon-31634946589seopngzc1t-dark.png"></a>
                <span style="color: #aaa;">................</span>
            </div>
            <div class="card-bottom">
                <ul>
                    <li>Country: <span style="color: #aaa;">.....</span></li>
                    <li>Phone: <span style="color: #aaa;">.....</span></li>
                    <li>Username: <span style="color: #aaa;">.....</span></li>
                    <li>Password: <span style="color: #aaa;">.....</span></li>
                </ul>
            </div>
        </div>
        <div class="guide template">
            <span>Don't have any favorites?</span>
            <a href="${paginationAddress2}">Find Some!</a>
        </div>
        <div class="favorites-container-2"></div>
        <div class="favorites-container-3"></div>

        <div id="undo">
            Undo
            <i class="fa fa-undo"></i>
            <div class="timer-line"></div>
        </div>
    </div>
</section>
`)

document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="../favorites-section/style.css">')

const scriptLinkF = document.createElement('script')
scriptLinkF.src = '../favorites-section/script.js'
scriptLinkF.type = 'module'
document.body.append(scriptLinkF)