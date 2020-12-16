window.onload = function() {
var proList    = document.querySelectorAll(".proLink")
let username = localStorage.getItem('github-user');
let phoneNum = localStorage.getItem('phone');
let userEmail = localStorage.getItem('user-email');
let userProfile = localStorage.getItem('user-profile');
let userAddr = localStorage.getItem('user-address');
let workTitle = localStorage.getItem('work-title');

function resumeLoad() {
    var gitUser = "https://api.github.com/users/" + username
    var gitRepo = "https://api.github.com/users/" + username + "/repos"

    $.ajax({
        url: gitUser,
        method: "GET"
    }).then(function(response){
        console.log(response)
        document.getElementById("introText").innerHTML = "My name is " + response.name + ", and I am a " + workTitle + "."
        document.getElementById("bioText").innerHTML = userProfile
        $(".userSite").innerHTML = "Site: " + response.blog
        $("img").attr("src", response.avatar_url)
        $("img")
        .css('width', 'auto')
        .css('max-width', '250px')
        .css('height', 'auto')
        .css('max-height', '300px')
        document.getElementById("address").textContent = "Address: " + userAddr
        document.getElementById("emailInput").textContent = "Email: " + userEmail
        document.getElementById("userPhone").textContent = "Phone Number: " + formatPhoneNumber(phoneNum)
        document.getElementById("userSite").textContent = "Site: " + response.blog
        $.ajax({
            url: gitRepo,
            method: "GET"
        }).then(function(response){
            for(i = 0; i < proList.length; i++){
                var projectLink = document.createElement("li")
                proList[i].innerHTML = ""
                projectLink.innerHTML = "<a href=" + response[i].html_url + ">" + response[i].html_url + "</a>"
                proList[i].append(projectLink)
            }
        })
    })
}
function formatPhoneNumber(phoneNum) {
    let cleaned = ('' + phoneNum).replace(/\D/g, '')
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      let intlCode = (match[1] ? '+1 ' : '')
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
}

resumeLoad();

}