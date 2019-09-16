let Idstring = location.href;
let url = new URL(Idstring);
let UrlString = url.searchParams.get('id');
//console.log(UrlString)

ajax("https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/RuralTravelData.aspx",function(response){
    journeypageRender(response)
});

function journeypageRender(data){
//console.log(data)

data.forEach(function(item){
if(item.TravelSeq == UrlString){
    //console.log(item)
    let photo = item.PhotoUrl;
    let date = item.cDate.substr(0,10);
    let tag = item.TravelType;
    let text = item.Contents;
    let name = item.Title;
    
    //將tag 字串分開成陣列
    let arr=[]
    for(t=0 ;t<tag.length;t++){   
    let gettag = tag.substr(t*9,4);
    if(gettag!==""){
    arr.push(gettag)    
    }  
    }
    //console.log(arr)
    let journeyPaginationLeft = document.querySelector(".journeyPagination-left");
    //console.log(journeyPaginationLeft)
    let journeyPaginationContent = document.createElement("div");
        journeyPaginationContent.setAttribute("class","journeyPagination-content");
    let contentImg = document.createElement("img");
        contentImg.setAttribute("class","content-img");
        contentImg.setAttribute("src",photo);

    let contentList = document.createElement("div");
        contentList.setAttribute("class","content-list");

    let contentTitle = document.createElement("div");  
        contentTitle.setAttribute("class","content-title");
        contentTitle.textContent = name;
    let contentJourneygroup = document.createElement("div");
        contentJourneygroup.setAttribute("class","content-journeygroup");  
    
    let contentTag = document.createElement("div"); 
        contentTag.setAttribute("class","content-tag");

    let contentDate = document.createElement("div") ; 
        contentDate.setAttribute("class","content-date");
        contentDate.textContent= date;

    let contentFeature = document.createElement("div");
        contentFeature.setAttribute("class","content-feature");
        contentFeature.textContent = text;
    

    journeyPaginationLeft.appendChild(journeyPaginationContent);

    journeyPaginationContent.appendChild(contentImg);
    journeyPaginationContent.appendChild(contentList);

    contentList.appendChild(contentTitle);
    contentList.appendChild(contentJourneygroup);
    
    contentJourneygroup.appendChild(contentTag);
    contentJourneygroup.appendChild(contentDate);
    contentJourneygroup.appendChild(contentFeature);

    //將 tag 放入 journey-group的迴圈
    arr.forEach(function(item,index){
        journeyTag = document.createElement("div");
        journeyTag.setAttribute("class","journeypagination-tag");
        tag = item;
        journeyTag.textContent = tag;
        contentTag.appendChild(journeyTag);
    });











}
});
}