let span = document.getElementsByClassName("close")[0];

let btnEingabeEinnahme = document.getElementById("einnahmeBestätigung");
let btnEingabeAusgabe = document.getElementById("ausgabeBestätigung");

let btnEingabePlan = document.getElementById("planBestätigung");
let pläneerstellen = document.getElementById("pläneerstellen");

let plänebearbeiten = document.getElementById("planEditBestätigung")

let carouselAnzahl = 0;
let objectPlan = {};
let einnahmeArray = [];
let ausgabeArray = [];

let checkedCheckbox = -1;

let begrußung = document.getElementById("begrußung");
let div = document.createElement("div");
let text = ` Guten Tag, User`;
div.appendChild(document.createTextNode(text));
begrußung.appendChild(div);

btnEingabeEinnahme.onclick = function (event) {
    let einnahmeGrund = document.getElementById("einnahmeGrund").value;
    let einnahmeMenge = document.getElementById("einnahmeMenge").value;

    if (einnahmeMenge && einnahmeGrund != "") {
        einnahmeArray.push(einnahmeMenge);

        let einnahmeGrundListe = document.getElementById("einnahmeGrundListe");
        let einnahmeMengeListe = document.getElementById("einnahmeMengeListe");
        let einnahmeDatumListe = document.getElementById("einnahmeDatumListe");

        let li = document.createElement("li");
        li.appendChild(document.createTextNode(einnahmeGrund));
        einnahmeGrundListe.appendChild(li);

        li = document.createElement("li");
        li.appendChild(document.createTextNode(`${einnahmeMenge}€`));
        einnahmeMengeListe.appendChild(li);


        let heute = new Date().toLocaleDateString();
        li = document.createElement("li");
        li.appendChild(document.createTextNode(heute));
        einnahmeDatumListe.appendChild(li);

        gesamtBerechnen();

        document.getElementById("einnahmeGrund").value = "";
        document.getElementById("einnahmeMenge").value = "";
    }
}
btnEingabeAusgabe.onclick = function (event) {
    let ausgabeGrund = document.getElementById("ausgabeGrund").value;
    let ausgabeMenge = document.getElementById("ausgabeMenge").value;
    let checkboxNumber = 0;

    if (ausgabeMenge != "") {
        for (let checkbox of document.querySelectorAll(".checkbox")) {
            if (document.getElementById(`checkbox${checkboxNumber}`).checked == true) {
                checkedCheckbox = checkboxNumber;
            }
            checkboxNumber++;
        }
    }
    if (checkedCheckbox > -1) {
        document.getElementById(`checkbox${checkedCheckbox}`).checked = false
        ausgabeFunction(`Plan${checkedCheckbox + 1}`, ausgabeMenge);
    } else {
        if (ausgabeMenge && ausgabeGrund != "") {
            ausgabeFunction(ausgabeGrund, ausgabeMenge);
        }
    }
}

function ausgabeFunction(ausgabeGrund, ausgabeMenge) {
    if (checkedCheckbox > -1) {
        let planid = document.getElementById(`plan${checkedCheckbox}`)
        planChange(objectPlan[checkedCheckbox].planNummer, planid, objectPlan[checkedCheckbox].planGrund, objectPlan[checkedCheckbox].planDauer, objectPlan[checkedCheckbox].planMenge - ausgabeMenge);
        objectPlan[checkedCheckbox].planMenge -= ausgabeMenge;
    }
    checkedCheckbox = -1
    ausgabeArray.push(ausgabeMenge);

    let ausgabeGrundListe = document.getElementById("ausgabeGrundListe");
    let ausgabeMengeListe = document.getElementById("ausgabeMengeListe");
    let ausgabeDatumListe = document.getElementById("ausgabeDatumListe");

    let li = document.createElement("li");
    li.appendChild(document.createTextNode(ausgabeGrund));
    ausgabeGrundListe.appendChild(li);

    li = document.createElement("li");
    li.appendChild(document.createTextNode(`${ausgabeMenge}€`));
    ausgabeMengeListe.appendChild(li);

    let heute = new Date().toLocaleDateString();
    li = document.createElement("li");
    li.appendChild(document.createTextNode(heute));
    ausgabeDatumListe.appendChild(li);

    gesamtBerechnen();

    document.getElementById("ausgabeGrund").value = "";
    document.getElementById("ausgabeMenge").value = "";

}

btnEingabePlan.onclick = function (event) {
    let planCarousel = document.getElementById("planCarousel");
    let carouselItemFirst = document.getElementById("carouselItemFirst")

    let planGrund = document.getElementById("planGrund").value;
    let planMenge = document.getElementById("planMenge").value;
    let planDauer = document.getElementById("planDauer").value;
    if (planGrund && planMenge && planDauer != "") {
        if (carouselAnzahl == 0) {
            document.getElementById("planBearbeitenKnopf").classList.remove("d-none")
            objectPlan[carouselAnzahl] = {
                planGrund: planGrund,
                planMenge: planMenge,
                planDauer: planDauer,
                planNummer: carouselAnzahl
            }
            let plan = [planGrund, planMenge, planDauer];
            for (let i = 0; i < 3; i++) {

                carouselItemFirst.removeChild(carouselItemFirst.firstChild);
            }
            carouselItemFirst.appendChild(document.createTextNode(`Plan ${carouselAnzahl + 1}`));
            for (let i = 0; i < 3; i++) {
                let br = document.createElement("br");
                carouselItemFirst.appendChild(br)
                switch (i) {
                    case 0: carouselItemFirst.appendChild(document.createTextNode(`Du sparst für: ${plan[i]}`)); break
                    case 1: carouselItemFirst.appendChild(document.createTextNode(`Dir fehlen: ${plan[i]} €`)); break
                    case 2: carouselItemFirst.appendChild(document.createTextNode(`Du sparst: ${plan[i]} Tage`)); break
                }
            }
            for (let carouselItem of document.querySelectorAll(".carousel-item")) {
                carouselItem.classList.remove("carousel-item", "active")
            }
            carouselItemFirst.classList.add("carousel-item", "active");
            let br = document.createElement("br");
            carouselItemFirst.appendChild(br)
            carouselItemFirst.appendChild(document.createTextNode(`Empfehlung: ${Math.round((plan[1] / plan[2]) * 100) / 100}€ pro Tag`));
            carouselItemFirst.id = `plan${carouselAnzahl}`;
            document.getElementById("planGrund").value = "";
            document.getElementById("planMenge").value = "";
            document.getElementById("planDauer").value = "";
            checkboxErstellen(planGrund, carouselAnzahl);
            carouselAnzahl++;
        } else {

            objectPlan[carouselAnzahl] = {
                planGrund: planGrund,
                planMenge: planMenge,
                planDauer: planDauer,
                planNummer: carouselAnzahl
            }
            let plan = [planGrund, planMenge, planDauer];
            let div = document.createElement("div");
            div.appendChild(document.createTextNode(`Plan ${carouselAnzahl + 1}`));
            for (let i = 0; i < 3; i++) {
                let br = document.createElement("br");
                div.appendChild(br)
                switch (i) {
                    case 0: div.appendChild(document.createTextNode(`Du sparst für: ${plan[i]}`)); break
                    case 1: div.appendChild(document.createTextNode(`Dir fehlen: ${plan[i]} €`)); break
                    case 2: div.appendChild(document.createTextNode(`Du sparst: ${plan[i]} Tage`)); break
                }
            }
            for (let carouselItem of document.querySelectorAll(".carousel-item")) {
                carouselItem.classList.remove("active")
            }
            let br = document.createElement("br");
            div.appendChild(br)
            div.appendChild(document.createTextNode(`Empfehlung: ${Math.round((plan[1] / plan[2]) * 100) / 100}€ pro Tag`));
            div.classList.add("carousel-item", "active");
            div.id = `plan${carouselAnzahl}`;
            document.getElementById("plan0").parentNode.appendChild(div);
            document.getElementById("planGrund").value = "";
            document.getElementById("planMenge").value = "";
            document.getElementById("planDauer").value = "";
            checkboxErstellen(planGrund, carouselAnzahl);
            carouselAnzahl++;
        }
    }
}
function checkboxErstellen(planGrund, planNummer) {
    ul = document.getElementById("ausgabePlan");
    let li = document.createElement("li");
    let checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "check");
    checkbox.setAttribute("onclick", "onlyOne(this)");
    checkbox.classList.add("checkbox");
    checkbox.id = `checkbox${planNummer}`
    let label = document.createElement("Label");
    label.innerHTML = `Sparen für: ${planGrund}`
    label.setAttribute("for", `checkbox${planNummer}`);
    label.setAttribute("style", "margin-left:5px")
    li.appendChild(checkbox);
    li.appendChild(label)
    ul.appendChild(li);
}
function gesamtBerechnen() {
    let gesamt = 0;
    for (let i = 0; i < einnahmeArray.length; i++) {
        gesamt += parseInt(einnahmeArray[i]);
    }
    for (let i = 0; i < ausgabeArray.length; i++) {
        gesamt -= parseInt(ausgabeArray[i]);
    }
    let gesamtText = document.getElementById("gesamt");
    gesamtText.removeChild(gesamtText.firstChild);
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(`${gesamt}€`));
    if (gesamt > 0) {
        gesamtText.setAttribute("style", "color:green")
    }
    if (gesamt < 0) {
        gesamtText.setAttribute("style", "color:red")
    }
    if (gesamt == 0) {
        gesamtText.setAttribute("style", "color:#212529")
    }
    gesamtText.appendChild(div);
    return gesamt;
}
plänebearbeiten.onclick = function (event) {
    let planNummer = document.getElementById("planEditNummer").value
    let planGrund = document.getElementById("planEditGrund").value
    let planDauer = document.getElementById("planEditDauer").value
    let planMenge = document.getElementById("planEditMenge").value

    if (planNummer && planGrund != "") {
        if (planDauer && planMenge != "") {
            planNummer--
            let planid = document.getElementById(`plan${planNummer}`)
            document.getElementById("planEditGrund").value = ""
            document.getElementById("planEditDauer").value = ""
            document.getElementById("planEditMenge").value = ""
            document.getElementById("planEditNummer").value = ""

            planChange(planNummer, planid, planGrund, planDauer, planMenge)
        }
    }

}
function planChange(planNummer, planid, planGrund, planDauer, planMenge) {
    let plan = [planGrund, planMenge, planDauer];
    for (let i = 0; i < 9; i++) {
        planid.removeChild(planid.firstChild);
    }
    planid.appendChild(document.createTextNode(`Plan ${objectPlan[planNummer].planNummer + 1}`));
    for (let i = 0; i < 3; i++) {
        let br = document.createElement("br");
        planid.appendChild(br)
        switch (i) {
            case 0: planid.appendChild(document.createTextNode(`Du sparst für: ${plan[i]}`)); break
            case 1: planid.appendChild(document.createTextNode(`Dir fehlen: ${plan[i]} €`)); break
            case 2: planid.appendChild(document.createTextNode(`Du sparst: ${plan[i]} Tage`)); break

        }
    }
    let br = document.createElement("br");
    planid.appendChild(br)
    planid.appendChild(document.createTextNode(`Empfehlung: ${Math.round((plan[1] / plan[2]) * 100) / 100}€ pro Tag`));
}
function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}
function planLöschen(planid) {
    planid.parentNode.removeChild(planid);
}