var modalEinnahme = document.getElementById("einnahmeModal");
var btnModalEinnahme = document.getElementById("einnahmeHinzufügen");

var modalAusgabe = document.getElementById("ausgabeModal");
var btnModalAusgabe = document.getElementById("ausgabeHinzufügen");

var span = document.getElementsByClassName("close")[0];

var btnEingabeEinnahme = document.getElementById("einnahmeBestätigung");
var btnEingabeAusgabe = document.getElementById("ausgabeBestätigung");



btnModalEinnahme.onclick = function () {
    modalEinnahme.style.display = "block";
}
btnModalAusgabe.onclick = function () {
    modalAusgabe.style.display = "block";
}
span.onclick = function () {
    modalEinnahme.style.display = "none";
    modalAusgabe.style.display = "none"
}

window.onclick = function (event) {
    if (event.target == modalEinnahme) {
        modalEinnahme.style.display = "none";
    }
}
window.onclick = function (event) {
    if (event.target == modalAusgabe) {
        modalAusgabe.style.display = "none";
    }
}
btnEingabeEinnahme.onclick = function (event) {
    var eingabeGrund = document.getElementById("einnahmeGrund").value;
    var eingabeMenge = document.getElementById("einnahmeMenge").value;

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

    modalEinnahme.style.display = "none";
}




btnEingabeAusgabe.onclick = function (event) {
    var ausgabeGrund = document.getElementById("ausgabeGrund").value;
    var ausgabeMenge = document.getElementById("ausgabeMenge").value;

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

    modalAusgabe.style.display = "none";
}