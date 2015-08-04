function readFrom(buffer){

}

function connectionString(host, port, protocol){
    var hostport = "";
    if(host){
        hostport = ":" + port
    }

    return protocol + "://" + hostport;
}

function writeTo(buffer){
  
}
