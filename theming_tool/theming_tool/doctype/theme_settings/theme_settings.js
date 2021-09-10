// Copyright (c) 2020, Ahmed Al-Farran and contributors
// For license information, please see license.txt
var dirty = 0;
var site_name = "";
frappe.ui.form.on('Theme Settings', {
  refresh: function(frm) {
    console.log(site_name)
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
    if (frm.doc.font_path) {
      var file_name = frm.doc.font_path.substring(frm.doc.font_path.lastIndexOf('/') + 1);
      style = style + "@font-face {\nfont-family: CustomFont;\nsrc: url('/assets/" + site_name + "/theme/font/" + file_name + "') format('truetype');\n}\n";
      style = style + "body, h1, h2, h3, h4, h5, h6{\nfont-family: CustomFont !important;\n}\n"
    }
    if (frm.doc.logo){
      var image_name = frm.doc.logo.substring(frm.doc.logo.lastIndexOf('/') + 1);
      style = style + "img.app-logo {\nwidth:"+frm.doc.logo_width + "px !important;\nheight: 0px !important;\npadding: 13px !important;\nbackground: url('/assets/" + site_name + "/theme/images/" + image_name + "');\nbackground-size: cover;\n}\n";
    }
    if(frm.doc.navbar){
      $('.navbar').css("background-color", frm.doc.navbar);
      style = style + (".navbar" + " {\nbackground-color : " + frm.doc.navbar + "\n}\n");
    }
    if(frm.doc.header.length > 0){
      $('.page-head').css("background-color", frm.doc.header);
      style = style + (".page-head" + " {\nbackground-color : " + frm.doc.header + "\n}\n");
    }
    if(frm.doc.content.length > 0){
      $('.page-container').css("background-color", frm.doc.content);
      style = style + (".page-container" + " {\nbackground-color : " + frm.doc.content + "\n}\n");
    }
    if(frm.doc.side_bar.length > 0){
      $('.layout-side-section').css("background-color", frm.doc.side_bar);
      style = style + (".layout-side-section" + " {\nbackground-color : " + frm.doc.side_bar + "\n}\n");
    }
    if(frm.doc.card.length > 0){
      $('.widget').css("background-color", frm.doc.card);
      style = style + (".widget" + " {\nbackground-color : " + frm.doc.card + "\n}\n");
    }
    for (var i = 0; i < frm.doc.elements_colors.length; i++) {
      if (frm.doc.elements_colors.length > 0) {
        $(frm.doc.elements_colors[i].class).css("background-color", frm.doc.elements_colors[i].color);
        style = style + (frm.doc.elements_colors[i].class + " {\nbackground-color : " + frm.doc.elements_colors[i].color + "\n}\n");
      
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
