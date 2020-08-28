function searchMovie(){
    $('#movie-list').html('')
    $.ajax({
        url:'http://omdbapi.com',
        type:'get',
        dataType:'json',
        data:{
            'apikey':'e98d2607',
            's':  $('#search-input').val()
        },
        success: function(result){
            if(result.Response === "True"){
                let movies = result.Search;
                $.each(movies, function(i, data){
                    $('#movie-list').append(`
                    <div class="col-md-4">
                    <div class="card mb-3" style="width: 18rem;">
                        <img src="`+ data.Poster+`" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">`+data.Title+`</h5>
                          <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                          <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+data.imdbID+`">See Details</a>
                        </div>
                    </div>
                    </div>
                    `);
                });
            }else{
                $('#movie-list').html('<h1>Movie Not Found</h1>')
            }
        }
    });
}

$('#Btn-Search').on('click',function(){
    searchMovie();
});

$('#search-input').on('keyup',function(e){
    if(e.keyCode === 13){
        searchMovie();
    }
}) 

$('#movie-list').on('click','.see-detail',function(){
    console.log($(this).data('id'))

    $.ajax({
        url:'http://omdbapi.com',
        type:'get',
        dataType:'json',
        data:{
            'apikey':'e98d2607',
            'i': $(this).data('id')
        },
        success: function(mov){
            if(mov.Response === 'True'){
                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="`+mov.Poster+`" class="img-fluid">  
                        </div>
                        <div class="col-md-8 ">
                            <ul class="list-group">
                            <li class="list-group-item"><h3>`+ mov.Title+`</h3></li>
                            <li class="list-group-item">`+ mov.Released+`</li>
                            <li class="list-group-item">`+ mov.Genre+`</li>
                            <li class="list-group-item">`+ mov.Director+`</li>
                            <li class="list-group-item">`+ mov.Actors+`</li>
                            </ul>
                        </div>
                    </div>
                <div>
                `)
            }
        }
    })
})