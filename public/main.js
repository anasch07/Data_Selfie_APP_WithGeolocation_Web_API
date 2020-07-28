//(p5)Setup is the equivalent of window on load or jquery ready function it s the function that get executed when theb web page is loaded
function setup(){
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(340, 240);
    
    
    document.getElementById('submitmood').addEventListener('click', event => {
        if ('geolocation' in navigator) {
            console.log("geolocation is available ");

            video.loadPixels();
            const image64 = video.canvas.toDataURL();

            navigator.geolocation.getCurrentPosition(async position => {
                // console.log(position);
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                document.getElementById("latitude").textContent = lat;
                document.getElementById("longitude").textContent = long;
                const mood = document.getElementById('mood').value;

                const data = {
                    lat,
                    long,
                    mood,
                    image64
                };
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };
                const response = await fetch('/api', options);
                const json = await response.json();
                console.log(json);

                //Code for Leaflet
                const mymap = L.map('mymap').setView([lat, long], 15);
                const attribution =
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
                const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                const tiles = L.tileLayer(tileUrl, {
                    attribution
                });
                tiles.addTo(mymap);
                const marker = L.marker([lat, long]).addTo(mymap);

            });

        } else {
            console.log("geolocation is NOT  available ");
        }
    });
   
}

