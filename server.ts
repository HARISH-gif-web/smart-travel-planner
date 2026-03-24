import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));
} else {
  console.log("MONGODB_URI not provided. Skipping MongoDB connection.");
}

// --- Models ---
const tripSchema = new mongoose.Schema({
  source: String,
  destination: String,
  days: Number,
  budget: String,
  totalCost: Number,
  createdAt: { type: Date, default: Date.now },
  details: mongoose.Schema.Types.Mixed
});
const Trip = mongoose.model('Trip', tripSchema);

// --- API Routes ---

// 1. SMART BUDGET ESTIMATION ENGINE
app.post("/api/plan-trip", async (req, res) => {
  try {
    const { source, destination, days, budget } = req.body;
    
    // Mocking distance calculation (in a real app, use Google Maps Distance Matrix API)
    // For India, average distance between major cities is ~500-1500km. Let's mock a random distance.
    const distanceKm = Math.floor(Math.random() * 1000) + 300; 
    
    let travelCostPerKm = 0;
    let hotelCostPerDay = 0;
    let foodCostPerDay = 0;
    
    if (budget === 'Low') {
      travelCostPerKm = 2; // Train/Bus
      hotelCostPerDay = 800;
      foodCostPerDay = 500;
    } else if (budget === 'Medium') {
      travelCostPerKm = 5; // 3AC Train / Cab
      hotelCostPerDay = 2500;
      foodCostPerDay = 1200;
    } else {
      travelCostPerKm = 10; // Flight
      hotelCostPerDay = 6000;
      foodCostPerDay = 3000;
    }
    
    const travelCost = distanceKm * travelCostPerKm * 2; // Round trip
    const hotelCost = hotelCostPerDay * days;
    const foodCost = foodCostPerDay * days;
    const miscCost = (travelCost + hotelCost + foodCost) * 0.15; // 15% misc
    
    const totalCost = travelCost + hotelCost + foodCost + miscCost;
    
    res.json({
      totalCost: Math.round(totalCost),
      breakdown: {
        travel: Math.round(travelCost),
        hotel: Math.round(hotelCost),
        food: Math.round(foodCost),
        misc: Math.round(miscCost)
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to plan trip" });
  }
});

// 2. WEATHER INTEGRATION
app.get("/api/weather", async (req, res) => {
  try {
    const { city } = req.query;
    // Mocking weather data since we don't have an API key
    const conditions = ["Sunny", "Cloudy", "Rainy", "Clear"];
    const currentCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const currentTemp = Math.floor(Math.random() * 15) + 20; // 20-35 C
    
    const forecast = Array.from({ length: 5 }).map((_, i) => ({
      day: `Day ${i + 1}`,
      temp: currentTemp + Math.floor(Math.random() * 6) - 3,
      condition: conditions[Math.floor(Math.random() * conditions.length)]
    }));
    
    let recommendation = "Great weather for travel!";
    if (currentCondition === "Rainy") recommendation = "Carry an umbrella, it might rain.";
    if (currentTemp > 32) recommendation = "It's quite hot, stay hydrated!";
    
    res.json({
      current: {
        temp: currentTemp,
        condition: currentCondition
      },
      forecast,
      recommendation
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

// 3. NEARBY PLACES MODULE
app.get("/api/places", async (req, res) => {
  try {
    const { city } = req.query;
    // Mock data for major Indian cities
    const placesMap: Record<string, any[]> = {
      "Hyderabad": [
        { name: "Charminar", category: "Historical", description: "Iconic monument and mosque." },
        { name: "Golconda Fort", category: "Historical", description: "Ruined city and fortress." },
        { name: "Hussain Sagar", category: "Lake", description: "Heart-shaped lake built in 1562." }
      ],
      "Chennai": [
        { name: "Marina Beach", category: "Beach", description: "Longest natural urban beach in India." },
        { name: "Kapaleeshwarar Temple", category: "Temple", description: "Temple of Shiva built in Dravidian architecture." },
        { name: "Fort St. George", category: "Historical", description: "First English fortress in India." }
      ],
      "Bangalore": [
        { name: "Lalbagh Botanical Garden", category: "Nature", description: "Famous botanical garden." },
        { name: "Bangalore Palace", category: "Historical", description: "Tudor-style palace." },
        { name: "Cubbon Park", category: "Nature", description: "Landmark park in the city." }
      ],
      "Goa": [
        { name: "Baga Beach", category: "Beach", description: "Popular beach and tourist destination." },
        { name: "Basilica of Bom Jesus", category: "Historical", description: "UNESCO World Heritage Site." },
        { name: "Dudhsagar Falls", category: "Nature", description: "Four-tiered waterfall." }
      ],
      "Tirupati": [
        { name: "Venkateswara Temple", category: "Temple", description: "Landmark Vaishnavite temple." },
        { name: "Sri Venkateswara National Park", category: "Nature", description: "National park and biosphere reserve." },
        { name: "Chandragiri Fort", category: "Historical", description: "Historical fort built in the 11th century." }
      ]
    };
    
    const defaultPlaces = [
      { name: "City Center", category: "Shopping", description: "Main shopping district." },
      { name: "Local Museum", category: "Historical", description: "Discover local history." },
      { name: "Central Park", category: "Nature", description: "Relaxing green space." }
    ];
    
    const places = placesMap[city as string] || defaultPlaces;
    res.json({ places });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

// 4. FOOD RECOMMENDATION SYSTEM
app.get("/api/food", async (req, res) => {
  try {
    const { budget } = req.query;
    let suggestions = [];
    
    if (budget === 'Low') {
      suggestions = [
        { name: "Local Street Food Tour", price: 150, type: "Veg/Non-Veg" },
        { name: "Dhaba Meals", price: 200, type: "Veg/Non-Veg" },
        { name: "South Indian Thali", price: 120, type: "Veg" }
      ];
    } else if (budget === 'Medium') {
      suggestions = [
        { name: "Casual Dining Restaurant", price: 800, type: "Veg/Non-Veg" },
        { name: "Biryani House", price: 400, type: "Non-Veg" },
        { name: "Cafe & Bakery", price: 500, type: "Veg/Non-Veg" }
      ];
    } else {
      suggestions = [
        { name: "5-Star Hotel Buffet", price: 2500, type: "Veg/Non-Veg" },
        { name: "Fine Dining Experience", price: 3000, type: "Veg/Non-Veg" },
        { name: "Premium Seafood Restaurant", price: 2000, type: "Non-Veg" }
      ];
    }
    
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch food suggestions" });
  }
});

// 5. TRANSPORT COMPARISON SYSTEM
app.get("/api/transport", async (req, res) => {
  try {
    const { source, destination } = req.query;
    
    // Mock transport data
    const distanceKm = Math.floor(Math.random() * 1000) + 300;
    
    const transport = [
      { mode: "Bus", cost: distanceKm * 1.5, time: `${Math.round(distanceKm / 50)} hours` },
      { mode: "Train", cost: distanceKm * 2, time: `${Math.round(distanceKm / 70)} hours` },
      { mode: "Flight", cost: distanceKm * 8, time: `${Math.max(1, Math.round(distanceKm / 500))} hours` }
    ];
    
    res.json({ transport });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transport options" });
  }
});

// 6. DAY-WISE ITINERARY GENERATOR
app.get("/api/itinerary", async (req, res) => {
  try {
    const { days, city } = req.query;
    const numDays = parseInt(days as string) || 3;
    
    const itinerary = [];
    for (let i = 1; i <= numDays; i++) {
      if (i === 1) {
        itinerary.push({ day: i, title: "Arrival & Local Exploration", description: `Arrive at ${city}, check-in to hotel, and explore nearby local markets.` });
      } else if (i === numDays) {
        itinerary.push({ day: i, title: "Shopping & Departure", description: "Buy souvenirs, enjoy a final local meal, and head to the airport/station." });
      } else {
        itinerary.push({ day: i, title: "Major Attractions", description: `Visit the top tourist spots in ${city}. Enjoy local cuisine for lunch.` });
      }
    }
    
    res.json({ itinerary });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

// 11. SAVE AND SHARE FEATURE
app.post("/api/save-trip", async (req, res) => {
  try {
    if (!MONGODB_URI) {
      return res.status(400).json({ error: "MongoDB not configured. Cannot save trip." });
    }
    
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.json({ success: true, tripId: newTrip._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to save trip" });
  }
});

app.get("/api/trips", async (req, res) => {
  try {
    if (!MONGODB_URI) {
      return res.json({ trips: [] });
    }
    const trips = await Trip.find().sort({ createdAt: -1 }).limit(10);
    res.json({ trips });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trips" });
  }
});

// --- Vite Middleware ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
