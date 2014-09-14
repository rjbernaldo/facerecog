$(document).ready(function(){
  $('#new-login-form').on('submit', function(event){
    event.preventDefault();
    new_login = $.ajax({
      url: event.target.action,
      type: 'POST',
      data: $('#new-login-form').serialize()
    })

    new_login.success(function(data){
      $('#login-table').append(data)
    })
    new_login.fail(function(data){
      console.log("failure!")
      console.log(data)
    })
  })
})