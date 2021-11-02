// Copyright (c) 2020, Ahmed Al-Farran and contributors
// For license information, please see license.txt
var dirty = 0;
var site_name = "";
frappe.ui.form.on('Theme Settings', {
  refresh: function(frm) {
   
  },
  onload: function(frm){
    frappe.call({
      method: "theming_tool.theming_tool.doctype.theme_settings.theme_settings.get_site_name",
      callback: function(r) {
        site_name = r.message;
      }
    });
  },
  font: function(frm) {
    if (!frm.doc.font) {
      frm.doc.font_path = undefined;
      frm.refresh_fields("font_path");
      $("body, h1, h2, h3, h4, h5, h6").css("font-family", "unset");
    }
  },
  before_save: function(frm) {
    var style = "";
    if (frm.is_dirty()) {
      dirty = 1;
    }
    //Font
    if (frm.doc.font_path) {
      var file_name = frm.doc.font_path.substring(frm.doc.font_path.lastIndexOf('/') + 1);
      style = style + "@font-face {\nfont-family: CustomFont;\nsrc: url('/assets/" + site_name + "/theme/font/" + file_name + "') format('truetype');\n}\n";
      style = style + "body, h1, h2, h3, h4, h5, h6{\nfont-family: CustomFont !important;\n}\n"
    }
    // Buttons
    if(frm.doc.primary_button){
      $('.btn-primary').css("background-color", frm.doc.primary_button);
      style = style + (".btn-primary" + " {\nbackground-color : " + frm.doc.primary_button + "!important; " + "\n}\n");
    }
    if(frm.doc.secondary_button){
      $('.btn-secondary').css("background-color", frm.doc.secondary_button);
      style = style + (".btn-secondary" + " {\nbackground-color : " + frm.doc.secondary_button + " !important; " + "\n}\n");
    }
    //Login Page
    if(frm.doc.page_logo){
      style = style + ".login-logo{\nwidth:100px !important;\nheight: 100px !important;\nbackground: url('" +frappe.urllib.get_base_url()+ frm.doc.page_logo  + "');\nbackground-size: cover;\nmargin: 0 auto;\n}\n";
      
    }
    if(frm.doc.page_title){
      style = style + (".title:after" + " {\ncontent : "+"'"+frm.doc.page_title+"'"+"\n}\n");
    }
    if(frm.doc.navbar_title){
      style = style + (".navbar-brand span::after" + " {\ncontent : "+"'"+frm.doc.navbar_title+"'"+"\n}\n");
    }
    //Banner
    if (frm.doc.logo){
        style = style + (".banner" + " {\nbackground-image: url('" + frappe.urllib.get_base_url()+ frm.doc.logo + "') !important;\nheight: " + frm.doc.banner_height + "vh;\nbackground-repeat: no-repeat;\nbackground-size: contain;" + "\n}\n");
    }
    // Navbar logo
    if(frm.doc.navbar_logo){
      //var image_name_logo = frm.doc.navbar_logo.substring(frm.doc.navbar_logo.lastIndexOf('/') + 1);
      //const image_url = "https://www.pccr.edu.ph/wp-content/uploads/2021/04/seal-RV-1.png"
      style = style + "div.custom_logo {\nwidth:40px !important;\nheight: 40px !important;\nbackground: url('" +frappe.urllib.get_base_url()+ frm.doc.navbar_logo  + "');\nbackground-size: cover;\n}\n";
    }
    //Navabar background
    if(frm.doc.navbar){
      $('.navbar').css("background-color", frm.doc.navbar);
      style = style + (".navbar" + " {\nbackground-color : " + frm.doc.navbar + "\n}\n");
    }
    if(frm.doc.header){
      $('.page-head').css("background-color", frm.doc.header);
      style = style + (".page-head" + " {\nbackground-color : " + frm.doc.header + "\n}\n");
    }
    if(frm.doc.content){
      $('.page-container').css("background-color", frm.doc.content);
      style = style + (".page-container" + " {\nbackground-color : " + frm.doc.content + "\n}\n");
    }
    if(frm.doc.side_bar){
      $('.layout-side-section').css("background-color", frm.doc.side_bar);
      style = style + (".layout-side-section" + " {\nbackground-color : " + frm.doc.side_bar + "\n}\n");
    }
    if(frm.doc.card){
      $('.widget').css("background-color", frm.doc.card);
      style = style + (".widget" + " {\nbackground-color : " + frm.doc.card + "\n}\n");
    }
    for (var i = 0; i < frm.doc.elements_colors.length; i++) {
      if (frm.doc.elements_colors.length > 0) {
        $(frm.doc.elements_colors[i].class).css("background-color", frm.doc.elements_colors[i].color);
        style = style + (frm.doc.elements_colors[i].class + " {\nbackground-color : " + frm.doc.elements_colors[i].color + " !important;" +  "\n}\n");
      }
    }
    frm.doc.theme_scss = style;
    frm.refresh_fields("theme_scss");
  },
  after_save: function(frm) {
    if (dirty) {
      location.reload();
    }
  }
});
