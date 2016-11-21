export default function($http) {

   this.getMusicPreviews = shows => {
    const promiseArray = [];
    shows.data.Events.forEach(event => {
      event.Artists.forEach(function(artist) {
        event.artistData = [];
        artist.Name = artist.Name.trim();
        const nameQuery = artist.Name.split(" ").join("+");
        promiseArray.push(new Promise((resolve, reject) => {
          $http.jsonp(`https://itunes.apple.com/search?term=${nameQuery}&entity=musicTrack&limit=10&callback=JSON_CALLBACK`,
          ).success(iTunes => {
            if(!iTunes || iTunes.status !== 200) {
              artist.songPreviews = null;
              artist.artistArtworkUrl = null;
              resolve();
            }
            let artistArtworkUrl;
            const songPreviews = [];
              for(let i = 0; i < iTunes.results.length; i++) {
                const song = iTunes.results[i];
                if(song.artistName === artist.Name) {
                  songPreviews.push({
                    songName: song.trackName
                    , artistName: song.artistName
                    , previewUrl: song.previewUrl
                    , songArtworkUrl: song.artworkUrl100.replace("100x100", "400x400")
                  });
                  //if this is the first result that's come back correct, let's add the artist artwork Url right away
                  if(songPreviews.length === 1) {
                    artistArtworkUrl = song.artworkUrl100.replace('100x100', '400x400');
                  }
                  if(songPreviews.length === 5) {
                    break;
                  }
               };
              };
              /* if no songs were found with the exact artist name, chances are
              there's a problem with the way JamBase coded it. Let's trust iTunes for
              now and just assign the artist song previews based on the first
              five results */
              if(songPreviews.length === 0 ) {
                const shortenedResponse = iTunes.results.slice(0, 5);
                if(shortenedResponse[0]) {
                  artistArtworkUrl = shortenedResponse[0].artworkUrl100.replace("100x100", "400x400");
                }
                shortenedResponse.forEach(function(song) {
                  songPreviews.push({
                    songName: song.trackName
                    , artistName: song.artistName
                    , previewUrl: song.previewUrl
                    , songArtworkUrl: song.artworkUrl100.replace("100x100", "400x400")
                  });
                });
              }

            const artistData = {
              name: artist.Name
              , artistArtworkUrl
              , songPreviews
            }
            //event.artistData.push(artistData);
            artist.songPreviews = songPreviews;
            artist.artistArtworkUrl = artistArtworkUrl;
            $http.post('/api/artist', artistData);
            resolve();
          })
        }));
      });
    });
    return Promise.all(promiseArray).then(() => {
      return shows;
    })
  }
  this.getSamplePreviews = () => {
   const promiseArray = [];
   JamBaseTestData.data.Events.forEach(event => {
     event.Artists.forEach(function(artist) {
       event.artistData = [];
       artist.Name = artist.Name.trim();
       const nameQuery = artist.Name.split(" ").join("+");
       promiseArray.push(new Promise((resolve, reject) => {
         $http.jsonp(`https://itunes.apple.com/search?term=${nameQuery}&entity=musicTrack&callback=JSON_CALLBACK`
         ).then(iTunes => {
           let artistArtworkUrl;
           const songPreviews = [];
             for(let i = 0; i < iTunes.data.results.length; i++) {
               const song = iTunes.data.results[i];
               if(song.artistName === artist.Name) {
                 songPreviews.push({
                   songName: song.trackName
                   , artistName: song.artistName
                   , previewUrl: song.previewUrl
                   , songArtworkUrl: song.artworkUrl100.replace("100x100", "400x400")
                 });
                 //if this is the first result that's come back correct, let's add the artist artwork Url right away
                 if(songPreviews.length === 1) {
                   artistArtworkUrl = song.artworkUrl100.replace('100x100', '400x400');
                 }
                 if(songPreviews.length === 5) {
                   break;
                 }
               }
             }
             if(songPreviews.length === 0 ) {
               const shortenedResponse = iTunes.data.results.slice(0, 5);
               if(shortenedResponse[0]) {
                 artistArtworkUrl = shortenedResponse[0].artworkUrl100.replace("100x100", "400x400");
               }
               shortenedResponse.forEach(function(song) {
                 songPreviews.push({
                   songName: song.trackName
                   , artistName: song.artistName
                   , previewUrl: song.previewUrl
                   , songArtworkUrl: song.artworkUrl100.replace("100x100", "400x400")
                 });
               });
             }
           const artistData = {
             name: artist.Name
             , artistArtworkUrl
             , songPreviews
           }
           //event.artistData.push(artistData);
           artist.songPreviews = songPreviews;
           artist.artistArtworkUrl = artistArtworkUrl;
           $http.post('/api/artist', artistData);
           resolve();
         })
       }));
     });
   });
   return JamBaseTestData;
 }
}
