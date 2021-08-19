var span = document.getElementsByClassName("close")[0];

var btnEingabeEinnahme = document.getElementById("einnahmeBestätigung");
var btnEingabeAusgabe = document.getElementById("ausgabeBestätigung");

var btnEingabePlan = document.getElementById("planBestätigung");
var pläneerstellen = document.getElementById("pläneerstellen");

var carouselAnzahl = 0;
var objectPlan = {};
var einnahmeArray = [];
var ausgabeArray = [];

var begrußung = document.getElementById("begrußung");
var div = document.createElement("div");
var text = ` Guten Tag, User`;
div.appendChild(document.createTextNode(text));
begrußung.appendChild(div);

btnEingabeEinnahme.onclick = function (event) {
    var eingabeGrund = document.getElementById("einnahmeGrund").value;
    var eingabeMenge = document.getElementById("einnahmeMenge").value;

    einnahmeArray.push(eingabeMenge);

    var einnahmeGrundListe = document.getElementById("einnahmeGrundListe");
    var einnahmeMengeListe = document.getElementById("einnahmeMengeListe");
    var einnahmeDatumListe = document.getElementById("einnahmeDatumListe");

    var li = document.createElement("li");
    li.appendChild(document.createTextNode(eingabeGrund));
    einnahmeGrundListe.appendChild(li);

    var li = document.createElement("li");
    li.appendChild(document.createTextNode(eingabeMenge));
    einnahmeMengeListe.appendChild(li);


    var heute = new Date();
    var einnahmeDatum = `${heute.getDate()} ${heute.getMonth() + 1} ${heute.getFullYear()}`;
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(einnahmeDatum));
    einnahmeDatumListe.appendChild(li);

    gesamtBerechnen();

    document.getElementById("einnahmeGrund").value = "";
    document.getElementById("einnahmeMenge").value = "";
}
btnEingabeAusgabe.onclick = function (event) {
    var ausgabeGrund = document.getElementById("ausgabeGrund").value;
    var ausgabeMenge = document.getElementById("ausgabeMenge").value;

    ausgabeArray.push(ausgabeMenge);

    var ausgabeGrundListe = document.getElementById("ausgabeGrundListe");
    var ausgabeMengeListe = document.getElementById("ausgabeMengeListe");
    var ausgabeDatumListe = document.getElementById("ausgabeDatumListe");

    var li = document.createElement("li");
    li.appendChild(document.createTextNode(ausgabeGrund));
    ausgabeGrundListe.appendChild(li);

    var li = document.createElement("li");
    li.appendChild(document.createTextNode(ausgabeMenge));
    ausgabeMengeListe.appendChild(li);

    var heute = new Date();
    var ausgabeDatum = `${heute.getDate()} ${heute.getMonth() + 1} ${heute.getFullYear()}`;
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(ausgabeDatum));
    ausgabeDatumListe.appendChild(li);

    gesamtBerechnen();

    document.getElementById("ausgabeGrund").value = "";
    document.getElementById("ausgabeMenge").value = "";

}

btnEingabePlan.onclick = function (event) {
    var planCarousel = document.getElementById("planCarousel");
    var carouselItemFirst = document.getElementById("carouselItemFirst")
    if (carouselAnzahl == 0) {
        var planGrund = document.getElementById("planGrund").value;
        var planMenge = document.getElementById("planMenge").value;
        var planDauer = document.getElementById("planDauer").value;
        objectPlan[carouselAnzahl] = {
            planGrund: planGrund,
            planMenge: planMenge,
            planDauer: planDauer
        }
        var plan = [planGrund, planMenge, planDauer];
        var div = document.createElement("div");
        carouselItemFirst.removeChild(carouselItemFirst.firstChild);
        carouselItemFirst.removeChild(carouselItemFirst.firstChild);
        carouselItemFirst.removeChild(carouselItemFirst.firstChild);
        carouselItemFirst.appendChild(document.createTextNode(`Plan ${carouselAnzahl + 1}`));
        for (let i = 0; i < 3; i++) {
            var br = document.createElement("br");
            carouselItemFirst.appendChild(br)
            switch (i) {
                case 0: carouselItemFirst.appendChild(document.createTextNode(`Du sparst für: ${plan[i]}`)); break
                case 1: carouselItemFirst.appendChild(document.createTextNode(`Du sparst: ${plan[i]}€`)); break
                case 2: carouselItemFirst.appendChild(document.createTextNode(`Du sparst: ${plan[i]} Tage`)); break
            }

        }
        carouselItemFirst.id = `plan${carouselAnzahl}`;
        carouselAnzahl++;
        planCarousel.appendChild(div);
        document.getElementById("planGrund").value = "";
        document.getElementById("planMenge").value = "";
        document.getElementById("planDauer").value = "";
    } else {
        var planGrund = document.getElementById("planGrund").value;
        var planMenge = document.getElementById("planMenge").value;
        var planDauer = document.getElementById("planDauer").value;
        objectPlan[carouselAnzahl] = {
            planGrund: planGrund,
            planMenge: planMenge,
            planDauer: planDauer
        }
        var plan = [planGrund, planMenge, planDauer];
        var div = document.createElement("div");
        div.appendChild(document.createTextNode(`Plan ${carouselAnzahl + 1}`));
        for (let i = 0; i < 3; i++) {
            var br = document.createElement("br");
            div.appendChild(br)
            switch (i) {
                case 0: div.appendChild(document.createTextNode(`Du sparst für: ${plan[i]}`)); break
                case 1: div.appendChild(document.createTextNode(`Du sparst: ${plan[i]}€`)); break
                case 2: div.appendChild(document.createTextNode(`Du sparst bis: ${plan[i]} Tage`)); break
            }

        }
        div.classList.add("carousel-item");
        div.id = `plan${carouselAnzahl}`;
        carouselAnzahl++;
        planCarousel.appendChild(div);
        document.getElementById("planGrund").value = "";
        document.getElementById("planMenge").value = "";
        document.getElementById("planDauer").value = "";
    }
}
function gesamtBerechnen() {
    var gesamt = 0;
    for (let i = 0; i < einnahmeArray.length; i++) {
        gesamt += parseInt(einnahmeArray[i]);
    }
    for (let i = 0; i < ausgabeArray.length; i++) {
        gesamt -= parseInt(ausgabeArray[i]);
    }
    var gesamtText = document.getElementById("gesamt");
    gesamtText.removeChild(gesamtText.firstChild);
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(`${gesamt}€`));
    gesamtText.appendChild(div);
    return gesamt;
}

