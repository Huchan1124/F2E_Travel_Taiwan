
// DOM
const js_search_btn = document.querySelector(".js_search_btn");
const js_category_select = document.querySelector(".js_category_select");
const js_city_select = document.querySelector(".js_city_select");

const area = document.querySelector(".area");

// 不分地區畫面渲染
function initRender(category){
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/${category}?$filter=Picture%2FPictureUrl1%20ne%20null&$top=6&$format=JSON`,{
    headers: getAuthorizationHeader()
 })
 .then((res)=>{
     console.log(res.data);
     let str = "";
     res.data.forEach((item,index)=>{
         str += `<div class="card me-1 mb-5" style="width: 30%">
           <img src="${res.data[index].Picture.PictureUrl1}" class="card-img-top"  style="width:100%;height:200px;"/>
           <div class="card-body">
             <h5 class="card-title">${res.data[index].Name}</h5>
             <p class="card-text">${res.data[index].Address}</p>
             <a class="btn bg-green  text-white w-100">了解更多</a>
           </div> </div> `;
 
     })
    //畫面渲染 不能用變數因為與參數的型別不同 
     document.querySelector(`.${category}_section`).innerHTML = str;
 
 })
 .catch((error)=>{
     console.log(error);
 })
}

// initRender("ScenicSpot");
// initRender("Hotel");
// initRender("Activity");

// axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=Picture%2FPictureUrl1%20ne%20null&$top=6&$format=JSON",{
//     headers: getAuthorizationHeader()
//  })
//  .then((res)=>{
//      console.log(res.data);
//      let str = "";
//      res.data.forEach((item,index)=>{
//          str += `<div class="card me-1 mb-5" style="width: 30%">
//            <img src="${res.data[index].Picture.PictureUrl1}" class="card-img-top"  style="width:100%;height:200px;"/>
//            <div class="card-body">
//              <h5 class="card-title">${res.data[index].Name}</h5>
//              <p class="card-text">${res.data[index].Address}</p>
//              <a class="btn bg-green  text-white w-100">了解更多</a>
//            </div> </div> `;
 
//      })
//      document.querySelector(`.ScenicSpot_section`).innerHTML = str;
   
//  })
//  .catch((error)=>{
//      console.log(error);
//  })

 
// axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?$filter=Picture%2FPictureUrl1%20ne%20null&$top=6&$format=JSON",{
//     headers: getAuthorizationHeader()
//  })
//  .then((res)=>{
//      console.log(res.data);
//      let str = "";
//      res.data.forEach((item,index)=>{
//          str += `<div class="card me-1 mb-5" style="width: 30%">
//            <img src="${res.data[index].Picture.PictureUrl1}" class="card-img-top"  style="width:100%;height:200px;"/>
//            <div class="card-body">
//              <h5 class="card-title">${res.data[index].Name}</h5>
//              <p class="card-text">${res.data[index].Address}</p>
//              <a class="btn bg-green  text-white w-100">了解更多</a>
//            </div> </div> `;
 
//      })
//      document.querySelector(`.Hotel_section`).innerHTML = str;
//  })
//  .catch((error)=>{
//      console.log(error);
//  })


  
// axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$filter=Picture%2FPictureUrl1%20ne%20null&$top=6&$format=JSON",{
//     headers: getAuthorizationHeader()
//  })
//  .then((res)=>{
//      console.log(res.data);
//      let str = "";
//      res.data.forEach((item,index)=>{
//          str += `<div class="card me-1 mb-5" style="width: 30%">
//            <img src="${res.data[index].Picture.PictureUrl1}" class="card-img-top"  style="width:100%;height:200px;"/>
//            <div class="card-body">
//              <h5 class="card-title">${res.data[index].Name}</h5>
//              <p class="card-text">${res.data[index].Address}</p>
//              <a class="btn bg-green  text-white w-100">了解更多</a>
//            </div> </div> `;
 
//      })
//      document.querySelector(`.Activity_section`).innerHTML = str;
   
//  })
//  .catch((error)=>{
//      console.log(error);
//  })





js_search_btn.addEventListener("click",()=>{

const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${js_category_select.value}/${js_city_select.value}?$filter=Picture%2FPictureUrl1%20ne%20null&$top=9&$format=JSON`; 

console.log(url);


axios.get(url,{
    headers: getAuthorizationHeader()
 })
 .then((res)=>{
     console.log(res.data);

     document.querySelector(".ScenicSpot_title").textContent = `${res.data[0].City}景點`;
     
     let str = "";
     res.data.forEach((item,index)=>{
         str += `<div class="card me-1 mb-5" style="width: 30%">
         <img src="${res.data[index].Picture.PictureUrl1}" class="card-img-top"  style="width:100%;height:200px;"/>
         <div class="card-body">
           <h5 class="card-title">${res.data[index].Name}</h5>
           <p class="card-text line-clamp ">${res.data[index].DescriptionDetail}</p>
           <a class="btn bg-green  text-white w-100">了解更多</a>
         </div> </div>`;
 
     })

     document.querySelector(`.ScenicSpot_section`).innerHTML = str;
  
   
 })
 .catch((error)=>{
     console.log(error);
 })

})


 function getAuthorizationHeader () {
    const AppID = '4fe0be8061d344d08a2445cf041fd7a3';
    const AppKey = 'czFw_bs-u4PsCfPNjic4u-zjK-Q';
    const GMTString = new Date().toGMTString();
    const ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    const HMAC = ShaObj.getHMAC('B64');
    const Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { Authorization: Authorization, 'X-Date': GMTString }
  }


 
