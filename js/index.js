document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
  var siteName=document.getElementById('siteName').value;
  var siteUrl=document.getElementById('siteUrl').value;

  if(!siteName || !siteUrl){
    alert('Please fill all the required fields.');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  var bookmark = {
    name:siteName,
    url:siteUrl
  }

  /*
  localStorage.setItem('test','Hello');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));
  */

  if(localStorage.getItem('bookmarks') === null)
  {
    var bookmarks=[];

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  else
  {
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  //Prevent form from submitting
  document.getElementById('myForm').reset();
  fetchBookmarks();
  e.preventDefault();
}

function deleteBookmark(url){
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));

  for(var i=0;i<bookmarks.length;i++){
    if(bookmarks[i].url==url)
    {
      bookmarks.splice(i,1);
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  fetchBookmarks();
}

function fetchBookmarks()
{
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
  var bookmarksResults=document.getElementById('bookmarksResults');

  bookmarksResults.innerHTML='';
  for(var i=0;i<bookmarks.length;i++){
    var name=bookmarks[i].name;
    var url=bookmarks[i].url;

    bookmarksResults.innerHTML+='<div class="jumbotron"><h3>'+name+
    '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
    '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
    '</h3></div>';
  }
}
