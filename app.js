try {
  const res = await fetch("TU_URL_SCRIPT", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const text = await res.text();
  console.log(text); // 👈 IMPORTANTE

  const result = JSON.parse(text);

  if (result.status === "error") {
    alert(result.message);
    return;
  }

  window.location.href = "confirmacion.html";

} catch (error) {
  console.error(error);
  alert("Error real: revisa consola (F12)");
}
