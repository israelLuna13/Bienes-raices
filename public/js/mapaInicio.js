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

eval("__webpack_require__.r(__webpack_exports__);\n\n(function(){\n    //tomamos las coordenadas que selecciono el usuario y si no selecciono nada ponemos las coord default\n    const lat =  25.54389;\n    const lng = -103.41898;\n\n    // L.map('mapa'): Crea un mapa utilizando la biblioteca Leaflet. Se asume que hay un elemento HTML con el id mapa donde se va a renderizar el mapa.\n    // .setView([lat, lng], 16): Establece la vista del mapa en las coordenadas especificadas (lat, lng) con un nivel de zoom de 16.\n    const mapa = L.map('mapa-inicio').setView([lat, lng ], 16);\n\n    //grupo de markers\n    let markers = new L.FeatureGroup().addTo(mapa)\n\n    let propiedades=[]\n\n  //filtros\n  const filtro = {\n    categoria:'',\n    precio:''\n  }\n\n  //obtenemos el valor de los select atraves de su id\n    const categoriasSelect = document.querySelector('#categorias')\n    const preciosSelect = document.querySelector('#precios')\n\n    //filtrado de categorias y precios\n\n    //e.target.value siempre nos devolvera un string\n    //agregamos el evento de change a los select\n    //cada vez que cambie el select llenamos precio o categoria\n    categoriasSelect.addEventListener('change',e=>{\n      filtro.categoria = +e.target.value\n      filtrarPropiedades()\n    })\n\n    preciosSelect.addEventListener('change',e=>{\n      filtro.precio = +e.target.value\n      filtrarPropiedades()\n    })\n\n      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'): Crea una capa de tiles utilizando los mapas de OpenStreetMap. La URL de los tiles contiene {s}, {z}, {x}, y {y}, que son placeholders para el subdominio del servidor, el nivel de zoom, y las coordenadas del tile.\n    // { attribution: ... }: Proporciona la atribución requerida por OpenStreetMap, que es un enlace al sitio web y a los derechos de autor.\n    // .addTo(mapa): Añade esta capa de tiles al mapa creado anteriormente (mapa).\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa);\n\n    const obtenerPropiedades=async()=>{\n      try{\n        const url = '/api/propiedades' //url de nuestra api\n        const respuesta = await fetch(url)//verficar si la conexion es correcta\n        propiedades = await respuesta.json() //devolvemos la respuesta como json\n        mostrarPropiedades(propiedades)\n      }catch(error){\n        console.log(error);\n      }\n    }\n\n    const mostrarPropiedades = propiedades =>{\n\n      //limpiar los markers previos para que no se soobrepongan \n      markers.clearLayers()\n      //mostramos los pines en el mapa \n      propiedades.forEach(propiedad => {\n        //agregamos los pines\n        const marker = new L.marker([propiedad?.lat,propiedad?.lng],{\n          autoPan:true,//centrar la vista\n        })\n        .addTo(mapa)\n        .bindPopup(`\n          <p class=\"text-indigo-600 font-bold\">${propiedad.categoria.nombre}</p>\n          <h1 class=\"text-xl font-extrabold uppercase my-5\">${propiedad?.titulo}</h1>\n          <img src=\"/uploads/${propiedad?.imagen}\" alt=\"Imagen de la propiedad ${propiedad.titulo}\">\n          <p class=\"text-gray-600 font-bold\">${propiedad.precio.nombre}</p>\n          <a href=\"/propiedad/${propiedad.id}\" class=\"bg-indigo-600 block p-2 text-center font-bold uppercase\">Ver Propiedades</a>\n          `)//cuando presione un pin me mostrara la informacion de la propiedad\n\n          //agregamos los pines en el mapa\n        markers.addLayer(marker)\n        \n      });\n    }\n\n    //obtenemos las propiedades que pertenecen a una categoria \n    const filtrarPropiedades = ()=>{\n      const resultado = propiedades.filter(filtrarCategoria).filter(filtrarPrecio)\n        mostrarPropiedades(resultado)\n    }\n\n    //obtenemos el id de las categrias que estan en una propiedad\n    const filtrarCategoria =(propiedad)=>{\n      return filtro.categoria ? propiedad.categoriaId === filtro.categoria: propiedad\n    }\n\n    const filtrarPrecio =(propiedad)=>{\n      return filtro.precio ? propiedad.precioId === filtro.precio: propiedad\n    }\n\n    obtenerPropiedades()\n})() //mandar llamar esta funcion\n\n//# sourceURL=webpack://bienes_raices/./src/js/mapaInicio.js?");

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