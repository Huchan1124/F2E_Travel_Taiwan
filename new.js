axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$filter=Picture%2FPictureUrl1%20ne%20null&$top=30&$format=JSON",{
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

