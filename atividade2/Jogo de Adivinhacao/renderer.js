function zoom(operacao) {
    const body = document.body;
    const currentZoom = parseFloat(getComputedStyle(body).zoom) || 1;
    if (operacao === '+') {
        body.style.zoom = currentZoom + 0.1;
    } else {
        body.style.zoom = currentZoom - 0.1;
    }
}
