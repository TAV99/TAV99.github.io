const ID = document.getElementById('ID');
const Name = document.getElementById('Name');
const Singer = document.getElementById('Singer');
const Type = document.getElementById('Type');
const FileSong = document.getElementById('fileSong');
const FileImage = document.getElementById('fileImage')
const btnAddSong = document.getElementById('btnAddSong');
const btnSave = document.getElementById('btnSave');
const btnClose = document.getElementById('btnClose');
const btnEdit = document.getElementById('btnEdit');
const btnDel = document.getElementById('btnDel');

var DocId = null;
var audioURL;
var imgURL;



//Day du lieu len madal edit
function onclickEdit(docId, Id, Name, Singer,Type) {
    document.getElementById("IDEdit").innerHTML = Id;
    document.getElementById('NameEdit').value = Name;
    document.getElementById('SingerEdit').value = Singer;   
    document.getElementById('TypeEdit').value = Type;
    DocId = docId;

}




const database = firebase.firestore();
const SongsCollection = database.collection('Songs');


var storage = firebase.storage();



function onclickDelete(Id) {
    db.collection("Songs").doc(Id).delete().then(function() {
        console.log("Document successfully deleted!");
        location.reload();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}



// upload audio

FileSong.addEventListener('change', function(e) {

    uploadAudio(e.target.files[0])

});
 async function uploadAudio(file) {
    var filename = await file.name;
    await storage.ref(`TestAudio/${filename}`).put(file);
    return await getlinkaud(filename);
}
    //get link bài hát /////////////////////////////////////////////////
    async function getlinkaud(filename){
        var loadurl;
        var  path = await (`TestAudio/${filename}`)
        var audRef= await storage.ref(path);
            await audRef.getDownloadURL()
            .then(function(url){
                loadurl = url
            })
            console.log(loadurl);
            audioURL = await loadurl;
    }

// upload img
    FileImage.addEventListener('change', function(e) {
        uploadImage(e.target.files[0])
    });
    // upload + trả ra đường dẫn
    async function uploadImage(file) {
        var filename = await file.name;
        await storage.ref(`Testimage/${filename}`).put(file);
        return await getlinkimg(filename);
    
    }
 // lấy đừng dẫn rồi tạo link dowload
 async function getlinkimg(filename){
    var loadurl;
    var  path = await (`Testimage/${filename}`)
    var imgRef= await storage.ref(path);
         await imgRef.getDownloadURL()
         .then(function(url){
             loadurl = url
         })
          console.log(loadurl);
         imgURL = await loadurl;

 }
///===================================================================================
 

btnAddSong.addEventListener('click', e => {
    e.preventDefault();
    const so = SongsCollection.doc(ID.value);
    so.set({ID: ID.value,
            Name: Name.value,
            Singer: Singer.value,
            Link: audioURL,
            Image: imgURL,
            Like: 0,
            Type: Type.value
        })
        .then(function() {
            alert('Document successfully written!');
            console.log("Document successfully written!");
            location.reload();
        })
        .catch(function(error) {
            alert('Error writing document:', error);
            console.error("Error writing document: ", error);
        });
});


btnSaveEdit.addEventListener('click', e => {
    e.preventDefault();
    //Gia tri khi nhap lai
    // const strID = document.getElementById('IDEdit').value;
    const strName = document.getElementById('NameEdit').value;
    const strSinger = document.getElementById('SingerEdit').value;
    const strType = document.getElementById('TypeEdit').value;

    // console.log('this is the strID:',strID);
    console.log('this is the strName:',strName);

    //update
    SongsCollection.doc(DocId).update({
        // "ID": strID,
        "Name": strName,
        "Singer": strSinger,
        "Type": strType
    }).then(function() {
        alert('Edit thanh cong!');
        console.log("ThanhCong!");
        location.reload();
    })

    //location.reload();
});

