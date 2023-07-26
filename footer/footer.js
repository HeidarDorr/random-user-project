document.write(`
<footer>
    <div class="footer-container">
        <button class="go-up-btn">
            <i class="fa fa-angle-up"></i>
            Back to Top
        </button>
        <button class="go-up-btn go-up-btn-mobile">
            <i class="fa fa-angle-up"></i>
            Back to Top
        </button>
        <h1>RANDOM USER GENERATOR</h1>
        <div class="footer-container-buttom">
            <div class="builder">
                <h3>Designed</h3>
                <img src="../images/black-user-member-guest-icon-31634946589seopngzc1t.png">
            </div>
            <div class="builder">
                <h3>Developed</h3>
                <img src="../images/black-user-member-guest-icon-31634946589seopngzc1t.png">
            </div>
            <div id="copy-right">
                <span class="around-light-container"><i></i></span>
                <div class="copy-right-h3-container"><h3>Copyright Notice</h3></div>
                <p>
                    This website is a practice site and is not affiliated with or endorsed by the original website,
                    <a href="https://randomuser.me/" target="_blank">randomuser.me</a>.
                    All the data used on this website, were generated for educational and training purposes only.
                </p>
            </div>
        </div>
    </div>
</footer>
`)

document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="../footer/style.css">')

const scriptLink = document.createElement('script')
scriptLink.src = '../footer/script.js'
scriptLink.type = 'module'
document.body.append(scriptLink)