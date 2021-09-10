$(document).ready(function(){
    if(window.location.href === window.location.origin + "/#login"){
        $('#page-login').html(`
            <div class="banner w-100" >Banner</div>
        `)
    }
  });