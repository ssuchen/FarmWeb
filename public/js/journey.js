ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/RuralTravelData.aspx",function(response){
    journeyRender(response)
});
function journeyRender(data){

let len = data.length;
let perpage = 12;

for(let i =0 ;i<12 ;i++){
        let journeyTag
        let id = data[i].TravelSeq;
        let name = data[i].Title;
        let photo = data[i].PhotoUrl;
        let text = data[i].Contents.substr(0,38)+"...";
        let tag = data[i].TravelType;
        
        //將tag 字串分開成陣列
        let arr=[]
        for(t=0 ;t<tag.length;t++){
            let gettag = tag.substr(t*9,4);
            if(gettag!==""){
            arr.push(gettag)    
            }  
        };

        function renderCard(){

            let journeyMainContent = document.querySelector(".journey-main-content");
            let journeyCard = document.createElement("a");
                journeyCard.setAttribute("class","journey-card")
                journeyCard.setAttribute("href","journeyPagination.html?id="+id)
            let journeyImg = document.createElement("div");
                journeyImg.setAttribute("class","journey-img");
            let img = document.createElement("img");
                img.setAttribute("src",photo);
            let journeyTitle = document.createElement("div");
                journeyTitle.setAttribute("class","journey-title");
                journeyTitle.textContent = name;
                //console.log( journeyTitle)

            let journeyGroup = document.createElement("div");
                journeyGroup.setAttribute("class","journey-group");
                 

            let journeyText = document.createElement("div");
                journeyText.setAttribute("class","journey-text");
                journeyText.textContent = text ;
                
                journeyMainContent.appendChild(journeyCard);
                journeyCard.appendChild(journeyImg);
                journeyCard.appendChild(journeyTitle);
                journeyCard.appendChild(journeyGroup);

                journeyCard.appendChild(journeyText);            
                journeyImg.appendChild(img);
      

                //將 tag 放入 journey-group的迴圈
                arr.forEach(function(item,index){
                    journeyTag = document.createElement("div");
                    journeyTag.setAttribute("class","journey-tag");
                    tag = item;
                    journeyTag.textContent = tag;
                    journeyGroup.appendChild(journeyTag);
                });




        }
        renderCard();
};

//+++++++++++++++++++++++++++
//      頁數判斷功能
//+++++++++++++++++++++++++++

//農場頁數
let page = Math.ceil(len/perpage);

//農場頁數 掛的 html 標籤
let pageList = document.querySelector('.page-list');
    //第一次產出頁數按鈕
    for( let i=0 ; i<5; i++){
    let pageBtn = document.createElement('div');
        pageBtn.setAttribute('class','page-Btn');
        pageBtn.setAttribute('id',i+1);
        pageBtn.textContent = i+1;
        pageList.appendChild(pageBtn);

    };
    let activebtn = document.getElementById("1");
        activebtn.classList.add("btn-active");
   
    // 頁數按鈕 監聽事件    
    let pageBtn =  document.querySelectorAll('.page-Btn');
    let choseBtn
    let nextpage    
    let searchdata=[]

    //---------------更新按鈕列---------------
    //重新更新按鈕列表
    function updateBtnlist(){
    let Btnstr =""
    let max = nextpage+3;
    let min = nextpage-2; 

    if( min<0 || min==0 && page > 5 ){
    min=1;
    max=6;

    }
    if(max > page){
    max = page+1;

    }
    for( let i= min; max > i; i++){
    Btnstr += '<div class="page-Btn" id="'+i+ '">'+i+'</div>';
    pageList.innerHTML = Btnstr;   
    };
    let text =document.getElementById(nextpage);
    text.classList.add('btn-active'); 
    };

    //更新點擊按鈕事件
    function clickbtn() {
    //重新定義點擊的按鈕
        let pageBtn = document.querySelectorAll(".page-Btn");
            for( let i=0;i<pageBtn.length ;i++){
              pageBtn[i].addEventListener("click",function(){
                  nextpage = parseInt(pageBtn[i].innerHTML);
  
                 //改變按鈕 樣式
                 changeBtnStyle();
                 //重新 更換內容資料的函式
                 renderPage();
              })
            }
    };
  
   //---------------觸發更換按鈕------------
    
    for( let i=0 ; i<pageBtn.length ; i++){
       pageBtn[i].addEventListener("click",changeBtnStyle); 

       //更換按鈕樣式的函式
       function changeBtnStyle(){
        //1.先移除原有
        let removeClass = document.querySelector('.btn-active');
        removeClass.classList.remove('btn-active'); 
        //2.再加入指定的按鈕css屬性
        if( nextpage == undefined){
        choseBtn = pageBtn[i].id 
        }
        else{
        choseBtn = nextpage
        }
        let clickBtn = document.getElementById(choseBtn);
           clickBtn.classList.add("btn-active");

        //重新定義 nextpage 將內容定義為 undefined   
        nextpage = undefined;    
        };
    
        //更換內容資料的函式
        pageBtn[i].addEventListener("click",renderPage);

        function renderPage(){
       
        //抓出每頁最大及最小筆數編號 當前頁數 * 每頁需要的資料筆數
        let min =(choseBtn*perpage)-perpage +1;
        let max = (choseBtn*perpage);
        let pagedata
        let newdata=[];
       if(searchdata!=""){
       pagedata = searchdata;

       }
       else{
       pagedata = data ;     
       }
       //console.log(data)
       pagedata.forEach(function(item,index){
        //利用陣列索引 索引從0開始 所以要加1
        let num = index+1
        //當篩選 索引大於最小值 及 小於最大值時 將該筆資料放入陣列
        if(num>=min && num<=max){
        newdata.push(item)   
        }
        })
        
        //將新的頁數資料重新放上網頁
        let journeyMainContent = document.querySelector(".journey-main-content");
            journeyMainContent.innerHTML=""; 
  
        for (let p = 0; p < newdata.length; p++){
            let id = newdata[p].TravelSeq;
            let name = newdata[p].Title;
            let photo = newdata[p].PhotoUrl;
            let text = newdata[p].Contents.substr(0,38)+"...";
            let tag = newdata[p].TravelType;

            //將tag 字串分開成陣列
            let arr=[]
            for(t=0 ;t<tag.length;t++){
            let gettag = tag.substr(t*9,4);
            if(gettag!==""){
            arr.push(gettag)    
            }  
            };

            let journeyCard = document.createElement("a");
                journeyCard.setAttribute("class","journey-card")
                journeyCard.setAttribute("href","journeyPagination.html?id="+id)
            let journeyImg = document.createElement("div");
                journeyImg.setAttribute("class","journey-img");
            let img = document.createElement("img");
                img.setAttribute("src",photo);
            let journeyTitle = document.createElement("div");
                journeyTitle.setAttribute("class","journey-title");
                journeyTitle.textContent = name;
                
            let journeyGroup = document.createElement("div");
                journeyGroup.setAttribute("class","journey-group");
                 
            let journeyText = document.createElement("div");
                journeyText.setAttribute("class","journey-text");
                journeyText.textContent = text ;
                
                journeyMainContent.appendChild(journeyCard);
                journeyCard.appendChild(journeyImg);
                journeyCard.appendChild(journeyTitle);
                journeyCard.appendChild(journeyGroup);

                journeyCard.appendChild(journeyText);            
                journeyImg.appendChild(img);
      

                //將 tag 放入 journey-group的迴圈
                arr.forEach(function(item,index){
                    journeyTag = document.createElement("div");
                    journeyTag.setAttribute("class","journey-tag");
                    tag = item;
                    journeyTag.textContent = tag;
                    journeyGroup.appendChild(journeyTag);
                });
   
        }
    
       }
    }

    //下一頁按鈕
    let AddPageBtn = document.querySelector('.Add-page');
        AddPageBtn.addEventListener("click",function(){
        if(choseBtn==undefined){
        choseBtn = 1 ;
        }
        if(choseBtn==page){
        alert('最後一頁了');
        return;
        }
        if(choseBtn == 1 && page == 1 ){
        return;
        }    
        nextpage = parseInt(choseBtn) + 1; 

        //更改按鈕列表
        updateBtnlist();
        clickbtn();
        //更改按鈕樣式   
        changeBtnStyle();
        //更改內容資料
        renderPage();
        });

    //上一頁按鈕
    let LessPageBtn = document.querySelector('.Less-page');
        LessPageBtn.addEventListener("click",function(){
        if(choseBtn==undefined){
            choseBtn = 1 ;
        }
        if(choseBtn == 1){
            return;
        }    
        nextpage = parseInt(choseBtn) - 1; 


        //更改按鈕列表
        updateBtnlist();
        clickbtn();
        //更改按鈕樣式   
        changeBtnStyle();
        //更改內容資料
        renderPage();           
        });





//+++++++++++++++++++++++++++
//      搜尋列 功能
//+++++++++++++++++++++++++++

let tagBtn = document.querySelectorAll(".tag-Btn");

for(let b=0 ; b<tagBtn.length ; b++){
    tagBtn[b].addEventListener("click",tagClick);
    function tagClick(){

    //為點選的按鈕加上樣式
    let removeClass = document.querySelector('.tag-active');
    if( removeClass == null){
        removeClass = null
    }else{
      removeClass.classList.remove('tag-active');
    }
    tagBtn[b].classList.add('tag-active');
    //選取點選樣式的數值
    let btnValue = tagBtn[b].innerHTML; 
    searchdata=[];  
    data.forEach(function(item,index){
        let tag = item.TravelType
        //將tag 字串分開成陣列
        let arr=[]
        for(t=0 ;t<tag.length;t++){
            let gettag = tag.substr(t*9,4);
            let id = item.TravelSeq
            if(gettag!==""){
            arr.push(gettag)   
            }  
        };
        //比對選取的 tag 與 資料相符的放入searchdata
        for(let a=0; a<arr.length ;a++){
            if(arr[a]==btnValue){
            searchdata.push(item)
            }
        };  
    });
    let len = searchdata.length;
    //console.log(len)
    if(len>12){
        len=12
    }
    let journeyMainContent = document.querySelector(".journey-main-content");
    journeyMainContent.innerHTML=""; 
    for (let l = 0; l < len; l++) {
        let journeyTag
        let id = searchdata[l].TravelSeq;
        let name = searchdata[l].Title;
        let photo = searchdata[l].PhotoUrl;
        let text = searchdata[l].Contents.substr(0,38)+"...";
        let tag = searchdata[l].TravelType;
        
        //console.log("test")
        //將tag 字串分開成陣列
        let arr=[]
        for(t=0 ;t<tag.length;t++){   
        let gettag = tag.substr(t*9,4);
        if(gettag!==""){
        arr.push(gettag)    
        }  
        };

        let journeyCard = document.createElement("a");
            journeyCard.setAttribute("class","journey-card")
            journeyCard.setAttribute("href","journeyPagination.html?id="+id)
        let journeyImg = document.createElement("div");
            journeyImg.setAttribute("class","journey-img");
        let img = document.createElement("img");
            img.setAttribute("src",photo);
        let journeyTitle = document.createElement("div");
            journeyTitle.setAttribute("class","journey-title");
            journeyTitle.textContent = name;
            
        let journeyGroup = document.createElement("div");
            journeyGroup.setAttribute("class","journey-group");
             
        let journeyText = document.createElement("div");
            journeyText.setAttribute("class","journey-text");
            journeyText.textContent = text ;
            
            journeyMainContent.appendChild(journeyCard);
            journeyCard.appendChild(journeyImg);
            journeyCard.appendChild(journeyTitle);
            journeyCard.appendChild(journeyGroup);

            journeyCard.appendChild(journeyText);            
            journeyImg.appendChild(img);
  

            //將 tag 放入 journey-group的迴圈
            arr.forEach(function(item,index){
                journeyTag = document.createElement("div");
                journeyTag.setAttribute("class","journey-tag");
                tag = item;
                journeyTag.textContent = tag;
                journeyGroup.appendChild(journeyTag);
            });
        
    }
    
    //算出頁數按鈕總數   
    let pagelen = Math.ceil(searchdata.length/12);
    //重新寫出按鈕
    nextpage = 1
    page = pagelen    
    updateBtnlist();
    clickbtn();

    }

}






}