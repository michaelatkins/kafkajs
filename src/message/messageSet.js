function messageSet(){
  var MessageSizeLength = 4,
  OffsetLength = 8,
  LogOverhead = MessageSizeLength + OffsetLength;

  return {
    entrySize: function(message){
    return LogOverhead + message.size();
  },

  messageSetSize: function(messages){
    return messages.reduce(function(prev, current){
      return prev + entrySize(current);
    }, 0);
  }
}
}

module.exports = messageSet;
