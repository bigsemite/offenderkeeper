var config = {
    apiKey: "AIzaSyCdghsA-A9heIHlt4sb2TqOGAzMro429ts",
    authDomain: "offencekeeper.firebaseapp.com",
    databaseURL: "https://offencekeeper.firebaseio.com",
    projectId: "offencekeeper",
    storageBucket: "offencekeeper.appspot.com",
    messagingSenderId: "Semiu"
};
var fb = firebase.initializeApp(config);



function adding(){
    //alert(defFb);
    
    

    var db = firebase.database();
    //var db = new Firebase("https://sitelocator.firebaseio.com");
    
    var dbName;
    er.style.display ="none";

    switch(tete.selectedIndex){
        case 0:
            alert("Please Select a BTS type");
            return;
        case 1:
            dbName = "BTS";
            break;
        case 2:
            dbName = "BBC";
    }
    //alert(dbName);
    if ((siteName.value == "") || (siteLat.value=="") || (siteLongitude.value=="")){
        er.style.display ="block";
        return;
    }
    if (siteLat.value != ""){
        
        var myData = db.ref(dbName);
        //var myData = db.child(dbName);
        //alert("Good");
        var result = myData.push({
        'Latitude': siteLat.value,
        'Longitude': siteLongitude.value,
        'Site': siteName.value
        },function(error){
            if(error){ alert(error);}
            else{alert("Added successfully. ");
            siteName.value ="";
            siteLat.value ="";
            siteLongitude.value = "";
            tete.selectedIndex =0;
        }
        });

        
    }
    else{
        alert("Empty Value not accepted");
    }
    
}

    //vSite =["GGG","shd"];
    totalN =0;
    totalBBC=0;
    var vSite=new Array();
    var vLat = new Array();
    var vLon = new Array();
    var bSite = new Array();
    var bLat = new Array();
    var bLon = new Array();
    var dKey = new Array();
    var d2Key = new Array();




function loadingFB(){

    setTimeout(function(){
        tr.style.display = "none";
    },2000);
    //alert("nothing");
    var db = firebase.firestore();
    

    var bte= db.collection("CRIMES").onSnapshot(function(doc){  //});
        doc.forEach(function(va){
            var v1 = va.data().VEHICLE;
            var l1 = va.data().LOCATION;
            var f1 = va.data().OFFENSE;
            var pers = va.data().DRIVER;
            var ed = va.data().OFFENSE_DATE;
            var pc = va.data().EVIDENCE;
            var stat = va.data().STATUS;
            //alert(v1);
            insertDB(ed,v1,l1,f1,pers,pc,stat);
        });
        
        }
    );
   
}

function insertDB(a,b,c,d,e,f,g){
    var dat = "<tr><td>" + a + "</td><td>" + e + "</td><td>" + b + "</td><td>" + d + "</td><td>"+ c;
    dat += "</td><td>" + g + "</td><td><a href='"+ f + "'><img width='64px' src='"+ f + "'/></a></td><td><button onclick='removeDB(\"" + a + '\",\"'+ b+ "\")'>Update</button></td></tr>";
    tResult1.innerHTML += dat;

    
}



function removeDB(ss, loc){

    alert("This feature is in progress");
    /*
    var db = firebase.database();
    //var db = new Firebase("https://sitelocator.firebaseio.com/"+ loc +"/" +ss);
    var sk = db.ref(loc).child(ss);
    var test = confirm("Are You sure you want to permanently remove the info from database?");

    if(test){
        
        //myRef = db.database().ref(ss);
        s = confirm("I will remove it ooo?");
        if (s)
            sk.remove();
        alert("Removed! \n Refresh the page to reflect changes");
        
    }
    */
}

function forgetpass1(){
    eml = uname1.value;
    var aut = firebase.auth();
    msgl.style.display ="block";
    aut.sendPasswordResetEmail(eml).then(function(){
        msgl.style.color ="blue";
        msgl.innerHTML = "Check Your Email for Password reset";
        //window.open("login.html","_self");
    }).catch(function(error){
        alert (error.message);

    });
}

function goin(){

    firebase.auth().onAuthStateChanged(function(user){
        if (user){
            pg1.style.display = "none";
            mainPage.style.display ="block";
            loadingFB();
            
        }else{
            //alert("Not login!");
        }
        
    });
    
}

function tryLogin1(){
    eml = uname1.value;
    pswd = passwd1.value;
    msgl.style.display ="block";
    
    firebase.auth().signInWithEmailAndPassword(eml,pswd).then(function(user){

        pg1.style.display = "none";
        mainPage.style.display ="block";
        loadingFB();

    }).catch(function(error){
        alert (error.message);
        msgl.style.display ="none";
        
    });
    
}