const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');
const VOL_DIARIO = document.getElementById('volumenDiario');
const METODO_USADO = document.getElementById('metodo');

CALCULAR.addEventListener('click', () => {
    const DATO = parseFloat(document.getElementById('peso').value); // Convertimos el valor a número

    // Validamos que se haya ingresado un valor válido
    if (!isNaN(DATO) && DATO > 0) {
        ERROR.style.display = 'none';
        let metodoUtilizado, flujo, mantenimiento, mm2, volumenDiario;

        if (DATO <= 30) {
            metodoUtilizado = 'Holliday-Segar';
            flujo = calcFlujo(DATO);
            mantenimiento = flujo / 24;
            mm2 = Math.round(mantenimiento * 1.5);
            volumenDiario = Math.round(flujo);
        } else {
            metodoUtilizado = 'Superficie Corporal';
            const sc = ((DATO * 4) + 7) / (DATO + 90);
            volumenDiario = Math.round(sc * 1500);
            const volumenDiario2000 = Math.round(sc * 2000);

            FLU.style.display = 'none';
            MAN.style.display = 'none';
            VOL_DIARIO.innerHTML = `SC * 1500: ${volumenDiario} cc<br>SC * 2000: ${volumenDiario2000} cc`;
            VOL_DIARIO.style.display = 'block';

            METODO_USADO.innerHTML = `Método utilizado: ${metodoUtilizado}`;
            METODO_USADO.style.display = 'block';
            return;
        }

        FLU.innerHTML = `Mantenimiento por hora (cc/hr): ${Math.round(mantenimiento)}`;
        MAN.innerHTML = `m+m/2: ${mm2} cc/hr`;
        VOL_DIARIO.innerHTML = `Volumen diario calculado (cc): ${volumenDiario}`;

        FLU.style.display = 'block';
        MAN.style.display = 'block';
        VOL_DIARIO.style.display = 'block';
        METODO_USADO.innerHTML = `Método utilizado: ${metodoUtilizado}`;
        METODO_USADO.style.display = 'block';
    } else {
        ERROR.style.display = 'block';
        FLU.style.display = 'none';
        MAN.style.display = 'none';
        VOL_DIARIO.style.display = 'none';
        METODO_USADO.style.display = 'none';
    }
});

function calcFlujo(peso) {
    let flujo = 0;

    if (peso >= 0 && peso <= 10) {
        flujo = peso * 100;
    } else if (peso > 10 && peso <= 20) {
        flujo = 1000 + (peso - 10) * 50;
    } else if (peso > 20) {
        flujo = 1500 + (peso - 20) * 20;
    }

    return flujo;
}
