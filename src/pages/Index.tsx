import { useState, useRef, useEffect } from "react";
import { ChevronDown, BookOpen, Eye, Key, Sparkles, Shield, Zap, Lock, Check, X, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const themes = [
  "Hermetismo", "Projeção Astral", "Alta Magia", "Cabala", "Bruxaria", "Tarô", "Alquimia",
  "Wicca", "Maçonaria", "Gnosticismo", "Demonologia", "Sonhos Lúcidos", "Mediunidade",
  "Xamanismo", "Rosacruz", "Magia do Caos", "Ocultismo", "Astrologia", "Chakras", "Teurgia",
  "Umbanda", "Espiritismo", "Sigilos", "Telepatia", "Shadow Work", "Filosofia Oculta",
  "Psicologia Profunda", "Sociedades Secretas", "Magia Enochiana", "Clarividência",
  "Magia de Velas", "Telecinese", "Candomblé", "Quiromancia", "Numerologia",
  "Vampirismo Energético", "Pop Magic", "Banimento", "Necromancia",
];

const categories = [
  { n: "01", icon: Sparkles, title: "Magia & Rituais", text: "Feitiços, invocações, alta magia, magia com velas, sigilos, evocações e práticas reais de diversas tradições ao redor do mundo." },
  { n: "02", icon: Eye, title: "Desenvolvimento Mental", text: "Projeção astral, sonhos lúcidos, telepatia, auto-hipnose, persuasão, foco e expansão real da consciência." },
  { n: "03", icon: Key, title: "Tradições & Ordens", text: "Maçonaria, Rosacruz, Cabala, Hermetismo, Wicca, Umbanda, Candomblé, Gnosticismo e dezenas de outras tradições iniciáticas." },
  { n: "04", icon: BookOpen, title: "Obras Raras & Censuradas", text: "Grimórios, escrituras apócrifas e textos iniciáticos que igrejas, impérios e elites tentaram apagar da história." },
  { n: "05", icon: Zap, title: "Manifestação & Abundância", text: "Reprogramação mental, lei da atração aplicada, ferramentas práticas para transformar intenção em realidade." },
  { n: "06", icon: Shield, title: "Autoconhecimento & Cura", text: "Meditações, vidas passadas, shadow work, cura de padrões destrutivos e libertação de bloqueios internos." },
];

const testimonials = [
  { text: "Comprei achando que ia encontrar um monte de PDF aleatório igual aqueles drives bagunçados… mas é muito organizado. A leitura é confortável de verdade. Comecei lendo só por curiosidade e já tô viciado nos conteúdos de hermetismo.", name: "Rafael M.", local: "São Paulo/SP", avatar: "1774375888416.webp" },
  { text: "Isso aqui vale muito mais que o preço, tem livro que eu procurava fazia anos e nunca encontrava completo. O mais absurdo é a quantidade de temas diferentes… uma coisa vai puxando outra. Estou amandoo!", name: "Carla T.", local: "Belo Horizonte/MG", avatar: "1774375888656.webp" },
  { text: "Curti porque tem desde conteúdo mais básico até coisas MUITO profundas. Dá pra começar sem entender nada e ir evoluindo aos poucos sem ficar perdido.", name: "Diego F.", local: "Recife/PE", avatar: "1774375888506.webp" },
];

const faqs = [
  { q: "Qual a diferença entre o Básico e o Premium?", a: "No Básico você acessa 500 livros e 10 temas e tradições. No Premium você desbloqueia o acervo completo de 20.000 livros, incluindo as obras mais raras e censuradas, além de atualizações contínuas e suporte prioritário." },
  { q: "Como os livros são entregues e organizados?", a: "Você recebe acesso a uma plataforma digital exclusiva e super fácil de usar. Lá dentro, todos os livros estão em formato PDF, perfeitamente organizados e separados por pastas e temas. É zero bagunça: basta entrar, clicar no tema que deseja e começar a ler na mesma hora (ou baixar para o seu aparelho)." },
  { q: "O acesso é realmente vitalício nos dois planos?", a: "Sim. Em ambos os planos você paga uma única vez e acessa para sempre. Sem mensalidade, sem cobrança futura." },
  { q: "Posso fazer upgrade do Básico para o Premium depois?", a: "Sim. Se começar pelo Básico e quiser o acervo completo, basta pagar a diferença para fazer o upgrade a qualquer momento." },
  { q: "Funciona no celular?", a: "Sim. O acesso é totalmente online e funciona em qualquer celular, tablet ou computador. Sem precisar instalar nada." },
  { q: "Os livros estão em português?", a: "Sim! Absolutamente todos os livros do nosso acervo possuem sua versão totalmente traduzida para o português, garantindo que você não perca nenhum detalhe da leitura." },
  { q: "Preciso ter conhecimento prévio?", a: "Não. O acervo contempla desde iniciantes absolutos até estudiosos avançados. Você começa pelo que fizer sentido para você." },
  { q: "Como recebo o acesso?", a: "Imediatamente após a confirmação do pagamento, você recebe as instruções no seu e-mail." },
  { q: "E se eu não gostar?", a: "Você tem 30 dias de garantia em qualquer plano. Se não ficar satisfeito, devolvemos 100% do valor sem nenhuma pergunta." },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="divider-ornament mb-6">
    <span className="eyebrow whitespace-nowrap">{children}</span>
  </div>
);

const Sigil = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8 text-gold/70" fill="none" stroke="currentColor" strokeWidth="0.8">
    <circle cx="50" cy="50" r="45" />
    <circle cx="50" cy="50" r="32" />
    <path d="M50 5 L93 75 L7 75 Z" />
    <path d="M50 95 L7 25 L93 25 Z" />
    <circle cx="50" cy="50" r="6" />
  </svg>
);

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 sm:py-6 flex items-center justify-between gap-4 sm:gap-6 text-left group"
      >
        <span className="font-serif text-base sm:text-lg md:text-xl text-foreground/95 group-hover:text-gold transition-colors">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gold/60 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-500 ${open ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="text-muted-foreground leading-relaxed pr-6 sm:pr-12 text-sm sm:text-base">{a}</p>
        </div>
      </div>
    </div>
  );
};

const CTAButton = ({ className = "" }: { className?: string }) => (
  <div className={`text-center mt-10 sm:mt-14 relative z-20 w-full flex justify-center ${className}`}>
    <a href="#planos" className="inline-block">
      <Button size="lg" className="bg-blood hover:bg-blood-bright text-white text-xs sm:text-sm tracking-widest uppercase px-6 sm:px-8 py-6 sm:py-7 rounded-xl glow-blood transition-all hover:scale-[1.03]">
        ACESSAR AGORA
      </Button>
    </a>
  </div>
);

/* Background ambient orbs (fixed across the whole page) */
const AmbientBackdrop = () => (
  <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="orb orb-blood animate-drift animate-breathe" style={{ width: 520, height: 520, top: "-120px", left: "-120px" }} />
    <div className="orb orb-dark animate-drift-rev" style={{ width: 600, height: 600, top: "30%", right: "-180px" }} />
    <div className="orb orb-blood animate-drift-rev animate-breathe" style={{ width: 420, height: 420, bottom: "-120px", left: "20%", opacity: 0.35 }} />
    <div className="orb orb-dark animate-drift" style={{ width: 480, height: 480, bottom: "10%", right: "10%", opacity: 0.4 }} />
  </div>
);

const PageCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -340 : 340, behavior: "smooth" });
    }
  };

  const images = [
    "1259699_1_17376074716791c930043dc7590105911037763.png",
    "1259699_1_17376074716791c930043dc7590105911288351.jpeg",
    "1259699_1_17376074716791c930043dc7590105912722099.jpeg",
    "1259699_1_17376074716791c930043dc7590105914100936.jpeg",
    "1259699_1_17376074716791c930043dc7590105914507630.png",
    "1259699_1_17376074716791c930043dc7590105917982555.jpeg",
    "chacaras.webp",
    "ilusoes.webp",
    "planos.webp",
    "sentimentos.webp",
    "sigilos.webp",
    "specula.webp"
  ];

  return (
    <div className="relative w-full mx-auto group max-w-[100vw]">
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      
      <button 
        onClick={() => scroll("left")}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 hover:scale-105"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={() => scroll("right")}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 hover:scale-105"
        aria-label="Próxima"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-8 pb-8 pt-4 px-6 sm:px-16 hide-scrollbar scroll-smooth" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((img, i) => (
          <div key={i} className="snap-center shrink-0 w-[260px] sm:w-[340px] md:w-[440px]">
            <img 
              src={`/books/${img}`} 
              alt={`Página interna ${i+1}`} 
              className="w-full h-auto object-cover rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/[0.08]" 
            />
          </div>
        ))}
      </div>
      
      <div className="absolute inset-y-0 left-0 w-8 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 w-8 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
    </div>
  );
};

const PurchaseNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState({ name: "", minutes: 0 });

  const names = [
    "João S.", "Maria F.", "Carlos", "Ana P.", "Lucas M.", 
    "Juliana", "Marcos R.", "Fernanda T.", "Rafael", "Camila",
    "Pedro H.", "Letícia", "Gabriel", "Amanda", "Bruno"
  ];

  useEffect(() => {
    const showNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomMinutes = Math.floor(Math.random() * 59) + 1;
      
      setNotification({ name: randomName, minutes: randomMinutes });
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    const initialTimer = setTimeout(showNotification, 5000);
    const interval = setInterval(showNotification, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-fade-up">
      <div className="bg-[#050505]/95 backdrop-blur-2xl border border-blood/60 rounded-xl p-4 flex items-center gap-4 max-w-[280px] sm:max-w-[320px] shadow-[0_0_20px_rgba(200,0,0,0.2)]">
        <div className="bg-blood/20 rounded-full p-2 shrink-0">
          <BookOpen className="w-5 h-5 text-blood-bright" />
        </div>
        <div>
          <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-tight">
            <span className="text-gold font-bold">{notification.name}</span> acabou de garantir o acesso à Biblioteca Secreta
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">Há {notification.minutes} minutos</p>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const today = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="relative z-10 overflow-x-hidden">
      <AmbientBackdrop />
      <PurchaseNotification />

      {/* Top Bar */}
      <div className="bg-blood/20 border-b border-blood/50 py-3 sm:py-4 text-center text-xs sm:text-sm md:text-base tracking-wide relative z-20 px-4 shadow-[0_0_30px_rgba(220,20,20,0.3)] backdrop-blur-md">
        <span className="text-white drop-shadow-lg font-medium block sm:inline">⏳ Oferta especial válida apenas até hoje, <span className="text-gold font-bold glow-text">{today}</span>. </span>
        <span className="text-white font-bold glow-text uppercase tracking-widest text-[10px] sm:text-xs sm:ml-2 mt-1 sm:mt-0 inline-block">
          Garanta seu acesso agora.
        </span>
      </div>



      {/* HERO */}
      <section className="relative section-pad pt-8 sm:pt-12 md:pt-20">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero)" }} />
        <div className="container-tight flex flex-col items-center text-center relative max-w-4xl mx-auto">
          <div className="animate-fade-up w-full">
            <p className="eyebrow mb-6 sm:mb-8">O maior acervo oculto já reunido num só lugar</p>
            <h1 className="font-serif text-[2.75rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6 sm:mb-8">
              BIBLIOTECA<br />
              <span className="text-blood glow-text italic font-medium">Secreta</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto text-center">
              <span className="text-foreground">20.000 livros</span> sobre magia, esoterismo, ocultismo e desenvolvimento humano. Na palma da sua mão. Por um único pagamento.
            </p>
            <div className="flex justify-center mb-8 sm:mb-10 w-full max-w-2xl mx-auto">
              <img src="/books/hero-mockup.png" alt="Acervo de Livros" className="w-full h-auto drop-shadow-2xl hover:-translate-y-2 transition-transform duration-700" />
            </div>
            <a href="#planos" className="inline-block">
              <Button size="lg" className="bg-blood hover:bg-blood-bright text-white text-xs sm:text-sm tracking-widest uppercase px-6 sm:px-8 py-6 sm:py-7 rounded-xl glow-blood transition-all hover:scale-[1.03]">
                ACESSAR AGORA
              </Button>
            </a>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 text-[11px] sm:text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><Check className="w-3 h-3 text-gold" /> Pagamento único</span>
              <span className="flex items-center gap-2"><Check className="w-3 h-3 text-gold" /> Acesso imediato</span>
              <span className="flex items-center gap-2"><Check className="w-3 h-3 text-gold" /> 30 dias de garantia</span>
            </div>
          </div>
        </div>

        {/* Stats Bar — Glass */}
        <div className="container-tight mt-16 sm:mt-24">
          <div className="glass rounded-2xl grid grid-cols-2 md:grid-cols-4 overflow-hidden">
            {[
              { n: "20.000", l: "Livros" },
              { n: "+50", l: "Temas e tradições" },
              { n: "R$14,90", l: "A partir de" },
              { n: "30 dias", l: "Garantia" },
            ].map((s, i) => (
              <div key={s.l} className={`p-6 sm:p-8 text-center ${i > 0 ? "border-t md:border-t-0 md:border-l border-white/[0.05]" : ""} ${i === 1 ? "border-l border-white/[0.05]" : ""} ${i === 2 ? "md:border-l border-white/[0.05]" : ""}`}>
                <div className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold mb-1">{s.n}</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMESSA */}
      <section className="section-pad pb-4 sm:pb-8">
        <div className="container-tight max-w-3xl text-center">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl leading-relaxed text-foreground/95">
            Você terá acesso a obras <span className="text-blood italic">raras, censuradas</span> e de difícil acesso que a maioria das pessoas jamais encontrará. Grimórios, escrituras apócrifas, textos iniciáticos e clássicos do ocultismo mundial.
          </p>
          <p className="text-muted-foreground mt-6 sm:mt-8 text-sm sm:text-base">
            Tudo reunido em um único lugar, por menos do que você gasta num lanche.
          </p>
          <CTAButton />
        </div>
      </section>

      {/* AMOSTRA */}
      <section className="py-12 sm:py-16 overflow-hidden bg-white/[0.01]">
        <div className="container-tight text-center mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground/90 glow-text italic">
            É apenas o que podemos mostrar aqui
          </h2>
        </div>
        
        <div className="relative flex flex-col gap-6">
          {/* Sombras laterais para dar efeito de fade in/out */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
          
          {(() => {
            const allBooks = [
              "0.jpg", "1.jpg", "2.jpg", "3.png", "4.jpg", "5.jpg", "6.jpg", "7.png", 
              "8.jpg", "9.png", "10.png", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "16.jpg", 
              "17.jpg", "18.png", "19.webp", "20.png", "21.jpg", "22.jpg", "23.jpg", 
              "24.png", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.png", "31.jpg"
            ];
            const half = Math.ceil(allBooks.length / 2);
            const row1 = allBooks.slice(0, half);
            const row2 = allBooks.slice(half);

            return (
              <>
                {/* Carrossel 1 - Esquerda para Direita (sentido horário) */}
                <div className="flex w-max animate-scroll-left">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-8 sm:gap-12 px-4 sm:px-6">
                      {row1.map((filename) => (
                        <img key={`c1-${i}-${filename}`} src={`/books/${filename}`} alt="Capa Livro Oculto" className="w-28 sm:w-32 md:w-36 h-auto object-cover rounded-md border border-white/10 shadow-lg flex-shrink-0 transition-transform duration-300" />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Carrossel 2 - Direita para Esquerda (sentido anti-horário) */}
                <div className="flex w-max animate-scroll-right">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-8 sm:gap-12 px-4 sm:px-6">
                      {row2.map((filename) => (
                        <img key={`c2-${i}-${filename}`} src={`/books/${filename}`} alt="Capa Livro Oculto" className="w-28 sm:w-32 md:w-36 h-auto object-cover rounded-md border border-white/10 shadow-lg flex-shrink-0 transition-transform duration-300" />
                      ))}
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="section-pad border-t border-white/[0.06]">
        <div className="container-tight">
          <div className="text-center mb-14 sm:mb-20">
            <SectionLabel>O que você encontra</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl leading-tight max-w-3xl mx-auto">
              Tudo que você precisava<br />estava <span className="text-blood italic">escondido.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {categories.map((c) => (
              <div key={c.n} className="glass rounded-2xl p-7 sm:p-9 group hover:bg-white/[0.05] transition-all duration-500 relative hover:-translate-y-1 hover:scale-[1.01]">
                <div className="absolute top-5 right-5 font-serif text-[11px] text-gold/40 tracking-widest">{c.n}</div>
                <c.icon className="w-7 h-7 text-blood mb-5 group-hover:text-gold transition-colors" strokeWidth={1.2} />
                <h3 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
          <CTAButton />
        </div>
      </section>

      {/* PÁGINAS INTERNAS */}
      <section className="py-8 sm:py-12 overflow-hidden relative">
        <PageCarousel />
      </section>

      {/* TEMAS */}
      <section className="py-16 sm:py-20">
        <div className="container-tight">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground/90 leading-tight">
              <span className="text-blood italic">+50 TEMAS</span> Místicos e Ocultos
            </h2>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base max-w-xl mx-auto">
              Navegue por vertentes e tradições que moldaram silenciosamente a história da humanidade.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
            {themes.map((t) => (
              <span key={t} className="px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs tracking-wide glass rounded-full text-muted-foreground hover:text-gold hover:border-gold/40 transition-all cursor-default">
                {t}
              </span>
            ))}
            <span className="px-4 sm:px-5 py-1.5 text-[11px] sm:text-xs tracking-widest uppercase bg-blood/20 border border-blood/50 text-white rounded-full font-bold glow-blood shadow-[0_0_15px_rgba(200,0,0,0.3)] cursor-default">
              E muito mais...
            </span>
          </div>
          <CTAButton />
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="section-pad">
        <div className="container-tight">
          <div className="text-center mb-14 sm:mb-20">
            <SectionLabel>Relatos</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl">O QUE DIZEM <span className="text-blood italic">OS MEMBROS</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="glass rounded-2xl p-7 sm:p-8 hover:-translate-y-1 transition-transform duration-500 flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                </div>
                <p className="text-foreground/85 leading-relaxed text-sm mb-6 font-light italic flex-grow">"{t.text}"</p>
                <div className="pt-5 border-t border-white/[0.06] flex items-center gap-4">
                  <img src={`/books/${t.avatar}`} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-white/10 shrink-0" />
                  <div>
                    <div className="font-serif text-base">{t.name}</div>
                    <div className="text-xs text-muted-foreground tracking-wide">{t.local}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="section-pad relative">
        <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: "var(--gradient-hero)" }} />
        <div className="container-tight relative">
          <div className="text-center mb-14 sm:mb-20">
            <SectionLabel>Escolha seu acesso</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl mb-5">Um único pagamento.<br /><span className="text-blood italic">Para sempre.</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base px-4">Sem mensalidade. Sem renovação. Você paga uma vez e acessa para sempre.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {/* Básico */}
            <div className="glass rounded-2xl p-7 sm:p-10">
              <div className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase mb-5 sm:mb-6">Entrada</div>
              <div className="mb-7 sm:mb-8">
                <div className="text-sm text-muted-foreground line-through mb-1">De R$67</div>
                <div className="font-serif text-5xl sm:text-6xl">R$14,90</div>
                <div className="text-[11px] text-muted-foreground tracking-wide mt-2">Pagamento único · Acesso vitalício</div>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                {["Acesso a 500 livros do acervo", "10 temas e tradições", "Funciona no celular e computador", "30 dias de garantia incondicional"].map(i => (
                  <li key={i} className="flex gap-3 text-foreground/85"><Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />{i}</li>
                ))}
              </ul>
              <ul className="space-y-3 mb-8 sm:mb-10 text-sm pb-7 sm:pb-8 border-b border-white/[0.06]">
                {["Acervo completo de 20.000 livros", "Obras raras e censuradas exclusivas", "Atualizações contínuas do acervo", "Suporte prioritário"].map(i => (
                  <li key={i} className="flex gap-3 text-muted-foreground/55"><X className="w-4 h-4 mt-0.5 shrink-0" />{i}</li>
                ))}
              </ul>
              <Button variant="outline" className="w-full bg-white/[0.02] border-white/10 hover:bg-white/[0.06] hover:border-gold/40 hover:text-gold rounded-xl py-6 text-[11px] sm:text-xs tracking-widest uppercase">
                Começar com o Básico
              </Button>
            </div>

            {/* Premium */}
            <div className="relative glass-blood rounded-2xl p-7 sm:p-10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blood text-white px-4 py-1 text-[10px] tracking-[0.3em] uppercase rounded-full glow-blood">Mais Popular</div>
              <div className="text-[11px] tracking-[0.3em] text-gold uppercase mb-5 sm:mb-6">Premium</div>
              <div className="mb-7 sm:mb-8">
                <div className="text-sm text-muted-foreground line-through mb-1">De R$197</div>
                <div className="font-serif text-5xl sm:text-6xl text-foreground glow-text">R$29,90</div>
                <div className="text-[11px] text-muted-foreground tracking-wide mt-2">Pagamento único · Acesso vitalício completo</div>
              </div>
              <ul className="space-y-3 mb-8 sm:mb-10 text-sm pb-7 sm:pb-8 border-b border-white/[0.08]">
                {[
                  "Acesso completo a 20.000 livros",
                  "Mais de 50 temas e tradições",
                  "Obras raras, apócrifas e censuradas",
                  "Atualizações contínuas do acervo",
                  "Funciona no celular e computador",
                  "Suporte prioritário",
                  "30 dias de garantia incondicional",
                ].map(i => (
                  <li key={i} className="flex gap-3 text-foreground/95"><Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />{i}</li>
                ))}
              </ul>
              <Button className="w-full bg-blood hover:bg-blood-bright text-white rounded-xl py-6 text-[11px] sm:text-xs tracking-widest uppercase glow-blood transition-all hover:scale-[1.02]">
                Acessar o Acervo Completo
              </Button>
              <p className="text-center text-[11px] text-muted-foreground mt-4">Pagamento seguro · Acesso em minutos</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-8 sm:mt-10 p-5 sm:p-6 glass rounded-2xl text-center text-sm text-foreground/85">
            <span className="text-gold">◆</span> Por apenas <span className="text-gold">R$15 a mais</span> você sai do acesso limitado e leva os 20.000 livros completos, incluindo as obras mais raras e difíceis de encontrar do acervo. <span className="text-foreground">A maioria escolhe o Premium.</span>
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="section-pad">
        <div className="container-tight max-w-2xl">
          <div className="glass rounded-3xl p-10 sm:p-14 text-center">
            <Lock className="w-10 h-10 text-blood mx-auto mb-6 sm:mb-8" strokeWidth={1.2} />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-5 sm:mb-6">Risco zero. <span className="text-blood italic">Sério.</span></h2>
            <p className="text-muted-foreground leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base">
              Se em 30 dias você não ficar satisfeito por qualquer motivo, devolvemos 100% do seu investimento. Sem perguntas, sem burocracia, sem enrolação. Você tem 30 dias para explorar o acervo com total segurança.
            </p>
            <div className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-blood/50 text-blood-bright tracking-[0.2em] text-[10px] sm:text-xs uppercase glow-blood">
              🔒 Garantia Incondicional de 30 Dias
            </div>
          </div>
          <CTAButton />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="container-tight max-w-3xl">
          <div className="text-center mb-12 sm:mb-16">
            <SectionLabel>Dúvidas</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl">Perguntas Frequentes</h2>
          </div>
          <div className="glass rounded-2xl px-6 sm:px-8">
            {faqs.map((f) => <FaqItem key={f.q} {...f} />)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-12 mt-12">
        <div className="container-tight text-center">
          <div className="flex justify-center mb-6"><Sigil /></div>
          <div className="font-serif text-xl mb-6">Biblioteca <span className="text-blood">Secreta</span></div>
          <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-2 text-[11px] sm:text-xs text-muted-foreground tracking-wide mb-8">
            <span>🔒 Pagamento Seguro</span>
            <span>✦ 30 Dias de Garantia</span>
            <span>⚡ Acesso Imediato</span>
          </div>
          <p className="text-[11px] sm:text-xs text-muted-foreground/60">© 2026 Biblioteca Secreta · Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
