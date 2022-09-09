import "../component/app-bar.js";
import $ from "jquery";

const main = () => {
    const KUNCI_API = "api_key=1cf50e6248dc270629e802686245c2c8";
    const URL_DASAR = "https://api.themoviedb.org/3";
    const URL_API = `${URL_DASAR}/discover/movie?sort_by=popularity.desc&${KUNCI_API}`;
    const URL_GAMBAR = "https://image.tmdb.org/t/p/w500";
    const URL_PENCARIAN = `${URL_DASAR}/search/movie?${KUNCI_API}`;

    let halamanSekarang = 1;
    let halamanBerikut = 2;
    let halamanSebelum = 3;
    let alamatTerbaru = "";
    let totalHalaman = 100;

    let appBarElement = document.querySelector("app-bar");
    if (!appBarElement) {
        appBarElement = document.createElement("app-bar");
        $("header").append(appBarElement);
    }

    const appBarShadowRoot = document.getElementsByTagName("app-bar");
    const formElement = appBarShadowRoot[0].shadowRoot.getElementById("form");
    const searchElement =
        appBarShadowRoot[0].shadowRoot.getElementById("search");

    const ambilFilm = (alamat) => {
        alamatTerbaru = alamat;
        fetch(alamat)
            .then((sumber) => sumber.json())
            .then((data) => {
                if (data.results.length !== 0) {
                    $("#pageSection").css("display", "flex");
                    tampilkanFilm(data.results);
                    halamanSekarang = data.page;
                    halamanBerikut = halamanSekarang + 1;
                    halamanSebelum = halamanSekarang - 1;
                    totalHalaman = data.total_pages;

                    $("#pageIndicator").text(halamanSekarang);

                    if (halamanSekarang <= 1) {
                        $("#prevBtn").addClass("disabled");
                        $("#nextBtn").removeClass("disabled");
                    } else if (halamanSekarang >= totalHalaman) {
                        $("#prevBtn").removeClass("disabled");
                        $("#nextBtn").addClass("disabled");
                    } else {
                        $("#prevBtn").removeClass("disabled");
                        $("#nextBtn").removeClass("disabled");
                    }
                } else {
                    $("#movieList").html(
                        `<h1 class="no-movie">Maaf, Film tidak ditemukan!</h1>`
                    );
                    $("#pageSection").css("display", "none");
                }
            });
    };

    const tampilkanFilm = (data) => {
        $("#movieList").html(``);

        data.forEach((movie) => {
            const { title, poster_path, vote_average, overview } = movie;

            $("#movieList").append(`
                <div class="movie">
                    <img 
                        src="${
                            poster_path
                                ? URL_GAMBAR + poster_path
                                : "http://via.placeholder.com/1080x1580"
                        }" 
                        class="poster"
                        alt="${title}"
                    >
                    <div class="movie-detail">
                        <h3>${title}</h3>
                        <p>${overview}</p>
                        <span class="rating">⭐${vote_average}</span>
                    </div>
                </div>
        `);
        });
    };

    formElement.addEventListener("submit", (e) => {
        e.preventDefault();

        const kataKunci = searchElement.value;
        if (kataKunci) {
            ambilFilm(`${URL_PENCARIAN}&query=${kataKunci}`);
        } else {
            ambilFilm(URL_API);
        }
    });

    $("#prevBtn").on("click", () => {
        if (halamanSebelum > 0) {
            gantiHalaman(halamanSebelum);
        }
    });

    $("#nextBtn").on("click", () => {
        if (halamanBerikut <= totalHalaman) {
            gantiHalaman(halamanBerikut);
        }
    });

    const gantiHalaman = (halaman) => {
        let alamatSplit = alamatTerbaru.split("?");
        let parameterQuery = alamatSplit[1].split("&");
        let kunci = parameterQuery[parameterQuery.length - 1].split("=");
        if (kunci[0] != "page") {
            let alamat = `${alamatTerbaru}&page=${halaman}`;
            ambilFilm(alamat);
        } else {
            kunci[1] = halaman.toString();
            let x = kunci.join("=");
            parameterQuery[parameterQuery.length - 1] = x;
            let y = parameterQuery.join("&");
            let alamat = `${alamatSplit[0]}?${y}`;
            ambilFilm(alamat);
        }
    };

    ambilFilm(URL_API);
};

export default main;
