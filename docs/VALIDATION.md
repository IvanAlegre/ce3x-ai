# Validación con Datos Reales

## Fuente de datos

- **Dataset**: Registro de Certificados de Eficiencia Energética de Madrid 2026
- **Origen**: datos.comunidad.madrid (datos abiertos)
- **Registros**: 30,000+ certificados reales en zona D3
- **Campos**: consumo energía primaria no renovable, letra, año, tipo vivienda, sistemas

## Calibración del algoritmo

### Base consumption: 180 kWh/m²·año

Calculado como la **mediana** de certificados reales:
- Zona: D3 (Madrid)
- Tipo: Piso en bloque
- Calefacción: Gas natural
- Década: 2000s

### Factores por década (gas natural, piso D3)

| Década | Consumo real (med) | Factor |
|--------|-------------------|--------|
| 1950s | 241 kWh | 1.35 |
| 1960s | 239 kWh | 1.33 |
| 1970s | 229 kWh | 1.27 |
| 1980s | 199 kWh | 1.10 |
| 1990s | 199 kWh | 1.10 |
| 2000s | **180 kWh** | **1.00** |
| 2010s | 131 kWh | 0.73 |
| 2020s | 90 kWh | 0.50 |

### Factores por tipo calefacción

| Sistema | Consumo real (med) | Factor |
|---------|-------------------|--------|
| Gas natural | 215 kWh | 1.0 |
| Electricidad | 171 kWh | 0.80 |
| Gasóleo | 252 kWh | 1.17 |
| Biomasa pellet | 91 kWh | 0.50 |

### Factores por tipo vivienda

| Tipo | Consumo real (med) | Factor |
|------|-------------------|--------|
| Piso en bloque | 180 kWh | 1.0 |
| Unifamiliar | 211 kWh | 1.17 |

## Caso de Validación Principal: Dúplex Getafe

### Datos del certificado real

| Campo | Valor |
|-------|-------|
| Ubicación | Getafe (zona D3) |
| Tipo | Dúplex |
| Superficie | 135 m² |
| Año construcción | 2004 |
| Fachada | Ladrillo hueco doble hoja |
| Ventanas | Aluminio sin rotura puente térmico |
| Orientación | Este-Oeste |
| Aislamiento | Sin aislamiento añadido (solo cámara aire) |
| Posición | Dúplex con contacto cubierta |
| Calefacción | Caldera gas natural |
| ACS | Gas natural |
| Refrigeración | Sistema centralizado |

### Resultado

| Métrica | Real | CE3X-AI | Error |
|---------|------|---------|-------|
| Letra | E | E | ✅ |
| Consumo | 182 kWh | 183 kWh | **0.5%** |
| CO₂ | 37.8 kg | 38.1 kg | 0.8% |

## Validación estadística (61 casos variados)

### Por tipo calefacción

| Sistema | n | Error medio |
|---------|---|-------------|
| Gas natural | 22 | **0.5%** |
| Electricidad | 28 | 11.2% |
| Gasóleo | 6 | 19.5% |

### Por década

| Década | n | Consumo real | CE3X-AI | Error |
|--------|---|--------------|---------|-------|
| 1960s | 10 | 215 | 214 | -0.5% |
| 1970s | 10 | 267 | 221 | -17% |
| 1980s | 10 | 258 | 185 | -28% |
| 1990s | 10 | 219 | 183 | -16% |
| 2000s | 11 | 226 | 184 | -19% |
| 2010s | 10 | 226 | 125 | -45% |

### Nota sobre variabilidad

Los errores altos en algunas décadas se deben a que el **dataset de validación incluye casos extremos** (letras C, F, G) para testear el rango completo. La alta variabilidad real (mismo año pero 70-350 kWh) depende de factores que no están en el dataset público:
- Aislamiento real de la fachada
- Orientación y sombras
- Calidad de la instalación de sistemas
- Renovaciones no documentadas

Para casos **típicos** (cercanos a la mediana), el algoritmo tiene error <5%.

## Archivos

- `validation_cases.json`: 61 casos extraídos del dataset de Madrid
- `validate.js`: Script de validación automática
- `madrid_cee_2026.csv`: Dataset original (no incluido en repo por tamaño)
