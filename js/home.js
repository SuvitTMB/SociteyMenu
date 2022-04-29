var cleararray = "";
var EidSocietyMenu = "";
var slideIndex = 0;
showSlides(slideIndex);

$(document).ready(function () {
    if(sessionStorage.getItem("LINERetailSociety")==null) { location.href = "index.html"; }
  	Connect_DB();
    //SlidesLDP();
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
  dbSocietyMenu = firebase.firestore().collection("SocietyMenu");
  CheckData();
}


function CheckData() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = doc.data().statusconfirm;
      EidProfile = doc.id;
      sDateRegister = doc.data().DateRegister;
      sessionStorage.setItem("EmpID", doc.data().empID);
      sessionStorage.setItem("EmpName", doc.data().empName);
      ListWebPage();
      if(doc.data().statusconfirm==1) {
        ListWebPage();
      } else if(doc.data().statusconfirm==2) {
        location.href = "waittingpage.html";
      } else {
        location.href = "cancelpage.html";
      }
    });
  });
}


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
  var sLinktoWeb = "";
  var str = "";
  dbSocietyMenu.where(firebase.firestore.FieldPath.documentId(), "==", id)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidSocietyMenu = doc.id;
      sCountView = parseInt(doc.data().CountView) + 1;
      sLinktoWeb = doc.data().GroupLink;
      sGroupName = doc.data().GroupName;
      str += '<div style="max-width:450px;width:100%;">';
      str += '<div class="btn-t3" style="cursor: default;">'+doc.data().GroupName+'</div>';
      str += '<div style="margin-top:15px"><img src="'+doc.data().GroupImg+'" style="width:120px;"></div>';
      str += '<div style="text-align:left; color:#000; padding-top:12px;">ข้อมูลระบบงาน</div>';
      str += '<div class="LDP-detail">'+doc.data().GroupDetail+'</div>';
      str += '</div>';
      str += '<div style="max-width:450px;width:100%;margin-top:25px; margin-bottom: 20px;">';
      str += '<div class="btn-t1" onclick="CheckCountView(\''+ doc.data().GroupLink +'\')">เข้าสู่เว็บไซต์</div>';
      str += '<div class="btn-t2" onclick="CloseAll()">Close</div>';
      str += '</div>';

      $("#DisplayProject").html(str);
      //alert(sCountView);
    });
    dbSocietyMenu.doc(id).update({
        CountView : sCountView
    });
    document.getElementById('id01').style.display='block';
    //alert("Goto Page");
    //location.href = sLinktoWeb;
  });

}

function ClickLink(x) {
  if(x==1) {
    location.href = "https://liff.line.me/1655966947-jgGrdY14";
  } else if(x==2) { 
    location.href = "https://liff.line.me/1655966947-ZQna9Rop";
  } else if(x==3) { 
    location.href = "https://liff.line.me/1655966947-rEbaPQvl";
  }
}


function CheckCountView(gotogrouplink) {
  location.href = gotogrouplink;
}


/*
function SlidesLDP() {
  var str = "";
  str += '<div class="slideshow-container">';
  str += '<div class="mySlides fade1">';
  str += '<div class="numbertext">TNI Redeem Point</div>';
  str += '<img src="./slides/slide-1.jpg" style="width:100%">';
  str += '<div class="text">Caption Text</div></div>';

  str += '<div class="mySlides fade1">';
  str += '<div class="numbertext">TNI Redeem Point</div>';
  str += '<img src="./slides/slide-2.jpg" style="width:100%">';
  str += '<div class="text">Caption Text</div></div>';

  str += '<div class="mySlides fade1">';
  str += '<div class="numbertext">TNI Redeem Point</div>';
  str += '<img src="./slides/slide-3.jpg" style="width:100%">';
  str += '<div class="text">Caption Text</div></div>';

  str += '<a class="prev1" onclick="plusSlides(-1)">&#10094;</a>';
  str += '<a class="next1" onclick="plusSlides(1)">&#10095;</a>';
  str += '</div><br>';
  str += '<div style="text-align:center">';
  str += '<span class="dot" onclick="currentSlide(1)"></span> ';
  str += '<span class="dot" onclick="currentSlide(2)"></span> ';
  str += '<span class="dot" onclick="currentSlide(3)"></span>';
  str += '</div>';

  $("#DisplayDlider").html(str);
}
*/



 


function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1} 
    slides[slideIndex-1].style.display = "block"; 
    setTimeout(showSlides, 10000); // Change image every 2 seconds
}






/*

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


function LoadVDOTraining() {
  //$("#text").html('688');
  var i = 0;
  var str = "";
  dbVDOTraining
  //.where('VDOgroup','==',sVDOgroup)
  .where('VDOstatus','==',0)
  .orderBy('VDOtimestamp','desc')
  .limit(12).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    	i = i+1;
  		str += '<div class="col-lg-6 col-md-2 slide text-center boxvdo" data-aos="fade-left" onclick="OpenVdo(\''+ doc.id +'\','+i+')">';
  		str += '<div class="boxvdo-border member"><div class="boxvdo-img">';
  		str += '<img src="'+doc.data().VDOimg+'" class="img-fluid" style="border-radius: 10px;">';
      str += '<div class="vdo-timer"><img src="./img/timer.png" width="15px"> '+doc.data().VDOtimer+'</div></div>';
  		str += '<div class="boxvdo-title"><div class="boxvdo-header">'+doc.data().VDOname+'</div>';
  		str += '<div class="boxvdo-line1">'+doc.data().VDOdetail+'</div>';
  		str += '<div class="boxvdo-line2"><div class="boxvdo-icon1">';
  		str += '<img src="./img/calendar.png" class="boxvdoimg"> <span>'+doc.data().VDOdate+'</span></div>';
  		str += '<div class="boxvdo-icon"><img src="./img/reading.png" class="boxvdoimg"> <span id="ReadView-'+i+'">'+doc.data().VDOread+' อ่าน</span></div>';
  		if(doc.data().VDOquiz==1) {
  			str += '<div class="boxvdo-icon"><img src="./img/quizgame.png" class="boxvdoimg"> <span>เก็บคะแนน</span></div>';
  		}
  		if(doc.data().ShowQuestion==1) {
  			str += '<div class="boxvdo-icon"><img src="./img/ask.png" class="boxvdoimg"> <span>'+doc.data().QuestionSend+' คำถาม</span></div>';
  		}
  		str += '</div></div></div></div>';
      if(i==2) {
        str += '<div class="clr"></div>';
      } else if(i==4) { 
        str += '<div class="clr"></div>';
      } else if(i==6) { 
        str += '<div class="clr"></div>';
      } else if(i==8) { 
        str += '<div class="clr"></div>';
      } else if(i==10) { 
        str += '<div class="clr"></div>';
      } else if(i==12) { 
        str += '<div class="clr"></div>';
      } else if(i==14) { 
        str += '<div class="clr"></div>';
      } else if(i==16) { 
        str += '<div class="clr"></div>';
      } else if(i==18) { 
        str += '<div class="clr"></div>';
      } else if(i==20) { 
        str += '<div class="clr"></div>';
      }
    });
	  $("#DisplayVDO").html(str);
  });
}

function GotoGroup(x) {
  if(x==1) {
    location.href = "learning.html";
  } else if(x==2) {
    location.href = "training.html";
  }
}


function OpenVdo(x,r) {
  location.href = "displayvdo.html?gid="+x+"";
}

function GotoAll() {
  location.href = "search.html";
}
*/

function CloseAll() {
	document.getElementById('id01').style.display='none';
}


