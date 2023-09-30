/*
 * Hier können die Ausgaben getestet werden
 */

// Ausgabe in DOM
const results = document.querySelector("#results");
function write(text) {
    results.innerHTML += text + "<br>";
}

// Teams
const teamA = new Team('A', ['Hans', 'Martina', 'Peter']);
const teamB = new Team('',[]);
teamB.teamnameSetter = 'B';

// Hockeytournier generieren
const hockeytournier = new Hockeytournier([teamA.teamnameGetter, teamB.teamnameGetter,'C','D', 'E']);

write(hockeytournier.TeamsGetter);
write(hockeytournier.getHockeytournierUnsortiert());
write(hockeytournier.getHockeytournier());
write(hockeytournier.findPlace(['D:E','A:B','C:D','A:E','B:C','A:D','B:E','A:C','B:D'], ['C:E']));
