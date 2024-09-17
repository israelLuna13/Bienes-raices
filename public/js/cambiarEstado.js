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

/***/ "./src/js/cambiarEstado.js":
/*!*********************************!*\
  !*** ./src/js/cambiarEstado.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function(){\n\n    //accedemos a los botones que tengas la clase cambiar-estado\n    const cambiarEstadoBotones = document.querySelectorAll('.cambiar-estado')\n\n    //accedemos el token que pusimos en el header para acceder a el y ponerlo en el fetch\n    const token = document.querySelector('meta[name=\"csrf-token\"]').getAttribute('content')\n\n    //a cada boton le ponemos un evento de click\n    cambiarEstadoBotones.forEach(boton =>{\n        boton.addEventListener('click', cambiarEstadoPropiedad)\n    })\n\n    //accedemos al id del atributo unico 'data-propiedad-id' con .dataset\n    async function cambiarEstadoPropiedad(event){  \n        const {propiedadId:id} = event.target.dataset\n\n        //url dinamica , le pasamos como parametro el id del boton\n        const url = `/propiedades/${id}`\n        \n        try {\n            //hacemos una peticion a la url con el metodo post y el token para evitar ataques\n            const respuesta = await fetch(url,{\n                method:'PUT',\n                headers:{\n                    'CSRF-Token':token\n                }\n            })\n\n            //la respuesta sera un booleano\n            const {resultado} = await respuesta.json()\n\n            //esta respuesta nos va a servir para cambiar las clases de un boton \n            //cambiamos el estado de una propiedad a publicada o no publicada\n            if(resultado){\n                //si es true\n                // si el boton es amarillo \n                if(event.target.classList.contains('bg-yellow-100'))\n                    {\n                        //propiedad publicada\n                        //quitamos el amarillo y le ponemos el verde\n                        event.target.classList.add('bg-green-100','text-green-800')\n                        event.target.classList.remove('bg-yellow-100','text-yellow-800')\n                        //cambiamos el texto\n                        event.target.textContent = 'Publicado'\n                    }else{\n                        //propiedad no publicada\n                        //false \n                        //quitamos el verde y ponemos el amarillo\n                        event.target.classList.remove('bg-green-100','text-green-800')\n                        event.target.classList.add('bg-yellow-100','text-yellow-800')\n                        event.target.textContent = 'No publicado'\n                    }\n            }\n\n        } catch (error) {\n            console.log(error);\n        }\n    }\n\n})()\n\n//# sourceURL=webpack://bienes_raices/./src/js/cambiarEstado.js?");

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
/******/ 	__webpack_modules__["./src/js/cambiarEstado.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;