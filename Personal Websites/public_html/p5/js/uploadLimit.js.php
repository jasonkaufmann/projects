<?php
Header("content-type: application/x-javascript");

// This should be in your functions.php
function return_bytes($val) {
    $val = trim($val);
    $last = strtolower($val[strlen($val)-1]);
    switch($last) {
        // The 'G' modifier is available since PHP 5.1.0
        case 'g':
            $val *= 1024;
        case 'm':
            $val *= 1024;
        case 'k':
            $val *= 1024;
    }

    return $val;
}
?>
// Stores an array of FileInput
function UploadLimiter() {
  this.fileInputs = [];
  this.filesizeLimit = <?php echo return_bytes(ini_get("upload_max_filesize")); ?>;
  this.self = this;
  this._init();
}
// Acts at the contructor of the new UploadLimiter
UploadLimiter.prototype._init = function() {
  // Finds all input elements on the page
  var tempFiles = document.getElementsByTagName('input');
  // Stores only the input elements that are for uploading a file 
  for(var i = 0; i < tempFiles.length; i++) {
    if( tempFiles[i].hasAttribute('type') 
            && (tempFiles[i].getAttribute('type').toLowerCase() == 'file') ) {
      this.fileInputs.push(new FileInput(tempFiles[i]));
    }
  }
  this.addEventListeners();
};
// Checks if FileInput is under filesize limit
UploadLimiter.prototype.isSizeValid = function(fi) {
  // makes sure fi is a FileInput
  if(!(fi.constructor == FileInput)) {
    console.log('Type Error: isSizeValid require an object of type FileInput');
  }
  return fi.getFilesize() && fi.getFilesize() < this.filesizeLimit;
};
// 
UploadLimiter.prototype.addEventListeners = function() {
  for(var i = 0; i < this.fileInputs.length; i++) {
    this.fileInputs[i].input.addEventListener('change', this );
  }
};
UploadLimiter.prototype.handleEvent = function(event) {
  switch(event.type) {
    case 'change':
      if(this.isSizeValid(event.currentTarget.parent)) {
        event.currentTarget.parent.setSubmitEnabled();
      } else {
        event.currentTarget.parent.setSubmitDisabled();
      }
      break;
  }
};


// The FileInput type stores the input element, its associated form, and its 
// associated submit button
function FileInput(element) {
  this.input = element;
  this.input.parent = this;
  this.form = element.form; // TODO: Research if this method is cross-browser compatible
  this.submit = this._findSubmit();
}
// Gets the filesize of the file input element, if there is one
// @return: size of file in bytes or false
FileInput.prototype.getFilesize = function() {
  if(this.input.files.length > 0) {
    return this.input.files[0].size;
  } else {
    return false;
  }
};
// Checks if the input element is disabled
FileInput.prototype.isInputDisabled = function() {
  if( this.input.hasAttribute('disabled') ) {
    return true;
  }
  return false;
};
// Sets the input element to disabled
FileInput.prototype.setInputDisabled = function() {
  if(!this.isInputDisabled()) {
    this.input.setAttribute('disabled','disabled');
  }
};
// Sets the input element to enabled
FileInput.prototype.setInputEnabled = function() {
  if(this.isInputDisabled()) {
    this.input.removeAttribute('disabled');
  }
};
// Toggles the input disabled/enabled
FileInput.prototype.toggleInputDisabled = function() {
  if(this.isInputDisabled()) {
    this.setInputEnabled();
  } else {
    this.setInputDisabled();
  }
};
// Checks if the input element is disabled
FileInput.prototype.isSubmitDisabled = function() {
  if( this.submit.hasAttribute('disabled') ) {
    return true;
  }
  return false;
};
// Sets the input element to disabled
FileInput.prototype.setSubmitDisabled = function() {
  if(!this.isSubmitDisabled()) {
    this.submit.setAttribute('disabled','disabled');
  }
};
// Sets the input element to enabled
FileInput.prototype.setSubmitEnabled = function() {
  if(this.isSubmitDisabled()) {
    this.submit.removeAttribute('disabled');
  }
};
// Toggles the input disabled/enabled
FileInput.prototype.toggleSubmitDisabled = function() {
  if(this.isSubmitDisabled()) {
    this.setSubmitEnabled();
  } else {
    this.setSubmitDisabled();
  }
};
FileInput.prototype._findSubmit = function() {
  // Search through the input elements and find one with type="submit"
  var t = this.form.getElementsByTagName('input');
  for(var i = 0; i < t.length; i++) {
    if(t[i].hasAttribute('type') 
            && (t[i].getAttribute('type').toLowerCase() == 'submit') ) {
      return t[i];
    }
  }
  // Search through the input elements and find one with type="submit"
  var t = this.form.getElementsByTagName('button');
  for(var i = 0; i < t.length; i++) {
    if(t[i].hasAttribute('type') 
            && (t[i].getAttribute('type').toLowerCase() == 'submit') ) {
      return t[i];
    }
  }
  // @TODO: Add additional searches for other common methods a form might be 
  //        submitted. E.G. a <button> element instead of an <input> element.
};

// initializes a new UploadLimiter on page load
// @TODO: Research browser compatibility issues with this method and fix
document.addEventListener('DOMContentLoaded', function(){
  window.uploadLimiter = new UploadLimiter();
});
