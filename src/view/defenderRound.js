pl.view.defenderRound = {
  setupUserInterface: function (){
    var game = Game.load();

    if (game.defender == undefined){
      window.location = 'witchRound.html';
      return;
    }

    var NextBtn = document.getElementById('btnNext');
    // get who is still living
    document.getElementById('night').innerHTML =
    '第'+game.nRound+'晚\n';


    //get defender ID in the 1st round
    var isSkip = false;
    if (game.nRound == 1){
      document.getElementById('showTEXT').innerHTML =
      '请输入守卫号码';
      var form = document.getElementById('frmDefenderID');
      var input = document.createElement("input");
      input.type = "number";
      input.name = "defender";
      form.appendChild(input);
      form.appendChild(document.createElement("br"));
      NextBtn.addEventListener('click',
      pl.view.defenderRound.handleAssignIDonClick);
    }
    else{
      for (var i=0;i<game.player.length;i++){
        if (game.player[i].type == 'Defender'){
          var defender = game.player[i];
          isSkip = defender.isDead;
        }
      }
    }

    var sl = document.getElementById('select');
    var PArray = GameMethod.selectLivingP(game);
    for (var i=0;i<PArray.length;i++){
      if (PArray[i] != undefined){
        var opt = document.createElement("option");
        opt.value = i+1;
        opt.innerHTML = PArray[i];
        sl.appendChild(opt);
      }
    }

    if(!isSkip){
      NextBtn.addEventListener('click',
      pl.view.defenderRound.handleGetGuardIDonClick);
    }
    else{
      var x =  document.getElementById('guardstatus');
      x.innerHTML= "守卫已死亡";
      sl.disabled = "disabled";
    }

    NextBtn.addEventListener('click',
    pl.view.defenderRound.handleNextNightonClick);
  },

  handleAssignIDonClick: function (){
    var x = document.getElementById('frmDefenderID');
    var game = Game.load();
    var ID = Number(x.elements['defender'].value);
    if (GameMethod.check_input(ID,game,'empty')){
      game.player[ID-1] = game.defender;
    }
    Game.save(game);
    console.log('assign '+ ID + 'th player to defender');
  },

  handleGetGuardIDonClick: function(){
    var x = document.getElementById('select');
    var game = Game.load();
    var nG = Number(x.value);
    GameMethod.check_input(nG,game,'death');
    if (nG !== game.nG_pre || nG == 0){
      game.nG = nG;
      game.nG_pre = nG;
    }
    else{
      alert('守卫不能连续两个晚上同时守一个人');
      game.validInput = false;
    }
    Game.save(game);
    console.log(game.nG + ' is guarded');
  },

  handleNextNightonClick: function(){
    var game = Game.load();
    // check input of all fields
    if (!game.validInput){
      //reinitialize
      game.validInput = true;
      game.nG_pre = 0;
      for (var i = 0;i<game.player.length;i++){
        if (game.player[i].type == 'Defender'){
          game.player[i] = new Citizen();
        }
      }
      Game.save(game);
      return;
    }
      window.location = 'witchRound.html';
  }
}
