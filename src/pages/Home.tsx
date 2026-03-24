import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Wallet, Navigation, Sparkles, ArrowRight, Star, Phone, MessageCircle } from 'lucide-react';
import { Globe } from '../components/ui/Globe';

const CITIES = ["Hyderabad", "Chennai", "Bangalore", "Goa", "Tirupati", "Mumbai", "Delhi", "Jaipur", "Kochi", "Agra"];

const Stars = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(70)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 3 + 'px',
            height: Math.random() * 3 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.5, 1],
            boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 8px rgba(255,255,255,0.8)', '0 0 0px rgba(255,255,255,0)']
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [source, setSource] = useState('Hyderabad');
  const [destination, setDestination] = useState('Goa');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState('Medium');
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      navigate('/dashboard', { 
        state: { source, destination, days, budget } 
      });
    }, 2000); // Fake loading for dramatic effect
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center p-4 relative overflow-hidden font-sans">
      <Stars />
      
      {/* Futuristic Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-7xl w-full mx-auto z-10 pt-12 pb-24">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 text-cyan-300 text-sm font-medium tracking-wide">
              <Sparkles className="w-4 h-4" />
              Your Intelligent Travel Companion
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-6 tracking-tight drop-shadow-sm">
              AI Smart Travel Planner
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-xl font-light leading-relaxed mb-10">
              Plan your journeys smarter, faster, and more efficiently with our AI-powered travel planner designed specifically for India. Get complete travel insights — from budget estimation to real-time weather updates, food suggestions, transport options, and nearby attractions — all in one seamless platform.
            </p>

            <div className="backdrop-blur-xl bg-[#131b2f]/60 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden rounded-3xl p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none"></div>
              
              <form onSubmit={handlePlanTrip} className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2 transition-colors group-focus-within:text-cyan-400">
                    <Navigation className="w-4 h-4" /> Source City
                  </label>
                  <select 
                    value={source} 
                    onChange={(e) => setSource(e.target.value)} 
                    required
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                  >
                    {CITIES.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                  </select>
                </div>

                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2 transition-colors group-focus-within:text-purple-400">
                    <MapPin className="w-4 h-4" /> Destination City
                  </label>
                  <select 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)} 
                    required
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                  >
                    {CITIES.filter(c => c !== source).map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                  </select>
                </div>

                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2 transition-colors group-focus-within:text-emerald-400">
                    <Calendar className="w-4 h-4" /> Number of Days
                  </label>
                  <input 
                    type="number" 
                    min="1" 
                    max="30" 
                    value={days} 
                    onChange={(e) => setDays(parseInt(e.target.value) || 1)} 
                    required
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2 transition-colors group-focus-within:text-orange-400">
                    <Wallet className="w-4 h-4" /> Budget Type
                  </label>
                  <select 
                    value={budget} 
                    onChange={(e) => setBudget(e.target.value)} 
                    required
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                  >
                    <option value="Low" className="bg-slate-900">Low (Backpacker)</option>
                    <option value="Medium" className="bg-slate-900">Medium (Comfort)</option>
                    <option value="High" className="bg-slate-900">High (Luxury)</option>
                  </select>
                </div>

                <div className="col-span-1 sm:col-span-2 pt-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={isLoading}
                    className="relative w-full h-14 rounded-xl font-bold text-lg text-white overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 transition-all duration-500 group-hover:bg-[length:200%_auto] group-hover:animate-gradient"></div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating AI Plan...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Plan My Trip Now
                        </>
                      )}
                    </div>
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center items-center"
          >
            <Globe />
          </motion.div>
        </div>

        {/* Quick Links with Moving Arrows */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24"
        >
          <a href="https://www.buildai.space/app/trip-planner-ai/item/1-day-goa-cultural-historical-trip" target="_blank" rel="noreferrer" className="block group">
            <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-cyan-300 mb-2 flex items-center gap-2">✨ Explore a Sample Smart Trip Plan</h3>
                <p className="text-slate-400">Experience a curated Goa itinerary powered by AI</p>
              </div>
              <ArrowRight className="w-6 h-6 text-cyan-400 animate-bounce-x" />
            </div>
          </a>

          <a href="https://share.google/6P2yxlBn9G7qGCVd9" target="_blank" rel="noreferrer" className="block group">
            <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-purple-300 mb-2 flex items-center gap-2">🎟️ Book Your Travel Tickets Easily</h3>
                <p className="text-slate-400">Secure your train tickets directly through IRCTC</p>
              </div>
              <ArrowRight className="w-6 h-6 text-purple-400 animate-bounce-x" />
            </div>
          </a>
        </motion.div>

        {/* What We Offer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">🍽️ What We Offer</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "💰", title: "Smart Budget Planning" },
              { icon: "🌦️", title: "Real-Time Weather Updates" },
              { icon: "📍", title: "Nearby Attractions & Hidden Gems" },
              { icon: "🍔", title: "Personalized Food Recommendations" },
              { icon: "🚆", title: "Transport Comparison (Train, Bus, Flight)" },
              { icon: "📅", title: "Day-wise Travel Itinerary" },
              { icon: "📊", title: "Interactive Charts & Insights" },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                <span className="text-4xl mb-4">{feature.icon}</span>
                <h4 className="text-lg font-semibold text-slate-200">{feature.title}</h4>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us & Helpline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/10 backdrop-blur-md"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">🚀 Why Choose Us?</h2>
            <ul className="space-y-4">
              {[
                "AI-powered intelligent recommendations",
                "Smooth, modern, and animated user interface",
                "Fast, accurate, and reliable planning",
                "All travel essentials in one unified platform"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-yellow-400 shrink-0 fill-yellow-400" />
                  <span className="text-lg text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-2xl font-bold text-cyan-300 mb-2">🌟 Start Your Journey Today!</h3>
              <p className="text-slate-400">Explore India smarter with AI and make every trip unforgettable.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">📞 Need Help? We’re Here for You</h2>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-3">📲 Helpline Numbers</h4>
                <div className="flex flex-col gap-2">
                  <a href="tel:+917671000584" className="flex items-center gap-3 text-xl font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                    <Phone className="w-5 h-5" /> +91 7671000584
                  </a>
                  <a href="tel:+917675888451" className="flex items-center gap-3 text-xl font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                    <Phone className="w-5 h-5" /> +91 7675888451
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-3">💬 Support Available For</h4>
                <ul className="space-y-2">
                  {[
                    "Trip planning assistance",
                    "Ticket booking guidance",
                    "General travel queries"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <MessageCircle className="w-4 h-4 text-purple-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
