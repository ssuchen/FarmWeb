//============================
//  留言按鈕 判斷是否有登入會員 
//============================

travelpageMessageBtn = document.querySelector(".travelpage-message-btn");
// 有登入時 留言按鈕出現
 userName
 userEmail
 userPhoto
 user
 console.log(user)
 firebase.auth().onAuthStateChanged(function(user){
    if(user != null){
        //user = firebase.auth.currentUser;
        console.log(user)
        userName = user.displayName; 
        console.log(userName)
        userEmail = user.email
        console.log(userEmail)
        userPhoto = user.photoURL;   
        console.log(userPhoto)

        
    }
    else{
      console.log("no")
    }
   
})


//最新消息 資料
 ajax("https://cors-anywhere.herokuapp.com/https://gis.taiwan.net.tw/XMLReleaseALL_public/activity_C_f.json",function(response){
     newRender(response)
});

function newRender(data){
 //let len = data.XML_Head.Infos.Info.length
//抓出2019的資訊
let arr=[]
let list = data.XML_Head.Infos.Info
for(let a= 0;a< list.length ;a++){
    let year = data.XML_Head.Infos.Info[a].Start.slice(0,4);
    if( year=="2019"){
    arr.push(data.XML_Head.Infos.Info[a]);
    }
}

//抓出最新50筆
let newarr=[]
arr.forEach(function(item,index){
let max = arr.length
let min = max-6
if(index<max && min<index){
 newarr.push(item)
}
})

for( let i=0; i<5 ;i++ ){
   //最新消息 資料
    let id = newarr[i].Id;  
    let title = newarr[i].Name;
    let text = newarr[i].Description.slice(0,50)+"...";
    let time = newarr[i].Start.slice(0,10);
    //console.log(id)
    
    //最新消息DOM元素
     let indexMainCrad = document.createElement('div');
         indexMainCrad.setAttribute('class','index-main-crad');
     let cardTitle = document.createElement('div');
         cardTitle.setAttribute('class','card-title');
         cardTitle.textContent = title;
     let cardText = document.createElement('a');
         cardText.setAttribute('href',"#");
         cardText.setAttribute('class','card-Text');
         cardText.textContent = text ;
     let cardTime = document.createElement('p');
         cardTime.setAttribute('class','card-time');
         cardTime.textContent = time ;



     let indexMainRight = document.querySelector('.index-main-content');
     indexMainRight.appendChild(indexMainCrad);
     indexMainCrad.appendChild(cardTitle);
     indexMainCrad.appendChild(cardText);
     indexMainCrad.appendChild(cardTime);



}
 

}
