// Standalone HTML code generators for Riquitech Suite

export function getDashboardStandaloneHtmlCode(webhookUrl: string = 'URL_DEL_WEBHOOK_GET_LEADS_N8N'): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Riquitech - Panel de Leads</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    /* Variables y Paleta de Colores Corporativa */
    :root {
      --color-primary: #11212F;
      --color-primary-dark: #0a151f;
      --color-surface: rgba(255, 255, 255, 0.05);
      --color-surface-hover: rgba(255, 255, 255, 0.08);
      --color-border: #23425e;
      --color-secondary: #F7C35A;
      --color-secondary-hover: #e5b34f;
      --color-text: #FFFFFF;
      --color-text-muted: rgba(255, 255, 255, 0.7);
      
      /* Badges de Clasificación */
      --badge-hot-bg: #991b1b;
      --badge-hot-text: #ffffff;
      --badge-warm-bg: #F7C35A;
      --badge-warm-text: #11212F;
      --badge-cold-bg: #93c5fd;
      --badge-cold-text: #0f172a;
      --badge-unqualified-bg: #374151;
      --badge-unqualified-text: #d1d5db;
      
      --font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--color-primary);
      color: var(--color-text);
      font-family: var(--font-family);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .container {
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    header {
      background-color: rgba(17, 33, 47, 0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--color-border);
      position: sticky;
      top: 0;
      z-index: 40;
    }

    .header-content {
      height: 76px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
    }

    .brand-block {
      display: flex;
      align-items: center;
      gap: 0.875rem;
    }

    .brand-logo {
      width: 40px;
      height: 40px;
      background-color: var(--color-secondary);
      color: var(--color-primary);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.25rem;
      box-shadow: 0 4px 12px rgba(247, 195, 90, 0.2);
    }

    .brand-info h1 {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    .brand-info span {
      font-size: 0.75rem;
      color: var(--color-text-muted);
      display: block;
    }

    .btn-refresh {
      background-color: var(--color-secondary);
      color: var(--color-primary);
      border: none;
      border-radius: 8px;
      padding: 0.625rem 1.25rem;
      font-size: 0.875rem;
      font-weight: 700;
      font-family: var(--font-family);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .btn-refresh:hover:not(:disabled) {
      background-color: var(--color-secondary-hover);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(247, 195, 90, 0.25);
    }

    .btn-refresh:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }

    .btn-refresh svg {
      width: 16px;
      height: 16px;
      transition: transform 0.4s ease;
    }

    .btn-refresh.loading svg {
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .dashboard-toolbar {
      padding: 2rem 0 1rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .stats-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .stat-pill {
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.625rem;
      font-size: 0.8125rem;
    }

    .stat-pill .number {
      font-weight: 800;
      color: var(--color-secondary);
      font-variant-numeric: tabular-nums;
    }

    .filter-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .filter-select {
      background-color: var(--color-primary-dark);
      border: 1px solid var(--color-border);
      color: var(--color-text);
      font-family: var(--font-family);
      font-size: 0.8125rem;
      padding: 0.5rem 2rem 0.5rem 0.875rem;
      border-radius: 6px;
      outline: none;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23F7C35A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 0.875em;
    }

    .filter-select:focus {
      border-color: var(--color-secondary);
    }

    main {
      flex: 1;
      padding: 1rem 0 3rem;
    }

    .table-container {
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
    }

    .table-responsive {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.875rem;
    }

    thead {
      background-color: rgba(10, 21, 31, 0.85);
      border-bottom: 2px solid var(--color-border);
    }

    th {
      padding: 1rem 1.25rem;
      font-weight: 700;
      color: var(--color-text-muted);
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }

    tbody tr {
      border-bottom: 1px solid var(--color-border);
      transition: background-color 0.15s ease;
    }

    tbody tr:hover {
      background-color: var(--color-surface-hover);
    }

    tbody tr:last-child {
      border-bottom: none;
    }

    td {
      padding: 1.125rem 1.25rem;
      vertical-align: middle;
    }

    .col-fecha {
      font-size: 0.8125rem;
      color: var(--color-text-muted);
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }

    .contact-cell .name {
      font-weight: 700;
      color: var(--color-text);
      text-transform: capitalize;
    }

    .contact-cell .email {
      font-size: 0.8125rem;
      color: var(--color-secondary);
      display: block;
      margin-top: 0.15rem;
    }

    .contact-cell .phone {
      font-size: 0.75rem;
      color: var(--color-text-muted);
      display: block;
    }

    .company-cell .company-name {
      font-weight: 600;
      color: var(--color-text);
      text-transform: capitalize;
    }

    .company-cell .industry-badge {
      display: inline-block;
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }

    .score-cell {
      white-space: nowrap;
    }

    .score-wrap {
      display: flex;
      align-items: center;
      gap: 0.625rem;
    }

    .score-value {
      font-weight: 800;
      font-size: 1rem;
      color: var(--color-secondary);
      font-variant-numeric: tabular-nums;
      min-width: 28px;
    }

    .score-bar-bg {
      width: 50px;
      height: 6px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      overflow: hidden;
    }

    .score-bar-fill {
      height: 100%;
      background-color: var(--color-secondary);
      border-radius: 9999px;
    }

    .badge {
      display: inline-block;
      padding: 0.3rem 0.75rem;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }

    .badge-hot {
      background-color: var(--badge-hot-bg);
      color: var(--badge-hot-text);
      border: 1px solid #dc2626;
      box-shadow: 0 2px 8px rgba(153, 27, 27, 0.4);
    }

    .badge-warm {
      background-color: var(--badge-warm-bg);
      color: var(--badge-warm-text);
      border: 1px solid #f9d27d;
      box-shadow: 0 2px 8px rgba(247, 195, 90, 0.25);
    }

    .badge-cold {
      background-color: var(--badge-cold-bg);
      color: var(--badge-cold-text);
      border: 1px solid #bfdbfe;
    }

    .badge-unqualified {
      background-color: var(--badge-unqualified-bg);
      color: var(--badge-unqualified-text);
      border: 1px solid #4b5563;
    }

    .action-cell {
      font-size: 0.8125rem;
      line-height: 1.45;
      color: rgba(255, 255, 255, 0.85);
      max-width: 340px;
    }

    .state-row {
      text-align: center;
      padding: 4rem 1.5rem !important;
    }

    .loading-spinner {
      width: 36px;
      height: 36px;
      border: 3px solid rgba(247, 195, 90, 0.2);
      border-top-color: var(--color-secondary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 1rem;
    }

    .loading-text {
      color: var(--color-secondary);
      font-weight: 600;
      font-size: 0.95rem;
    }

    .empty-error-text {
      color: #fca5a5;
      background-color: rgba(127, 29, 29, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.4);
      padding: 1rem 1.5rem;
      border-radius: 8px;
      display: inline-block;
      font-size: 0.875rem;
      max-width: 600px;
      line-height: 1.5;
    }

    footer {
      background-color: var(--color-primary-dark);
      border-top: 1px solid var(--color-border);
      padding: 1.5rem 0;
      text-align: center;
      font-size: 0.8125rem;
      color: var(--color-text-muted);
    }

    @media (max-width: 768px) {
      .header-content {
        height: auto;
        padding: 1rem 0;
        flex-direction: column;
        align-items: stretch;
      }

      .btn-refresh {
        justify-content: center;
      }

      .dashboard-toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .filter-group {
        width: 100%;
      }

      .filter-select {
        width: 100%;
      }
    }
  </style>
</head>
<body>

  <header>
    <div class="container">
      <div class="header-content">
        <div class="brand-block">
          <div class="brand-logo">R</div>
          <div class="brand-info">
            <h1>Riquitech - Panel de Leads</h1>
            <span>Gestión B2B & Inteligencia de Clasificación</span>
          </div>
        </div>

        <button id="btnRefresh" class="btn-refresh" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 2v6h-6"></path>
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
            <path d="M3 22v-6h6"></path>
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
          </svg>
          <span id="btnRefreshText">Actualizar Datos</span>
        </button>
      </div>
    </div>
  </header>

  <main>
    <div class="container">
      <div class="dashboard-toolbar">
        <div class="stats-strip">
          <div class="stat-pill">
            <span>Total Leads:</span>
            <span id="statTotal" class="number">0</span>
          </div>
          <div class="stat-pill">
            <span style="color: #f87171;">Hot:</span>
            <span id="statHot" class="number">0</span>
          </div>
          <div class="stat-pill">
            <span style="color: #F7C35A;">Warm:</span>
            <span id="statWarm" class="number">0</span>
          </div>
        </div>

        <div class="filter-group">
          <select id="classificationFilter" class="filter-select">
            <option value="all">Todas las Clasificaciones</option>
            <option value="hot">Solo Hot</option>
            <option value="warm">Solo Warm</option>
            <option value="cold">Solo Cold</option>
            <option value="unqualified">Solo Unqualified</option>
          </select>
        </div>
      </div>

      <div class="table-container">
        <div class="table-responsive">
          <table id="leadsTable">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Contacto</th>
                <th>Empresa & Industria</th>
                <th>Score</th>
                <th>Clasificación</th>
                <th>Acción Recomendada</th>
              </tr>
            </thead>
            <tbody id="leadsBody">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>

  <footer>
    <div class="container">
      <div>&copy; 2026 Riquitech Technologies. Panel de Administración y Captación B2B.</div>
    </div>
  </footer>

  <script>
    (function() {
      const WEBHOOK_GET_LEADS_URL = '${webhookUrl}';

      const leadsBody = document.getElementById('leadsBody');
      const btnRefresh = document.getElementById('btnRefresh');
      const btnRefreshText = document.getElementById('btnRefreshText');
      const classificationFilter = document.getElementById('classificationFilter');
      const statTotal = document.getElementById('statTotal');
      const statHot = document.getElementById('statHot');
      const statWarm = document.getElementById('statWarm');

      let rawLeads = [];

      const DEMO_LEADS = [
        {
          "id": 1,
          "created_at": "2026-10-24T19:30:15.710171+00:00",
          "name": "nicolas",
          "lastname": "riquelme",
          "email": "nicolas.riquelme@bue.edu.ar",
          "company_size": "1-10",
          "message": "estoy necesitando una consultoría en n8n y agentes de ia",
          "phone": 1169018596,
          "company": "riquitech",
          "industry": "Tecnología",
          "origen": "landing_b2b_captacion",
          "score": 85,
          "clasificacion": "hot",
          "accion_recomendada": "Contactar inmediatamente para agendar consultoría técnica de n8n e IA.",
          "scoring_breakdown": {
            "email_valido": 20,
            "empresa_identificada": 20,
            "dominio_enriquecido": 15,
            "nivel_enriquecimiento": 10,
            "intencion_comercial": 20
          }
        },
        {
          "id": 2,
          "created_at": "2026-10-24T18:14:02.320110+00:00",
          "name": "valeria",
          "lastname": "gomez",
          "email": "valeria.g@fintechsur.com",
          "company_size": "51-200",
          "message": "Automatizar procesos de conciliación contable y facturación.",
          "phone": 5491143219876,
          "company": "Fintech Sur",
          "industry": "Finanzas",
          "origen": "landing_b2b_captacion",
          "score": 92,
          "clasificacion": "hot",
          "accion_recomendada": "Agendar llamada técnica para integración de webhook n8n y OCR.",
          "scoring_breakdown": {
            "email_valido": 20,
            "empresa_identificada": 20,
            "dominio_enriquecido": 15,
            "nivel_enriquecimiento": 17,
            "intencion_comercial": 20
          }
        },
        {
          "id": 3,
          "created_at": "2026-10-24T16:45:20.123456+00:00",
          "name": "rodrigo",
          "lastname": "castro",
          "email": "rcastro@logisticalatam.cl",
          "company_size": "201-500",
          "message": "Buscamos conectar nuestro WMS con transportistas vía APIs.",
          "phone": 56987654321,
          "company": "Logística Latam",
          "industry": "Retail",
          "origen": "landing_b2b_captacion",
          "score": 74,
          "clasificacion": "warm",
          "accion_recomendada": "Enviar propuesta referencial y caso de éxito de optimización de rutas.",
          "scoring_breakdown": {
            "email_valido": 20,
            "empresa_identificada": 20,
            "dominio_enriquecido": 10,
            "nivel_enriquecimiento": 9,
            "intencion_comercial": 15
          }
        },
        {
          "id": 4,
          "created_at": "2026-10-24T14:20:10.554321+00:00",
          "name": "esteban",
          "lastname": "morales",
          "email": "contacto@consultorageneral.com",
          "company_size": "11-50",
          "message": "Consultando servicios para clientes de mi agencia.",
          "phone": 1155443322,
          "company": "Consultora General",
          "industry": "Otro",
          "origen": "landing_b2b_captacion",
          "score": 48,
          "clasificacion": "cold",
          "accion_recomendada": "Nurturing vía secuencia de emails educativos de automatización.",
          "scoring_breakdown": {
            "email_valido": 20,
            "empresa_identificada": 10,
            "dominio_enriquecido": 5,
            "nivel_enriquecimiento": 5,
            "intencion_comercial": 8
          }
        },
        {
          "id": 5,
          "created_at": "2026-10-24T11:05:40.897654+00:00",
          "name": "marcos",
          "lastname": "test",
          "email": "test@gmail.com",
          "company_size": "1-10",
          "message": "prueba",
          "phone": null,
          "company": "Independiente",
          "industry": "Otro",
          "origen": "landing_b2b_captacion",
          "score": 18,
          "clasificacion": "unqualified",
          "accion_recomendada": "Descartar o solicitar correo corporativo verificable.",
          "scoring_breakdown": {
            "email_valido": 10,
            "empresa_identificada": 0,
            "dominio_enriquecido": 0,
            "nivel_enriquecimiento": 0,
            "intencion_comercial": 8
          }
        }
      ];

      function formatDate(isoString) {
        if (!isoString) return '-';
        try {
          const date = new Date(isoString);
          if (isNaN(date.getTime())) return isoString;
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;
        } catch (e) {
          return isoString;
        }
      }

      function getBadgeClass(clasificacion) {
        const val = String(clasificacion || '').toLowerCase().trim();
        switch (val) {
          case 'hot':
            return 'badge-hot';
          case 'warm':
            return 'badge-warm';
          case 'cold':
            return 'badge-cold';
          case 'unqualified':
          default:
            return 'badge-unqualified';
        }
      }

      function showLoading() {
        btnRefresh.disabled = true;
        btnRefresh.classList.add('loading');
        btnRefreshText.textContent = 'Cargando...';

        leadsBody.innerHTML = '<tr><td colspan="6" class="state-row">' +
          '<div class="loading-spinner"></div>' +
          '<div class="loading-text">Cargando leads desde n8n...</div>' +
          '</td></tr>';
      }

      function showError(message) {
        btnRefresh.disabled = false;
        btnRefresh.classList.remove('loading');
        btnRefreshText.textContent = 'Actualizar Datos';

        leadsBody.innerHTML = '<tr><td colspan="6" class="state-row">' +
          '<div class="empty-error-text">' + message + '</div>' +
          '</td></tr>';

        updateMetrics([]);
      }

      function renderRows(leads) {
        btnRefresh.disabled = false;
        btnRefresh.classList.remove('loading');
        btnRefreshText.textContent = 'Actualizar Datos';

        if (!leads || leads.length === 0) {
          showError('No se encontraron leads o hubo un error al conectar con n8n.');
          return;
        }

        const rowsHtml = leads.map(lead => {
          const formattedDate = formatDate(lead.created_at);
          const fullName = ((lead.name || '') + ' ' + (lead.lastname || '')).trim() || 'Sin nombre';
          const email = lead.email || 'Sin correo';
          const phone = lead.phone ? '<span class="phone">Tel: ' + lead.phone + '</span>' : '';
          const company = lead.company || 'Sin empresa';
          const industry = lead.industry || 'General';
          const score = typeof lead.score === 'number' ? lead.score : 0;
          const scorePercent = Math.min(Math.max(score, 0), 100);
          const clasificacion = lead.clasificacion || 'unqualified';
          const badgeClass = getBadgeClass(clasificacion);
          const accion = lead.accion_recomendada || 'Pendiente de evaluación.';

          return '<tr>' +
            '<td class="col-fecha">' + formattedDate + '</td>' +
            '<td class="contact-cell">' +
              '<div class="name">' + fullName + '</div>' +
              '<span class="email">' + email + '</span>' +
              phone +
            '</td>' +
            '<td class="company-cell">' +
              '<div class="company-name">' + company + '</div>' +
              '<span class="industry-badge">' + industry + '</span>' +
            '</td>' +
            '<td class="score-cell">' +
              '<div class="score-wrap">' +
                '<span class="score-value">' + score + '</span>' +
                '<div class="score-bar-bg" title="Score: ' + score + '/100">' +
                  '<div class="score-bar-fill" style="width: ' + scorePercent + '%;"></div>' +
                '</div>' +
              '</div>' +
            '</td>' +
            '<td><span class="badge ' + badgeClass + '">' + clasificacion + '</span></td>' +
            '<td class="action-cell">' + accion + '</td>' +
          '</tr>';
        }).join('');

        leadsBody.innerHTML = rowsHtml;
      }

      function updateMetrics(leads) {
        const total = leads.length;
        const hot = leads.filter(l => String(l.clasificacion).toLowerCase() === 'hot').length;
        const warm = leads.filter(l => String(l.clasificacion).toLowerCase() === 'warm').length;

        statTotal.textContent = total;
        statHot.textContent = hot;
        statWarm.textContent = warm;
      }

      function applyFilter() {
        const filterValue = classificationFilter.value;
        if (filterValue === 'all') {
          renderRows(rawLeads);
        } else {
          const filtered = rawLeads.filter(l => String(l.clasificacion).toLowerCase() === filterValue);
          renderRows(filtered);
        }
      }

      async function fetchLeads() {
        showLoading();

        try {
          let data;

          if (WEBHOOK_GET_LEADS_URL === 'URL_DEL_WEBHOOK_GET_LEADS_N8N' || !WEBHOOK_GET_LEADS_URL.startsWith('http')) {
            await new Promise(resolve => setTimeout(resolve, 800));
            data = DEMO_LEADS;
          } else {
            const response = await fetch(WEBHOOK_GET_LEADS_URL, {
              method: 'GET',
              headers: {
                'Accept': 'application/json'
              }
            });

            if (!response.ok) {
              throw new Error('Estado HTTP ' + response.status);
            }

            data = await response.json();
          }

          if (!Array.isArray(data) || data.length === 0) {
            showError('No se encontraron leads o hubo un error al conectar con n8n.');
            return;
          }

          rawLeads = data;
          updateMetrics(rawLeads);
          applyFilter();

        } catch (error) {
          showError('No se encontraron leads o hubo un error al conectar con n8n.');
        }
      }

      btnRefresh.addEventListener('click', function() {
        fetchLeads();
      });

      classificationFilter.addEventListener('change', function() {
        applyFilter();
      });

      fetchLeads();
    })();
  </script>
</body>
</html>`;
}

export function getStandaloneHtmlCode(webhookEndpoint: string = 'URL_DEL_WEBHOOK_DE_N8N'): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Riquitech - IA y Automatización de Procesos Empresariales</title>
  <meta name="description" content="Landing page de captación B2B de alto rendimiento para Riquitech, especialista en Inteligencia Artificial y Automatización de Procesos." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-primary: #11212F;
      --color-primary-dark: #0b1620;
      --color-surface: #162a3c;
      --color-surface-hover: #1d354a;
      --color-border: #23425e;
      --color-secondary: #F7C35A;
      --color-secondary-hover: #e5b34f;
      --color-text: #FFFFFF;
      --color-text-muted: rgba(255, 255, 255, 0.75);
      --color-error: #ef4444;
      --color-error-bg: rgba(127, 29, 29, 0.4);
      --font-main: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background-color: var(--color-primary); color: var(--color-text); font-family: var(--font-main); line-height: 1.6; }
    .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

    header { background-color: rgba(17, 33, 47, 0.95); backdrop-filter: blur(8px); border-bottom: 1px solid var(--color-border); position: sticky; top: 0; z-index: 50; }
    .header-inner { height: 76px; display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
    .brand-logo { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: var(--color-text); }
    .brand-icon { width: 40px; height: 40px; background-color: var(--color-secondary); color: var(--color-primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.25rem; }
    .brand-title { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.02em; }
    .brand-tag { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-muted); display: block; }
    nav { display: none; align-items: center; gap: 2rem; }
    @media (min-width: 768px) { nav { display: flex; } }
    nav a { color: var(--color-text-muted); text-decoration: none; font-size: 0.875rem; font-weight: 500; transition: color 0.2s ease; }
    nav a:hover { color: var(--color-secondary); }
    .btn-header { background-color: var(--color-secondary); color: var(--color-primary); text-decoration: none; font-size: 0.875rem; font-weight: 600; padding: 0.625rem 1.25rem; border-radius: 8px; transition: all 0.2s ease; white-space: nowrap; }
    .btn-header:hover { background-color: var(--color-secondary-hover); }

    .hero { padding: 4.5rem 0 4rem; text-align: center; border-bottom: 1px solid var(--color-border); }
    .hero-badge { display: inline-block; padding: 0.375rem 1rem; border-radius: 50px; background-color: rgba(247, 195, 90, 0.1); border: 1px solid rgba(247, 195, 90, 0.25); color: var(--color-secondary); font-size: 0.75rem; font-weight: 600; margin-bottom: 1.5rem; text-transform: uppercase; }
    .hero h1 { font-size: clamp(2.2rem, 5vw, 3.75rem); font-weight: 800; line-height: 1.15; margin-bottom: 1.5rem; }
    .hero h1 span { color: var(--color-secondary); }
    .hero p { font-size: clamp(1rem, 2vw, 1.25rem); color: var(--color-text-muted); max-width: 800px; margin: 0 auto 2.5rem; }
    .hero-actions { display: flex; flex-direction: column; gap: 1rem; justify-content: center; align-items: center; margin-bottom: 3.5rem; }
    @media (min-width: 640px) { .hero-actions { flex-direction: row; } }
    .btn-primary { background-color: var(--color-secondary); color: var(--color-primary); text-decoration: none; font-size: 1rem; font-weight: 700; padding: 0.875rem 2rem; border-radius: 8px; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.2s ease; width: 100%; }
    @media (min-width: 640px) { .btn-primary { width: auto; } }
    .btn-primary:hover { background-color: var(--color-secondary-hover); transform: translateY(-2px); }
    .btn-secondary { background-color: var(--color-surface); color: var(--color-text); text-decoration: none; font-size: 1rem; font-weight: 600; padding: 0.875rem 1.75rem; border-radius: 8px; border: 1px solid var(--color-border); transition: all 0.2s ease; width: 100%; }
    @media (min-width: 640px) { .btn-secondary { width: auto; } }
    .btn-secondary:hover { background-color: var(--color-surface-hover); }

    .kpi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 960px; margin: 0 auto; }
    @media (min-width: 768px) { .kpi-grid { grid-template-columns: repeat(4, 1fr); } }
    .kpi-card { background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem 1rem; text-align: center; }
    .kpi-number { font-size: 1.875rem; font-weight: 800; color: var(--color-secondary); font-variant-numeric: tabular-nums; margin-bottom: 0.25rem; }
    .kpi-label { font-size: 0.8rem; color: var(--color-text-muted); font-weight: 500; }

    .lead-section { padding: 5.5rem 0; background-color: var(--color-primary); }
    .form-wrapper { max-width: 860px; margin: 0 auto; background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 2rem 1.5rem; position: relative; }
    @media (min-width: 640px) { .form-wrapper { padding: 3rem 2.5rem; } }
    .form-top-accent { position: absolute; top: 0; left: 0; right: 0; height: 5px; background-color: var(--color-secondary); border-top-left-radius: 16px; border-top-right-radius: 16px; }
    .form-header { text-align: center; margin-bottom: 2rem; }
    .form-header h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 800; margin-bottom: 0.5rem; }
    .form-header p { color: var(--color-text-muted); font-size: 0.95rem; }
    .form-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
    @media (min-width: 768px) { .form-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; } }
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .form-group.full-width { grid-column: 1 / -1; }
    label { font-size: 0.875rem; font-weight: 600; color: var(--color-text); }
    label span.req { color: var(--color-secondary); }
    input, select, textarea { width: 100%; background-color: var(--color-primary); border: 1px solid #2a4c6c; border-radius: 8px; padding: 0.75rem 1rem; color: var(--color-text); font-family: var(--font-main); font-size: 0.875rem; }
    input:focus, select:focus, textarea:focus { outline: none; border-color: var(--color-secondary); box-shadow: 0 0 0 2px rgba(247, 195, 90, 0.2); }
    .btn-submit { width: 100%; background-color: var(--color-secondary); color: var(--color-primary); border: none; border-radius: 8px; padding: 1rem 1.5rem; font-size: 1rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.75rem; }
    .btn-submit:hover:not(:disabled) { background-color: var(--color-secondary-hover); }
    .btn-submit:disabled { opacity: 0.75; cursor: not-allowed; }
    .spinner { width: 20px; height: 20px; border: 2px solid var(--color-primary); border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; display: none; }
    .btn-submit.loading .spinner { display: inline-block; }
    .error-box { display: none; margin-top: 1rem; padding: 0.875rem 1rem; background-color: var(--color-error-bg); border: 1px solid var(--color-error); border-radius: 8px; color: #fca5a5; font-size: 0.875rem; }
    .success-view { display: none; text-align: center; padding: 3rem 1rem; }
    .success-icon { width: 64px; height: 64px; background-color: rgba(247, 195, 90, 0.15); border: 2px solid var(--color-secondary); color: var(--color-secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem; }
    footer { background-color: var(--color-primary-dark); border-top: 1px solid var(--color-border); padding: 3rem 0; text-align: center; font-size: 0.875rem; color: var(--color-text-muted); }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="header-inner">
        <a href="#" class="brand-logo">
          <div class="brand-icon">R</div>
          <div><div class="brand-title">Riquitech</div><span class="brand-tag">IA & Automatización</span></div>
        </a>
        <a href="#contacto" class="btn-header">Agendar Diagnóstico</a>
      </div>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <div class="hero-badge">Agencia de IA y Automatización de Procesos</div>
      <h1>Multiplica la eficiencia operativa de tu empresa con <span>Inteligencia Artificial</span></h1>
      <p>En <strong>Riquitech</strong> diseñamos e implementamos flujos autónomos y modelos predictivos que eliminan tareas repetitivas y reducen costos operativos hasta un 60%.</p>
    </div>
  </section>

  <section id="contacto" class="lead-section">
    <div class="container">
      <div class="form-wrapper">
        <div class="form-top-accent"></div>
        <div class="form-header">
          <h2>Comienza la transformación operativa</h2>
          <p>Completa el formulario y analizaremos tus procesos para presentarte una propuesta a medida.</p>
        </div>

        <div id="successView" class="success-view">
          <div class="success-icon">&#10003;</div>
          <h3>¡Gracias por contactarnos!</h3>
          <p>Hemos recibido tu mensaje y nos comunicaremos a la brevedad.</p>
        </div>

        <form id="leadForm" novalidate>
          <div class="form-grid">
            <div class="form-group"><label for="nombre">Nombre <span class="req">*</span></label><input type="text" id="nombre" name="nombre" placeholder="Ej. Carlos" required /></div>
            <div class="form-group"><label for="apellido">Apellido <span class="req">*</span></label><input type="text" id="apellido" name="apellido" placeholder="Ej. Mendoza" required /></div>
            <div class="form-group"><label for="email">Email <span class="req">*</span></label><input type="email" id="email" name="email" placeholder="carlos@empresa.com" required /></div>
            <div class="form-group"><label for="telefono">Teléfono</label><input type="tel" id="telefono" name="telefono" placeholder="+56 9 1234 5678" /></div>
            <div class="form-group"><label for="empresa">Empresa <span class="req">*</span></label><input type="text" id="empresa" name="empresa" placeholder="Nombre de tu empresa" required /></div>
            <div class="form-group">
              <label for="industria">Industria <span class="req">*</span></label>
              <select id="industria" name="industria" required>
                <option value="" disabled selected>Selecciona una opción</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Retail">Retail</option>
                <option value="Salud">Salud</option>
                <option value="Manufactura">Manufactura</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div class="form-group">
              <label for="tamanoEmpresa">Tamaño de empresa <span class="req">*</span></label>
              <select id="tamanoEmpresa" name="tamanoEmpresa" required>
                <option value="" disabled selected>Selecciona cantidad</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="+500">+500</option>
              </select>
            </div>
            <div class="form-group full-width">
              <label for="mensaje">Mensaje o necesidad <span class="req">*</span></label>
              <textarea id="mensaje" name="mensaje" rows="4" placeholder="Describe los procesos que deseas optimizar..." required></textarea>
            </div>
          </div>

          <div style="margin-top: 1.5rem;">
            <button type="submit" id="submitBtn" class="btn-submit">
              <span class="spinner"></span>
              <span id="submitBtnText">Solicitar Diagnóstico Estratégico</span>
            </button>
            <div id="errorBox" class="error-box"></div>
          </div>
        </form>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">&copy; 2026 Riquitech Technologies. Automatización de Procesos con IA.</div>
  </footer>

  <script>
    (function() {
      const WEBHOOK_URL = '${webhookEndpoint}';
      const form = document.getElementById('leadForm');
      const submitBtn = document.getElementById('submitBtn');
      const submitBtnText = document.getElementById('submitBtnText');
      const errorBox = document.getElementById('errorBox');
      const successView = document.getElementById('successView');
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        errorBox.style.display = 'none';

        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const email = document.getElementById('email').value.trim();
        const empresa = document.getElementById('empresa').value.trim();
        const industria = document.getElementById('industria').value;
        const tamanoEmpresa = document.getElementById('tamanoEmpresa').value;
        const mensaje = document.getElementById('mensaje').value.trim();

        if (!nombre || !apellido || !empresa || !industria || !tamanoEmpresa || !mensaje) {
          errorBox.textContent = 'Por favor completa todos los campos obligatorios (*).';
          errorBox.style.display = 'block';
          return;
        }

        if (!emailRegex.test(email)) {
          errorBox.textContent = 'Por favor ingresa un correo electrónico válido.';
          errorBox.style.display = 'block';
          return;
        }

        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtnText.textContent = 'Enviando...';

        try {
          if (WEBHOOK_URL === 'URL_DEL_WEBHOOK_DE_N8N' || !WEBHOOK_URL.startsWith('http')) {
            await new Promise(r => setTimeout(r, 1200));
          } else {
            const res = await fetch(WEBHOOK_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nombre, apellido, email, empresa, industria, tamanoEmpresa, mensaje })
            });
            if (!res.ok) throw new Error('HTTP ' + res.status);
          }

          form.style.display = 'none';
          successView.style.display = 'block';
        } catch (err) {
          errorBox.textContent = 'Error al enviar (' + (err.message || 'Fallo de conexión') + '). Intenta nuevamente.';
          errorBox.style.display = 'block';
        } finally {
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
          submitBtnText.textContent = 'Solicitar Diagnóstico Estratégico';
        }
      });
    })();
  </script>
</body>
</html>`;
}
