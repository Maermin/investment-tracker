const { useState, useEffect } = React;

// Translation object for multi-language support
const translations = {
  de: {
    title: 'Investment Tracker', portfolio: 'Portfolio', statistics: 'Statistiken',
    crypto: 'Krypto', stocks: 'Aktien', cs2Items: 'CS2 Items', apiKeys: 'API-Keys',
    export: 'Export', import: 'Import', refresh: 'Aktualisieren', loading: 'Lädt...',
    totalValue: 'Gesamtwert Portfolio', invested: 'Investiert', profitLoss: 'Gewinn/Verlust',
    position: 'Position', positions: 'Positionen', addNew: 'Neue Position hinzufügen',
    symbol: 'Symbol', amount: 'Menge', purchasePrice: 'Einkaufspreis', purchaseDate: 'Kaufdatum',
    add: 'Hinzufügen', perUnit: '/ Stück', bought: 'Gekauft', current: 'Aktuell',
    ofPortfolio: 'des Portfolios', noPositions: 'Keine Positionen vorhanden. Füge deine erste Position hinzu!',
    noPositionsCategory: 'Keine Positionen in dieser Kategorie', distribution: 'Portfolio-Verteilung',
    visualDistribution: 'Visuelle Verteilung', total: 'Gesamt', details: 'Details',
    apiSettings: 'API-Schlüssel Einstellungen', alphaVantageKey: 'Alpha Vantage API-Key (für Aktien):',
    getKeyFree: '→ Kostenlosen API-Key erhalten', save: 'Speichern', cancel: 'Abbrechen',
    fillRequired: 'Bitte fülle alle Pflichtfelder aus!', theme: 'Design', language: 'Sprache',
    whiteMode: 'Hell', darkMode: 'Dunkel', purpleMode: 'Lila', performanceChart: 'Portfolio-Performance',
    assetPerformance: 'Asset-Performance', currency: 'Währung', exchangeRate: 'Wechselkurs',
    edit: 'Bearbeiten', delete: 'Löschen', topPerformers: 'Top-Performer', worstPerformers: 'Schlechteste Performer',
    roi: 'ROI', diversification: 'Diversifikation', averageReturn: 'Durchschn. Rendite',
    totalAssets: 'Gesamt Assets', portfolioHealth: 'Portfolio-Gesundheit', riskLevel: 'Risikolevel',
    holdingPeriod: 'Haltedauer', days: 'Tage', insights: 'Einblicke', recommendations: 'Empfehlungen',
    highRisk: 'Hohes Risiko', mediumRisk: 'Mittleres Risiko', lowRisk: 'Geringes Risiko',
    excellent: 'Ausgezeichnet', good: 'Gut', fair: 'Durchschnittlich', poor: 'Schlecht',
    concentration: 'Konzentration', balanced: 'Ausgewogen', diversified: 'Diversifiziert',
    highlyConcentrated: 'Stark konzentriert'
  },
  en: {
    title: 'Investment Tracker', portfolio: 'Portfolio', statistics: 'Statistics',
    crypto: 'Crypto', stocks: 'Stocks', cs2Items: 'CS2 Items', apiKeys: 'API Keys',
    export: 'Export', import: 'Import', refresh: 'Refresh', loading: 'Loading...',
    totalValue: 'Total Portfolio Value', invested: 'Invested', profitLoss: 'Profit/Loss',
    position: 'Position', positions: 'Positions', addNew: 'Add New Position',
    symbol: 'Symbol', amount: 'Amount', purchasePrice: 'Purchase Price', purchaseDate: 'Purchase Date',
    add: 'Add', perUnit: '/ Unit', bought: 'Bought', current: 'Current',
    ofPortfolio: 'of Portfolio', noPositions: 'No positions yet. Add your first position!',
    noPositionsCategory: 'No positions in this category', distribution: 'Portfolio Distribution',
    visualDistribution: 'Visual Distribution', total: 'Total', details: 'Details',
    apiSettings: 'API Key Settings', alphaVantageKey: 'Alpha Vantage API Key (for Stocks):',
    getKeyFree: '→ Get Free API Key', save: 'Save', cancel: 'Cancel',
    fillRequired: 'Please fill in all required fields!', theme: 'Theme', language: 'Language',
    whiteMode: 'Light', darkMode: 'Dark', purpleMode: 'Purple', performanceChart: 'Portfolio Performance',
    assetPerformance: 'Asset Performance', currency: 'Currency', exchangeRate: 'Exchange Rate',
    edit: 'Edit', delete: 'Delete', topPerformers: 'Top Performers', worstPerformers: 'Worst Performers',
    roi: 'ROI', diversification: 'Diversification', averageReturn: 'Avg. Return',
    totalAssets: 'Total Assets', portfolioHealth: 'Portfolio Health', riskLevel: 'Risk Level',
    holdingPeriod: 'Holding Period', days: 'days', insights: 'Insights', recommendations: 'Recommendations',
    highRisk: 'High Risk', mediumRisk: 'Medium Risk', lowRisk: 'Low Risk',
    excellent: 'Excellent', good: 'Good', fair: 'Fair', poor: 'Poor',
    concentration: 'Concentration', balanced: 'Balanced', diversified: 'Diversified',
    highlyConcentrated: 'Highly Concentrated'
  }
};

// Theme configurations for different color schemes
const themes = {
  white: { 
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%)', 
    card: 'rgba(255,255,255,0.9)', 
    cardBorder: 'rgba(0,0,0,0.1)', 
    text: '#1e293b', 
    textSecondary: '#64748b', 
    inputBg: 'rgba(0,0,0,0.05)', 
    inputBorder: 'rgba(0,0,0,0.1)' 
  },
  dark: { 
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', 
    card: 'rgba(30,41,59,0.9)', 
    cardBorder: 'rgba(255,255,255,0.1)', 
    text: '#f8fafc', 
    textSecondary: '#94a3b8', 
    inputBg: 'rgba(255,255,255,0.05)', 
    inputBorder: 'rgba(255,255,255,0.1)' 
  },
  purple: { 
    background: 'linear-gradient(135deg, #1e293b 0%, #7e22ce 50%, #1e293b 100%)', 
    card: 'rgba(255,255,255,0.1)', 
    cardBorder: 'rgba(255,255,255,0.2)', 
    text: '#ffffff', 
    textSecondary: 'rgba(255,255,255,0.6)', 
    inputBg: 'rgba(255,255,255,0.1)', 
    inputBorder: 'rgba(255,255,255,0.2)' 
  }
};

function InvestmentTracker() {
  // State management for portfolio data
  const [portfolio, setPortfolio] = useState({ crypto: [], stocks: [], skins: [] });
  const [prices, setPrices] = useState({});
  const [images, setImages] = useState({});
  const [priceHistory, setPriceHistory] = useState({});
  const [loading, setLoading] = useState(false);
  
  // UI state management
  const [activeTab, setActiveTab] = useState('crypto');
  const [activeView, setActiveView] = useState('portfolio');
  const [theme, setTheme] = useState('purple');
  const [language, setLanguage] = useState('de');
  const [currency, setCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(1.1);
  
  // Form and settings state
  const [newItem, setNewItem] = useState({ 
    symbol: '', 
    amount: '', 
    purchasePrice: '', 
    purchaseDate: new Date().toISOString().split('T')[0] 
  });
  const [apiKeys, setApiKeys] = useState({ alphaVantage: '', steamApi: '' });
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const t = translations[language];
  const currentTheme = themes[theme];

  // Helper function to format prices with proper locale
  const formatPrice = (price) => {
    const converted = currency === 'USD' ? price * exchangeRate : price;
    return converted.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getCurrencySymbol = () => currency === 'EUR' ? '€' : '$';
  const getPositionText = (count) => count === 1 ? t.position : t.positions;

  // Fetch current EUR to USD exchange rate
  const fetchExchangeRate = async () => {
    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
      const data = await res.json();
      if (data.rates && data.rates.USD) setExchangeRate(data.rates.USD);
    } catch (err) {
      console.error('Exchange rate error:', err);
      setExchangeRate(1.1); // Fallback rate
    }
  };

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const saved = (key) => localStorage.getItem(key);
    if (saved('theme')) setTheme(saved('theme'));
    if (saved('language')) setLanguage(saved('language'));
    if (saved('currency')) setCurrency(saved('currency'));
    if (saved('apiKeys')) setApiKeys(JSON.parse(saved('apiKeys')));
    if (saved('portfolio')) setPortfolio(JSON.parse(saved('portfolio')));
    if (saved('priceHistory')) setPriceHistory(JSON.parse(saved('priceHistory')));
    if (saved('images')) setImages(JSON.parse(saved('images')));
    fetchExchangeRate();
  }, []);

  // Persist state changes to localStorage
  useEffect(() => { localStorage.setItem('theme', theme); }, [theme]);
  useEffect(() => { localStorage.setItem('language', language); }, [language]);
  useEffect(() => { localStorage.setItem('currency', currency); }, [currency]);
  useEffect(() => { localStorage.setItem('portfolio', JSON.stringify(portfolio)); }, [portfolio]);
  useEffect(() => { localStorage.setItem('priceHistory', JSON.stringify(priceHistory)); }, [priceHistory]);
  useEffect(() => { localStorage.setItem('images', JSON.stringify(images)); }, [images]);

  // Save API keys to localStorage
  const saveApiKeys = () => {
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
    setShowApiSettings(false);
    alert(language === 'de' ? 'API-Keys gespeichert!' : 'API Keys saved!');
  };

  // Fetch current prices from various APIs
  const fetchPrices = async () => {
    setLoading(true);
    const newPrices = {}, newHistory = {...priceHistory}, newImages = {...images};
    
    try {
      // Fetch cryptocurrency prices from CoinGecko
      if (portfolio.crypto && portfolio.crypto.length > 0) {
        const ids = portfolio.crypto.map(c => c.symbol.toLowerCase()).join(',');
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur`);
        const data = await res.json();
        
        // Fetch coin images
        for (const coin of portfolio.crypto) {
          const id = coin.symbol.toLowerCase();
          if (!newImages[id]) {
            try {
              const info = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false`);
              const coinInfo = await info.json();
              if (coinInfo.image?.small) newImages[id] = coinInfo.image.small;
            } catch (e) {}
          }
        }
        
        // Store prices and history
        Object.keys(data).forEach(id => {
          newPrices[id] = data[id].eur;
          if (!newHistory[id]) newHistory[id] = [];
          const now = new Date();
          const day = String(now.getDate()).padStart(2, '0');
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const hour = String(now.getHours()).padStart(2, '0');
          const minute = String(now.getMinutes()).padStart(2, '0');
          const timestamp = language === 'de' ? `${day}/${month} ${hour}:${minute}` : `${month}/${day} ${hour}:${minute}`;
          
          newHistory[id].push({ 
            timestamp: timestamp, 
            price: data[id].eur 
          });
          if (newHistory[id].length > 20) newHistory[id] = newHistory[id].slice(-20);
        });
      }
      
      // Fetch stock prices from Alpha Vantage
      if (portfolio.stocks && portfolio.stocks.length > 0) {
        if (apiKeys.alphaVantage) {
          for (const stock of portfolio.stocks) {
            try {
              const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${apiKeys.alphaVantage}`);
              const data = await res.json();
              if (data['Global Quote']?.['05. price']) {
                const usd = parseFloat(data['Global Quote']['05. price']);
                const eur = usd / exchangeRate;
                newPrices[stock.symbol] = eur;
                if (!newHistory[stock.symbol]) newHistory[stock.symbol] = [];
                
                const now = new Date();
                const day = String(now.getDate()).padStart(2, '0');
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const hour = String(now.getHours()).padStart(2, '0');
                const minute = String(now.getMinutes()).padStart(2, '0');
                const timestamp = language === 'de' ? `${day}/${month} ${hour}:${minute}` : `${month}/${day} ${hour}:${minute}`;
                
                newHistory[stock.symbol].push({ 
                  timestamp: timestamp, 
                  price: eur 
                });
                if (newHistory[stock.symbol].length > 20) newHistory[stock.symbol] = newHistory[stock.symbol].slice(-20);
              }
              if (!newImages[stock.symbol]) newImages[stock.symbol] = `https://logo.clearbit.com/${stock.symbol.toLowerCase()}.com`;
              await new Promise(r => setTimeout(r, 12000)); // Rate limiting
            } catch (e) {}
          }
        } else {
          // Use mock data if no API key is provided
          portfolio.stocks.forEach(s => {
            const last = prices[s.symbol] || Math.random() * 200 + 50;
            newPrices[s.symbol] = Math.max(10, last + (Math.random() - 0.5) * 10);
            if (!newHistory[s.symbol]) newHistory[s.symbol] = [];
            
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const hour = String(now.getHours()).padStart(2, '0');
            const minute = String(now.getMinutes()).padStart(2, '0');
            const timestamp = language === 'de' ? `${day}/${month} ${hour}:${minute}` : `${month}/${day} ${hour}:${minute}`;
            
            newHistory[s.symbol].push({ 
              timestamp: timestamp, 
              price: newPrices[s.symbol] 
            });
            if (newHistory[s.symbol].length > 20) newHistory[s.symbol] = newHistory[s.symbol].slice(-20);
            if (!newImages[s.symbol]) newImages[s.symbol] = `https://logo.clearbit.com/${s.symbol.toLowerCase()}.com`;
          });
        }
      }
      
      // Fetch CS2 skin prices from Steam Market
      if (portfolio.skins && portfolio.skins.length > 0) {
        for (const skin of portfolio.skins) {
          try {
            const res = await fetch(`https://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=${encodeURIComponent(skin.symbol)}`);
            const data = await res.json();
            if (data.success && data.median_price) {
              const price = parseFloat(data.median_price.replace('€', '').replace(',', '.'));
              newPrices[skin.symbol] = price;
              if (!newHistory[skin.symbol]) newHistory[skin.symbol] = [];
              
              const now = new Date();
              const day = String(now.getDate()).padStart(2, '0');
              const month = String(now.getMonth() + 1).padStart(2, '0');
              const hour = String(now.getHours()).padStart(2, '0');
              const minute = String(now.getMinutes()).padStart(2, '0');
              const timestamp = language === 'de' ? `${day}/${month} ${hour}:${minute}` : `${month}/${day} ${hour}:${minute}`;
              
              newHistory[skin.symbol].push({ 
                timestamp: timestamp, 
                price 
              });
              if (newHistory[skin.symbol].length > 20) newHistory[skin.symbol] = newHistory[skin.symbol].slice(-20);
            }
            await new Promise(r => setTimeout(r, 2000)); // Rate limiting
          } catch (e) {}
        }
      }
      
      setPrices(newPrices);
      setPriceHistory(newHistory);
      setImages(newImages);
    } catch (e) {}
    setLoading(false);
  };

  // Auto-fetch prices when portfolio changes
  useEffect(() => {
    if ((portfolio.crypto && portfolio.crypto.length > 0) || 
        (portfolio.stocks && portfolio.stocks.length > 0) || 
        (portfolio.skins && portfolio.skins.length > 0)) {
      fetchPrices();
    }
  }, [portfolio]);

  // Add new investment item
  const addItem = () => {
    if (!newItem.symbol || !newItem.amount || !newItem.purchasePrice) return alert(t.fillRequired);
    setPortfolio(p => ({ 
      ...p, 
      [activeTab]: [...(p[activeTab] || []), { 
        id: Date.now(), 
        ...newItem, 
        amount: parseFloat(newItem.amount), 
        purchasePrice: parseFloat(newItem.purchasePrice) 
      }] 
    }));
    setNewItem({ symbol: '', amount: '', purchasePrice: '', purchaseDate: new Date().toISOString().split('T')[0] });
  };

  // Remove investment item
  const removeItem = (id) => setPortfolio(p => ({ 
    ...p, 
    [activeTab]: (p[activeTab] || []).filter(i => i.id !== id) 
  }));

  // Start editing an item
  const startEdit = (item) => {
    setEditingItem({ ...item, purchaseDate: item.purchaseDate || new Date().toISOString().split('T')[0] });
  };

  // Save edited item
  const saveEdit = () => {
    if (!editingItem) return;
    setPortfolio(p => ({
      ...p,
      [activeTab]: (p[activeTab] || []).map(i => i.id === editingItem.id ? {
        ...editingItem,
        amount: parseFloat(editingItem.amount),
        purchasePrice: parseFloat(editingItem.purchasePrice)
      } : i)
    }));
    setEditingItem(null);
  };

  const cancelEdit = () => setEditingItem(null);

  // Export portfolio data to JSON file
  const exportData = () => {
    const blob = new Blob([JSON.stringify({ 
      portfolio, 
      priceHistory, 
      images, 
      exportDate: new Date().toISOString() 
    }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  // Import portfolio data from JSON file
  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        setPortfolio(data.portfolio || { crypto: [], stocks: [], skins: [] });
        setPriceHistory(data.priceHistory || {});
        setImages(data.images || {});
        alert(language === 'de' ? 'Daten erfolgreich importiert!' : 'Data imported successfully!');
      } catch (e) { alert(language === 'de' ? 'Fehler beim Importieren!' : 'Import error!'); }
    };
    reader.readAsText(file);
  };

  // Tab configuration
  const tabs = [
    { id: 'crypto', label: t.crypto, placeholder: language === 'de' ? 'z.B. bitcoin, ethereum' : 'e.g. bitcoin, ethereum' },
    { id: 'stocks', label: t.stocks, placeholder: language === 'de' ? 'z.B. AAPL, MSFT' : 'e.g. AAPL, MSFT' },
    { id: 'skins', label: t.cs2Items, placeholder: language === 'de' ? 'z.B. AK-47 | Redline' : 'e.g. AK-47 | Redline' }
  ];

  // Safe portfolio access with fallback to empty arrays
  const safe = { 
    crypto: portfolio.crypto || [], 
    stocks: portfolio.stocks || [], 
    skins: portfolio.skins || [] 
  };
  
  // Calculate total value for a category
  const calcTotal = (cat) => (safe[cat] || []).reduce((s, i) => 
    s + ((prices[i.symbol.toLowerCase()] || prices[i.symbol] || 0) * i.amount), 0
  );
  
  // Calculate total invested for a category
  const calcInvest = (cat) => (safe[cat] || []).reduce((s, i) => 
    s + ((i.purchasePrice || 0) * i.amount), 0
  );
  
  // Calculate profit/loss for a category
  const calcProfit = (cat) => calcTotal(cat) - calcInvest(cat);
  
  // Portfolio-wide calculations
  const total = calcTotal('crypto') + calcTotal('stocks') + calcTotal('skins');
  const invest = calcInvest('crypto') + calcInvest('stocks') + calcInvest('skins');
  const profit = total - invest;
  const profitPct = invest > 0 ? (profit / invest) * 100 : 0;
  
  // Calculate percentage of total for a category
  const getPct = (cat) => total === 0 ? 0 : ((calcTotal(cat) / total) * 100).toFixed(1);
  
  // Format date for display based on language
  const fmtDate = (d) => {
    const date = new Date(d);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    // German: DD/MM/YYYY, English: MM/DD/YYYY
    return language === 'de' ? `${day}/${month}/${year}` : `${month}/${day}/${year}`;
  };
  
  // Calculate days since purchase
  const getDaysSincePurchase = (purchaseDate) => {
    const today = new Date();
    const purchase = new Date(purchaseDate);
    const diffTime = Math.abs(today - purchase);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // ============= ADVANCED STATISTICS CALCULATIONS =============
  
  // Get all assets across all categories with their performance metrics
  const getAllAssets = () => {
    const allAssets = [];
    ['crypto', 'stocks', 'skins'].forEach(cat => {
      safe[cat].forEach(item => {
        const curr = prices[item.symbol.toLowerCase()] || prices[item.symbol] || 0;
        const val = curr * item.amount;
        const inv = (item.purchasePrice || 0) * item.amount;
        const prof = val - inv;
        const profPct = inv > 0 ? (prof / inv) * 100 : 0;
        const daysSince = getDaysSincePurchase(item.purchaseDate);
        
        allAssets.push({
          ...item,
          category: cat,
          currentPrice: curr,
          value: val,
          invested: inv,
          profit: prof,
          profitPct: profPct,
          holdingDays: daysSince,
          percentOfPortfolio: total > 0 ? (val / total) * 100 : 0
        });
      });
    });
    return allAssets;
  };

  // Get top performers sorted by profit percentage
  const getTopPerformers = (limit = 5) => {
    return getAllAssets()
      .filter(a => a.invested > 0)
      .sort((a, b) => b.profitPct - a.profitPct)
      .slice(0, limit);
  };

  // Get worst performers sorted by profit percentage
  const getWorstPerformers = (limit = 5) => {
    return getAllAssets()
      .filter(a => a.invested > 0)
      .sort((a, b) => a.profitPct - b.profitPct)
      .slice(0, limit);
  };

  // Calculate portfolio diversification score (0-100)
  const getDiversificationScore = () => {
    const assets = getAllAssets();
    if (assets.length === 0) return 0;
    
    // Calculate Herfindahl-Hirschman Index (HHI)
    const hhi = assets.reduce((sum, asset) => {
      const share = asset.percentOfPortfolio;
      return sum + (share * share);
    }, 0);
    
    // Convert HHI to diversification score (inverted and normalized to 0-100)
    // HHI ranges from 0 (perfect diversification) to 10000 (complete concentration)
    const diversificationScore = Math.max(0, 100 - (hhi / 100));
    return diversificationScore.toFixed(0);
  };

  // Calculate average return across all assets
  const getAverageReturn = () => {
    const assets = getAllAssets().filter(a => a.invested > 0);
    if (assets.length === 0) return 0;
    
    const totalReturn = assets.reduce((sum, a) => sum + a.profitPct, 0);
    return (totalReturn / assets.length).toFixed(2);
  };

  // Assess portfolio risk level based on volatility and concentration
  const getRiskLevel = () => {
    const divScore = parseFloat(getDiversificationScore());
    const avgReturn = parseFloat(getAverageReturn());
    
    // Simple risk assessment based on diversification and returns
    if (divScore < 30 || Math.abs(avgReturn) > 50) return t.highRisk;
    if (divScore < 60 || Math.abs(avgReturn) > 25) return t.mediumRisk;
    return t.lowRisk;
  };

  // Get portfolio health rating
  const getPortfolioHealth = () => {
    const divScore = parseFloat(getDiversificationScore());
    const avgReturn = parseFloat(getAverageReturn());
    const profitableAssets = getAllAssets().filter(a => a.profit > 0).length;
    const totalAssets = getAllAssets().length;
    const profitableRatio = totalAssets > 0 ? (profitableAssets / totalAssets) * 100 : 0;
    
    // Health score considers diversification, returns, and profitable asset ratio
    const healthScore = (divScore * 0.3) + ((avgReturn + 50) * 0.4) + (profitableRatio * 0.3);
    
    if (healthScore >= 75) return { rating: t.excellent, color: '#10b981' };
    if (healthScore >= 60) return { rating: t.good, color: '#3b82f6' };
    if (healthScore >= 40) return { rating: t.fair, color: '#f59e0b' };
    return { rating: t.poor, color: '#ef4444' };
  };

  // Get concentration rating
  const getConcentration = () => {
    const divScore = parseFloat(getDiversificationScore());
    
    if (divScore >= 70) return t.diversified;
    if (divScore >= 40) return t.balanced;
    return t.highlyConcentrated;
  };

  // Get largest position
  const getLargestPosition = () => {
    const assets = getAllAssets();
    if (assets.length === 0) return null;
    return assets.reduce((max, asset) => asset.value > max.value ? asset : max, assets[0]);
  };

  // Calculate total asset count
  const getTotalAssetCount = () => {
    return getAllAssets().length;
  };

  return React.createElement('div', { style: { minHeight: '100vh', background: currentTheme.background, padding: '2rem' } },
    React.createElement('div', { style: { maxWidth: '1400px', margin: '0 auto' } },
      React.createElement('div', { style: { background: currentTheme.card, backdropFilter: 'blur(10px)', borderRadius: '1rem', padding: '2rem', border: `1px solid ${currentTheme.cardBorder}` } },
        
        // Header with title and action buttons
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' } },
          React.createElement('h1', { style: { fontSize: '2.5rem', fontWeight: 'bold', color: currentTheme.text } }, t.title),
          React.createElement('div', { style: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap' } },
            React.createElement('button', { onClick: () => setShowSettings(!showSettings), style: { padding: '0.5rem 1rem', background: '#9333ea', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' } }, '⚙️'),
            React.createElement('button', { onClick: () => setShowApiSettings(!showApiSettings), style: { padding: '0.5rem 1rem', background: '#ca8a04', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' } }, '🔑'),
            React.createElement('button', { onClick: exportData, style: { padding: '0.5rem 1rem', background: '#16a34a', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' } }, '📥'),
            React.createElement('label', { style: { padding: '0.5rem 1rem', background: '#9333ea', color: 'white', borderRadius: '0.5rem', cursor: 'pointer' } }, '📤', React.createElement('input', { type: 'file', accept: '.json', onChange: importData, style: { display: 'none' } })),
            React.createElement('button', { onClick: fetchPrices, disabled: loading, style: { padding: '0.5rem 1rem', background: '#2563eb', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1 } }, loading ? '🔄...' : '🔄')
          )
        ),

        // Settings panel
        showSettings && React.createElement('div', { style: { background: currentTheme.inputBg, borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', border: `2px solid ${currentTheme.inputBorder}` } },
          React.createElement('h3', { style: { color: currentTheme.text, marginBottom: '1rem' } }, '⚙️ ' + (language === 'de' ? 'Einstellungen' : 'Settings')),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' } },
            React.createElement('div', {},
              React.createElement('label', { style: { color: currentTheme.text, display: 'block', marginBottom: '0.5rem', fontWeight: '600' } }, t.theme + ':'),
              React.createElement('div', { style: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' } },
                ['white', 'dark', 'purple'].map(th => React.createElement('button', { key: th, onClick: () => setTheme(th), style: { padding: '0.5rem 1rem', background: theme === th ? '#3b82f6' : currentTheme.inputBg, color: theme === th ? 'white' : currentTheme.text, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', cursor: 'pointer' } }, th === 'white' ? '☀️' : th === 'dark' ? '🌙' : '💜'))
              )
            ),
            React.createElement('div', {},
              React.createElement('label', { style: { color: currentTheme.text, display: 'block', marginBottom: '0.5rem', fontWeight: '600' } }, t.language + ':'),
              React.createElement('div', { style: { display: 'flex', gap: '0.5rem' } },
                React.createElement('button', { onClick: () => setLanguage('de'), style: { padding: '0.5rem 1rem', background: language === 'de' ? '#3b82f6' : currentTheme.inputBg, color: language === 'de' ? 'white' : currentTheme.text, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', cursor: 'pointer' } }, 'DE'),
                React.createElement('button', { onClick: () => setLanguage('en'), style: { padding: '0.5rem 1rem', background: language === 'en' ? '#3b82f6' : currentTheme.inputBg, color: language === 'en' ? 'white' : currentTheme.text, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', cursor: 'pointer' } }, 'EN')
              )
            ),
            React.createElement('div', {},
              React.createElement('label', { style: { color: currentTheme.text, display: 'block', marginBottom: '0.5rem', fontWeight: '600' } }, t.currency + ':'),
              React.createElement('div', { style: { display: 'flex', gap: '0.5rem' } },
                React.createElement('button', { onClick: () => setCurrency('EUR'), style: { padding: '0.5rem 1rem', background: currency === 'EUR' ? '#3b82f6' : currentTheme.inputBg, color: currency === 'EUR' ? 'white' : currentTheme.text, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', cursor: 'pointer' } }, '💶'),
                React.createElement('button', { onClick: () => setCurrency('USD'), style: { padding: '0.5rem 1rem', background: currency === 'USD' ? '#3b82f6' : currentTheme.inputBg, color: currency === 'USD' ? 'white' : currentTheme.text, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', cursor: 'pointer' } }, '💵')
              ),
              currency === 'USD' && React.createElement('div', { style: { fontSize: '0.75rem', color: currentTheme.textSecondary, marginTop: '0.5rem' } }, `1 EUR = ${exchangeRate.toFixed(4)} USD`)
            )
          ),
          React.createElement('button', { onClick: () => setShowSettings(false), style: { padding: '0.5rem 1.5rem', background: '#4b5563', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' } }, t.cancel)
        ),

        // API Settings panel
        showApiSettings && React.createElement('div', { style: { background: currentTheme.inputBg, borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', border: `2px solid rgba(234,179,8,0.5)` } },
          React.createElement('h3', { style: { color: currentTheme.text, marginBottom: '1rem' } }, '🔑 ' + t.apiSettings),
          React.createElement('label', { style: { color: currentTheme.text, display: 'block', marginBottom: '0.5rem' } }, t.alphaVantageKey),
          React.createElement('input', { type: 'text', value: apiKeys.alphaVantage, onChange: (e) => setApiKeys({...apiKeys, alphaVantage: e.target.value}), style: { width: '100%', padding: '0.5rem', background: currentTheme.inputBg, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', color: currentTheme.text, marginBottom: '1rem' } }),
          React.createElement('div', { style: { display: 'flex', gap: '0.75rem' } },
            React.createElement('button', { onClick: saveApiKeys, style: { padding: '0.5rem 1.5rem', background: '#16a34a', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' } }, t.save),
            React.createElement('button', { onClick: () => setShowApiSettings(false), style: { padding: '0.5rem 1.5rem', background: '#4b5563', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' } }, t.cancel)
          )
        ),

        // View toggle buttons (Portfolio / Statistics)
        React.createElement('div', { style: { display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' } },
          React.createElement('button', { onClick: () => setActiveView('portfolio'), style: { padding: '0.75rem 1.5rem', background: activeView === 'portfolio' ? '#3b82f6' : currentTheme.inputBg, color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600' } }, t.portfolio),
          React.createElement('button', { onClick: () => setActiveView('charts'), style: { padding: '0.75rem 1.5rem', background: activeView === 'charts' ? '#3b82f6' : currentTheme.inputBg, color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600' } }, t.statistics)
        ),

        // ============= PORTFOLIO VIEW =============
        activeView === 'portfolio' && React.createElement('div', {},
          // Main portfolio summary card
          React.createElement('div', { style: { background: 'linear-gradient(90deg, #f97316, #ec4899)', borderRadius: '1rem', padding: '1.5rem', color: 'white', marginBottom: '2rem' } },
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' } },
              React.createElement('div', {}, 
                React.createElement('div', { style: { fontSize: '0.875rem', opacity: 0.9 } }, t.totalValue), 
                React.createElement('div', { style: { fontSize: '2.5rem', fontWeight: 'bold' } }, getCurrencySymbol() + formatPrice(total))
              ),
              React.createElement('div', {}, 
                React.createElement('div', { style: { fontSize: '0.875rem', opacity: 0.9 } }, t.invested), 
                React.createElement('div', { style: { fontSize: '2rem', fontWeight: 'bold' } }, getCurrencySymbol() + formatPrice(invest))
              ),
              React.createElement('div', {}, 
                React.createElement('div', { style: { fontSize: '0.875rem', opacity: 0.9 } }, t.profitLoss), 
                React.createElement('div', { style: { fontSize: '2rem', fontWeight: 'bold', color: profit >= 0 ? '#10b981' : '#ef4444' } }, (profit >= 0 ? '+' : '') + getCurrencySymbol() + formatPrice(Math.abs(profit))), 
                React.createElement('div', { style: { fontSize: '1rem', opacity: 0.9 } }, `(${profitPct >= 0 ? '+' : ''}${formatPrice(profitPct)}%)`)
              )
            )
          ),

          // Category summary cards
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' } },
            [['crypto', '#3b82f6', '#2563eb'], ['stocks', '#10b981', '#059669'], ['skins', '#8b5cf6', '#7c3aed']].map(([cat, c1, c2]) => {
              const catProfit = calcProfit(cat);
              const catInvest = calcInvest(cat);
              const catProfitPct = catInvest > 0 ? (catProfit / catInvest) * 100 : 0;
              return React.createElement('div', { key: cat, style: { background: `linear-gradient(135deg, ${c1}, ${c2})`, borderRadius: '1rem', padding: '1.5rem', color: 'white' } },
                React.createElement('div', { style: { fontSize: '0.875rem', opacity: 0.8 } }, t[cat === 'skins' ? 'cs2Items' : cat]),
                React.createElement('div', { style: { fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' } }, getCurrencySymbol() + formatPrice(calcTotal(cat))),
                React.createElement('div', { style: { fontSize: '0.875rem', opacity: 0.8 } }, safe[cat].length + ' ' + getPositionText(safe[cat].length)),
                React.createElement('div', { style: { fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '600', color: catProfit >= 0 ? '#86efac' : '#fca5a5' } }, (catProfit >= 0 ? '▲ +' : '▼ ') + getCurrencySymbol() + formatPrice(Math.abs(catProfit)) + ` (${catProfitPct >= 0 ? '+' : ''}${formatPrice(catProfitPct)}%)`)
              );
            })
          ),

          // Category tabs
          React.createElement('div', { style: { display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' } },
            tabs.map(tab => React.createElement('button', { 
              key: tab.id, 
              onClick: () => setActiveTab(tab.id), 
              style: { 
                padding: '0.75rem 1.5rem', 
                background: activeTab === tab.id ? '#3b82f6' : currentTheme.inputBg, 
                color: 'white', 
                borderRadius: '0.5rem', 
                border: 'none', 
                cursor: 'pointer', 
                fontWeight: '600' 
              } 
            }, tab.label))
          ),

          // Add new position form
          React.createElement('div', { style: { background: currentTheme.inputBg, borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' } },
            React.createElement('h3', { style: { color: currentTheme.text, fontWeight: '600', marginBottom: '1rem' } }, t.addNew),
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', alignItems: 'end' } },
              React.createElement('div', {}, 
                React.createElement('label', { style: { color: currentTheme.text, fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' } }, t.symbol + ' *'), 
                React.createElement('input', { 
                  type: 'text', 
                  placeholder: tabs.find(t => t.id === activeTab)?.placeholder, 
                  value: newItem.symbol, 
                  onChange: (e) => setNewItem({...newItem, symbol: e.target.value}), 
                  style: { width: '100%', padding: '0.5rem', background: currentTheme.inputBg, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', color: currentTheme.text } 
                })
              ),
              React.createElement('div', {}, 
                React.createElement('label', { style: { color: currentTheme.text, fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' } }, t.amount + ' *'), 
                React.createElement('input', { 
                  type: 'number', 
                  step: '0.001', 
                  value: newItem.amount, 
                  onChange: (e) => setNewItem({...newItem, amount: e.target.value}), 
                  style: { width: '100%', padding: '0.5rem', background: currentTheme.inputBg, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', color: currentTheme.text } 
                })
              ),
              React.createElement('div', {}, 
                React.createElement('label', { style: { color: currentTheme.text, fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' } }, t.purchasePrice + ' *'), 
                React.createElement('input', { 
                  type: 'number', 
                  step: '0.01', 
                  value: newItem.purchasePrice, 
                  onChange: (e) => setNewItem({...newItem, purchasePrice: e.target.value}), 
                  style: { width: '100%', padding: '0.5rem', background: currentTheme.inputBg, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', color: currentTheme.text } 
                })
              ),
              React.createElement('div', {}, 
                React.createElement('label', { style: { color: currentTheme.text, fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' } }, t.purchaseDate), 
                React.createElement('input', { 
                  type: 'date', 
                  value: newItem.purchaseDate, 
                  onChange: (e) => setNewItem({...newItem, purchaseDate: e.target.value}), 
                  style: { width: '100%', padding: '0.5rem', background: currentTheme.inputBg, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', color: currentTheme.text } 
                })
              ),
              React.createElement('button', { 
                onClick: addItem, 
                style: { 
                  padding: '0.5rem 1.5rem', 
                  background: '#16a34a', 
                  color: 'white', 
                  borderRadius: '0.5rem', 
                  border: 'none', 
                  cursor: 'pointer', 
                  height: '40px' 
                } 
              }, '➕ ' + t.add)
            )
          ),

          // Position list
          React.createElement('div', {},
            safe[activeTab].length === 0 ? 
              React.createElement('div', { style: { textAlign: 'center', padding: '3rem', color: currentTheme.textSecondary } }, t.noPositions) :
              safe[activeTab].map(item => {
                const curr = prices[item.symbol.toLowerCase()] || prices[item.symbol] || 0;
                const val = curr * item.amount;
                const inv = (item.purchasePrice || 0) * item.amount;
                const prof = val - inv;
                const profPct = inv > 0 ? (prof / inv) * 100 : 0;
                const img = images[item.symbol.toLowerCase()] || images[item.symbol];
                
                // Edit mode for this item
                if (editingItem && editingItem.id === item.id) {
                  return React.createElement('div', { 
                    key: item.id, 
                    style: { 
                      background: currentTheme.inputBg, 
                      borderRadius: '0.75rem', 
                      padding: '1rem', 
                      marginBottom: '0.75rem', 
                      border: `2px solid #3b82f6` 
                    } 
                  },
                    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' } },
                      React.createElement('div', {}, 
                        React.createElement('label', { style: { color: currentTheme.text, fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' } }, t.symbol), 
                        React.createElement('input', { 
                          type: 'text', 
                          value: editingItem.symbol, 
                          onChange: (e) => setEditingItem({...editingItem, symbol: e.target.value}), 
                          style: { width: '100%', padding: '0.5rem', background: currentTheme.card, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', color: currentTheme.text } 
                        })
                      ),
                      React.createElement('div', {}, 
                        React.createElement('label', { style: { color: currentTheme.text, fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' } }, t.amount), 
                        React.createElement('input', { 
                          type: 'number', 
                          step: '0.001', 
                          value: editingItem.amount, 
                          onChange: (e) => setEditingItem({...editingItem, amount: e.target.value}), 
                          style: { width: '100%', padding: '0.5rem', background: currentTheme.card, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', color: currentTheme.text } 
                        })
                      ),
                      React.createElement('div', {}, 
                        React.createElement('label', { style: { color: currentTheme.text, fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' } }, t.purchasePrice), 
                        React.createElement('input', { 
                          type: 'number', 
                          step: '0.01', 
                          value: editingItem.purchasePrice, 
                          onChange: (e) => setEditingItem({...editingItem, purchasePrice: e.target.value}), 
                          style: { width: '100%', padding: '0.5rem', background: currentTheme.card, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', color: currentTheme.text } 
                        })
                      ),
                      React.createElement('div', {}, 
                        React.createElement('label', { style: { color: currentTheme.text, fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' } }, t.purchaseDate), 
                        React.createElement('input', { 
                          type: 'date', 
                          value: editingItem.purchaseDate, 
                          onChange: (e) => setEditingItem({...editingItem, purchaseDate: e.target.value}), 
                          style: { width: '100%', padding: '0.5rem', background: currentTheme.card, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', color: currentTheme.text } 
                        })
                      )
                    ),
                    React.createElement('div', { style: { display: 'flex', gap: '0.5rem' } },
                      React.createElement('button', { 
                        onClick: saveEdit, 
                        style: { padding: '0.5rem 1rem', background: '#16a34a', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' } 
                      }, '✓ ' + t.save),
                      React.createElement('button', { 
                        onClick: cancelEdit, 
                        style: { padding: '0.5rem 1rem', background: '#4b5563', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' } 
                      }, '✗ ' + t.cancel)
                    )
                  );
                }
                
                // Normal display mode
                return React.createElement('div', { 
                  key: item.id, 
                  style: { 
                    background: currentTheme.inputBg, 
                    borderRadius: '0.75rem', 
                    padding: '1rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '0.75rem', 
                    border: `1px solid ${currentTheme.inputBorder}` 
                  } 
                },
                  React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 } },
                    img && React.createElement('img', { 
                      src: img, 
                      alt: item.symbol, 
                      style: { width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', background: 'white' }, 
                      onError: (e) => { e.target.style.display = 'none'; } 
                    }),
                    React.createElement('div', {},
                      React.createElement('div', { style: { color: currentTheme.text, fontWeight: '600', fontSize: '1.125rem' } }, item.symbol.toUpperCase()),
                      React.createElement('div', { style: { color: currentTheme.textSecondary, fontSize: '0.875rem' } }, `${t.amount}: ${item.amount} | ${t.bought}: ${fmtDate(item.purchaseDate)}`),
                      React.createElement('div', { style: { color: currentTheme.textSecondary, fontSize: '0.875rem' } }, `${t.purchasePrice}: ${getCurrencySymbol()}${formatPrice(item.purchasePrice || 0)} ${t.perUnit}`)
                    )
                  ),
                  React.createElement('div', { style: { textAlign: 'right', marginRight: '1rem' } },
                    React.createElement('div', { style: { color: currentTheme.text, fontWeight: '600', fontSize: '1.25rem' } }, getCurrencySymbol() + formatPrice(val)),
                    React.createElement('div', { style: { color: currentTheme.textSecondary, fontSize: '0.875rem' } }, getCurrencySymbol() + formatPrice(curr) + ' ' + t.perUnit),
                    React.createElement('div', { style: { fontSize: '0.875rem', fontWeight: '600', color: prof >= 0 ? '#10b981' : '#ef4444', marginTop: '0.25rem' } }, (prof >= 0 ? '+' : '') + getCurrencySymbol() + formatPrice(Math.abs(prof)) + ` (${profPct >= 0 ? '+' : ''}${formatPrice(profPct)}%)`)
                  ),
                  React.createElement('div', { style: { display: 'flex', gap: '0.5rem' } },
                    React.createElement('button', { 
                      onClick: () => startEdit(item), 
                      style: { padding: '0.5rem', background: '#3b82f6', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' } 
                    }, '✏️'),
                    React.createElement('button', { 
                      onClick: () => removeItem(item.id), 
                      style: { padding: '0.5rem', background: '#dc2626', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' } 
                    }, '🗑️')
                  )
                );
              })
          )
        ),

        // ============= STATISTICS VIEW =============
        activeView === 'charts' && React.createElement('div', {},
          
          // Portfolio health metrics
          React.createElement('div', { style: { background: currentTheme.inputBg, borderRadius: '1rem', padding: '2rem', marginBottom: '2rem', border: `1px solid ${currentTheme.inputBorder}` } },
            React.createElement('h3', { style: { color: currentTheme.text, fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' } }, '📊 ' + t.portfolioHealth),
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' } },
              // Portfolio health rating
              React.createElement('div', { style: { background: currentTheme.card, borderRadius: '0.75rem', padding: '1.5rem', border: `1px solid ${currentTheme.inputBorder}` } },
                React.createElement('div', { style: { fontSize: '0.875rem', color: currentTheme.textSecondary, marginBottom: '0.5rem' } }, t.portfolioHealth),
                React.createElement('div', { style: { fontSize: '1.75rem', fontWeight: 'bold', color: getPortfolioHealth().color } }, getPortfolioHealth().rating)
              ),
              // Diversification score
              React.createElement('div', { style: { background: currentTheme.card, borderRadius: '0.75rem', padding: '1.5rem', border: `1px solid ${currentTheme.inputBorder}` } },
                React.createElement('div', { style: { fontSize: '0.875rem', color: currentTheme.textSecondary, marginBottom: '0.5rem' } }, t.diversification),
                React.createElement('div', { style: { fontSize: '1.75rem', fontWeight: 'bold', color: currentTheme.text } }, getDiversificationScore() + '/100'),
                React.createElement('div', { style: { fontSize: '0.75rem', color: currentTheme.textSecondary, marginTop: '0.25rem' } }, getConcentration())
              ),
              // Average return
              React.createElement('div', { style: { background: currentTheme.card, borderRadius: '0.75rem', padding: '1.5rem', border: `1px solid ${currentTheme.inputBorder}` } },
                React.createElement('div', { style: { fontSize: '0.875rem', color: currentTheme.textSecondary, marginBottom: '0.5rem' } }, t.averageReturn),
                React.createElement('div', { style: { fontSize: '1.75rem', fontWeight: 'bold', color: parseFloat(getAverageReturn()) >= 0 ? '#10b981' : '#ef4444' } }, (parseFloat(getAverageReturn()) >= 0 ? '+' : '') + getAverageReturn() + '%')
              ),
              // Total assets
              React.createElement('div', { style: { background: currentTheme.card, borderRadius: '0.75rem', padding: '1.5rem', border: `1px solid ${currentTheme.inputBorder}` } },
                React.createElement('div', { style: { fontSize: '0.875rem', color: currentTheme.textSecondary, marginBottom: '0.5rem' } }, t.totalAssets),
                React.createElement('div', { style: { fontSize: '1.75rem', fontWeight: 'bold', color: currentTheme.text } }, getTotalAssetCount())
              ),
              // Risk level
              React.createElement('div', { style: { background: currentTheme.card, borderRadius: '0.75rem', padding: '1.5rem', border: `1px solid ${currentTheme.inputBorder}` } },
                React.createElement('div', { style: { fontSize: '0.875rem', color: currentTheme.textSecondary, marginBottom: '0.5rem' } }, t.riskLevel),
                React.createElement('div', { style: { fontSize: '1.25rem', fontWeight: 'bold', color: getRiskLevel() === t.highRisk ? '#ef4444' : getRiskLevel() === t.mediumRisk ? '#f59e0b' : '#10b981' } }, getRiskLevel())
              )
            )
          ),

          // Top and worst performers
          getTotalAssetCount() > 0 && React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' } },
            // Top performers
            React.createElement('div', { style: { background: currentTheme.inputBg, borderRadius: '1rem', padding: '1.5rem', border: `1px solid ${currentTheme.inputBorder}` } },
              React.createElement('h3', { style: { color: currentTheme.text, fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' } }, '🏆 ' + t.topPerformers),
              getTopPerformers(5).length === 0 ? 
                React.createElement('div', { style: { textAlign: 'center', padding: '2rem', color: currentTheme.textSecondary } }, t.noPositions) :
                getTopPerformers(5).map((asset, idx) => 
                  React.createElement('div', { 
                    key: asset.id, 
                    style: { 
                      background: currentTheme.card, 
                      borderRadius: '0.5rem', 
                      padding: '1rem', 
                      marginBottom: '0.75rem', 
                      border: `1px solid ${currentTheme.inputBorder}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    } 
                  },
                    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '0.75rem' } },
                      React.createElement('div', { style: { fontSize: '1.5rem', fontWeight: 'bold', color: currentTheme.textSecondary } }, '#' + (idx + 1)),
                      React.createElement('div', {},
                        React.createElement('div', { style: { color: currentTheme.text, fontWeight: '600' } }, asset.symbol.toUpperCase()),
                        React.createElement('div', { style: { fontSize: '0.75rem', color: currentTheme.textSecondary } }, t[asset.category === 'skins' ? 'cs2Items' : asset.category])
                      )
                    ),
                    React.createElement('div', { style: { textAlign: 'right' } },
                      React.createElement('div', { style: { fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' } }, '+' + formatPrice(asset.profitPct) + '%'),
                      React.createElement('div', { style: { fontSize: '0.75rem', color: currentTheme.textSecondary } }, getCurrencySymbol() + formatPrice(asset.profit))
                    )
                  )
                )
            ),
            
            // Worst performers
            React.createElement('div', { style: { background: currentTheme.inputBg, borderRadius: '1rem', padding: '1.5rem', border: `1px solid ${currentTheme.inputBorder}` } },
              React.createElement('h3', { style: { color: currentTheme.text, fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' } }, '📉 ' + t.worstPerformers),
              getWorstPerformers(5).length === 0 ? 
                React.createElement('div', { style: { textAlign: 'center', padding: '2rem', color: currentTheme.textSecondary } }, t.noPositions) :
                getWorstPerformers(5).map((asset, idx) => 
                  React.createElement('div', { 
                    key: asset.id, 
                    style: { 
                      background: currentTheme.card, 
                      borderRadius: '0.5rem', 
                      padding: '1rem', 
                      marginBottom: '0.75rem', 
                      border: `1px solid ${currentTheme.inputBorder}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    } 
                  },
                    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '0.75rem' } },
                      React.createElement('div', { style: { fontSize: '1.5rem', fontWeight: 'bold', color: currentTheme.textSecondary } }, '#' + (idx + 1)),
                      React.createElement('div', {},
                        React.createElement('div', { style: { color: currentTheme.text, fontWeight: '600' } }, asset.symbol.toUpperCase()),
                        React.createElement('div', { style: { fontSize: '0.75rem', color: currentTheme.textSecondary } }, t[asset.category === 'skins' ? 'cs2Items' : asset.category])
                      )
                    ),
                    React.createElement('div', { style: { textAlign: 'right' } },
                      React.createElement('div', { style: { fontSize: '1.25rem', fontWeight: 'bold', color: '#ef4444' } }, formatPrice(asset.profitPct) + '%'),
                      React.createElement('div', { style: { fontSize: '0.75rem', color: currentTheme.textSecondary } }, getCurrencySymbol() + formatPrice(Math.abs(asset.profit)))
                    )
                  )
                )
            )
          ),

          // Portfolio distribution
          React.createElement('div', { style: { background: currentTheme.inputBg, borderRadius: '1rem', padding: '2rem', marginBottom: '2rem', border: `1px solid ${currentTheme.inputBorder}` } },
            React.createElement('h3', { style: { color: currentTheme.text, fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' } }, t.distribution),
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' } },
              [['crypto', '#3b82f6'], ['stocks', '#10b981'], ['skins', '#8b5cf6']].map(([cat, color]) => {
                const catProfit = calcProfit(cat);
                const catInvest = calcInvest(cat);
                const catProfitPct = catInvest > 0 ? (catProfit / catInvest) * 100 : 0;
                return React.createElement('div', { 
                  key: cat, 
                  style: { background: `linear-gradient(135deg, ${color}, ${color}dd)`, borderRadius: '0.75rem', padding: '1.5rem', color: 'white' } 
                },
                  React.createElement('div', { style: { fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' } }, t[cat === 'skins' ? 'cs2Items' : cat]),
                  React.createElement('div', { style: { fontSize: '2rem', fontWeight: 'bold' } }, getPct(cat) + '%'),
                  React.createElement('div', { style: { fontSize: '1rem', marginTop: '0.5rem' } }, getCurrencySymbol() + formatPrice(calcTotal(cat))),
                  React.createElement('div', { style: { fontSize: '0.875rem', marginTop: '0.25rem', fontWeight: '600', color: catProfit >= 0 ? '#86efac' : '#fca5a5' } }, (catProfit >= 0 ? '▲ +' : '▼ ') + getCurrencySymbol() + formatPrice(Math.abs(catProfit)) + ` (${catProfitPct >= 0 ? '+' : ''}${formatPrice(catProfitPct)}%)`)
                );
              })
            )
          ),

          // Detailed asset breakdown by category
          React.createElement('div', { style: { background: currentTheme.inputBg, borderRadius: '1rem', padding: '2rem', border: `1px solid ${currentTheme.inputBorder}` } },
            React.createElement('h3', { style: { color: currentTheme.text, fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' } }, tabs.find(t => t.id === activeTab)?.label + ' - ' + t.details),
            safe[activeTab].length === 0 ?
              React.createElement('div', { style: { textAlign: 'center', padding: '3rem', color: currentTheme.textSecondary } }, t.noPositionsCategory) :
              safe[activeTab].map(item => {
                const curr = prices[item.symbol.toLowerCase()] || prices[item.symbol] || 0;
                const val = curr * item.amount;
                const inv = (item.purchasePrice || 0) * item.amount;
                const prof = val - inv;
                const profPct = inv > 0 ? (prof / inv) * 100 : 0;
                const pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
                const img = images[item.symbol.toLowerCase()] || images[item.symbol];
                const daysSince = getDaysSincePurchase(item.purchaseDate);
                
                return React.createElement('div', { 
                  key: item.id, 
                  style: { 
                    background: currentTheme.card, 
                    borderRadius: '0.75rem', 
                    padding: '1.5rem', 
                    marginBottom: '1rem', 
                    border: `1px solid ${currentTheme.inputBorder}` 
                  } 
                },
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' } },
                    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem' } },
                      img && React.createElement('img', { 
                        src: img, 
                        alt: item.symbol, 
                        style: { width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', background: 'white' }, 
                        onError: (e) => { e.target.style.display = 'none'; } 
                      }),
                      React.createElement('div', {},
                        React.createElement('div', { style: { color: currentTheme.text, fontSize: '1.5rem', fontWeight: '600' } }, item.symbol.toUpperCase()),
                        React.createElement('div', { style: { color: currentTheme.textSecondary, marginTop: '0.25rem' } }, `${t.amount}: ${item.amount} | ${t.bought}: ${fmtDate(item.purchaseDate)}`),
                        React.createElement('div', { style: { color: currentTheme.textSecondary, fontSize: '0.875rem', marginTop: '0.25rem' } }, `${t.purchasePrice}: ${getCurrencySymbol()}${formatPrice(item.purchasePrice || 0)} → ${t.current}: ${getCurrencySymbol()}${formatPrice(curr)}`),
                        React.createElement('div', { style: { color: currentTheme.textSecondary, fontSize: '0.875rem', marginTop: '0.25rem' } }, `${t.holdingPeriod}: ${daysSince} ${t.days}`)
                      )
                    ),
                    React.createElement('div', { style: { textAlign: 'right' } },
                      React.createElement('div', { style: { color: currentTheme.text, fontSize: '1.75rem', fontWeight: 'bold' } }, getCurrencySymbol() + formatPrice(val)),
                      React.createElement('div', { style: { color: currentTheme.textSecondary, marginTop: '0.25rem' } }, pct + '% ' + (t.ofPortfolio || 'des Portfolios')),
                      React.createElement('div', { style: { fontSize: '1.125rem', fontWeight: '600', color: prof >= 0 ? '#10b981' : '#ef4444', marginTop: '0.5rem' } }, (prof >= 0 ? '+' : '') + getCurrencySymbol() + formatPrice(Math.abs(prof))),
                      React.createElement('div', { style: { fontSize: '0.875rem', color: prof >= 0 ? '#86efac' : '#fca5a5' } }, `(${profPct >= 0 ? '+' : ''}${formatPrice(profPct)}%)`)
                    )
                  ),
                  // Progress bar showing portfolio percentage
                  React.createElement('div', { style: { background: currentTheme.inputBg, height: '8px', borderRadius: '4px', overflow: 'hidden' } },
                    React.createElement('div', { style: { background: prof >= 0 ? '#10b981' : '#ef4444', height: '100%', width: pct + '%', transition: 'width 0.3s' } })
                  )
                );
              })
          )
        )
      )
    )
  );
}

// Render the application
ReactDOM.render(React.createElement(InvestmentTracker), document.getElementById('root'));
