/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\n    //tomamos las coordenadas que selecciono el usuario y si no selecciono nada ponemos las coord default\n    const lat = document.querySelector('#lat').value || 25.54389;\n    const lng = document.querySelector('#lng').value ||-103.41898;\n    let marker;\n    \n    //utilizar provider y geocoder\n    const geocodeService = L.esri.Geocoding.geocodeService()\n\n    // L.map('mapa'): Crea un mapa utilizando la biblioteca Leaflet. Se asume que hay un elemento HTML con el id mapa donde se va a renderizar el mapa.\n    // .setView([lat, lng], 16): Establece la vista del mapa en las coordenadas especificadas (lat, lng) con un nivel de zoom de 16.\n    const mapa = L.map('mapa').setView([lat, lng ], 16);\n    \n    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'): Crea una capa de tiles utilizando los mapas de OpenStreetMap. La URL de los tiles contiene {s}, {z}, {x}, y {y}, que son placeholders para el subdominio del servidor, el nivel de zoom, y las coordenadas del tile.\n    // { attribution: ... }: Proporciona la atribución requerida por OpenStreetMap, que es un enlace al sitio web y a los derechos de autor.\n    // .addTo(mapa): Añade esta capa de tiles al mapa creado anteriormente (mapa).\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa);\n\n    // el pin para seleccionar un lugar en especifico del mapa\n    marker = new L.marker([lat,lng],{\n        draggable:true,\n        autoPan:true\n    })\n    .addTo(mapa)\n\n    //detectar el movimiento del pin y obetener las coordenadas\n    marker.on('moveend', function(event ){\n        marker = event.target\n        const posicion = marker.getLatLng();\n        mapa.panTo(new L.LatLng(posicion.lat,posicion.lng))\n\n        //obtener la informacion de las calles \n        geocodeService.reverse().latlng(posicion,13).run(function(error,resultado){\n            //mostrar un mensaje con el nombre de la calle encima del spin\n            marker.bindPopup(resultado.address.LongLabel).openPopup();    \n            //llenar los campos con la calle , lat y long\n            document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';\n            document.querySelector('#calle').value = resultado?.address?.Address ?? '';\n            document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';\n            document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';\n\n        })\n    })\n\n})()\n\n//# sourceURL=webpack://bienes_raices/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;