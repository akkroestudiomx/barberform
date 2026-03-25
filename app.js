form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  btn.innerText = "Agendando...";
  btn.disabled = true;

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbwYrRqkISlmrpwMT1HK0CPhA-bHZp2taYIKwkzG7L-Q0TN1Rt99FeYsNbkRG6xf3O6s/exec", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const text = await res.text();
    console.log("RESPUESTA:", text); // 👈 IMPORTANTE

    const result = JSON.parse(text);

    if (result.status === "error") {
      alert(result.message);
      btn.innerText = "Agendar mi cita";
      btn.disabled = false;
      return;
    }

    window.location.href = "https://i.postimg.cc/255Sv672/Agendado-Jrs-Barber.png";

  } catch (error) {
    console.error("ERROR COMPLETO:", error);
    alert("Revisa consola (F12)");
    btn.innerText = "Agendar mi cita";
    btn.disabled = false;
  }
});
