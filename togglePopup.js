window.onload=main;

let jatekos=null;
let winningStreak=sessionStorage['winningStreak'] ? sessionStorage['winningStreak'] : 0; //betöltjük a streak értékét ha van, ha nincs akkor kiírjuk hogy 0
let ellenfel=null;
let winningText;
let popupMessage;
let nicknameField;
let kuldes;
let nickname=null;
let scores = sessionStorage['scores'] ? JSON.parse(sessionStorage['scores']) : []; //betöltjük a score-t ha van. az eddigi összes scoret tárolja ami a leaderboardban van


function main(){
	nicknameField=document.getElementById("nickname"); //hivatkozás a nickname idjú elementre, ez az input field
	nicknameField.value = sessionStorage['nickname']?sessionStorage['nickname']:""; //megnézzük, hogy a játékos adott-e meg már nevet, ha igen, megjelenítjük hogy lássa milyen néven játszik --> az input fieldben
	kuldes=document.getElementById("kuldes").onclick=()=>{nickname=nicknameField.value; sessionStorage['nickname'] = nickname}; //küldés gomb, elmentjük a nicknameet, felülírjuk az előzőt a változón belül
	winningText=document.getElementById("streak"); //hivatkozás a streak nevű elementre
	winningText.innerHTML=`WINNING STREAK: ${winningStreak}`; //megjelenítjük a streak aktuális értékét
	document.getElementById("ko-button").onclick=()=>{setKo();togglePopup()} //hivatkozások a gombokra innentől, itt triggereődik az adott függvény mindegyikhez mikor a játékos rányom az adott gombra
	document.getElementById("papir-button").onclick=()=>{setPapir();togglePopup()}
	document.getElementById("ollo-button").onclick=()=>{setOllo();togglePopup()}
	popupMessage=document.getElementById("message"); //hivatkozás a popup elementre
}



function setKo(){
	jatekos="ko";
	ellenfelLepes();
	let eredmeny=nyer(jatekos, ellenfel); //megnézzük ki nyer
	sessionStorage['winningStreak'] = winningStreak; //frissítjük a winningstreaket
	

}
function setPapir(){
	jatekos="papir";
	ellenfelLepes();
	let eredmeny=nyer(jatekos, ellenfel);
	sessionStorage['winningStreak'] = winningStreak;
}
function setOllo(){
	jatekos="ollo";
	ellenfelLepes();
	let eredmeny=nyer(jatekos, ellenfel);
	sessionStorage['winningStreak'] = winningStreak;
}

function ellenfelLepes(){
	if(winningStreak>=3){
		console.log("Nehezebb ellenfél");
		let randomNumber=Math.floor(Math.random()*2);
		if(jatekos==="ko"){
			switch(randomNumber){
			case 0: ellenfel="Papír";break;
			case 1: ellenfel="Olló";break;
			default: ellenfel=-1; //vmi baj van, ha erre ráfut bug van vhol
		}
		}
		if(jatekos==="papir"){
			switch(randomNumber){
			case 0: ellenfel="Kő";break;
			case 1: ellenfel="Olló";break;
			default: ellenfel=-1;
		}
		}
		if(jatekos==="ollo"){
			switch(randomNumber){
			case 0: ellenfel="Kő";break;
			case 1: ellenfel="Papír";break;
			default: ellenfel=-1;
		}
		}
	}
	else{
		let randomNumber=Math.floor(Math.random()*3); //a nem nehezebb ellenfél eset
		switch(randomNumber){
			case 0: ellenfel="Kő";break;
			case 1: ellenfel="Papír";break;
			case 2: ellenfel="Olló";break;
			default: ellenfel=-1;
		}
	}
}

function nyer(player,enemy){
	if(player==="ko"&&enemy==="Kő"){
		popupMessage.innerHTML=`Ellenfél lépése: ${enemy}. Döntetlen.`
		return "dontetlen";
	}
	if(player==="ko"&&enemy==="Olló"){
		winningStreak++;
		winningText.innerHTML=`WINNING STREAK: ${winningStreak}`;
		popupMessage.innerHTML=`Ellenfél lépése: ${enemy}. Gratulálunk, nyertél!`
		return "nyertel";
	}
	if(player==="papir"&&enemy==="Kő"){
		winningStreak++;
		winningText.innerHTML=`WINNING STREAK: ${winningStreak}`;
		popupMessage.innerHTML=`Ellenfél lépése: ${enemy}. Gratulálunk, nyertél!`
		return "nyertel";
	}
	if(player==="papir"&&enemy==="Papír"){
		popupMessage.innerHTML=`Ellenfél lépése: ${enemy}. Döntetlen.`
		return "dontetlen";
	}
	if(player==="ollo"&&enemy==="Papír"){
		winningStreak++;
		winningText.innerHTML=`WINNING STREAK: ${winningStreak}`;
		popupMessage.innerHTML=`Ellenfél lépése: ${enemy}. Gratulálunk, nyertél!`
		return "nyertel";
	}
	if(player==="ollo"&&enemy==="Olló"){
		popupMessage.innerHTML=`Ellenfél lépése: ${enemy}. Döntetlen.`
		return "dontetlen";
	}
	
	//innentől minden csak akkor fut le ha vesztettünk
	if(winningStreak>0 && sessionStorage['nickname']){ //ha van elmentve nickname, és a winning streak nagyobb mint 0, akkor
		scores.push({name:sessionStorage['nickname'],score:winningStreak}); //akkor elmentjük az adott nickname-hez a jelen winningstreaket
		sessionStorage['scores'] = JSON.stringify(scores); //olyan formátummá alakítjuk, amit a sessionstorage vár
	}
	
	winningStreak=0;//itt reseteljük a winningstreaket mert meghaltunk.
	winningText.innerHTML=`WINNING STREAK: ${winningStreak}`; //frissítjük a szövegeket a kijelzőn
	popupMessage.innerHTML=`Ellenfél lépése: ${enemy}. Sajnos vesztettél.`
	return "vesztettel";
}

function togglePopup() { //a függvény ami a popupot jeleníti meg
    document.getElementById("popup-1").classList.toggle("active");
}