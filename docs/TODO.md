# Próximos pasos

## Completado ✅

- [x] **Guardado local** - Datos persisten en localStorage entre sesiones
- [x] **Validación mejorada** - Campos obligatorios con highlight de error
- [x] **Ahorro individual** - Proyección 10 años por cada mejora (no combinado)
- [x] **Auto-selección aislamiento** - Según año de construcción
- [x] **Labels con U-values** - Para usuarios con certificado existente
- [x] **Coste energético** - Estimación €/año con PRICE_KWH = 0.18
- [x] **Comparativa percentil** - "Peor que el X% de viviendas"

## Prioritarios

- [ ] **Más casos de validación** - Conseguir 2-3 certificados reales más para afinar algoritmo
- [ ] **Zonas climáticas** - Validar factores en zonas extremas (A3 Cádiz, E1 Burgos)
- [ ] **Edificios antiguos** - Validar factor año construcción pre-1980

## Mejoras UX

- [ ] **Exportar PDF** - Generar documento similar al certificado oficial
- [ ] **Botón compartir** - Web Share API funcionando
- [ ] **Modo oscuro** - Toggle para preferencias sistema
- [ ] **PWA** - Service worker para uso offline
- [ ] **Guardado local** - Histórico de cálculos en localStorage

## Mejoras algoritmo

- [ ] **Factores dinámicos** - Ajustar según zona climática (no solo factor base)
- [ ] **Superficie** - Considerar factor escala (pisos pequeños menos eficientes)
- [ ] **Edad equipos** - Factor para antigüedad de caldera/aire acondicionado
- [ ] **Renovables** - Añadir opción paneles solares fotovoltaicos

## Integraciones posibles

- [ ] **Catastro** - Autocompletar datos desde referencia catastral
- [ ] **Precios materiales** - Estimación coste real de reformas
- [ ] **Subvenciones** - Info sobre ayudas Next Generation para rehabilitación

## Despliegue

- [ ] **GitHub Pages** - Activar para tener URL pública
- [ ] **Dominio** - Considerar dominio propio (ce3x-ai.es?)
- [ ] **Analytics** - Medir uso si se hace público
