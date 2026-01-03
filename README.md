# investment-tracker
# 💰 Investment Tracker

A desktop application to track your cryptocurrency, stock, and CS2 skin investments with real-time price updates and portfolio analytics.

![Investment Tracker](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 📊 **Multi-Asset Tracking**: Track cryptocurrencies, stocks, and CS2 skins in one place
- 💹 **Real-Time Prices**: Automatic price updates via APIs
  - Cryptocurrency: CoinGecko API (no key required)
  - Stocks: Alpha Vantage API (free API key)
  - CS2 Skins: Steam Market API
- 📈 **Portfolio Analytics**: View distribution and statistics
- 💾 **Data Persistence**: Auto-save your portfolio locally
- 📥 **Import/Export**: Backup and restore your portfolio data
- 🎨 **Modern UI**: Beautiful gradient design with responsive layout

## 🖥️ Screenshots

### Portfolio View
Track all your investments with live price updates.

### Statistics View
See your portfolio distribution and asset details.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/investment-tracker.git
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

## 🔑 API Configuration

### For Cryptocurrency (No Setup Required)
Cryptocurrency prices work out of the box using CoinGecko's free API.

### For Stocks (Optional)
1. Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Click the "🔑 API-Keys" button in the app
3. Enter your Alpha Vantage API key
4. Click "Save"

**Note:** Without an API key, stock prices will use demo values.

### For CS2 Skins (Optional)
CS2 skin prices work via Steam Market API without authentication. For better rate limits, you can optionally add a [Steam API key](https://steamcommunity.com/dev/apikey).

## 📖 How to Use

### Adding Assets

1. Select a category tab (Crypto, Stocks, or CS2 Skins)
2. Enter the asset symbol:
   - **Crypto**: Use CoinGecko IDs (e.g., `bitcoin`, `ethereum`, `cardano`)
   - **Stocks**: Use ticker symbols (e.g., `AAPL`, `MSFT`, `TSLA`)
   - **CS2 Skins**: Full item name (e.g., `AK-47 | Redline (Field-Tested)`)
3. Enter the quantity you own
4. Click "➕ Add"

### Updating Prices

Click the "🔄 Update" button to fetch the latest prices for all your assets.

**Rate Limits:**
- Alpha Vantage: 5 calls per minute (free tier)
- The app automatically waits 12 seconds between stock requests

### Backup & Restore

**Export:**
- Click "📥 Export" to download your portfolio as a JSON file
- Filename format: `portfolio-backup-YYYY-MM-DD.json`

**Import:**
- Click "📤 Import" and select a previously exported JSON file
- Your portfolio will be restored

## 🛠️ package.json Configuration

```json
{
  "name": "investment-tracker",
  "version": "1.0.0",
  "description": "Track your crypto, stocks, and CS2 skin investments",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder"
  },
  "keywords": ["investment", "portfolio", "crypto", "stocks", "csgo"],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "electron": "^28.0.0",
    "electron-builder": "^24.9.1"
  },
  "build": {
    "appId": "com.investment.tracker",
    "productName": "Investment Tracker",
    "win": {
      "target": "nsis",
      "icon": "icon.ico"
    },
    "mac": {
      "target": "dmg",
      "icon": "icon.icns"
    },
    "linux": {
      "target": "AppImage",
      "icon": "icon.png"
    },
    "files": [
      "main.js",
      "index.html",
      "renderer.js"
    ]
  }
}
```

## 🔧 Troubleshooting

### White Screen on Startup
1. Open Developer Tools (`F12` or `Ctrl+Shift+I`)
2. Check the Console for errors
3. Ensure all CDN links in `index.html` are loading correctly

### API Not Working
- **Crypto:** Check your internet connection (no key required)
- **Stocks:** Verify your Alpha Vantage API key is correct
- **Skins:** Steam Market may have rate limits; wait a few minutes

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

## 🌐 Supported Platforms

- ✅ Windows (x64)
- ✅ macOS (Intel & Apple Silicon)
- ✅ Linux (Ubuntu, Debian, Fedora)

## 📝 Data Storage

All portfolio data is stored locally using `localStorage`:
- Your portfolio positions
- Price history (last 20 updates per asset)
- API keys (stored encrypted in localStorage)

**No data is sent to external servers** except for price API calls.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data
- [Alpha Vantage](https://www.alphavantage.co/) for stock market data
- [Steam Market API](https://steamcommunity.com/market/) for CS2 skin prices
- [Electron](https://www.electronjs.org/) for the desktop framework
- [React](https://reactjs.org/) for the UI framework

## 📧 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/Maermin/investment-tracker/issues) on GitHub.

## 🗺️ Roadmap

- [ ] Add more chart types (line charts for price history)
- [ ] Support for more assets (commodities, forex)
- [ ] Dark/Light theme toggle
- [ ] Mobile app version
- [ ] Portfolio performance tracking
- [ ] Price alerts and notifications

---

**Made with ❤️ for investors**
