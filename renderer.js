const { useState, useEffect } = React;

// Translation object
const translations = {
  de: {
    title: 'Investment Tracker',
    portfolio: 'Portfolio',
    statistics: 'Statistiken',
    crypto: 'Krypto',
    stocks: 'Aktien',
    cs2Items: 'CS2 Items',
    apiKeys: 'API-Keys',
    export: 'Export',
    import: 'Import',
    refresh: 'Aktualisieren',
    loading: 'Lädt...',
    totalValue: 'Gesamtwert Portfolio',
    invested: 'Investiert',
    profitLoss: 'Gewinn/Verlust',
    position: 'Position',
    positions: 'Positionen',
    addNew: 'Neue Position hinzufügen',
    symbol: 'Symbol',
    amount: 'Menge',
    purchasePrice: 'Einkaufspreis',
    purchaseDate: 'Kaufdatum',
    add: 'Hinzufügen',
    perUnit: '/ Stück',
    bought: 'Gekauft',
    current: 'Aktuell',
    ofPortfolio: 'des Portfolios',
    noPositions: 'Keine Positionen vorhanden. Füge deine erste Position hinzu!',
    noPositionsCategory: 'Keine Positionen in dieser Kategorie',
    distribution: 'Portfolio-Verteilung',
    visualDistribution: 'Visuelle Verteilung',
    total: 'Gesamt',
    details: 'Details',
    apiSettings: 'API-Schlüssel Einstellungen',
    alphaVantageKey: 'Alpha Vantage API-Key (für Aktien):',
    getKeyFree: '→ Kostenlosen API-Key erhalten',
    save: 'Speichern',
    cancel: 'Abbrechen',
    fillRequired: 'Bitte fülle alle Pflichtfelder aus!',
    theme: 'Design',
    language: 'Sprache',
    whiteMode: 'Hell',
    darkMode: 'Dunkel',
    purpleMode: 'Lila'
  },
  en: {
    title: 'Investment Tracker',
    portfolio: 'Portfolio',
    statistics: 'Statistics',
    crypto: 'Crypto',
    stocks: 'Stocks',
    cs2Items: 'CS2 Items',
    apiKeys: 'API Keys',
    export: 'Export',
    import: 'Import',
    refresh: 'Refresh',
    loading: 'Loading...',
    totalValue: 'Total Portfolio Value',
    invested: 'Invested',
    profitLoss: 'Profit/Loss',
    position: 'Position',
    positions: 'Positions',
    addNew: 'Add New Position',
    symbol: 'Symbol',
    amount: 'Amount',
    purchasePrice: 'Purchase Price',
    purchaseDate: 'Purchase Date',
    add: 'Add',
    perUnit: '/ Unit',
    bought: 'Bought',
    current: 'Current',
    ofPortfolio: 'of Portfolio',
    noPositions: 'No positions yet. Add your first position!',
    noPositionsCategory: 'No positions in this category',
    distribution: 'Portfolio Distribution',
    visualDistribution: 'Visual Distribution',
    total: 'Total',
    details: 'Details',
    apiSettings: 'API Key Settings',
    alphaVantageKey: 'Alpha Vantage API Key (for Stocks):',
    getKeyFree: '→ Get Free API Key',
    save: 'Save',
    cancel: 'Cancel',
    fillRequired: 'Please fill in all required fields!',
    theme: 'Theme',
    language: 'Language',
    whiteMode: 'Light',
    darkMode: 'Dark',
    purpleMode: 'Purple'
  }
};

// Theme configurations
const themes = {
  white: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%)',
    card: 'rgba(255,255,255,0.9)',
    cardBorder: 'rgba(0,0,0,0.1)',
    text: '#1e293b',
    textSecondary: '#64748b',
    inputBg: 'rgba(0,0,0,0.05)',
    inputBorder: 'rgba(0,0,0,0.1)',
    buttonPrimary: '#3b82f6',
    buttonSecondary: '#64748b'
  },
  dark: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    card: 'rgba(30,41,59,0.9)',
    cardBorder: 'rgba(255,255,255,0.1)',
    text: '#f8fafc',
    textSecondary: '#94a3b8',
    inputBg: 'rgba(255,255,255,0.05)',
    inputBorder: 'rgba(255,255,255,0.1)',
    buttonPrimary: '#3b82f6',
    buttonSecondary: '#64748b'
  },
  purple: {
    background: 'linear-gradient(135deg, #1e293b 0%, #7e22ce 50%, #1e293b 100%)',
    card: 'rgba(255,255,255,0.1)',
    cardBorder: 'rgba(255,255,255,0.2)',
    text: '#ffffff',
    textSecondary: 'rgba(255,255,255,0.6)',
    inputBg: 'rgba(255,255,255,0.1)',
    inputBorder: 'rgba(255,255,255,0.2)',
    buttonPrimary: '#7e22ce',
    buttonSecondary: '#9333ea'
  }
};

function InvestmentTracker() {
  const [portfolio, setPortfolio] = useState({
    crypto: [],
    stocks: [],
    skins: []
  });
  const [prices, setPrices] = useState({});
  const [images, setImages] = useState({});
  const [priceHistory, setPriceHistory] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('crypto');
  const [activeView, setActiveView] = useState('portfolio');
  const [theme, setTheme] = useState('purple');
  const [language, setLanguage] = useState('de');
  const [newItem, setNewItem] = useState({ 
    symbol: '', 
    amount: '', 
    purchasePrice: '', 
    purchaseDate: new Date().toISOString().split('T')[0] 
  });
  const [apiKeys, setApiKeys] = useState({
    alphaVantage: '',
    steamApi: ''
  });
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const t = translations[language];
  const currentTheme = themes[theme];

  // Format number with German locale (1.234,56)
  const formatPrice = (price) => {
    return price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Get correct plural form
  const getPositionText = (count) => {
    return count === 1 ? t.position : t.positions;
  };

  // Load settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
    
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) setLanguage(savedLanguage);

    const savedKeys = localStorage.getItem('apiKeys');
    if (savedKeys) {
      setApiKeys(JSON.parse(savedKeys));
    }
    
    const savedPortfolio = localStorage.getItem('portfolio');
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    }
    
    const savedHistory = localStorage.getItem('priceHistory');
    if (savedHistory) {
      setPriceHistory(JSON.parse(savedHistory));
    }

    const savedImages = localStorage.getItem('images');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('priceHistory', JSON.stringify(priceHistory));
  }, [priceHistory]);

  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(images));
  }, [images]);

  const saveApiKeys = () => {
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
    setShowApiSettings(false);
    alert(language === 'de' ? 'API-Keys gespeichert!' : 'API Keys saved!');
  };

  // Fetch prices from APIs
  const fetchPrices = async () => {
    setLoading(true);
    const newPrices = {};
    const newHistory = { ...priceHistory };
    const newImages = { ...images };

    try {
      // Crypto prices and images from CoinGecko
      if (portfolio.crypto.length > 0) {
        const cryptoIds = portfolio.crypto.map(c => c.symbol.toLowerCase()).join(',');
        const cryptoRes = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=eur`
        );
        const cryptoData = await cryptoRes.json();
        
        // Get coin images
        for (const coin of portfolio.crypto) {
          const coinId = coin.symbol.toLowerCase();
          if (!newImages[coinId]) {
            try {
              const coinInfoRes = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false`
              );
              const coinInfo = await coinInfoRes.json();
              if (coinInfo.image?.small) {
                newImages[coinId] = coinInfo.image.small;
              }
            } catch (err) {
              console.error(`Error loading image for ${coinId}:`, err);
            }
          }
        }
        
        Object.keys(cryptoData).forEach(id => {
          newPrices[id] = cryptoData[id].eur;
          
          if (!newHistory[id]) {
            newHistory[id] = [];
          }
          newHistory[id].push({
            timestamp: new Date().toLocaleString('de-DE', { 
              month: '2-digit', 
              day: '2-digit', 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            price: cryptoData[id].eur
          });
          if (newHistory[id].length > 20) {
            newHistory[id] = newHistory[id].slice(-20);
          }
        });
      }

      // Stock prices with Alpha Vantage
      if (portfolio.stocks.length > 0 && apiKeys.alphaVantage) {
        for (const stock of portfolio.stocks) {
          try {
            const stockRes = await fetch(
              `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${apiKeys.alphaVantage}`
            );
            const stockData = await stockRes.json();
            
            if (stockData['Global Quote'] && stockData['Global Quote']['05. price']) {
              const price = parseFloat(stockData['Global Quote']['05. price']);
              newPrices[stock.symbol] = price;
              
              if (!newHistory[stock.symbol]) {
                newHistory[stock.symbol] = [];
              }
              newHistory[stock.symbol].push({
                timestamp: new Date().toLocaleString('de-DE', { 
                  month: '2-digit', 
                  day: '2-digit', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                }),
                price: price
              });
              if (newHistory[stock.symbol].length > 20) {
                newHistory[stock.symbol] = newHistory[stock.symbol].slice(-20);
              }
            }

            if (!newImages[stock.symbol]) {
              newImages[stock.symbol] = `https://logo.clearbit.com/${stock.symbol.toLowerCase()}.com`;
            }
            
            await new Promise(resolve => setTimeout(resolve, 12000));
          } catch (error) {
            console.error(`Error loading ${stock.symbol}:`, error);
          }
        }
      } else if (portfolio.stocks.length > 0) {
        portfolio.stocks.forEach(stock => {
          const lastPrice = prices[stock.symbol] || Math.random() * 200 + 50;
          const change = (Math.random() - 0.5) * 10;
          newPrices[stock.symbol] = Math.max(10, lastPrice + change);
          
          if (!newHistory[stock.symbol]) {
            newHistory[stock.symbol] = [];
          }
          newHistory[stock.symbol].push({
            timestamp: new Date().toLocaleString('de-DE', { 
              month: '2-digit', 
              day: '2-digit', 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            price: newPrices[stock.symbol]
          });
          if (newHistory[stock.symbol].length > 20) {
            newHistory[stock.symbol] = newHistory[stock.symbol].slice(-20);
          }

          if (!newImages[stock.symbol]) {
            newImages[stock.symbol] = `https://logo.clearbit.com/${stock.symbol.toLowerCase()}.com`;
          }
        });
      }

      // CS2 Items - Steam Market API
      if (portfolio.skins.length > 0) {
        for (const skin of portfolio.skins) {
          try {
            const encodedName = encodeURIComponent(skin.symbol);
            const steamRes = await fetch(
              `https://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=${encodedName}`
            );
            const steamData = await steamRes.json();
            
            if (steamData.success && steamData.median_price) {
              const priceStr = steamData.median_price.replace('€', '').replace(',', '.');
              const price = parseFloat(priceStr);
              newPrices[skin.symbol] = price;
              
              if (!newHistory[skin.symbol]) {
                newHistory[skin.symbol] = [];
              }
              newHistory[skin.symbol].push({
                timestamp: new Date().toLocaleString('de-DE', { 
                  month: '2-digit', 
                  day: '2-digit', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                }),
                price: price
              });
              if (newHistory[skin.symbol].length > 20) {
                newHistory[skin.symbol] = newHistory[skin.symbol].slice(-20);
              }
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
          } catch (error) {
            console.error(`Error loading ${skin.symbol}:`, error);
            const lastPrice = prices[skin.symbol] || Math.random() * 500 + 10;
            const change = (Math.random() - 0.5) * 20;
            newPrices[skin.symbol] = Math.max(5, lastPrice + change);
          }
        }
      }

      setPrices(newPrices);
      setPriceHistory(newHistory);
      setImages(newImages);
    } catch (error) {
      console.error('Error loading prices:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (portfolio.crypto.length > 0 || portfolio.stocks.length > 0 || portfolio.skins.length > 0) {
      fetchPrices();
    }
  }, [portfolio]);

  const addItem = () => {
    if (!newItem.symbol || !newItem.amount || !newItem.purchasePrice) {
      alert(t.fillRequired);
      return;
    }
    
    const item = {
      id: Date.now(),
      symbol: newItem.symbol,
      amount: parseFloat(newItem.amount),
      purchasePrice: parseFloat(newItem.purchasePrice),
      purchaseDate: newItem.purchaseDate,
      addedAt: new Date().toISOString()
    };

    setPortfolio(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], item]
    }));
    setNewItem({ symbol: '', amount: '', purchasePrice: '', purchaseDate: new Date().toISOString().split('T')[0] });
  };

  const removeItem = (id) => {
    setPortfolio(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(item => item.id !== id)
    }));
  };

  const tabs = [
    { id: 'crypto', label: t.crypto, placeholder: language === 'de' ? 'z.B. bitcoin, ethereum' : 'e.g. bitcoin, ethereum' },
    { id: 'stocks', label: t.stocks, placeholder: language === 'de' ? 'z.B. AAPL, MSFT' : 'e.g. AAPL, MSFT' },
    { id: 'skins', label: t.cs2Items, placeholder: language === 'de' ? 'z.B. AK-47 | Redline (Field-Tested)' : 'e.g. AK-47 | Redline (Field-Tested)' }
  ];

  // Safe array access - MUST be defined BEFORE calculations
  const safePortfolio = {
    crypto: portfolio.crypto || [],
    stocks: portfolio.stocks || [],
    skins: portfolio.skins || []
  };

  const calculateTotal = (category) => {
    const items = safePortfolio[category] || [];
    return items.reduce((sum, item) => {
      const price = prices[item.symbol.toLowerCase()] || prices[item.symbol] || 0;
      return sum + (price * item.amount);
    }, 0);
  };

  const calculateTotalInvestment = (category) => {
    const items = safePortfolio[category] || [];
    return items.reduce((sum, item) => {
      return sum + ((item.purchasePrice || 0) * item.amount);
    }, 0);
  };

  const calculateTotalProfit = (category) => {
    const items = safePortfolio[category] || [];
    return items.reduce((sum, item) => {
      const currentPrice = prices[item.symbol.toLowerCase()] || prices[item.symbol] || 0;
      const currentValue = currentPrice * item.amount;
      const investedValue = (item.purchasePrice || 0) * item.amount;
      return sum + (currentValue - investedValue);
    }, 0);
  };

  const totalValue = calculateTotal('crypto') + calculateTotal('stocks') + calculateTotal('skins');
  const totalInvestment = calculateTotalInvestment('crypto') + calculateTotalInvestment('stocks') + calculateTotalInvestment('skins');
  const totalProfit = totalValue - totalInvestment;
  const totalProfitPercent = totalInvestment > 0 ? ((totalProfit / totalInvestment) * 100) : 0;

  const exportData = () => {
    const data = {
      portfolio,
      priceHistory,
      images,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setPortfolio(data.portfolio);
        setPriceHistory(data.priceHistory || {});
        setImages(data.images || {});
        alert(language === 'de' ? 'Daten erfolgreich importiert!' : 'Data imported successfully!');
      } catch (error) {
        alert(language === 'de' ? 'Fehler beim Importieren der Daten!' : 'Error importing data!');
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  const getPercentage = (category) => {
    if (totalValue === 0) return 0;
    return ((calculateTotal(category) / totalValue) * 100).toFixed(1);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <div style={{ minHeight: '100vh', background: currentTheme.background, padding: '2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ background: currentTheme.card, backdropFilter: 'blur(10px)', borderRadius: '1rem', padding: '2rem', border: `1px solid ${currentTheme.cardBorder}` }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: currentTheme.text }}>{t.title}</h1>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowSettings(!showSettings)}
                style={{ padding: '0.5rem 1rem', background: '#9333ea', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
              >
                ⚙️ {t.theme} & {t.language}
              </button>
              <button
                onClick={() => setShowApiSettings(!showApiSettings)}
                style={{ padding: '0.5rem 1rem', background: '#ca8a04', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
              >
                🔑 {t.apiKeys}
              </button>
              <button
                onClick={exportData}
                style={{ padding: '0.5rem 1rem', background: '#16a34a', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
              >
                📥 {t.export}
              </button>
              <label style={{ padding: '0.5rem 1rem', background: '#9333ea', color: 'white', borderRadius: '0.5rem', cursor: 'pointer' }}>
                📤 {t.import}
                <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
              </label>
              <button
                onClick={fetchPrices}
                disabled={loading}
                style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
              >
                {loading ? `🔄 ${t.loading}` : `🔄 ${t.refresh}`}
              </button>
            </div>
          </div>

          {/* Settings Modal */}
          {showSettings && (
            <div style={{ background: currentTheme.inputBg, borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', border: `2px solid ${currentTheme.inputBorder}` }}>
              <h3 style={{ color: currentTheme.text, fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>⚙️ {t.theme} & {t.language}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ color: currentTheme.text, display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>{t.theme}:</label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setTheme('white')}
                      style={{ padding: '0.5rem 1rem', background: theme === 'white' ? '#3b82f6' : currentTheme.inputBg, color: theme === 'white' ? 'white' : currentTheme.text, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', cursor: 'pointer' }}
                    >
                      ☀️ {t.whiteMode}
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      style={{ padding: '0.5rem 1rem', background: theme === 'dark' ? '#3b82f6' : currentTheme.inputBg, color: theme === 'dark' ? 'white' : currentTheme.text, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', cursor: 'pointer' }}
                    >
                      🌙 {t.darkMode}
                    </button>
                    <button
                      onClick={() => setTheme('purple')}
                      style={{ padding: '0.5rem 1rem', background: theme === 'purple' ? '#7e22ce' : currentTheme.inputBg, color: theme === 'purple' ? 'white' : currentTheme.text, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', cursor: 'pointer' }}
                    >
                      💜 {t.purpleMode}
                    </button>
                  </div>
                </div>
                <div>
                  <label style={{ color: currentTheme.text, display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>{t.language}:</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setLanguage('de')}
                      style={{ padding: '0.5rem 1rem', background: language === 'de' ? '#3b82f6' : currentTheme.inputBg, color: language === 'de' ? 'white' : currentTheme.text, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', cursor: 'pointer' }}
                    >
                      🇩🇪 Deutsch
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      style={{ padding: '0.5rem 1rem', background: language === 'en' ? '#3b82f6' : currentTheme.inputBg, color: language === 'en' ? 'white' : currentTheme.text, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', cursor: 'pointer' }}
                    >
                      🇬🇧 English
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                style={{ padding: '0.5rem 1.5rem', background: '#4b5563', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
              >
                {t.cancel}
              </button>
            </div>
          )}

          {/* API Settings */}
          {showApiSettings && (
            <div style={{ background: currentTheme.inputBg, borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', border: `2px solid rgba(234,179,8,0.5)` }}>
              <h3 style={{ color: currentTheme.text, fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>🔑 {t.apiSettings}</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: currentTheme.text, display: 'block', marginBottom: '0.5rem' }}>{t.alphaVantageKey}</label>
                <input
                  type="text"
                  placeholder={t.alphaVantageKey}
                  value={apiKeys.alphaVantage}
                  onChange={(e) => setApiKeys({...apiKeys, alphaVantage: e.target.value})}
                  style={{ width: '100%', padding: '0.5rem', background: currentTheme.inputBg, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', color: currentTheme.text }}
                />
                <a href="https://www.alphavantage.co/support/#api-key" target="_blank" style={{ color: '#60a5fa', fontSize: '0.875rem', marginTop: '0.25rem', display: 'inline-block' }}>
                  {t.getKeyFree}
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  onClick={saveApiKeys}
                  style={{ padding: '0.5rem 1.5rem', background: '#16a34a', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
                >
                  {t.save}
                </button>
                <button
                  onClick={() => setShowApiSettings(false)}
                  style={{ padding: '0.5rem 1.5rem', background: '#4b5563', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          )}

          {/* View Toggle */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setActiveView('portfolio')}
              style={{ padding: '0.75rem 1.5rem', background: activeView === 'portfolio' ? currentTheme.buttonPrimary : currentTheme.inputBg, color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600' }}
            >
              {t.portfolio}
            </button>
            <button
              onClick={() => setActiveView('charts')}
              style={{ padding: '0.75rem 1.5rem', background: activeView === 'charts' ? currentTheme.buttonPrimary : currentTheme.inputBg, color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600' }}
            >
              {t.statistics}
            </button>
          </div>

          {/* Portfolio View */}
          {activeView === 'portfolio' && (
            <div>
              {/* Total Overview with Profit/Loss */}
              <div style={{ background: 'linear-gradient(90deg, #f97316, #ec4899)', borderRadius: '1rem', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{t.totalValue}</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>€{formatPrice(totalValue)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{t.invested}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>€{formatPrice(totalInvestment)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{t.profitLoss}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: totalProfit >= 0 ? '#10b981' : '#ef4444' }}>
                      {totalProfit >= 0 ? '+' : ''}€{formatPrice(Math.abs(totalProfit))}
                    </div>
                    <div style={{ fontSize: '1rem', opacity: 0.9 }}>
                      ({totalProfitPercent >= 0 ? '+' : ''}{formatPrice(totalProfitPercent)}%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Overview */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '1rem', padding: '1.5rem', color: 'white' }}>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{t.crypto}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>€{formatPrice(calculateTotal('crypto'))}</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{safePortfolio.crypto.length} {getPositionText(safePortfolio.crypto.length)}</div>
                  <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '600', color: calculateTotalProfit('crypto') >= 0 ? '#86efac' : '#fca5a5' }}>
                    {calculateTotalProfit('crypto') >= 0 ? '▲ +' : '▼ '}€{formatPrice(Math.abs(calculateTotalProfit('crypto')))}
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '1rem', padding: '1.5rem', color: 'white' }}>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{t.stocks}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>€{formatPrice(calculateTotal('stocks'))}</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{safePortfolio.stocks.length} {getPositionText(safePortfolio.stocks.length)}</div>
                  <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '600', color: calculateTotalProfit('stocks') >= 0 ? '#86efac' : '#fca5a5' }}>
                    {calculateTotalProfit('stocks') >= 0 ? '▲ +' : '▼ '}€{formatPrice(Math.abs(calculateTotalProfit('stocks')))}
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', borderRadius: '1rem', padding: '1.5rem', color: 'white' }}>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{t.cs2Items}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>€{formatPrice(calculateTotal('skins'))}</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{safePortfolio.skins.length} {getPositionText(safePortfolio.skins.length)}</div>
                  <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '600', color: calculateTotalProfit('skins') >= 0 ? '#86efac' : '#fca5a5' }}>
                    {calculateTotalProfit('skins') >= 0 ? '▲ +' : '▼ '}€{formatPrice(Math.abs(calculateTotalProfit('skins')))}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{ padding: '0.75rem 1.5rem', background: activeTab === tab.id ? currentTheme.buttonPrimary : currentTheme.inputBg, color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Add Item Form */}
              <div style={{ background: currentTheme.inputBg, borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ color: currentTheme.text, fontWeight: '600', marginBottom: '1rem' }}>{t.addNew}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', alignItems: 'end' }}>
                  <div>
                    <label style={{ color: currentTheme.text, fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' }}>{t.symbol} *</label>
                    <input
                      type="text"
                      placeholder={tabs.find(t => t.id === activeTab)?.placeholder}
                      value={newItem.symbol}
                      onChange={(e) => setNewItem({ ...newItem, symbol: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', background: currentTheme.inputBg, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', color: currentTheme.text }}
                    />
                  </div>
                  <div>
                    <label style={{ color: currentTheme.text, fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' }}>{t.amount} *</label>
                    <input
                      type="number"
                      step="0.001"
                      placeholder={t.amount}
                      value={newItem.amount}
                      onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', background: currentTheme.inputBg, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', color: currentTheme.text }}
                    />
                  </div>
                  <div>
                    <label style={{ color: currentTheme.text, fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' }}>{t.purchasePrice} *</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder={`€ ${t.perUnit}`}
                      value={newItem.purchasePrice}
                      onChange={(e) => setNewItem({ ...newItem, purchasePrice: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', background: currentTheme.inputBg, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', color: currentTheme.text }}
                    />
                  </div>
                  <div>
                    <label style={{ color: currentTheme.text, fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' }}>{t.purchaseDate}</label>
                    <input
                      type="date"
                      value={newItem.purchaseDate}
                      onChange={(e) => setNewItem({ ...newItem, purchaseDate: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', background: currentTheme.inputBg, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '0.5rem', color: currentTheme.text }}
                    />
                  </div>
                  <button
                    onClick={addItem}
                    style={{ padding: '0.5rem 1.5rem', background: '#16a34a', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', height: '40px' }}
                  >
                    ➕ {t.add}
                  </button>
                </div>
              </div>

              {/* Portfolio List with Images */}
              <div>
                {(safePortfolio[activeTab] || []).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: currentTheme.textSecondary }}>
                    {t.noPositions}
                  </div>
                ) : (
                  (safePortfolio[activeTab] || []).map(item => {
                    try {
                      const currentPrice = prices[item.symbol.toLowerCase()] || prices[item.symbol] || 0;
                      const currentValue = currentPrice * item.amount;
                      const investedValue = item.purchasePrice * item.amount;
                      const profit = currentValue - investedValue;
                      const profitPercent = investedValue > 0 ? ((profit / investedValue) * 100) : 0;
                      const imageUrl = images[item.symbol.toLowerCase()] || images[item.symbol];
                      
                      return (
                        <div
                          key={item.id}
                          style={{ background: currentTheme.inputBg, borderRadius: '0.75rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', border: `1px solid ${currentTheme.inputBorder}` }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                            {imageUrl && (
                              <img 
                                src={imageUrl} 
                                alt={item.symbol}
                                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', background: 'white' }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            )}
                            <div>
                              <div style={{ color: currentTheme.text, fontWeight: '600', fontSize: '1.125rem' }}>{item.symbol.toUpperCase()}</div>
                              <div style={{ color: currentTheme.textSecondary, fontSize: '0.875rem' }}>
                                {t.amount}: {item.amount} | {t.bought}: {formatDate(item.purchaseDate)}
                              </div>
                              <div style={{ color: currentTheme.textSecondary, fontSize: '0.875rem' }}>
                                {t.purchasePrice}: €{formatPrice(item.purchasePrice)} {t.perUnit}
                              </div>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right', marginRight: '1rem' }}>
                            <div style={{ color: currentTheme.text, fontWeight: '600', fontSize: '1.25rem' }}>€{formatPrice(currentValue)}</div>
                            <div style={{ color: currentTheme.textSecondary, fontSize: '0.875rem' }}>€{formatPrice(currentPrice)} {t.perUnit}</div>
                            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: profit >= 0 ? '#10b981' : '#ef4444', marginTop: '0.25rem' }}>
                              {profit >= 0 ? '+' : ''}€{formatPrice(Math.abs(profit))} ({profitPercent >= 0 ? '+' : ''}{formatPrice(profitPercent)}%)
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            style={{ padding: '0.5rem', background: '#dc2626', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
                          >
                            🗑️
                          </button>
                        </div>
                      );
                    } catch (error) {
                      console.error('Error rendering item:', error);
                      return null;
                    }
                  })
                )}
              </div>
            </div>
          )}

          {/* Charts View */}
          {activeView === 'charts' && (
            <div>
              {/* Portfolio Distribution */}
              <div style={{ background: currentTheme.inputBg, borderRadius: '1rem', padding: '2rem', marginBottom: '2rem', border: `1px solid ${currentTheme.inputBorder}` }}>
                <h3 style={{ color: currentTheme.text, fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>{t.distribution}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '0.75rem', padding: '1.5rem', color: 'white' }}>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>{t.crypto}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{getPercentage('crypto')}%</div>
                    <div style={{ fontSize: '1rem', marginTop: '0.5rem' }}>€{formatPrice(calculateTotal('crypto'))}</div>
                    <div style={{ fontSize: '0.875rem', marginTop: '0.25rem', fontWeight: '600', color: calculateTotalProfit('crypto') >= 0 ? '#86efac' : '#fca5a5' }}>
                      {calculateTotalProfit('crypto') >= 0 ? '▲ +' : '▼ '}€{formatPrice(Math.abs(calculateTotalProfit('crypto')))}
                    </div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '0.75rem', padding: '1.5rem', color: 'white' }}>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>{t.stocks}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{getPercentage('stocks')}%</div>
                    <div style={{ fontSize: '1rem', marginTop: '0.5rem' }}>€{formatPrice(calculateTotal('stocks'))}</div>
                    <div style={{ fontSize: '0.875rem', marginTop: '0.25rem', fontWeight: '600', color: calculateTotalProfit('stocks') >= 0 ? '#86efac' : '#fca5a5' }}>
                      {calculateTotalProfit('stocks') >= 0 ? '▲ +' : '▼ '}€{formatPrice(Math.abs(calculateTotalProfit('stocks')))}
                    </div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', borderRadius: '0.75rem', padding: '1.5rem', color: 'white' }}>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>{t.cs2Items}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{getPercentage('skins')}%</div>
                    <div style={{ fontSize: '1rem', marginTop: '0.5rem' }}>€{formatPrice(calculateTotal('skins'))}</div>
                    <div style={{ fontSize: '0.875rem', marginTop: '0.25rem', fontWeight: '600', color: calculateTotalProfit('skins') >= 0 ? '#86efac' : '#fca5a5' }}>
                      {calculateTotalProfit('skins') >= 0 ? '▲ +' : '▼ '}€{formatPrice(Math.abs(calculateTotalProfit('skins')))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Pie Chart */}
              <div style={{ background: currentTheme.inputBg, borderRadius: '1rem', padding: '2rem', marginBottom: '2rem', border: `1px solid ${currentTheme.inputBorder}` }}>
                <h3 style={{ color: currentTheme.text, fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>{t.visualDistribution}</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                  {/* Simple Pie Chart Visualization */}
                  <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                    <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                      {(() => {
                        const cryptoPercent = parseFloat(getPercentage('crypto'));
                        const stocksPercent = parseFloat(getPercentage('stocks'));
                        const skinsPercent = parseFloat(getPercentage('skins'));
                        
                        const circumference = 2 * Math.PI * 25;
                        const cryptoLength = (cryptoPercent / 100) * circumference;
                        const stocksLength = (stocksPercent / 100) * circumference;
                        const skinsLength = (skinsPercent / 100) * circumference;
                        
                        return (
                          <>
                            <circle
                              cx="50"
                              cy="50"
                              r="25"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="20"
                              strokeDasharray={`${cryptoLength} ${circumference}`}
                              strokeDashoffset="0"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="25"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="20"
                              strokeDasharray={`${stocksLength} ${circumference}`}
                              strokeDashoffset={-cryptoLength}
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="25"
                              fill="none"
                              stroke="#8b5cf6"
                              strokeWidth="20"
                              strokeDasharray={`${skinsLength} ${circumference}`}
                              strokeDashoffset={-(cryptoLength + stocksLength)}
                            />
                          </>
                        );
                      })()}
                    </svg>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: currentTheme.text }}>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{t.total}</div>
                      <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>€{formatPrice(totalValue)}</div>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '20px', height: '20px', background: '#3b82f6', borderRadius: '4px' }}></div>
                      <div style={{ color: currentTheme.text }}>
                        <div style={{ fontWeight: '600' }}>{t.crypto}: {getPercentage('crypto')}%</div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>€{formatPrice(calculateTotal('crypto'))}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '20px', height: '20px', background: '#10b981', borderRadius: '4px' }}></div>
                      <div style={{ color: currentTheme.text }}>
                        <div style={{ fontWeight: '600' }}>{t.stocks}: {getPercentage('stocks')}%</div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>€{formatPrice(calculateTotal('stocks'))}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '20px', height: '20px', background: '#8b5cf6', borderRadius: '4px' }}></div>
                      <div style={{ color: currentTheme.text }}>
                        <div style={{ fontWeight: '600' }}>{t.cs2Items}: {getPercentage('skins')}%</div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>€{formatPrice(calculateTotal('skins'))}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Asset Details with Images */}
              <div style={{ background: currentTheme.inputBg, borderRadius: '1rem', padding: '2rem', border: `1px solid ${currentTheme.inputBorder}` }}>
                <h3 style={{ color: currentTheme.text, fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                  {tabs.find(t => t.id === activeTab)?.label} - {t.details}
                </h3>
                {(safePortfolio[activeTab] || []).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: currentTheme.textSecondary }}>
                    {t.noPositionsCategory}
                  </div>
                ) : (
                  (safePortfolio[activeTab] || []).map(item => {
                    try {
                      const currentPrice = prices[item.symbol.toLowerCase()] || prices[item.symbol] || 0;
                      const currentValue = currentPrice * item.amount;
                      const investedValue = item.purchasePrice * item.amount;
                      const profit = currentValue - investedValue;
                      const profitPercent = investedValue > 0 ? ((profit / investedValue) * 100) : 0;
                      const percentage = totalValue > 0 ? ((currentValue / totalValue) * 100).toFixed(1) : 0;
                      const imageUrl = images[item.symbol.toLowerCase()] || images[item.symbol];
                      
                      return (
                        <div key={item.id} style={{ background: currentTheme.card, borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1rem', border: `1px solid ${currentTheme.inputBorder}` }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              {imageUrl && (
                                <img 
                                  src={imageUrl} 
                                  alt={item.symbol}
                                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', background: 'white' }}
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                />
                              )}
                              <div>
                                <div style={{ color: currentTheme.text, fontSize: '1.5rem', fontWeight: '600' }}>{item.symbol.toUpperCase()}</div>
                                <div style={{ color: currentTheme.textSecondary, marginTop: '0.25rem' }}>
                                  {t.amount}: {item.amount} | {t.bought}: {formatDate(item.purchaseDate)}
                                </div>
                                <div style={{ color: currentTheme.textSecondary, fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                  {t.purchasePrice}: €{formatPrice(item.purchasePrice)} → {t.current}: €{formatPrice(currentPrice)}
                                </div>
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ color: currentTheme.text, fontSize: '1.75rem', fontWeight: 'bold' }}>€{formatPrice(currentValue)}</div>
                              <div style={{ color: currentTheme.textSecondary, marginTop: '0.25rem' }}>{percentage}% {t.ofPortfolio}</div>
                              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: profit >= 0 ? '#10b981' : '#ef4444', marginTop: '0.5rem' }}>
                                {profit >= 0 ? '+' : ''}€{formatPrice(Math.abs(profit))}
                              </div>
                              <div style={{ fontSize: '0.875rem', color: profit >= 0 ? '#86efac' : '#fca5a5' }}>
                                ({profitPercent >= 0 ? '+' : ''}{formatPrice(profitPercent)}%)
                              </div>
                            </div>
                          </div>
                          <div style={{ background: currentTheme.inputBg, height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ background: profit >= 0 ? '#10b981' : '#ef4444', height: '100%', width: `${percentage}%`, transition: 'width 0.3s' }}></div>
                          </div>
                        </div>
                      );
                    } catch (error) {
                      console.error('Error rendering chart item:', error);
                      return null;
                    }
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(
  React.createElement(InvestmentTracker),
  document.getElementById('root')
);
