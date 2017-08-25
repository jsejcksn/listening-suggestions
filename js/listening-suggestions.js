(() => {
  'use strict';

  const suggestionKeys = [
    'found',
    'service',
    'link',
    'title',
    'artist',
    'genres',
    'year',
    'publisher',
    'duration',
    'comment',
    'contributor'
  ];

  const gApiKey = 'AIzaSyDTAWpCD--E2dqnym_xvHE0KUCu5IdoMKY';
  const gAuthInit = {
    mode: 'cors'
  };

  // fetch('samples/responses-sample.json')
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/1yxqhKjMc06UxGawWJ1N6-vXlRP0dBV0l0AMSUtrI8YY/values/Form%20Responses%201?key=${gApiKey}`, gAuthInit)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => init(data))
  .catch(err => console.log(`Fetch problem: ${err}`));

  function init (data) {
    writeComponents(reOrg(data.values, suggestionKeys));
  }

  function reOrg (arr3d, arrKeys) {
    let organized = [];
    for (var i = 1, h = arr3d.length; i < h; i++) {
      organized.push({});
    }
    for (var j = 0; j < arrKeys.length; j++) {
      for (var k = 1; k < h; k++) {
        if (arr3d[k][j + 1]) {
          organized[k - 1][arrKeys[j]] = arr3d[k][j + 1].trim();
        }
      }
    }
    return organized;
  }

  function writeComponents (arr) {
    for (var i = 0; i < arr.length; i++) {
      let x = arr[i];
      let h = '<div class="card">';
      // h += '<div class="art"><img src="images/artwork-not-available.jpg" /></div>';
      h += `<section><h2 class="title">${x.title}</h2><p class="artist">${x.artist}</p>`;
      if (x.year || x.publisher) {
        h += '<p class="published">';
        if (x.year) {
          h += `<span class="year">${x.year}</span>`;
        }
        if (x.year && x.publisher) {
          h += ' • ';
        }
        if (x.publisher) {
          h += `<span class="publisher">${x.publisher}</span>`;
        }
        h += '</p>';
      }
      if (x.duration || x.genres) {
        h += '<p class="vitals">';
        if (x.duration) {
          h += `<span class="duration">${x.duration} min</span>`;
        }
        if (x.duration && x.genres) {
          h += ' • ';
        }
        if (x.genres) {
          h += `<span class="genres">${x.genres.toLowerCase()}</span>`;
        }
        h += '</p>';
      }
      if (x.comment) {
        h += `<p class="comments"><span class="label">Comment</span>&ldquo;${x.comment}&rdquo;</p>`;
      }
      if (x.contributor) {
        h += `<p class="contributor"><span class="label">Submitted by</span>${x.contributor}</p>`;
      }
      h += '<p class="links">';
      // h += '<span class="label">Links</span>';
      if (x.link) {
        if (x.service == 'Apple Music / iTunes') {
          h += `<a href="${x.link}"><img class="logo logo-service" src="images/buttons/apple-music.svg" title="Listen on Apple Music" alt="Listen on Apple Music" /></a>`;
        } else if (x.service == 'Bandcamp') {
          h += `<a href="${x.link}"><img class="logo logo-service" src="images/buttons/bandcamp.svg" title="Listen on Bandcamp" alt="Listen on Bandcamp" /></a>`;
        } else if (x.service == 'Google Play Music') {
          h += `<a href="${x.link}"><img class="logo logo-service" src="images/buttons/google-play-music.svg" title="Listen on Google Play Music" alt="Listen on Google Play Music" /></a>`;
        } else if (x.service == 'SoundCloud') {
          h += `<a href="${x.link}"><img class="logo logo-service" src="images/buttons/soundcloud.svg" title="Listen on SoundCloud" alt="Listen on SoundCloud" /></a>`;
        } else if (x.service == 'Spotify') {
          h += `<a href="${x.link}"><img class="logo logo-service" src="images/buttons/spotify.svg" title="Listen on Spotify" alt="Listen on Spotify" /></a>`;
        }
      }
      h += `<a href="https://www.google.com/search?q=${encodeURIComponent(x.title.toLowerCase())}+${encodeURIComponent(x.artist.toLowerCase())}"><img class="logo" src="images/buttons/search-google.svg" title="Search using Google" alt="Search using Google" /></a>`;
      h += '</p>';
      h += '</section>';
      h += '</div>';
      document.getElementById('content').insertAdjacentHTML('beforeend', h);
    }
  }

})();
