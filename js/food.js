//特色小吃 資料
ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx",function(response){
    foodRender(response)
});

function foodRender(data){
    // console.log(data)

     //所有食物的總數
     let len = data.length;
     let perpage = 12;
     let id 
     let name 
     let photo 
     let Address 
     let Text
     let place 
    
     let foodMainContent = document.querySelector(".food-main-content");


     //載入第一筆資料
     for (let i = 0; i <12; i++) {
      
        id = data[i].ID
        name = data[i].Name
        photo = data[i].PicURL
        address = data[i].Address
        text = data[i].HostWords.substr(0,35)
        country = data[i].City
        town = data[i].Town
        tel = data[i].Tel

        let foodCard = document.createElement("a");
            foodCard.setAttribute("href","foodPagination.html?id="+ id);
            foodCard.setAttribute("class","food-card");
        let foodCardLeft = document.createElement("div");
            foodCardLeft.setAttribute("class","food-card-left");
        let foodCardRight = document.createElement("food-card-right");
            foodCardRight.setAttribute("class","food-card-right");
        let foodImg = document.createElement("div");
            foodImg.setAttribute("class","food-img");
        let Img = document.createElement("img");
            Img.setAttribute("src",photo);
        
        let foodTitle = document.createElement("div");
            foodTitle.setAttribute("class","food-title");
            foodTitle.textContent = name;

        let foodTel =document.createElement("div");
            foodTel.setAttribute("class","food-tel");
            foodTel.textContent = tel;

        let foodPlace = document.createElement("div");
            foodPlace.setAttribute("class","food-place");
            
        let foodCountry = document.createElement("div");
            foodCountry.setAttribute("class","food-country");
            foodCountry.textContent = country;

        let foodTown = document.createElement("div");
            foodTown.setAttribute("class","food-town");
            foodTown.textContent = town;

        let foodText = document.createElement("div");
            foodText.setAttribute("class","food-text");
            foodText.textContent = text +" ...";



        foodMainContent.appendChild(foodCard);
        foodCard.appendChild(foodCardLeft);
        foodCard.appendChild(foodCardRight);

        foodCardLeft.appendChild(foodImg);
        foodImg.appendChild(Img);
        
        foodCardRight.appendChild(foodTitle);
        foodCardRight.appendChild(foodTel);
        foodCardRight.appendChild(foodPlace);
        foodCardRight.appendChild(foodText);

        foodPlace.appendChild(foodCountry);
        foodPlace.appendChild(foodTown);


       
     }
    //+++++++++++++++++++++++++++
    //      頁數判斷功能
    //+++++++++++++++++++++++++++

    //產品頁數
    let page = Math.ceil(len/perpage); 
    
    let pageList = document.querySelector(".page-list");
    //console.log( pageList)

    //第一次產出頁數按鈕
    for( let i = 0 ; i<10 ; i++){
    let pageBtn = document.createElement("div");
        pageBtn.setAttribute("class","page-Btn");
        pageBtn.setAttribute("id",i+1);
        pageBtn.textContent = i+1;
        pageList.appendChild(pageBtn);
    };
    let activebtn = document.getElementById("1");
        activebtn.classList.add("btn-active");

    // 頁數按鈕 監聽事件
    let pageBtn =  document.querySelectorAll('.page-Btn');
    let nextpage
    let choseBtn 

    //---------------更新按鈕列---------------

    //重新更新按鈕列表
    function updateBtnlist(){
    let Btnstr = "";
    let max = nextpage +5;
    let min = nextpage -5;

    if(min<0 || min==0){
        min = 1;
        max = 11;     
    }
    if( max>page){
        max = page +1;
    }
    for( let i = min; max>i ;i++){
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
            //console.log(removeClass)
                removeClass.classList.remove('btn-active'); 
            //2.再加入指定的按鈕css屬性
            if( nextpage == undefined){
                choseBtn = pageBtn[i].id 
               // console.log(choseBtn)
            }
            else{
                choseBtn = nextpage
            }
           // console.log(choseBtn)
            let clickBtn = document.getElementById(choseBtn);
                clickBtn.classList.add("btn-active");

            //重新定義 nextpage 將內容定義為 undefined   
            nextpage = undefined;    
        };

        //更換內容資料的函式
        pageBtn[i].addEventListener("click",renderPage);
        function renderPage(){
        
        //抓出每頁最大及最小的筆數編號  當前頁數 * 每頁需要的資料筆數
        let min =(choseBtn*perpage) - perpage +1;
        let max =(choseBtn*perpage);
        let newdata =[];
        // if(searchdata!=""){
        // pagedata = searchdata;
        // }
        // else{
        // pagedata = data ;     
        // }
        data.forEach(function(item,index){
            //利用陣列索引 索引從0開始 所以要加1
            let num = index+1
            //當篩選 索引大於最小值 及 小於最大值時 將該筆資料放入陣列
            if(num>=min && num<=max){
                newdata.push(item)   
            } 
        });

        //將新的頁數資料重新放上網頁
        let str=""

        for (let p = 0; p < newdata.length; p++) {
           
        id = newdata[p].ID
        name = newdata[p].Name
        photo = newdata[p].PicURL
        address = newdata[p].Address
        text = newdata[p].HostWords.substr(0,35)
        country = newdata[i].City
        town = newdata[i].Town
        tel = newdata[i].Tel

        str += '<a  href="foodPagination.html?id="'+ id +' class="food-card"><div class="food-card-left"><div class="food-img"><img src="'+ photo
        +'" alt=""></div></div><div class="food-card-right"><div class="food-title">'+name
        +'</div><div class="food-tel">'+ tel 
        +'<div class="food-place"><div class="food-country">'+ country
        +'</div><div class="food-town">'+ town +'</div></div>'
        +'</div><div class="food-text">'+ text
        +'</div></div></a>'
    
        }
        
        let presentMainContent = document.querySelector('.food-main-content');
        presentMainContent.innerHTML = str;
        };

    };


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

}