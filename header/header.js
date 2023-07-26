let documentationAddress
let paginationAddress

if (location.pathname === '/main-page/index.html' || location.pathname === '/') {
    documentationAddress = '#documentation-section'
    paginationAddress = '#pagination-section'
} else {
    documentationAddress = '../main-page/index.html#documentation-section'
    paginationAddress = '../main-page/index.html#pagination-section'
}

document.write(`
<header>
    <nav>
        <ul>
            <li>
                <a href="../main-page/index.html">
                    <i class="fa fa-home" style="font-size: 1.2rem; margin-right: .25rem;"></i>
                    Home
                </a>
            </li>
            <li><a href="#" style="visibility: hidden"></a></li>
            <li class="documentation-li">
                <a href="${documentationAddress}">
                  <i class="fa fa-book" style="font-size: .9rem; margin-right: .25rem;"></i>
                    Documentation
                </a>
            </li>
            <li>
                <a href="${paginationAddress}">
                    <i class="fa fa-user" style="font-size: 1rem; margin-right: .25rem;"></i>
                    Explore More
                </a>
            </li>
            <li class="copy-right-li">
                <a href="#copy-right">
                    <i class="fa fa-copyright"
                        style="font-size: 1rem; margin-right: .25rem;"></i>
                    Copyright Notice
                </a>
            </li>
            <li><a href="#" style="visibility: hidden"></a></li>
            <li><a href="#" style="visibility: hidden"></a></li>
            <li><a href="#" style="visibility: hidden"></a></li>
            <li>
                <a href="#favorites-section">
                    <i class="fa fa-user-circle-o"
                        style="font-size: 1rem; margin-right: .25rem;"></i>
                    My Favorite Users
                </a>
            </li>
        </ul>
    </nav>
</header>
<div class="right-nav">
    <div class="icon"><i class="custom-bars"></i></div>
    <div class="icon"><i class="custom-close"></i></div>
    <ul>
        <li>
            <a href="../main-page/index.html">
                <i class="fa fa-home" style="font-size: 1.2rem; margin-right: .25rem;"></i>
                Home
            </a>
        </li>
        <li class="documentation-li">
            <a href=${documentationAddress} class="for-close-nav">
                <i class="fa fa-book" style="font-size: .9rem; margin-right: .25rem; transform: translateY(-1px)"></i>
                Documentation
            </a>
        </li>
        <li>
            <a href=${paginationAddress} class="for-close-nav">
                <i class="fa fa-user" style="font-size: 1rem; margin-right: .25rem; transform: translateY(-1px)"></i>
                Explore More
            </a>
        </li>
        <li class="copy-right-li-mobile">
            <a href="#copy-right" class="for-close-nav">
                <i class="fa fa-copyright" style="font-size: 1rem; margin-right: .25rem; transform: translateY(-1px)"></i>
                Copyright Notice
            </a>
        </li>
        <li>
            <a href="#favorites-section" class="for-close-nav">
                <i class="fa fa-user-circle-o"
                style="font-size: 1rem; margin-right: .25rem; transform: translateY(-1px)"></i>
                My Favorite Users
            </a>
        </li>
    </ul>
</div>
<div class="blur-layer"></div>
`)

document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="../header/style.css">')

const scriptLinkH = document.createElement('script')
scriptLinkH.src = '../header/script.js'
scriptLinkH.type = 'module'
document.body.append(scriptLinkH)