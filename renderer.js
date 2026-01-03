const { useState, useEffect } = React;

function InvestmentTracker() {
  const [portfolio, setPortfolio] = useState({
    crypto: [],
    stocks: [],
    skins: []
  });
  const [prices, setPrices] = useState({});
  const [priceHistory, setPriceHistory] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('crypto');
  const [activeView, setActiveView] = useState('portfolio');
  const [newItem, setNewItem] = useState({ symbol: '', amount: '' });
  const [apiKeys, setApiKeys] = useState({
    alphaVantage: '',
    steamApi: ''
  });
  const [showApiSettings, setShowApiSettings] = useState(false);

  // API Keys aus localStorage laden
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('priceHistory', JSON.stringify(priceHistory));
  }, [priceHistory]);

  const saveApiKeys = () => {
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
    setShowApiSettings(false);
    alert('API-Keys gespeichert!');
  };

  const fetchPrices = async () => {
    setLoading(true);
    const newPrices = {};
    const newHistory = { ...priceHistory };

    try {
      if (portfolio.crypto.length > 0) {
        const cryptoIds = portfolio.crypto.map(c => c.symbol.toLowerCase()).join(',');
        const cryptoRes = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=eur`
        );
        const cryptoData = await cryptoRes.json();
        
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
            await new Promise(resolve => setTimeout(resolve, 12000));
          } catch (error) {
            console.error(`Fehler beim Laden von ${stock.symbol}:`, error);
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
        });
      }

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
            console.error(`Fehler beim Laden von ${skin.symbol}:`, error);
            const lastPrice = prices[skin.symbol] || Math.random() * 500 + 10;
            const change = (Math.random() - 0.5) * 20;
            newPrices[skin.symbol] = Math.max(5, lastPrice + change);
          }
        }
      }

      setPrices(newPrices);
      setPriceHistory(newHistory);
    } catch (error) {
      console.error('Fehler beim Laden der Preise:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (portfolio.crypto.length > 0 || portfolio.stocks.length > 0 || portfolio.skins.length > 0) {
      fetchPrices();
    }
  }, [portfolio]);

  const addItem = () => {
    if (!newItem.symbol || !newItem.amount) return;
    
    const item = {
      id: Date.now(),
      symbol: newItem.symbol,
      amount: parseFloat(newItem.amount),
      addedAt: new Date().toISOString()
    };

    setPortfolio(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], item]
    }));
    setNewItem({ symbol: '', amount: '' });
  };

  const removeItem = (id) => {
    setPortfolio(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].filter(item => item.id !== id)
    }));
  };

  const calculateTotal = (category) => {
    return portfolio[category].reduce((sum, item) => {
      const price = prices[item.symbol.toLowerCase()] || prices[item.symbol] || 0;
      return sum + (price * item.amount);
    }, 0);
  };

  const totalValue = calculateTotal('crypto') + calculateTotal('stocks') + calculateTotal('skins');

  const exportData = () => {
    const data = {
      portfolio,
      priceHistory,
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
        alert('Daten erfolgreich importiert!');
      } catch (error) {
        alert('Fehler beim Importieren der Daten!');
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  const tabs = [
    { id: 'crypto', label: 'Krypto', placeholder: 'z.B. bitcoin, ethereum' },
    { id: 'stocks', label: 'Aktien', placeholder: 'z.B. AAPL, MSFT' },
    { id: 'skins', label: 'CS2 Skins', placeholder: 'z.B. AK-47 | Redline (Field-Tested)' }
  ];

  // Einfache Statistiken für Charts-View
  const getPercentage = (category) => {
    if (totalValue === 0) return 0;
    return ((calculateTotal(category) / totalValue) * 100).toFixed(1);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e293b 0%, #7e22ce 50%, #1e293b 100%)', padding: '2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(255,255,255,0.2)' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>Investment Tracker</h1>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setShowApiSettings(!showApiSettings)}
                style={{ padding: '0.5rem 1rem', background: '#ca8a04', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
              >
                🔑 API-Keys
              </button>
              <button
                onClick={exportData}
                style={{ padding: '0.5rem 1rem', background: '#16a34a', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
              >
                📥 Export
              </button>
              <label style={{ padding: '0.5rem 1rem', background: '#9333ea', color: 'white', borderRadius: '0.5rem', cursor: 'pointer' }}>
                📤 Import
                <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
              </label>
              <button
                onClick={fetchPrices}
                disabled={loading}
                style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
              >
                {loading ? '🔄 Lädt...' : '🔄 Aktualisieren'}
              </button>
            </div>
          </div>

          {/* API Settings */}
          {showApiSettings && (
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', border: '2px solid rgba(234,179,8,0.5)' }}>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>🔑 API-Schlüssel Einstellungen</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Alpha Vantage API-Key (für Aktien):</label>
                <input
                  type="text"
                  placeholder="Dein Alpha Vantage API-Key"
                  value={apiKeys.alphaVantage}
                  onChange={(e) => setApiKeys({...apiKeys, alphaVantage: e.target.value})}
                  style={{ width: '100%', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.5rem', color: 'white' }}
                />
                <a href="https://www.alphavantage.co/support/#api-key" target="_blank" style={{ color: '#60a5fa', fontSize: '0.875rem', marginTop: '0.25rem', display: 'inline-block' }}>
                  → Kostenlosen API-Key erhalten
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  onClick={saveApiKeys}
                  style={{ padding: '0.5rem 1.5rem', background: '#16a34a', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
                >
                  Speichern
                </button>
                <button
                  onClick={() => setShowApiSettings(false)}
                  style={{ padding: '0.5rem 1.5rem', background: '#4b5563', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
                >
                  Abbrechen
                </button>
              </div>
            </div>
          )}

          {/* View Toggle */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setActiveView('portfolio')}
              style={{ padding: '0.75rem 1.5rem', background: activeView === 'portfolio' ? 'white' : 'rgba(255,255,255,0.1)', color: activeView === 'portfolio' ? '#7e22ce' : 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600' }}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveView('charts')}
              style={{ padding: '0.75rem 1.5rem', background: activeView === 'charts' ? 'white' : 'rgba(255,255,255,0.1)', color: activeView === 'charts' ? '#7e22ce' : 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600' }}
            >
              Statistiken
            </button>
          </div>

          {/* Portfolio View */}
          {activeView === 'portfolio' && (
            <div>
              {/* Übersicht */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '1rem', padding: '1.5rem', color: 'white' }}>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Krypto</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>€{calculateTotal('crypto').toFixed(2)}</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{portfolio.crypto.length} Positionen</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '1rem', padding: '1.5rem', color: 'white' }}>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Aktien</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>€{calculateTotal('stocks').toFixed(2)}</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{portfolio.stocks.length} Positionen</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', borderRadius: '1rem', padding: '1.5rem', color: 'white' }}>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>CS2 Skins</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>€{calculateTotal('skins').toFixed(2)}</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{portfolio.skins.length} Positionen</div>
                </div>
              </div>

              <div style={{ background: 'linear-gradient(90deg, #f97316, #ec4899)', borderRadius: '1rem', padding: '1.5rem', color: 'white', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Gesamtwert Portfolio</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>€{totalValue.toFixed(2)}</div>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{ padding: '0.75rem 1.5rem', background: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.1)', color: activeTab === tab.id ? '#7e22ce' : 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Add Item */}
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '1rem' }}>Neue Position hinzufügen</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input
                    type="text"
                    placeholder={tabs.find(t => t.id === activeTab)?.placeholder}
                    value={newItem.symbol}
                    onChange={(e) => setNewItem({ ...newItem, symbol: e.target.value })}
                    style={{ flex: 1, padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.5rem', color: 'white' }}
                  />
                  <input
                    type="number"
                    placeholder="Menge"
                    value={newItem.amount}
                    onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                    style={{ width: '120px', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.5rem', color: 'white' }}
                  />
                  <button
                    onClick={addItem}
                    style={{ padding: '0.5rem 1.5rem', background: '#16a34a', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
                  >
                    ➕ Hinzufügen
                  </button>
                </div>
              </div>

              {/* Portfolio List */}
              <div>
                {portfolio[activeTab].length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.5)' }}>
                    Keine Positionen vorhanden. Füge deine erste Position hinzu!
                  </div>
                ) : (
                  portfolio[activeTab].map(item => {
                    const price = prices[item.symbol.toLowerCase()] || prices[item.symbol] || 0;
                    const value = price * item.amount;
                    return (
                      <div
                        key={item.id}
                        style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}
                      >
                        <div>
                          <div style={{ color: 'white', fontWeight: '600', fontSize: '1.125rem' }}>{item.symbol.toUpperCase()}</div>
                          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Menge: {item.amount}</div>
                        </div>
                        <div style={{ textAlign: 'right', marginRight: '1rem' }}>
                          <div style={{ color: 'white', fontWeight: '600' }}>€{value.toFixed(2)}</div>
                          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>€{price.toFixed(2)} / Stück</div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          style={{ padding: '0.5rem', background: '#dc2626', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
                        >
                          🗑️
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Charts View */}
          {activeView === 'charts' && (
            <div>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Portfolio-Verteilung</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '0.75rem', padding: '1.5rem', color: 'white' }}>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>Krypto</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{getPercentage('crypto')}%</div>
                    <div style={{ fontSize: '1rem', marginTop: '0.5rem' }}>€{calculateTotal('crypto').toFixed(2)}</div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '0.75rem', padding: '1.5rem', color: 'white' }}>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>Aktien</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{getPercentage('stocks')}%</div>
                    <div style={{ fontSize: '1rem', marginTop: '0.5rem' }}>€{calculateTotal('stocks').toFixed(2)}</div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', borderRadius: '0.75rem', padding: '1.5rem', color: 'white' }}>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>CS2 Skins</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{getPercentage('skins')}%</div>
                    <div style={{ fontSize: '1rem', marginTop: '0.5rem' }}>€{calculateTotal('skins').toFixed(2)}</div>
                  </div>
                </div>
              </div>

              {/* Asset Details */}
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', padding: '2rem' }}>
                <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                  {tabs.find(t => t.id === activeTab)?.label} - Details
                </h3>
                {portfolio[activeTab].map(item => {
                  const price = prices[item.symbol.toLowerCase()] || prices[item.symbol] || 0;
                  const value = price * item.amount;
                  const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : 0;
                  
                  return (
                    <div key={item.id} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div>
                          <div style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600' }}>{item.symbol.toUpperCase()}</div>
                          <div style={{ color: 'rgba(255,255,255,0.6)' }}>Menge: {item.amount}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>€{value.toFixed(2)}</div>
                          <div style={{ color: 'rgba(255,255,255,0.6)' }}>{percentage}% des Portfolios</div>
                        </div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ background: '#3b82f6', height: '100%', width: `${percentage}%`, transition: 'width 0.3s' }}></div>
                      </div>
                    </div>
                  );
                })}
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
