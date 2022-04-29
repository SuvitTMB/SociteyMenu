var dbSocietyMenu = "";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var sCountView = 0;
var sDateRegister = "";

$(document).ready(function () {
  Connect_DB();
});


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    databaseURL: "https://file-upload-6f4fc.firebaseio.com",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbProfile = firebase.firestore().collection("CheckProfile");
  CheckData();
}

var GetWatingTime = "";
function CheckData() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidProfile = doc.id;
      CheckFoundData = doc.data().statusconfirm;
      //alert(CheckFoundData);
      sDateRegister = doc.data().DateRegister;
      sessionStorage.setItem("EmpID", doc.data().empID);
      sessionStorage.setItem("EmpName", doc.data().empName);
      if(doc.data().statusconfirm==1) {
        location.href = "index.html";
      } else if(doc.data().statusconfirm==2) {
        GetWatingTime  = doc.data().DateAccept;
  //alert(GetWatingTime);
        updateTimer();
      } else {
        location.href = "cancelpage.html";
      }
    });
  });
}


function updateTimer() {
  //var GetWatingTime = "april 25, 2022 12:30:00";
   //var GetWatingTime1 = "april 29, 2022 22:45:47";
    //console.log(sDateRegister);
    //21/04/2022 07:02:49 AM
    future = Date.parse(GetWatingTime);
    //future = Date.parse(sDateRegister);
    now = new Date();
    diff = future - now;
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor(diff / (1000 * 60 * 60));
    mins = Math.floor(diff / (1000 * 60));
    secs = Math.floor(diff / 1000);
    d = (days+1);
    h = hours - days * 24;
    m = mins - hours * 60;
    s = secs - mins * 60;
    document.getElementById("timer")
      .innerHTML =
      '<div>' + d + '<span>days</span></div>' +
      '<div>' + h + '<span>hours</span></div>' +
      '<div>' + m + '<span>minutes</span></div>' +
      '<div>' + s + '<span>seconds</span></div>';
}
setInterval('updateTimer()', 1000);



function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}




/*
function ListWebPage() {
  var str = "";
  str += '<div class="grid">';
  dbSocietyMenu.where('GroupStatus','==',0)
  .orderBy('GroupID','asc')
  .orderBy('GroupRank','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<div class="box-menu" onclick="ClickCheckView(\''+ doc.data().GroupLink +'\',\''+ doc.id +'\')">';
      str += '<div><img src="'+ doc.data().GroupImg +'" class="box-menu-img"></div>';
      str += '<div class="box-menu-text">'+ doc.data().GroupNameWeb +'</div></div>';
    });
    str += '</div>';
    $("#DisplayListWebPage").html(str);
  });
}

function ClickCheckView(link,id) {
  //alert(link+"==="+id)
  //CheckCountView(id);
  var sLinktoWeb = "";
  dbSocietyMenu.where(firebase.firestore.FieldPath.documentId(), "==", id)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCountView = parseInt(doc.data().CountView) + 1;
      sLinktoWeb = doc.data().GroupLink;
      //alert(sCountView);
    });
    dbSocietyMenu.doc(id).update({
        CountView : sCountView
    });
    alert("Save Done");
    //location.href = sLinktoWeb;
  });

}


function CheckCountView(id) {
  dbSocietyMenu.where(firebase.firestore.FieldPath.documentId(), "==", id)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCountView = doc.data().CountView+1;
      alert(sCountView);

    });
  });
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
}


function viewpage(id) {
  location.href = "viewpage.html?gid="+id+"";
}

function GotoViewAll() {
  location.href = "viewall.html";
}


function GotoView() {
  location.href = "display.html";
}
*/