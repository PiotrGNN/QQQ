# ZoL0 Trading System

[![CI](https://github.com/your-org/zol0-trading-system/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/zol0-trading-system/actions)
[![Coverage Status](https://coveralls.io/repos/github/your-org/zol0-trading-system/badge.svg?branch=main)](https://coveralls.io/github/your-org/zol0-trading-system?branch=main)
[![Docker Build Status](https://img.shields.io/docker/cloud/build/your-org/zol0-trading-system)](https://hub.docker.com/r/your-org/zol0-trading-system)
[![Security](https://img.shields.io/badge/security-scanned-brightgreen)](https://github.com/your-org/zol0/security)

## Overview
A modular trading system using Streamlit, scikit-learn, PyTorch, and Bybit integration. Includes monitoring, risk management, and full test coverage.

## Installation

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trading-system.git
cd trading-system
```

2. Build and run using Docker Compose:
```bash
docker-compose up --build
```

The system will be available at:
- Dashboard: http://localhost:8501
- API: http://localhost:5000
- Monitoring: http://localhost:3000

### Clean Installation (Recommended for Development)

1. Clone the repository
2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows
```

3. Run the clean install script:
```bash
bash scripts/install_clean.sh
```

4. Initialize the database:
```bash
python -c "from data.db_manager import DatabaseManager; DatabaseManager('sqlite:///data/db/trading.db').init_db()"
```

5. Start the services:
```bash
# Start API server
python main.py &
# Start trading system
python run.py &
# Start dashboard
streamlit run dashboard.py
```

---

### Manual Installation (Advanced)

1. Clone the repository
2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Initialize the database:
```bash
python -c "from data.db_manager import DatabaseManager; DatabaseManager('sqlite:///data/db/trading.db').init_db()"
```

5. Start the services:
```bash
# Start API server
python main.py &
# Start trading system
python run.py &
# Start dashboard
streamlit run dashboard.py
```

## Usage
- Run the dashboard: `streamlit run dashboard_api.py`
- Run tests: `pytest`

## Optimization
- Model training: see `ai_models/model_training.py`
- Hyperparameter tuning: use scikit-learn or PyTorch utilities as needed.

## Monitoring
- System metrics: see `core/monitoring/metrics.py`
- Logging: all modules use Python's logging module.

## Configuration

The system can be configured through `config/config.yaml`. Key configuration sections:

- `environment`: Development/production settings
- `trading`: Trading parameters and risk limits
- `ai_models`: AI model configuration
- `api`: API server settings
- `logging`: Logging configuration

## Project Structure

- `ai_models/`: AI model implementations
- `config/`: Configuration files
- `data/`: Data management and storage
- `docs/`: Documentation
- `tests/`: Test suite
- `utils/`: Utility functions
- `dashboard.py`: Interactive dashboard
- `main.py`: API server
- `run.py`: Trading system entry point

## Development

### Setting Up Development Environment

1. Install development dependencies:
```bash
pip install -r requirements-dev.txt
```

2. Set up pre-commit hooks:
```bash
pre-commit install
```

3. Run tests:
```bash
pytest tests/
```

### Code Style

This project follows:
- PEP 8 for Python code style
- Type hints for improved code clarity
- Comprehensive docstrings
- Unit tests for all new features

### Adding New Features

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Implement your changes
3. Add tests
4. Run the test suite
5. Create a pull request

## Testing

Run different test suites:

```bash
# Run all tests
pytest

# Run unit tests only
pytest tests/ -m unit

# Run integration tests
pytest tests/ -m integration

# Generate coverage report
pytest --cov=./ tests/
```

## Cross-Platform Testing

Some tests involving file permissions or OS-specific features are skipped on Windows for compatibility. See test source for details. To run the full suite including permission tests, use a Unix-like environment.

## Monitoring

The system includes comprehensive monitoring:

- System health metrics
- Trading performance analytics
- AI model performance tracking
- Resource usage monitoring

Access monitoring dashboards:
- Grafana: http://localhost:3000 (admin/admin)
- System Dashboard: http://localhost:8501

## Troubleshooting

### Najczęstsze problemy i rozwiązania

1. **Błąd połączenia z bazą danych**
   - Sprawdź uprawnienia do pliku bazy danych
   - Zweryfikuj ścieżkę w config.yaml
2. **Błąd ładowania modeli AI**
   - Upewnij się, że pliki modeli są w katalogu saved_models/
   - Sprawdź zgodność wersji modeli
3. **Brak połączenia z API**
   - Zweryfikuj klucz API w pliku .env
   - Sprawdź logi: logs/api.log
4. **Błędy konfiguracyjne**
   - Użyj: `python main.py config/config.yaml` aby sprawdzić błędy w konfiguracji

## Przykładowa konfiguracja (config/config.yaml)

```yaml
environment: production
trading:
  max_risk: 0.02
  max_positions: 5
ai_models:
  enabled: true
  model_path: saved_models/model_v1.pkl
api:
  host: 0.0.0.0
  port: 5000
logging:
  level: INFO
  file: logs/system.log
```

## Jak uruchomić testy

```bash
pytest tests/            # Wszystkie testy
pytest tests/ -m unit    # Testy jednostkowe
pytest tests/ -m integration  # Testy integracyjne
pytest --cov=./ tests/  # Raport pokrycia
```

## Security & CI/CD

- All code is scanned for secrets using Trufflehog in CI.
- Dependency updates are automated with Dependabot.
- Linting, formatting (black, isort), and type checks (mypy) are enforced in CI.
- Security tests and coverage are required for all merges.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Technical indicators from TA-Lib
- Machine learning implementations using scikit-learn
- Real-time visualization with Streamlit
- Monitoring with Grafana

## Quick Start Scripts (Cross-Platform)

For local development and testing, use the provided scripts:

### Windows
- `run_local.bat` – Sets up environment and runs backend (Python)
- `run_all.bat` – Launches backend, frontend (dashboard), and infrastructure (Docker Compose) in separate windows
- `start-all.ps1` – PowerShell script to launch all services in new windows

### Linux/Mac
- `run_local.sh` – Sets up environment and runs backend (Python)
- `run_all.sh` – Launches backend, frontend (dashboard), and infrastructure (Docker Compose) in background

All scripts:
- Create required directories (`logs`, `data/cache`, `python_libs`)
- Ensure `.env` file exists (copy from `.env.example` if missing)
- Install Python dependencies (`requirements.txt`)
- (For `run_all` scripts) Install frontend dependencies and start dashboard
- Start backend and/or frontend services
- Start infrastructure (Docker Compose)

> **Note:** Edit `.env` to add your API keys before running the system.

## Stopping Services
- For `run_all.bat`/`run_all.sh`: Close the opened windows or kill the background processes, then run `docker-compose down` to stop infrastructure.

## Python Virtual Environment Setup

To ensure all Python dependencies are isolated and consistent, use a virtual environment (venv):

### 1. Create the venv (if not already present)

```powershell
# Windows PowerShell
python -m venv .venv
```
```bash
# Unix/macOS
python3 -m venv .venv
```

### 2. Activate the venv

```powershell
# Windows PowerShell
.venv\Scripts\Activate.ps1
```
```cmd
# Windows CMD
.venv\Scripts\activate.bat
```
```bash
# Unix/macOS
source .venv/bin/activate
```

### 3. Install dependencies

```powershell
pip install -r requirements-dev.txt
```

> All scripts (`run_local.sh`, `run_local.bat`, `run_all.sh`, etc.) assume the venv is activated.

## Onboarding & Script Usage

- Use the provided scripts to launch backend, frontend, and infrastructure:
  - `run_local.sh` / `run_local.bat`: Start local backend/frontend.
  - `run_all.sh` / `run_all.bat`: Orchestrate all services.
  - `start-all.ps1`: PowerShell orchestration.
- Ensure `.env` is present (copy from `.env.example` if needed).

## Setup & Optimization

### Setup
- Install dependencies: `pip install -r requirements.txt`
- Activate venv: `.venv\Scripts\activate` (Windows) or `source .venv/bin/activate` (Linux/Mac)
- Initialize DB: `python -c "from data.db_manager import DatabaseManager; DatabaseManager('sqlite:///data/db/trading.db').init_db()"`

### Optimization
- Run Optuna and Genetic Algorithm optimization on historical data:

```powershell
make optimize
```

- This will execute both `optimization/bayes_opt.py` (Optuna) and `optimization/genetic_opt.py` (DEAP GA) on data from `data/historical/`.
- Results and best parameters will be printed to console and can be integrated into strategy configs.

#### CI/CD
- Weekly optimization is scheduled via GitHub Actions (`.github/workflows/ci-optimize.yml`) with dataset cache.
- All new models are saved in `models/registry/{date}_{hash}.pth`.
- Coverage for unit tests ≥ 90% (see `tests/`).

---

## Monitoring & Optimization

### Monitoring
- System health metrics
- Trading performance analytics
- AI model performance tracking
- Resource usage monitoring

Access monitoring dashboards:
- Grafana: http://localhost:3000 (admin/admin)
- System Dashboard: http://localhost:8501

### Cache Optimization
- Dynamic optimization of cache TTL for endpoints (higher hit rate, lower latency)
- Automatic analysis of cache statistics and adjustment of TTL (10-30 min for hot endpoints)
- Safe retrieval of CPU metrics (no errors when psutil is missing or other issues)

#### How to Use:
- In production or test code:
```python
from api_cache_system import get_cache_instance
cache = get_cache_instance()
cache.optimize_cache_ttl()
```
- You can run automatic cache TTL optimization in the background:

```python
from api_cache_system import get_cache_instance
cache = get_cache_instance()
cache.start_auto_ttl_optimization(interval_sec=600)  # every 10 min
```
- The system will adjust the TTL of endpoints based on usage statistics.
- CPU metrics in monitoring are always available (or 'N/A' if not retrievable)

### Profitability Testing on Real Data

To check if the system yields real profit on your data:

1. Prepare a CSV file with historical data (e.g. `data/test_data.csv`).
   - The file should contain a column with the closing price (e.g. `close`) and features.
2. Run the profitability test:

```bash
python ZoL0-master/test_profitability.py
```

3. Results will appear in the console (including total_profit, sharpe_ratio, win_rate, profit_factor, equity_curve).

- You can also use the `/api/models/profitability` endpoint in `dashboard_api.py` for API testing (POST with X, y data).
- Recommended: regularly run backtests on current market data to monitor strategy effectiveness.
- Test results: total_profit, sharpe_ratio, win_rate, profit_factor, equity_curve.

### Dynamic Take Profit/Stop Loss Thresholds (Adaptive Risk Management)

To increase profits and limit losses, you can implement dynamic TP/SL thresholds based on market volatility:

Example (Python):
```python
import numpy as np

def calculate_dynamic_tp_sl(prices, window=20, tp_factor=2.0, sl_factor=1.0):
    # Calculate volatility (e.g. standard deviation of the last N candles)
    volatility = np.std(prices[-window:])
    take_profit = tp_factor * volatility
    stop_loss = sl_factor * volatility
    return take_profit, stop_loss

# In the trading strategy:
current_prices = [100, 101, 102, 103, 104]  # e.g. list of closes
TP, SL = calculate_dynamic_tp_sl(current_prices)
# Set TP/SL for the new position dynamically
```

Recommended:
- Test different values of `window`, `tp_factor`, `sl_factor` on your data.
- You can automate parameter selection using ML or grid search optimization.
- Implementation: add to your trading code (e.g. `run_live_trading.py`).

### Production Safety Lock

- Set `PRODUCTION_SAFETY_LOCK=1` in your environment to block testnet trading and disabling critical risk checks in production.
- Dashboards will show a warning if this lock is not active in production.

### Automated Alerts

- Slack, email, and Telegram alerts are triggered for API errors, risk check failures, and order errors.
- Configure `SLACK_WEBHOOK_URL`, `EMAIL_*`, and `TELEGRAM_TOKEN`/`TELEGRAM_CHAT_ID` in your `.env`.

### Automated Parameter Optimization

- The system runs scheduled optimization (`auto_optimize_and_log.py`) and logs results to `logs/auto_optimize.log`.
- Best parameters and performance can be reviewed in the dashboard.

### Production Checklist

- [x] PRODUCTION_SAFETY_LOCK enabled in production
- [x] Real data source confirmed (not testnet/demo)
- [x] Critical risk checks enabled
- [x] Alerting configured (Slack/email/Telegram)
- [x] Automated optimization scheduled
- [x] Dashboard warnings visible for any safety issues

## Local Development: Automatic Dashboard/API Startup

To start all dashboards and APIs for local development, use:

```powershell
# Windows PowerShell
python run_dashboard.py
```

This will automatically start the main API server and the Streamlit dashboard. For additional dashboards, see scripts or run them manually as needed.

## Test Coverage & CI/CD
- All core modules and tests are PEP8-compliant, type-annotated, and have 100% test coverage.
- CI/CD runs on all pushes and pull requests (see `.github/workflows/`).
- To run all tests locally:

```powershell
pytest --cov=ZoL0-master --cov-report=term-missing
```

## Requirements
- All dependencies are listed in `requirements.txt`.
- For development, use `requirements-dev.txt` if present.

## Recent Changes (June 2025)
- Full audit and refactor: removed all code holes, enforced PEP8, added type hints, robust logging, and 100% test coverage.
- Patched all test and CI/CD issues. All dashboards/APIs start automatically for local dev.
- See CHANGELOG.md for details.

## WebSocket Setup
- Requires `pybit` and `websockets`.
- See `data/ws_stream.py` for Bybit real-time streaming.

## Environment Variables
- `BYBIT_API_KEY`, `BYBIT_API_SECRET` in `.env`.
- `BYBIT_PRODUCTION_ENABLED`, `BYBIT_SIMULATION`, etc.

## Make Targets
- `make test` – run all tests, coverage ≥ 90%.
- `make optimize` – run Optuna/DEAP optimization.

## Cost-Aware Trading
- See `execution/limit_maker.py` for maker-taker logic.
- Fills tracked, fallback to market after 3 attempts.
- Funding rate filter: avoid long if funding > 0.1%, short if < -0.1% (or halve size).

## 🛡️ Security & Code Quality Quick Wins

### Pre-commit Hooks (Black, Ruff, isort, mypy)

This repository now includes a pre-commit configuration for automatic code formatting, linting, and type checking. To enable it:

```powershell
pip install pre-commit
pre-commit install
```

All pushes and pull requests will be checked for code style and type errors automatically.

### Security Checklist (for all contributors)
- Never commit API keys or secrets to the repository
- Always use `.env` for sensitive configuration
- Run `pre-commit run --all-files` before pushing
- Review dependency updates for CVE/EOL status
- Use only official, up-to-date packages

### Contributing
- See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines
- All new code must pass pre-commit and CI checks
- Add tests for all new features and bugfixes

## Sekrety/API keys

Klucze API muszą być ustawione jako zmienne środowiskowe:

```sh
set BYBIT_API_KEY=your_key
set BYBIT_API_SECRET=your_secret
```

Nie umieszczaj kluczy w kodzie ani w logach! System automatycznie maskuje sekrety w logach (patrz FILTER_KEYS).
#   Q Q Q  
 