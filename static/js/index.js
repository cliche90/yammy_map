var MainFrame = {

    initMap: () => {
        var view = new ol.View({
            center: [0, 0],
            zoom: 2
        });

        var map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            target: 'map',
            controls: ol.control.defaults({
                attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    collapsible: false
                })
            }),
            view: view
        });

        var geolocation = new ol.Geolocation({
            projection: view.getProjection()
        });

        function el(id) {
            return document.getElementById(id);
        }

        el('track').addEventListener('change', function () {
            geolocation.setTracking(this.checked);
        });

        // update the HTML page when the position changes.
        geolocation.on('change', function () {
            console.log(geolocation)
            el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
            el('altitude').innerText = geolocation.getAltitude() + ' [m]';
            el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
            el('heading').innerText = geolocation.getHeading() + ' [rad]';
            el('speed').innerText = geolocation.getSpeed() + ' [m/s]';

            map.getView().setCenter(geolocation.getPosition());
            map.getView().setZoom(18);
        });

        // handle geolocation error.
        geolocation.on('error', function (error) {
            var info = document.getElementById('info');
            info.innerHTML = error.message;
            info.style.display = '';
        });

        var accuracyFeature = new ol.Feature();
        geolocation.on('change:accuracyGeometry', function () {
            accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
        });

        var positionFeature = new ol.Feature();
        positionFeature.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#3399CC'
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        }));

        geolocation.on('change:position', function () {
            var coordinates = geolocation.getPosition();
            positionFeature.setGeometry(coordinates ?
                new ol.geom.Point(coordinates) : null);
        });

        new ol.layer.Vector({
            map: map,
            source: new ol.source.Vector({
                features: [accuracyFeature, positionFeature]
            })
        });
    }
}

$(document).ready(() => {
    MainFrame.initMap();
});