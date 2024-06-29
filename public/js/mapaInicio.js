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

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n(function(){\r\n    //tomamos las coordenadas que selecciono el usuario y si no selecciono nada ponemos las coord default\r\n    const lat =  25.54389;\r\n    const lng = -103.41898;\r\n\r\n    // L.map('mapa'): Crea un mapa utilizando la biblioteca Leaflet. Se asume que hay un elemento HTML con el id mapa donde se va a renderizar el mapa.\r\n    // .setView([lat, lng], 16): Establece la vista del mapa en las coordenadas especificadas (lat, lng) con un nivel de zoom de 16.\r\n    const mapa = L.map('mapa-inicio').setView([lat, lng ], 16);\r\n\r\n    //grupo de markers\r\n    let markers = new L.FeatureGroup().addTo(mapa)\r\n\r\n    let propiedades=[]\r\n\r\n  //filtros\r\n  const filtro = {\r\n    categoria:'',\r\n    precio:''\r\n  }\r\n\r\n  //obtenemos el valor de los select atraves de su id\r\n    const categoriasSelect = document.querySelector('#categorias')\r\n    const preciosSelect = document.querySelector('#precios')\r\n\r\n    //filtrado de categorias y precios\r\n\r\n    //e.target.value siempre nos devolvera un string\r\n    //agregamos el evento de change a los select\r\n    //cada vez que cambie el select llenamos precio o categoria\r\n    categoriasSelect.addEventListener('change',e=>{\r\n      filtro.categoria = +e.target.value\r\n      filtrarPropiedades()\r\n    })\r\n\r\n    preciosSelect.addEventListener('change',e=>{\r\n      filtro.precio = +e.target.value\r\n      filtrarPropiedades()\r\n    })\r\n\r\n      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'): Crea una capa de tiles utilizando los mapas de OpenStreetMap. La URL de los tiles contiene {s}, {z}, {x}, y {y}, que son placeholders para el subdominio del servidor, el nivel de zoom, y las coordenadas del tile.\r\n    // { attribution: ... }: Proporciona la atribución requerida por OpenStreetMap, que es un enlace al sitio web y a los derechos de autor.\r\n    // .addTo(mapa): Añade esta capa de tiles al mapa creado anteriormente (mapa).\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n    const obtenerPropiedades=async()=>{\r\n      try{\r\n        const url = '/api/propiedades' //url de nuestra api\r\n        const respuesta = await fetch(url)//verficar si la conexion es correcta\r\n        propiedades = await respuesta.json() //devolvemos la respuesta como json\r\n        mostrarPropiedades(propiedades)\r\n      }catch(error){\r\n        console.log(error);\r\n      }\r\n    }\r\n\r\n    const mostrarPropiedades = propiedades =>{\r\n\r\n      //limpiar los markers previos para que no se soobrepongan \r\n      markers.clearLayers()\r\n      //mostramos los pines en el mapa \r\n      propiedades.forEach(propiedad => {\r\n        //agregamos los pines\r\n        const marker = new L.marker([propiedad?.lat,propiedad?.lng],{\r\n          autoPan:true,//centrar la vista\r\n        })\r\n        .addTo(mapa)\r\n        .bindPopup(`\r\n          <p class=\"text-indigo-600 font-bold\">${propiedad.categoria.nombre}</p>\r\n          <h1 class=\"text-xl font-extrabold uppercase my-5\">${propiedad?.titulo}</h1>\r\n          <img src=\"/uploads/${propiedad?.imagen}\" alt=\"Imagen de la propiedad ${propiedad.titulo}\">\r\n          <p class=\"text-gray-600 font-bold\">${propiedad.precio.nombre}</p>\r\n          <a href=\"/propiedad/${propiedad.id}\" class=\"bg-indigo-600 block p-2 text-center font-bold uppercase\">Ver Propiedades</a>\r\n          `)//cuando presione un pin me mostrara la informacion de la propiedad\r\n\r\n          //agregamos los pines en el mapa\r\n        markers.addLayer(marker)\r\n        \r\n      });\r\n    }\r\n\r\n    //obtenemos las propiedades que pertenecen a una categoria \r\n    const filtrarPropiedades = ()=>{\r\n      const resultado = propiedades.filter(filtrarCategoria).filter(filtrarPrecio)\r\n        mostrarPropiedades(resultado)\r\n    }\r\n\r\n    //obtenemos el id de las categrias que estan en una propiedad\r\n    const filtrarCategoria =(propiedad)=>{\r\n      return filtro.categoria ? propiedad.categoriaId === filtro.categoria: propiedad\r\n    }\r\n\r\n    const filtrarPrecio =(propiedad)=>{\r\n      return filtro.precio ? propiedad.precioId === filtro.precio: propiedad\r\n    }\r\n\r\n    obtenerPropiedades()\r\n})() //mandar llamar esta funcion\n\n//# sourceURL=webpack://bienes_raices/./src/js/mapaInicio.js?");

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
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;