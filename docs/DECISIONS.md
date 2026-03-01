# Decisiones de Diseño

## Stack técnico

- **Frontend only** - Sin backend, todo el cálculo en cliente
- **HTML5 + Vanilla JS** - Sin frameworks para máxima simplicidad
- **Tailwind CSS (CDN)** - Diseño rápido, mobile-first
- **Single file** - Todo en `index.html` para fácil distribución

## Diseño UX

### Estilo visual
- Mobile-first (diseño para móvil, escala a desktop)
- Colores verdes sostenibles (#10B981 eco-green)
- Estética "tech startup" moderna
- Wizard de 4 pasos para no abrumar al usuario

### Pasos del wizard
1. **Datos básicos**: tipo vivienda, superficie, año, zona climática
2. **Envolvente**: fachada, ventanas, orientación, aislamiento, posición
3. **Sistemas**: calefacción, refrigeración, iluminación, ACS
4. **Resultado**: letra, consumo, CO₂, simulación de mejoras

## Decisiones algorítmicas

### Base de 122 kWh/m²
- Calibrado con caso real de dúplex en Getafe
- Representa vivienda "media" en zona D3 (Madrid) sin mejoras destacables

### Factor CO₂ = 0.208
- Mix eléctrico español + gas natural
- Simplificación razonable para estimación rápida

### Evitar doble penalización en dúplex
- Si usuario selecciona "dúplex" como tipo, no aplicar factor de tipo (1.05)
- El factor de posición "dúplex con cubierta" (1.10) ya lo contempla
- Descubierto durante calibración - el algoritmo original penalizaba dos veces

### Intervalos oficiales
- Basados en RD 390/2021
- Fuente: certificadosenergeticos.com, provaiser.es
- Varían por zona climática y tipo edificio - usamos valores genéricos vivienda existente

## Funcionalidades implementadas

### Simulación de mejoras
- Detecta mejoras aplicables según datos introducidos
- Calcula nuevo consumo/letra para cada mejora
- Muestra porcentaje de ahorro y €/m²/año estimado
- Ordena por mayor impacto
- Indica coste relativo (€ a €€€€)

### Recomendaciones
- Texto descriptivo de mejoras prioritarias
- Basado en deficiencias detectadas en los datos

## Ideas futuras

- [ ] Exportar PDF con certificado simulado
- [ ] Compartir resultados (Web Share API)
- [ ] Más zonas climáticas con factores refinados
- [ ] Comparativa con "vivienda media" de la zona
- [ ] Histórico de cálculos (localStorage)
- [ ] PWA para uso offline
- [ ] Integración con APIs de precios de materiales
