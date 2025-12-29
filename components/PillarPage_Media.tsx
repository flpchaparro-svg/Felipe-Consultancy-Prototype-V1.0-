import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mic2, Library, Share2, Rocket, CheckCircle2 } from 'lucide-react';
import PillarVisual_Broadcast from './PillarVisual_Broadcast';

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const PillarPage_Media: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {

  const services = [
    {
      id: 'synthetic',
      icon: Mic2,
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      title: 'Tier 01 // The Synthetic Studio',
      tagline: 'Voice Cloning. Avatar Synthesis.',
      promise: 'Your presence is everywhere, but you are nowhere.',
      who: 'For Camera-Shy Experts (Law/Finance). You know you need video authority, but you hate filming and don\'t have 4 hours to set up lights.',
      description: 'We decouple your presence from your physical output. We clone your voice and visual persona. You send a text script, and our studio produces a high-fidelity video of you delivering the message. You stay in deep work while your digital twin handles the marketing.',
      specs: ['AI Voice Cloning', 'Video Synthesis', 'Script-to-Screen Logic', 'Anti-Uncanny Protocols']
    },
    {
      id: 'authority',
      icon: Library,
      accent: 'text-[#C5A059]',
      bgAccent: 'bg-[#C5A059]',
      title: 'Tier 02 // The Authority Matrix',
      tagline: 'Video SEO. Knowledge Graph.',
      promise: 'Own the search results for your client\'s deepest fears.',
      who: 'For Specialists (Surgeons/Consultants). You are tired of seeing competitors with less skill ranking higher on Google because they have better blogs.',
      description: 'We don\'t write generic blogs. We build a video-first Authority Library. We record you answering the top 50 questions in your niche, then turn those videos into SEO-rich articles. When a client searches for a solution at 2 AM, they find you.',
      specs: ['Topic Cluster Protocol', 'Video-to-Text SEO', 'YouTube Optimization', 'Semantic Authority']
    },
    {
      id: 'distribution',
      icon: Share2,
      accent: 'text-[#1a1a1a]',
      bgAccent: 'bg-[#1a1a1a]',
      title: 'Tier 03 // The Distribution Grid',
      tagline: 'Logistics. Omni-Channel.',
      promise: 'Create once, publish everywhere. Zero manual uploading.',
      who: 'For the "Sunday Grind" Victim. You create the content, but you burn out trying to format, caption, and post it to LinkedIn, Instagram, and YouTube.',
      description: 'We treat content as a supply chain. You drop a raw video file into a folder, and the Grid takes over. It automatically resizes the video, writes the captions, and schedules the post across every channel. You are the talent; we are the road crew.',
      specs: ['Auto-Resizing Logic', 'Caption AI Generation', 'Multi-Channel Scheduling', 'Asset Management']
    },
    {
      id: 'terminal',
      icon: Rocket,
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      title: 'Tier 04 // The Conversion Terminal',
      tagline: 'Campaign Ops. Speedboats.',
      promise: 'Launch a world-class offer in 24 hours. Zero developer dependency.',
      who: 'For Growth Marketers & Ad Spenders. You have a campaign idea, but your main corporate site is too slow or rigid to handle it.',
      description: 'We build "Speedboats"—single-purpose, high-velocity landing pages designed purely for conversion. They live on a subdomain, load instantly, and are decoupled from your main IT infrastructure. You can launch a new offer tomorrow without a single meeting.',
      specs: ['Framer/Webflow Speedboats', 'High-Velocity Templates', 'Zero-Lag Embeds', 'Ad-Tracking Optimization']
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] px-0 relative z-[150] overflow-x-hidden flex flex-col"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow">
        
        {/* NAV BACK */}
        <div className="absolute top-12 left-6 md:left-12 lg:left-20 z-50">
          <button 
            onClick={() => onNavigate('architecture')}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return_to_Architecture
          </button>
        </div>

        {/* --- HERO SECTION --- */}
        <div className="min-h-[85vh] flex flex-col justify-center border-b border-black/10 relative">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-32 lg:pt-0">
              
              <div className="relative z-10">
                <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ SYSTEM_05 // PRESENCE</span>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
                  Media <br />
                  <span className="italic text-[#E21E3F]">Logistics.</span>
                </h1>
                <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed max-w-md border-l-2 border-[#C5A059] pl-6 mb-12">
                   We decouple your authority from your physical time. <br/>
                   We turn one hour of expertise into a month of <strong>Omnipresence</strong> through supply chain engineering.
                </p>
                
                <div className="flex items-center gap-2 animate-bounce">
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Select your Channel</span>
                    <ArrowRight className="w-4 h-4 rotate-90 opacity-50" />
                </div>
              </div>

              <div className="h-[400px] lg:h-[600px] flex items-center justify-center lg:justify-end relative z-0">
                 <PillarVisual_Broadcast />
              </div>
           </div>
        </div>

        {/* --- THE SERVICE STACK (Vertical Layout) --- */}
        <div className="py-20">
           
           <div className="mb-20">
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Choose your Broadcast.</h2>
              <p className="font-sans text-lg text-[#1a1a1a]/60 max-w-2xl">
                Content is not art; it is a supply chain. <br/> Identify where your message is getting stuck.
              </p>
           </div>

           <div className="space-y-8">
              {services.map((service) => (
                <div key={service.id} className="group bg-white border border-black/5 p-8 md:p-12 hover:border-[#1a1a1a] transition-all duration-500 relative overflow-hidden">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* LEFT: HEADER & PROMISE */}
                        <div className="lg:col-span-4 flex flex-col justify-between">
                            <div>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-black/5 ${service.accent}`}>
                                    <service.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-serif text-3xl mb-2">{service.title}</h3>
                                <span className={`font-mono text-[10px] uppercase tracking-widest font-bold ${service.accent}`}>
                                    {service.tagline}
                                </span>
                            </div>
                            
                            <div className="mt-8 lg:mt-0">
                                <span className="font-mono text-[9px] uppercase tracking-widest block mb-2 opacity-40">The Promise:</span>
                                <p className="font-serif text-xl italic text-[#1a1a1a]">
                                    "{service.promise}"
                                </p>
                            </div>
                        </div>

                        {/* MIDDLE: DESCRIPTION & WHO */}
                        <div className="lg:col-span-5 border-l border-black/5 pl-0 lg:pl-12">
                             <div className="mb-8">
                                <span className="font-mono text-[9px] uppercase tracking-widest block mb-2 opacity-40">Who is this for?</span>
                                <p className="font-sans text-sm font-bold text-[#1a1a1a]/80 leading-relaxed">
                                    {service.who}
                                </p>
                             </div>
                             <div>
                                <span className="font-mono text-[9px] uppercase tracking-widest block mb-2 opacity-40">The Strategy:</span>
                                <p className="font-sans text-lg text-[#1a1a1a]/60 leading-relaxed">
                                    {service.description}
                                </p>
                             </div>
                        </div>

                        {/* RIGHT: SPECS & CTA */}
                        <div className="lg:col-span-3 bg-[#F9F9F9] -m-8 md:-m-12 p-8 md:p-12 flex flex-col justify-between border-l border-black/5">
                            <ul className="space-y-3 mb-8">
                                {service.specs.map((spec, i) => (
                                    <li key={i} className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/60">
                                        <CheckCircle2 className={`w-3 h-3 ${service.accent}`} />
                                        {spec}
                                    </li>
                                ))}
                            </ul>

                            {/* --- STANDARDIZED BUTTON --- */}
                            <button 
                                onClick={() => onNavigate('landing', 'booking')}
                                className="w-full py-4 bg-[#1a1a1a] text-[#FFF2EC] relative overflow-hidden group/btn border border-[#1a1a1a]"
                            >
                                <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                                <span className="relative z-10 flex items-center justify-center gap-4 group-hover/btn:text-[#1a1a1a] transition-colors duration-500 font-mono text-[10px] uppercase tracking-[0.2em]">
                                  [ BOOK_CONSULTATION ]
                                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </div>

                    </div>
                    
                    {/* Hover Bar */}
                    <div className={`absolute left-0 top-0 h-full w-1 ${service.bgAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              ))}
           </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="border-t border-black/10 py-32 flex flex-col items-center text-center">
           <h2 className="font-serif text-5xl md:text-6xl mb-8">Stop posting. <br/> <span className="italic text-[#E21E3F]">Start broadcasting.</span></h2>
           <button 
             onClick={() => onNavigate('landing', 'booking')}
             className="group relative flex items-center justify-center px-10 py-6 bg-[#1a1a1a] text-[#FFF2EC] font-mono text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-300"
           >
             <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
             <span className="relative z-10 flex items-center gap-4 group-hover:text-[#1a1a1a] transition-colors duration-500">
               [ BOOK_DISCOVERY_CALL ]
               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </span>
           </button>
        </div>

      </div>
    </motion.div>
  );
};

export default PillarPage_Media;