const form = document.getElementById("formCita");
const horaSelect = document.getElementById("hora");
const btn = document.getElementById("btn");

/* GENERAR HORARIOS (RESPETA OPCIÓN INICIAL) */
function generarHoras() {
  const inicio = 10;
  const fin = 20;

  for (let h = inicio; h < fin; h++) {
    ["00", "30"].forEach(min => {
      const hora = `${String(h).padStart(2, "0")}:${min}`;

      const option = document.createElement("option");
      option.value = hora;
      option.textContent = hora;

      horaSelect.appendChild(option);
    });
  }
}

generarHoras();

/* SUBMIT */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  btn.innerText = "Agendando...";
  btn.disabled = true;

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbybwsxuPepJ3vETJGiHuenYyTvytozbcapvEh73qOPGXN9I6_lBhaDMesDsi1acXzb9/exec", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const text = await res.text();
    console.log("RESPUESTA:", text);

    const result = JSON.parse(text);

    if (result.status === "error") {
      alert(result.message);
      btn.innerText = "Agendar mi cita";
      btn.disabled = false;
      return;
    }

    // REDIRECCIÓN A IMAGEN DE CONFIRMACIÓN
    window.location.href = "https://i.postimg.cc/255Sv672/Agendado-Jrs-Barber.png";

  } catch (error) {
    console.error("ERROR COMPLETO:", error);
    alert("Error al agendar, revisa consola (F12)");
    btn.innerText = "Agendar mi cita";
    btn.disabled = false;
  }
});
