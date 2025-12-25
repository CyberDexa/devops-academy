// Project 8: MLOps Pipeline - End to End
// Build a complete MLOps pipeline from data to deployment

import { ProjectGuide } from "../project-guides"

export const project8Guide: ProjectGuide = {
  projectId: "project-8",
  title: "MLOps Pipeline - End to End",
  overview: `Build a complete MLOps pipeline that takes a machine learning model from experimentation to production.
You'll implement data versioning with DVC, experiment tracking with MLflow, automated training pipelines, 
model registry, containerized serving, and CI/CD for ML. This project teaches you how to operationalize 
machine learning in production environments.`,
  difficulty: "advanced",
  totalTime: "15-18 hours",
  prerequisites: [
    "Python programming experience",
    "Basic machine learning concepts",
    "Docker fundamentals",
    "Completed DevOps projects 1-4",
    "Familiarity with Git workflows",
  ],
  techStack: [
    "Python 3.10+",
    "DVC (Data Version Control)",
    "MLflow",
    "Scikit-learn / PyTorch",
    "FastAPI",
    "Docker",
    "GitHub Actions",
    "Kubernetes (optional)",
    "PostgreSQL",
    "MinIO / S3",
  ],
  architecture: `
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              MLOps Pipeline Architecture                                 │
│                                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐    │
│  │                              Data Layer                                          │    │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                          │    │
│  │  │  Raw Data   │───▶│     DVC     │───▶│  Processed  │                          │    │
│  │  │   Storage   │    │  (Version)  │    │    Data     │                          │    │
│  │  └─────────────┘    └─────────────┘    └─────────────┘                          │    │
│  └─────────────────────────────────────────────────────────────────────────────────┘    │
│                                       │                                                  │
│                                       ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐    │
│  │                           Training Pipeline                                      │    │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │    │
│  │  │  Feature    │───▶│   Model     │───▶│   Model     │───▶│   MLflow    │       │    │
│  │  │ Engineering │    │  Training   │    │ Evaluation  │    │  Tracking   │       │    │
│  │  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘       │    │
│  └─────────────────────────────────────────────────────────────────────────────────┘    │
│                                       │                                                  │
│                                       ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐    │
│  │                           Model Registry                                         │    │
│  │  ┌─────────────────────────────────────────────────────────────┐                │    │
│  │  │                    MLflow Model Registry                     │                │    │
│  │  │   Staging ──────▶ Production ──────▶ Archived               │                │    │
│  │  └─────────────────────────────────────────────────────────────┘                │    │
│  └─────────────────────────────────────────────────────────────────────────────────┘    │
│                                       │                                                  │
│                                       ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐    │
│  │                           Serving Layer                                          │    │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                          │    │
│  │  │   FastAPI   │───▶│   Docker    │───▶│ Kubernetes  │                          │    │
│  │  │   Server    │    │  Container  │    │   (K8s)     │                          │    │
│  │  └─────────────┘    └─────────────┘    └─────────────┘                          │    │
│  └─────────────────────────────────────────────────────────────────────────────────┘    │
│                                       │                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐    │
│  │                           Monitoring                                             │    │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                          │    │
│  │  │  Prometheus │    │   Grafana   │    │   Alerts    │                          │    │
│  │  │  (Metrics)  │    │(Dashboards) │    │             │                          │    │
│  │  └─────────────┘    └─────────────┘    └─────────────┘                          │    │
│  └─────────────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────────────┘
`,
  phases: [
    // ============ PHASE 1: PROJECT SETUP ============
    {
      id: "phase-1",
      title: "Project Setup & Data Versioning",
      description: "Set up the MLOps project structure and implement data versioning with DVC.",
      estimatedTime: "2 hours",
      tasks: [
        {
          id: "task-1-1",
          title: "Create Project Structure",
          description: "Set up the MLOps project with proper directory structure.",
          instructions: [
            "Create project directory structure",
            "Set up Python virtual environment",
            "Install core dependencies",
            "Initialize Git and DVC",
          ],
          codeSnippets: [
            {
              language: "bash",
              filename: "setup.sh",
              code: `#!/bin/bash
# Create project structure
mkdir -p mlops-project/{data/{raw,processed,features},models,src/{data,features,models,serving},notebooks,tests,configs,scripts}

cd mlops-project

# Create Python virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install dvc[s3] mlflow scikit-learn pandas numpy fastapi uvicorn python-dotenv pydantic pytest black isort mypy

# Initialize Git
git init

# Initialize DVC
dvc init

# Create .gitignore
cat > .gitignore << 'EOF'
.venv/
__pycache__/
*.pyc
.env
*.pkl
*.joblib
data/raw/*
data/processed/*
data/features/*
!data/*/.gitkeep
models/*
!models/.gitkeep
mlruns/
.ipynb_checkpoints/
dist/
build/
*.egg-info/
EOF

# Create placeholder files
touch data/raw/.gitkeep data/processed/.gitkeep data/features/.gitkeep models/.gitkeep

echo "✅ Project structure created!"`,
            },
            {
              language: "toml",
              filename: "pyproject.toml",
              code: `[project]
name = "mlops-project"
version = "0.1.0"
description = "End-to-end MLOps pipeline"
requires-python = ">=3.10"

dependencies = [
    "dvc[s3]>=3.30.0",
    "mlflow>=2.9.0",
    "scikit-learn>=1.3.0",
    "pandas>=2.0.0",
    "numpy>=1.24.0",
    "fastapi>=0.104.0",
    "uvicorn>=0.24.0",
    "python-dotenv>=1.0.0",
    "pydantic>=2.5.0",
    "joblib>=1.3.0",
    "prometheus-client>=0.19.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.4.0",
    "pytest-cov>=4.1.0",
    "black>=23.11.0",
    "isort>=5.12.0",
    "mypy>=1.7.0",
    "httpx>=0.25.0",
]

[tool.black]
line-length = 100

[tool.isort]
profile = "black"
line_length = 100

[tool.mypy]
python_version = "3.10"
warn_return_any = true
warn_unused_ignores = true`,
            },
          ],
        },
        {
          id: "task-1-2",
          title: "Configure DVC for Data Versioning",
          description: "Set up DVC with remote storage for data versioning.",
          instructions: [
            "Configure DVC remote storage (S3/MinIO)",
            "Create data pipeline stages",
            "Track data files with DVC",
            "Create reproducible data pipeline",
          ],
          codeSnippets: [
            {
              language: "bash",
              filename: "Configure DVC Remote",
              code: `# Option 1: Use S3
dvc remote add -d myremote s3://your-bucket/dvc-storage
dvc remote modify myremote region us-east-1

# Option 2: Use MinIO (local S3-compatible)
docker run -d -p 9000:9000 -p 9001:9001 \\
  --name minio \\
  -e MINIO_ROOT_USER=minioadmin \\
  -e MINIO_ROOT_PASSWORD=minioadmin \\
  minio/minio server /data --console-address ":9001"

# Configure DVC for MinIO
dvc remote add -d minio s3://mlops-data
dvc remote modify minio endpointurl http://localhost:9000
dvc remote modify minio access_key_id minioadmin
dvc remote modify minio secret_access_key minioadmin`,
            },
            {
              language: "yaml",
              filename: "dvc.yaml",
              code: `stages:
  prepare_data:
    cmd: python src/data/prepare.py
    deps:
      - src/data/prepare.py
      - data/raw/dataset.csv
    params:
      - prepare.test_size
      - prepare.random_state
    outs:
      - data/processed/train.csv
      - data/processed/test.csv

  extract_features:
    cmd: python src/features/build_features.py
    deps:
      - src/features/build_features.py
      - data/processed/train.csv
      - data/processed/test.csv
    params:
      - features.numerical_cols
      - features.categorical_cols
    outs:
      - data/features/X_train.npy
      - data/features/X_test.npy
      - data/features/y_train.npy
      - data/features/y_test.npy
      - models/preprocessor.joblib

  train:
    cmd: python src/models/train.py
    deps:
      - src/models/train.py
      - data/features/X_train.npy
      - data/features/y_train.npy
      - models/preprocessor.joblib
    params:
      - train.model_type
      - train.hyperparameters
    outs:
      - models/model.joblib
    metrics:
      - metrics/train_metrics.json:
          cache: false

  evaluate:
    cmd: python src/models/evaluate.py
    deps:
      - src/models/evaluate.py
      - data/features/X_test.npy
      - data/features/y_test.npy
      - models/model.joblib
    metrics:
      - metrics/eval_metrics.json:
          cache: false
    plots:
      - plots/confusion_matrix.png
      - plots/roc_curve.png`,
            },
            {
              language: "yaml",
              filename: "params.yaml",
              code: `prepare:
  test_size: 0.2
  random_state: 42

features:
  numerical_cols:
    - age
    - income
    - balance
  categorical_cols:
    - gender
    - occupation
    - region

train:
  model_type: random_forest
  hyperparameters:
    n_estimators: 100
    max_depth: 10
    min_samples_split: 5
    min_samples_leaf: 2
    random_state: 42

evaluate:
  threshold: 0.5`,
            },
          ],
        },
        {
          id: "task-1-3",
          title: "Implement Data Preparation Pipeline",
          description: "Create the data preparation and feature engineering scripts.",
          instructions: [
            "Create data loading and cleaning script",
            "Implement train/test split",
            "Build feature engineering pipeline",
            "Save preprocessor for inference",
          ],
          codeSnippets: [
            {
              language: "python",
              filename: "src/data/prepare.py",
              code: `"""Data preparation script for MLOps pipeline."""
import logging
from pathlib import Path

import pandas as pd
import yaml
from sklearn.model_selection import train_test_split

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def load_params() -> dict:
    """Load parameters from params.yaml."""
    with open("params.yaml", "r") as f:
        return yaml.safe_load(f)


def prepare_data(input_path: str, output_dir: str, params: dict) -> None:
    """Prepare data by cleaning and splitting into train/test sets."""
    logger.info(f"Loading data from {input_path}")
    df = pd.read_csv(input_path)
    
    # Basic cleaning
    logger.info(f"Original shape: {df.shape}")
    df = df.dropna()
    df = df.drop_duplicates()
    logger.info(f"After cleaning: {df.shape}")
    
    # Split data
    train_df, test_df = train_test_split(
        df,
        test_size=params["prepare"]["test_size"],
        random_state=params["prepare"]["random_state"],
        stratify=df["target"] if "target" in df.columns else None
    )
    
    # Save splits
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    train_df.to_csv(output_path / "train.csv", index=False)
    test_df.to_csv(output_path / "test.csv", index=False)
    
    logger.info(f"Train set: {len(train_df)} samples")
    logger.info(f"Test set: {len(test_df)} samples")


if __name__ == "__main__":
    params = load_params()
    prepare_data(
        input_path="data/raw/dataset.csv",
        output_dir="data/processed",
        params=params
    )`,
            },
            {
              language: "python",
              filename: "src/features/build_features.py",
              code: `"""Feature engineering script."""
import logging
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
import yaml
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def load_params() -> dict:
    with open("params.yaml", "r") as f:
        return yaml.safe_load(f)


def build_preprocessor(numerical_cols: list, categorical_cols: list) -> ColumnTransformer:
    """Build sklearn preprocessing pipeline."""
    numerical_pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler())
    ])
    
    categorical_pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="constant", fill_value="missing")),
        ("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False))
    ])
    
    preprocessor = ColumnTransformer([
        ("numerical", numerical_pipeline, numerical_cols),
        ("categorical", categorical_pipeline, categorical_cols)
    ])
    
    return preprocessor


def build_features(train_path: str, test_path: str, output_dir: str, params: dict) -> None:
    """Build features from processed data."""
    logger.info("Loading processed data")
    train_df = pd.read_csv(train_path)
    test_df = pd.read_csv(test_path)
    
    feature_params = params["features"]
    numerical_cols = feature_params["numerical_cols"]
    categorical_cols = feature_params["categorical_cols"]
    
    # Separate features and target
    target_col = "target"
    X_train = train_df.drop(columns=[target_col])
    y_train = train_df[target_col].values
    X_test = test_df.drop(columns=[target_col])
    y_test = test_df[target_col].values
    
    # Build and fit preprocessor
    logger.info("Building preprocessor")
    preprocessor = build_preprocessor(numerical_cols, categorical_cols)
    
    X_train_processed = preprocessor.fit_transform(X_train)
    X_test_processed = preprocessor.transform(X_test)
    
    logger.info(f"Features shape: {X_train_processed.shape}")
    
    # Save outputs
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    np.save(output_path / "X_train.npy", X_train_processed)
    np.save(output_path / "X_test.npy", X_test_processed)
    np.save(output_path / "y_train.npy", y_train)
    np.save(output_path / "y_test.npy", y_test)
    
    # Save preprocessor for inference
    joblib.dump(preprocessor, "models/preprocessor.joblib")
    logger.info("Preprocessor saved to models/preprocessor.joblib")


if __name__ == "__main__":
    params = load_params()
    build_features(
        train_path="data/processed/train.csv",
        test_path="data/processed/test.csv",
        output_dir="data/features",
        params=params
    )`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 2: EXPERIMENT TRACKING ============
    {
      id: "phase-2",
      title: "Experiment Tracking with MLflow",
      description: "Set up MLflow for experiment tracking and model registry.",
      estimatedTime: "2.5 hours",
      tasks: [
        {
          id: "task-2-1",
          title: "Set Up MLflow Server",
          description: "Deploy MLflow tracking server with database backend.",
          instructions: [
            "Set up PostgreSQL for MLflow backend",
            "Configure artifact storage",
            "Deploy MLflow server with Docker",
            "Configure client to use server",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: "docker-compose.mlflow.yml",
              code: `version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: mlflow
      POSTGRES_PASSWORD: mlflow123
      POSTGRES_DB: mlflow
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U mlflow"]
      interval: 5s
      timeout: 5s
      retries: 5

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin123
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 5s
      timeout: 5s
      retries: 5

  create-bucket:
    image: minio/mc
    depends_on:
      minio:
        condition: service_healthy
    entrypoint: >
      /bin/sh -c "
      mc alias set myminio http://minio:9000 minioadmin minioadmin123;
      mc mb --ignore-existing myminio/mlflow-artifacts;
      exit 0;
      "

  mlflow:
    build:
      context: .
      dockerfile: Dockerfile.mlflow
    depends_on:
      postgres:
        condition: service_healthy
      create-bucket:
        condition: service_completed_successfully
    environment:
      MLFLOW_BACKEND_STORE_URI: postgresql://mlflow:mlflow123@postgres:5432/mlflow
      MLFLOW_ARTIFACT_ROOT: s3://mlflow-artifacts
      AWS_ACCESS_KEY_ID: minioadmin
      AWS_SECRET_ACCESS_KEY: minioadmin123
      MLFLOW_S3_ENDPOINT_URL: http://minio:9000
    ports:
      - "5000:5000"
    command: >
      mlflow server
      --host 0.0.0.0
      --port 5000
      --backend-store-uri postgresql://mlflow:mlflow123@postgres:5432/mlflow
      --default-artifact-root s3://mlflow-artifacts

volumes:
  postgres_data:
  minio_data:`,
            },
            {
              language: "dockerfile",
              filename: "Dockerfile.mlflow",
              code: `FROM python:3.10-slim

RUN pip install --no-cache-dir \\
    mlflow[postgresql]==2.9.0 \\
    boto3 \\
    psycopg2-binary

EXPOSE 5000

CMD ["mlflow", "server", "--host", "0.0.0.0"]`,
            },
          ],
        },
        {
          id: "task-2-2",
          title: "Implement Training with MLflow Tracking",
          description: "Create training script with comprehensive experiment tracking.",
          instructions: [
            "Configure MLflow tracking URI",
            "Log parameters, metrics, and artifacts",
            "Implement model signature",
            "Register model in model registry",
          ],
          codeSnippets: [
            {
              language: "python",
              filename: "src/models/train.py",
              code: `"""Model training script with MLflow tracking."""
import json
import logging
import os
from pathlib import Path

import joblib
import mlflow
import mlflow.sklearn
import numpy as np
import yaml
from mlflow.models.signature import infer_signature
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure MLflow
MLFLOW_TRACKING_URI = os.getenv("MLFLOW_TRACKING_URI", "http://localhost:5000")
mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)


def load_params() -> dict:
    with open("params.yaml", "r") as f:
        return yaml.safe_load(f)


def get_model(model_type: str, hyperparameters: dict):
    """Get model based on type."""
    models = {
        "random_forest": RandomForestClassifier,
        "gradient_boosting": GradientBoostingClassifier,
        "logistic_regression": LogisticRegression,
    }
    
    if model_type not in models:
        raise ValueError(f"Unknown model type: {model_type}")
    
    return models[model_type](**hyperparameters)


def train_model(params: dict) -> None:
    """Train model with MLflow tracking."""
    # Load data
    X_train = np.load("data/features/X_train.npy")
    y_train = np.load("data/features/y_train.npy")
    X_test = np.load("data/features/X_test.npy")
    y_test = np.load("data/features/y_test.npy")
    
    train_params = params["train"]
    model_type = train_params["model_type"]
    hyperparameters = train_params["hyperparameters"]
    
    # Set experiment
    experiment_name = "customer_churn_prediction"
    mlflow.set_experiment(experiment_name)
    
    with mlflow.start_run() as run:
        logger.info(f"MLflow Run ID: {run.info.run_id}")
        
        # Log parameters
        mlflow.log_param("model_type", model_type)
        mlflow.log_params(hyperparameters)
        mlflow.log_param("train_samples", len(X_train))
        mlflow.log_param("test_samples", len(X_test))
        mlflow.log_param("n_features", X_train.shape[1])
        
        # Train model
        logger.info(f"Training {model_type} model...")
        model = get_model(model_type, hyperparameters)
        model.fit(X_train, y_train)
        
        # Predictions
        y_train_pred = model.predict(X_train)
        y_test_pred = model.predict(X_test)
        
        # Calculate metrics
        train_metrics = {
            "train_accuracy": accuracy_score(y_train, y_train_pred),
            "train_f1": f1_score(y_train, y_train_pred, average="weighted"),
            "train_precision": precision_score(y_train, y_train_pred, average="weighted"),
            "train_recall": recall_score(y_train, y_train_pred, average="weighted"),
        }
        
        test_metrics = {
            "test_accuracy": accuracy_score(y_test, y_test_pred),
            "test_f1": f1_score(y_test, y_test_pred, average="weighted"),
            "test_precision": precision_score(y_test, y_test_pred, average="weighted"),
            "test_recall": recall_score(y_test, y_test_pred, average="weighted"),
        }
        
        # Log metrics
        mlflow.log_metrics(train_metrics)
        mlflow.log_metrics(test_metrics)
        
        logger.info(f"Train Accuracy: {train_metrics['train_accuracy']:.4f}")
        logger.info(f"Test Accuracy: {test_metrics['test_accuracy']:.4f}")
        
        # Create model signature
        signature = infer_signature(X_train, y_train_pred)
        
        # Log model with signature
        mlflow.sklearn.log_model(
            model,
            artifact_path="model",
            signature=signature,
            registered_model_name=f"{model_type}_churn_model"
        )
        
        # Save model locally
        joblib.dump(model, "models/model.joblib")
        
        # Save metrics locally for DVC
        Path("metrics").mkdir(exist_ok=True)
        with open("metrics/train_metrics.json", "w") as f:
            json.dump({**train_metrics, **test_metrics}, f, indent=2)
        
        # Log additional artifacts
        mlflow.log_artifact("params.yaml")
        mlflow.log_artifact("models/preprocessor.joblib")
        
        logger.info(f"Model logged to MLflow with run_id: {run.info.run_id}")


if __name__ == "__main__":
    params = load_params()
    train_model(params)`,
            },
          ],
        },
        {
          id: "task-2-3",
          title: "Implement Model Evaluation",
          description: "Create comprehensive model evaluation with visualizations.",
          instructions: [
            "Calculate evaluation metrics",
            "Generate confusion matrix",
            "Create ROC curve",
            "Log plots to MLflow",
          ],
          codeSnippets: [
            {
              language: "python",
              filename: "src/models/evaluate.py",
              code: `"""Model evaluation script with visualization."""
import json
import logging
import os
from pathlib import Path

import joblib
import matplotlib.pyplot as plt
import mlflow
import numpy as np
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_recall_curve,
    roc_auc_score,
    roc_curve,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MLFLOW_TRACKING_URI = os.getenv("MLFLOW_TRACKING_URI", "http://localhost:5000")
mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)


def plot_confusion_matrix(y_true, y_pred, output_path: str) -> None:
    """Plot and save confusion matrix."""
    cm = confusion_matrix(y_true, y_pred)
    
    fig, ax = plt.subplots(figsize=(8, 6))
    im = ax.imshow(cm, interpolation='nearest', cmap=plt.cm.Blues)
    ax.figure.colorbar(im, ax=ax)
    
    ax.set(
        xticks=np.arange(cm.shape[1]),
        yticks=np.arange(cm.shape[0]),
        xlabel='Predicted label',
        ylabel='True label',
        title='Confusion Matrix'
    )
    
    # Add text annotations
    thresh = cm.max() / 2.
    for i in range(cm.shape[0]):
        for j in range(cm.shape[1]):
            ax.text(j, i, format(cm[i, j], 'd'),
                   ha="center", va="center",
                   color="white" if cm[i, j] > thresh else "black")
    
    fig.tight_layout()
    plt.savefig(output_path, dpi=150)
    plt.close()


def plot_roc_curve(y_true, y_prob, output_path: str) -> float:
    """Plot ROC curve and return AUC."""
    fpr, tpr, _ = roc_curve(y_true, y_prob)
    auc = roc_auc_score(y_true, y_prob)
    
    fig, ax = plt.subplots(figsize=(8, 6))
    ax.plot(fpr, tpr, label=f'ROC curve (AUC = {auc:.3f})')
    ax.plot([0, 1], [0, 1], 'k--', label='Random classifier')
    ax.set_xlabel('False Positive Rate')
    ax.set_ylabel('True Positive Rate')
    ax.set_title('ROC Curve')
    ax.legend(loc='lower right')
    ax.grid(True, alpha=0.3)
    
    fig.tight_layout()
    plt.savefig(output_path, dpi=150)
    plt.close()
    
    return auc


def evaluate_model() -> None:
    """Evaluate model and generate reports."""
    # Load test data
    X_test = np.load("data/features/X_test.npy")
    y_test = np.load("data/features/y_test.npy")
    
    # Load model
    model = joblib.load("models/model.joblib")
    
    # Predictions
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1] if hasattr(model, 'predict_proba') else None
    
    # Calculate metrics
    metrics = {
        "accuracy": float(accuracy_score(y_test, y_pred)),
        "f1_score": float(f1_score(y_test, y_pred, average="weighted")),
    }
    
    if y_prob is not None:
        metrics["roc_auc"] = float(roc_auc_score(y_test, y_prob))
    
    logger.info(f"Evaluation metrics: {metrics}")
    
    # Save metrics
    Path("metrics").mkdir(exist_ok=True)
    with open("metrics/eval_metrics.json", "w") as f:
        json.dump(metrics, f, indent=2)
    
    # Generate plots
    Path("plots").mkdir(exist_ok=True)
    plot_confusion_matrix(y_test, y_pred, "plots/confusion_matrix.png")
    
    if y_prob is not None:
        plot_roc_curve(y_test, y_prob, "plots/roc_curve.png")
    
    # Classification report
    report = classification_report(y_test, y_pred)
    logger.info(f"Classification Report:\\n{report}")
    
    with open("metrics/classification_report.txt", "w") as f:
        f.write(report)
    
    # Log to MLflow
    with mlflow.start_run():
        mlflow.log_metrics(metrics)
        mlflow.log_artifacts("plots")
        mlflow.log_artifact("metrics/classification_report.txt")
    
    logger.info("Evaluation complete!")


if __name__ == "__main__":
    evaluate_model()`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 3: MODEL SERVING ============
    {
      id: "phase-3",
      title: "Model Serving with FastAPI",
      description: "Build a production-ready model serving API.",
      estimatedTime: "2.5 hours",
      tasks: [
        {
          id: "task-3-1",
          title: "Create FastAPI Inference Server",
          description: "Build a REST API for model predictions.",
          instructions: [
            "Create FastAPI application",
            "Implement prediction endpoint",
            "Add health checks",
            "Include Prometheus metrics",
          ],
          codeSnippets: [
            {
              language: "python",
              filename: "src/serving/app.py",
              code: `"""FastAPI model serving application."""
import logging
import os
import time
from contextlib import asynccontextmanager
from typing import List, Optional

import joblib
import mlflow
import numpy as np
from fastapi import FastAPI, HTTPException
from prometheus_client import Counter, Histogram, generate_latest
from pydantic import BaseModel, Field
from starlette.responses import Response

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Prometheus metrics
PREDICTION_COUNT = Counter(
    "predictions_total", "Total number of predictions", ["model_version", "status"]
)
PREDICTION_LATENCY = Histogram(
    "prediction_latency_seconds", "Prediction latency in seconds"
)
MODEL_INFO = Counter("model_info", "Model information", ["version", "type"])


class PredictionInput(BaseModel):
    """Input schema for predictions."""
    features: List[float] = Field(..., description="Feature values for prediction")
    
    class Config:
        json_schema_extra = {
            "example": {
                "features": [35, 50000, 10000, 1, 2, 3]
            }
        }


class PredictionOutput(BaseModel):
    """Output schema for predictions."""
    prediction: int
    probability: Optional[float] = None
    model_version: str
    latency_ms: float


class BatchPredictionInput(BaseModel):
    """Input schema for batch predictions."""
    instances: List[List[float]]


class BatchPredictionOutput(BaseModel):
    """Output schema for batch predictions."""
    predictions: List[int]
    probabilities: Optional[List[float]] = None
    model_version: str
    latency_ms: float


class ModelService:
    """Service for managing model loading and predictions."""
    
    def __init__(self):
        self.model = None
        self.preprocessor = None
        self.model_version = "unknown"
        self.model_type = "unknown"
    
    def load_model(self, model_path: str = None, mlflow_uri: str = None):
        """Load model from file or MLflow."""
        if mlflow_uri:
            # Load from MLflow Model Registry
            mlflow.set_tracking_uri(os.getenv("MLFLOW_TRACKING_URI", "http://localhost:5000"))
            self.model = mlflow.sklearn.load_model(mlflow_uri)
            self.model_version = mlflow_uri.split("/")[-1]
        else:
            # Load from local file
            model_path = model_path or "models/model.joblib"
            self.model = joblib.load(model_path)
            self.model_version = "local"
        
        # Load preprocessor
        preprocessor_path = os.getenv("PREPROCESSOR_PATH", "models/preprocessor.joblib")
        if os.path.exists(preprocessor_path):
            self.preprocessor = joblib.load(preprocessor_path)
        
        self.model_type = type(self.model).__name__
        logger.info(f"Loaded model: {self.model_type} (version: {self.model_version})")
        MODEL_INFO.labels(version=self.model_version, type=self.model_type).inc()
    
    def predict(self, features: np.ndarray) -> tuple:
        """Make prediction."""
        if self.model is None:
            raise RuntimeError("Model not loaded")
        
        prediction = self.model.predict(features)
        probability = None
        
        if hasattr(self.model, 'predict_proba'):
            proba = self.model.predict_proba(features)
            probability = proba[:, 1].tolist()
        
        return prediction.tolist(), probability


model_service = ModelService()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager."""
    # Startup
    model_uri = os.getenv("MODEL_URI", "models/Production/latest")
    mlflow_uri = os.getenv("MLFLOW_MODEL_URI")
    
    try:
        model_service.load_model(model_path=model_uri, mlflow_uri=mlflow_uri)
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
        # Try loading local model as fallback
        model_service.load_model(model_path="models/model.joblib")
    
    yield
    # Shutdown
    logger.info("Shutting down...")


app = FastAPI(
    title="ML Model Serving API",
    description="Production ML model inference API",
    version="1.0.0",
    lifespan=lifespan
)


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "model_loaded": model_service.model is not None,
        "model_version": model_service.model_version
    }


@app.get("/ready")
async def ready():
    """Readiness check endpoint."""
    if model_service.model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return {"status": "ready"}


@app.get("/metrics")
async def metrics():
    """Prometheus metrics endpoint."""
    return Response(content=generate_latest(), media_type="text/plain")


@app.post("/predict", response_model=PredictionOutput)
async def predict(input_data: PredictionInput):
    """Single prediction endpoint."""
    start_time = time.time()
    
    try:
        features = np.array([input_data.features])
        predictions, probabilities = model_service.predict(features)
        
        latency = (time.time() - start_time) * 1000
        PREDICTION_LATENCY.observe(latency / 1000)
        PREDICTION_COUNT.labels(
            model_version=model_service.model_version, status="success"
        ).inc()
        
        return PredictionOutput(
            prediction=predictions[0],
            probability=probabilities[0] if probabilities else None,
            model_version=model_service.model_version,
            latency_ms=round(latency, 2)
        )
    except Exception as e:
        PREDICTION_COUNT.labels(
            model_version=model_service.model_version, status="error"
        ).inc()
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict/batch", response_model=BatchPredictionOutput)
async def predict_batch(input_data: BatchPredictionInput):
    """Batch prediction endpoint."""
    start_time = time.time()
    
    try:
        features = np.array(input_data.instances)
        predictions, probabilities = model_service.predict(features)
        
        latency = (time.time() - start_time) * 1000
        PREDICTION_LATENCY.observe(latency / 1000)
        PREDICTION_COUNT.labels(
            model_version=model_service.model_version, status="success"
        ).inc(len(input_data.instances))
        
        return BatchPredictionOutput(
            predictions=predictions,
            probabilities=probabilities,
            model_version=model_service.model_version,
            latency_ms=round(latency, 2)
        )
    except Exception as e:
        PREDICTION_COUNT.labels(
            model_version=model_service.model_version, status="error"
        ).inc()
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/model/info")
async def model_info():
    """Get model information."""
    return {
        "model_version": model_service.model_version,
        "model_type": model_service.model_type,
        "preprocessor_loaded": model_service.preprocessor is not None
    }`,
            },
            {
              language: "dockerfile",
              filename: "Dockerfile.serving",
              code: `FROM python:3.10-slim

WORKDIR /app

# Install dependencies
COPY requirements-serving.txt .
RUN pip install --no-cache-dir -r requirements-serving.txt

# Copy application
COPY src/serving ./src/serving
COPY models ./models

ENV PYTHONPATH=/app
ENV PORT=8000

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
    CMD curl -f http://localhost:8000/health || exit 1

CMD ["uvicorn", "src.serving.app:app", "--host", "0.0.0.0", "--port", "8000"]`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 4: CI/CD FOR ML ============
    {
      id: "phase-4",
      title: "CI/CD for Machine Learning",
      description: "Build automated pipelines for ML training and deployment.",
      estimatedTime: "2.5 hours",
      tasks: [
        {
          id: "task-4-1",
          title: "Create GitHub Actions Workflow",
          description: "Implement CI/CD pipeline for ML projects.",
          instructions: [
            "Create workflow for testing and linting",
            "Add DVC pipeline execution",
            "Automate model training on data changes",
            "Deploy model to serving infrastructure",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: ".github/workflows/ml-pipeline.yml",
              code: `name: ML Pipeline

on:
  push:
    branches: [main, develop]
    paths:
      - 'src/**'
      - 'data/**'
      - 'params.yaml'
      - 'dvc.yaml'
  pull_request:
    branches: [main]
  workflow_dispatch:
    inputs:
      run_training:
        description: 'Force run training pipeline'
        required: false
        default: 'false'

env:
  PYTHON_VERSION: '3.10'
  MLFLOW_TRACKING_URI: \${{ secrets.MLFLOW_TRACKING_URI }}

jobs:
  test:
    name: 🧪 Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: \${{ env.PYTHON_VERSION }}
          cache: 'pip'

      - name: Install dependencies
        run: |
          pip install -e ".[dev]"

      - name: Run linting
        run: |
          black --check src tests
          isort --check-only src tests
          mypy src

      - name: Run tests
        run: |
          pytest tests/ -v --cov=src --cov-report=xml

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage.xml

  train:
    name: 🏋️ Train Model
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.event.inputs.run_training == 'true'
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: \${{ env.PYTHON_VERSION }}
          cache: 'pip'

      - name: Install dependencies
        run: pip install -e .

      - name: Configure DVC
        run: |
          dvc remote modify myremote access_key_id \${{ secrets.AWS_ACCESS_KEY_ID }}
          dvc remote modify myremote secret_access_key \${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: Pull data
        run: dvc pull

      - name: Run DVC pipeline
        env:
          MLFLOW_TRACKING_URI: \${{ secrets.MLFLOW_TRACKING_URI }}
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          dvc repro

      - name: Push DVC outputs
        run: dvc push

      - name: Upload metrics
        uses: actions/upload-artifact@v3
        with:
          name: metrics
          path: |
            metrics/
            plots/

  deploy:
    name: 🚀 Deploy Model
    needs: train
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Login to ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and push Docker image
        env:
          ECR_REGISTRY: \${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: \${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/ml-serving:$IMAGE_TAG -f Dockerfile.serving .
          docker push $ECR_REGISTRY/ml-serving:$IMAGE_TAG
          docker tag $ECR_REGISTRY/ml-serving:$IMAGE_TAG $ECR_REGISTRY/ml-serving:latest
          docker push $ECR_REGISTRY/ml-serving:latest

      - name: Deploy to ECS
        run: |
          aws ecs update-service \\
            --cluster ml-cluster \\
            --service ml-serving \\
            --force-new-deployment`,
            },
          ],
        },
        {
          id: "task-4-2",
          title: "Model Registry and Promotion",
          description: "Implement model versioning and stage promotion.",
          instructions: [
            "Create model promotion script",
            "Implement model comparison",
            "Add automated model validation",
            "Configure stage transitions",
          ],
          codeSnippets: [
            {
              language: "python",
              filename: "scripts/promote_model.py",
              code: `"""Script to promote model through MLflow stages."""
import argparse
import logging
import mlflow
from mlflow.tracking import MlflowClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_latest_model_version(client: MlflowClient, model_name: str, stage: str = None) -> str:
    """Get the latest version of a model, optionally filtered by stage."""
    versions = client.search_model_versions(f"name='{model_name}'")
    
    if stage:
        versions = [v for v in versions if v.current_stage == stage]
    
    if not versions:
        return None
    
    return max(versions, key=lambda v: int(v.version))


def compare_models(client: MlflowClient, model_name: str, 
                   candidate_version: str, production_version: str) -> bool:
    """Compare candidate model against production model."""
    candidate = client.get_model_version(model_name, candidate_version)
    production = client.get_model_version(model_name, production_version)
    
    # Get runs to compare metrics
    candidate_run = client.get_run(candidate.run_id)
    production_run = client.get_run(production.run_id)
    
    candidate_metrics = candidate_run.data.metrics
    production_metrics = production_run.data.metrics
    
    # Compare key metrics
    candidate_f1 = candidate_metrics.get("test_f1", 0)
    production_f1 = production_metrics.get("test_f1", 0)
    
    logger.info(f"Candidate F1: {candidate_f1:.4f}")
    logger.info(f"Production F1: {production_f1:.4f}")
    
    # Candidate must be better or within 1% to be promoted
    return candidate_f1 >= production_f1 * 0.99


def promote_model(model_name: str, version: str, target_stage: str, 
                  archive_existing: bool = True) -> None:
    """Promote a model version to a target stage."""
    client = MlflowClient()
    
    # If promoting to Production, compare with existing
    if target_stage == "Production":
        prod_version = get_latest_model_version(client, model_name, "Production")
        if prod_version:
            if not compare_models(client, model_name, version, prod_version.version):
                logger.warning("Candidate model is not better than production. Aborting.")
                return
    
    # Transition model
    client.transition_model_version_stage(
        name=model_name,
        version=version,
        stage=target_stage,
        archive_existing_versions=archive_existing
    )
    
    logger.info(f"Model {model_name} version {version} promoted to {target_stage}")
    
    # Add description
    client.update_model_version(
        name=model_name,
        version=version,
        description=f"Promoted to {target_stage} via automated pipeline"
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Promote ML model through stages")
    parser.add_argument("--model-name", required=True, help="Name of the registered model")
    parser.add_argument("--version", required=True, help="Version to promote")
    parser.add_argument("--stage", required=True, choices=["Staging", "Production", "Archived"])
    parser.add_argument("--no-archive", action="store_true", help="Don't archive existing versions")
    
    args = parser.parse_args()
    
    promote_model(
        model_name=args.model_name,
        version=args.version,
        target_stage=args.stage,
        archive_existing=not args.no_archive
    )`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 5: MONITORING ============
    {
      id: "phase-5",
      title: "Model Monitoring",
      description: "Implement model performance and data drift monitoring.",
      estimatedTime: "2 hours",
      tasks: [
        {
          id: "task-5-1",
          title: "Implement Prediction Monitoring",
          description: "Track model predictions and detect data drift.",
          instructions: [
            "Create monitoring dashboard",
            "Implement prediction logging",
            "Add data drift detection",
            "Set up alerting",
          ],
          codeSnippets: [
            {
              language: "python",
              filename: "src/monitoring/drift_detector.py",
              code: `"""Data drift detection module."""
import logging
from typing import Dict, List, Optional

import numpy as np
from scipy import stats

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DriftDetector:
    """Detect data drift using statistical tests."""
    
    def __init__(self, reference_data: np.ndarray, significance_level: float = 0.05):
        self.reference_data = reference_data
        self.significance_level = significance_level
        self.reference_stats = self._compute_stats(reference_data)
    
    def _compute_stats(self, data: np.ndarray) -> Dict:
        """Compute statistics for data."""
        return {
            "mean": np.mean(data, axis=0),
            "std": np.std(data, axis=0),
            "min": np.min(data, axis=0),
            "max": np.max(data, axis=0),
            "quantiles": np.percentile(data, [25, 50, 75], axis=0)
        }
    
    def detect_drift(self, current_data: np.ndarray) -> Dict:
        """Detect drift using Kolmogorov-Smirnov test."""
        results = {
            "drift_detected": False,
            "drifted_features": [],
            "p_values": [],
            "statistics": []
        }
        
        n_features = self.reference_data.shape[1]
        
        for i in range(n_features):
            stat, p_value = stats.ks_2samp(
                self.reference_data[:, i],
                current_data[:, i]
            )
            
            results["p_values"].append(p_value)
            results["statistics"].append(stat)
            
            if p_value < self.significance_level:
                results["drift_detected"] = True
                results["drifted_features"].append(i)
                logger.warning(f"Drift detected in feature {i}: p-value={p_value:.4f}")
        
        return results
    
    def detect_prediction_drift(self, 
                                reference_predictions: np.ndarray,
                                current_predictions: np.ndarray) -> Dict:
        """Detect drift in model predictions."""
        stat, p_value = stats.ks_2samp(reference_predictions, current_predictions)
        
        result = {
            "drift_detected": p_value < self.significance_level,
            "p_value": p_value,
            "statistic": stat
        }
        
        if result["drift_detected"]:
            logger.warning(f"Prediction drift detected: p-value={p_value:.4f}")
        
        return result


class PerformanceMonitor:
    """Monitor model performance over time."""
    
    def __init__(self, baseline_metrics: Dict[str, float]):
        self.baseline_metrics = baseline_metrics
        self.performance_history: List[Dict] = []
    
    def log_performance(self, metrics: Dict[str, float], timestamp: str) -> None:
        """Log performance metrics."""
        self.performance_history.append({
            "timestamp": timestamp,
            "metrics": metrics
        })
    
    def check_degradation(self, current_metrics: Dict[str, float], 
                          threshold: float = 0.1) -> Dict:
        """Check if performance has degraded beyond threshold."""
        degraded_metrics = {}
        
        for metric_name, current_value in current_metrics.items():
            if metric_name in self.baseline_metrics:
                baseline_value = self.baseline_metrics[metric_name]
                relative_change = (baseline_value - current_value) / baseline_value
                
                if relative_change > threshold:
                    degraded_metrics[metric_name] = {
                        "baseline": baseline_value,
                        "current": current_value,
                        "degradation": relative_change
                    }
                    logger.warning(
                        f"Performance degradation in {metric_name}: "
                        f"{baseline_value:.4f} -> {current_value:.4f} "
                        f"({relative_change*100:.1f}% decrease)"
                    )
        
        return {
            "degraded": len(degraded_metrics) > 0,
            "degraded_metrics": degraded_metrics
        }`,
            },
          ],
        },
      ],
    },
  ],
  bonusChallenges: [
    "Implement A/B testing for model comparison",
    "Add feature store with Feast",
    "Implement online learning for model updates",
    "Add explainability with SHAP",
    "Deploy to Kubernetes with Seldon Core",
    "Implement multi-model serving",
    "Add GPU inference support",
    "Create automated retraining triggers",
  ],
  submissionChecklist: [
    "Complete DVC pipeline with data versioning",
    "MLflow tracking server running",
    "Experiment tracking with logged metrics",
    "Model registry with stage transitions",
    "FastAPI serving with health checks",
    "Docker container for inference",
    "CI/CD pipeline for training",
    "Automated model deployment",
    "Prometheus metrics exposed",
    "Monitoring dashboard (Grafana)",
    "Model card documentation",
    "API documentation (Swagger)",
    "Video demo (15 min)",
  ],
}
