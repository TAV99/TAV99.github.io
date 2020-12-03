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

// var input = document.getElementById("btnDel");
// var inputVal = "";
// if (input) {
//     inputVal = input.value;


const database = firebase.firestore();

const TypeCollection = database.collection('Type');

function onclickDelete(Id) {
    console.log('this is the Id:',Id);
    db.collection("Type").doc(Id).delete().then(function() {
        console.log("Document successfully deleted!");
        location.reload();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Day du lieu len madal edit
function onclickEdit(docId, Id, Name) {
    console.log('this is the docId:',docId);
    console.log('this is the Id:',Id);
    console.log('this is the Name:',Name);
   
    document.getElementById('IDEdit').value = Id;
    document.getElementById('NameEdit').value = Name;
    console.log(docId);
    DocId = docId;

}

//Nhan nut update
btnSaveEdit.addEventListener('click', e => {
    e.preventDefault();
    //Gia tri khi nhap lai
    const strID = document.getElementById('IDEdit').value;
    const strName = document.getElementById('NameEdit').value;
   

    console.log('this is the strID:',strID);
    console.log('this is the strName:',strName);

    //update
    TypeCollection.doc(DocId).update({
        "ID": strID,
        "Name": strName,
    
    }).then(function() {
        alert('Edit thanh cong!');
        console.log("ThanhCong!");
        location.reload();
    })

    //location.reload();
});

btnSave.addEventListener('click', e => {
    e.preventDefault();
    const alb = TypeCollection.doc(ID.value);
    alb.set({
            ID: ID.value,
            Name: Name.value,
          
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












