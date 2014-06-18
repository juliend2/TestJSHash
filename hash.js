function HashTable()
{
  this.length = 0;
  this.items  = {};

  this.getValue = function(key) {
    return this.items[key];
  }

  this.add = function(key) {
    var current_value = this.getValue(key);
    if( !current_value )
    {
      this.items[key] = 1;
      this.length++;
    }
    else
      this.items[key] = current_value + 1;
  }

  this.remove = function(key) {
    var current_value = this.getValue(key);
    if( current_value )
    {
      if( current_value > 1 )
        this.items[key] = current_value - 1;
      else
      {
        this.items[key] = 0;
        this.length--;
      }
    }
  }
}

var global_hash = new HashTable();

function getSelectedListValues() {
  var value  = $('input[name=list]:checked', '#list_form').val();
  var values = value.split("|");

  values[0] = parseInt(values[0]);
  values[1] = parseInt(values[1]);
  values[2] = parseInt(values[2]);

  return values;
}

function getSelectedInputValues() {
  var values = [];

  values[0] = parseInt( $("#input_from").val() );
  values[1] = parseInt( $("#input_to").val() );
  values[2] = parseInt( $("#input_offset").val() );

  return values;
}

function updateUI(time) {
  $("#total").text( global_hash.length );
  $("#timing").text(time + " ms");
}

function addList(from, to, offset) {
  var start = new Date().getTime();

  for(var i = from; i <= to; i += offset)
    global_hash.add(i);

  updateUI(new Date().getTime() - start);
}

function removeList(from, to, offset) {
  var start = new Date().getTime();

  for(var i = from; i <= to; i += offset)
    global_hash.remove(i);

  updateUI(new Date().getTime() - start);
}

$(document).ready(function()
{
  $("#list-remove").click(function() {
    var values = getSelectedListValues();
    removeList(values[0], values[1], values[2]);
  });

  $("#list-add").click(function() {
    var values = getSelectedListValues();
    addList(values[0], values[1], values[2]);
  });

  $("#input-remove").click(function() {
    var values = getSelectedInputValues();
    removeList(values[0], values[1], values[2]);
  });

  $("#input-add").click(function() {
    var values = getSelectedInputValues();
    addList(values[0], values[1], values[2]);
  });
});
