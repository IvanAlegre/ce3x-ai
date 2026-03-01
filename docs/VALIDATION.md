# Caso de Validación: Dúplex Getafe

## Datos del certificado real

| Campo | Valor |
|-------|-------|
| **Ubicación** | Getafe (zona D3) |
| **Tipo** | Dúplex |
| **Superficie** | 135 m² |
| **Año construcción** | 2004 |
| **Fachada** | Ladrillo hueco doble hoja |
| **Ventanas** | Aluminio sin rotura puente térmico |
| **Orientación** | Este-Oeste |
| **Aislamiento** | Sin aislamiento añadido (solo cámara aire) |
| **Posición** | Dúplex con contacto cubierta |
| **Calefacción** | Caldera gas natural |
| **ACS** | Gas natural |
| **Refrigeración** | Sistema centralizado |

## Resultado certificado oficial

| Métrica | Valor |
|---------|-------|
| **Letra** | E |
| **Consumo** | 182 kWh/m²·año |
| **Emisiones CO₂** | 37.8 kg CO₂/m²·año |

## Resultado CE3X-AI

| Métrica | Valor |
|---------|-------|
| **Letra** | E |
| **Consumo** | 183 kWh/m²·año |
| **Emisiones CO₂** | 38.1 kg CO₂/m²·año |

## Error

| Métrica | Error |
|---------|-------|
| Consumo | +0.5% |
| CO₂ | +0.8% |

✅ **Validación exitosa** - Error < 1%

## Calibración aplicada

- Base consumption: 122 kWh/m²·año
- Factor CO₂: 0.208
- Zona D3 como referencia (factor 1.0)
- Dúplex: posición "dúplex con cubierta" (1.10), sin factor adicional de tipo vivienda

## Mejoras simuladas para este caso

| Mejora | Nueva letra | Consumo | Ahorro |
|--------|-------------|---------|--------|
| SATE exterior | D | 135 kWh | -26% |
| Bomba de calor | D | 137 kWh | -25% |
| Aislamiento básico | D | 159 kWh | -13% |
| Ventanas PVC/RPT | D | 161 kWh | -12% |
