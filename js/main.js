let lolidata = [];
let brawl = [];
let brawlOrdered = [];

fetch("data/lolidata.json")
.then(response => response.json())
.then(lolidatax => {
lolidata = lolidatax;
let sel = document.getElementById('select-loli');
for(let i = 1; i < lolidata.length; i++) {
    let opt = document.createElement('option');
    opt.innerHTML = lolidata[i]['name'] + " (" + lolidata[i]['display-name'] + ")";
    opt.value = "loli" + i;
    sel.appendChild(opt);
}
});

fetch("data/ML_Heroes_Brawl.json")
.then(response => response.json())
.then(brawlx => {
brawl = brawlx;
let sel1 = document.getElementById('select-hero-1');
let sel2 = document.getElementById('select-hero-2');
for(let i = 0; i < brawl.length; i++) {
	brawlOrdered = [... brawl].sort();
    let opt1 = document.createElement('option');
	let opt2 = document.createElement('option');
    opt1.innerHTML = brawlOrdered[i];
	opt2.innerHTML = brawlOrdered[i];
    opt1.value = "hero1-" + i;
	opt2.value = "hero2-" + i;
    sel1.appendChild(opt1);
	sel2.appendChild(opt2);
}
});

function DisplayLoli() {
	let lolix = document.getElementById('select-loli');
	if (lolix.value==='loli0') {document.getElementById('loli-result').innerHTML = ``;return;}
	let esposa = lolidata[(lolix.value).substr(4)]['esposa']=="Ninguém" ? "Ninguém":lolidata[(lolix.value).substr(4)]['esposa']=='???' ? '???':
	lolidata[lolidata[(lolix.value).substr(4)]['esposa']]['name'] + ' (' + lolidata[lolidata[(lolix.value).substr(4)]['esposa']]['display-name'] + ')';
	let podertotal = lolidata[(lolix.value).substr(4)]['patk'] + lolidata[(lolix.value).substr(4)]['matk'] + lolidata[(lolix.value).substr(4)]['spd'];
	document.getElementById('loli-result').innerHTML = `
		<div>
		<p>Parceiro: ${lolidata[(lolix.value).substr(4)]['display-name']}</p>
		<p>Nome: ${lolidata[(lolix.value).substr(4)]['name']}</p>
		<p>Espécie: ${lolidata[(lolix.value).substr(4)]['espécie']}</p>
		<p>Temperamento: ${lolidata[(lolix.value).substr(4)]['temperamento']}</p>
		<p>Cabelo: ${lolidata[(lolix.value).substr(4)]['corDoCabelo']}</p>
		<p>Olho: ${lolidata[(lolix.value).substr(4)]['corDoOlho']}</p>
		<p>Classe: ${lolidata[(lolix.value).substr(4)]['classe']}</p>
		<p>Ataque Físico: ${lolidata[(lolix.value).substr(4)]['patk']}</p>
		<p>Ataque Mágico: ${lolidata[(lolix.value).substr(4)]['matk']}</p>
		<p>Velocidade: ${lolidata[(lolix.value).substr(4)]['spd']}</p>
		<p>Poder total: ${podertotal}</p>
		<p>Pet: ${lolidata[(lolix.value).substr(4)]['pet']}</p>
		<p>Esposa: ${esposa}</p>
		</div>
	`;
}

function DisplayHero() {
	let hero1 = document.getElementById('select-hero-1');
	let hero2 = document.getElementById('select-hero-2');
	if (hero1.value==='hero1-none' || hero2.value==='hero2-none') {document.getElementById('hero-result').innerHTML = ``;return;}
	hero1 = brawl.indexOf(brawlOrdered[(hero1.value).substr(6)]);
	hero2 = brawl.indexOf(brawlOrdered[(hero2.value).substr(6)]);
	if (hero1 < hero2) {
		document.getElementById('hero-result').innerHTML = `<div><p>${brawl[hero1]}</p></div>`
	}
	else {
		document.getElementById('hero-result').innerHTML = `<div><p>${brawl[hero2]}</p></div>`
	}
}
