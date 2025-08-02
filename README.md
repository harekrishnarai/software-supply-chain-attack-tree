# Software Supply Chain Attack Tree

A modern, interactive risk explorer for software supply chain security threats, built with React, Vite, and Tailwind CSS.

## 🌟 Features

- **Interactive Attack Tree**: Hierarchical visualization of 100+ attack vectors targeting software supply chains
- **Attack Vectors Database**: Comprehensive collection of documented attack methods with real-world examples
- **Security Safeguards**: Countermeasures and best practices for supply chain security
- **Research References**: Curated collection of 300+ academic papers, reports, and documentation
- **Modern UI**: Clean, responsive design with enhanced user experience
- **Fast Performance**: Built with Vite for optimal development and production performance

## 🚀 Live Demo

Visit the live application: [https://harekrishnarai.github.io/software-supply-chain-attack-tree/](https://harekrishnarai.github.io/software-supply-chain-attack-tree/)

## 🛠️ Technology Stack

- **Frontend**: React 19, React Router DOM
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Visualization**: D3.js
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with GitHub Actions

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/harekrishnarai/software-supply-chain-attack-tree.git
cd software-supply-chain-attack-tree
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚀 Deployment

### Automatic Deployment
This project is configured for automatic deployment to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a build and deployment.

### Manual Deployment
```bash
npm run deploy
```

## 📊 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Navigation, etc.)
│   ├── ui/             # Basic UI components
│   └── tree/           # Tree visualization components
├── pages/              # Page components
│   ├── home/           # Home page
│   ├── attack-tree/    # Interactive attack tree
│   ├── attack-vectors/ # Attack vectors database
│   ├── safeguards/     # Security safeguards
│   └── references/     # Research references
├── data/               # Static data and configurations
├── hooks/              # Custom React hooks
└── utils/              # Utility functions
```

## 🎯 Inspiration

This project is inspired by the [SAP Risk Explorer for Software Supply Chains](https://github.com/SAP/risk-explorer-for-software-supply-chains), reimagined with modern web technologies for enhanced performance and user experience.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Resources

- [SLSA Framework](https://slsa.dev/)
- [NIST Secure Software Development Framework](https://csrc.nist.gov/Projects/ssdf)
- [OWASP Software Component Verification Standard](https://owasp.org/www-project-software-component-verification-standard/)
- [Supply Chain Attacks Research](https://arxiv.org/abs/2204.04008)

## 🙏 Acknowledgments

- SAP Security Research team for the original Risk Explorer concept
- The open-source community for the tools and libraries that make this project possible
- Research community for documenting and analyzing supply chain security threats

---

Built with ❤️ using modern web technologies
