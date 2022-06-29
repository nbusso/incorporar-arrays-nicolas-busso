let cantFacturas = parseInt(prompt('Ingrese la cantidad de facturas a pagar. (Máximo 10)'))
let listaFacturas = []

while(cantFacturas > 10 || cantFacturas < 1){
    alert('Ingresa una cantidad correcta (de 1 a 10)')
    cantFacturas = parseInt(prompt('Ingrese la cantidad de facturas a pagar. (Máximo 10)'))
}

let importeTotal = 0

for (let i = 1; i <= cantFacturas; i++){
    let importe = parseFloat(prompt(`Usted está pagando ${cantFacturas} facturas.
                                    \nEl valor total ingresado hasta el momento es de: $${importeTotal}.
                                    \nIngrese el importe de la factura n° ${i}`))
    importeTotal = parseFloat(importeTotal + importe)
    listaFacturas[i-1] = importe
}

let tipoIva = 0
let seleccionIva = parseInt(prompt(`Usted está pagando ${cantFacturas} facturas.
                                    \nEl valor total ingresado hasta el momento es de: $ ${importeTotal}.
                                    \n${textoListado()}
                                    \nSelecciona el tipo de IVA de tus facturas:
                                    \n1. Productos GENERAL (21%)
                                    \n2. Productos REDUCIDO (10.5%)
                                    \n3. Servicios (27%)`
                                )
                    )

while(seleccionIva > 4 || seleccionIva < 1){
    alert('Selecciona una opcion correcta!')
    seleccionIva = parseInt(prompt(`Usted está pagando ${cantFacturas} facturas.
                                    \nEl valor total ingresado hasta el momento es de: $ ${importeTotal}.
                                    \n${textoListado()}
                                    \nSelecciona el tipo de IVA de tus facturas:
                                    \n1. Productos GENERAL (21%)
                                    \n2. Productos REDUCIDO (10.5%)
                                    \n3. Servicios (27%)`
                                )
                            )
}

function textoListado(){
    let texto = `Esta es la lista de facturas ingresadas: \n`
    for(let i = 0; i < listaFacturas.length; i++){
        texto += `Factura N°${i+1}: $ ${listaFacturas[i]} \n`
    }
    return texto
}

switch(seleccionIva){
    case 1:
        tipoIva = 0.21
        break
    case 2:
        tipoIva = 0.105
        break
    case 3:
        tipoIva = 0.27
        break
    default:
        alert('Error en el tipo de IVA ingresado, comience nuevamente.')
        break
}

//calculo retenciones
const retBrutos = monto => monto * 0.007

function retGanancias(monto, iva){
    montoImponible = (monto / (1 + iva)) - 224000
    retencion = montoImponible * 0.02
    return retencion
}

let iibb = retBrutos(importeTotal)
let gcias = retGanancias(importeTotal, tipoIva)

function mostrar(ret, minimo){
    let retencion = 0
    if (ret >= minimo){
        retencion = ret
    }
    return retencion
}

let valores = importeTotal - mostrar(iibb, 280) - mostrar(gcias, 500)

alert(`La suma de sus ${cantFacturas} facturas es de $ ${importeTotal}. (IVA ${tipoIva * 100}%)
        \n${textoListado()}
        \n-----
        \nDeberá Formular el pago de la siguiente manera:
        \nValores: $ ${valores}
        \nRetención IIBB: $ ${mostrar(iibb, 280)}
        \nRetención Ganancias: $ ${mostrar(gcias, 500)}
        \n-----
        \nGracias por su consulta.
`)
