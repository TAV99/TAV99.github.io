const ID = document.getElementById('ID');
const Name = document.getElementById('Name');
const Singer = document.getElementById('Singer');
const Song = document.getElementById('Song');

const Image = document.getElementById('Image');
const btnSave = document.getElementById('btnSave');
const btnClose = document.getElementById('btnClose');
const btnEdit = document.getElementById('btnEdit');
const btnDel = document.getElementById('btnDel');

var DocId = null;
var imgURL;

// var input = document.getElementById("btnDel");
// var inputVal = "";
// if (input) {
//     inputVal = input.value;


const database = firebase.firestore();
var storage = firebase.storage();

const AlbumCollection = database.collection('Album');

function onclickDelete(Id) {
    console.log('this is the Id:',Id);
    db.collection("Album").doc(Id).delete().then(function() {
        console.log("Document successfully deleted!");
        location.reload();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Day du lieu len madal edit
function onclickEdit(docId, Id, Name, Singer,Song) {
    console.log('this is the docId:',docId);
    console.log('this is the Id:',Id);
    console.log('this is the Name:',Name);
    console.log('this is the Singer:',Singer);
    document.getElementById('IDEdit').value = Id;
    document.getElementById('NameEdit').value = Name;
    document.getElementById('SingerEdit').value = Singer;   
    document.getElementById('SongEdit').value = Song;
    console.log(docId);
    DocId = docId;
    

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
//Nhan nut update
btnSaveEdit.addEventListener('click', e => {
    e.preventDefault();
    //Gia tri khi nhap lai
    const strID = document.getElementById('IDEdit').value;
    const strName = document.getElementById('NameEdit').value;
    const strSinger = document.getElementById('SingerEdit').value;
    const strSong = document.getElementById('SongEdit').value;

    console.log('this is the strID:',strID);
    console.log('this is the strName:',strName);

    //update
    AlbumCollection.doc(DocId).update({
        "ID": strID,
        "Name": strName,
        "Singer": strSinger,
        "Song": strSong
    }).then(function() {
        alert('Edit thanh cong!');
        console.log("ThanhCong!");
        location.reload();
    })

    //location.reload();
});

btnSave.addEventListener('click', e => {
    e.preventDefault();
    const alb = AlbumCollection.doc(ID.value);
    var strSong = Song.value;
    var arrSong = strSong.split(" ");
    alb.set({
            ID: ID.value,
            Name: Name.value,
            Singer: Singer.value,
            Song: arrSong,
            Image: imgURL
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












