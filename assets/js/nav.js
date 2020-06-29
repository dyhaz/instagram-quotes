document.addEventListener("DOMContentLoaded", function() {
  // Activate sidebar nav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();
 
  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
 
        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
          elm.addEventListener("click", function(event) {
            // Tutup sidenav
            var sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            // Muat konten halaman yang dipanggil
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Load page content
  var page = window.location.hash.substr(1);
  var content = document.querySelector("#body-content");
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          if (page.split("?")[0] === "home") {
            if (page.split("?").length > 1) {
              loadItems(page.split("?")[1], 12);
            } else {
              loadItems("quoteslucu", 12);
            }

            // Daftarkan event listener untuk setiap tags
            document.querySelectorAll(".hashtags a").forEach(function(elm) {
              elm.addEventListener("click", function (event) {
                // Muat konten halaman yang dipanggil
                page = event.target.getAttribute("href").substr(1);
                loadPage(page);
              });
            });

          }
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };

    content.innerHTML = `
        <div class="row">
        <div class="col s12 valign-wrapper" style="height: 400px">
            <div class="progress">
                <div class="indeterminate"></div>
            </div>
        </div>
    </div>
    `;

    xhttp.open("GET", "pages/" + page.split("?")[0] + ".html", true);
    xhttp.send();
  }
});
