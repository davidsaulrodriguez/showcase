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
            client_id: '43047fd37fca2afb2331',
            client_secret: '9021b23249c46c36eb12b1d6324e282ab01b755f'
        }
    }).then(function(response) {
        console.log(response)
        $('#profile-img').html(`
        <img src="${response.avatar_url}" alt="User Profile Image" aria-label="User Profile Image">
        <span class="card-title hide-on-med-and-up">${response.name}</span>
        <a href="tel:+1${phoneNum}" arial-label="Call me!" title="Give me a call." id="user-phone" class="btn-floating left halfway-fab waves-effect waves-light blue darken-4">
            <i class="material-icons">phone</i>
        </a>
        <a href="mailto:${userEmail}" arial-label="Email me!" title="Send me an email." id="user-email" class="btn-floating halfway-fab waves-effect waves-light blue darken-2">
            <i class="material-icons">send</i>
        </a>
        `);
        $('#user-profile').html(`
        <h4 class="center">Profile</h4>
            <p>${userProfile}</p>
            <br>
            <hr>
            <h4 class="center">Contacts</h4>
            <div class="row">
                <p><i class="fas fa-map-marked"></i> <span>${userAddr}</span></p>
                <p><i class="fas fa-phone"></i> <span><a href="tel:${phoneNum}" arial-label="Call me!" class="purple-text darken-4">${formatPhoneNumber(phoneNum)}</a></span></p>
                <p><i class="fas fa-at"></i> <span><a href="mailto:${userEmail}" arial-label="Email me!" class="purple-text darken-4">${userEmail}</a></span></p>
                <p><i class="fas fa-link"></i> <span><a href="${response.blog}" arial-label="Checkout my website/blog." class="purple-text darken-4" target="_blank" rel="noopener noreferrer">${response.blog}</a></span></p>
            </div>
        `);
        if (response.twitter_username === null) {
            $('#name-title-social').html(`
            <p class="center">
                <a href="javascript:history.back()" class="left red-text" id="backBtn" title="Go back to the home page.">
                    <i class="fas fa-backward"></i>
                </a>
                <a href="https://github.com/${username}" aria-label="Checkout my GitHub Profile." class="black-text" target="_blank"><i class="fab fa-github fa-2x"></i></a>
            </p>
            <div class="card-title center"><h2>${response.name}</h2></div>
            <p class="center flow-text">${workTitle}</p>
            `);
        } else {
            $('#name-title-social').html(`
            <p class="center">
                <a href="javascript:history.back()" class="left red-text" id="backBtn" title="Go back to the homepage.">
                    <i class="fas fa-backward"></i>
                </a>
                <a href="https://github.com/${username}" aria-label="Checkout my GitHub Profile." class="black-text" target="_blank"><i class="fab fa-github fa-2x"></i></a>
                <a href="https://twitter.com/${response.twitter_username}" aria-label="Follow me on Twitter." class="blue-text" target="_blank"><i class="fab fa-twitter fa-2x"></i></a>
            </p>
            <div class="card-title center"><h2>${response.name}</h2></div>
            <p class="center flow-text">${workTitle}</p>
            `);
        }
        $.ajax({
            url: queryRepos,
            method: 'GET',
            header: 'application/vnd.github.v3+json',
            data: {
                client_id: '43047fd37fca2afb2331',
                client_secret: '9021b23249c46c36eb12b1d6324e282ab01b755f'
            }
        }).then(function(response) {
            $('#repos').html(`
            <div class="card-title center">My 5 Most Recently Created Repos</div>
            <p class="center">Sorted by newest</p>
            <div class="row">
                <table class="highlight responsive-table centered">
                    <thead>
                      <tr>
                          <th>Name</th>
                          <th>Forks</th>
                          <th>Stars</th>
                          <th>Open Issues</th>
                          <th>Repo</th>
                      </tr>
                    </thead>
            
                    <tbody id="repo-list">
                      
                    </tbody>
                  </table>
                </div>
            </div>
            `);
            for (let i = 0; i < 5; i++) {
                $('#repo-list').append(`
                <tr>
                    <td>${response[i].name}</td>
                    <td>${response[i].forks_count}</td>
                    <td>${response[i].stargazers_count}</td>
                    <td>${response[i].open_issues}</td>
                    <td><a href="${response[i].url}" class="btn purple darken-4">Visit</a></td>
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
