import React from 'react'
import './testimonials.css'

const Testimonials = () => {
    let mobileWidth = 640;
let tabWidth = 1080;
let  deskWidth = 1220;
let pWidth, pHeight, screenWidth, screenHeight;
let index = document.getElementsByClassName("quote-column");
let pTransition = 3;
let activeShow = "col-active";
const arrowIcon = "<div class='arrow left-arrow ' onclick='arrowControl(-1)'><i class='arrow-icon'><i></div><div class='arrow right-arrow' onclick='arrowControl(1)'><i class='arrow-icon'><i></div>"
const ArrowParent = document.createElement("div");
ArrowParent.classList.add("arrows-wrap");
ArrowParent.innerHTML = arrowIcon;
let arrowEnabled = false;
let activeQuoteHeight = 400;

getElem();
function getElem() {
    let hAndW;
    let targetElem;
    index[0].parentElement.style.minHeight = (index.length / 2) * 140 + "px";// assign row element height

    for (let i = 0; i < index.length; i++) {
        targetElem = index[i];
        pWidth = targetElem.parentElement.offsetWidth;
        pHeight = targetElem.parentElement.offsetHeight;

        //When viewing on desktop
        if (screenWidth > tabWidth) {
            hAndW = randomPos(60, (screenHeight / (index.length / 1.5))) + 'px';//Lets make the height and width variables randomly

            // lets devide all the elements by less then 2 and positioning them left and right not in the middle;
            //this is for left side
            if (i < index.length / 1.9) {
                targetElem.style.left = randomPos(100, targetElem.parentElement.offsetWidth / 3 - 100) + 'px'; // X position left
                targetElem.style.top = (targetElem.parentElement.offsetHeight / (index.length / 2)) * (i - 1) + 'px'; //Y position left
            }
            // this is for right side
            else if (i > index.length / 1.9) {
                targetElem.style.right = randomPos(100, targetElem.parentElement.offsetWidth / 3 - 100) + 'px'; // X position right
                targetElem.style.left = 'auto'; // X position right
                targetElem.style.top = (targetElem.parentElement.offsetHeight / (index.length / 2)) * ((index.length - 1) - i) + 'px'; //Y position right
            }
            if (arrowEnabled) ArrowParent.style.display = "block";// When arrow added make them visible
            else ArrowParent.style.display = "none";// When arrow added make them visible
        }

        //When viewing on tab
        if (screenWidth <= tabWidth && screenWidth >= mobileWidth) {
            hAndW = randomPos(30, (screenHeight / (index.length / 1.5))) + 'px';
            targetElem.parentElement.style.minHeight = "70vh";
            targetElem.style.bottom = '0px'; //Y position
            targetElem.style.left = (targetElem.parentElement.offsetWidth) / (index.length - 1) * (i - 1) + 'px'; // X position left
            targetElem.style.zIndex = '100'; //Y position
            targetElem.style.top = 'auto'; //Y position
            if (arrowEnabled) ArrowParent.style.display = "block";// When arrow added make them visible
            else ArrowParent.style.display = "none";// When arrow added make them visible
        }

        //When viewing on mobile
        if (screenWidth < mobileWidth) {
            targetElem.style.left = '50%'; // X position left
            ArrowParent.style.display = "block";// When arrow added make them visible
        }
        else if (!arrowEnabled) ArrowParent.style.display = "none";// otherwise hidden

        //after all the work done lets sizing the element
        targetElem.style.width = hAndW;
        targetElem.style.height = hAndW;
        //and the active one position default
        if (i != 0) {
            targetElem.addEventListener('click', quoteShow, false); //So we dont need click event on the active one
        }
        targetElem.classList.add("moves");
    }
    setTimeout(() => {
        for (let i = 0; i < index.length; i++) {
            //     targetElem.style.transition = "0s";
        }
    }, 2000);
}


let clickCheck = true, showClear, showClear2;
function quoteShow(evt) {
  const style = getComputedStyle(this);
  console.log(style);
    if (clickCheck) {
        clickCheck = false;
        clearTimeout(showClear2);
        let activeQuote = document.getElementsByClassName(activeShow);
        let aq;
        for (let j = 0; j < activeQuote.length; j++) {
            aq = activeQuote[j];
            aq.classList.remove("show");
            aq.style.transition = "0.4s";
        }
        this.style.transition = "0.4s";
        setTimeout(() => {
            aq.style.top = this.offsetTop + "px";
            aq.style.left = this.offsetLeft + "px";
            aq.style.width = this.offsetWidth + "px";
            aq.style.height = this.offsetHeight + "px";
            aq.addEventListener('click', quoteShow, false);
            aq.classList.remove(activeShow);
        }, 600);

        setTimeout(() => {
            this.classList.add(activeShow);
            this.removeEventListener("click", quoteShow, false);
        }, 1200);

        showClear2 = setTimeout(() => {
            this.classList.toggle("show");
            aq.style.transition = "";
            this.style.transition = "";
            clickCheck = true;
        }, 1800);
    }
}

let arrowClicked = true; 
let nowActive = 0;


function arrowControl(val) {
    // else nowActive += val;
    if (arrowClicked) {
        arrowClicked = false;
        for (let i = 0; i < index.length; i++) {
            index[nowActive].classList.remove("show");
            index[nowActive].style.transition = ".4s";
            index[nowActive].addEventListener('click', quoteShow, false);
        }
        setTimeout(() => {
            for (let j = 0; j < index.length; j++) {
                index[j].classList.remove(activeShow);
            }
            nowActive += val;
            if (nowActive > index.length - 1) nowActive = 0;
            else if (nowActive < 0) nowActive = index.length - 1;
        }, 600);

        setTimeout(() => {
            index[nowActive].classList.add(activeShow);
            index[nowActive].removeEventListener("click", quoteShow, false);
        }, 610);

        setTimeout(() => {
            index[nowActive].classList.toggle("show");
            index[nowActive].style.transition = "";
            arrowClicked = true
        }, 1800);
    }
}

function randomPos(min, max) {
    const ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum
}

function getScreenSize() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    getElem();
}

window.onresize = getScreenSize;
window.addEventListener('resize', getScreenSize);
window.addEventListener('load', function () {
    getScreenSize();
    getElem();
}, true);

function arrowFunc() {
    try {
        index[0].parentElement.appendChild(ArrowParent);// try insert arrow element for slide control
    } catch (error) { }
}
arrowFunc();




//Flaoting animation class;
class MoveAnim {
    constructor(max, tm) {
        this.time = tm;
        if (Math.random() > .5) this.uDVal = max; else this.uDVal = 0;
        if (Math.random() > .5) this.lRVal = max; else this.lRVal = 0;
        this.max = max;
        if (Math.random() > .5) this.uD = false; else this.uD = true;
        if (Math.random() > .5) this.lR = false; else this.lR = true;
        this.upDown(this.max);
        this.leftRight(this.max);
        this.scale = .01;
    }

    upDown() {
        setInterval(() => {
            if (!this.uDVal) {
                if (this.uD >= this.max) { this.uDVal = true; }
                if (this.uD < this.max) { this.uD += this.scale; }
            }
            else if (this.uDVal) {
                if (this.uD <= -this.max) { this.uDVal = false; }
                if (this.uD >= -this.max) { this.uD -= this.scale; }
            }
            return this.uD;
        }, this.time / 1000);
    }
    leftRight() {
        setInterval(() => {
            if (!this.lRVal) {
                if (this.lR >= this.max) { this.lRVal = true; }
                if (this.lR < this.max) { this.lR += this.scale; }
            }
            else if (this.lRVal) {
                if (this.lR <= -this.max) { this.lRVal = false; }
                if (this.lR >= -this.max) { this.lR -= this.scale; }
            }
            return this.lR;
        }, this.time / 1000);
    }

    letMove(el, ud = false, lr = false) {

        setInterval(() => {
            if (ud === true && lr === false) {
                el.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, " + 0 + "," + this.uD + ", 0, 1)";
            }
            else if (ud === false && lr === true) {
                el.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, " + this.lR + "," + 0 + ", 0, 1)";
            }
            else {
                el.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, " + this.lR + "," + this.uD + ", 0, 1)";
            }


        }, 1);
    }

    start(elem, ud, lr) {
        this.letMove(elem, ud, lr);
        this.upDown();
        this.leftRight();
    }
}

class ShowAnim {
    constructor(mElem, dist, times) {
        this.mElem = document.getElementsByClassName(mElem);
        this.pElem = mElem.parentElement;
        this.cElem = mElem.children;
        this.count = 0;
        this.max = dist;
        this.min = 10;
        this.times = times;
        this.randomCount(this.max);
    }
    randomCount(max) {
        return Math.floor(Math.random() * (max - this.min + 1)) + this.min;
    }
    show(ud, lr) {
        for (this.count = 0; this.count < this.mElem.length; this.count++) {
            this.moveanim = new MoveAnim(this.randomCount(this.max), this.times,);
            this.moveanim.start(this.mElem[this.count], ud, lr);
        }
    }
}


let animShow = new ShowAnim("moves", 40, 50);// Element, Max Distance, Times in milliseconds

//Start floating
animShow.show(true, false);// Up-Down, Left-Right;
  return (
    <div className='bodyBG'>
        <div className="bg"></div>
<div className="wrapper" id="wrapper">
        <div className="quote-row">
            <div className="quote-column col-active show">
                <div className="col-inner">
                    <div className="author-meta">
                        <div className="box-image-inner image-cover">
                            <img src="https://images.unsplash.com/photo-1514222709107-a180c68d72b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQzfHxwZW9wbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"/>
                        </div>
                        <div className="author-info">
                            <div className="author-name"> <p className="person-name">Tom hawck</p></div>
                            <div className="author-status"> <p className="person-title"> IT Solution Company </p></div>
                        </div>
                    </div>
                    <div className="quote-wrapper">
                        <div className="quote-symbol">❛</div>
                        <div className="box-text-inner">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="quote-symbol">❜</div>
                    </div>
                </div>
            </div>
            <div className="quote-column">
                <div className="col-inner">
                    <div className="author-meta">
                        <div className="box-image-inner image-cover">
                            <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"/>
                        </div>
                        <div className="author-info">
                            <div className="author-name"> <p className="person-name">Harry john</p></div>
                            <div className="author-status"> <p className="person-title"> IT Solution Company </p></div>
                        </div>
                    </div>
                    <div className="quote-wrapper">
                        <div className="quote-symbol">❛</div>
                        <div className="box-text-inner">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="quote-symbol">❜</div>
                    </div>
                </div>
            </div>
            <div className="quote-column ">
                <div className="col-inner">
                    <div className="author-meta">
                        <div className="box-image-inner image-cover">
                            <img src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"/>
                        </div>
                        <div className="author-info">
                            <div className="author-name"> <p className="person-name">Larry Will</p></div>
                            <div className="author-status"> <p className="person-title"> IT Solution Company </p></div>
                        </div>
                    </div>
                    <div className="quote-wrapper">
                        <div className="quote-symbol">❛</div>
                        <div className="box-text-inner">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="quote-symbol">❜</div>
                    </div>
                </div>
            </div>
            <div className="quote-column">
                <div className="col-inner">
                    <div className="author-meta">
                        <div className="box-image-inner image-cover">
                            <img src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"/>
                        </div>
                        <div className="author-info">
                            <div className="author-name"> <p className="person-name">Augustine</p></div>
                            <div className="author-status"> <p className="person-title"> IT Solution Company </p></div>
                        </div>
                    </div>
                    <div className="quote-wrapper">
                        <div className="quote-symbol">❛</div>
                        <div className="box-text-inner">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="quote-symbol">❜</div>
                    </div>
                </div>
            </div>
            <div className="quote-column">
                <div className="col-inner">
                    <div className="author-meta">
                        <div className="box-image-inner image-cover">
                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                        </div>
                        <div className="author-info">
                            <div className="author-name"> <p className="person-name">Jack Danny</p></div>
                            <div className="author-status"> <p className="person-title"> IT Solution Company </p></div>
                        </div>
                    </div>
                    <div className="quote-wrapper">
                        <div className="quote-symbol">❛</div>
                        <div className="box-text-inner">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="quote-symbol">❜</div>
                    </div>
                </div>
            </div>
            <div className="quote-column ">
                <div className="col-inner">
                    <div className="author-meta">
                        <div className="box-image-inner image-cover">
                            <img src="https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                        </div>
                        <div className="author-info">
                            <div className="author-name"> <p className="person-name">Luich Harry</p></div>
                            <div className="author-status"> <p className="person-title"> IT Solution Company </p></div>
                        </div>
                    </div>
                    <div className="quote-wrapper">
                        <div className="quote-symbol">❛</div>
                        <div className="box-text-inner">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="quote-symbol">❜</div>
                    </div>
                </div>
            </div>
            <div className="quote-column">
                <div className="col-inner">
                    <div className="author-meta">
                        <div className="box-image-inner image-cover">
                            <img src="https://images.unsplash.com/photo-1474176857210-7287d38d27c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA3fHxwZW9wbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"/>
                        </div>
                        <div className="author-info">
                            <div className="author-name"> <p className="person-name">Alisha Angela</p></div>
                            <div className="author-status"> <p className="person-title"> IT Solution Company </p></div>
                        </div>
                    </div>
                    <div className="quote-wrapper">
                        <div className="quote-symbol">❛</div>
                        <div className="box-text-inner">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="quote-symbol">❜</div>
                    </div>
                </div>
            </div>
            <div className="quote-column ">
                <div className="col-inner">
                    <div className="author-meta">
                        <div className="box-image-inner image-cover">
                            <img src="https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE5fHxwZW9wbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"/>
                        </div>
                        <div className="author-info">
                            <div className="author-name"> <p className="person-name">Lofy Sthamam</p></div>
                            <div className="author-status"> <p className="person-title"> IT Solution Company </p></div>
                        </div>
                    </div>
                    <div className="quote-wrapper">
                        <div className="quote-symbol">❛</div>
                        <div className="box-text-inner">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="quote-symbol">❜</div>
                    </div>
                </div>
            </div>
            <div className="quote-column">
                <div className="col-inner">
                    <div className="author-meta">
                        <div className="box-image-inner image-cover">
                            <img src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI2fHxwZW9wbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"/>
                        </div>
                        <div className="author-info">
                            <div className="author-name"> <p className="person-name">Angela Baby</p></div>
                            <div className="author-status"> <p className="person-title"> IT Solution Company </p></div>
                        </div>
                    </div>
                    <div className="quote-wrapper">
                        <div className="quote-symbol">❛</div>
                        <div className="box-text-inner">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="quote-symbol">❜</div>
                    </div>
                </div>
            </div>
            <div className="quote-column ">
                <div className="col-inner">
                    <div className="author-meta">
                        <div className="box-image-inner image-cover">
                            <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTM1fHxwZW9wbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"/>
                        </div>
                        <div className="author-info">
                            <div className="author-name"> <p className="person-name">Hanry Harry</p></div>
                            <div className="author-status"> <p className="person-title"> IT Solution Company </p></div>
                        </div>
                    </div>
                    <div className="quote-wrapper">
                        <div className="quote-symbol">❛</div>
                        <div className="box-text-inner">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="quote-symbol">❜</div>
                    </div>
                </div>
            </div>
            <div className="quote-column">
                <div className="col-inner">
                    <div className="author-meta">
                        <div className="box-image-inner image-cover">
                            <img src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cm9ib3R8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"/>
                        </div>
                        <div className="author-info">
                            <div className="author-name"> <p className="person-name">Dlang Dhal</p></div>
                            <div className="author-status"> <p className="person-title"> IT Solution Company </p></div>
                        </div>
                    </div>
                    <div className="quote-wrapper">
                        <div className="quote-symbol">❛</div>
                        <div className="box-text-inner">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="quote-symbol">❜</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Testimonials