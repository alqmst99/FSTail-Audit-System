export const TOOLS = [
  {
    id: 'builtwith',
    name: 'BuiltWith',
    link: 'https://builtwith.com',
    order: 1,
    category: 'Stack & Tecnologías',
    what: `Detecta todas las tecnologías que usa el sitio: CMS, frameworks frontend/backend, librerías JS, analytics, pixeles de publicidad, chat, CRM, email marketing, CDN, servidores, sistemas de pago, plugins, etc.

Es la primera herramienta porque te da el mapa completo de con qué está construido el sitio. Sin esto estás a ciegas.`,
    howToUse: [
      'Entrá a builtwith.com',
      'Pegá el dominio (sin https://)',
      'Esperá el reporte completo',
      'Revisá las pestañas: Analytics, Widgets, CDN, Frameworks, Payment, etc.',
      'Prestá especial atención a Analytics y Advertising (pixeles)'
    ],
    howToNote: [
      'CMS principal + versión si aparece (WordPress, Shopify, Webflow, custom, Next.js, etc.)',
      'Analytics: GA4, Universal Analytics residual, GTM, Mixpanel, Hotjar, Clarity…',
      'Pixeles: Meta Pixel, LinkedIn Insight, TikTok Pixel, Google Ads, Pinterest…',
      'Chat / soporte: Intercom, Zendesk, Drift, Tawk, Crisp…',
      'CRM / Email: HubSpot, Klaviyo, Mailchimp, ActiveCampaign…',
      'CDN: Cloudflare, Fastly, AWS CloudFront, Akamai…',
      'Hosting detectado (si aparece)',
      'Cualquier tecnología rara o desactualizada'
    ],
    optimize: [
      'Muchos scripts de tracking sueltos → consolidar todo en Google Tag Manager',
      'CMS o plugins viejos → recomendar actualización o auditoría de seguridad',
      'Sin CDN en sitio con tráfico de varios países → Cloudflare (gratis o Pro)',
      'Chat/CRM cargando en todas las páginas sin necesidad → diferir carga o cargar solo en páginas clave',
      'Tecnologías abandonadas o con vulnerabilidades conocidas → migrar o reemplazar'
    ],
    commonProblems: [
      'Demasiados tags de marketing sin GTM → afecta velocidad',
      'Hotjar + Clarity + GA4 + Meta Pixel todos a la vez sin control',
      'WordPress con 30+ plugins (señal de posible deuda técnica)'
    ]
  },
  {
    id: 'whois',
    name: 'Whois',
    link: 'https://whois.icann.org',
    order: 2,
    category: 'Dominio',
    what: `Información de registro del dominio: cuándo se creó, cuándo expira, quién lo registró y con qué registrar.

Sirve para detectar dominios muy nuevos (menor confianza), dominios a punto de expirar, o cambios recientes de propietario.`,
    howToUse: [
      'Entrá a whois.icann.org o whois.com',
      'Pegá el dominio',
      'Revisá Creation Date, Expiration Date y Registrar',
      'Si el registrante está oculto por privacidad es normal'
    ],
    howToNote: [
      'Fecha de creación',
      'Fecha de expiración',
      'Registrar (GoDaddy, Namecheap, Google Domains, Cloudflare, etc.)',
      'Si el registrante es público o está protegido por privacidad',
      'Cualquier redirección o dominio relacionado que aparezca'
    ],
    optimize: [
      'Dominio que expira en menos de 60 días → alertar urgentemente al cliente',
      'Dominio creado hace menos de 6 meses → puede afectar SEO y confianza',
      'Registrar caro o problemático → sugerir migración a Cloudflare Registrar o Namecheap'
    ],
    commonProblems: [
      'Dominio a punto de vencer y el cliente no lo sabe',
      'Dominio en registrar con mala reputación o soporte deficiente'
    ]
  },
  {
    id: 'ssl',
    name: 'SSL Checker',
    link: 'https://www.sslshopper.com/ssl-checker.html',
    order: 3,
    category: 'Seguridad básica',
    what: `Verifica si el certificado SSL está correctamente instalado, si es válido, cuándo expira y si hay problemas de cadena o mixed content.

Un SSL mal configurado genera avisos de "No seguro" en el navegador y puede matar conversiones.`,
    howToUse: [
      'Entrá a sslshopper.com/ssl-checker.html',
      'Pegá el dominio',
      'Revisá el estado del certificado, la cadena y la fecha de expiración',
      'Fijate si hay warnings de intermediate certificates'
    ],
    howToNote: [
      'Válido / No válido',
      'Fecha de expiración exacta',
      'Tipo: DV (Domain Validation), OV u EV',
      'Problemas de cadena (incomplete chain)',
      'Si el sitio fuerza HTTPS o todavía sirve contenido por HTTP'
    ],
    optimize: [
      'Certificado por vencer → renovar ya (idealmente con renovación automática)',
      'Cadena incompleta → instalar el intermediate certificate correctamente',
      'Mixed content → buscar recursos HTTP dentro de páginas HTTPS y corregirlos',
      'No forzar HTTPS → activar redirección 301 de HTTP a HTTPS'
    ],
    commonProblems: [
      'Certificado expirado o a punto de expirar',
      'Cadena incompleta (común en algunos hostings baratos)',
      'Mixed content que rompe el candado verde'
    ]
  },
  {
    id: 'securityheaders',
    name: 'Security Headers',
    link: 'https://securityheaders.com',
    order: 4,
    category: 'Seguridad',
    what: `Analiza los headers HTTP de seguridad que envía el servidor. Te da un score de A+ a F y te dice exactamente qué headers faltan o están mal configurados.

Es una de las formas más rápidas de detectar si el sitio está expuesto a XSS, clickjacking, MIME sniffing, etc.`,
    howToUse: [
      'Entrá a securityheaders.com',
      'Pegá la URL completa (con https://)',
      'Esperá el score y la lista de headers',
      'Revisá especialmente los que están en rojo o naranja'
    ],
    howToNote: [
      'Score general (A+, A, B, C, D, F)',
      'Headers que faltan completamente',
      'Headers presentes pero con valores débiles',
      'Presencia o ausencia de Content-Security-Policy'
    ],
    optimize: [
      'Content-Security-Policy (CSP) — el más importante y el más complejo',
      'Strict-Transport-Security (HSTS) con max-age alto',
      'X-Frame-Options: DENY o SAMEORIGIN',
      'X-Content-Type-Options: nosniff',
      'Referrer-Policy: strict-origin-when-cross-origin o más restrictiva',
      'Permissions-Policy (antes Feature-Policy)'
    ],
    commonProblems: [
      'Score F o D por falta total de headers de seguridad',
      'CSP demasiado permisivo (default-src *) que no protege nada',
      'HSTS ausente en sitios que ya usan HTTPS'
    ]
  },
  {
    id: 'sucuri',
    name: 'Sucuri SiteCheck',
    link: 'https://sitecheck.sucuri.net',
    order: 5,
    category: 'Seguridad / Malware',
    what: `Escanea el sitio en busca de malware conocido, webshells, blacklists de Google/Norton/McAfee y otros problemas de seguridad visibles desde afuera.

No reemplaza una auditoría de seguridad profunda, pero detecta infecciones evidentes y si el sitio está marcado como peligroso.`,
    howToUse: [
      'Entrá a sitecheck.sucuri.net',
      'Pegá el dominio',
      'Esperá el escaneo completo',
      'Revisá las secciones de Malware, Blacklisting y Website details'
    ],
    howToNote: [
      'Estado final: Clean / Infected / Warnings',
      'Si aparece en alguna blacklist (Google Safe Browsing, etc.)',
      'Malware o código sospechoso detectado',
      'Versión de software detectada si aparece (PHP, CMS, etc.)'
    ],
    optimize: [
      'Sitio en blacklist → prioridad máxima: limpiar y pedir reconsideración',
      'Malware detectado → recomendar limpieza profesional + cambio de contraseñas + auditoría de plugins',
      'Software desactualizado detectado → plan de actualización'
    ],
    commonProblems: [
      'WordPress infectado por plugins nulled o desactualizados',
      'Sitio en Google Safe Browsing sin que el dueño lo sepa',
      'Backdoors que reaparecen después de una limpieza superficial'
    ]
  },
  {
    id: 'pagespeed',
    name: 'PageSpeed Insights',
    link: 'https://pagespeed.web.dev',
    order: 6,
    category: 'Performance',
    what: `Herramienta oficial de Google. Mide Core Web Vitals (LCP, INP, CLS) y te da un score de 0-100 en Desktop y Mobile, junto con una lista priorizada de oportunidades de mejora.

Es la métrica que más les importa a los clientes de USA porque afecta SEO y experiencia de usuario.`,
    howToUse: [
      'Entrá a pagespeed.web.dev',
      'Pegá la URL de la Homepage (y después 1-2 páginas internas importantes)',
      'Corré el análisis en Mobile y Desktop',
      'Bajá hasta la sección "Diagnostics" y "Opportunities"',
      'Anotá los valores reales de LCP, INP y CLS, no solo el score'
    ],
    howToNote: [
      'Score Desktop y Score Mobile (los dos)',
      'LCP (Largest Contentful Paint) en segundos',
      'INP (Interaction to Next Paint) en milisegundos',
      'CLS (Cumulative Layout Shift)',
      'Top 3-5 oportunidades con mayor ahorro estimado',
      'Peso total de la página y cantidad de requests'
    ],
    optimize: [
      'LCP alto → optimizar la imagen o elemento principal (hero), usar preload, mejorar TTFB',
      'INP alto → reducir JavaScript de terceros, romper tareas largas, diferir scripts no críticos',
      'CLS alto → siempre definir width/height en imágenes y ads, evitar insertar contenido arriba del fold',
      'Imágenes pesadas → convertir a WebP/AVIF + lazy loading + tamaños correctos',
      'CSS/JS bloqueante → critical CSS + defer/async en scripts',
      'Muchos requests → consolidar, usar HTTP/2 o HTTP/3, CDN'
    ],
    commonProblems: [
      'Score Mobile < 50 por imágenes sin optimizar y JS de marketing',
      'CLS alto por banners o fuentes que cargan tarde',
      'LCP > 4s en mobile por hero image de 2MB'
    ]
  },
  {
    id: 'screamingfrog',
    name: 'Screaming Frog',
    link: 'https://www.screamingfrog.co.uk',
    order: 7,
    category: 'SEO Técnico',
    what: `Crawler de escritorio (hay versión free limitada a 500 URLs). Recorre todo el sitio y te permite analizar títulos, meta descriptions, H1, estados HTTP, redirects, canonicals, imágenes, hreflang, etc.

Es la herramienta más poderosa de la auditoría para SEO técnico.`,
    howToUse: [
      'Descargá e instalá Screaming Frog (versión free alcanza para la mayoría de sitios de 10-15 páginas)',
      'Pegá el dominio y dale a Start',
      'Cuando termine el crawl, revisá las pestañas: Internal, Response Codes, Titles, Meta Description, H1, Images, Canonicals, Directives',
      'Exportá los reportes que necesites (o tomá capturas de los filtros importantes)'
    ],
    howToNote: [
      'Total de URLs crawladas vs. las que deberían existir',
      'Errores 4xx y 5xx (cantidad y ejemplos)',
      'Títulos faltantes, duplicados o demasiado largos/cortos',
      'Meta descriptions faltantes o duplicadas',
      'H1 faltantes, múltiples H1, o H1 vacíos',
      'Imágenes sin atributo alt',
      'Redirects 301/302 y si hay cadenas (redirect chains)',
      'Canonicals faltantes, rotos o apuntando mal',
      'Páginas bloqueadas por robots.txt que no deberían estarlo'
    ],
    optimize: [
      'Todos los 4xx/5xx deben corregirse o redirigirse',
      'Cada página importante necesita title único (50-60 caracteres) y meta description única (150-160)',
      'Un solo H1 por página, descriptivo y con keyword principal',
      'Todas las imágenes significativas deben tener alt',
      'Eliminar cadenas de redirects (máximo 1 redirección)',
      'Canonicals autoconsistentes y correctos',
      'Sitemap.xml actualizado y enviado a Search Console'
    ],
    commonProblems: [
      'Muchos títulos duplicados (muy común en e-commerce y sitios con filtros)',
      'Imágenes sin alt (accesibilidad + SEO de imágenes)',
      'Redirect chains de 3-4 hops por cambios de URL viejos',
      'Canonicals apuntando a la home o a URLs incorrectas'
    ]
  },
  {
    id: 'wave',
    name: 'WAVE (WebAIM)',
    link: 'https://wave.webaim.org',
    order: 8,
    category: 'Accesibilidad',
    what: `Analiza accesibilidad web según criterios WCAG. Detecta errores de contraste, imágenes sin texto alternativo, formularios sin labels, estructura de headings incorrecta, etc.

En el mercado de Estados Unidos la accesibilidad (ADA) es un tema legal real. Muchos sitios reciben demandas por no ser accesibles.`,
    howToUse: [
      'Entrá a wave.webaim.org',
      'Pegá la URL de la Homepage y después de 2-3 páginas clave (contacto, producto, checkout si hay)',
      'Revisá los iconos rojos (Errors) y amarillos (Alerts)',
      'Hacé clic en los iconos para ver el detalle del problema'
    ],
    howToNote: [
      'Cantidad de Errors críticos',
      'Cantidad de Alerts importantes',
      'Problemas de contraste de color (los más frecuentes)',
      'Imágenes sin alt o con alt vacío',
      'Formularios sin label asociado',
      'Estructura de headings saltada (H1 → H3 sin H2)'
    ],
    optimize: [
      'Corregir contraste: texto debe tener ratio mínimo 4.5:1 (3:1 para texto grande)',
      'Todas las imágenes informativas necesitan alt descriptivo',
      'Cada input de formulario debe tener un <label> asociado',
      'La jerarquía de headings debe ser lógica (no saltar niveles)',
      'Asegurar navegación completa por teclado',
      'Botones y links deben tener texto accesible (no solo iconos)'
    ],
    commonProblems: [
      'Texto gris claro sobre fondo blanco (contraste insuficiente)',
      'Botones con solo icono y sin aria-label',
      'Formularios de contacto sin labels visibles ni aria'
    ]
  },
  {
    id: 'manual',
    name: 'Revisión Manual',
    link: null,
    order: 9,
    category: 'UX & Conversión',
    what: `Análisis cualitativo hecho por vos. Ninguna herramienta reemplaza mirar el sitio como lo mira un usuario real.

Se revisa la Homepage y 3-5 páginas clave (producto/servicio, pricing, about, contacto, blog si es relevante).`,
    howToUse: [
      'Abrí el sitio en Chrome (idealmente también en mobile o con DevTools en modo responsive)',
      'Navegá como si fueras un cliente potencial',
      'Cronometrá cuánto tarda en entender de qué se trata el sitio',
      'Revisá cada CTA: ¿se entiende qué pasa si hago clic?',
      'Probá los formularios (sin enviar si no hace falta)',
      'Fijate si hay prueba social, logos de clientes, reviews, garantías'
    ],
    howToNote: [
      'Propuesta de valor: ¿queda clara en menos de 5 segundos?',
      'CTA principal: cantidad, ubicación, claridad del texto',
      'Formularios: cantidad de campos, fricción, mensajes de error',
      'Trust signals: reviews, logos, certificaciones, casos de éxito, años en el mercado',
      'Navegación: ¿es intuitiva? ¿se entiende la estructura?',
      'Copy: está orientado a beneficios o solo lista features',
      'Mobile: ¿se puede usar bien con una mano? ¿los botones son tocables?'
    ],
    optimize: [
      'Propuesta de valor arriba del fold, concreta y orientada a resultado',
      'Un CTA principal dominante (no 5 botones compitiendo)',
      'Reducir campos de formularios al mínimo indispensable',
      'Poner prueba social cerca de los CTAs y de los precios',
      'Copy que hable del problema del cliente y del resultado, no de las features',
      'En mobile: botones grandes, poco texto, CTAs fáciles de tocar'
    ],
    commonProblems: [
      'Hero genérico tipo "Soluciones innovadoras para tu negocio"',
      'Formulario de 12 campos para una simple consulta',
      'CTA "Enviar" o "Submit" en vez de "Quiero mi cotización" o "Agendar llamada"',
      'Cero prueba social en toda la Homepage'
    ]
  }
]

export const GUIDE_STEPS = [
  {
    title: '1. Preparación',
    items: [
      'Creá el cliente en el sistema (nombre + dominio)',
      'Abrí una carpeta local o en Drive con el nombre del cliente',
      'Tené abiertas las herramientas que vas a usar (o andá abriéndolas de a una)'
    ]
  },
  {
    title: '2. Orden recomendado de ejecución',
    items: [
      'BuiltWith → mapa de tecnologías',
      'Whois + SSL + Security Headers + Sucuri → seguridad y dominio (rápido)',
      'PageSpeed Insights → performance (Desktop + Mobile)',
      'Screaming Frog → crawl completo SEO técnico',
      'WAVE → accesibilidad',
      'Revisión Manual → UX y conversión'
    ]
  },
  {
    title: '3. Cómo trabajar cada herramienta',
    items: [
      'Abrí la herramienta',
      'Seguí el "Cómo se usa" de cada una',
      'Escribí las notas en el campo correspondiente',
      'Marcá la herramienta como completada',
      'Pasá a la siguiente'
    ]
  },
  {
    title: '4. Generar el informe',
    items: [
      'Cuando todas las herramientas estén marcadas, generá el resumen',
      'Copiá el resumen',
      'Pegalo en Claude / GPT / Gemini junto con el prompt de informe',
      'Revisá el texto que te genera la IA y ajustalo',
      'Convertí a PDF'
    ]
  },
  {
    title: '5. Mensaje de venta',
    items: [
      'Tomá el resumen ejecutivo del informe',
      'Usá el prompt de mensaje de venta',
      'Personalizá con 1-2 hallazgos específicos del sitio',
      'Enviá por email o LinkedIn'
    ]
  }
]
