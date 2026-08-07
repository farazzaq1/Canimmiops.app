export type Language = "EN" | "FR" | "PB" | "ES" | "AR" | "ZH";

export interface TranslationSet {
  nationalGrid: string;
  provincialStreams: string;
  crsCalculator: string;
  immigrationAnalytics: string;
  launchPlaybook: string;
  reportsBoard: string;
  canadaVisaInsights: string;
  communityExchange: string;
  aboutContact: string;
  linkPhone: string;
  profileCached: string;
  disclaimerText: string;
  disclaimerTitle: string;
  liveIntelligence: string;
  liveWeb: string;
  liveDesc: string;
  suggestedQueries: string;
  queryReport: string;
  searchPlaceholder: string;
  scouringGovFeeds: string;
  verifiedReferences: string;
  rcicConsultantNotice: string;
  govtPortals: string;
  submitQuery: string;
  expiryTracker: string;
  canadaNewsMandates: string;
  borderWaitTimes: string;
  liveVideoDesk: string;
  openInYouTube: string;
  signInOrCreate: string;
}

export const translations: Record<Language, TranslationSet> = {
  EN: {
    nationalGrid: "Federal Grid",
    provincialStreams: "Prov./Other Streams",
    crsCalculator: "Federal Express Entry",
    immigrationAnalytics: "Immigration Analytics",
    launchPlaybook: "Launch Playbook",
    reportsBoard: "Reports Board",
    canadaVisaInsights: "CanadaVisa Insights",
    communityExchange: "Community Exchange",
    aboutContact: "About & Contact",
    linkPhone: "Link Phone",
    profileCached: "Profile Cached",
    disclaimerTitle: "IMPORTANT LEGAL NOTICE & DISCLAIMER",
    disclaimerText: "All information is sourced from official Canadian government websites. This platform is a non-governmental civic tech assistant and does not assume responsibility for the accuracy or currency of information. For official legal immigration advice, please reach out directly to a licensed Regulated Canadian Immigration Consultant (RCIC) for a private one-on-one consultation and personalized processing.",
    liveIntelligence: "Live intelligence",
    liveWeb: "Live Web",
    liveDesc: "Connect directly with current government draws, wait times, and immigration thresholds. Our system queries the live internet under safe sandbox restrictions, delivering verified sources.",
    suggestedQueries: "Suggested Real-time Queries",
    queryReport: "Query Report",
    searchPlaceholder: "Enter immigration or border wait query...",
    scouringGovFeeds: "Scouring public government feeds & active blogs...",
    verifiedReferences: "Verified References Found",
    rcicConsultantNotice: "Book One-to-One Licensed RCIC Session",
    govtPortals: "Govt Portals",
    submitQuery: "Submit Case Query",
    expiryTracker: "Expiry Tracker",
    canadaNewsMandates: "Canada News & Mandates",
    borderWaitTimes: "Border Wait Times",
    liveVideoDesk: "Canada Immigration Video Desk",
    openInYouTube: "Watch Direct on YouTube ↗",
    signInOrCreate: "Sign In / Register"
  },
  FR: {
    nationalGrid: "Réseau Fédéral",
    provincialStreams: "Volets Prov./Autres",
    crsCalculator: "Entrée Express Fédérale",
    immigrationAnalytics: "Analyses d'Immigration",
    launchPlaybook: "Lancer le Manuel",
    reportsBoard: "Tableau de Bord",
    canadaVisaInsights: "Perspectives de Visa",
    communityExchange: "Échange Communautaire",
    aboutContact: "À Propos & Contact",
    linkPhone: "Associer Téléphone",
    profileCached: "Profil Enregistré",
    disclaimerTitle: "AVIS JURIDIQUE IMPORTANT & EXCLUSION DE RESPONSABILITÉ",
    disclaimerText: "Toutes les informations proviennent des sites officiels du gouvernement canadien. Cette plateforme est un outil civique non gouvernemental et décline toute responsabilité quant à l'exactitude des données. Pour tout conseil juridique officiel en matière d'immigration, veuillez contacter directement un consultant réglementé en immigration canadienne (CRIC) agréé pour une consultation personnalisée.",
    liveIntelligence: "Intelligence en direct",
    liveWeb: "Web en direct",
    liveDesc: "Connectez-vous directement aux tirages gouvernementaux, délais d'attente et seuils d'immigration. Notre système interroge le web en direct en mode sécurisé avec des sources vérifiées.",
    suggestedQueries: "Suggestions de requêtes en direct",
    queryReport: "Rapport de requête",
    searchPlaceholder: "Saisissez votre question d'immigration ou d'attente...",
    scouringGovFeeds: "Recherche dans les flux gouvernementaux et blogs actifs...",
    verifiedReferences: "Références vérifiées trouvées",
    rcicConsultantNotice: "Réserver une session avec un conseiller agréé CRIC",
    govtPortals: "Portails Gouvernementaux",
    submitQuery: "Soumettre une Demande",
    expiryTracker: "Suivi des Expirations",
    canadaNewsMandates: "Actualités et Mandats du Canada",
    borderWaitTimes: "Temps d'Attente aux Frontières",
    liveVideoDesk: "Bureau Vidéo de l'Immigration",
    openInYouTube: "Regarder sur YouTube ↗",
    signInOrCreate: "Se Connecter / S'Inscrire"
  },
  PB: {
    nationalGrid: "ਫ਼ੈਡਰਲ ਗਰਿੱਡ",
    provincialStreams: "ਸੂਬਾਈ/ਹੋਰ ਪ੍ਰੋਗਰਾਮ",
    crsCalculator: "ਫ਼ੈਡਰਲ ਐਕਸਪ੍ਰੈਸ ਐਂਟਰੀ",
    immigrationAnalytics: "ਇਮੀਗ੍ਰੇਸ਼ਨ ਵਿਸ਼ਲੇਸ਼ਣ",
    launchPlaybook: "ਪਲੇਬੁੱਕ ਚਲਾਓ",
    reportsBoard: "ਰਿਪੋਰਟ ਬੋਰਡ",
    canadaVisaInsights: "ਕੈਨੇਡਾ ਵੀਜ਼ਾ ਜਾਣਕਾਰੀ",
    communityExchange: "ਭਾਈਚਾਰਾ ਐਕਸਚੇਂਜ",
    aboutContact: "ਸਾਡੇ ਬਾਰੇ ਅਤੇ ਸੰਪਰਕ",
    linkPhone: "ਫ਼ੋਨ ਲਿੰਕ ਕਰੋ",
    profileCached: "ਪ੍ਰੋਫਾਈਲ ਸੁਰੱਖਿਅਤ",
    disclaimerTitle: "ਮਹੱਤਵਪੂਰਨ ਕਾਨੂੰਨੀ ਨੋਟਿਸ ਅਤੇ ਬੇਦਾਅਵਾ",
    disclaimerText: "ਸਾਰੀ ਜਾਣਕਾਰੀ ਕੈਨੇਡੀਅਨ ਸਰਕਾਰ ਦੀਆਂ ਅਧਿਕਾਰਤ ਵੈੱਬਸਾਈਟਾਂ ਤੋਂ ਲਈ ਗਈ ਹੈ। ਇਹ ਪਲੇਟਫਾਰਮ ਇੱਕ ਗੈਰ-ਸਰਕਾਰੀ ਸਿਵਿਕ ਟੈਕਸਟ ਸਹਾਇਕ ਹੈ ਅਤੇ ਜਾਣਕਾਰੀ ਦੀ ਸ਼ੁੱਧਤਾ ਲਈ ਜ਼ਿੰਮੇਵਾਰੀ ਨਹੀਂ ਲੈਂਦਾ। ਅਧਿਕਾਰਤ ਕਾਨੂੰਨੀ ਇਮੀਗ੍ਰੇਸ਼ਨ ਸਲਾਹ ਲਈ, ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ-ਟੂ-ਇੱਕ ਨਿੱਜੀ ਸਲਾਹ-ਮਸ਼ਵਰੇ ਅਤੇ ਪ੍ਰੋਸੈਸਿੰਗ ਲਈ ਸਿੱਧੇ ਲਾਇਸੰਸਸ਼ੁਦਾ ਰੈਗੂਲੇਟਡ ਕੈਨੇਡੀਅਨ ਇਮੀਗ੍ਰੇਸ਼ਨ ਕੰਸਲਟੈਂਟ (RCIC) ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",
    liveIntelligence: "ਲਾਈਵ ਇੰਟੈਲੀਜੈਂਸ",
    liveWeb: "ਲਾਈਵ ਵੈੱਬ",
    liveDesc: "ਮੌਜੂਦਾ ਸਰਕਾਰੀ ਡਰਾਅ, ਉਡੀਕ ਸਮੇਂ ਅਤੇ ਇਮੀਗ੍ਰੇਸ਼ਨ ਥ੍ਰੈਸ਼ਹੋਲਡ ਨਾਲ ਸਿੱਧਾ ਕਨੈਕਟ ਕਰੋ। ਸਾਡਾ ਸਿਸਟਮ ਲਾਈਵ ਇੰਟਰਨੈਟ ਤੋਂ ਪ੍ਰਮਾਣਿਤ ਸਰੋਤ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।",
    suggestedQueries: "ਸੁਝਾਏ ਗਏ ਰੀਅਲ-ਟਾਈਮ ਸਵਾਲ",
    queryReport: "ਪੁੱਛਗਿੱਛ ਰਿਪੋਰਟ",
    searchPlaceholder: "ਇਮੀਗ੍ਰੇਸ਼ਨ ਜਾਂ ਬਾਰਡਰ ਵੇਟ ਪੁੱਛਗਿੱਛ ਦਰਜ ਕਰੋ...",
    scouringGovFeeds: "ਸਰਕਾਰੀ ਫੀਡਾਂ ਅਤੇ ਸਰਗਰਮ ਬਲੌਗਾਂ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...",
    verifiedReferences: "ਪ੍ਰਮਾਣਿਤ ਸਰੋਤ ਲੱਭੇ ਗਏ",
    rcicConsultantNotice: "ਲਾਇਸੰਸਸ਼ੁਦਾ RCIC ਸਲਾਹਕਾਰ ਨਾਲ ਮੀਟਿੰਗ ਬੁੱਕ ਕਰੋ",
    govtPortals: "ਸਰਕਾਰੀ ਪੋਰਟਲ",
    submitQuery: "ਸਵਾਲ ਭੇਜੋ",
    expiryTracker: "ਮਿਆਦ ਟਰੈਕਰ",
    canadaNewsMandates: "ਕੈਨੇਡਾ ਖ਼ਬਰਾਂ ਅਤੇ ਨਿਯਮ",
    borderWaitTimes: "ਬਾਰਡਰ ਉਡੀਕ ਸਮਾਂ",
    liveVideoDesk: "ਇਮੀਗ੍ਰੇਸ਼ਨ ਵੀਡੀਓ ਡੈਸਕ",
    openInYouTube: "ਯੂਟਿਊਬ 'ਤੇ ਦੇਖੋ ↗",
    signInOrCreate: "ਸਾਈਨ ਇਨ / ਖਾਤਾ ਬਣਾਓ"
  },
  ES: {
    nationalGrid: "Red Federal",
    provincialStreams: "Prov./Otras Corrientes",
    crsCalculator: "Entrada Rápida Federal",
    immigrationAnalytics: "Análisis de Inmigración",
    launchPlaybook: "Iniciar Manual",
    reportsBoard: "Tablero de Reportes",
    canadaVisaInsights: "Perspectivas de Visa",
    communityExchange: "Intercambio Comunitario",
    aboutContact: "Acerca de & Contacto",
    linkPhone: "Vincular Teléfono",
    profileCached: "Perfil Guardado",
    disclaimerTitle: "AVISO LEGAL IMPORTANTE & EXCLUSIÓN DE RESPONSABILIDAD",
    disclaimerText: "Toda la información proviene de los sitios web oficiales del gobierno canadiense. Esta plataforma es un asistente tecnológico cívico no gubernamental y no asume responsabilidad por la exactitud de la información. Para obtener asesoramiento legal oficial de inmigración, comuníquese directamente con un Consultor de Inmigración Canadiense Regulado (RCIC) con licencia para una consulta privada personalizada.",
    liveIntelligence: "Inteligencia en vivo",
    liveWeb: "Web en Vivo",
    liveDesc: "Conéctese directamente con los sorteos gubernamentales, tiempos de espera y límites de inmigración vigentes. Nuestro sistema consulta la web de forma segura brindando fuentes verificadas.",
    suggestedQueries: "Consultas sugeridas en tiempo real",
    queryReport: "Reporte de consulta",
    searchPlaceholder: "Ingrese consulta de inmigración o frontera...",
    scouringGovFeeds: "Buscando en canales gubernamentales y blogs activos...",
    verifiedReferences: "Referencias verificadas encontradas",
    rcicConsultantNotice: "Reservar sesión con un consultor RCIC autorizado",
    govtPortals: "Portales Gubernamentales",
    submitQuery: "Enviar Consulta",
    expiryTracker: "Rastreador de Vencimientos",
    canadaNewsMandates: "Noticias y Mandatos de Canadá",
    borderWaitTimes: "Tiempos de Espera en Frontera",
    liveVideoDesk: "Mesa de Video de Inmigración",
    openInYouTube: "Ver en YouTube ↗",
    signInOrCreate: "Iniciar Sesión / Registrarse"
  },
  AR: {
    nationalGrid: "الشبكة الفيدرالية",
    provincialStreams: "المسارات الإقليمية",
    crsCalculator: "الدخول السريع",
    immigrationAnalytics: "تحليلات الهجرة",
    launchPlaybook: "تشغيل الدليل",
    reportsBoard: "لوحة التقارير",
    canadaVisaInsights: "رؤى تأشيرة كندا",
    communityExchange: "التبادل المجتمعي",
    aboutContact: "من نحن والاتصال",
    linkPhone: "ربط الهاتف",
    profileCached: "الملف محفوظ",
    disclaimerTitle: "إشعار قانوني هام وإخلاء مسؤولية",
    disclaimerText: "يتم الحصول على جميع المعلومات من المواقع الرسمية للحكومة الكندية. هذه المنصة هي مساعد تقني مدني غير حكومي ولا تتحمل أي مسؤولية عن دقة أو حداثة المعلومات. للحصول على مشورة قانونية رسمية بشأن الهجرة، يرجى التواصل مباشرة مع مستشار هجرة معتمد (RCIC).",
    liveIntelligence: "ذكاء مباشر",
    liveWeb: "الويب المباشر",
    liveDesc: "اتصل مباشرة بسحوبات الحكومة الحالية، وأوقات الانتظار، وعتبات الهجرة من مصادر موثوقة.",
    suggestedQueries: "الاستفسارات المقترحة في الوقت الفعلي",
    queryReport: "تقرير الاستفسار",
    searchPlaceholder: "أدخل استفسار الهجرة أو وقت انتظار الحدود...",
    scouringGovFeeds: "البحث في الخلاصات الحكومية العامة والمدونات النشطة...",
    verifiedReferences: "تم العثور على مراجع موثوقة",
    rcicConsultantNotice: "حجز جلسة مع مستشار هجرة معتمد (RCIC)",
    govtPortals: "البوابات الحكومية",
    submitQuery: "إرسال استفسار",
    expiryTracker: "متتبع انتهاء الصلاحية",
    canadaNewsMandates: "أخبار وتوجيهات كندا",
    borderWaitTimes: "أوقات الانتظار على الحدود",
    liveVideoDesk: "مكتب فيديو الهجرة",
    openInYouTube: "مشاهدة على يوتيوب ↗",
    signInOrCreate: "تسجيل الدخول / إنشاء حساب"
  },
  ZH: {
    nationalGrid: "联邦网格",
    provincialStreams: "省提名/其他项目",
    crsCalculator: "联邦快速通道",
    immigrationAnalytics: "移民数据分析",
    launchPlaybook: "启动指南",
    reportsBoard: "报告面板",
    canadaVisaInsights: "加拿大签证洞察",
    communityExchange: "社区交流",
    aboutContact: "关于与联系",
    linkPhone: "绑定手机",
    profileCached: "个人资料已缓存",
    disclaimerTitle: "重要法律声明与免责声明",
    disclaimerText: "所有信息均引自加拿大政府官方网站。本平台为非政府公民科技助手，不对信息的准确性或实时性承担法律责任。如需官方法律移民建议，请直接联系持牌加拿大移民顾问 (RCIC) 进行一对一咨询。",
    liveIntelligence: "实时情报",
    liveWeb: "实时网络",
    liveDesc: "直接连接加拿大政府最新的抽签分数、等待时间和移民门槛。",
    suggestedQueries: "推荐实时查询",
    queryReport: "查询报告",
    searchPlaceholder: "输入移民或边境等待时间查询...",
    scouringGovFeeds: "正在搜索官方政府订阅和最新动态...",
    verifiedReferences: "找到经核实参考",
    rcicConsultantNotice: "预约持牌 RCIC 顾问一对一咨询",
    govtPortals: "政府门户",
    submitQuery: "提交咨询",
    expiryTracker: "到期跟踪器",
    canadaNewsMandates: "加拿大新闻与政策指令",
    borderWaitTimes: "边境通关等候时间",
    liveVideoDesk: "移民视频播报",
    openInYouTube: "在 YouTube 上观看 ↗",
    signInOrCreate: "登录 / 创建账号"
  }
};
