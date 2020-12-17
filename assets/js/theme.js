$(function() {
    let username = localStorage.getItem('github-user');
    let phoneNum = localStorage.getItem('phone');
    let userEmail = localStorage.getItem('user-email');
    let userProfile = localStorage.getItem('user-profile');
    let userAddr = localStorage.getItem('user-address');
    let workTitle = localStorage.getItem('work-title');

    const query = `https://api.github.com/users/${username}`;
    const queryRepos = `https://api.github.com/users/${username}/repos?sort=create&direction=desc`;

    $.ajax({
        url: query,
        method: "GET",
        header: 'application/vnd.github.v3+json',
        data:{
            client_id: '0d452db0c649148903b5',
            client_secret: '298bbab2e58195464b3f37644da1b5623cada3f0'
        }
    }).then(function(response) {
        console.log(response)
        $('#profile-img').html(`
        <img src="${response.avatar_url}" alt="User Profile Image" aria-label="User Profile Image">
        <span class="card-title hide-on-med-and-up">${response.name}</span>
        `);
        $('#user-profile').html(`
        <h4 class="center">Profile</h4>
            <p>${userProfile}</p>
            <br>
            <hr>
            <h4 class="center">Contacts</h4>
            <div class="row">
                <p><i class="fas fa-map-marked"></i> <span>${userAddr}</span></p>
                <p><i class="fas fa-phone"></i> <span><a href="tel:${phoneNum}" arial-label="Call me!" class="black-text darken-4">${formatPhoneNumber(phoneNum)}</a></span></p>
                <p><i class="fas fa-at"></i> <span><a href="mailto:${userEmail}" arial-label="Email me!" class="black-text darken-4">${userEmail}</a></span></p>
            </div>
        `);
        
        $.ajax({
            url: queryRepos,
            method: 'GET',
            header: 'application/vnd.github.v3+json',
            data: {
                client_id: '0d452db0c649148903b5',
                client_secret: '298bbab2e58195464b3f37644da1b5623cada3f0'
            }
        }).then(function(response) {
            $('#repos').html(`
            <div class="card-title center">My 10 Newest Repos</div>
            <div class="row">
                <table class="highlight responsive-table centered">
                    <thead>
                      <tr>
                          <th>Name</th>
                      </tr>
                    </thead>
            
                    <tbody id="repo-list">
                      
                    </tbody>
                  </table>
                </div>
            </div>
            `);
            for (let i = 0; i < 10; i++) {
                $('#repo-list').append(`
                <tr>
                    <td>${response[i].name}</td>
                </tr>
                `);
            }
        })

        });

    function formatPhoneNumber(phoneNum) {
        let cleaned = ('' + phoneNum).replace(/\D/g, '')
        let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          let intlCode = (match[1] ? '+1 ' : '')
          return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return null
    }

})
