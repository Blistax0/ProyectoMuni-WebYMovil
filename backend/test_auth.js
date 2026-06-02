async function testRegister() {
  try {
    const payload = {
      rut: "11111111-1",
      nombre_completo: "Test Admin",
      correo: "admin@test.com",
      password_hash: "admin123",
      rol: "ADMIN"
    };
    console.log("Intentando crear usuario:", payload);
    
    const res = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    
    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Respuesta:", data);
  } catch (err) {
    console.error("Error de conexión:", err.message);
  }
}
testRegister();
