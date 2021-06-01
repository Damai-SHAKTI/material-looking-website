// Function on window loads //
window.onload = function() {LoadFunction();};

function LoadFunction(){ 
    LoadSavedTheme();
    OnScrollProgressBar();
    console.log("===== Window Loaded! =====");
}
// Function onscroll //
window.onscroll = function() {OnScrollProgressBar(); DisplayToTopButton();};

function OnScrollProgressBar(){ // Function to set top Progressbar //
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.transition = ".0s";
  document.getElementById("myBar").style.width = scrolled + "%"; 
}
 
function DisplayToTopButton() { // Displays a goto top button on scrolling down //
  var ToTopButton = document.getElementById("btn-to-top-arrow");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    ToTopButton.style.display = "block";
  } else {
    ToTopButton.style.display = "none";
  }
}

function GoToTop(){ 
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
// Theme Modes //
const Theme = {
  LIGHT: 'Light',
  DARK: 'Dark'
}
// Changes Theme //
function ToggleTheme(TogglebyButton){
  var ImgTheme = document.getElementById("img-theme"), elms = document.querySelectorAll("#svg-path");
  var darkthemepath = ".\\pictures\\moon.png", lightthemepath = ".\\pictures\\light.png";

  if (ImgTheme.getAttribute("src") != null) {

    switch (ImgTheme.getAttribute("src")) {

      case darkthemepath:
        document.documentElement.style.setProperty('--bg-color-white', "#000");
        document.documentElement.style.setProperty('--text-color-black', "#fff");
        document.getElementById("footer").style.backgroundColor = "#424242";
        document.getElementsByTagName('meta')["theme-color"].content = "#000";
        for(var i = 0; i < elms.length; i++){
          elms[i].setAttribute("fill", "#000");
        }
        ImgTheme.setAttribute("src", lightthemepath);
        SaveTheme(Theme.DARK);
        TogglebyButton ? ShowSnackBar("Dark Theme Applied!") : null;
        console.log("===== Dark Theme Applied! =====");
        break;

      case lightthemepath:
        document.documentElement.style.setProperty('--bg-color-white', "#fff");
        document.documentElement.style.setProperty('--text-color-black', "#000");
        document.getElementById("footer").style.backgroundColor = "#f1f1f1";
        document.getElementsByTagName('meta')["theme-color"].content = "#fff";
        for(var i = 0; i < elms.length; i++){
          elms[i].setAttribute("fill", "#fff");
        }
        ImgTheme.setAttribute("src", darkthemepath);
        SaveTheme(Theme.LIGHT);
        TogglebyButton ? ShowSnackBar("Light Theme Applied!") : null;
        console.log("===== Light Theme Applied! =====");
        break;
  
      default:
        console.log("===== Invalid Theme Path! =====");
        break;
    }
  } else {
    console.log("===== No Image Source =====");
  }
}
// Saves Theme //
function SaveTheme(themevalue){
  sessionStorage.setItem('Theme', themevalue);
  console.log("===== %s Theme Saved! =====", themevalue);
}
// Loads Theme //
function LoadSavedTheme(){

  var SavedTheme = sessionStorage.getItem('Theme');
  var ImgTheme = document.getElementById("img-theme");

  if (SavedTheme != null){
    (SavedTheme == Theme.DARK) ? ImgTheme.setAttribute("src", ".\\pictures\\moon.png") : ImgTheme.setAttribute("src", ".\\pictures\\light.png");
    ToggleTheme();
  } else {
    console.log("===== No Saved Theme Found! =====");
  }

}

//Dynamic SnackBar
function ShowSnackBar(message){
  const newSnackBar = document.createElement("div");
  newSnackBar.style.visibility = "hidden"; 
  newSnackBar.style.minWidth = "250px";
  newSnackBar.style.marginLeft = "-141px";
  newSnackBar.style.background = "#1d1d1d";
  newSnackBar.style.color = "#fff";
  newSnackBar.style.textAlign = "center";
  newSnackBar.style.borderRadius = "10px";
  newSnackBar.style.padding = "16px";
  newSnackBar.style.opacity = "0";
  newSnackBar.style.position = "fixed";
  newSnackBar.style.zIndex = "1";
  newSnackBar.style.left = "50%";
  newSnackBar.style.bottom = "0px";
  newSnackBar.style.fontSize = "17px";
  newSnackBar.innerHTML = message;
  document.body.appendChild(newSnackBar);

  //Animate SnackBar
  var bottomPosition = 0;
  var Interval = setInterval(FadeInToUp, 10);

  function FadeInToUp(){
    if (bottomPosition == 30){
      clearInterval(Interval);
      setTimeout(function(){ 
        Interval = setInterval(FadeOutToBottom, 10); 
      }, 2000);
    } 
    else {
      bottomPosition++;
      newSnackBar.style.visibility = "visible"; 
      newSnackBar.style.opacity = bottomPosition * 0.03333333333;
      newSnackBar.style.bottom = bottomPosition + "px";
    }
  }

  function FadeOutToBottom(){
    if (bottomPosition == 0){
      clearInterval(Interval);
      newSnackBar.style.visibility = "hidden"; 
      document.body.removeChild(newSnackBar);
    }
    else {
      bottomPosition--;
      newSnackBar.style.opacity = bottomPosition <= 25 ? "0.8" : bottomPosition <= 20 ? "0.6" : bottomPosition <= 15 ? "0.4" : null; 
      newSnackBar.style.bottom = bottomPosition + "px";
    }
  }
}


