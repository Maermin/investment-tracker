# 💰 Investment Tracker

A comprehensive portfolio management tool for tracking cryptocurrency, stocks, and CS2 items in one unified dashboard.

![Version](https://img.shields.io/badge/version-2.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

### Portfolio Management
- **Multi-Asset Support**: Track Crypto, Stocks, and CS2 Items in one place
- **Real-time Pricing**: Automatic price updates from multiple APIs
- **Edit & Delete**: Modify positions without losing historical data
- **Import/Export**: Backup and restore your portfolio data as JSON

### Advanced Analytics
- **Portfolio Health Score**: Get instant feedback on your portfolio's overall health
- **Diversification Analysis**: Understand your portfolio concentration with HHI-based scoring
- **Top/Worst Performers**: Identify your best and worst investments at a glance
- **Risk Assessment**: Automatic categorization (Low/Medium/High Risk)
- **Average Return Tracking**: Monitor your overall portfolio performance
- **Holding Period**: Track how long you've held each asset

### Performance Metrics (per Asset)
- Current value and price
- Purchase price and date
- Profit/Loss (absolute and percentage)
- Portfolio percentage
- Holding duration in days

### Customization
- **3 Theme Options**: Light, Dark, and Purple
- **2 Languages**: German (DE) and English (EN)
- **2 Currencies**: EUR and USD with live exchange rates
- **Localized Date Formats**: 
  - German: DD/MM/YYYY
  - English: MM/DD/YYYY

## 🚀 Quick Start

### Installation

1. **Clone or download** this repository
## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Maermin/investment-tracker.git
cd investment-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Project Structure

Make sure your project has the following structure:

```
investment-tracker/
├── package.json
├── main.js
├── index.html
├── renderer.js
└── README.md
```

### 4. Run the Application

**Development Mode:**
```bash
npm start
```

**Build Executable (.exe for Windows):**
```bash
npm run build
```

The built application will be in the `dist` folder.

### Getting Started

1. **Select your preferred language** (DE/EN) in settings ⚙️
2. **Choose a theme** (Light/Dark/Purple)
3. **Add your first position**:
   - Select category (Crypto/Stocks/CS2 Items)
   - Enter symbol (e.g., bitcoin, AAPL, AK-47 | Redline)
   - Enter amount and purchase price
   - Select purchase date
   - Click "Add"

4. **Refresh prices** 🔄 to get latest market data

## 🔑 API Configuration

### Alpha Vantage (for Stock Prices)
1. Click the key icon 🔑 in the header
2. Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
3. Paste your key and save
4. **Note**: Free tier allows 5 requests/minute, 500/day

### Data Sources
- **Cryptocurrency**: CoinGecko API (no key required)
- **Stocks**: Alpha Vantage API (key required for real data, falls back to mock data)
- **CS2 Items**: Steam Community Market (no key required)

## 📊 Understanding the Statistics

### Portfolio Health
Your portfolio is rated based on three factors:
1. **Diversification Score** (30% weight)
2. **Average Return** (40% weight)
3. **Profitable Asset Ratio** (30% weight)

**Ratings:**
- **Excellent** (≥75 points): Well-diversified with strong returns
- **Good** (60-74 points): Solid portfolio with room for improvement
- **Fair** (40-59 points): Needs attention in diversification or returns
- **Poor** (<40 points): High concentration or poor performance

### Diversification Score
Based on the Herfindahl-Hirschman Index (HHI):
- **70-100**: Diversified - Assets well spread across portfolio
- **40-69**: Balanced - Moderate concentration
- **0-39**: Highly Concentrated - Few assets dominate portfolio

### Risk Level
Automatically calculated based on:
- **Diversification Score** (lower = higher risk)
- **Return Volatility** (higher absolute returns = higher risk)

**Categories:**
- **Low Risk**: Well-diversified, stable returns (<25% volatility)
- **Medium Risk**: Moderate diversification or volatility (25-50%)
- **High Risk**: Poor diversification or high volatility (>50%)

## 💡 Tips & Best Practices

### For Cryptocurrency
- Use lowercase coin IDs from CoinGecko (e.g., "bitcoin", "ethereum", "cardano")
- Prices update in real-time when you click refresh
- Images are automatically fetched from CoinGecko

### For Stocks
- Use official ticker symbols (e.g., AAPL, MSFT, GOOGL)
- Configure your Alpha Vantage API key for real prices
- Without API key, mock prices are generated for testing
- Be mindful of rate limits (12 second delay between requests)

### For CS2 Items
- Use exact market names (e.g., "AK-47 | Redline (Field-Tested)")
- Prices are fetched from Steam Community Market
- 2-second delay between requests to avoid rate limiting

### Portfolio Management
- **Regular Updates**: Click refresh 🔄 to get latest prices
- **Backup Your Data**: Export 📥 your portfolio regularly
- **Track Purchase Dates**: Accurate dates help calculate holding periods
- **Review Performance**: Check Top/Worst Performers weekly

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

**Requirements:**
- JavaScript enabled
- LocalStorage enabled (for data persistence)
- Internet connection (for price updates)

## 🗂️ Data Storage

All data is stored locally in your browser using LocalStorage:
- Portfolio positions
- Price history (last 20 data points per asset)
- Asset images (cached)
- User preferences (theme, language, currency)
- API keys (stored locally, never transmitted)

**Privacy Note:** No data is sent to external servers except for price API calls.

## 🎨 Customization

### Themes
1. **Light Mode** ☀️: Clean white interface for daytime use
2. **Dark Mode** 🌙: Easy on the eyes for night time
3. **Purple Mode** 💜: Vibrant gradient theme

### Language & Currency
- **Languages**: German (DE) with DD/MM/YYYY dates, English (EN) with MM/DD/YYYY dates
- **Currencies**: EUR (€) or USD ($) with live exchange rates

## 📈 Example Use Cases

### Crypto Investor
Track your Bitcoin, Ethereum, and altcoin holdings with real-time prices from CoinGecko.

### Stock Portfolio Manager
Monitor your stock investments with Alpha Vantage integration and dividend tracking capabilities.

### CS2 Skin Trader
Keep track of your Counter-Strike 2 item investments with Steam Market pricing.

### Diversified Investor
Manage all your investments in one place - crypto, stocks, and collectibles.

## 🔧 Troubleshooting

### Prices Not Updating
- Check your internet connection
- Verify API keys are correct
- Check browser console for API errors
- Ensure you're not hitting rate limits

### Data Not Saving
- Check if LocalStorage is enabled in your browser
- Ensure you have storage space available
- Try exporting and reimporting your data

### Wrong Prices Showing
- Verify you're using correct symbols/ticker names
- For stocks: Ensure Alpha Vantage API key is valid
- For crypto: Check CoinGecko coin ID spelling
- For CS2: Use exact Steam Market item names

### Date Format Issues
- Date format automatically adjusts to selected language
- Dates are stored in ISO format (YYYY-MM-DD) internally
- Display format: DE uses DD/MM/YYYY, EN uses MM/DD/YYYY

## 🛠️ Technical Details

### Built With
- **React 18** - UI framework
- **LocalStorage API** - Data persistence
- **Fetch API** - External data integration

### APIs Used
- [CoinGecko API](https://www.coingecko.com/api) - Cryptocurrency prices
- [Alpha Vantage API](https://www.alphavantage.co/) - Stock market data
- [Steam Market API](https://steamcommunity.com/market/) - CS2 item prices
- [Exchange Rate API](https://exchangerate-api.com/) - Currency conversion

### Performance
- Lightweight: No build process required
- Fast: Runs entirely in browser
- Efficient: Only fetches prices on demand
- Responsive: Works on all screen sizes

## 📄 License

MIT License - feel free to use this for personal or commercial projects.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

### Feature Requests
- Portfolio performance charts
- Tax reporting
- Price alerts
- Mobile app version
- Additional asset classes

## 📞 Support

If you encounter any issues:
1. Check the Troubleshooting section above
2. Review the Patch Notes for recent changes
3. Check browser console for error messages

## 🎯 Roadmap

### Planned Features
- 📊 Historical performance charts
- 📄 PDF export for reports
- 🔔 Price alerts and notifications
- 📈 Performance vs. market benchmarks
- 💼 Tax reporting tools
- 🌍 Additional currency support
- 📱 Mobile app version

---

**Current Version:** 2.0  
**Last Updated:** January 3, 2026  
**Author:** Maermin

---

### Quick Links
- [Patch Notes](./PATCH_NOTES.md) - See what's new
- [CoinGecko](https://www.coingecko.com/en/api) - Crypto API
- [Alpha Vantage](https://www.alphavantage.co/) - Stock API
- [Steam Market](https://steamcommunity.com/market/) - CS2 Items

---

**⭐ If you find this useful, please star the repository!**
