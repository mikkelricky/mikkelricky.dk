<!--
var ready = false;
var imageDB = new Array();
var imagepath = "http://www.brics.dk/bigwig/img/";

function getToplevelImages() {
  if (document.images) {
    imageDB['bigwig']=new Array();
    imageDB['bigwig']['off'] = new Image(130,20);
    imageDB['bigwig']['off'].src=imagepath +  "bigwig-m.gif";
    imageDB['bigwig']['on'] = new Image(130,20);
    imageDB['bigwig']['on'].src=imagepath + "bigwig-s.gif";

    imageDB['introduction']=new Array();
    imageDB['introduction']['off'] = new Image(130,20);
    imageDB['introduction']['off'].src=imagepath + "introduction-m.gif";
    imageDB['introduction']['on'] = new Image(130,20);
    imageDB['introduction']['on'].src=imagepath + "introduction-s.gif";

    imageDB['news']=new Array();
    imageDB['news']['off'] = new Image(130,20);
    imageDB['news']['off'].src=imagepath + "news-m.gif";
    imageDB['news']['on'] = new Image(130,20);
    imageDB['news']['on'].src=imagepath + "news-s.gif";

    imageDB['download']=new Array();
    imageDB['download']['off'] = new Image(130,20);
    imageDB['download']['off'].src=imagepath + "download-m.gif";
    imageDB['download']['on'] = new Image(130,20);
    imageDB['download']['on'].src=imagepath + "download-s.gif";

    imageDB['installation']=new Array();
    imageDB['installation']['off'] = new Image(130,20);
    imageDB['installation']['off'].src=imagepath + "installation-m.gif";
    imageDB['installation']['on'] = new Image(130,20);
    imageDB['installation']['on'].src=imagepath + "installation-s.gif";

    imageDB['compiling']=new Array();
    imageDB['compiling']['off'] = new Image(130,20);
    imageDB['compiling']['off'].src=imagepath + "compiling-m.gif";
    imageDB['compiling']['on'] = new Image(130,20);
    imageDB['compiling']['on'].src=imagepath + "compiling-s.gif";

    imageDB['examples']=new Array();
    imageDB['examples']['off'] = new Image(130,20);
    imageDB['examples']['off'].src=imagepath + "examples-m.gif";
    imageDB['examples']['on'] = new Image(130,20);
    imageDB['examples']['on'].src=imagepath + "examples-s.gif";

    imageDB['tutorial']=new Array();
    imageDB['tutorial']['off'] = new Image(130,20);
    imageDB['tutorial']['off'].src=imagepath + "tutorial-m.gif";
    imageDB['tutorial']['on'] = new Image(130,20);
    imageDB['tutorial']['on'].src=imagepath + "tutorial-s.gif";

    imageDB['reference_manual']=new Array();
    imageDB['reference_manual']['off'] = new Image(130,20);
    imageDB['reference_manual']['off'].src=imagepath + "reference_manual-m.gif";
    imageDB['reference_manual']['on'] = new Image(130,20);
    imageDB['reference_manual']['on'].src=imagepath + "reference_manual-s.gif";

    imageDB['runtime_system']=new Array();
    imageDB['runtime_system']['off'] = new Image(130,20);
    imageDB['runtime_system']['off'].src=imagepath + "runtime_system-m.gif";
    imageDB['runtime_system']['on'] = new Image(130,20);
    imageDB['runtime_system']['on'].src=imagepath + "runtime_system-s.gif";

    imageDB['powerforms']=new Array();
    imageDB['powerforms']['off'] = new Image(130,20);
    imageDB['powerforms']['off'].src=imagepath + "powerforms-m.gif";
    imageDB['powerforms']['on'] = new Image(130,20);
    imageDB['powerforms']['on'].src=imagepath + "powerforms-s.gif";

    imageDB['javawig']=new Array();
    imageDB['javawig']['off'] = new Image(130,20);
    imageDB['javawig']['off'].src=imagepath + "javawig-m.gif";
    imageDB['javawig']['on'] = new Image(130,20);
    imageDB['javawig']['on'].src=imagepath + "javawig-s.gif";

    imageDB['people']=new Array();
    imageDB['people']['off'] = new Image(130,20);
    imageDB['people']['off'].src=imagepath + "people-m.gif";
    imageDB['people']['on'] = new Image(130,20);
    imageDB['people']['on'].src=imagepath + "people-s.gif";

    imageDB['publications']=new Array();
    imageDB['publications']['off'] = new Image(130,20);
    imageDB['publications']['off'].src=imagepath + "publications-m.gif";
    imageDB['publications']['on'] = new Image(130,20);
    imageDB['publications']['on'].src=imagepath + "publications-s.gif";

    imageDB['presentations']=new Array();
    imageDB['presentations']['off'] = new Image(130,20);
    imageDB['presentations']['off'].src=imagepath + "presentations-m.gif";
    imageDB['presentations']['on'] = new Image(130,20);
    imageDB['presentations']['on'].src=imagepath + "presentations-s.gif";

    imageDB['download']=new Array();
    imageDB['download']['off'] = new Image(130,20);
    imageDB['download']['off'].src=imagepath + "download-m.gif";
    imageDB['download']['on'] = new Image(130,20);
    imageDB['download']['on'].src=imagepath + "download-s.gif";

    imageDB['contact']=new Array();
    imageDB['contact']['off'] = new Image(130,20);
    imageDB['contact']['off'].src=imagepath + "contact-m.gif";
    imageDB['contact']['on'] = new Image(130,20);
    imageDB['contact']['on'].src=imagepath + "contact-s.gif";

    ready = true;
  }
};

function getDownloadImages() {
  if (document.images) {
    imageDB['old_versions']=new Array();
    imageDB['old_versions']['off'] = new Image(130,20);
    imageDB['old_versions']['off'].src=imagepath + "old_versions-m.gif";
    imageDB['old_versions']['on'] = new Image(130,20);
    imageDB['old_versions']['on'].src=imagepath + "old_versions-s.gif";

    getToplevelImages()
   }
};

function getPowerFormsImages() {
  if (document.images) {
    imageDB['pf_syntax']=new Array();
    imageDB['pf_syntax']['off'] = new Image(130,20);
    imageDB['pf_syntax']['off'].src=imagepath + "pf_syntax-m.gif";
    imageDB['pf_syntax']['on'] = new Image(130,20);
    imageDB['pf_syntax']['on'].src=imagepath + "pf_syntax-s.gif";

    imageDB['pf_download']=new Array();
    imageDB['pf_download']['off'] = new Image(130,20);
    imageDB['pf_download']['off'].src=imagepath + "pf_download-m.gif";
    imageDB['pf_download']['on'] = new Image(130,20);
    imageDB['pf_download']['on'].src=imagepath + "pf_download-s.gif";

    imageDB['pf_examples']=new Array();
    imageDB['pf_examples']['off'] = new Image(130,20);
    imageDB['pf_examples']['off'].src=imagepath + "pf_examples-m.gif";
    imageDB['pf_examples']['on'] = new Image(130,20);
    imageDB['pf_examples']['on'].src=imagepath + "pf_examples-s.gif";

    imageDB['pf_tutorial']=new Array();
    imageDB['pf_tutorial']['off'] = new Image(130,20);
    imageDB['pf_tutorial']['off'].src=imagepath + "pf_tutorial-m.gif";
    imageDB['pf_tutorial']['on'] = new Image(130,20);
    imageDB['pf_tutorial']['on'].src=imagepath + "pf_tutorial-s.gif";

    getStandAloneImages()
   }
};

//    imageDB['']=new Array();
//    imageDB['']['off'] = new Image(130,20);
//    imageDB['']['off'].src=imagepath + "-m.gif";
//    imageDB['']['on'] = new Image(130,20);
//    imageDB['']['on'].src=imagepath + "-s.gif";

function select(_sect) {
   if (ready) document.images[_sect].src=imageDB[_sect]['on'].src;
   return true;
};

function deselect(_sect) {
   if (ready) document.images[_sect].src=imageDB[_sect]['off'].src;
   return true;
};

function setCurrent(_sect) {
   document.images[_sect].src=imagepath + _sect + "-b.gif";
   return true;
};

// -->
