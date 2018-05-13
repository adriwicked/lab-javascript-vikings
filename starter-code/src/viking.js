// Soldier
function Soldier(healthArg, strengthArg) {
  this.health = healthArg;
  this.strength = strengthArg;
}

Soldier.prototype.attack = function () {
  return this.strength;
}

Soldier.prototype.receiveDamage = function (strength) {
  this.health -= strength;
}



// Viking
function Viking(name, healthArg, strengthArg) {
  Soldier.call(this, healthArg, strengthArg);
  this.name = name;
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

Viking.prototype.receiveDamage = function (strength) {
  this.health -= strength;
  return this.health > 0 ? this.name + " has received " + strength + " points of damage" : this.name + " has died in act of combat";
}

Viking.prototype.battleCry = function () {
  return "Odin Owns You All!";
}

// Saxon
function Saxon(healthArg, strengthArg) {
  Soldier.call(this, healthArg, strengthArg)
}

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

Saxon.prototype.receiveDamage = function (strength) {
  this.health -= strength;
  return this.health > 0 ? "A Saxon has received " + strength + " points of damage" : "A Saxon has died in combat";
}

// War
function War() {
  this.vikingArmy = [];
  this.saxonArmy = [];
}

War.prototype.addViking = function (newViking) {
  this.vikingArmy.push(newViking);
}

War.prototype.addSaxon = function (newSaxon) {
  this.saxonArmy.push(newSaxon);
}

War.prototype.vikingAttack = function () {
  var randSaxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
  var randViking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
  
  var msg = randSaxon.receiveDamage(randViking.strength);

  if (randSaxon.health <= 0) this.saxonArmy.splice(this.saxonArmy.indexOf(randSaxon), 1);

  return msg;
}

War.prototype.saxonAttack = function () {
  var randSaxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
  var randViking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
  
  var msg = randViking.receiveDamage(randSaxon.strength);

  if (randViking.health <= 0) this.vikingArmy.splice(this.vikingArmy.indexOf(randViking), 1);

  return msg;
}

War.prototype.showStatus = function () {
  if (this.vikingArmy.length <= 0) return "Saxons have fought for their lives and survive another day...";
  if (this.saxonArmy.length <= 0) return "Vikings have won the war of the century!";
  if (this.vikingArmy.length > 0 && this.saxonArmy.length > 0) return "Vikings and Saxons are still in the thick of battle.";
}