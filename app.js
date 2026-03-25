const form = document.getElementById("formCita");
const horaSelect = document.getElementById("hora");
const btn = document.getElementById("btn");

/* GENERAR HORARIOS 30 MIN */
function generarHoras() {
  const inicio = 10; // 10:00
  const fin = 20;    // 20:00

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
    const res = await fetch("TU_URL_SCRIPT", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.status === "error") {
      alert(result.message);
      btn.innerText = "Agendar mi cita";
      btn.disabled = false;
      return;
    }

    window.location.href = "confirmacion.html";

  } catch (error) {
    alert("Error al agendar");
    btn.innerText = "Agendar mi cita";
    btn.disabled = false;
  }
});
