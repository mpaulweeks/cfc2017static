CFC = window;
CFC.Comments = {};

CFC.Comments.Url = function(path){
  const now = (new Date()).toISOString();
  return `http://postboard.mpaulweeks.com/${path}?v=${now}`;
}

CFC.Comments.Get = function (key, callback){
  const url = `http://postboard.mpaulweeks.com/comments/cfc/${key}`;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(json => {
      callback(json);
    });
}

CFC.Comments.GenerateHtml = function (comments){
  let commentHtml = '';
  comments.forEach(function (c){
    const delUrl = CFC.Comments.Url(`delete/comment/cfc/${c.key}/${c.id}`);
    commentHtml += `
      <div class="comment-container">
        <a class="comment-delete" href="${delUrl}"></a>
        <div class="comment-name">${c.name}</div>
        <div class="comment-text">${c.text}</div>
      </div>
    `;
  });
  if (commentHtml.length === 0){
    commentHtml = `
      <div class="comments-empty">
        Nobody has left a comment yet.
      </div>
    `;
  }
  return `
    <div class="comments-top-container">
      <div class="comments-top-header">Comments</div>
      ${commentHtml}
    </div>
  `;
}

CFC.Comments.GetAndDisplay = function (key, viewId){
  CFC.Comments.FilterAndDisplay(key, viewId, function (comments){
    return comments;
  });
}

CFC.Comments.FilterAndDisplay = function (key, selectorId, filterFunc){
  CFC.Comments.Get(key, function (comments){
    const filtered = filterFunc(comments);
    const commentHtml = CFC.Comments.GenerateHtml(filtered)
    document.getElementById(selectorId).innerHTML = commentHtml;
  });
}

CFC.Comments.Setup = function (key, viewId, formId){
  if(!!window.performance && window.performance.navigation.type === 2)
  {
    // got here via back button, force reload
    window.location.reload();
  } else {
    viewId = viewId || "comments-view";
    formId = formId || "comments-form";
    var formElm = document.getElementById(formId);
    formElm.setAttribute("method", "post");
    formElm.setAttribute("action", `http://postboard.mpaulweeks.com/comments/cfc/${key}`);
    CFC.Comments.GetAndDisplay(key, viewId);
  }
}
