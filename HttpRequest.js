// =============================================================================
// XHR WRAPPER
// FOR GET/POST ENDPOINTS THAT RETURN JSON
//  >> onload = function(<json data|data>)
//
//
//  Example GET: 
//      const jsonRequest = new HttpRequest("GET", "/endpoint/", null, (jsonData)=>{console.log(jsonData)}, , (error)=>{console.log(error)})
//
//  Example POST: 
//      const jsonRequest = new HttpRequest("POST", "/endpoint/", {key:value}, (jsonData)=>{console.log(jsonData)}, , (error)=>{console.log(error)})
//
// BY: Isaac Lehman
// =============================================================================
class HttpRequest {
    constructor(method, url, data, onload, error){
        this.method = method;
        this.url    = url;
        this.data   = data;
        this.onload = onload;
        this.error  = error;
        this.xhr = new XMLHttpRequest();

        this.init();
    }

    init() {
        //create XMLHttpRequest object
        this.xhr.open(this.method, this.url)

        if (this.method == "POST") {
            // set content-type header to JSON
            this.xhr.setRequestHeader("Content-Type", "application/json"); 
            
            // send JSON data to the remote server
            this.xhr.send(JSON.stringify(this.data));
        } else {
            //send the Http request
            this.xhr.send()
        }

        // set error/load functions
        this.xhr.onload =
            function() {
                if (this.xhr.status == 200) {
                    data = JSON.parse(this.xhr.responseText);
                    this.onLoad(data);
                } else { // if no results
                    this.onLoad(null);
                }
            }

        this.xhr.onerror = this.onerror;
    }
  
  
    set setHeader(key, value) {
        // Set a request header
        this.xhr.setRequestHeader(key, value); 
    }

  
    get downloadProgress() {
        // Track data download progress
        // >> in Bytes
        this.xhr.onprogress = function(e) {
            return {
                loaded: e.loaded,
                total: e.total
            }
        }
    }

  
    get uploadProgress() {
        // Track data upload progress
        // >> in Bytes
        this.xhr.upload.onprogress = function(e) {
            return {
                loaded: e.loaded,
                total: e.total
            }
        }
    }
}
