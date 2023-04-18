
const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

const TOTAL = 80
const petalArray = []

const petalImg = new Image()
petalImg.src = './petal.png'
petalImg.onload = () => {
  for (let i = 0; i < TOTAL; i++) {
    petalArray.push(new Petal())
  }
  render()
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  petalArray.forEach(petal => {
    petal.animate()
  })
 
  window.requestAnimationFrame(render)
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// 벚꽃 잎 클래스
class Petal {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height * 2 - canvas.height
    this.w = 30 + Math.random() * 15
    this.h = 40 + Math.random() * 10
    this.opacity = this.w / 45
    this.xSpeed = 0 + Math.random()
    this.ySpeed = 0 + Math.random() * 0.1
    this.flip = Math.random()
    this.flipSpeed = Math.random() * 0
  }

  draw() {
    if (this.y > canvas.height || this.x > canvas.width) {
      this.x = -petalImg.width
      this.y = Math.random() * canvas.height * 2 - canvas.height
      this.xSpeed = 0.5 + Math.random()
      this.ySpeed = 0.5 + Math.random() * 0.3
      this.flip = Math.random()
    }
    ctx.globalAlpha = this.opacity
    ctx.drawImage(
      petalImg,
      this.x,
      this.y,
      this.w * (0.66 + (Math.abs(Math.cos(this.flip)) / 3)),
      this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 2)),
    )
  }

  animate() {
    this.x += this.xSpeed
    this.y += this.ySpeed
    this.draw()
    this.flip += this.flipSpeed
  }
}


// work 텍스트 제이슨 파일
let $gItemList = [];

// 1번 방식
function getDataList() {
    // <!--  json 가져올때 fetch로 불러오기 -->
    fetch('./js/workText.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            // json type 으로 변환
            return response.json();
        })
        .then(jsonDataList => {
            $gItemList = jsonDataList.data;
            createSlide(jsonDataList.data);

            // 페이징 1 페이지 기본 default
        })
        .catch(function () {

            console.log("예외처리");
        })

        function slideDetail(data,idx=0){
          const workcontent2 = document.querySelector('.workcontent-2');
          

          let liTag = ''
          for(let obj of data[idx].skill){
            if(Object.keys(obj)[1]){
              liTag += `<li >
                          <p><b>${Object.keys(obj)[0]} :</b> ${obj[Object.keys(obj)[0]]}</p>
                          <span><b>${Object.keys(obj)[1]} :</b> ${obj[Object.keys(obj)[1]]}</span>
                      </li>`;
            }else{
              liTag += `<li >
                        <p><b>${Object.keys(obj)[0]} :</b> ${obj[Object.keys(obj)[0]]}</p>
                      </li>`;
            }
          }

          let tag = ` <div class="work-text">
                        <div class="work-Title">
                            <h3>
                                <span class="w1">${data[idx].mainTitle.split(',')[0]}</span>
                                <span class="w2">${data[idx].mainTitle.split(',')[1]}</span>
                            </h3>
                            <p>${data[idx].subTitle}</p>
                        </div>

                        <p class="work-story">${data[idx].story}</p>

                        <ul class="codeing-skill">${liTag}</ul>

                        <section class="work-btn">
                            <a href="${data[idx].WEBVIEW}"><button type="button" class="b1">WEB VIEW</button></a>
                            <a href="${data[idx].GITHUB}"><button type="button" class="b2">GITHUB</button></a>
                        </section>
                    </div>`
                    workcontent2.innerHTML = tag;
        }


        function createSlide(data){
          const swiperWwrapper = document.querySelector('.swiper-wrapper');
          let slideTag = '';
          data.forEach((obj,k)=>{
            slideTag +=`<figure class="swiper-slide"><img src="${obj['workimg']}" alt=""></figure>`
          });
          swiperWwrapper.innerHTML = slideTag;
          slideDetail(data);

          // work 에 있는 이미지 스와이프
          var swiper = new Swiper(".mySwiper", {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            on:{
              slideChange:(e)=>{
                  let idx = e.realIndex;
                  slideDetail(data, idx)
              }
            }
          });
          // 
        }
}

// 2번 방식 promise + fetch 를 이용한 json 임포트
function load(url) {
    return new Promise(async function (resolve, reject) {
        // do async thing
        const res = await fetch(url)
        // resolve
        resolve(res.json()) // see note below!
    })
}





window.onload = getDataList;
