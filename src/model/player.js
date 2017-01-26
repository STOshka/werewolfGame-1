class Player {
  constructor() {
    this.isKilled    = false; //被狼人杀死
    this.isGuarded   = false; //被守卫
    this.isSaved     = false; //被女巫救
    this.isPoisoned  = false; //被女巫毒死
    this.isV2Die     = false; //被投死
    this.isSuicide   = false; //自杀
    this.life        = 1;
    this.type        = "";
    this.isDead      = false;
  }
}



//sub classes
class Wolf extends Player {
  constructor() {
    super(); // need to be called before use "this"
    this.type = "Wolf";
    this.name = '狼人';
  }
}

class WolfKing extends Wolf {
  constructor() {
    super();
    this.type = 'WolfKing';
    this.name = '白狼王';
  }
}

class Citizen extends Player {
  constructor() {
  super();
  this.type = 'Citizen';
  this.name = '村民';
  }
}

class StrongCitizen extends Citizen {
  constructor() {
    super();
    this.type = 'StrongCitizen';
    this.life = 2;
    this.name = '强民';
  }
}

class Prophet extends Player {
  constructor() {
    super();
    this.type = 'Prophet';
    this.name = '预言家';
  }
}

class Witch extends Player {
  constructor() {
    super();
    this.type = 'Witch';
    this.name = '女巫';
    this.cureCount = 1;
    this.poisonCount = 1;
  }
}

class Hunter extends Player {
  constructor() {
    super();
    this.type = 'Hunter';
    this.name = '猎人';
  }
}

class Defender extends Player {
  constructor() {
    super();
    this.type = 'Defender';
    this.name = '守卫';
  }
}
