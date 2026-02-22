const searchInput = document.querySelector("[data-search]");
const card  = `<div class="anime-card">
                <div class="anime-poster" style="background-image: url(https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Bleachanime.png/250px-Bleachanime.png);"></div>
                <div class="anime-info">
                    <div class="anime__card-title">Bleach</div>
                    <div class="anime__card-rating"><i class="fas fa-star"></i>4.7</div>
                    <div class="anime__card-genres">Shounen</div>                    
                </div>
            </div>`
let animeData = [];
            
        function searchAnime() {
            input = document.querySelector("[data-search]").value.toLowerCase();
            const filteredAnime = animeData.filter((anime) => {
                return anime.title.toLowerCase().includes(input);
            })
            for (let i = 0; i < filteredAnime.length; i++) {
               if (filteredAnime[i].title.toLowerCase().includes(input)) {
                document.getElementById('animeGrid').innerHTML = card;
            }else {
                document.querySelectorAll('.anime-card')[i].style.display = "none";
            }
        }
        }


        async function loadAnime() {
            const response = await fetch('https://api.jikan.moe/v4/top/anime');
            const data = await response.json();
            const animeGrid = document.getElementById('animeGrid');
            animeGrid.innerHTML = ''

         animeData = data.data;
         animeData.forEach(anime => {
            const genres = anime.genres.map((g) => g.name).join(', ');

            animeGrid.innerHTML += `
            <div class="anime-card">
                <div class="anime-poster" style="background-image: url(${
                    anime.images.jpg.large_image_url                
                });"></div>
                <div class="anime-info">
                    <div class="anime__card-title">${anime.title}</div>
                    <div class="anime__card-rating"><i class="fas fa-star"></i>${
                        anime.score || "N/A"                    }</div>
                    <div class="anime__card-genres">${genres}</div>                    
                </div>
            </div>
            
            `;


            document.querySelectorAll('.anime-card').forEach((card) => {
                card.addEventListener('click', () => {
                    const title = card.querySelector('.anime__card-title').textContent;
                    alert(`You clicked on ${title}`);
            });
        })
 })
}

document.querySelectorAll('.nav-tab').forEach((tab) => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-tab').forEach((t) => t.classList.remove('active'));
        this.classList.add('active');
})
})

document.querySelectorAll('.sidebar-item').forEach((item) => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.sidebar-item').forEach((i) => i.classList.remove('active'));
        this.classList.add('active');
})
})

document.querySelectorAll('.top-anime-item').forEach((item) => {
                item.addEventListener('click', () => {
                    const title = item.querySelector('h4').textContent;
                    alert(`You clicked on ${title}`);
            });
        })

document.querySelector('.play-button').addEventListener('click', () => {
    alert('Playing Fullmetal Alchemist Brotherhood!');
})


console.log(loadAnime())