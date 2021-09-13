$(document).ready(function(){
    if(window.location.href === window.location.origin + "/#login"){
        $('#page-login').html(`
            <div class="banner w-100" ></div>
        `)
    }
    $('.page-card-head').html(`
            <div class="login-logo"></div>
            <h5 class="title"></h5>
    `)
    $('.navbar-brand').html('<span></span>')
    $('.navbar-home').html('<div class="custom_logo"></div>');
  });