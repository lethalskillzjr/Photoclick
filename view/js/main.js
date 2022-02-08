//Navbar script
 var mainNav = document.getElementById("mainNav");
        
$(".Navbar-toggler").click(function mainNavToggler() {
      mainNav.classList.toggle('Navbar-expand');
 });
        
//Collection script
/*var firstItem = $(".second-collection").detach();
 var secondItem = $(".third-collection").detach();*/
        
 var collection = [firstItem, secondItem];
        
 //Quantity counter script
function decrementQuantity(){
     var quantityValue = document.getElementById("quantityField");
          quantityValue.stepDown(1);
}
        
function incrementQuantity(){
    var quantityValue = document.getElementById("quantityField");
    quantityValue.stepUp(1);
}

//Script test
function globalTest(){
  var Viewport = document.querySelector("body");
  var i = 768px;
  if(Viewport.style.width < i){
    console.log("operation plausible");
  }
  return
}

$("button").click(function(){
  globalTest();
});
