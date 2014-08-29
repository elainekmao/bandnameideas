var Client = require('node-rest-client').Client;
client = new Client();
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit({
    consumer_key:         'qaYQc0ghhsdCqE5IXKA309F5S',
    consumer_secret:      'c67gvjMiYShCosxySDV8g1Hr8AIeLis4cYSZ5igyz8Mmlzvkl6',
    access_token:         '2715209622-c3F25KFH9dXtTCRLOL2Xv5SEB153o2tywsgQtwu',
    access_token_secret:  'yKeZBi4M0ZS3bRnPA8LCC6H0HeUh128FlpNlhO9SrDU27'
});

var statement =   "Hi!";

var getNounsURL = "http://api.wordnik.com/v4/words.json/randomWords?" +
                  "minCorpusCount=1000&minDictionaryCount=10&" +
                  "excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&" +
                  "hasDictionaryDef=true&includePartOfSpeech=noun&limit=2&maxLength=12&" +
                  "api_key=dcb89c208c4509083a40107a2e808703600687eee62da3f11";

var getAdjsURL =  "http://api.wordnik.com/v4/words.json/randomWords?" +
                  "hasDictionaryDef=true&includePartOfSpeech=adjective&limit=1&" + 
                  "minCorpusCount=100&api_key=dcb89c208c4509083a40107a2e808703600687eee62da3f11";

var getVerbURL = "http://api.wordnik.com/v4/words.json/randomWords?" +
                  "hasDictionaryDef=true&includePartOfSpeech=verb&limit=1&" +
                  "excludePartOfSpeech=auxiliary-verb,past-participle,verb-transitive&" + 
                  "minCorpusCount=100&minDictionaryCount=10&" +
                  "api_key=dcb89c208c4509083a40107a2e808703600687eee62da3f11";                 
                  
var getProperNounURL = "http://api.wordnik.com/v4/words.json/randomWords?" +
                        "hasDictionaryDef=false&includePartOfSpeech=proper-noun&limit=1&" + 
                        "minCorpusCount=5000&excludePartOfSpeech=proper-noun-plural,proper-noun-posessive&" +
                        "api_key=dcb89c208c4509083a40107a2e808703600687eee62da3f11";

function makeBandName() {
    statement = "";
    client.get(getNounsURL,
        function(data) {
            noun1 = JSON.parse(data)[0].word.charAt(0).toUpperCase() +
            JSON.parse(data)[0].word.slice(1);
            noun2 = JSON.parse(data)[1].word.charAt(0).toUpperCase() +
            JSON.parse(data)[1].word.slice(1);
            noun2end1 = noun2.charAt(noun2.length - 2);  
            noun2end2 = noun2.charAt(noun2.length - 1);  
            plural = noun2 + 's'
            if (noun2end2 === 'x' ||
                noun2end2 === 'o' ||
                noun2end2 === 's' ||
                (noun2end1 === 'c' && noun2end2 === 'h') ||
                (noun2end1 === 's' && noun2end2 === 'h')) {
                    plural = noun2 + 'es'
                }
            else if (noun2end2 === 'y' && noun2end1 !== 'a' && noun2end1 !== 'e' &&
            noun2end1 !== 'i' && noun2end1 !== 'o' && noun2end1 !== 'u') {
                plural = noun2.slice(0,-1) + 'ies'
            }
        client.get(
            getAdjsURL,
            function(data) {
              adj = JSON.parse(data)[0].word.charAt(0).toUpperCase() +
              JSON.parse(data)[0].word.slice(1);
              client.get(
                  getVerbURL,
                  function(data) {
                      verb = JSON.parse(data)[0].word.charAt(0).toUpperCase() +
                      JSON.parse(data)[0].word.slice(1);
                      verbend1 = verb.charAt(verb.length - 2);
                      verbend2 = verb.charAt(verb.length - 1);
                      participle = verb + "ing"
                      if (verbend2 === 'e' && verbend1 !== 'e' &&
                      verbend1 !== 'y' && verbend1 !== 'o') {
                          participle = verb.slice(0,-1) + "ing"
                      }
                      else if (verbend2 !== 'a' && verbend2 !== 'i' &&
                      verbend2 !== 'o' && verbend2 !== 'u') {
                          if (verbend1 === 'a' ||
                          verbend1 === 'e' ||
                          verbend1 === 'i' ||
                          verbend1 === 'o' ||
                          verbend1 === 'u') {
                              participle = verb + verbend2 + "ing"
                          }
                      }
                      nounform = verb.toLowerCase() + "er";
                      if (verbend2 === 'e') {
                          nounform = verb.toLowerCase() + 'r'
                      }
                      else if (verbend2 !== 'a' && verbend2 !== 'i' &&
                      verbend2 !== 'o' && verbend2 !== 'u') {
                          if (verbend1 === 'a' ||
                          verbend1 === 'e' ||
                          verbend1 === 'i' ||
                          verbend1 === 'o' ||
                          verbend1 === 'u') {
                              nounform = verb.toLowerCase() + verbend2 + "er"
                          }
                      }
                      client.get(
                          getProperNounURL,
                          function(data) {
                              proper = JSON.parse(data)[0].word;
                              switch (Math.floor(Math.random()*13)) {
                              case 0:
                                  statement = "The" + " " + plural;
                                  break;
                              case 1:
                                  statement = noun1 + " " + plural;
                                  break;
                              case 2:
                                  statement = noun1;
                                  break;
                              case 3:
                                  statement = noun1 + " " + noun2;
                                  break;
                              case 4:
                                  statement = "The" + " " + noun2;
                                  break;
                              case 5:
                                  statement = "The" + " " + adj + " " + noun2;
                                  break;
                              case 6:
                                  statement = "The" + " " + adj + " " + plural;
                                  break;
                              case 7:
                                  statement = "The" + " " + participle + " " + plural;
                                  break;
                              case 8:
                                  statement = "The" + " " + participle + " " + noun2;
                                  break;
                              case 9:
                                  statement = noun2 + " " + nounform.charAt(0).toUpperCase() + nounform.slice(1);
                                  break;
                              case 10:
                                  withvowels = noun2 + nounform;
                                  novowels = withvowels.replace(/[aeiou]/ig,'')
                                  removec = novowels.replace(/c/g, 'k');
                                  kreplace = removec.replace(/kk/g, 'k');
                                  statement = kreplace.toUpperCase() + " (" + noun2 + " " + nounform.charAt(0).toUpperCase() + nounform.slice(1) + ")";
                                  break; 
                              case 11:
                                  statement = proper + " and the " + plural;
                                  break;
                              case 12:
                                  statement = proper + " and the " + participle + " " + noun2;
                                  break;
                              }
                              console.log(statement);
                              T.post('statuses/update', { status: statement}, function(err, reply) {
                                        console.log("error: " + err);
                                        console.log("reply: " + reply);
                                      });   
                          }, "json");
                  }, "json");
          }, "json");
    }, "json");
}

makeBandName();
setInterval(function() {
  try {
    makeBandName();
  }
 catch (e) {
    console.log(e);
  }
},240000);