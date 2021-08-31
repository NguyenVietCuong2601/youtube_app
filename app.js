$(document).ready(function() {
    
    var key = 'AIzaSyAc7zM-meoRJT9OTEWQ5-1e6NOV_WogR04';
    var playlistId = 'PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 12,
        playlistId: playlistId,
    }

    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function(data) {
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        })
    }

    function mainVid(id) {
        $('#video').html(`
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `);
    }

    function resultsLoop(data) {

        $.each(data.items, function(i, item) {
            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;
            
            $('main').append(`
                <article class="item" data-key="${vid}">
                <img src="${thumb}" alt="" class="thumb">
    
                <div class="details">
                    <h4>${title}</h4>
                    <p>${desc}</p>
                </div>
                </article>
            `);
        });
    }

    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });

});