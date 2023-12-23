// Función para cargar las opciones de moneda
async function cargarOpcionesMoneda() {
    try {
      const apiKey = '5392cd99cef42c11967db405';
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud. Código de respuesta: ${response.status}`);
      }
  
      const data = await response.json();
      const monedas = data.supported_codes;
  
      // Llenar las opciones de moneda en los select
      llenarOpcionesMoneda('monedaOrigen', monedas);
      llenarOpcionesMoneda('monedaDestino', monedas);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
  
  // Función para llenar las opciones de moneda en un select
  function llenarOpcionesMoneda(selectId, monedas) {
    const select = document.getElementById(selectId);
    select.innerHTML = '';
  
    monedas.forEach(moneda => {
      const option = document.createElement('option');
      option.value = moneda;
      option.text = moneda;
      select.appendChild(option);
    });
  }
  
  // Función para convertir moneda
  async function convertirMoneda() {
    try {
      // Obtener valores del formulario
      const cantidad = document.getElementById('cantidad').value;
      const monedaOrigen = document.getElementById('monedaOrigen').value;
      const monedaDestino = document.getElementById('monedaDestino').value;
  
      // Reemplaza 'YOUR-API-KEY' con tu clave de API
      const apiKey = '5392cd99cef42c11967db405';
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${monedaOrigen}`;
  
      // Realiza la solicitud HTTP GET utilizando fetch
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud. Código de respuesta: ${response.status}`);
      }
  
      const data = await response.json();
      const tasaCambio = data.conversion_rates[monedaDestino];
      const resultado = cantidad * tasaCambio;
  
      // Muestra los resultados en el input de solo lectura utilizando textContent
      const resultadosInput = document.getElementById('resultados');
      resultadosInput.textContent = `${cantidad} ${monedaOrigen} es igual a ${resultado.toFixed(2)} ${monedaDestino}`;
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  
 
  // Al cargar la página, carga las opciones de moneda
  document.addEventListener('DOMContentLoaded', cargarOpcionesMoneda);
  
  
  