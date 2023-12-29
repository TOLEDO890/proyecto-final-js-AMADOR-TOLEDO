async function cargarOpcionesMoneda() {
  try {
    const apiKey = "5392cd99cef42c11967db405";
    const opcionesUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const response = await fetch(opcionesUrl);

    if (!response.ok) {
      throw new Error(
        `Error en la solicitud de opciones de moneda. Código de respuesta: ${response.status}`
      );
    }

    const data = await response.json();
    const monedas = Object.keys(data.conversion_rates);

    llenarOpcionesMoneda("monedaOrigen", monedas, data.conversion_rates);
    llenarOpcionesMoneda("monedaDestino", monedas, data.conversion_rates);
  } catch (error) {
    console.error(`Error al cargar opciones de moneda: ${error.message}`);
  }
}

function llenarOpcionesMoneda(selectId, monedas, conversionRates) {
  const select = document.getElementById(selectId);
  select.innerHTML = "";

  monedas.forEach((moneda) => {
    const option = document.createElement("option");
    option.value = moneda;
    option.text = `${moneda} - ${conversionRates[moneda]}`;
    select.appendChild(option);
  });
}

function manejarError(error) {
  console.error(`Error al convertir moneda: ${error.message}`);
}

async function convertirMoneda() {
  try {
    const cantidad = document.getElementById("cantidad").value;
    const monedaOrigen = document.getElementById("monedaOrigen").value;
    const monedaDestino = document.getElementById("monedaDestino").value;
    const apiKey = "5392cd99cef42c11967db405";

    const conversionUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${monedaOrigen}`;
    const conversionResponse = await fetch(conversionUrl);

    if (!conversionResponse.ok) {
      throw new Error(
        `Error en la solicitud de tasas de cambio. Código de respuesta: ${conversionResponse.status}`
      );
    }

    const conversionData = await conversionResponse.json();
    const tasaCambio = conversionData.conversion_rates[monedaDestino];
    const resultado = cantidad * tasaCambio;

    mostrarResultados(cantidad, monedaOrigen, resultado, monedaDestino);
  } catch (error) {
    manejarError(error);
  }
}

function mostrarResultados(cantidad, monedaOrigen, resultado, monedaDestino) {
  const resultadosInput = document.getElementById("resultados");
  resultadosInput.value = `${cantidad} ${monedaOrigen} es igual a ${resultado.toFixed(
    2
  )} ${monedaDestino}`;
}

function mostrarGrafico(monedaOrigen, monedaDestino) {
  const datos = {
    labels: ["2021", "2022", "2023"],
    datasets: [
      {
        label: `Tasa de Cambio de ${monedaOrigen} a ${monedaDestino}`,
        data: [209, 346, 1025],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const opciones = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const ctx = document.getElementById("miGrafico").getContext("2d");

  const miGrafico = new Chart(ctx, {
    type: "bar",
    data: datos,
    options: opciones,
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const monedaOrigen = "USD";
  const monedaDestino = "ARS";
  mostrarGrafico(monedaOrigen, monedaDestino);
});

document.addEventListener("DOMContentLoaded", cargarOpcionesMoneda);
