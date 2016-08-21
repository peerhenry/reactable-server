function saveModel(err, model){
  if(err) return console.error(err);
  console.log('model saved ' + model);
}

module.exports = saveModel; 