function segment(size){
  return {
    bytes: new Buffer(size),
    written: 0,
    next: null,
    freeSpace = function(){
      return this.bytes.length - written;
    }
  }
}

function reservedOutput(segment, offset, length){
  var cur = segment,
  off = offset,
  len = length;

  function write(value){
    if(cur.bytes.length <= offset){
      cur = cur.next;
      off = 0;
    }

    cur.writeIntBE(off, value);
    off += 1;
    len -= 1;
  }
}
