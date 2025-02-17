document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section, .hero");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add("hidden");
        observer.observe(section);
    });
});
/*---------------------*/
// Variables
let carrito = {};

// Función para agregar productos
document.querySelectorAll(".ordenar").forEach(boton => {
    boton.addEventListener("click", () => {
        let producto = boton.getAttribute("data-producto");
        if (carrito[producto]) {
            carrito[producto]++;
        } else {
            carrito[producto] = 1;
        }
        actualizarCarrito();
    });
});

// Mostrar el carrito
document.getElementById("verCarrito").addEventListener("click", () => {
    document.getElementById("carritoModal").style.display = "block";
    actualizarCarrito();
});

// Cerrar el carrito
document.getElementById("cerrarCarrito").addEventListener("click", () => {
    document.getElementById("carritoModal").style.display = "none";
});

// Función para actualizar la lista del carrito
function actualizarCarrito() {
    let lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";

    for (let producto in carrito) {
        let li = document.createElement("li");
        li.innerHTML = `
            ${producto} x${carrito[producto]} 
            <button class="eliminar" data-producto="${producto}">Descartar x1</button>
        `;
        lista.appendChild(li);
    }

    // Agregar eventos a los botones de eliminar
    document.querySelectorAll(".eliminar").forEach(boton => {
        boton.addEventListener("click", () => {
            let producto = boton.getAttribute("data-producto");
            if (carrito[producto] > 1) {
                carrito[producto]--;
            } else {
                delete carrito[producto];
            }
            actualizarCarrito();
        });
    });
}


// Función para copiar la lista y abrir WhatsApp
document.getElementById("pedir").addEventListener("click", () => {
    let mensaje = "Hola, Si aun esta Disponible quiero pedir:\n";
    for (let producto in carrito) {
        mensaje += `- ${producto} x${carrito[producto]}\n`;
    }
    
    // Copiar al portapapeles
    navigator.clipboard.writeText(mensaje).then(() => {
        alert("Lista copiada con éxito");

        // Abrir WhatsApp con el mensaje
        let telefono = "59161541084"; // Reemplaza con tu número de WhatsApp
        let url = `https://wa.me/${61541084}?text=${encodeURIComponent(mensaje)}`;
        window.location.href = url;
    });
});


