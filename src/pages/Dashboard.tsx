import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Calendar, Wallet, Navigation, Sun, CloudRain, Wind, 
  Utensils, Train, Plane, Bus, Map, Share2, Save, ArrowLeft,
  CheckCircle2, Sparkles
} from 'lucide-react';
import { 
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement 
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Configure ChartJS for dark mode
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);
ChartJS.defaults.color = 'rgba(255, 255, 255, 0.7)';
ChartJS.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    const handle = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(handle);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(handle);
  }, [value]);
  return <>{count.toLocaleString('en-IN')}</>;
};

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { source, destination, days, budget } = location.state || { source: 'Hyderabad', destination: 'Goa', days: 3, budget: 'Medium' };

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using dummy data as requested for the frontend UI showcase
    setTimeout(() => {
      setData({
        budget: { 
          totalCost: budget === 'Low' ? 12000 : budget === 'Medium' ? 35000 : 85000, 
          breakdown: { travel: 12000, hotel: 15000, food: 5000, misc: 3000 } 
        },
        weather: { 
          current: { temp: 28, condition: 'Sunny' }, 
          forecast: [
            { day: 'Day 1', temp: 29, condition: 'Sunny' },
            { day: 'Day 2', temp: 27, condition: 'Cloudy' },
            { day: 'Day 3', temp: 26, condition: 'Rainy' },
            { day: 'Day 4', temp: 28, condition: 'Clear' },
            { day: 'Day 5', temp: 30, condition: 'Sunny' }
          ],
          recommendation: "Perfect weather for sightseeing. Don't forget sunscreen!"
        },
        places: [
          { name: 'Majestic Beach', category: 'Nature', description: 'Beautiful sunset views and water sports.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80' },
          { name: 'Ancient Fort', category: 'Historical', description: 'Centuries old architecture and history.', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=80' },
          { name: 'Grand Temple', category: 'Culture', description: 'Spiritual center with intricate carvings.', image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=500&q=80' },
          { name: 'City Center', category: 'Shopping', description: 'Bustling market with local crafts.', image: 'https://images.unsplash.com/photo-1587922546307-776227941871?w=500&q=80' }
        ],
        food: [
          { name: 'Local Street Food Tour', price: 250, type: 'Veg/Non-Veg' },
          { name: 'Authentic Thali', price: 450, type: 'Veg' },
          { name: 'Seafood Special', price: 850, type: 'Non-Veg' }
        ],
        transport: [
          { mode: 'Flight', cost: 6500, time: '2h 15m' },
          { mode: 'Train', cost: 1800, time: '14h 30m' },
          { mode: 'Bus', cost: 2200, time: '16h 00m' }
        ],
        itinerary: Array.from({ length: days }).map((_, i) => ({
          day: i + 1,
          title: i === 0 ? "Arrival & Exploration" : i === days - 1 ? "Shopping & Departure" : "Major Attractions",
          description: "Experience the best of the city with our AI-curated schedule tailored to your preferences."
        }))
      });
      setLoading(false);
    }, 1500);
  }, [source, destination, days, budget]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-t-4 border-cyan-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-r-4 border-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <Sparkles className="absolute inset-0 m-auto text-cyan-400 w-8 h-8 animate-pulse" />
        </div>
        <p className="mt-6 text-cyan-400 font-medium tracking-widest uppercase text-sm animate-pulse">Analyzing Travel Data...</p>
      </div>
    );
  }

  const pieData = {
    labels: ['Travel', 'Hotel', 'Food', 'Misc'],
    datasets: [{
      data: [data.budget.breakdown.travel, data.budget.breakdown.hotel, data.budget.breakdown.food, data.budget.breakdown.misc],
      backgroundColor: ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  const barData = {
    labels: Array.from({length: days}).map((_, i) => `Day ${i+1}`),
    datasets: [{
      label: 'Daily Expense (₹)',
      data: Array.from({length: days}).map(() => Math.round(data.budget.totalCost / days)),
      backgroundColor: 'rgba(139, 92, 246, 0.8)',
      borderRadius: 6,
    }]
  };

  const cheapestTransport = [...data.transport].sort((a, b) => a.cost - b.cost)[0];

  return (
    <div className="min-h-screen bg-[#0b0f19] p-4 md:p-8 font-sans relative overflow-hidden text-slate-200">
      {/* Background Gradients */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl"
        >
          <div>
            <button onClick={() => navigate('/')} className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-2 text-sm font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Planner
            </button>
            <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">
              {source} <span className="text-cyan-500 font-light mx-2">→</span> {destination}
            </h1>
            <div className="flex flex-wrap gap-3 mt-4 text-sm font-medium">
              <span className="flex items-center gap-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-4 py-1.5 rounded-full"><Calendar className="w-4 h-4" /> {days} Days</span>
              <span className="flex items-center gap-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 px-4 py-1.5 rounded-full"><Wallet className="w-4 h-4" /> {budget} Budget</span>
            </div>
          </div>
          <div className="mt-6 md:mt-0 flex gap-3">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white font-medium">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/25">
              <Save className="w-4 h-4 mr-2" /> Save Trip
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Budget & Weather */}
          <div className="space-y-8 lg:col-span-1">
            
            {/* Budget Card */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
              <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
                <h3 className="text-cyan-300 font-medium flex items-center gap-2"><Wallet className="w-5 h-5" /> Estimated Total Cost</h3>
                <div className="text-5xl font-bold text-white mt-3 mb-6">
                  ₹<AnimatedCounter value={data.budget.totalCost} />
                </div>
                <div className="h-48 w-full flex justify-center">
                  <Pie data={pieData} options={{ plugins: { legend: { position: 'right', labels: { color: 'rgba(255,255,255,0.8)' } } }, maintainAspectRatio: false }} />
                </div>
              </div>
            </motion.div>

            {/* Weather Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                animate={{ y: [0, -8, 0] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl"
              >
                <h3 className="flex items-center gap-2 text-yellow-400 font-medium mb-4"><Sun className="w-5 h-5" /> Weather Insights</h3>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-5xl font-bold text-white">{data.weather.current.temp}°C</div>
                    <div className="text-slate-400 font-medium mt-1">{data.weather.current.condition}</div>
                  </div>
                  <div className="p-4 bg-yellow-500/20 rounded-full border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                    {data.weather.current.condition === 'Rainy' ? <CloudRain className="w-10 h-10 text-blue-400" /> : <Sun className="w-10 h-10 text-yellow-400" />}
                  </div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 text-blue-300 p-4 rounded-2xl text-sm font-medium mb-6 leading-relaxed">
                  💡 {data.weather.recommendation}
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">5-Day Forecast</h4>
                  {data.weather.forecast.map((f: any, i: number) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <span className="text-slate-300 font-medium">{f.day}</span>
                      <span className="text-slate-400 flex items-center gap-2">
                        {f.condition === 'Sunny' ? <Sun className="w-4 h-4 text-yellow-500" /> : <CloudRain className="w-4 h-4 text-blue-400" />}
                        {f.condition}
                      </span>
                      <span className="font-bold text-white">{f.temp}°C</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

          </div>

          {/* Middle Column: Itinerary & Places */}
          <div className="space-y-8 lg:col-span-2">
            
            {/* Places Grid */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
                <h3 className="flex items-center gap-2 text-pink-400 font-medium mb-6"><MapPin className="w-5 h-5" /> Top Attractions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.places.map((place: any, i: number) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -5 }}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-white text-lg leading-tight pr-2">{place.name}</h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-500/20 text-pink-300 px-2 py-1 rounded-md border border-pink-500/30 shrink-0">{place.category}</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">{place.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Transport & Food Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Transport */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl h-full">
                  <h3 className="flex items-center gap-2 text-indigo-400 font-medium mb-6"><Navigation className="w-5 h-5" /> Transport Options</h3>
                  <div className="space-y-4">
                    {data.transport.map((t: any, i: number) => {
                      const isCheapest = t.mode === cheapestTransport.mode;
                      return (
                        <motion.div 
                          key={i} 
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center justify-between p-4 rounded-2xl border ${isCheapest ? 'bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-white/5 border-white/10'}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${isCheapest ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-slate-400'}`}>
                              {t.mode === 'Flight' ? <Plane className="w-5 h-5" /> : t.mode === 'Train' ? <Train className="w-5 h-5" /> : <Bus className="w-5 h-5" />}
                            </div>
                            <div>
                              <h4 className="font-bold text-white flex items-center gap-2">
                                {t.mode}
                                {isCheapest && <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Cheapest</span>}
                              </h4>
                              <p className="text-xs text-slate-400 mt-1">{t.time}</p>
                            </div>
                          </div>
                          <div className={`font-bold text-lg ${isCheapest ? 'text-indigo-400' : 'text-slate-300'}`}>₹{t.cost}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Food */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl h-full">
                  <h3 className="flex items-center gap-2 text-orange-400 font-medium mb-6"><Utensils className="w-5 h-5" /> Local Dining</h3>
                  <div className="space-y-4">
                    {data.food.map((food: any, i: number) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10"
                      >
                        <div>
                          <h4 className="font-bold text-white">{food.name}</h4>
                          <p className="text-xs text-orange-300/70 mt-1">{food.type}</p>
                        </div>
                        <div className="font-bold text-orange-400">₹{food.price}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Itinerary & Bar Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Itinerary */}
                  <div>
                    <h3 className="flex items-center gap-2 text-green-400 font-medium mb-6"><Map className="w-5 h-5" /> Smart Itinerary</h3>
                    <div className="relative border-l-2 border-white/10 ml-3 space-y-8 pb-4">
                      {data.itinerary.map((item: any, i: number) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + (i * 0.1) }}
                          className="relative pl-6"
                        >
                          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-500 border-4 border-[#0b0f19] shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                          <h4 className="font-bold text-lg text-white">Day {item.day}: {item.title}</h4>
                          <p className="text-slate-400 mt-2 text-sm leading-relaxed">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div>
                    <h3 className="text-purple-400 font-medium mb-6">Daily Expense Projection</h3>
                    <div className="h-64 w-full">
                      <Bar data={barData} options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } }} />
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
