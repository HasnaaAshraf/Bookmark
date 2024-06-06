
var nameInput = document.getElementById("siteName");
// console.log(nameInput);
var urlInput = document.getElementById("siteURL");

// var visitInput = document.getElementById("visit");


var bookMarkerContainer = []

if (localStorage.getItem("bookMarker") == null){
    bookMarkerContainer = []
}
else{
    bookMarkerContainer = JSON.parse(localStorage.getItem("bookMarker"))

    display()
}


function addNameUrl(){

    if (
        nameInput.classList.contains('is-valid')&&
        urlInput.classList.contains('is-valid')
    )
    {

        var bookMarker = {
            siteName: nameInput.value,
            siteUrl: urlInput.value,
        }
    
        bookMarkerContainer.push(bookMarker);
    
        localStorage.setItem("bookMarker", JSON.stringify(bookMarkerContainer))
    
        console.log(bookMarkerContainer);
    
        clearAll();
    
        display();

    }

    else{
        Swal.fire({
            
            html: `
            <div class="colorIcon">
            <i class="fa-solid fa-circle i1"></i>
            <i class="fa-solid fa-circle i2"></i>
            <i class="fa-solid fa-circle i3"></i>
            </div>
            <div class="text">
            <p class="firstP fs-5">Site Name or Url is not valid, Please follow the rules below :</p>
            <p><i class="fa-regular fa-circle-right me-2"></i>Site name must contain at least 3 characters</p>
            <p><i class="fa-regular fa-circle-right me-2"></i>Site URL must be a valid one</p>
            </div>
            `,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: `
            <i class="fa-solid fa-face-smile-beam fs-4 me-2"></i> Thanks For Your Understanding
            `,
            confirmButtonAriaLabel: "Thumbs up, great!",
            cancelButtonText: `
              <i class="fa fa-thumbs-down"></i>
            `,
            cancelButtonAriaLabel: "Thumbs down"
          });
    }
    
}


function clearAll(){
    nameInput.value = null;
    urlInput.value = null;
    siteName.classList.remove('is-valid');
    siteURL.classList.remove('is-valid');
}

function display(){

    cartona = ""

    for (var i = 1 ; i < bookMarkerContainer.length; i++) {

       cartona += `
               <tr>
                   <th scope="row">${i}</th>
                   <td>${bookMarkerContainer[i].siteName}</td>
                   <td> <a href="${bookMarkerContainer[i].siteUrl}" target="_blank" ><button type="button" id="visit" class="btn"><i class="fa-solid fa-eye ms-1"></i> Visit</button></a></td>
                   <td><button onclick="deleteIcon();" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can me-1"></i>Delete</button></td>
                </tr>
       `
    }

    document.getElementById("tBody").innerHTML = cartona ;
}


function deleteIcon(deletedIndex){
    
   bookMarkerContainer.splice(deletedIndex,1)
   console.log(bookMarkerContainer);
   display();
   localStorage.setItem("bookMarker", JSON.stringify(bookMarkerContainer))
   
}

function validateForm(ele) {

    var regex = {

        siteName : /^[a-z]{3,}$/g,
        siteURL : /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/,
    }

    if (regex[ele.id].test(ele.value)) {
        ele.classList.remove('is-invalid');
        ele.classList.add('is-valid');
    }
    else
    {
        ele.classList.add('is-invalid');
        ele.classList.remove('is-valid');
    }
}