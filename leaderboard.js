window.onload=main; //mikor betöltött a weboldal, meghívjuk a maint

let scores = sessionStorage['scores'] ? JSON.parse(sessionStorage['scores']) : []; //betöltjük a mentett score-t. megnézzük hogy van-e eltárolva score, ha van, akkor betöltjük, ha nincs, akkor nem
let leaderboard;

function main(){
	winningText=document.getElementById("streak"); //a streak id-jú elementre való hivatkozás
	leaderboard = document.getElementById('leaderboard'); //a leaderboard idjú elemre való hivatkozás
	winningText.innerHTML=`WINNING STREAK: ${sessionStorage['winningStreak']}`; //megjelenítjük a winningstreak aktuális értékét, mert oldalváltásnál resetelődik
	printScores(); //a függvény feltölti a leaderboard táblázatot
}

function printScores(){
	//végigiterálunk a scores tömbön
	scores.map((score) =>{ //a táblázathoz hozzáadunk egy új sort
		var row = leaderboard.insertRow(1); 
		
		var nameTd = row.insertCell(0); //a sorhoz hozzáadunk egy új cellát --> bal oldali cella
		nameTd.innerHTML = score.name === ""? "-" : score.name; //megnézzük a scorenak van-e neve, ha van akkor a nevet írjuk a cellába, ha nincs akkor kötőjelet
		
		var scoreTd = row.insertCell(1); //létrehozzuk a jobb oldali cellát
		scoreTd.innerHTML = score.score; //a cella értékének adjuk a scoret
	})
}

