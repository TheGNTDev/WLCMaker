const wlcScheme = document.querySelector(".wlcScheme");
const images = Array.from(document.querySelectorAll(".wlcScheme .scheme-box .new-image-container img"));

// Div set to convert into canvas image with resolution 1350x1350
let wlcChungus = wlcScheme.cloneNode(true);
wlcChungus.classList = "wlcChungus";
document.body.appendChild(wlcChungus);
document.querySelector(".wlcChungus .scheme-box").innerHTML += "<div class='wlc-watermark'><img src='./assets/watermark.png'></div>";

const fileImports =  Array.from(document.querySelectorAll(".file-import"));
const importButtons = Array.from(document.querySelectorAll(".wlcScheme .scheme-box button"));
const downloadButton = document.querySelector(".generate #download");
const updateButton = document.querySelector(".generate #updatePreview");




const readURL = (input,index) => {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = (e) => {
            images[index].setAttribute("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}


const setPreview = () => {

    if(wlcChungus) wlcChungus.remove();

        let oldCanvas = document.querySelector("canvas");

        if(oldCanvas) oldCanvas.remove();

        htmlToCanvas(wlcScheme);
        
        //Set new div for converting into downloadable image
        wlcChungus = wlcScheme.cloneNode(true);
        wlcChungus.classList = "wlcChungus";
        document.body.appendChild(wlcChungus);
        document.querySelector(".wlcChungus .scheme-box").innerHTML += "<div class='wlc-watermark'><img src='./assets/watermark.png'></div>";

}

// Converts html element into canvas image
const htmlToCanvas = (elem)=> {
    
    //Turn on file import buttons in scheme till preview canvas displays
    document.querySelectorAll(".wlcScheme .scheme-box").forEach(element => {
        element.querySelector("button").style = "display: none";
    });

    html2canvas(elem).then(canvas => {
    canvas.classList = "canvas";
    document.querySelector(".preview-container").appendChild(canvas);

    
    //Turn off file import buttons in scheme after preview canvas displays
    document.querySelectorAll(".wlcScheme .scheme-box").forEach(element => {
    element.querySelector("button").style = "display: block";
    });

});
}

importButtons.forEach((element,index) =>{
    //Sets image that will cover the background of section and will reconfigure divs for downloadable contnet
    element.addEventListener("click",()=>{
        
        const selectedImport = fileImports[index];

        selectedImport.click();
        selectedImport.addEventListener("change",(evt)=>{
            readURL(evt.target,index);
        })

    });

})


// Hidden template copied from original set to convert into downloadable image
document.querySelectorAll(".wlcChungus .scheme-box").forEach(element => {
    element.querySelector("button").style = "display: none";
});

htmlToCanvas(wlcScheme);


downloadButton.addEventListener("click",()=>{

    setPreview();

    html2canvas(wlcChungus).then(canvas => {
        
        let anchor = document.createElement("a");
        anchor.href = canvas.toDataURL("image/png");
        anchor.download = "IMAGE.PNG";
        anchor.click(); 

    });

})

updateButton.addEventListener("click",()=>{
    
    setPreview();

})

