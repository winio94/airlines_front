function openLoginForm()
{
  if ($("#login_form").is(":hidden")){
    $("#login_form").slideDown("slow");
  }
  else{
    $("#login_form").slideUp("slow");
  }
}
