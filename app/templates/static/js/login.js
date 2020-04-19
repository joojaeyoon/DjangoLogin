const loginForm = $("#login-form");
const registerForm = $("#register-form");

loginForm.on("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const loginData = {
    csrfmiddlewaretoken: form.csrfmiddlewaretoken.value,
    username: form.materialLoginFormUsername.value,
    password: form.materialLoginFormPassword.value,
  };

  $.ajax("/rest-auth/login/", {
    type: "POST",
    data: loginData,
  })
    .done(function (res, statusText, xhr) {
      const now = new Date();
      const expirationDate = new Date(now.getTime() + 4.32e7);
      localStorage.setItem("token", res.key);
      localStorage.setItem("username", loginData.username);
      localStorage.setItem("expirationDate", expirationDate);
      // window.location.href = "/";
    })
    .fail(function (xhr, statusText) {
      alert("아이디와 패스워드를 다시 확인해주세요.");
    });
});

registerForm.on("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const loginData = {
    csrfmiddlewaretoken: form.csrfmiddlewaretoken.value,
    username: form.materialRegisterFormUsername.value,
    password1: form.materialRegisterFormPassword.value,
    password2: form.materialRegisterFormPasswordCheck.value,
  };

  $.ajax("/rest-auth/registration/", {
    type: "POST",
    data: loginData,
  })
    .done(function (res, statusText, xhr) {
      expirationDate = new Date(new Date() + 4.32e7);
      localStorage.setItem("token", res.key);
      localStorage.setItem("username", loginData.username);
      localStorage.setItem("expirationDate", expirationDate);
      // window.location.href = "/";
    })
    .fail(function (xhr, statusText) {
      error = xhr.responseJSON;

      console.log(error);

      if (error.username) {
        alert("동일한 아이디가 이미 존재합니다.");
      } else {
        alert("비밀번호를 다시 확인해주세요.");
      }
    });
});

$("#to-register").on("click", () => {
  $("#Login").hide();
  $("#Register").show();
});
$("#to-login").on("click", () => {
  $("#Login").show();
  $("#Register").hide();
});
