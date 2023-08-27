/**
Der COde ist noch nicht ganz richtig, er beachtet nur wie oft ein spieler
bereits gespielt hat, nicht wann zuletzt.
*/

const results = document.querySelector("#results"); // Get the button from the page

function write(text) {
  results.innerHTML += text + "<br>";
}

const players = ["A", "B", "C", "D", "E", "F"];

let partien = [];

// spiele definieren
players.forEach((player1) => {
  players.forEach((player2) => {
    if (player1 === player2) {
      return;
    }
    if (partien.includes(player2 + ":" + player1)) {
      return;
    }
    partien.push(player1 + ":" + player2);
  });
});

write(partien.join("<br>"));

// sortieren
const sortiertePartien = [];

const gespielteSpiele = {};
players.forEach((player) => {
  gespielteSpiele[player] = 0;
});



for (let i = 0, ii = partien.length; i < ii; i += 1) {
  write("Runde " + i);
  
  const naechstesSpiel = partien.shift();
  
  sortiertePartien.push(naechstesSpiel);
  
  gespielteSpiele[naechstesSpiel[0]] += i+1;
  gespielteSpiele[naechstesSpiel[2]] += i+1;
  
  write(JSON.stringify(gespielteSpiele));
  write(sortiertePartien.join("<br>"));

  // finde nächsten Parti
  partien = partien.sort((a, b) => {
    const wert1 = gespielteSpiele[a[0]] + gespielteSpiele[a[2]];
    const wert2 = gespielteSpiele[b[0]] + gespielteSpiele[b[2]];

    return wert1 - wert2;
  });

  write("Übrige Spiele:");
  write(partien.join("<br>"));
  
}
write("Finale Reihenfolge");
write(sortiertePartien.join("<br>"));