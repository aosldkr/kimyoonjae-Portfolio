$('body').prepend('<header>');
$('body').append('<footer>');

$('header').load('./inc.html header>div',head);
$('footer').load('./inc.html footer>div');

let idx = localStorage.idx;


function head(){     

    $('header div.header-logo ul.mainMenu li').click(function(e){
        /*e.preventDefault();*/ //웹페이지 이동 못하게 하는것
        let idx = $(this).index();
        $('div.header-logo figure.mainLogo').removeClass('on2');
        $('header div.header-logo ul.mainMenu li').find('a').removeClass('on');           
        $('header div.header-logo ul.mainMenu li').eq(idx).find('a').addClass('on');
        
    })

 const elAbout=document.querySelector(".menu1");
 const elWork=document.querySelector(".menu2");
 const mainLogo=document.querySelector(".mainLogo");

 const aboutPage = document.querySelector('.aboutPage');
 const workPage = document.querySelector('.workPage');
 const startpage = document.querySelector('.startpage');


//scrollY 내릴때 애니메이션 작동
const aboutcontent =document.querySelector('.aboutcontent');


window.addEventListener('scroll',()=>{
    
    //scrollY 마우스 스크롤로 내릴시 1000px
    //aboutPage 클릭 967px
    console.log( aboutPage.offsetTop )

    if(window.scrollY > aboutPage.offsetTop-100){
        aboutcontent.classList.add('animate');
        
        
    }
    if(window.scrollY > workPage.offsetTop-100){
        workPage.classList.add('animate2');
    }
})

//메뉴 버튼 눌러서 눌린 켄텐츠로 이동
const elLogo = document.querySelector(".mainLogo");
    mainLogo.onclick =() =>{ 
        
        $('div.header-logo figure.mainLogo').removeClass('on2');
        $('div.header-logo figure.mainLogo').addClass('on2');
        $('header div.header-logo ul.mainMenu li').find('a').removeClass('on');
       
        event.preventDefault();
        window.scrollTo({
            left:0,
            top:startpage.offsetTop,
            behavior:'smooth'
        })

    } 

    elAbout.onclick =() =>{ 
        // elAbout.style='text-shadow:0 0 0.5em, 0 0 0.3em';
          
        event.preventDefault();
        window.scrollTo({
            left:0,
            top:aboutPage.offsetTop,
            behavior:'smooth'  
        })
        console.log(aboutPage.offsetTop)


    }

    elWork.onclick =() =>{ 
        // elWork.style='text-shadow:0 0 0.5em, 0 0 0.3em';
        event.preventDefault();
        window.scrollTo({
            left:0,
            top:workPage.offsetTop,
            behavior:'smooth'
        })

    }

   
}