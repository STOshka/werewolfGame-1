pl.view.wolfRound = {
  setupUserInterface: function (){
    var game = Game.load();
    GameMethod.nextNight(game);
    Game.save(game);
    // get who is still living
    var textLive = '';
    if (game.nRound > 1){
       textLive = GameMethod.getLivingPlayer(game);
    }
    document.getElementById('night').innerHTML =
    '第'+game.nRound+'晚\n' + textLive;

    //get killed person ID
    var Killbtn = document.getElementById('btnNext');

    //get wolf ID in the 1st round
    if (game.nRound == 1){
      var form = document.getElementById('frmWolfID');
      for (var i = 0;i<game.wolf.length;i++){
        var input = document.createElement("input");
        //var ii = i+1;
        input.type = "number";
        input.name = "wolf"+ (i+1);
        if (i == 0 && game.wolfking !== null){
          input.placeholder = "请输入白狼王的号码";
        }
        else {
          input.placeholder =
          '请输入第'+ (i+1) + "个狼人号码";
        }
        form.appendChild(input);
        form.appendChild(document.createElement("br"));
      }
      form.appendChild(document.createElement("br"));
      Killbtn.addEventListener('click',
      pl.view.wolfRound.handleAssignID);
    }

    //get select to kill form
    var sl = document.getElementById('selectKill');
    var PArray = GameMethod.selectLivingP(game);
    for (var i=0;i<PArray.length;i++){
      if (PArray[i] != undefined){
        var opt = document.createElement("option");
        opt.value = i+1;
        opt.innerHTML = PArray[i];
        sl.appendChild(opt);
      }
    }

    Killbtn.addEventListener('click',
    pl.view.wolfRound.handleGetKillIDonClick);
  },

  handleAssignID: function (){
    var x = document.getElementById('frmWolfID');
    var game = Game.load();
    for (var i = 0; i < x.length; i++){
      var ID = Number(x.elements[i].value)
      GameMethod.check_input(ID,game,'range');
      game.player[ID-1] = game.wolf[i];
      console.log('assign '+ ID + 'th player to wolf');
      }
    Game.save(game);
  },

  handleGetKillIDonClick: function(){
    var sl = document.getElementById('selectKill');
    var game = Game.load();
    var nK = Number(sl.value);
    GameMethod.check_input(nK,game,'death');
    game.nK = nK;
    Game.save(game);
    console.log('player '+ game.nK + ' is killed');
    // check if input is valid
    if (!game.validInput){
      game.validInput = true;
      Game.save(game);
      return;
    }
    // go to next page
     window.location = 'defenderRound.html';
  }

}
