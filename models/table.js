var mongoose = require('mongoose');
var saveModel = require('../helpers/modelsaver.js');

var tableSchema = mongoose.Schema({
  uid: String,
  name: String,
  header: [String],
  matrix: [[String]]
});
var TableModel = mongoose.model('table', tableSchema);

// check if default model exists

function insertDefaultTable(){
  var defaultTable = new TableModel({
    uid: '0',
    name: 'testable', 
    header: ['column 1', 'column 2', 'column 3'], 
    matrix: [['row1 test1', 'row1 test2', 'row1 test3'],['row2 test1', 'row2 test2', 'row2 test3'],['row3 test1', 'row3 test2', 'row3 test3']]
  });
  defaultTable.save(saveModel);
}

function checkDefaultEntry(err, count){
  if(count > 0){
    console.log('default table (uid=0) is already present in db!');
  }
  else{
    console.log('inserting default table (uid=0) into db!');
    insertDefaultTable();
  }
}

TableModel.count({uid: '0'}, checkDefaultEntry);

