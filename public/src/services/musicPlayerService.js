export default function(musicTimerService) {
  this.featuredSong;
  this.currentSong;

  this.play = (audio, index) => {
    this.currentSong = audio;
    this.currentSong.play();
    //musicTimerService.createTimer(this.currentSong, index);
  }
  this.pause = audio => {
    if(this.currentSong) {
      this.currentSong.pause();
    }
  }


  function playSong(artists, index) {
    const artworkContainer = `.showImage${index}`
    const artwork = angular.element(document.querySelector(artworkContainer));
    artwork.addClass('active');
    if (songRef && songRef === currentSong.previewUrl) {
      if(musicPlayerService.featuredSong) {
        musicPlayerService.featuredSong.pause();
      }
      currentSongAudio.play();
    } else {
      if(musicPlayerService.featuredSong) {
        musicPlayerService.featuredSong.pause();
      }
      createSong(artists, index);
    }
  };

  function stopSong(index) {
    const artwork = angular.element(document.querySelector(`.showImage${index}`));
    artwork.removeClass('active');
    currentSongAudio.pause();
  };

  function checkPreviewUrl(songPreviews) {
    if(!songPreviews[songCounter].previewUrl) {
      songCounter++;
      checkPreviewUrl(songPreviews);
    }
  };

  function incrementSong(songPreviews, artists) {
    //if it's the last song, set it to 0. If not, increment.
    if (songCounter === songPreviews.length - 1) {
      songCounter = 0;
    } else if (artistCounter === artists.length - 1) {
      artistCounter = 0;
      songCounter++;
    } else {
      artistCounter++;
    }
  };

  function createSong(artists, index) {
    //console.log(artistData);
    let songPreviews = artists[artistCounter].songPreviews;
    checkPreviewUrl(songPreviews);
    currentSong = songPreviews[songCounter];

    let songName = currentSong.songName;
    let artistName = currentSong.artistName;
    let audio = new Audio(currentSong.previewUrl);

    vm.byline = `${songName} by ${artistName}`;
    if(index === "Featured") {
      currentSongAudio = audio;
      musicPlayerService.featuredSong = audio;
    } else {
      currentSongAudio = audio;
    }
    songRef = currentSong.previewUrl;
    vm.albumArt = currentSong.songArtworkUrl;
    vm.apply(); //make sure all changes to vm get applied, including byline and albumArt

    //create JQuery knob
    musicTimerService.createTimer(currentSongAudio, index);

    //change the artwork to the current song artwork
    $(`img.showImage${index}.artwork`).attr('src', currentSong.songArtworkUrl);

    //play the audio
    currentSongAudio.play();

    //set up an event listener for when the audio ends
    $(currentSongAudio).on("ended", function() {
      //if it's the last song, set it to 0. If not, increment.
      incrementSong(songPreviews, artists);
      createSong(artists, index);
    });
  };
}
