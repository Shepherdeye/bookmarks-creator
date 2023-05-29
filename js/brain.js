var siteName=document.getElementById("input1"),
    myButton=document.getElementById("button"),
    siteURL=document.getElementById("input2");

  if(localStorage.getItem("data")==null){
    var datasaver=[];
  }else{
    var datasaver=JSON.parse(localStorage.getItem("data"));
  }











  //shaw data
  displayData() 

 //تفعيل الداله
 myButton.onclick=dataEntery;



    function dataEntery(){

      if(siteURL.value==""){
        alert("Enter Url")
      }else if(siteName.value==""){
        alert("Error Name")
      }else {
        var data={
          name:siteName.value,
          URL:siteURL.value
        }
  
        datasaver.push(data);
      
        //save data
        localStorage.setItem("data",JSON.stringify(datasaver))
        displayData() 
        clearInput()
      }
      
    }
  
    


    function displayData(){

      var tbody="";

      for(var i=0 ; i<datasaver.length ; i++){

        tbody += `
        <tr>
        <td>${datasaver[i].name}</td>
        <td> <a class=" btn btn-info text-light text-decoration-none" href="${datasaver[i].URL}"  target="_blank"> Visit</a> </td>
        <td><button class=" btn btn-warning" onclick="updateme(${i})"> Update</button></td>
        <td><button class=" btn btn-danger"  onclick="deleteMe(${i})"> Delete</button></td>
        <td ><i class="fa fa-bookmark text-info" aria-hidden="true"></i> </td>
        
     </tr>
        `;
        document.getElementById("tbody").innerHTML= tbody;
      }

    }


   

  



    function deleteMe(index){
      
   
  if(datasaver.length==0){
    document.getElementById("tbody").innerHTML="";
    displayData();
  }else{
    datasaver.splice(index,1);
    
    //save data
localStorage.setItem("data",JSON.stringify(datasaver));

displayData()

  }
 

    }

    function updateme(index){

      siteName.value= datasaver[index].name;
      siteURL.value= datasaver[index].URL;
      siteName.focus();
      myButton.setAttribute("value","update Bookmark");
      myButton.classList.remove("btn-info");
      myButton.classList.add("btn-warning");
 
      
      myButton.onclick=function(){
       datasaver[index].name=siteName.value;
       datasaver[index].URL=siteURL.value;
       
       myButton.classList.remove("btn-warning");
       myButton.classList.add("btn-info");
       myButton.setAttribute("value","Add Bookmark");
     
      
      //save data
      localStorage.setItem("data",JSON.stringify(datasaver));
      displayData();
 
      //بنرجع الزار للداله الاصليه اللي  هي ادخال البيانات 
      myButton.onclick=dataEntery;
 
      clearInput()
     
      }
       
     }




  
    function clearInput(){

    siteName.value= "";
    siteURL.value= "";
    }


    var mySearch=document.getElementById("search");

    mySearch.onkeyup=function(){
      var tbody="";
      for(var i=0 ; i<datasaver.length; i++){

      

        if(datasaver[i].name.toLowerCase().includes(mySearch.value.toLowerCase())){
          tbody += `
          <tr>
          <td>${datasaver[i].name.replace(`${mySearch.value.toLowerCase()}`, `<span class=" bg-warning">${mySearch.value.toLowerCase()}</span>` )}</td>
          <td> <a class=" btn btn-info text-light text-decoration-none" href="${datasaver[i].URL}"  target="_blank"> Visit</a> </td>
          <td><button class=" btn btn-warning" onclick="updateme(${i})"> Update</button></td>
          <td><button class=" btn btn-danger"  onclick="deleteMe(${i})"> Delete</button></td>
          
       </tr>
          `;
          document.getElementById("tbody").innerHTML= tbody;
          
        }else{

          tbody="";
          
        }

      }
    
    }