window.onload = function() {
var proList    = document.querySelectorAll(".proLink")
var userInput  = document.querySelector("#icon_telephone")
var meow1 = document.querySelectorAll(".meow1")
userInput = "amarz94"
function resumeLoad() {
    var gitUser = "https://api.github.com/users/" + userInput
    var gitRepo = "https://api.github.com/users/" + userInput + "/repos"
    $.ajax({
        url: gitUser,
        method: "GET"
    }).then(function(response){
        console.log(response)
        document.getElementById("introText").innerHTML = "My name is " + response.name + ", and I am a software developer"
        document.getElementById("bioText").innerHTML = response.bio
        $("img").attr("src", response.avatar_url)
        $("img")
        .css('width', 'auto')
        .css('max-width', '250px')
        .css('height', 'auto')
        .css('max-height', '300px')
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
resumeLoad();

}