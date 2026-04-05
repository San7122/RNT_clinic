import { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  Phone, MapPin, Clock, Menu, X, Heart, Baby, TestTube,
  BedDouble, Ambulance, Award, Users, Stethoscope, Shield,
  ChevronRight, ChevronLeft, Mail, User, MessageSquare, Star,
  Calendar, Navigation, Building2, BadgeCheck, Sun, Moon,
  Quote, Globe
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   CONTEXT — Theme + Language
   ═══════════════════════════════════════════════════ */
const AppCtx = createContext();
const useApp = () => useContext(AppCtx);

/* ═══════════════════════════════════════════════════
   ALL BILINGUAL DATA
   ═══════════════════════════════════════════════════ */
const T = {
  en: {
    navHome: "Home", navAbout: "About", navDoctors: "Doctors", navServices: "Services",
    navTiming: "Timing", navLocation: "Location", navTestimonials: "Reviews", navContact: "Contact",
    callNow: "Call Now", whatsapp: "WhatsApp", ourServices: "Our Services",
    heroBadge: "Trusted Healthcare Since Years",
    heroTitle1: "RNT Memorial", heroTitle2: "Clinic",
    tagline: "Your Health, Our Commitment",
    trustBadge1: "AIIMS Trained Doctors", trustBadge2: "IVF Facility", trustBadge3: "Ambulance 24/7",
    aboutTitle: "About Our Clinic",
    aboutSub: "Committed to providing quality healthcare to the Jhitki-Nirmali community",
    aboutP1: "RNT Memorial Clinic is a trusted healthcare center located in the heart of Jhitki, Bihar — dedicated to serving patients from Jhitki, Nirmali, and surrounding communities with compassionate, expert medical care.",
    aboutP2: "Our AIIMS and DMCH trained specialist doctors are available every weekend. Get direct expert consultation without long waiting times.",
    aboutHighlight: "Specialist consultation every Saturday & Sunday — no long waiting, direct expert care.",
    bookAppt: "Book Your Appointment",
    stat1: "Years Experience", stat2: "Patients Treated", stat3: "Specializations", stat4: "Emergency Support",
    docTitle: "Our Expert Doctors",
    docSub: "Trained at India's top medical institutions — AIIMS, VIMS, DMCH",
    bookAppointment: "Book Appointment",
    svcTitle: "Our Services",
    svcSub: "Comprehensive healthcare services for you and your family",
    svc1: "General Medicine", svc1d: "Cardio, Diabetes & Gastro care by experienced physician",
    svc2: "Gynecology & Obstetrics", svc2d: "Complete women's health & maternity care",
    svc3: "IVF Treatment", svc3d: "Advanced fertility treatment now available at our clinic",
    svc4: "Patient Admission", svc4d: "In-patient care with round-the-clock monitoring",
    svc5: "Ambulance Service", svc5d: "24/7 emergency ambulance service available",
    ivfBanner: "IVF Facility Now Available!",
    ivfBannerDesc: "Advanced IVF treatment facility now available at RNT Memorial Clinic. Consult our specialists today.",
    enquireNow: "Enquire Now",
    timingTitle: "Clinic Timings",
    timingSub: "Plan your visit — we're here every weekend",
    timingDays: "Saturday & Sunday Only",
    timingHours: "12 PM – 4 PM",
    emergencyCall: "Emergency? Call Anytime!",
    locationTitle: "Find Us",
    locationSub: "Located at Vishwakarma Bazar Complex, easily accessible from NH 27",
    howToReach: "How to Reach",
    howToReachDesc: "Located right next to NH 27 on Nirmali Road. Easily accessible from Nirmali, Supaul, and nearby areas.",
    landmark: "Landmark",
    landmarkDesc: "Near NH 27 Highway, Vishwakarma Bazar",
    openMaps: "Open in Google Maps",
    testimonialsTitle: "What Our Patients Say",
    testimonialsSub: "Trusted by thousands of families in Jhitki, Nirmali, and beyond",
    contactTitle: "Contact Us",
    contactSub: "Get in touch — we're here to help you with your healthcare needs",
    callDirect: "Call Us Directly",
    sendMsg: "Send message directly",
    enquiryTitle: "Send an Enquiry",
    enquiryDesc: "We'll get back to you as soon as possible",
    yourName: "Your Name", enterName: "Enter your name",
    phoneNum: "Phone Number", enterPhone: "Enter your phone number",
    message: "Message", howHelp: "How can we help you?",
    sendEnquiry: "Send Enquiry",
    footerRights: "© 2026 RNT Memorial Clinic. All Rights Reserved.",
    quickLinks: "Quick Links", servicesLabel: "Services", contactLabel: "Contact",
    premium: "Premium",
  },
  hi: {
    navHome: "होम", navAbout: "परिचय", navDoctors: "डॉक्टर", navServices: "सेवाएं",
    navTiming: "समय", navLocation: "स्थान", navTestimonials: "समीक्षा", navContact: "संपर्क",
    callNow: "कॉल करें", whatsapp: "WhatsApp", ourServices: "हमारी सेवाएं",
    heroBadge: "वर्षों से विश्वसनीय स्वास्थ्य सेवा",
    heroTitle1: "RNT मेमोरियल", heroTitle2: "क्लिनिक",
    tagline: "आपका स्वास्थ्य हमारी प्रतिबद्धता",
    trustBadge1: "AIIMS प्रशिक्षित डॉक्टर", trustBadge2: "IVF सुविधा", trustBadge3: "एम्बुलेंस 24/7",
    aboutTitle: "हमारे क्लिनिक के बारे में",
    aboutSub: "झिटकी-निर्मली समुदाय को गुणवत्तापूर्ण स्वास्थ्य सेवा प्रदान करने के लिए प्रतिबद्ध",
    aboutP1: "RNT मेमोरियल क्लिनिक झिटकी, बिहार के हृदय में स्थित एक विश्वसनीय स्वास्थ्य केंद्र है — जो झिटकी, निर्मली और आसपास के समुदायों के रोगियों को समर्पित, विशेषज्ञ चिकित्सा देखभाल प्रदान करता है।",
    aboutP2: "हमारे क्लिनिक में AIIMS और DMCH प्रशिक्षित विशेषज्ञ डॉक्टर हर सप्ताहांत उपलब्ध रहते हैं। बिना लंबी प्रतीक्षा के, सीधे विशेषज्ञ परामर्श प्राप्त करें।",
    aboutHighlight: "हर शनिवार और रविवार विशेषज्ञ परामर्श — बिना लंबी प्रतीक्षा, सीधे विशेषज्ञ देखभाल।",
    bookAppt: "अपॉइंटमेंट बुक करें",
    stat1: "वर्षों का अनुभव", stat2: "मरीजों का इलाज", stat3: "विशेषज्ञताएं", stat4: "आपातकालीन सहायता",
    docTitle: "हमारे विशेषज्ञ डॉक्टर",
    docSub: "भारत के शीर्ष चिकित्सा संस्थानों — AIIMS, VIMS, DMCH में प्रशिक्षित",
    bookAppointment: "अपॉइंटमेंट बुक करें",
    svcTitle: "हमारी सेवाएं",
    svcSub: "आपके और आपके परिवार के लिए व्यापक स्वास्थ्य सेवाएं",
    svc1: "सामान्य चिकित्सा", svc1d: "अनुभवी चिकित्सक द्वारा हृदय, मधुमेह और गैस्ट्रो देखभाल",
    svc2: "स्त्री एवं प्रसूति रोग", svc2d: "महिलाओं की संपूर्ण स्वास्थ्य और मातृत्व देखभाल",
    svc3: "IVF उपचार", svc3d: "हमारे क्लिनिक में अब उन्नत प्रजनन उपचार उपलब्ध",
    svc4: "मरीजों की भर्ती", svc4d: "चौबीसों घंटे निगरानी के साथ भर्ती देखभाल",
    svc5: "एम्बुलेंस सेवा", svc5d: "24/7 आपातकालीन एम्बुलेंस सेवा उपलब्ध",
    ivfBanner: "IVF सुविधा अब उपलब्ध है!",
    ivfBannerDesc: "RNT मेमोरियल क्लिनिक में अब उन्नत IVF उपचार सुविधा उपलब्ध है। आज ही हमारे विशेषज्ञों से परामर्श करें।",
    enquireNow: "पूछताछ करें",
    timingTitle: "क्लिनिक का समय",
    timingSub: "अपनी यात्रा की योजना बनाएं — हम हर सप्ताहांत उपलब्ध हैं",
    timingDays: "केवल शनिवार एवं रविवार",
    timingHours: "12 PM – 4 PM",
    emergencyCall: "आपातकाल? कभी भी कॉल करें!",
    locationTitle: "हमें खोजें",
    locationSub: "विश्वकर्मा बाज़ार कॉम्प्लेक्स में स्थित, NH 27 से आसानी से पहुँचा जा सकता है",
    howToReach: "कैसे पहुँचें",
    howToReachDesc: "निर्मली रोड पर NH 27 के बगल में स्थित। निर्मली, सुपौल और आसपास के क्षेत्रों से आसानी से पहुँचा जा सकता है।",
    landmark: "लैंडमार्क",
    landmarkDesc: "NH 27 हाईवे के पास, विश्वकर्मा बाज़ार",
    openMaps: "Google Maps में खोलें",
    testimonialsTitle: "हमारे मरीज़ क्या कहते हैं",
    testimonialsSub: "झिटकी, निर्मली और आसपास के हज़ारों परिवारों का भरोसा",
    contactTitle: "संपर्क करें",
    contactSub: "संपर्क करें — हम आपकी स्वास्थ्य आवश्यकताओं में मदद के लिए यहाँ हैं",
    callDirect: "सीधे कॉल करें",
    sendMsg: "सीधे संदेश भेजें",
    enquiryTitle: "पूछताछ भेजें",
    enquiryDesc: "हम जल्द से जल्द आपसे संपर्क करेंगे",
    yourName: "आपका नाम", enterName: "अपना नाम दर्ज करें",
    phoneNum: "फ़ोन नंबर", enterPhone: "अपना फ़ोन नंबर दर्ज करें",
    message: "संदेश", howHelp: "हम आपकी कैसे मदद कर सकते हैं?",
    sendEnquiry: "पूछताछ भेजें",
    footerRights: "© 2026 RNT मेमोरियल क्लिनिक। सर्वाधिकार सुरक्षित।",
    quickLinks: "त्वरित लिंक", servicesLabel: "सेवाएं", contactLabel: "संपर्क",
    premium: "प्रीमियम",
  },
};

const CLINIC = {
  phones: [
    { number: "8809434588", label: "Main" },
    { number: "8544106163", label: "Vikas" },
    { number: "9162033027", label: "Aadil" },
  ],
  whatsapp: "918809434588",
  address: { building: "Vishwakarma Bazar Complex", road: "NH 27 के बगल में, Nirmali Road", city: "Jhitki – 847108", state: "Bihar, India" },
};

const DOCTORS = [
  {
    name: "Dr. Amit Kumar",
    degrees: "M.B.B.S. (VIMS), M.D. (Medicine) DMCH",
    affiliations: ["VIMS", "DMCH"],
    experience: ["Ex. Resident (TB & Chest)", "Ex. Consultant Heart Hospital"],
    specEn: "Physician — Cardio, Diabetes & Gastro",
    specHi: "हृदय, मधुमेह एवं गैस्ट्रो विशेषज्ञ",
    reg: "51813", color: "#0D7377", initials: "AK",
    gradient: "linear-gradient(135deg, #0D7377, #11998e)",
  },
  {
    name: "Dr. Swati Yadav",
    degrees: "M.B.B.S. (VIMS), M.D. (Obs & Gyne)",
    affiliations: ["VIMS", "AIIMS"],
    experience: ["Ex. Resident (AIIMS)"],
    specEn: "Gynecology & Obstetrics",
    specHi: "स्त्री एवं प्रसूति रोग विशेषज्ञ",
    reg: "51812", color: "#E8751A", initials: "SY",
    gradient: "linear-gradient(135deg, #E8751A, #f5a623)",
  },
];

const TESTIMONIALS = [
  {
    nameEn: "Rajesh Kumar", nameHi: "राजेश कुमार",
    textEn: "Dr. Amit Kumar diagnosed my heart condition accurately when other doctors couldn't. His expertise in cardiology is exceptional. Very thankful to RNT Memorial Clinic.",
    textHi: "डॉ. अमित कुमार ने मेरी हृदय की समस्या का सही निदान किया जब अन्य डॉक्टर नहीं कर पाए। हृदय रोग में उनकी विशेषज्ञता असाधारण है। RNT मेमोरियल क्लिनिक का बहुत आभार।",
    rating: 5, location: "Nirmali",
  },
  {
    nameEn: "Sunita Devi", nameHi: "सुनीता देवी",
    textEn: "Dr. Swati Yadav took wonderful care during my pregnancy. Being an AIIMS trained doctor, her knowledge and patience is remarkable. I recommend every woman to visit this clinic.",
    textHi: "डॉ. स्वाति यादव ने मेरी गर्भावस्था के दौरान अद्भुत देखभाल की। AIIMS प्रशिक्षित डॉक्टर होने के कारण उनका ज्ञान और धैर्य उल्लेखनीय है। मैं हर महिला को इस क्लिनिक में जाने की सलाह देती हूँ।",
    rating: 5, location: "Jhitki",
  },
  {
    nameEn: "Mohammad Iqbal", nameHi: "मोहम्मद इक़बाल",
    textEn: "My father's diabetes was out of control for years. Dr. Amit Kumar's treatment plan brought it under control within 3 months. The clinic staff is also very helpful and polite.",
    textHi: "मेरे पिताजी की मधुमेह वर्षों से नियंत्रण में नहीं थी। डॉ. अमित कुमार के उपचार से 3 महीने में यह नियंत्रण में आ गई। क्लिनिक का स्टाफ भी बहुत सहयोगी और विनम्र है।",
    rating: 5, location: "Supaul",
  },
  {
    nameEn: "Priya Singh", nameHi: "प्रिया सिंह",
    textEn: "The IVF consultation at RNT Memorial was thorough and compassionate. Dr. Swati explained everything clearly and gave us hope. We're grateful for this facility being available locally.",
    textHi: "RNT मेमोरियल में IVF परामर्श बहुत विस्तृत और दयालु था। डॉ. स्वाति ने सब कुछ स्पष्ट रूप से समझाया और हमें उम्मीद दी। इस सुविधा के स्थानीय रूप से उपलब्ध होने के लिए हम आभारी हैं।",
    rating: 5, location: "Madhubani",
  },
  {
    nameEn: "Amit Thakur", nameHi: "अमित ठाकुर",
    textEn: "Emergency ambulance service came within 20 minutes when my mother had a gastro attack at night. The staff handled the situation professionally. Excellent service by the clinic.",
    textHi: "जब रात को मेरी माँ को गैस्ट्रो का दौरा पड़ा तो आपातकालीन एम्बुलेंस 20 मिनट में आ गई। स्टाफ ने स्थिति को पेशेवर तरीके से संभाला। क्लिनिक द्वारा उत्कृष्ट सेवा।",
    rating: 4, location: "Jhitki",
  },
];

/* ═══════════════════════════════════════════════════
   UTILITY HOOKS & COMPONENTS
   ═══════════════════════════════════════════════════ */
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function SectionHeading({ title, subtitle, forceLight = false }) {
  const { dark } = useApp();
  const light = forceLight;
  return (
    <div className="text-center mb-12">
      <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${light ? "text-white" : dark ? "text-gray-100" : "text-gray-900"}`}
        style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h2>
      {subtitle && <p className={`text-base md:text-lg max-w-2xl mx-auto ${light ? "text-teal-100" : dark ? "text-gray-400" : "text-gray-500"}`}>{subtitle}</p>}
      <div className={`w-16 h-1 mx-auto mt-4 rounded-full ${light ? "bg-amber-400" : "bg-teal-600"}`} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════ */
export default function App() {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const t = T[lang];
  const toggleDark = () => setDark(d => !d);
  const toggleLang = () => setLang(l => l === "en" ? "hi" : "en");

  const NAV = [
    { id: "home", label: t.navHome }, { id: "about", label: t.navAbout },
    { id: "doctors", label: t.navDoctors }, { id: "services", label: t.navServices },
    { id: "timing", label: t.navTiming }, { id: "testimonials", label: t.navTestimonials },
    { id: "location", label: t.navLocation }, { id: "contact", label: t.navContact },
  ];

  useEffect(() => {
    const handle = () => {
      setScrolled(window.scrollY > 60);
      const secs = NAV.map(l => document.getElementById(l.id)).filter(Boolean);
      for (let i = secs.length - 1; i >= 0; i--) {
        if (secs[i].getBoundingClientRect().top <= 120) { setActiveSection(NAV[i].id); break; }
      }
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  });

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const bg = dark ? "bg-gray-950" : "bg-white";
  const bgAlt = dark ? "bg-gray-900" : "bg-gray-50";
  const cardBg = dark ? "bg-gray-900" : "bg-white";
  const cardBorder = dark ? "border-gray-800" : "border-gray-100";
  const tp = dark ? "text-gray-100" : "text-gray-900";
  const ts = dark ? "text-gray-400" : "text-gray-600";
  const tm = dark ? "text-gray-500" : "text-gray-500";
  const inputCls = dark ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400";
  const softBg = (c) => dark ? `${c}22` : `${c}15`;

  const SERVICES_DATA = [
    { icon: Heart, title: t.svc1, desc: t.svc1d, color: "#C0392B" },
    { icon: Baby, title: t.svc2, desc: t.svc2d, color: "#E8751A" },
    { icon: TestTube, title: t.svc3, desc: t.svc3d, color: "#D4A853", featured: true },
    { icon: BedDouble, title: t.svc4, desc: t.svc4d, color: "#0D7377" },
    { icon: Ambulance, title: t.svc5, desc: t.svc5d, color: "#C0392B" },
  ];

  return (
    <AppCtx.Provider value={{ dark, lang, t }}>
      <div style={{ fontFamily: "'Poppins', sans-serif" }}
        className={`${dark ? "bg-gray-950 text-gray-200" : "bg-white text-gray-800"} overflow-x-hidden transition-colors duration-500`}>

        {/* ═══════ HEADER ═══════ */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? dark ? "bg-gray-950/95 backdrop-blur-md shadow-lg shadow-black/30" : "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}>
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
            <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs ${scrolled ? "bg-teal-700" : "bg-white/20"}`}>RNT</div>
              <span className={`hidden sm:block font-semibold text-sm ${scrolled ? (dark ? "text-gray-100" : "text-gray-900") : "text-white"}`}
                style={{ fontFamily: "'Playfair Display', serif" }}>RNT Memorial</span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {NAV.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeSection === l.id
                      ? scrolled ? dark ? "text-teal-400 bg-teal-400/10" : "text-teal-700 bg-teal-50" : "text-white bg-white/20"
                      : scrolled ? dark ? "text-gray-400 hover:text-teal-400" : "text-gray-600 hover:text-teal-700" : "text-white/80 hover:text-white"
                  }`}>{l.label}</button>
              ))}

              {/* Language Toggle */}
              <button onClick={toggleLang} title="Switch Language"
                className={`ml-2 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all ${
                  scrolled
                    ? dark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    : "border-white/30 text-white hover:bg-white/10"
                }`}>
                <Globe size={13} />
                <span className={lang === "en" ? "font-bold" : "opacity-40"}>EN</span>
                <span className="opacity-30">|</span>
                <span className={lang === "hi" ? "font-bold" : "opacity-40"}>हि</span>
              </button>

              {/* Dark Mode Toggle */}
              <button onClick={toggleDark} title={dark ? "Light Mode" : "Dark Mode"}
                className={`ml-1 relative w-14 h-7 rounded-full transition-all duration-500 flex items-center border ${
                  dark ? "bg-gray-800 border-gray-700" : scrolled ? "bg-teal-50 border-teal-200" : "bg-white/15 border-white/30"
                }`}>
                <div className={`absolute w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 shadow-md ${
                  dark ? "translate-x-8 bg-indigo-500" : "translate-x-1 bg-amber-400"
                }`}>
                  {dark ? <Moon size={10} className="text-white" /> : <Sun size={10} className="text-white" />}
                </div>
              </button>

              <a href={`tel:${CLINIC.phones[0].number}`}
                className="ml-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors shadow-lg shadow-orange-500/25">
                <Phone size={13} /> {t.callNow}
              </a>
            </nav>

            {/* Mobile */}
            <div className="flex xl:hidden items-center gap-2">
              <button onClick={toggleLang}
                className={`px-2 py-1 rounded-full text-xs font-bold border ${scrolled ? dark ? "border-gray-700 text-gray-300" : "border-gray-200 text-gray-600" : "border-white/30 text-white"}`}>
                <span className={lang === "en" ? "font-bold" : "opacity-40"}>EN</span>
                <span className="opacity-30">|</span>
                <span className={lang === "hi" ? "font-bold" : "opacity-40"}>हि</span>
              </button>
              <button onClick={toggleDark}
                className={`p-1.5 rounded-lg ${scrolled ? dark ? "text-amber-400" : "text-gray-600" : "text-white"}`}>
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)}
                className={`p-1.5 rounded-lg ${scrolled ? (dark ? "text-gray-300" : "text-gray-700") : "text-white"}`}>
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className={`xl:hidden ${dark ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"} border-t shadow-xl`}>
              <div className="p-4 flex flex-col gap-1">
                {NAV.map(l => (
                  <button key={l.id} onClick={() => scrollTo(l.id)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium ${
                      activeSection === l.id ? dark ? "bg-teal-400/10 text-teal-400" : "bg-teal-50 text-teal-700" : dark ? "text-gray-400" : "text-gray-600"
                    }`}>{l.label}</button>
                ))}
                <a href={`tel:${CLINIC.phones[0].number}`}
                  className="mt-2 px-4 py-3 bg-orange-500 text-white text-center rounded-xl font-semibold flex items-center justify-center gap-2">
                  <Phone size={16} /> {t.callNow}
                </a>
              </div>
            </div>
          )}
        </header>

        {/* ═══════ HERO ═══════ */}
        <section id="home" className="hero-gradient relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-white/5 blur-xl" />
          <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-white/5 blur-xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/10" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 md:py-0 w-full">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Stethoscope size={16} className="text-amber-300" />
                <span className="text-white/90 text-sm font-medium">{t.heroBadge}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.heroTitle1}<br /><span className="text-amber-300">{t.heroTitle2}</span>
              </h1>
              <p className="hindi text-xl md:text-2xl text-teal-100 mb-2 font-semibold">{T.hi.tagline}</p>
              <p className="text-base md:text-lg text-white/70 mb-8">{T.en.tagline}</p>
              <div className="flex flex-wrap gap-3 mb-10">
                <a href={`tel:${CLINIC.phones[0].number}`}
                  className="px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full flex items-center gap-2 transition-all shadow-xl shadow-orange-500/30 text-sm md:text-base">
                  <Phone size={18} /> {t.callNow}</a>
                <a href={`https://wa.me/${CLINIC.whatsapp}?text=Hello%20RNT%20Memorial%20Clinic%2C%20I%20need%20an%20appointment.`}
                  target="_blank" rel="noopener noreferrer"
                  className="px-7 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full flex items-center gap-2 transition-all shadow-xl shadow-green-500/30 text-sm md:text-base">
                  <MessageSquare size={18} /> {t.whatsapp}</a>
                <button onClick={() => scrollTo("services")}
                  className="px-7 py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-full flex items-center gap-2 transition-all border border-white/20 text-sm md:text-base">
                  {t.ourServices} <ChevronRight size={16} /></button>
              </div>
              <div className="flex flex-wrap gap-3">
                {[{ icon: Award, text: t.trustBadge1 }, { icon: TestTube, text: t.trustBadge2 }, { icon: Ambulance, text: t.trustBadge3 }].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <b.icon size={15} className="text-amber-300" /><span className="text-white/90 text-xs md:text-sm font-medium">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" fill="none"><path d="M0 40C240 80 480 90 720 60C960 30 1200 50 1440 80V100H0V40Z" fill={dark ? "#030712" : "white"} /></svg>
          </div>
        </section>

        {/* ═══════ ABOUT ═══════ */}
        <section id="about" className={`py-20 md:py-28 ${bg} transition-colors duration-500`}>
          <div className="max-w-7xl mx-auto px-4">
            <Reveal><SectionHeading title={t.aboutTitle} subtitle={t.aboutSub} /></Reveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Reveal delay={0.1}>
                <div>
                  <p className={`${ts} text-base md:text-lg leading-relaxed mb-4`}>{t.aboutP1}</p>
                  <p className={`${ts} text-base leading-relaxed mb-4`}>{t.aboutP2}</p>
                  <div className={`${dark ? "bg-teal-900/30 border-teal-500" : "bg-teal-50 border-teal-600"} border-l-4 rounded-r-xl p-4 mb-6`}>
                    <p className={`${dark ? "text-teal-300" : "text-teal-800"} font-semibold text-sm`}>
                      <Calendar size={16} className="inline mr-2" />{t.aboutHighlight}
                    </p>
                  </div>
                  <a href={`tel:${CLINIC.phones[0].number}`} className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                    <Phone size={16} /> {t.bookAppt} <ChevronRight size={16} /></a>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="grid grid-cols-2 gap-4">
                  {[{ num: "10+", label: t.stat1, icon: Award }, { num: "5000+", label: t.stat2, icon: Users },
                    { num: "5", label: t.stat3, icon: Stethoscope }, { num: "24/7", label: t.stat4, icon: Shield }
                  ].map((s, i) => (
                    <div key={i} className={`${dark ? "bg-gray-900 border-gray-800" : "bg-gradient-to-br from-gray-50 to-white border-gray-100"} border rounded-2xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
                      <s.icon size={28} className="mx-auto mb-3 text-teal-500" />
                      <p className={`text-2xl md:text-3xl font-bold ${tp}`} style={{ fontFamily: "'Playfair Display', serif" }}>{s.num}</p>
                      <p className={`text-xs md:text-sm ${tm} mt-1`}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════ DOCTORS ═══════ */}
        <section id="doctors" className={`py-20 md:py-28 ${bgAlt} transition-colors duration-500`}>
          <div className="max-w-7xl mx-auto px-4">
            <Reveal><SectionHeading title={t.docTitle} subtitle={t.docSub} /></Reveal>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {DOCTORS.map((doc, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div className={`${cardBg} rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border ${cardBorder} group`}>
                    <div className="h-2 w-full" style={{ background: doc.gradient }} />
                    <div className="p-6 md:p-8">
                      <div className="flex items-start gap-5 mb-5">
                        <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0">
                          <div className="w-full h-full rounded-2xl flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105"
                            style={{ background: doc.gradient, animation: "avatarGlow 3s ease-in-out infinite" }}>
                            <span style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "2px" }}>{doc.initials}</span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center border-2 shadow-sm"
                            style={{ borderColor: dark ? "#111827" : "#fff" }}><BadgeCheck size={14} className="text-white" /></div>
                        </div>
                        <div>
                          <h3 className={`text-xl md:text-2xl font-bold ${tp}`} style={{ fontFamily: "'Playfair Display', serif" }}>{doc.name}</h3>
                          <p className={`text-sm ${tm} mt-1`}>{doc.degrees}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {doc.affiliations.map((a, j) => (
                              <span key={j} className="px-2.5 py-0.5 text-xs font-bold rounded-full text-white" style={{ background: doc.color }}>{a}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className={`${dark ? "bg-gray-800" : "bg-gray-50"} rounded-xl p-4 mb-4`}>
                        <p className={`text-sm font-semibold ${tp} flex items-center gap-2`}>
                          <Stethoscope size={15} style={{ color: doc.color }} /> {doc.specEn}</p>
                        <p className={`hindi text-sm ${ts} mt-1 ml-6`}>{doc.specHi}</p>
                      </div>
                      <div className="space-y-2 mb-4">
                        {doc.experience.map((exp, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <BadgeCheck size={15} className="text-green-500 mt-0.5 shrink-0" />
                            <span className={`text-sm ${ts}`}>{exp}</span>
                          </div>
                        ))}
                      </div>
                      <div className={`flex items-center justify-between pt-4 border-t ${dark ? "border-gray-800" : "border-gray-100"}`}>
                        <span className={`text-xs ${tm}`}>Reg. No: {doc.reg}</span>
                        <a href={`tel:${CLINIC.phones[0].number}`}
                          className="text-xs font-semibold px-4 py-2 rounded-full text-white transition-all hover:shadow-lg hover:scale-105"
                          style={{ background: doc.gradient }}>{t.bookAppointment}</a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ SERVICES ═══════ */}
        <section id="services" className={`py-20 md:py-28 ${bg} transition-colors duration-500`}>
          <div className="max-w-7xl mx-auto px-4">
            <Reveal><SectionHeading title={t.svcTitle} subtitle={t.svcSub} /></Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {SERVICES_DATA.map((svc, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className={`relative rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group ${
                    svc.featured ? dark ? "bg-amber-900/20 border-amber-700/50 ring-2 ring-amber-500/30" : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 ring-2 ring-amber-300/40" : `${cardBg} ${cardBorder}`
                  }`}>
                    {svc.featured && (
                      <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                        <Star size={11} /> {t.premium}</div>
                    )}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      style={{ background: softBg(svc.color) }}><svc.icon size={26} style={{ color: svc.color }} /></div>
                    <h3 className={`text-lg font-bold ${tp} mb-1`}>{svc.title}</h3>
                    <p className={`text-sm ${tm} leading-relaxed`}>{svc.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3}>
              <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl shadow-orange-500/20">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0"><TestTube size={32} className="text-white" /></div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{t.ivfBanner}</h3>
                  <p className="text-white/80 text-sm md:text-base">{t.ivfBannerDesc}</p>
                </div>
                <a href={`https://wa.me/${CLINIC.whatsapp}?text=Hello%2C%20I%20want%20to%20know%20about%20IVF%20treatment.`}
                  target="_blank" rel="noopener noreferrer"
                  className="shrink-0 px-6 py-3 bg-white text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-colors text-sm shadow-lg">{t.enquireNow}</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════ TIMING ═══════ */}
        <section id="timing" className="py-20 md:py-28 text-white relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/5 blur-xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/5 blur-xl" />
          <div className="relative z-10 max-w-5xl mx-auto px-4">
            <Reveal><SectionHeading title={t.timingTitle} subtitle={t.timingSub} forceLight /></Reveal>
            <Reveal delay={0.15}>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/20 max-w-3xl mx-auto">
                <div className="text-center mb-8">
                  <Clock size={40} className="mx-auto mb-4 text-amber-300" />
                  <p className="hindi text-2xl md:text-3xl font-bold text-white mb-2">{t.timingDays}</p>
                  <p className="text-4xl md:text-5xl font-extrabold text-amber-300 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{t.timingHours}</p>
                </div>
                <div className="flex justify-center gap-2 md:gap-3 mb-8">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => {
                    const active = i >= 5;
                    return (
                      <div key={d} className={`w-10 h-14 md:w-14 md:h-18 rounded-xl flex flex-col items-center justify-center text-xs font-semibold transition-all ${
                        active ? "bg-amber-400 text-gray-900 shadow-lg shadow-amber-400/30 scale-110" : "bg-white/10 text-white/40"
                      }`}><span>{d}</span>{active && <div className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-1" />}</div>
                    );
                  })}
                </div>
                <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 border border-red-400/30">
                  <Ambulance size={22} className="text-red-300 shrink-0" />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.emergencyCall}</p>
                    <a href="tel:8809434588" className="text-amber-300 font-bold text-lg hover:text-amber-200 transition-colors">8809434588</a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════ TESTIMONIALS ═══════ */}
        <section id="testimonials" className={`py-20 md:py-28 ${bgAlt} transition-colors duration-500`}>
          <div className="max-w-7xl mx-auto px-4">
            <Reveal><SectionHeading title={t.testimonialsTitle} subtitle={t.testimonialsSub} /></Reveal>
            <Reveal delay={0.1}>
              <div className="max-w-4xl mx-auto">
                {/* Desktop: 3-card grid */}
                <div className="hidden md:grid grid-cols-3 gap-6">
                  {TESTIMONIALS.slice(0, 3).map((rev, i) => (
                    <div key={i} className={`${cardBg} rounded-2xl p-6 border ${cardBorder} hover:shadow-lg transition-all duration-300`}>
                      <Quote size={24} className="text-teal-500/30 mb-3" />
                      <p className={`text-sm ${ts} leading-relaxed mb-4`}>
                        {lang === "hi" ? rev.textHi : rev.textEn}
                      </p>
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: rev.rating }).map((_, j) => (
                          <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
                          {(lang === "hi" ? rev.nameHi : rev.nameEn).split(" ").map(w => w[0]).join("")}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${tp}`}>{lang === "hi" ? rev.nameHi : rev.nameEn}</p>
                          <p className={`text-xs ${tm}`}>{rev.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Below grid: remaining 2 */}
                <div className="hidden md:grid grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto">
                  {TESTIMONIALS.slice(3).map((rev, i) => (
                    <div key={i} className={`${cardBg} rounded-2xl p-6 border ${cardBorder} hover:shadow-lg transition-all duration-300`}>
                      <Quote size={24} className="text-teal-500/30 mb-3" />
                      <p className={`text-sm ${ts} leading-relaxed mb-4`}>
                        {lang === "hi" ? rev.textHi : rev.textEn}
                      </p>
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: rev.rating }).map((_, j) => (
                          <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                          {(lang === "hi" ? rev.nameHi : rev.nameEn).split(" ").map(w => w[0]).join("")}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${tp}`}>{lang === "hi" ? rev.nameHi : rev.nameEn}</p>
                          <p className={`text-xs ${tm}`}>{rev.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile: Carousel */}
                <div className="md:hidden">
                  <div className={`${cardBg} rounded-2xl p-6 border ${cardBorder} transition-all duration-500`}>
                    <Quote size={28} className="text-teal-500/30 mb-3" />
                    <p className={`text-sm ${ts} leading-relaxed mb-4 min-h-[100px]`}>
                      {lang === "hi" ? TESTIMONIALS[testimonialIdx].textHi : TESTIMONIALS[testimonialIdx].textEn}
                    </p>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: TESTIMONIALS[testimonialIdx].rating }).map((_, j) => (
                        <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
                          {(lang === "hi" ? TESTIMONIALS[testimonialIdx].nameHi : TESTIMONIALS[testimonialIdx].nameEn).split(" ").map(w => w[0]).join("")}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${tp}`}>
                            {lang === "hi" ? TESTIMONIALS[testimonialIdx].nameHi : TESTIMONIALS[testimonialIdx].nameEn}
                          </p>
                          <p className={`text-xs ${tm}`}>{TESTIMONIALS[testimonialIdx].location}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setTestimonialIdx(i => i === 0 ? TESTIMONIALS.length - 1 : i - 1)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
                          <ChevronLeft size={16} className={tm} />
                        </button>
                        <button onClick={() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${dark ? "bg-gray-800" : "bg-gray-100"}`}>
                          <ChevronRight size={16} className={tm} />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {TESTIMONIALS.map((_, i) => (
                      <button key={i} onClick={() => setTestimonialIdx(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === testimonialIdx ? "bg-teal-500 w-6" : dark ? "bg-gray-700" : "bg-gray-300"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════ LOCATION ═══════ */}
        <section id="location" className={`py-20 md:py-28 ${bg} transition-colors duration-500`}>
          <div className="max-w-7xl mx-auto px-4">
            <Reveal><SectionHeading title={t.locationTitle} subtitle={t.locationSub} /></Reveal>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Reveal delay={0.1}>
                <div className={`${cardBg} rounded-3xl overflow-hidden shadow-sm border ${cardBorder}`}>
                  <iframe title="Clinic Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14378.0!2d86.57!3d26.13!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDA4JzAwLjAiTiA4NsKwMzQnMTIuMCJF!5e0!3m2!1sen!2sin!4v1"
                    className="w-full h-64 md:h-80 border-0" loading="lazy" />
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="space-y-5">
                  {[
                    { icon: Building2, ic: "text-teal-500", ib: dark ? "bg-teal-900/40" : "bg-teal-50", title: CLINIC.address.building, lines: [CLINIC.address.road, CLINIC.address.city + ", " + CLINIC.address.state] },
                    { icon: Navigation, ic: "text-amber-500", ib: dark ? "bg-amber-900/40" : "bg-amber-50", title: t.howToReach, lines: [t.howToReachDesc] },
                    { icon: MapPin, ic: "text-green-500", ib: dark ? "bg-green-900/40" : "bg-green-50", title: t.landmark, lines: [t.landmarkDesc] },
                  ].map((item, i) => (
                    <div key={i} className={`${cardBg} rounded-2xl p-5 border ${cardBorder}`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${item.ib} rounded-xl flex items-center justify-center shrink-0`}><item.icon size={22} className={item.ic} /></div>
                        <div>
                          <h4 className={`font-bold ${tp} mb-1`}>{item.title}</h4>
                          {item.lines.map((l, j) => <p key={j} className={`text-sm ${tm} ${j > 0 ? "mt-1" : ""}`}>{l}</p>)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <a href="https://www.google.com/maps/search/Vishwakarma+Bazar+Complex+Jhitki+Bihar" target="_blank" rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-teal-600/20">
                    <MapPin size={18} /> {t.openMaps}</a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════ CONTACT ═══════ */}
        <section id="contact" className={`py-20 md:py-28 ${bgAlt} transition-colors duration-500`}>
          <div className="max-w-7xl mx-auto px-4">
            <Reveal><SectionHeading title={t.contactTitle} subtitle={t.contactSub} /></Reveal>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Reveal delay={0.1}>
                <div className="space-y-4">
                  <h3 className={`text-xl font-bold ${tp} mb-4`} style={{ fontFamily: "'Playfair Display', serif" }}>{t.callDirect}</h3>
                  {CLINIC.phones.map((p, i) => (
                    <a key={i} href={`tel:${p.number}`}
                      className={`flex items-center gap-4 p-4 ${dark ? "bg-gray-900 hover:bg-teal-900/30 border-gray-800 hover:border-teal-700" : "bg-white hover:bg-teal-50 border-gray-100 hover:border-teal-200"} rounded-2xl border transition-all group`}>
                      <div className={`w-12 h-12 ${dark ? "bg-teal-900/40 group-hover:bg-teal-600" : "bg-teal-100 group-hover:bg-teal-600"} rounded-xl flex items-center justify-center transition-colors`}>
                        <Phone size={20} className="text-teal-500 group-hover:text-white transition-colors" /></div>
                      <div>
                        <p className={`font-bold ${tp} text-lg`}>{p.number}</p>
                        <p className={`text-sm ${tm}`}>{p.label}</p>
                      </div>
                      <ChevronRight size={18} className={`ml-auto ${dark ? "text-gray-600" : "text-gray-300"} group-hover:text-teal-500 transition-colors`} />
                    </a>
                  ))}
                  <a href={`https://wa.me/${CLINIC.whatsapp}?text=Hello%20RNT%20Memorial%20Clinic`} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 ${dark ? "bg-green-900/20 border-green-800/50" : "bg-green-50 border-green-200"} rounded-2xl border transition-all group`}>
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center"><MessageSquare size={20} className="text-white" /></div>
                    <div>
                      <p className={`font-bold ${tp} text-lg`}>WhatsApp</p>
                      <p className="text-sm text-green-600">{t.sendMsg}</p>
                    </div>
                    <ChevronRight size={18} className="ml-auto text-green-400 group-hover:text-green-600 transition-colors" />
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className={`${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"} rounded-3xl p-6 md:p-8 border`}>
                  <h3 className={`text-xl font-bold ${tp} mb-1`} style={{ fontFamily: "'Playfair Display', serif" }}>{t.enquiryTitle}</h3>
                  <p className={`text-sm ${tm} mb-6`}>{t.enquiryDesc}</p>
                  <div className="space-y-4">
                    {[
                      { label: t.yourName, ph: t.enterName, icon: User, type: "text" },
                      { label: t.phoneNum, ph: t.enterPhone, icon: Phone, type: "tel" },
                    ].map((f, i) => (
                      <div key={i}>
                        <label className={`text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"} mb-1.5 block`}>{f.label}</label>
                        <div className="relative">
                          <f.icon size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${tm}`} />
                          <input type={f.type} placeholder={f.ph}
                            className={`w-full pl-10 pr-4 py-3 ${inputCls} border rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all`} />
                        </div>
                      </div>
                    ))}
                    <div>
                      <label className={`text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"} mb-1.5 block`}>{t.message}</label>
                      <div className="relative">
                        <Mail size={16} className={`absolute left-3.5 top-3.5 ${tm}`} />
                        <textarea rows={3} placeholder={t.howHelp}
                          className={`w-full pl-10 pr-4 py-3 ${inputCls} border rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none`} />
                      </div>
                    </div>
                    <button className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2">
                      {t.sendEnquiry} <ChevronRight size={16} /></button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════ FOOTER ═══════ */}
        <footer className={`${dark ? "bg-black" : "bg-gray-900"} text-white pt-16 pb-8`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>RNT Memorial <span className="text-amber-400">{t.heroTitle2}</span></h3>
                <p className="hindi text-sm text-gray-400 mb-2">{T.hi.tagline}</p>
                <p className="text-sm text-gray-400">{T.en.tagline}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">{t.quickLinks}</h4>
                <div className="space-y-2">
                  {NAV.map(l => <button key={l.id} onClick={() => scrollTo(l.id)} className="block text-sm text-gray-400 hover:text-amber-400 transition-colors">{l.label}</button>)}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">{t.servicesLabel}</h4>
                <div className="space-y-2">
                  {SERVICES_DATA.map((s, i) => <p key={i} className="text-sm text-gray-400">{s.title}</p>)}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">{t.contactLabel}</h4>
                <div className="space-y-3">
                  {CLINIC.phones.map((p, i) => (
                    <a key={i} href={`tel:${p.number}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-amber-400 transition-colors">
                      <Phone size={14} /> {p.number} ({p.label})</a>
                  ))}
                  <div className="flex items-start gap-2 text-sm text-gray-400">
                    <MapPin size={14} className="mt-0.5 shrink-0" /><span>{CLINIC.address.building}, {CLINIC.address.city}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500">{t.footerRights}</p>
              <div className="flex items-center gap-4">
                <a href={`https://wa.me/${CLINIC.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"><MessageSquare size={16} /></a>
                <a href={`tel:${CLINIC.phones[0].number}`}
                  className="w-9 h-9 bg-gray-800 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-colors"><Phone size={16} /></a>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <p className="text-xs text-gray-600 tracking-wide">
                Powered by{" "}
                <span className="font-semibold bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
                  Varaai
                </span>
              </p>
            </div>
          </div>
        </footer>

        {/* ═══════ FLOATING WHATSAPP ═══════ */}
        <a href={`https://wa.me/${CLINIC.whatsapp}?text=Hello%20RNT%20Memorial%20Clinic%2C%20I%20need%20an%20appointment.`}
          target="_blank" rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
          style={{ animation: "whatsappPulse 2s infinite" }} title="Chat on WhatsApp">
          <MessageSquare size={26} className="text-white" />
        </a>
      </div>
    </AppCtx.Provider>
  );
}
