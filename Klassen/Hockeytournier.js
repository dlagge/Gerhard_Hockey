/* ---------------------------------------------------------------------------------
 * Erstellung des Hockeytourniers
 * Ziel ist es, eine Spielliste auszugeben. Dabei muss möglichst verhindert
 * werden, dass das gleiche Team mehrmals hintereinander spielen muss.
 * ---------------------------------------------------------------------------------
 */

class Hockeytournier {

  /*
   * Konstruktor
   * this.teams: Liste der Teams, Beispiel: ['A','B','C','D']
   * this.hockeytournierUnsortiert: Liste aller Spiele (unsortiert), Beispiel: ['A:B','A:C','A:D','B:C','B:D','C:D']
   * this.zwischenspeicher: Zwischenspeicher für die Erstellung der finalen Hockeytournierliste.
   * this.hockeytournier: Finale Hockeytournierliste, welche sortiert ist, Beispiel: ['D:E','A:B','C:D','A:E','B:C','A:D','B:E','A:C','B:D','C:E']
   */
  constructor(teams) {
    this.teams = teams;
    this.hockeytournierUnsortiert = [];
    this.zwischenspeicher = [];
    this.hockeytournier = [];
  }

  /*
   * Setters und Getters
   */
  get TeamsGetter() {
    return this.teams;
  }


  //Hilfsmethoden

  /*
   * Kontrolle, ob ein Array doppelte Werte drin hat.
   * Es gibt true zurück, wenn der Array doppelte Werte drin hat, false wenn es keine doppelten Elemente gibt.
   */
  hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
  }

  /* 
   * Methode
   * Zurückgeben der Spiele, generiert aus den Teams. Die Spiele sind noch nicht sortiert.
   * 
   * Beispiel 
   * Gegeben:  this.teams = ['A','B','C','D']
   * Rückgabe: this.hockeytournierUnsortiert = ['A:B','A:C','A:D','B:C','B:D','C:D']
   */
  getHockeytournierUnsortiert() {

    // Abfangen von einem Array, welcher nur ein Element drin hat. Es braucht mindestens 2 Spieler.
    if (this.teams.length === 1) {
      return this.teams;
    }

    this.teams.forEach(team1 => {
      this.teams.forEach(team2 => {

        // Ein Team darf nicht gegen sich selber spielen.
        if (team1 === team2) {
          return;
        }

        // Abfangen, wenn die Spieler vertauscht sind. Es darf keine doppelten Spiele geben.
        if (this.hockeytournierUnsortiert.includes(team2 + ':' + team1)) {
          return;
        }

        this.hockeytournierUnsortiert.push(team1 + ':' + team2)
      });
    });
    return this.hockeytournierUnsortiert;
  }


 /* 
  * Methode
  * Sortieren der Spiele. Dabei kommt ein Zwischenspeicher Array zum Einsatz, welcher das vorderste Element
  * immer mit dem letzten Element des bereits sortierten Arrays (this.hockeytournier) vergleicht.
  * Falls es keine Übereinstimmung gibt, bleibt das Element im Zwischenspeicher Array liegen.
  * Wenn es eine Übereinstimmung gibt, wird das vorderste Element des Zwischenspeicher Arrays 
  * in das sortiere Array hinzugefügt und im Zwischenspeicher Array gelöscht.
  * Es kommt vor, dass am Schluss Elemente im Zwischenspeicher Array liegen bleiben.
  * Für diese Elemente wird dann separat mit Hilfe der Methode findPlace() geschaut, wo es für sie noch einen Platz gibt.
  * 
  * Ausnahmen
  * Wenn die Anzahl Teams unter 5 liegen, kann die Anforderung, dass die Spieler nicht mehrmal hintereinander
  * spielen dürfen, nicht erreicht werden. Für diese Fälle werden die Positionen der Elemente im Array random festgelegt.
  * 
  * Beispiel 
  * Gegeben:  this.hockeytournierUnsortiert = ['A:B','A:C','A:D','A:E','B:C','B:D','B:E','C:D','C:E','D:E']
  * Rückgabe: this.hockeytournier           = ['D:E','A:B','C:D','A:E','B:C','A:D','B:E','A:C','B:D','C:E']
  */
  getHockeytournier() {

    // Markierung erster Durchlauf
    let first_round = false;

    // Index zum Anschauen der Elemente auf dem Zwischenspeicher Array
    let index = 0;

    /* 
     * Immer wenn es keine Übereinstimmung gibt mit dem Element vom Zwischenspeicher Array und dem final sortieren Array,
     * wird der Wert des tryers erhöht. Wenn alle Elemente vom Zwischenspeicher Array dann je einmal durchlaufen wurden 
     * und dann immer noch nichts übereinstimmt (tryer === Länge des Zwischenspeicher Arrays),
     * wird die Funktion findPlace() aufgerufen, wo für die restlichen Elemente im Zwischenspeicher Array einen Platz findet.
     * Der tryer wird jeweils wieder auf 0 gesetzt, wenn es eine Übereinstimmung gab.
     */ 
    let tryer = 0;
    
    // Übertragung aller Elemente auf das Zwischenspeicher Array
    this.zwischenspeicher = [...this.hockeytournierUnsortiert];

    // Abfangen von einem Array, welcher nur ein Element drin hat. Es braucht mindestens 2 Spieler.
    if (this.teams.length === 1) {
      return this.teams;
    }

    // Abfangen der Ausnahme, wenn es weniger als 5 Spieler gibt.
    if (this.teams.length < 5) {
      return this.hockeytournierUnsortiert.sort(() => Math.random() - 0.5);
    }

    // Solange den Zwischenspeicher Array durchgehen, bis er leer ist.
    while (this.zwischenspeicher.length > 0) {

      // In der ersten Runde wird gleich zu Beginn das vorderste Element vom Zwischenspeicher Array in das sortiere Array übertragen.
      if (first_round === false) {
        this.hockeytournier.push(this.zwischenspeicher[0]);
        this.zwischenspeicher.splice(0, 1);
        first_round = true;
      }

      // Wieder vorn vorne anfangen das Zwischenspeicher Array durchzugehen, wenn man am Ende des Arrays angelangt ist.
      if (index === this.zwischenspeicher.indexOf(this.zwischenspeicher[this.zwischenspeicher.length - 1])) {
        index = 0;
      }

      /*
       * Die einzelnen Teams aus dem Zwischenspeicher Array und sortiertem Array herausholen Beispiel: 'A:B' wird zu 'A' und 'B'.
       * Jeweils das letzte Tournier vom sortierten Array und das erste Tournier vom Zwischenspeicher Array.
       */
      let team1_sortedarr = this.hockeytournier[this.hockeytournier.length - 1].split(":")[0];
      let team2_sortedarr = this.hockeytournier[this.hockeytournier.length - 1].split(":")[1];
      let team1_zwischenspeicher = this.zwischenspeicher[index].split(":")[0];
      let team2_zwischenspeicher = this.zwischenspeicher[index].split(":")[1];

      /*
       * Wenn es keine Duplikate gibt, wird der finale Array gefüllt.
       * Wenn es Duplikate gibt, geht man im Zwischenspeicher Array einen Schritt weiter.
       */ 
      if (this.hasDuplicates([team1_sortedarr, team2_sortedarr, team1_zwischenspeicher, team2_zwischenspeicher])) {

        index++;
        tryer++

        /*
         * Für die übrig gebliebenen Elemente im Zwischenspeicher Array, wird eine separate Methode aufgerufen,
         * um die Elemente im finalen Array zu platzieren.
         */ 
        if (tryer === this.zwischenspeicher.length) {
          return this.findPlace(this.hockeytournier, this.zwischenspeicher);
        }
      } else {
        tryer = 0;

        this.hockeytournier.push(this.zwischenspeicher[index]);
        this.zwischenspeicher.splice(index, 1);

        // Wenn der Zwischenspeicher leer ist, dann gebe das finale Tournier zurück
        if (this.zwischenspeicher.length === 0) {
          return this.hockeytournier;
        }
      }
    }
  }

 /* 
  * Methode
  * Für jedes Element im Zwischenspeicher Array muss nun einen Platz gefunden werden, in dem jeweils das vordere und hintere Element verglichen wird.
  * Falls es keinen Platz gibt, wird das Element nach vorne gesetzt.
  * 
  * Beispiel 
  * Gegeben: this.hockeytournier = ['D:E','A:B','C:D','A:E','B:C','A:D','B:E','A:C','B:D']
  *          this.zwischenspeicher = ['C:E']
  * 
  * Rückgabe: ['D:E','A:B','C:D','A:E','B:C','A:D','B:E','A:C','B:D', 'C:E']
  */
  findPlace(array1, zwischen) {
    for (let i = 0; i < zwischen.length; i++) {
      let counter = 0;
      while (counter < array1.indexOf(array1[array1.length - 2])) { // -2
        let z1 = zwischen[i].split(":")[0];
        let z2 = zwischen[i].split(":")[1];
        let a1 = array1[counter].split(":")[0];
        let a2 = array1[counter].split(":")[1];
        let a3 = array1[counter + 1].split(":")[0];
        let a4 = array1[counter + 1].split(":")[1];
        console.log(a1 + ":" + a2);
        console.log(z1 + ":" + z2);
        console.log(a3 + ":" + a4);

        if (this.hasDuplicates([z1, z2, a1, a2, a3, a4])) {

          /*
           * Wenn man schon am Ende des finalen Arrays angekommen ist, aber immer noch keinen
           * Platz gefunden hat, dann setzt man das Element an die vorderste Stelle
           */
          if (counter === array1.indexOf(array1[array1.length - 3])) { // -3

            /* Wenn das letzte Element keine Übereinstimmungen hat, setze das Element zu hinterst in den finalen Array.
             * Wenn das letzte Element Übersteinstimmungen hat, setze das Element zu vorderst in den finalen Array.
            */

            // Letztes Element
            let a5 = array1[counter + 2].split(":")[0];
            let a6 = array1[counter + 2].split(":")[1];

            if (this.hasDuplicates([z1, z2, a5, a6])) {
              array1.unshift(zwischen[i]);
            } else {
              array1.push(zwischen[i]);
            }
           
            // counter auf den Index des letzen Elementes setzen, um den while Loop abzubrechen
            counter = array1.indexOf(array1[array1.length - 1]);
          }

          counter++;

        } else {

          // Element in finales Array setzen
          array1.splice(counter + 1, 0, zwischen[i]);

          // counter auf den Index des letzen Elementes setzen, um den while Loop abzubrechen
          counter = array1.indexOf(array1[array1.length - 1]);
        }
      }
    }
    return array1;
  }
}