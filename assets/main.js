
//=> Register
const registerBtn = document.querySelector('.js-register');
const modalRegister = document.querySelector('.js-modal-register');
const closeModalRegister = document.querySelector('.js-auth-form__controls-back--register');

function showRegisterBtn() {
    modalRegister.classList.add('open');
}
function showRegisterBtnSub() {
    modalRegister.classList.add('open');
}
function hideRegisterBtn() {
    modalRegister.classList.remove('open');
}
registerBtn.addEventListener('click', showRegisterBtn)
closeModalRegister.addEventListener('click', hideRegisterBtn)

//=> Login
const loginBtn = document.querySelector('.js-login');
const modalLogin = document.querySelector('.js-modal-login');
const closeModalLogin = document.querySelector('.js-auth-form__controls-back--login')
function showLoginBtn() {
    modalLogin.classList.add('open');
}
function hideLoginBtn() {
    modalLogin.classList.remove('open');
}
loginBtn.addEventListener('click', showLoginBtn);
closeModalLogin.addEventListener('click', hideLoginBtn);


const btnLog = document.querySelector('.btnLog')
const btnReg = document.querySelector('.btnReg')
if (btnLog) {
    btnLog.onclick = () => {
        hideRegisterBtn() 
        showLoginBtn()
    }
}
if (btnReg) {
    btnReg.onclick = () => {
        showRegisterBtn() 
        hideLoginBtn()
    }
}


// var sliderContainer =  document.querySelector('#slider')
// var listImages = [ 
//     { 
//         heading: 'Music & Life', 
//         slogan: 'Music is the breath of life.',
//         image: './assets/img/music1.jpg',
//     }, 
//     {   
//         heading: 'Music & Life', 
//         slogan: "Music is the color of the soul.",
//         image:  './assets/img/music2.png', 
//     },
//     { 
//         heading: 'Music & Life', 
//         slogan: "Music is the shape of sound",
//         image: './assets/img/music3.jpg'
//     }     ] 

// let i = 0
// setInterval(function() {  
// sliderContainer.innerHTML = 
// `
//         <img src=${listImages[i].image} class="slider-img"> 
//         <div class="text-content-slider">
//             <h2 class="text-heading">${listImages[i].heading}</h2> 
//             <p class="text-slogan">${listImages[i].slogan}</p>
//         </div>
// `
//     i++;  
//     if(i === 3){ i = 0}; }, 5000); 
