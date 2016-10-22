function slideDownElement(element)
{
  if ($(element).is(":hidden")){
    $(element).slideDown("slow");
  }
  else{
    $(element).slideUp("slow");
  }
}
