// script.js
// Guardar textos en localStorage al cambiar
document.getElementById('input1').addEventListener('input', function(e) {
    localStorage.setItem('input1', e.target.value);
});
document.getElementById('input2').addEventListener('input', function(e) {
    localStorage.setItem('input2', e.target.value);
});

// Cargar textos guardados al iniciar
window.onload = function() {
    document.getElementById('input1').value = localStorage.getItem('input1') || '';
    document.getElementById('input2').value = localStorage.getItem('input2') || '';
};

async function runLLM() {
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;
    const responseDiv = document.getElementById('response');
    
    responseDiv.textContent = "Procesando... ⏳";
    
    // 👇 Aquí TU lógica para llamar a tu API LLM (ejemplo con OpenAI)
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer TU_API_KEY' // 🔒 Reemplaza con tu key
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: input1 },
                    { role: "user", content: input2 }
                ]
            })
        });
        
        const data = await response.json();
        responseDiv.textContent = data.choices[0].message.content;
    } catch (error) {
        responseDiv.textContent = "Error: " + error.message;
    }
}