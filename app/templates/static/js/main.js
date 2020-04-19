const videoList = $(".video_list");
const loginButton = $("#Login-button");

let data = null;

if (
  localStorage.getItem("token") !== null &&
  new Date(localStorage.getItem("expirationDate")) > new Date()
) {
  loginButton.text("Logout");
} else {
  $("#uploadButton").hide();
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("expirationDate");
}

loginButton.on("click", function() {
  if (loginButton.text() === "Logout") {
    loginButton.prop("href", "/");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("expirationDate");
  }
});

function getVideos(res) {
  data = res;
  res.results.map(video => {
    const li = $("<li></li>");
    const videoDiv = $("<div class='video-info'></div>");
    const vidoe_link = $("<a></a>");
    const videoThumbnail = $("<img/>");
    const time = $("<span></span>").text(video.time);
    const title = $("<p class='video-title'></p>").text(video.title);
    const user = $("<p></p>").text(video.author);
    const views = $("<p></p>")
      .text("조회수 " + video.view_count)
      .append(
        $("<span class='video-uptime'></span>").text(
          " " + renderTimestamp(video.created_at)
        )
      );

    vidoe_link.attr("href", "/videos/" + video.slug);
    vidoe_link.addClass("video_box");
    videoThumbnail.attr("src", video.thumbnail);
    videoThumbnail.addClass("thumbnail");
    time.addClass("video_time");

    vidoe_link.append(videoThumbnail).append(time);
    videoDiv
      .append(vidoe_link)
      .append(title)
      .append(user)
      .append(views);
    li.append(videoDiv);
    videoList.append(li);
  });
}

$.get("/api/videos", getVideos);
$.get("/api/videos/?page=2", getVideos);

function CheckScroll() {
  const scrollTopMax = videoList.prop("scrollTopMax");
  const scrollTop = videoList.scrollTop();

  if (scrollTop == scrollTopMax && data.next !== null) {
    $.get(data.next, getVideos);
  }
}

videoList.on("scroll", CheckScroll);

$("#modalUploadInput").on("change", function(e) {
  filepath = e.target.value.split("\\");

  filename = filepath[filepath.length - 1];

  $("#modalUploadInputText").attr("placeholder", filename);
});

$("#modalUploadButton").on("click", function() {
  const form = $("#modalForm")[0];

  const formData = new FormData(form);

  const data = {
    csrfmiddlewaretoken: form.csrfmiddlewaretoken.value,
    title: form.title.value,
    description: form.description.value,
    token: localStorage.getItem("token")
  };

  if (data.title === "") {
    $("#uploadTitleLabel").css("color", "#e74c3c");
    return;
  }

  if (form.video.value === "") {
    $("#modalUploadInputText").addClass("file-ph-red");
    return;
  }

  $.ajax("/api/video/upload", {
    method: "POST",
    data: formData,
    processData: false,
    contentType: false
  })
    .done(function(res, statusText, xhr) {
      data.video_link = res.filepath;

      $.ajax("/api/videos/", {
        method: "POST",
        data: data
      })
        .done(function(res, statusText, xhr) {
          console.log(res);
          alert("업로드 되었습니다.");
          window.location.href = "/";
        })
        .fail(function(xhr, statusText) {
          console.log(xhr);
        });
    })
    .fail(function(xhr, statusText) {
      console.log(xhr);
    });
});

$("#searchForm").on("submit", function(e) {
  e.preventDefault();
  const searchWord = e.target.search.value;

  $.ajax(`/api/videos/?search=${searchWord}`, {
    method: "GET"
  }).done(function(res, statusText, xhr) {
    console.log(res);
    videoList.text("");
    getVideos(res);

    e.target.search.value = "";
  });
});
