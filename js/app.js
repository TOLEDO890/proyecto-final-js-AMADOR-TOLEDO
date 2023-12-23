// Función para cargar las opciones de moneda
async function cargarOpcionesMoneda() {
  try {
    const apiKey = '5392cd99cef42c11967db405';
    const opcionesUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const response = await fetch(opcionesUrl);

    if (!response.ok) {
      throw new Error(`Error en la solicitud de opciones de moneda. Código de respuesta: ${response.status}`);
    }

    const data = await response.json();
    const monedas = Object.keys(data.conversion_rates); // Obtener los nombres de las monedas

    // Llenar las opciones de moneda para los selects de origen y destino
    llenarOpcionesMoneda('monedaOrigen', monedas, data.conversion_rates);
    llenarOpcionesMoneda('monedaDestino', monedas, data.conversion_rates);
  } catch (error) {
    console.error(`Error al cargar opciones de moneda: ${error.message}`);
  }
}

// Función para llenar las opciones de moneda en un select
function llenarOpcionesMoneda(selectId, monedas, conversionRates) {
  const select = document.getElementById(selectId);
  select.innerHTML = '';

  monedas.forEach(moneda => {
    const option = document.createElement('option');
    option.value = moneda;
    option.text = `${moneda} - ${conversionRates[moneda]}`; // Agregar valores de las divisas
    select.appendChild(option);
  });
}

// Función para manejar errores
function manejarError(error) {
  console.error(`Error al convertir moneda: ${error.message}`);
}

// Función para convertir moneda
async function convertirMoneda() {
  try {
    const cantidad = document.getElementById('cantidad').value;
    const monedaOrigen = document.getElementById('monedaOrigen').value;
    const monedaDestino = document.getElementById('monedaDestino').value;
    const apiKey = '5392cd99cef42c11967db405';

    const conversionUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${monedaOrigen}`;
    const conversionResponse = await fetch(conversionUrl);

    if (!conversionResponse.ok) {
      throw new Error(`Error en la solicitud de tasas de cambio. Código de respuesta: ${conversionResponse.status}`);
    }

    const conversionData = await conversionResponse.json();
    const tasaCambio = conversionData.conversion_rates[monedaDestino];
    const resultado = cantidad * tasaCambio;

    // Muestra los resultados en un input de solo lectura
    mostrarResultados(cantidad, monedaOrigen, resultado, monedaDestino);
  } catch (error) {
    // Maneja los errores
    manejarError(error);
  }
}

// Función para mostrar los resultados
function mostrarResultados(cantidad, monedaOrigen, resultado, monedaDestino) {
  const resultadosInput = document.getElementById('resultados');
  resultadosInput.value = `${cantidad} ${monedaOrigen} es igual a ${resultado.toFixed(2)} ${monedaDestino}`;
}

// Espera a que el DOM esté completamente cargado antes de ejecutar la función para cargar opciones de moneda
document.addEventListener('DOMContentLoaded', cargarOpcionesMoneda);









  
  
  