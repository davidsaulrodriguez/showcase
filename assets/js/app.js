$(function() {
    $('#username').on('keyup', function(e) {
        let username = e.target.value;
        let gitUser = `https://api.github.com/users/${username}`
        $.ajax({
            url: gitUser,
            method: "GET",
            header: 'application/vnd.github.v3+json',
            data:{
                client_id: '43047fd37fca2afb2331',
                client_secret: '9021b23249c46c36eb12b1d6324e282ab01b755f'
            }
        }).then(function(response){
            $('#userimg').attr('src', response.avatar_url);
            let name = response.name.split(" ");
            $('#users-name').html(`Hey there, ${name[0]}!<i class="material-icons right" title="Learn why we need this info!">help</i>`);
        })
    });
    
    
    $('#submit').on('click', function(event) {        
        let resumeType = $('#default-resume').val();
        let username = $('#username').val();
        let userEmail = $('#email').val();
        let userProfile = $('#user-profile').val();
        let userAddr = $('#address').val();
        let phoneNum = $('#phone').val();
        let themeStyle = $('select').val();
        let workTitle = $('work-title').val();
        localStorage.setItem("github-user", username);
        localStorage.setItem("user-email", userEmail);
        localStorage.setItem('phone', phoneNum);
        localStorage.setItem('user-profile', userProfile);
        localStorage.setItem('user-address', userAddr);
        localStorage.setItem('work-title', workTitle);
        $('#user-form').attr('action', themeStyle).val();
    })

    // Home page modals and mobile sidenav
    $('.sidenav').sidenav();
    $('#terms').modal();
    $('#privacy').modal();
    $('select').formSelect();
});
