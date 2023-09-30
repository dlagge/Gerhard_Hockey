/* ---------------------------------------------------------------------------------
 * Erstellung des Teams
 * ---------------------------------------------------------------------------------
 */

class Team {

  /*
   * Konstruktor
   * Teamname: Beispiel 'A'
   * Liste an Spielern im Team: Beispiel ['Hans', 'Martina', 'Peter']
   */
  constructor(teamname, spieler) {
    this.teamname = teamname;
    this.spieler = spieler;
  }

  /*
   * Setters und Getters
   */
  get teamnameGetter() {
    return this.teamname;
  }

  set teamnameSetter(name) {
    this.teamname = name;
  }

  get spielerGetter() {
    return this.spieler;
  }

  set spielerSetter(players) {
    this.spieler = players;
  }

}