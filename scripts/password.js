/* password.js */
function checkPassword(filename, correctPassword) {
    var password = prompt("Please enter the password to view the PDF:");
    
    if(password == correctPassword) {
        window.open(filename, "_blank");
    } else {
        alert("Incorrect password!");
    }
}