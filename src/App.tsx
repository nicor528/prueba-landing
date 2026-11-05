import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Workflow, 
  Cpu, 
  Database, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  Copy, 
  Check, 
  Download, 
  CodeXml,
  Layers,
  Sparkles,
  PhoneCall,
  Mail,
  Building2,
  RefreshCw,
  Users,
  LayoutDashboard,
  Filter,
  Flame,
  Sun,
  Snowflake,
  Slash
} from 'lucide-react';
import { getStandaloneHtmlCode, getDashboardStandaloneHtmlCode } from './templates.ts';

interface LeadItem {
  id: number;
  created_at: string;
  name: string;
  lastname: string;
  email: string;
  company_size?: string;
  message?: string;
  phone?: number | string | null;
  company: string;
  industry: string;
  origen?: string;
  score: number;
  clasificacion: 'hot' | 'warm' | 'cold' | 'unqualified' | string;
  accion_recomendada: string;
  scoring_breakdown?: {
    email_valido?: number;
    empresa_identificada?: number;
    dominio_enriquecido?: number;
    nivel_enriquecimiento?: number;
    intencion_comercial?: number;
  };
}

const DEMO_LEADS_DATA: LeadItem[] = [
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

interface LeadFormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  empresa: string;
  industria: string;
  tamanoEmpresa: string;
  mensaje: string;
}

const initialLeadFormData: LeadFormData = {
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  empresa: '',
  industria: '',
  tamanoEmpresa: '',
  mensaje: ''
};

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('dashboard');
  const [formData, setFormData] = useState<LeadFormData>(initialLeadFormData);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('https://nicoriquelme97.app.n8n.cloud/webhook/captar-leeds-1');
  const [getLeadsWebhookUrl, setGetLeadsWebhookUrl] = useState('https://nicoriquelme97.app.n8n.cloud/webhook/obtener-leads-2');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeModalType, setCodeModalType] = useState<'landing' | 'dashboard'>('dashboard');
  const [copiedCode, setCopiedCode] = useState(false);

  // Dashboard state
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState('');
  const [filterClassification, setFilterClassification] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  // Cargar leads al inicio o al cambiar a vista dashboard
  useEffect(() => {
    if (currentView === 'dashboard') {
      fetchLeads();
    }
  }, [currentView]);

  const fetchLeads = async () => {
    setDashboardLoading(true);
    setDashboardError('');
    try {
      let data: LeadItem[];
      if (getLeadsWebhookUrl === 'URL_DEL_WEBHOOK_GET_LEADS_N8N' || !getLeadsWebhookUrl.startsWith('http')) {
        await new Promise(resolve => setTimeout(resolve, 750));
        data = DEMO_LEADS_DATA;
      } else {
        const response = await fetch(getLeadsWebhookUrl, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        data = await response.json();
      }

      if (!Array.isArray(data) || data.length === 0) {
        setDashboardError('No se encontraron leads o hubo un error al conectar con n8n.');
        setLeads([]);
      } else {
        setLeads(data);
      }
    } catch (err: unknown) {
      setDashboardError('No se encontraron leads o hubo un error al conectar con n8n.');
      setLeads([]);
    } finally {
      setDashboardLoading(false);
    }
  };

  // Email regex verification
  const isValidEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validación de campos requeridos
    if (!formData.nombre.trim() || !formData.apellido.trim() || !formData.empresa.trim() || 
        !formData.industria || !formData.tamanoEmpresa || !formData.mensaje.trim()) {
      setStatus('error');
      setErrorMessage('Por favor completa todos los campos obligatorios marcados con asterisco (*).');
      return;
    }

    // Validación de formato de email
    if (!isValidEmail(formData.email)) {
      setStatus('error');
      setErrorMessage('El formato de correo electrónico no es válido. Por favor verifica e intenta nuevamente.');
      return;
    }

    setLoading(true);
    setStatus('idle');

    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
      origen: 'landing_b2b_captacion',
      agencia: 'Riquitech'
    };

    try {
      let response;
      // Si la URL es la ficticia por defecto, simulamos la respuesta de n8n para permitir probar el flujo en vivo
      if (webhookUrl === 'URL_DEL_WEBHOOK_DE_N8N' || !webhookUrl.startsWith('http')) {
        await new Promise(resolve => setTimeout(resolve, 1200));
        response = { ok: true, status: 200 };
      } else {
        response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
      }

      if (!response.ok) {
        throw new Error(`Error en el servidor (${response.status})`);
      }

      setStatus('success');
      setFormData(initialLeadFormData);
    } catch (err: unknown) {
      setStatus('error');
      const errDetail = err instanceof Error ? err.message : 'Error de conexión';
      setErrorMessage(`Ocurrió un error al enviar el formulario (${errDetail}). Por favor revisa los datos o intenta nuevamente.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadHtml = (type: 'landing' | 'dashboard' = codeModalType) => {
    const code = type === 'landing' ? getStandaloneHtmlCode(webhookUrl) : getDashboardStandaloneHtmlCode(getLeadsWebhookUrl);
    const fileName = type === 'landing' ? 'riquitech-landing-leads.html' : 'riquitech-panel-leads.html';
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = (type: 'landing' | 'dashboard' = codeModalType) => {
    const code = type === 'landing' ? getStandaloneHtmlCode(webhookUrl) : getDashboardStandaloneHtmlCode(getLeadsWebhookUrl);
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const formatLeadDate = (isoString: string) => {
    if (!isoString) return '-';
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return isoString;
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch {
      return isoString;
    }
  };

  const getBadgeStyle = (clasificacion: string) => {
    const c = String(clasificacion || '').toLowerCase().trim();
    switch (c) {
      case 'hot':
        return 'bg-[#991b1b] text-white border border-red-500 shadow-sm shadow-red-900/50';
      case 'warm':
        return 'bg-[#F7C35A] text-[#11212F] font-bold border border-[#f9d27d]';
      case 'cold':
        return 'bg-[#93c5fd] text-[#0f172a] font-semibold border border-blue-300';
      case 'unqualified':
      default:
        return 'bg-[#374151] text-[#d1d5db] border border-gray-600';
    }
  };

  const filteredLeads = filterClassification === 'all' 
    ? leads 
    : leads.filter(l => String(l.clasificacion).toLowerCase() === filterClassification);

  return (
    <div className="min-h-screen bg-[#11212F] text-white font-['Inter',system-ui,sans-serif] selection:bg-[#F7C35A] selection:text-[#11212F] flex flex-col">
      {/* Top Banner with View Switcher & HTML export */}
      <div className="bg-[#0b1620] border-b border-[#1f374e] py-2 px-4 text-xs text-white/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F7C35A]"></span>
            <span className="font-semibold text-white">Riquitech Suite:</span>
            {/* View switcher buttons */}
            <div className="inline-flex rounded-lg bg-[#162a3c] p-0.5 border border-[#23425e]">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  currentView === 'dashboard'
                    ? 'bg-[#F7C35A] text-[#11212F] font-bold shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Panel de Leads (Admin)</span>
              </button>
              <button
                onClick={() => setCurrentView('landing')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  currentView === 'landing'
                    ? 'bg-[#F7C35A] text-[#11212F] font-bold shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Landing Page</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCodeModalType(currentView);
                setShowCodeModal(true);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#162a3c] hover:bg-[#1f374e] text-[#F7C35A] border border-[#F7C35A]/30 transition-colors cursor-pointer"
            >
              <CodeXml className="w-3.5 h-3.5" />
              <span>Ver Código HTML ({currentView === 'dashboard' ? 'Panel' : 'Landing'})</span>
            </button>
            <button
              onClick={() => handleDownloadHtml(currentView)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F7C35A] text-[#11212F] font-semibold hover:bg-[#e5b34f] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .HTML</span>
            </button>
          </div>
        </div>
      </div>

      {currentView === 'dashboard' ? (
        /* ================= VISTA ADMIN: PANEL DE LEADS ================= */
        <div className="flex-1 flex flex-col">
          {/* Header del Dashboard */}
          <header className="bg-[#11212F]/95 backdrop-blur-md border-b border-[#1f374e] py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F7C35A] text-[#11212F] flex items-center justify-center font-black text-xl shadow-md shadow-[#F7C35A]/20">
                  R
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Riquitech - Panel de Leads
                  </h1>
                  <span className="text-xs text-white/60">
                    Captación B2B & Clasificación Inteligente
                  </span>
                </div>
              </div>

              {/* Botón Actualizar Datos con SVG inline / Icono giratorio */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="btnRefreshDashboard"
                  disabled={dashboardLoading}
                  onClick={fetchLeads}
                  className="px-4 py-2.5 rounded-lg bg-[#F7C35A] text-[#11212F] font-bold text-sm hover:bg-[#e5b34f] transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#F7C35A]/15 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-4 h-4 ${dashboardLoading ? 'animate-spin' : ''}`} />
                  <span>{dashboardLoading ? 'Cargando leads...' : 'Actualizar Datos'}</span>
                </button>
              </div>
            </div>
          </header>

          {/* Área de Contenido Principal del Dashboard */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Toolbar: Métricas & Filtro */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-[rgba(255,255,255,0.05)] border border-[#23425e] px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-xs">
                  <span className="text-white/60">Total Leads:</span>
                  <span className="font-extrabold text-[#F7C35A] tabular-nums text-sm">{leads.length}</span>
                </div>
                <div className="bg-[rgba(255,255,255,0.05)] border border-[#23425e] px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-xs">
                  <span className="text-red-400">Hot:</span>
                  <span className="font-extrabold text-white tabular-nums text-sm">
                    {leads.filter(l => String(l.clasificacion).toLowerCase() === 'hot').length}
                  </span>
                </div>
                <div className="bg-[rgba(255,255,255,0.05)] border border-[#23425e] px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-xs">
                  <span className="text-[#F7C35A]">Warm:</span>
                  <span className="font-extrabold text-white tabular-nums text-sm">
                    {leads.filter(l => String(l.clasificacion).toLowerCase() === 'warm').length}
                  </span>
                </div>
                <div className="bg-[rgba(255,255,255,0.05)] border border-[#23425e] px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-xs">
                  <span className="text-blue-300">Cold:</span>
                  <span className="font-extrabold text-white tabular-nums text-sm">
                    {leads.filter(l => String(l.clasificacion).toLowerCase() === 'cold').length}
                  </span>
                </div>
              </div>

              {/* Filtro y Endpoint config */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <Filter className="w-3.5 h-3.5 text-[#F7C35A]" />
                  <select
                    value={filterClassification}
                    onChange={(e) => setFilterClassification(e.target.value)}
                    className="bg-[#0b1620] border border-[#23425e] text-white text-xs rounded-lg px-3 py-1.5 outline-none focus:border-[#F7C35A] cursor-pointer"
                  >
                    <option value="all">Todas las Clasificaciones</option>
                    <option value="hot">Solo Hot</option>
                    <option value="warm">Solo Warm</option>
                    <option value="cold">Solo Cold</option>
                    <option value="unqualified">Solo Unqualified</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    const url = prompt('Ingresa la URL del webhook GET de n8n para consultar leads reales:', getLeadsWebhookUrl);
                    if (url !== null && url.trim() !== '') {
                      setGetLeadsWebhookUrl(url.trim());
                      fetchLeads();
                    }
                  }}
                  className="text-xs text-white/50 hover:text-[#F7C35A] transition-colors underline cursor-pointer"
                >
                  Configurar Endpoint GET
                </button>
              </div>
            </div>

            {/* Data Table Responsiva con fondo rgba(255, 255, 255, 0.05) */}
            <div className="bg-[rgba(255,255,255,0.05)] border border-[#23425e] rounded-xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#0a151f]/90 border-b-2 border-[#23425e] text-xs uppercase tracking-wider text-white/70">
                      <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Fecha</th>
                      <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Contacto</th>
                      <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Empresa & Industria</th>
                      <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Score</th>
                      <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Clasificación</th>
                      <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Acción Recomendada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#23425e]">
                    {dashboardLoading ? (
                      <tr>
                        <td colSpan={6} className="py-16 text-center">
                          <div className="w-8 h-8 border-3 border-[#F7C35A]/20 border-t-[#F7C35A] rounded-full animate-spin mx-auto mb-3"></div>
                          <span className="text-[#F7C35A] font-semibold text-sm">Cargando leads...</span>
                        </td>
                      </tr>
                    ) : dashboardError ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center">
                          <div className="inline-block bg-red-950/40 border border-red-500/40 text-red-300 text-sm px-6 py-3 rounded-lg">
                            {dashboardError}
                          </div>
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-white/60 text-sm">
                          No se encontraron leads con la clasificación seleccionada.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const fullName = `${lead.name || ''} ${lead.lastname || ''}`.trim();
                        const badgeStyle = getBadgeStyle(lead.clasificacion);
                        const score = typeof lead.score === 'number' ? lead.score : 0;

                        return (
                          <tr 
                            key={lead.id} 
                            onClick={() => setSelectedLead(lead)}
                            className="hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer group"
                          >
                            {/* Fecha */}
                            <td className="py-4 px-4 whitespace-nowrap text-xs text-white/70 tabular-nums">
                              {formatLeadDate(lead.created_at)}
                            </td>

                            {/* Contacto */}
                            <td className="py-4 px-4">
                              <div className="font-bold text-white capitalize group-hover:text-[#F7C35A] transition-colors">
                                {fullName || 'Sin nombre'}
                              </div>
                              <div className="text-xs text-[#F7C35A]">{lead.email}</div>
                              {lead.phone && (
                                <div className="text-[11px] text-white/50">Tel: {lead.phone}</div>
                              )}
                            </td>

                            {/* Empresa & Industria */}
                            <td className="py-4 px-4">
                              <div className="font-semibold text-white capitalize">
                                {lead.company || 'Sin empresa'}
                              </div>
                              <div className="text-xs text-white/60 flex items-center gap-1.5 mt-0.5">
                                <span>{lead.industry || 'General'}</span>
                                {lead.company_size && (
                                  <>
                                    <span>·</span>
                                    <span>{lead.company_size} colab.</span>
                                  </>
                                )}
                              </div>
                            </td>

                            {/* Score */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-base text-[#F7C35A] tabular-nums min-w-[28px]">
                                  {score}
                                </span>
                                <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-[#F7C35A] rounded-full" 
                                    style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>

                            {/* Clasificación (Badge Visual Condicional) */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${badgeStyle}`}>
                                {lead.clasificacion}
                              </span>
                            </td>

                            {/* Acción Recomendada */}
                            <td className="py-4 px-4 text-xs text-white/85 max-w-xs leading-relaxed">
                              {lead.accion_recomendada || 'Pendiente de evaluación.'}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal de Detalle de Lead al hacer clic en una fila */}
            {selectedLead && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#11212F] border border-[#23425e] rounded-xl max-w-2xl w-full p-6 shadow-2xl relative">
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    ✕
                  </button>

                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${getBadgeStyle(selectedLead.clasificacion)}`}>
                      {selectedLead.clasificacion}
                    </span>
                    <span className="text-xs text-white/50">Score: <strong className="text-[#F7C35A] text-sm">{selectedLead.score}/100</strong></span>
                    <span className="text-xs text-white/40">·</span>
                    <span className="text-xs text-white/50">{formatLeadDate(selectedLead.created_at)}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white capitalize mb-1">
                    {selectedLead.name} {selectedLead.lastname}
                  </h3>
                  <div className="text-sm text-[#F7C35A] mb-4">{selectedLead.email} {selectedLead.phone && `· ${selectedLead.phone}`}</div>

                  <div className="grid grid-cols-2 gap-4 bg-[#162a3c] p-4 rounded-lg border border-[#23425e] mb-4 text-xs">
                    <div>
                      <span className="text-white/50 block">Empresa</span>
                      <strong className="text-white text-sm capitalize">{selectedLead.company}</strong>
                    </div>
                    <div>
                      <span className="text-white/50 block">Industria</span>
                      <strong className="text-white text-sm">{selectedLead.industry}</strong>
                    </div>
                    <div>
                      <span className="text-white/50 block">Tamaño</span>
                      <strong className="text-white">{selectedLead.company_size || 'No especificado'}</strong>
                    </div>
                    <div>
                      <span className="text-white/50 block">Origen</span>
                      <strong className="text-white">{selectedLead.origen || 'Landing B2B'}</strong>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs text-white/60 font-semibold block mb-1">Mensaje o Necesidad del Lead:</span>
                    <p className="text-xs sm:text-sm bg-[#0b1620] p-3 rounded-lg border border-[#1f374e] text-white/90 italic">
                      "{selectedLead.message || 'Sin mensaje'}"
                    </p>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs text-white/60 font-semibold block mb-1">Acción Recomendada:</span>
                    <div className="p-3 rounded-lg bg-[#F7C35A]/10 border border-[#F7C35A]/30 text-xs sm:text-sm text-white font-medium">
                      {selectedLead.accion_recomendada}
                    </div>
                  </div>

                  {selectedLead.scoring_breakdown && (
                    <div>
                      <span className="text-xs text-white/60 font-semibold block mb-2">Desglose de Scoring Algorítmico:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        {Object.entries(selectedLead.scoring_breakdown).map(([k, v]) => (
                          <div key={k} className="bg-[#0b1620] p-2 rounded border border-[#1f374e] flex justify-between">
                            <span className="text-white/60 capitalize">{k.replace(/_/g, ' ')}:</span>
                            <span className="font-bold text-[#F7C35A]">+{v} pts</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      ) : (
        /* ================= VISTA: LANDING PAGE ================= */
        <>
          {/* Top Navigation Bar */}
          <header className="sticky top-11 z-40 bg-[#11212F]/95 backdrop-blur-md border-b border-[#1f374e]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
              {/* Brand Wordmark */}
              <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
                <div className="w-10 h-10 rounded-lg bg-[#F7C35A] text-[#11212F] flex items-center justify-center font-black text-xl shadow-lg shadow-[#F7C35A]/10">
                  R
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#F7C35A] transition-colors">
                    Riquitech
                  </span>
                  <span className="text-[11px] font-medium text-white/60 tracking-wider uppercase">
                    AI & Automation
                  </span>
                </div>
              </a>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
                <a href="#soluciones" className="hover:text-[#F7C35A] transition-colors whitespace-nowrap">
                  Soluciones
                </a>
                <a href="#metricas" className="hover:text-[#F7C35A] transition-colors whitespace-nowrap">
                  Impacto y Métricas
                </a>
                <a href="#metodologia" className="hover:text-[#F7C35A] transition-colors whitespace-nowrap">
                  Metodología
                </a>
                <a href="#casos" className="hover:text-[#F7C35A] transition-colors whitespace-nowrap">
                  Casos de Éxito
                </a>
              </nav>

              {/* Primary Action Button */}
              <div className="flex items-center shrink-0">
                <a
                  href="#contacto"
                  className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#F7C35A] text-[#11212F] hover:bg-[#e5b34f] transition-all duration-200 shadow-md shadow-[#F7C35A]/10 hover:shadow-[#F7C35A]/25 whitespace-nowrap cursor-pointer"
                >
                  Agendar Diagnóstico
                </a>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-[#1f374e]">
            {/* Subtle background glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#F7C35A]/5 blur-[120px] pointer-events-none rounded-full"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182d40] border border-[#23425e] text-xs font-semibold text-[#F7C35A] mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Automatización Inteligente de Procesos Empresariales</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight md:leading-[1.15] mb-6 [text-wrap:balance]">
                  Multiplica la eficiencia operativa de tu empresa con <span className="text-[#F7C35A]">Inteligencia Artificial</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white/75 font-normal leading-relaxed mb-8 [text-wrap:balance]">
                  En <strong className="text-white font-semibold">Riquitech</strong> diseñamos e implementamos flujos autónomos y agentes cognitivos que eliminan tareas repetitivas, reducen costos operativos hasta un 60% y escalan tus operaciones sin fricción.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="#contacto"
                    className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#F7C35A] text-[#11212F] font-bold text-base hover:bg-[#e5b34f] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#F7C35A]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Solicitar Auditoría de Procesos</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#soluciones"
                    className="w-full sm:w-auto px-6 py-4 rounded-lg bg-[#182d40] text-white font-medium text-base hover:bg-[#203a52] border border-[#2a4c6c] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Explorar Soluciones</span>
                  </a>
                </div>
              </div>

              {/* KPI Strip */}
              <div id="metricas" className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8">
                <div className="bg-[#162a3c]/80 border border-[#23425e] rounded-xl p-6 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#F7C35A] tabular-nums mb-1">
                    +45,000
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 font-medium">
                    Horas manuales eliminadas
                  </div>
                </div>

                <div className="bg-[#162a3c]/80 border border-[#23425e] rounded-xl p-6 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#F7C35A] tabular-nums mb-1">
                    60%
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 font-medium">
                    Reducción media de costos
                  </div>
                </div>

                <div className="bg-[#162a3c]/80 border border-[#23425e] rounded-xl p-6 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#F7C35A] tabular-nums mb-1">
                    &lt; 30 días
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 font-medium">
                    Tiempo de puesta en marcha
                  </div>
                </div>

                <div className="bg-[#162a3c]/80 border border-[#23425e] rounded-xl p-6 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#F7C35A] tabular-nums mb-1">
                    99.8%
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 font-medium">
                    Precisión en flujos de datos
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Solutions / Capabilities Section */}
          <section id="soluciones" className="py-20 md:py-28 bg-[#0e1c28] border-b border-[#1f374e]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-14">
                <span className="text-xs font-bold text-[#F7C35A] tracking-widest uppercase">
                  Capacidades B2B
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                  Ingeniería de Automatización con IA de Extremo a Extremo
                </h2>
                <p className="text-white/70 text-base sm:text-lg">
                  Conectamos tus sistemas existentes (CRMs, ERPs, bases de datos y canales de soporte) creando arquitecturas autónomas que trabajan las 24 horas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Capability 1 */}
                <div className="bg-[#11212F] border border-[#23425e] hover:border-[#F7C35A]/50 rounded-xl p-8 transition-all duration-200">
                  <div className="w-12 h-12 rounded-lg bg-[#F7C35A]/10 border border-[#F7C35A]/20 flex items-center justify-center text-[#F7C35A] mb-6">
                    <Workflow className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-semibold text-[#F7C35A] mb-1">01. Flujos Operativos</div>
                  <h3 className="text-xl font-bold text-white mb-3">Automatización con n8n & APIs</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    Diseño de pipelines y webhooks robustos para sincronizar datos entre HubSpot, Salesforce, Notion, SAP y plataformas contables sin intervención humana.
                  </p>
                  <ul className="space-y-2 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F7C35A] shrink-0" />
                      <span>Eliminación de duplicación manual de datos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F7C35A] shrink-0" />
                      <span>Alertas y contingencias en tiempo real</span>
                    </li>
                  </ul>
                </div>

                {/* Capability 2 */}
                <div className="bg-[#11212F] border border-[#23425e] hover:border-[#F7C35A]/50 rounded-xl p-8 transition-all duration-200">
                  <div className="w-12 h-12 rounded-lg bg-[#F7C35A]/10 border border-[#F7C35A]/20 flex items-center justify-center text-[#F7C35A] mb-6">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-semibold text-[#F7C35A] mb-1">02. Inteligencia Cognitiva</div>
                  <h3 className="text-xl font-bold text-white mb-3">Agentes de IA y Extracción</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    Implementación de modelos de lenguaje entrenados en la documentación de tu empresa para responder tickets complejos, validar facturas y analizar contratos.
                  </p>
                  <ul className="space-y-2 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F7C35A] shrink-0" />
                      <span>OCR y estructuración de documentos no estructurados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F7C35A] shrink-0" />
                      <span>Calificación autónoma de oportunidades comerciales</span>
                    </li>
                  </ul>
                </div>

                {/* Capability 3 */}
                <div className="bg-[#11212F] border border-[#23425e] hover:border-[#F7C35A]/50 rounded-xl p-8 transition-all duration-200">
                  <div className="w-12 h-12 rounded-lg bg-[#F7C35A]/10 border border-[#F7C35A]/20 flex items-center justify-center text-[#F7C35A] mb-6">
                    <Database className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-semibold text-[#F7C35A] mb-1">03. Arquitectura y Gobernanza</div>
                  <h3 className="text-xl font-bold text-white mb-3">Integración Segura de Datos</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    Conectividad cifrada end-to-end con estricto control de accesos, aislamiento de credenciales y registros de auditoría conformes a normativas de seguridad.
                  </p>
                  <ul className="space-y-2 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F7C35A] shrink-0" />
                      <span>Gobernanza y trazabilidad de cada ejecución</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F7C35A] shrink-0" />
                      <span>Infraestructura escalable on-cloud o self-hosted</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Methodology Section */}
          <section id="metodologia" className="py-20 bg-[#11212F] border-b border-[#1f374e]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold text-[#F7C35A] tracking-widest uppercase">
                  Proceso de Implementación
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
                  Cómo trabajamos con tu equipo
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#162a3c]/50 border border-[#23425e] p-6 rounded-xl">
                  <div className="text-2xl font-black text-[#F7C35A] mb-3">01</div>
                  <h4 className="font-bold text-white mb-2">Auditoría Operativa</h4>
                  <p className="text-xs sm:text-sm text-white/70">
                    Mapeamos tus procesos manuales, cuellos de botella y costos por hora para calcular el ROI potencial exacto.
                  </p>
                </div>
                <div className="bg-[#162a3c]/50 border border-[#23425e] p-6 rounded-xl">
                  <div className="text-2xl font-black text-[#F7C35A] mb-3">02</div>
                  <h4 className="font-bold text-white mb-2">Diseño y Prototipado</h4>
                  <p className="text-xs sm:text-sm text-white/70">
                    Estructuramos la arquitectura de flujos en n8n y seleccionamos los modelos de IA óptimos para tu caso.
                  </p>
                </div>
                <div className="bg-[#162a3c]/50 border border-[#23425e] p-6 rounded-xl">
                  <div className="text-2xl font-black text-[#F7C35A] mb-3">03</div>
                  <h4 className="font-bold text-white mb-2">Despliegue Asistido</h4>
                  <p className="text-xs sm:text-sm text-white/70">
                    Conectamos entornos de prueba y producción con monitoreo activo y validación de margen de error.
                  </p>
                </div>
                <div className="bg-[#162a3c]/50 border border-[#23425e] p-6 rounded-xl">
                  <div className="text-2xl font-black text-[#F7C35A] mb-3">04</div>
                  <h4 className="font-bold text-white mb-2">Mantenimiento y Escala</h4>
                  <p className="text-xs sm:text-sm text-white/70">
                    Soporte continuo, optimización de tokens y adaptación a nuevas necesidades operativas de la empresa.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Case Studies / Social Proof Section */}
          <section id="casos" className="py-20 bg-[#0e1c28] border-b border-[#1f374e]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-12">
                <span className="text-xs font-bold text-[#F7C35A] tracking-widest uppercase">
                  Resultados Cuantificables
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                  Impacto directo en la cuenta de resultados
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#11212F] border border-[#23425e] p-8 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#F7C35A] font-semibold mb-3">
                      <span>Fintech & Servicios Financieros</span>
                      <span>·</span>
                      <span>Automatización de Onboarding</span>
                    </div>
                    <p className="text-white/85 text-base italic mb-6 leading-relaxed">
                      "Riquitech implementó agentes que redujeron el tiempo de validación de KYC y antecedentes crediticios de 48 horas a 3 minutos, manteniendo 0% de errores en auditorías regulatorias."
                    </p>
                  </div>
                  <div className="border-t border-[#1f374e] pt-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">Martín Sotomayor</div>
                      <div className="text-xs text-white/60">Director de Operaciones, Finnova Latam</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-[#F7C35A] tabular-nums">-94%</div>
                      <div className="text-[11px] text-white/60">Tiempo de ciclo</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#11212F] border border-[#23425e] p-8 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#F7C35A] font-semibold mb-3">
                      <span>Manufactura & Cadena de Suministro</span>
                      <span>·</span>
                      <span>Procesamiento de Órdenes</span>
                    </div>
                    <p className="text-white/85 text-base italic mb-6 leading-relaxed">
                      "Pasamos de tener a 6 personas transcribiendo manualmente órdenes de compra y facturas en SAP a un pipeline automatizado con IA que procesa más de 12.000 documentos mensuales."
                    </p>
                  </div>
                  <div className="border-t border-[#1f374e] pt-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">Elena Valenzuela</div>
                      <div className="text-xs text-white/60">Head of Supply Chain, Industrias Nexus</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-[#F7C35A] tabular-nums">$78,000</div>
                      <div className="text-[11px] text-white/60">Ahorro anual directo</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Lead Generation Form Section */}
          <section id="contacto" className="py-20 md:py-28 bg-[#11212F] relative scroll-mt-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182d40] text-xs font-semibold text-[#F7C35A] border border-[#23425e] mb-4">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Diagnóstico Inicial sin Costo</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                  Comienza la transformación de tus operaciones
                </h2>
                <p className="text-white/70 text-base sm:text-lg">
                  Completa el formulario y un especialista de <strong className="text-white">Riquitech</strong> analizará tus procesos para presentarte una propuesta de automatización personalizada.
                </p>
              </div>

              {/* Form Container */}
              <div className="bg-[#162a3c] border border-[#23425e] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                {/* Ambient accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#F7C35A]"></div>

                {/* Webhook endpoint indicator and config toggle */}
                <div className="mb-8 p-3 rounded-lg bg-[#0e1c28] border border-[#1f374e] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-white/70">
                    <span className="font-semibold text-[#F7C35A]">Endpoint Destino:</span>
                    <code className="text-white bg-[#11212F] px-2 py-0.5 rounded border border-[#23425e] break-all">
                      {webhookUrl}
                    </code>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newUrl = prompt('Ingresa la URL del webhook de n8n para enviar los datos reales:', webhookUrl);
                      if (newUrl !== null && newUrl.trim() !== '') {
                        setWebhookUrl(newUrl.trim());
                      }
                    }}
                    className="text-[#F7C35A] hover:underline whitespace-nowrap self-start sm:self-auto font-medium cursor-pointer"
                  >
                    Cambiar Webhook
                  </button>
                </div>

                {/* Success State */}
                {status === 'success' ? (
                  <div className="py-12 px-4 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 rounded-full bg-[#F7C35A]/15 border-2 border-[#F7C35A] text-[#F7C35A] flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                      ¡Gracias por contactarnos!
                    </h3>
                    <p className="text-white/80 text-base sm:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
                      Hemos recibido tu solicitud de forma exitosa. Nuestro equipo de ingeniería en IA y automatización revisará tus requerimientos y se comunicará contigo a la brevedad.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <button
                        onClick={() => setStatus('idle')}
                        className="px-6 py-3 rounded-lg bg-[#F7C35A] text-[#11212F] font-bold text-sm hover:bg-[#e5b34f] transition-all cursor-pointer"
                      >
                        Enviar otra solicitud
                      </button>
                      <button
                        onClick={() => setCurrentView('dashboard')}
                        className="px-6 py-3 rounded-lg bg-[#11212F] border border-[#23425e] text-white font-medium text-sm hover:bg-[#1a334a] transition-all cursor-pointer"
                      >
                        Ver Panel de Leads
                      </button>
                    </div>
                  </div>
                ) : (
                  /* The Form (Grid 2 columns on desktop, 1 on mobile) */
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* 1. Nombre */}
                      <div>
                        <label htmlFor="nombre" className="block text-sm font-semibold text-white mb-2">
                          Nombre <span className="text-[#F7C35A]">*</span>
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          required
                          value={formData.nombre}
                          onChange={handleChange}
                          placeholder="Ej. Carlos"
                          className="w-full px-4 py-3 rounded-lg bg-[#11212F] border border-[#2a4c6c] text-white placeholder-white/35 focus:outline-none focus:border-[#F7C35A] focus:ring-1 focus:ring-[#F7C35A] transition-colors text-sm"
                        />
                      </div>

                      {/* 2. Apellido */}
                      <div>
                        <label htmlFor="apellido" className="block text-sm font-semibold text-white mb-2">
                          Apellido <span className="text-[#F7C35A]">*</span>
                        </label>
                        <input
                          type="text"
                          id="apellido"
                          name="apellido"
                          required
                          value={formData.apellido}
                          onChange={handleChange}
                          placeholder="Ej. Mendoza"
                          className="w-full px-4 py-3 rounded-lg bg-[#11212F] border border-[#2a4c6c] text-white placeholder-white/35 focus:outline-none focus:border-[#F7C35A] focus:ring-1 focus:ring-[#F7C35A] transition-colors text-sm"
                        />
                      </div>

                      {/* 3. Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                          Email Corporativo <span className="text-[#F7C35A]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="carlos.mendoza@tuempresa.com"
                          className="w-full px-4 py-3 rounded-lg bg-[#11212F] border border-[#2a4c6c] text-white placeholder-white/35 focus:outline-none focus:border-[#F7C35A] focus:ring-1 focus:ring-[#F7C35A] transition-colors text-sm"
                        />
                      </div>

                      {/* 4. Teléfono (Opcional) */}
                      <div>
                        <label htmlFor="telefono" className="block text-sm font-semibold text-white mb-2">
                          Teléfono <span className="text-white/40 font-normal text-xs">(Opcional)</span>
                        </label>
                        <input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          placeholder="+56 9 1234 5678"
                          className="w-full px-4 py-3 rounded-lg bg-[#11212F] border border-[#2a4c6c] text-white placeholder-white/35 focus:outline-none focus:border-[#F7C35A] focus:ring-1 focus:ring-[#F7C35A] transition-colors text-sm"
                        />
                      </div>

                      {/* 5. Empresa */}
                      <div>
                        <label htmlFor="empresa" className="block text-sm font-semibold text-white mb-2">
                          Empresa <span className="text-[#F7C35A]">*</span>
                        </label>
                        <input
                          type="text"
                          id="empresa"
                          name="empresa"
                          required
                          value={formData.empresa}
                          onChange={handleChange}
                          placeholder="Nombre de tu organización"
                          className="w-full px-4 py-3 rounded-lg bg-[#11212F] border border-[#2a4c6c] text-white placeholder-white/35 focus:outline-none focus:border-[#F7C35A] focus:ring-1 focus:ring-[#F7C35A] transition-colors text-sm"
                        />
                      </div>

                      {/* 6. Industria */}
                      <div>
                        <label htmlFor="industria" className="block text-sm font-semibold text-white mb-2">
                          Industria <span className="text-[#F7C35A]">*</span>
                        </label>
                        <select
                          id="industria"
                          name="industria"
                          required
                          value={formData.industria}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-[#11212F] border border-[#2a4c6c] text-white focus:outline-none focus:border-[#F7C35A] focus:ring-1 focus:ring-[#F7C35A] transition-colors text-sm appearance-none cursor-pointer"
                          style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23F7C35A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                        >
                          <option value="" disabled className="bg-[#11212F] text-white/50">Selecciona tu industria</option>
                          <option value="Tecnología" className="bg-[#11212F] text-white">Tecnología</option>
                          <option value="Finanzas" className="bg-[#11212F] text-white">Finanzas</option>
                          <option value="Retail" className="bg-[#11212F] text-white">Retail</option>
                          <option value="Salud" className="bg-[#11212F] text-white">Salud</option>
                          <option value="Manufactura" className="bg-[#11212F] text-white">Manufactura</option>
                          <option value="Otro" className="bg-[#11212F] text-white">Otro</option>
                        </select>
                      </div>

                      {/* 7. Tamaño de empresa */}
                      <div>
                        <label htmlFor="tamanoEmpresa" className="block text-sm font-semibold text-white mb-2">
                          Tamaño de empresa <span className="text-[#F7C35A]">*</span>
                        </label>
                        <select
                          id="tamanoEmpresa"
                          name="tamanoEmpresa"
                          required
                          value={formData.tamanoEmpresa}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-[#11212F] border border-[#2a4c6c] text-white focus:outline-none focus:border-[#F7C35A] focus:ring-1 focus:ring-[#F7C35A] transition-colors text-sm appearance-none cursor-pointer"
                          style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23F7C35A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                        >
                          <option value="" disabled className="bg-[#11212F] text-white/50">Selecciona número de colaboradores</option>
                          <option value="1-10" className="bg-[#11212F] text-white">1-10 colaboradores</option>
                          <option value="11-50" className="bg-[#11212F] text-white">11-50 colaboradores</option>
                          <option value="51-200" className="bg-[#11212F] text-white">51-200 colaboradores</option>
                          <option value="201-500" className="bg-[#11212F] text-white">201-500 colaboradores</option>
                          <option value="+500" className="bg-[#11212F] text-white">+500 colaboradores</option>
                        </select>
                      </div>

                      {/* Col span spacer for 2-column layout balance */}
                      <div className="hidden md:flex items-center text-xs text-white/50 p-2">
                        <div className="flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-[#F7C35A] shrink-0 mt-0.5" />
                          <span>Tus datos son confidenciales y están protegidos por acuerdos de no divulgación empresariales.</span>
                        </div>
                      </div>

                      {/* 8. Mensaje o necesidad (Ocupa ancho completo) */}
                      <div className="md:col-span-2">
                        <label htmlFor="mensaje" className="block text-sm font-semibold text-white mb-2">
                          Mensaje o necesidad <span className="text-[#F7C35A]">*</span>
                        </label>
                        <textarea
                          id="mensaje"
                          name="mensaje"
                          required
                          rows={4}
                          value={formData.mensaje}
                          onChange={handleChange}
                          placeholder="Describe los procesos que deseas automatizar o el reto que enfrenta tu equipo..."
                          className="w-full px-4 py-3 rounded-lg bg-[#11212F] border border-[#2a4c6c] text-white placeholder-white/35 focus:outline-none focus:border-[#F7C35A] focus:ring-1 focus:ring-[#F7C35A] transition-colors text-sm resize-y"
                        />
                      </div>
                    </div>

                    {/* Submit button & State handling */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 px-6 rounded-lg font-bold text-base transition-all duration-200 flex items-center justify-center gap-3 shadow-lg cursor-pointer ${
                          loading
                            ? 'bg-[#F7C35A]/70 text-[#11212F] cursor-not-allowed'
                            : 'bg-[#F7C35A] text-[#11212F] hover:bg-[#e5b34f] hover:shadow-[#F7C35A]/25 transform hover:-translate-y-0.5'
                        }`}
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-[#11212F] border-t-transparent rounded-full animate-spin"></div>
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <span>Solicitar Diagnóstico Estratégico</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>

                      {/* Error Notification Banner */}
                      {status === 'error' && (
                        <div className="mt-4 p-4 rounded-lg bg-red-950/80 border border-red-500/50 flex items-start gap-3 text-red-200 text-sm animate-in fade-in duration-200">
                          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-red-100">Atención</div>
                            <p>{errorMessage}</p>
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#F7C35A]" />
                          Respuesta en menos de 24 horas hábiles
                        </span>
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#F7C35A]" />
                          Sin compromisos ni cargos ocultos
                        </span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-[#0b1620] border-t border-[#1f374e] py-8 text-white/70 text-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Riquitech</span>
              <span>·</span>
              <span>{currentView === 'dashboard' ? 'Panel de Administración de Leads B2B' : 'Inteligencia Artificial y Automatización'}</span>
            </div>
            <div>
              &copy; {new Date().getFullYear()} Riquitech Technologies. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>

      {/* Standalone HTML Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#11212F] border border-[#23425e] rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b border-[#1f374e] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CodeXml className="w-5 h-5 text-[#F7C35A]" />
                <h3 className="font-bold text-white text-base">
                  Código HTML Standalone ({codeModalType === 'dashboard' ? 'Panel de Leads' : 'Landing Page'})
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-lg bg-[#0b1620] p-0.5 border border-[#23425e] mr-2">
                  <button
                    onClick={() => setCodeModalType('dashboard')}
                    className={`px-2.5 py-1 rounded text-xs ${codeModalType === 'dashboard' ? 'bg-[#F7C35A] text-[#11212F] font-bold' : 'text-white/70'}`}
                  >
                    Panel
                  </button>
                  <button
                    onClick={() => setCodeModalType('landing')}
                    className={`px-2.5 py-1 rounded text-xs ${codeModalType === 'landing' ? 'bg-[#F7C35A] text-[#11212F] font-bold' : 'text-white/70'}`}
                  >
                    Landing
                  </button>
                </div>
                <button
                  onClick={() => handleCopyCode(codeModalType)}
                  className="px-3 py-1.5 rounded bg-[#F7C35A] text-[#11212F] font-semibold text-xs flex items-center gap-1.5 hover:bg-[#e5b34f] transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? '¡Copiado!' : 'Copiar Código'}</span>
                </button>
                <button
                  onClick={() => handleDownloadHtml(codeModalType)}
                  className="px-3 py-1.5 rounded bg-[#162a3c] border border-[#23425e] text-white font-medium text-xs flex items-center gap-1.5 hover:bg-[#203a52] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar .html</span>
                </button>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="w-8 h-8 rounded-lg text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors ml-2"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 overflow-auto bg-[#0b1620]">
              <pre className="text-xs text-white/90 font-mono leading-relaxed whitespace-pre select-all">
                {codeModalType === 'dashboard' ? getDashboardStandaloneHtmlCode(getLeadsWebhookUrl) : getStandaloneHtmlCode(webhookUrl)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
