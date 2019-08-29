

//最新消息 資料
 ajax("https://cors-anywhere.herokuapp.com/https://gis.taiwan.net.tw/XMLReleaseALL_public/activity_C_f.json",function(response){
     newRender(response)
});

function newRender(data){
 //let len = data.XML_Head.Infos.Info.length
for( let i=0; i<6 ;i++ ){
   //最新消息 資料  
    let title = data.XML_Head.Infos.Info[i].Name;
    let text = data.XML_Head.Infos.Info[i].Description.slice(0,50)+"...";
    let time = data.XML_Head.Infos.Info[i].Start.slice(0,10);
    
    //最新消息DOM元素
     let indexMainCrad = document.createElement('div');
         indexMainCrad.setAttribute('class','index-main-crad');
     let cardTitle = document.createElement('div');
         cardTitle.setAttribute('class','card-title');
         cardTitle.textContent = title;
     let cardText = document.createElement('p');
         cardText.textContent = text ;
     let cardTime = document.createElement('p');
         cardTime.setAttribute('class','card-time');
         cardTime.textContent = time ;



     let indexMainRight = document.querySelector('.index-main-right');
     indexMainRight.appendChild(indexMainCrad);
     indexMainCrad.appendChild(cardTitle);
     indexMainCrad.appendChild(cardText);
     indexMainCrad.appendChild(cardTime);



}
 

}
