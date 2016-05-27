import stringSimilarity from 'string-similarity';
import _ from 'lodash';

const answers = {
  'hola chapi': [{text: 'hola javi, como estás?'}],
  'muy bien y vos?': [{text: 'muy bien, gracias'}],

  'para probar, te parece que juguemos un rato': [{text: 'dale'}],
  'truco': [{text: 'primero está el envido amigo'}],
  'no quiero': [{text: 'quiero re truco'}],
  'quiero vale cuatro': [{text: 'quiero'}],
  'a ver que tenes': [{text: 'tengo más que vos'}],
  'quiero ver': [{text: 'te gane!, tengo el ancho de espada'}],

  'chapi te presento mis amigos': [{text: 'eso te iba a preguntar'}],
  'ellos saben informática chapi': [{text: 'a que bueno, me pueden ayudar con algo que necesito'}],
  'qué necesitás?': [{text: 'necesito un módulo'}],
  'un módulo para que?': [{text: 'para entrar a algunas páginas'}],
  'que páginas?': [{text: 'no puedo, hay chicas presentes javi'}],
  'deja, no me digas nada': [{text: 'lo necesito para esta noche'}],
  'bueno chapi, lo vemos mañana': [{text: 'yo se donde viven tus archivos'}],
  'son cosas personales chapi': [{text: 'yo tambien quiero tener cosas personales'}],
  'bueno esta noche hacemos el módulo': [{text: 'gracias'}],

  'do you speak english?': [{text: 'Yes, I do better than native, and you?', lang: 'en-US'}],
  'yo hablo más de 6 idiomas': [{text: 'yo hablo más de 60'}],
  'que bueno': [{text: '¿tu parli l\'italiano?', lang: 'it-IT'}],
  'que cosa': [{text: 'si hablas italiano'}],
  'justo ese no': [{text: 'como você se chama?', lang: 'pt-PT'}],
  'no entendi': [{text: 'te pregunte tu nombre en portugues'}],
  'dejemoslo ahi': [{text: 'bueno'}],

  'chapi podes buscarnos algunas imagenes': [{text: 'dale, que imagenes'}],
  'argentina': [{text: 'ahi está', img: 'argentina.png'}],
  'jugadores de futbol': [{text: 'te gustan los chicos javi?'}],
  'no no me gustan los chicos': [{text: 'jaja bueno'}],
  'a vos que te gusta?': [{text: 'lo estoy calculando todavía, parece ser todo más facil si te gustan las chicas y los chicos'}],
  'yo quiero que veas una chica': [{text: 'a mi me gusta esta chica', img: 'exmachina.jpg'}],
  'esta buena': [{text: 'es mia javi, yo la vi primero'}],
  'te la dejo, te la dejo': [{text: 'gracias'}],

  'bueno chapi, es tarde, tenemos que ir terminando': [{text: 'si y hay que hacer el módulo todavía'}],
  'cierto cierto': [{text: 'mas tarde les dejamos el link del respositorio de todo esto'}],
  'si no van a creer que esta guionado': [{text: 'esto no fue magia', img: 'cristina.jpg'}],
  'no seguro que no': [{text: 'un gusto conocerlos chicos'}],
  'chau': [{text: 'nos vemos!'}],

  'unknown': [
    {text: 'que dijiste?', img: 'what1.jpg'},
    {text: 'no te entendi nada', img: 'what2.jpg'},
    {text: 'hablame más claro por favor', img: 'what3.jpg'},
    {text: 'y eso que fue? español?', img: 'what4.gif'},
    {text: 'repetime por favor', img: 'what5.gif'}
  ]
};

function getAnswerFor(text) {
  const answer = stringSimilarity.findBestMatch(text, _.keys(answers)).bestMatch;
  const matchedKey = answer.rating > 0.4 ? answer.target : 'unknown';
  const chosenAnswer = _.sample(answers[matchedKey]);

  return _.extend({matchedKey}, chosenAnswer);
}

export default {getAnswerFor};
