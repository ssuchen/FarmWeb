  
let idstring = location.href;
//將字串轉成url
let url = new URL(idstring);
//找到id後方的字串
let urlString = url.searchParams.get('id');
    
ajax("https://cors-anywhere.herokuapp.com/https://gis.taiwan.net.tw/XMLReleaseALL_public/activity_C_f.json",function(response){
    newsPageRender(response)
});


//點選的最新消息資訊
function newsPageRender(data){
    let list = data.XML_Head.Infos.Info.length
    for(let i= 0 ; i<list ;i++){
        let id = data.XML_Head.Infos.Info[i].Id
        if(urlString == id){
            let name = data.XML_Head.Infos.Info[i].Name
            let city = data.XML_Head.Infos.Info[i].Org
            let photo = data.XML_Head.Infos.Info[i].Picture1
            let time = data.XML_Head.Infos.Info[i].Start.slice(0,10);
            let web = data.XML_Head.Infos.Info[i].Website
            let text = data.XML_Head.Infos.Info[i].Description
            if(photo==""){
                photo="img/lossimg.jpg"
            }
            if(web==""){
                web="暫無提供相關網址"
            }
            let newspageLeft = document.querySelector(".newspage-left");
            let newspageImg = document.createElement('img');
            newspageImg.setAttribute("class","newspage-img");
            newspageImg.setAttribute("src",photo);
            let newspageContent = document.createElement("div");
            newspageContent.setAttribute("class","newspage-content");

            let newspageName = document.createElement("div");
            newspageName.setAttribute("class","newspage-name");
            newspageName.textContent = name;

            let newspagePlace = document.createElement("div");
            newspagePlace.setAttribute("class","newspage-place");
            let newspageCity = document.createElement("div");
            newspageCity.setAttribute("class","newspage-city");
            newspageCity.textContent = city;

            let newspageDate = document.createElement("div");
            newspageDate.setAttribute("class","newspage-date");
            newspageDate.textContent = time;

            let newspageWeb = document.createElement("div");
            newspageWeb.setAttribute("class","newspage-web");
            newspageWeb.textContent = "相關活動網址 | " + web;

            let newspageText = document.createElement("div");
            newspageText.setAttribute("class","newspage-text");
            newspageText.textContent = text;


            newspageLeft.appendChild(newspageImg);
            newspageLeft.appendChild(newspageContent);
    
            newspageContent.appendChild(newspageName);
            newspageContent.appendChild(newspagePlace);
            newspagePlace.appendChild(newspageCity);

            newspageContent.appendChild(newspageDate);
            newspageContent.appendChild(newspageWeb);
            newspageContent.appendChild(newspageText);

        }
    }


    //抓出2019的資訊
    let arr=[]

    for(let a= 0;a< list ;a++){
    let year = data.XML_Head.Infos.Info[a].Start.slice(0,4);
        if( year=="2019"){
            arr.push(data.XML_Head.Infos.Info[a]);
        }
    }
    //抓出最新10筆
    let newArr=[]
    arr.forEach(function(item,index){
        let max = arr.length
        let min = max-10
        if(index<max && min<index){
            newArr.push(item);
        }
    })

    //隨機打亂 陣列中 物件順序
    newArr.sort(function(){
        return Math.random() - 0.5;
    });


    newArr.forEach(function(item,index){
        if(index<5){
            let photo = item.Picture1
            let name = item.Name
            let id = item.Id
            if(photo==""){
                photo="img/lossimg.jpg"
            }
            let newspageOther = document.querySelector(".newspage-other");

            let otherSpace = document.createElement("a");
            otherSpace.setAttribute("class","other-space");
            otherSpace.setAttribute("href","newsPagination.html?id="+id)
            let otherImg = document.createElement("img");
            otherImg.setAttribute("class","other-img")
            otherImg.setAttribute("src",photo);
            let otherName = document.createElement("div");
            otherName.setAttribute("class","other-name");
            otherName.textContent = name;

            newspageOther.appendChild(otherSpace);
            otherSpace.appendChild(otherImg);
            otherSpace.appendChild(otherName);
        }
    }) 


}
