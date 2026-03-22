# Python Domain

Rules for writing idiomatic, maintainable Python.

---

## When to Use What

### Python Version

| Need | Use |
|------|-----|
| Start a new Python project | [define yours] |
| Pin the Python version in a project | [define yours] |

### Package Management

| Need | Use |
|------|-----|
| Manage Python dependencies or versions | [define yours] |
| Reproducible builds | [define yours] |
| Specify Python dependencies | [define yours] |

### Linting and Formatting

| Need | Use |
|------|-----|
| Lint or format Python | [define yours] |
| Code style defaults | [define yours] |

### Type Checking

| Need | Requirement |
|------|-------------|
| Write production Python | A type checker **MUST** be used |
| Type-check Python | [define yours] |
| Write production Python code | Type hints **MUST** be used for all function signatures |
| Write notebooks or exploratory scripts | Type checking **MAY** be relaxed |
| Use Python 3.10+ | [define yours] |

### Task Runners

| Need | Use |
|------|-----|
| Task runner for Python projects | [define yours] |

### Testing

| Need | Use |
|------|-----|
| Test Python code | [define yours] |
| Deploy ML models | [define yours] |
| Deploy new ML model versions | [define yours] |
| Run ML models in production | [define yours] |
| Validate DataFrames or data pipelines | **SHOULD** [define yours] |

### HTTP Client

| Need | Use |
|------|-----|
| HTTP client in Python | [define yours] |
| New Python code requiring HTTP requests | [define yours] |

### Web Frameworks

| Need | Use |
|------|-----|
| Build Python web APIs | [define yours] |

### Data Validation & Configuration

| Need | Use |
|------|-----|
| Validate data in Python | [define yours] |
| Manage application config or environment variables | [define yours] |

### Data Libraries

| Need | Use |
|------|-----|
| Work with tabular data | [define yours] |
| Numerical computing | [define yours] |
| High-performance processing on large datasets | Consider [define yours] |

### Data Formats

| Need | Use |
|------|-----|
| Store or exchange tabular data | [define yours] |
| Fast read/write for intermediate data | [define yours] |
| Compression for long-term storage or data lakes | [define yours] |

### Database Clients

| Need | Use |
|------|-----|
| Query ClickHouse from Python | [define yours] |

### Machine Learning

| Need | Use |
|------|-----|
| Deep learning | [define yours] |
| Classical ML | [define yours] |
| Gradient boosting | [define yours] |
| Transformers / LLMs | [define yours] |
| Start a new deep learning project | [define yours] |

### Model Serving & Inference

| Need | Use |
|------|-----|
| Serve models at the edge | [define yours] |
| Serve models via API in core infrastructure | [define yours] |
| Serverless GPU inference | [define yours] |
| High-throughput LLM inference | [define yours] |

### Experiment Tracking & MLOps

| Need | Use |
|------|-----|
| Track ML experiments | [define yours] |
| Orchestrate ML workflows | [define yours] |
| Version trained models | Register in [define yours] |
| Deploy new ML models | **SHOULD** [define yours] |
| Promote models to production | **SHOULD** [define yours] |

### Notebooks

| Need | Use |
|------|-----|
| Interactive notebooks | [define yours] |
| Reactive, git-friendly notebooks | Consider [define yours] |
| Develop Python packages from notebooks | Consider [define yours] |
| Run notebooks in production | [define yours] |
| Commit notebook outputs | Ensure [define yours] |

### CI/CD

| Need | Use |
|------|-----|
| Run Python CI | [define yours] |
| Verify dependency lock integrity in CI | [define yours] |

### Anti-Patterns

| Bad | Why | Instead |
|-----|-----|---------|
| `import *` | Pollutes namespace, hides dependencies | Explicit imports only |
| `requirements.txt` without pinning | Non-reproducible builds | Pin with lock file |
| Bare `except:` | Swallows all exceptions silently | Catch specific types (see PYTHON-003) |
| `print()` in production | No level, no structure, not filterable | `logging` module (see PYTHON-006) |
| Mutable default arguments `def f(x=[])` | Shared state across calls | Use `None` sentinel |
| `os.path` string joins | Error-prone, non-portable | `pathlib.Path` (see PYTHON-004) |
| Plain `dict` for structured data | No schema, no autocomplete | `dataclass` or Pydantic (see PYTHON-002) |
| [define yours] | [define yours] | [define yours] |

---

### PYTHON-001: Use type annotations on all public functions and methods


**Rule**: All public functions, methods, and class attributes must have type annotations. Private helpers should be annotated where the type is non-obvious.

**Rationale**: Type annotations serve as machine-checked documentation, enable static analysis (mypy, pyright), and improve IDE autocompletion. They reduce onboarding time and catch type errors before runtime.

**Good example**:
```python
def process_payment(amount: Decimal, currency: str, user_id: int) -> PaymentResult:
    ...
```

**Bad example**:
```python
def process_payment(amount, currency, user_id):
    ...
```


### PYTHON-002: Use dataclasses or Pydantic models over plain dicts for structured data


**Rule**: When passing structured data between functions or across module boundaries, use a dataclass, Pydantic model, or named tuple — not a plain `dict`.

**Rationale**: Plain dicts have no schema enforcement, no autocompletion, and no documentation. Structured types make the data contract explicit and catch field name typos at development time.

**Good example**:
```python
from dataclasses import dataclass

@dataclass
class UserProfile:
    user_id: int
    email: str
    name: str

def send_welcome_email(profile: UserProfile) -> None:
    ...
```

**Bad example**:
```python
def send_welcome_email(user: dict) -> None:
    # Which keys does this expect? No way to know without reading the body.
    email = user["email"]
```


### PYTHON-003: Prefer explicit exception types over bare `except`


**Rule**: Always catch specific exception types. Never use bare `except:` or `except Exception:` unless you are logging and re-raising.

**Rationale**: Bare `except` silently swallows `KeyboardInterrupt`, `SystemExit`, and programming errors. It hides bugs and makes debugging extremely difficult.

**Good example**:
```python
try:
    result = fetch_user(user_id)
except UserNotFoundError:
    return None
except NetworkError as e:
    logger.warning("fetch_user failed", exc_info=e)
    raise
```

**Bad example**:
```python
try:
    result = fetch_user(user_id)
except:  # catches everything including KeyboardInterrupt
    return None
```


### PYTHON-004: Use `pathlib.Path` instead of `os.path` for file operations


**Rule**: Use `pathlib.Path` for all file and directory operations. Avoid `os.path`, `os.getcwd()`, and string concatenation for paths.

**Rationale**: `pathlib` is the modern, object-oriented path API. It is cross-platform, composable, and significantly more readable than `os.path` string manipulation.

**Good example**:
```python
from pathlib import Path

config_file = Path(__file__).parent / "config" / "settings.yaml"
if config_file.exists():
    content = config_file.read_text()
```

**Bad example**:
```python
import os
config_file = os.path.join(os.path.dirname(__file__), "config", "settings.yaml")
if os.path.exists(config_file):
    with open(config_file) as f:
        content = f.read()
```


### PYTHON-005: Pin direct dependencies; do not pin transitive dependencies


**Rule**: In `pyproject.toml` or `requirements.in`, pin exact versions (`==`) for direct dependencies in production services. Use version ranges for libraries. Generate a lock file for reproducible installs.

**Rationale**: Unpinned dependencies silently break when upstream packages release new versions. Locking ensures reproducible builds and makes upgrades deliberate and reviewable.

**Good example**:
```toml
# pyproject.toml (application)
[tool.poetry.dependencies]
fastapi = "0.111.0"
pydantic = "2.7.1"
```

**Bad example**:
```
# requirements.txt (application)
fastapi
pydantic>=1.0
# No pins — installs whatever is latest at build time
```


### PYTHON-006: Use `logging` module, not `print`, for diagnostic output


**Rule**: All diagnostic and operational output must use the `logging` module with structured fields. `print()` statements are not permitted in production code.

**Rationale**: `print()` has no log level, no structured context, and cannot be configured or filtered at runtime. The `logging` module integrates with observability pipelines and supports structured JSON output.

**Good example**:
```python
import logging
logger = logging.getLogger(__name__)

logger.info("Processing order", extra={"order_id": order.id, "amount": order.amount})
```

**Bad example**:
```python
print(f"Processing order {order.id}")  # no level, no structure, no filtering
```


### PYTHON-007: [Scaffold] Define async vs sync usage policy


**Rule**: <!-- Define when to use async/await vs threading vs multiprocessing in your services -->

**Rationale**: <!-- Mixing sync and async code incorrectly causes blocking, deadlocks, and subtle bugs -->


### PYTHON-008: [Scaffold] Set standards for virtual environment and tooling


**Rule**: <!-- Define your org's standard for managing Python virtual environments (e.g., uv, poetry, pyenv) -->


### PYTHON-009: [Scaffold] Define linter and formatter configuration


**Rule**: <!-- Define the required linters (e.g., ruff, flake8) and formatters (e.g., black, ruff format) and their configuration -->


### PYTHON-010: [Scaffold] Define testing framework and coverage requirements


**Rule**: <!-- Define your standard testing framework (pytest) and minimum coverage thresholds -->
