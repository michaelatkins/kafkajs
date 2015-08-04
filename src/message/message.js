function message(bytes, key, codec, payloadOffset, payloadSize){
  var CrcOffset = 0,
  CrcLength = 4,
  MagicOffset = CrcOffset + CrcLength,
  MagicLength = 1,
  AttributesOffset = MagicOffset + MagicLength,
  AttributesLength = 1,
  KeySizeOffset = AttributesOffset + AttributesLength,
  KeySizeLength = 4,
  KeyOffset = KeySizeOffset + KeySizeLength,
  ValueSizeLength = 4,
  MessageOverhead = KeySizeOffset + ValueSizeLength,
  MinHeaderSize = CrcLength + MagicLength + AttributesLength + KeySizeLength + ValueSizeLength,
  CurrentMagicValue = 0,
  CompressionCodeMask = 0x07,
  NoCompression = 0;

  if(!payloadOffset){
    payloadOffset = 0;
  }
  if(!payloadSize){
    payloadSize = -1;
  }

  var bufSize = CrcLength + MagicLength + AttributesLength + KeySizeLength;
  bufSize += (key == null ? 0 : key.length) + ValueSizeLength;
  bufSize += (bytes == null ? 0 : payloadSize >= 0 ? payloadSize : bytes.length - payloadOffset)

  var buf = new Buffer(bufSize);
  buf.writeUInt32BE(0,0);
  var position = 4;
  buf.writeInt8(0, position);
  position += MagicLength;
  var attributes = 0;
  buf.writeInt8(attributes, position);
  position += AttributesLength;
  var keySize = 0;
  if(!key){
    buf.writeInt32BE(-1, position);
    position += KeySizeLength;
  }
  else{
    buf.writeInt32BE(key.length, position);
    position += KeySizeLength;
    keySize = key.length;
    for(var k = 0; k < keySize; k++){
      buf[position] = key[k];
      position += 1;
    }
  }
  var size = -1;
  if(bytes){
    if(payloadSize >= 0){
      size = payloadSize;
    }
    else {
      size = bytes.length - payloadOffset;
    }
  }
  buf.writeInt32BE(size, position);
  position += ValueSizeLength;
  if(bytes){
    for(var k = 0; k < size; k++){
      buf[position] = bytes[k];
      position += 1;
    }
  }

 var result = {
  checeksum: function(){
    return buf.readInt32BE(CrcOffset);
  },

  size: function(){
    return buf.length;
  },

  keySize: function(){
    return buf.readInt32BE(KeySizeOffset)
  },

  hasKey: function(){
    return this.keySize() >= 0;
  },

  payloadSize: function(){
    buf.readInt32BE(payloadSizeOffset());
  },

  isNull: function(){
    return this.payloadSize() < 0;
  },

  magic: function(){
    buf.readInt8(MagicOffset);
  },

  attributes: function(){
    buf.readInt8(AttributesOffset);
  },

  payload: function(){
    return sliceDelimited(payloadSizeOffset());
  },

  key: function(){
    return sliceDelimited(KeySizeOffset);
  },

  raw: function(){
    return buf;
  }
}

function payloadSizeOffset(){
  return KeyOffset + Math.max(0, keySize);
}

  function sliceDelimited(start){
    var size = buf.readInt32BE(start);
    if(size < 0){
      return null;
    }

    return buf.slice(start+4, start+4+size)
  }


  return result;
}

module.exports = message;
