# Algoritmo de Cálculo CE3X-AI

## Fórmula base

```
Consumo = BASE × año × clima × fachada × ventanas × aislamiento × orientación × posición × tipo × calefacción × refrigeración × iluminación × ACS
```

**BASE = 180 kWh/m²·año** (calibrado con 30k+ certificados reales de Madrid)

## Metodología de calibración

El algoritmo fue calibrado usando datos abiertos del Registro de Certificados de Eficiencia Energética de la Comunidad de Madrid (datos.comunidad.madrid).

### Referencia base
- Zona: D3 (Madrid, Getafe, Toledo)
- Tipo: Piso en bloque
- Calefacción: Gas natural
- Década: 2000s
- Consumo mediano: **180 kWh/m²·año**

### Factores calculados vs datos reales
Los factores se calcularon como ratio del consumo mediano de cada categoría vs la referencia.

## Factores por categoría

### Año de construcción
Calibrado con medias reales por década:

| Período | Factor | Consumo típico | Fuente |
|---------|--------|----------------|--------|
| <1960 | 1.35 | 243 kWh | Dataset Madrid |
| 1960-69 | 1.33 | 239 kWh | Dataset Madrid |
| 1970-79 | 1.27 | 229 kWh | Dataset Madrid |
| 1980-89 | 1.10 | 199 kWh | Dataset Madrid |
| 1990-99 | 1.10 | 199 kWh | Dataset Madrid |
| 2000-09 | 1.00 | 180 kWh | **Referencia** |
| 2010-19 | 0.73 | 131 kWh | Dataset Madrid |
| ≥2020 | 0.50 | 90 kWh | Dataset Madrid |
|---------|--------|-----------|
| Antes 1980 | 1.25 | Sin normativa térmica |
| 1980-2006 | 1.15 | NBE-CT-79 |
| 2007-2013 | 1.00 | CTE 2006 |
| 2014-2019 | 0.85 | CTE 2013 |
| 2020+ | 0.70 | CTE 2019 (nZEB) |

### Tipo de fachada
| Tipo | Factor |
|------|--------|
| Ladrillo hueco (doble hoja) | 1.00 |
| Ladrillo macizo | 1.10 |
| Hormigón visto | 1.25 |
| Bloque hormigón | 1.15 |
| Piedra natural | 1.20 |

### Tipo de ventanas
| Tipo | Factor |
|------|--------|
| Vidrio simple | 1.35 |
| Doble - Aluminio SIN RPT | 1.15 |
| Doble - Aluminio CON RPT | 1.00 |
| Doble - PVC | 0.95 |
| Doble - Madera | 0.98 |
| Triple acristalamiento | 0.85 |

### Orientación
| Orientación | Factor |
|-------------|--------|
| Sur | 0.92 |
| Este-Oeste | 1.00 |
| Norte | 1.10 |

### Aislamiento térmico
| Tipo | Factor |
|------|--------|
| Sin aislamiento | 1.30 |
| Básico (3-5 cm) | 1.10 |
| Mejorado/SATE (6-10 cm) | 0.90 |

### Posición en edificio
| Posición | Factor |
|----------|--------|
| Piso intermedio | 1.00 |
| Planta baja / sobre local | 1.08 |
| Último piso / ático | 1.15 |
| Dúplex con cubierta | 1.10 |

**Nota importante**: Si tipo vivienda = dúplex, el factor de tipo (1.05) no se aplica porque ya se usa el factor de posición "dúplex con cubierta" (evita doble penalización).

### Sistema de calefacción
| Sistema | Factor |
|---------|--------|
| Gas natural | 1.00 |
| Gas butano/propano | 1.10 |
| Eléctrico radiadores | 1.25 |
| Eléctrico suelo radiante | 1.15 |
| Bomba de calor | 0.75 |
| Biomasa/pellets | 0.85 |
| Sin calefacción | 0.90 |

### Sistema de refrigeración
| Sistema | Factor |
|---------|--------|
| Split | 1.00 |
| Centralizado | 1.05 |
| Portátil | 1.15 |
| Evaporativo | 0.90 |
| Sin refrigeración | 0.95 |

### Iluminación
| Tipo | Factor |
|------|--------|
| LED | 0.97 |
| Fluorescente | 1.00 |
| Incandescente | 1.05 |

### ACS (Agua Caliente Sanitaria)
| Sistema | Factor |
|---------|--------|
| Gas natural | 1.00 |
| Gas butano/propano | 1.08 |
| Eléctrico termo | 1.20 |
| Eléctrico instantáneo | 1.15 |
| Solar con apoyo | 0.80 |
| Bomba de calor ACS | 0.75 |

## Factor CO₂

```
CO₂ (kg/m²·año) = Consumo × 0.208
```

Factor promedio mix eléctrico español + gas natural.

## Escalas oficiales (RD 390/2021)

| Letra | Consumo (kWh/m²/año) | CO₂ (kg/m²/año) |
|-------|---------------------|-----------------|
| A | < 44.6 | < 10 |
| B | 44.6 - 72.3 | < 16.3 |
| C | 72.3 - 112.1 | < 25.3 |
| D | 112.1 - 172.3 | < 38.9 |
| E | 172.3 - 303.7 | < 66 |
| F | 303.7 - 382.6 | < 79.2 |
| G | ≥ 382.6 | ≥ 79.2 |

**Nota**: Los intervalos varían por zona climática, tipo de edificio y si es obra nueva o existente. Estos son valores de referencia para vivienda existente en zona D3.
