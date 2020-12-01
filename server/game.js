const { create } = require('lodash');
const _ = require('lodash');

const questoes = [
    {q:'QUE PARTE DO CORPO É USADA PARA CHUTAR BOLA?',a:['JOELHO','COXA','PÉ','MÃO'],c:2,tipo:'A',materia:'C'},
    {q:'O SATÉLITE NATURAL DA TERRA É: ', a:['MERCÚRIO','SATURNO','LUA','JÚPITER'],c:2,tipo:'A',materia:'C'}
  ];

const createGameSession = function(){
    let game_session = {
        room_id:'',
        players:[],
        started:false,
        round:0,
        questao:false,
        time:0
    }
    return game_session;
}
const startGame = function(data){
    questao_atual = chooseQuestions();
    game_session = createGameSession();

    game_session.room_id = data.room_id;
    room_id = data.room_id
    game_session.players = data.sockets
    game_session.started = true
    game_session.round = 1
    game_session.questao = questao_atual

    return game_session;
}

const chooseQuestions = function(){
    q = _.random(0,1);
    return questoes[q];
}

module.exports = {
    startGame
}