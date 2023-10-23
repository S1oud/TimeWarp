let map;
let cursorMarker;
let followingCursor = false;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 2
    });

    cursorMarker = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        map: map,
        draggable: true // Allow the marker to be dragged
    });

    map.addListener('mousemove', (event) => {
        if (followingCursor) {
            const latLng = event.latLng;
            cursorMarker.setPosition(latLng);
            document.getElementById('lat').textContent = latLng.lat();
            document.getElementById('lng').textContent = latLng.lng();
        }
    });

    map.addListener('click', (event) => {
        if (followingCursor) {
            followingCursor = false;
        }
        const latLng = event.latLng;
        cursorMarker.setPosition(latLng);
        document.getElementById('lat').textContent = latLng.lat();
        document.getElementById('lng').textContent = latLng.lng();
        populateHistoryLink(latLng.lat(), latLng.lng());
    });

    cursorMarker.addListener('click', () => {
        followingCursor = !followingCursor;
    });
}

function populateHistoryLink(latitude, longitude) {
    const historypinLink = generateHistorypinLink(latitude, longitude);
    const linkElement = document.querySelector('#historyLink a');
    linkElement.href = historypinLink;
    linkElement.textContent = "Click Me!";
}

function generateHistorypinLink(latitude, longitude) {
    const latitudeMin = latitude - 0.05;
    const latitudeMax = latitude + 0.05;
    const longitudeMin = longitude - 0.05;
    const longitudeMax = longitude + 0.05;
    const zoom = 12;
    return `https://www.historypin.org/en/explore/geo/${latitude},${longitude},${zoom}/bounds/${latitudeMin},${longitudeMin},${latitudeMax},${longitudeMax}/sort/popular/paging/1`;
}
