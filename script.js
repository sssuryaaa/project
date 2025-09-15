fetch('data.json')
      .then(response => response.json())
      .then(data => {
        let CSPMele = document.getElementById("CSPMcards");
        let CWPPele = document.getElementById("CWPPcards");
        for(let i=0; i<data.length; i++){
            if(data[i].category == "CSPM Executive Dashboard"){
                CSPMele.innerHTML= `
                    <div id="${data[i].name}" class="card"> 
                        <div class="cardheading">
                            ${data[i].name}
                        </div>
                        <div class="cardxmark">
                            <i  class="fa-solid fa-xmark" onclick="closecard('${data[i].name}')"></i>
                        </div>
                    </div>
                ` + CSPMele.innerHTML;
            }
            else{
                CWPPele.innerHTML= `
                    <div id="${data[i].name}" class="card"> 
                        <div class="cardheading">
                            ${data[i].name}
                        </div>
                        <div class="cardxmark">
                            <i  class="fa-solid fa-xmark" onclick="closecard('${data[i].name}')"></i>
                        </div>
                    </div>
                ` + CWPPele.innerHTML;
            }
        }
      });

function unhide(evt){
    let ele = document.getElementById("hiddenform");
    ele.style.right = '0px';
}

function hide(){
    let ele = document.getElementById("hiddenform");
    ele.style.right = '-500px';
}

function fun(evt, id){
    let contents = document.getElementsByClassName('tabcontent');
    for(let i=0; i<contents.length; i++){
        contents[i].style.display = 'none';
    }
    document.getElementById(id).style.display = 'block';
    let tabs = document.getElementsByClassName("tab");
    for(let i=0; i<tabs.length; i++){
        if(tabs[i].classList.contains("active")){
            tabs[i].classList.remove("active");
        }
    }
    evt.currentTarget.classList += ' active';
}

function pop(event){
    let popele = document.getElementById("popup");
    popele.style.left = '500px';
    popele.classList = event.currentTarget.parentElement.id;
}

function popout(){
    let popele = document.getElementById("popup");
    popele.style.left = '-500px';
}

let CSPMcount = 2;
let CWPPcount = 2;

document.getElementById('popupform').addEventListener('submit', (e) => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let desc = document.getElementById('desc').value;
    if(title != ""){
        if(e.currentTarget.parentElement.classList.contains('CSPMcards')){
            let element = document.getElementById('CSPMcards');
            element.innerHTML = `
                        <div id="${title}" class="card"> 
                            <div class="cardheading">
                            ${title}
                            </div>
                            <div class="cardxmark">
                                <i  class="fa-solid fa-xmark" onclick="closecard('${title}')"></i>
                            </div>
                        </div>
                    ` + element.innerHTML;
            let CSPMcont = document.getElementById('CSPMcont');
            CSPMcont.innerHTML += `<br>
                <input type="checkbox" id="option${++CSPMcount}" name="option${CSPMcount}" value=${title} class=${title} checked>
                <label for=option${CSPMcount}>${title}</label>`;

        }
        else{
            let element = document.getElementById('CWPPcards');
            element.innerHTML = `
                        <div id="${title}" class="card"> 
                            <div class="cardheading">
                            ${title}
                            </div>
                            <div class="cardxmark">
                                <i  class="fa-solid fa-xmark" onclick="closecard('${title}')"></i>
                            </div>
                        </div>
                    ` + element.innerHTML;
            let CSPMcont = document.getElementById('CWPPcont');
            CSPMcont.innerHTML += `<br>
                <input type="checkbox" id="ption${++CWPPcount}" name="ption${CWPPcount}" value=${title} class=${title} checked>
                <label for=ption${CWPPcount}>${title}</label>`;
        }
        popout();
    }
    else{
        alert('Empty title not allowed');
    }
});

function closecard(iid){
    let ele = document.getElementById(iid);
    ele.style.display = 'none';
    if(iid.includes(" ")){
        let chunks = iid.split(" ");
        let str = "";
        for(let i=0; i<chunks.length; i++){
            if(Number.isInteger(Number(chunks[i]))){
                continue;
            }
            else{
                str+= '.'+chunks[i];
            }
        }
        let checker = document.querySelector(`#hiddenform ${str}`);
        checker.checked = false;
    }
    else{
        let checker = document.querySelector(`#hiddenform .${iid}`);
        checker.checked = false;
    }
}

let topsearch = document.getElementById('topsearch');
topsearch.addEventListener('keyup', (e) => {
    let value = e.currentTarget.value.toLowerCase();
    let items = document.getElementsByClassName('card');
    for(let i = 0 ; i<items.length; i++){
        if (items[i].textContent.toLowerCase().includes(value)) {
            items[i].style.display = "flex"; 
        } else {
            items[i].style.display = "none";      
        }
    }
    let specialCards = document.getElementsByClassName("specialcard");
    for(let i=0; i<specialCards.length; i++){
        specialCards[i].style.display = 'flex';
    }
});

function rendercards(evt){
    let inputs = document.querySelectorAll('#hiddenform input');
    for(let i=0; i<inputs.length; i++){
        let label = document.querySelector(`label[for="${inputs[i].id}"]`);
        let card = document.getElementById(label.textContent.trim());
        if(inputs[i].checked == true){
            card.style.display = 'flex';
        }
        else{
            card.style.display = 'none';
        }
    }
    hide();
}