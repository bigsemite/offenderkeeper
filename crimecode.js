var config = {
    apiKey: "API-KEY",
    authDomain: "offencekeeper.firebaseapp.com",
    databaseURL: "https://offencekeeper.firebaseio.com",
    projectId: "offencekeeper",
    storageBucket: "offencekeeper.appspot.com",
    messagingSenderId: "Semiu",
};
var fb = firebase.initializeApp(config);

//store picture name in global variable and other info

var globalPic = null;
var carN ="";
var crimeloc="";
var detail ="";
var drvName="";
var drvLic="";
var dt=null;

function loading(){

}

function login1(){
    eml = username.value;
    passwd = pswd.value;
    msgl.style.display ="block";
                
    firebase.auth().signInWithEmailAndPassword(eml,passwd).then(function(user){
        report.style.display="block";
        logger.style.display = "none";
    }).catch(function(error){
                    alert (error.message);
                    msgl.style.display ="none";
                    
                });
                
}

//trigger the hidden file input
function takePhoto(){
    photo.click();
}

//take picture from file input
function showImg(foto){
    globalPic = foto.files[0];
	
	pic.src =window.URL.createObjectURL(globalPic);
}

function saveCrime(){

    //Take values from screen
    carN = carNumber.value;
    crimeloc = crimeLocation.value;
    detail = crime.value;
    drvName = driverName.value;
    drvLic = driverLic.value;
    //get today's date and time
    dt = new Date();
    dt = dt.toISOString();

    //Vehicle number is compulsory
    if (carN != ""){
        //check if there's any picture taken and save it first
        if (globalPic != null){
            savePicture();
        }
    
    }else{
        alert ("Vehicle Number is missing");
    }
    

}

//firstly save picture into the storage bucket and get the url
function savePicture(){
    var stor = firebase.storage();
    var storeRef = stor.ref();

    
    var storeImage = storeRef.child('Offender/' + globalPic.name).put(globalPic);
    
    storeImage.on('state_changed', function(snapshot){
        clr.style.display="block";
    },
    function(error){
        clr.innerHTML = error.code;
        clr.style.display="block";
    },
    function(){
        storeImage.snapshot.ref.getDownloadURL().then(function(downloadURL){
            pic.src = downloadURL;
            //var picPath = downloadURL;
            var s = '\u2713';
            clr.innerHTML=s + " Submitted. Thanks";

            //store other data
            submitData(downloadURL);
        })

    });
}

//save all the data and the url of the picture

function submitData(p){
    var myDB = firebase.firestore();
    myDB.collection("CRIMES").add({
        VEHICLE: carN,
        LOCATION: crimeloc,
        OFFENSE: detail,
        DRIVER: drvName,
        DRIVER_ID: drvLic,
        OFFENSE_DATE: dt,
        EVIDENCE: p,
        STATUS: "Awaiting Penalty"
    }).then(function(){
        alert("Save successfully!");
        //clear the screen content
        clearCrime();
    });
}

function clearCrime(){
    //clear the screen content
    carNumber.value ="";
    crimeLocation.value="";
    crime.value="";
    driverName.value="";
    driverLic.value="";
    pic.src="photo.png";
    clr.innerHTML = "Uploading...";
    clr.style.display ="none";
}
