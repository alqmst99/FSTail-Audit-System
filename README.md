# Web Audit System

Sistema completo de auditorías web orientado a prospectos de Estados Unidos.

## Qué incluye

### 1. Guía del proceso
Paso a paso de cómo hacer la auditoría completa, orden de herramientas y tiempos.

### 2. Checklist interactiva
- 9 herramientas en orden
- Checkbox por herramienta
- Notas por herramienta
- Barra de progreso
- Generación de resumen listo para pegar en una IA

### 3. Detalle de cada herramienta
Para cada una tenés:
- **Qué te da** (explicación clara)
- **Cómo se usa** (paso a paso)
- **Qué tenés que anotar**
- **Cómo se optimiza / qué recomendar**
- **Problemas frecuentes** que vas a encontrar

### Herramientas incluidas
1. BuiltWith — Stack y tecnologías
2. Whois — Dominio
3. SSL Checker — Certificado
4. Security Headers — Headers de seguridad
5. Sucuri SiteCheck — Malware y blacklists
6. PageSpeed Insights — Performance y Core Web Vitals
7. Screaming Frog — SEO técnico
8. WAVE — Accesibilidad (ADA)
9. Revisión Manual — UX y conversión

### Pestañas futuras
- Aplicaciones
- Debugging

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrí http://localhost:5173

## Flujo de trabajo

1. Creá un cliente (nombre + dominio)
2. Leé la **Guía del proceso**
3. Andá a la **Checklist** y trabajá herramienta por herramienta
4. En cada herramienta podés abrir la **guía completa**
5. Cuando termines → generá el **resumen** y copialo
6. Pegá el resumen en Claude/GPT junto con el prompt de informe
7. Generá el PDF y el mensaje de venta

## Stack

- React 19
- Vite
- CSS puro
- localStorage (no necesita backend)

## Subir a GitHub

```bash
git init
git add .
git commit -m "Web Audit System - complete"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/web-audit-system.git
git push -u origin main
```
