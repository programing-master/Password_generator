function generarContraseña(longitud, mayusculas, minusculas, numeros, simbolos) {
  const caracteresMayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const caracteresMinus = "abcdefghijklmnopqrstuvwxyz";
  const caracteresNum = "0123456789";
  const caracteresSimbolos = "!@#$%^&*()_+{}[]<>?,./";

  let caracteresPosibles = [];

  if (mayusculas) caracteresPosibles = caracteresPosibles.concat(caracteresMayus.split(''));
  if (minusculas) caracteresPosibles = caracteresPosibles.concat(caracteresMinus.split(''));
  if (numeros) caracteresPosibles = caracteresPosibles.concat(caracteresNum.split(''));
  if (simbolos) caracteresPosibles = caracteresPosibles.concat(caracteresSimbolos.split(''));

  if (caracteresPosibles.length === 0) {
    return "Por favor selecciona al menos un tipo de carácter.";
  }

  let contraseña = "";
  for (let i = 0; i < longitud; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteresPosibles.length);
    contraseña += caracteresPosibles[indiceAleatorio];
  }

  return contraseña;
}

function actualizarResultado() {
  const longitud = parseInt(document.getElementById("length").value, 10);
  const mayusculas = document.getElementById("includeUppercase").checked;
  const minusculas = document.getElementById("includeLowercase").checked;
  const numeros = document.getElementById("includeNumbers").checked;
  const simbolos = document.getElementById("includeSymbols").checked;

  const copyBtn = document.getElementById("copyBtn");
  const resultSpan = document.getElementById("result");

  const contraseña = generarContraseña(longitud, mayusculas, minusculas, numeros, simbolos);
  resultSpan.textContent = contraseña;

  // Solo habilita el botón si la contraseña es válida (no mensaje ni vacío)
  if (contraseña && !contraseña.startsWith("Por favor") && contraseña !== 'Haz clic en "Generar Contraseña"') {
    copyBtn.disabled = false;
    copyBtn.style.cursor = "pointer";
    copyBtn.title = "Copiar contraseña";
  } else {
    copyBtn.disabled = true;
    copyBtn.style.cursor = "not-allowed";
    copyBtn.title = "";
  }
}

// Inicialmente deshabilitamos el botón copiar
document.getElementById("copyBtn").disabled = true;
document.getElementById("copyBtn").style.cursor = "not-allowed";

document.getElementById("generateBtn").addEventListener("click", actualizarResultado);

document.getElementById("copyBtn").addEventListener("click", function () {
  const resultSpan = document.getElementById("result");
  const texto = resultSpan.textContent;

  if (this.disabled) return; // botón deshabilitado, no hacer nada

  navigator.clipboard.writeText(texto)
    .then(() => {
      const original = resultSpan.textContent;
      resultSpan.textContent = "✅ ¡Copiada!";
      setTimeout(() => {
        resultSpan.textContent = original;
      }, 1500);
    })
    .catch(err => {
      console.error("Error al copiar:", err);
    });
});