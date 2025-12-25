// Project 9: Real-Time ML System
// Build a real-time machine learning inference system with streaming

import { ProjectGuide } from "../project-guides"

export const project9Guide: ProjectGuide = {
  projectId: "project-9",
  title: "Real-Time ML Inference System",
  overview: `Build a production real-time machine learning inference system that processes streaming data.
This project covers feature stores, Kafka streaming, low-latency inference, A/B testing, canary deployments,
model monitoring, and drift detection. You'll learn how to deploy ML models that serve predictions in 
real-time at scale.`,
  difficulty: "advanced",
  totalTime: "20-25 hours",
  prerequisites: [
    "Completed MLOps Project 8",
    "Strong Python programming skills",
    "Kubernetes experience",
    "Understanding of streaming systems",
    "Familiarity with ML model serving",
  ],
  techStack: [
    "Python 3.10+",
    "Apache Kafka",
    "Redis (Feature Store)",
    "Feast",
    "FastAPI / gRPC",
    "Kubernetes",
    "Prometheus / Grafana",
    "Seldon Core / KServe",
    "Docker",
    "PostgreSQL",
  ],
  architecture: `
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           Real-Time ML Inference Architecture                                    │
│                                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐    │
│  │                              Data Ingestion Layer                                        │    │
│  │  ┌─────────────┐    ┌─────────────────────────┐    ┌─────────────────────┐             │    │
│  │  │  Event      │───▶│       Apache Kafka      │───▶│   Stream Processor  │             │    │
│  │  │  Sources    │    │    (Event Streaming)    │    │   (Feature Extract) │             │    │
│  │  └─────────────┘    └─────────────────────────┘    └─────────────────────┘             │    │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘    │
│                                          │                                                       │
│                                          ▼                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐    │
│  │                              Feature Store Layer                                         │    │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────┐    │    │
│  │  │                              Feast Feature Store                                 │    │    │
│  │  │  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐                    │    │    │
│  │  │  │ Online Store  │    │ Offline Store │    │ Feature       │                    │    │    │
│  │  │  │ (Redis)       │    │ (S3/Parquet)  │    │ Registry      │                    │    │    │
│  │  │  └───────────────┘    └───────────────┘    └───────────────┘                    │    │    │
│  │  └─────────────────────────────────────────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘    │
│                                          │                                                       │
│                                          ▼                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐    │
│  │                              Inference Layer                                             │    │
│  │  ┌─────────────┐    ┌─────────────────────────────────────┐    ┌─────────────────┐     │    │
│  │  │  Request    │───▶│        Model Serving (KServe)       │───▶│  Response       │     │    │
│  │  │  Router     │    │  ┌─────────┐    ┌─────────┐         │    │  Handler        │     │    │
│  │  │  (Istio)    │    │  │Model A  │    │Model B  │         │    │                 │     │    │
│  │  └─────────────┘    │  │(Canary) │    │(Stable) │         │    └─────────────────┘     │    │
│  │        │            │  └─────────┘    └─────────┘         │                            │    │
│  │        │            └─────────────────────────────────────┘                            │    │
│  │        ▼                                                                               │    │
│  │  ┌─────────────────────────────────────────┐                                          │    │
│  │  │        A/B Test Controller              │                                          │    │
│  │  │   Traffic: 90% Model B, 10% Model A     │                                          │    │
│  │  └─────────────────────────────────────────┘                                          │    │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘    │
│                                          │                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐    │
│  │                              Monitoring Layer                                            │    │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐      │    │
│  │  │ Prometheus  │    │   Grafana   │    │   Drift     │    │  Alert Manager      │      │    │
│  │  │ (Metrics)   │    │(Dashboards) │    │  Detection  │    │  (PagerDuty)        │      │    │
│  │  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────────────┘      │    │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
`,
  phases: [
    // ============ PHASE 1: STREAMING INFRASTRUCTURE ============
    {
      id: "phase-1",
      title: "Streaming Infrastructure",
      description: "Set up Kafka and streaming data pipeline for real-time ML.",
      estimatedTime: "3 hours",
      tasks: [
        {
          id: "task-1-1",
          title: "Deploy Kafka Cluster",
          description: "Set up Apache Kafka for event streaming.",
          instructions: [
            "Deploy Kafka with Docker Compose",
            "Create topics for events and predictions",
            "Configure producers and consumers",
            "Set up Kafka Connect for data ingestion",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: "docker-compose.kafka.yml",
              code: `version: '3.8'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - "2181:2181"
    healthcheck:
      test: echo srvr | nc localhost 2181 || exit 1
      interval: 10s
      timeout: 10s
      retries: 5

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    depends_on:
      zookeeper:
        condition: service_healthy
    ports:
      - "9092:9092"
      - "9101:9101"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      KAFKA_JMX_PORT: 9101
      KAFKA_JMX_HOSTNAME: localhost
    healthcheck:
      test: kafka-topics --bootstrap-server kafka:29092 --list
      interval: 10s
      timeout: 10s
      retries: 5

  schema-registry:
    image: confluentinc/cp-schema-registry:7.5.0
    depends_on:
      kafka:
        condition: service_healthy
    ports:
      - "8081:8081"
    environment:
      SCHEMA_REGISTRY_HOST_NAME: schema-registry
      SCHEMA_REGISTRY_KAFKASTORE_BOOTSTRAP_SERVERS: kafka:29092
      SCHEMA_REGISTRY_LISTENERS: http://0.0.0.0:8081

  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    depends_on:
      kafka:
        condition: service_healthy
    ports:
      - "8080:8080"
    environment:
      KAFKA_CLUSTERS_0_NAME: local
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:29092
      KAFKA_CLUSTERS_0_SCHEMAREGISTRY: http://schema-registry:8081`,
            },
            {
              language: "bash",
              filename: "scripts/setup_kafka_topics.sh",
              code: `#!/bin/bash
# Create Kafka topics for ML pipeline

KAFKA_BOOTSTRAP=localhost:9092

# Create topics
kafka-topics --create --bootstrap-server $KAFKA_BOOTSTRAP \\
    --topic user-events \\
    --partitions 6 \\
    --replication-factor 1 \\
    --config retention.ms=604800000

kafka-topics --create --bootstrap-server $KAFKA_BOOTSTRAP \\
    --topic feature-updates \\
    --partitions 3 \\
    --replication-factor 1

kafka-topics --create --bootstrap-server $KAFKA_BOOTSTRAP \\
    --topic prediction-requests \\
    --partitions 6 \\
    --replication-factor 1

kafka-topics --create --bootstrap-server $KAFKA_BOOTSTRAP \\
    --topic prediction-results \\
    --partitions 6 \\
    --replication-factor 1

kafka-topics --create --bootstrap-server $KAFKA_BOOTSTRAP \\
    --topic model-metrics \\
    --partitions 3 \\
    --replication-factor 1

echo "✅ Kafka topics created!"
kafka-topics --list --bootstrap-server $KAFKA_BOOTSTRAP`,
            },
          ],
        },
        {
          id: "task-1-2",
          title: "Build Stream Processor",
          description: "Create Python stream processor for feature extraction.",
          instructions: [
            "Create Kafka consumer for events",
            "Implement feature extraction logic",
            "Publish features to feature store",
            "Handle backpressure and errors",
          ],
          codeSnippets: [
            {
              language: "python",
              filename: "src/streaming/processor.py",
              code: `"""Kafka stream processor for real-time feature extraction."""
import json
import logging
import os
from dataclasses import dataclass
from datetime import datetime
from typing import Any, Dict, Optional

import redis
from confluent_kafka import Consumer, Producer, KafkaError
from prometheus_client import Counter, Histogram, start_http_server

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Metrics
EVENTS_PROCESSED = Counter("events_processed_total", "Total events processed", ["topic", "status"])
PROCESSING_LATENCY = Histogram("processing_latency_seconds", "Processing latency in seconds")


@dataclass
class ProcessorConfig:
    kafka_bootstrap: str = "localhost:9092"
    consumer_group: str = "feature-processor"
    input_topic: str = "user-events"
    output_topic: str = "feature-updates"
    redis_host: str = "localhost"
    redis_port: int = 6379


class FeatureExtractor:
    """Extract features from raw events."""
    
    def __init__(self, redis_client: redis.Redis):
        self.redis = redis_client
    
    def extract_features(self, event: Dict[str, Any]) -> Dict[str, Any]:
        """Extract features from an event."""
        user_id = event.get("user_id")
        
        # Get user history from Redis
        user_history = self._get_user_history(user_id)
        
        features = {
            "user_id": user_id,
            "timestamp": datetime.utcnow().isoformat(),
            # Session features
            "session_duration": event.get("session_duration", 0),
            "page_views": event.get("page_views", 0),
            # Historical features
            "total_purchases": user_history.get("total_purchases", 0),
            "avg_order_value": user_history.get("avg_order_value", 0),
            "days_since_last_purchase": user_history.get("days_since_last_purchase", 999),
            # Computed features
            "purchase_frequency": self._compute_frequency(user_history),
            "engagement_score": self._compute_engagement(event),
        }
        
        return features
    
    def _get_user_history(self, user_id: str) -> Dict:
        """Get user history from Redis."""
        try:
            data = self.redis.hgetall(f"user:{user_id}")
            return {k.decode(): float(v.decode()) for k, v in data.items()}
        except Exception:
            return {}
    
    def _compute_frequency(self, history: Dict) -> float:
        total = history.get("total_purchases", 0)
        days = history.get("days_as_customer", 1)
        return total / max(days, 1) * 30  # Monthly frequency
    
    def _compute_engagement(self, event: Dict) -> float:
        """Compute engagement score based on activity."""
        page_views = event.get("page_views", 0)
        session_duration = event.get("session_duration", 0)
        clicks = event.get("clicks", 0)
        
        return min(100, page_views * 2 + session_duration / 60 + clicks * 3)
    
    def update_feature_store(self, user_id: str, features: Dict) -> None:
        """Update features in Redis feature store."""
        key = f"features:{user_id}"
        self.redis.hset(key, mapping={k: str(v) for k, v in features.items()})
        self.redis.expire(key, 86400)  # 24 hour TTL


class StreamProcessor:
    """Kafka stream processor for feature extraction."""
    
    def __init__(self, config: ProcessorConfig):
        self.config = config
        
        self.consumer = Consumer({
            "bootstrap.servers": config.kafka_bootstrap,
            "group.id": config.consumer_group,
            "auto.offset.reset": "latest",
            "enable.auto.commit": False,
        })
        
        self.producer = Producer({
            "bootstrap.servers": config.kafka_bootstrap,
            "acks": "all",
        })
        
        self.redis = redis.Redis(
            host=config.redis_host,
            port=config.redis_port,
            decode_responses=False
        )
        
        self.extractor = FeatureExtractor(self.redis)
    
    def process_message(self, message) -> Optional[Dict]:
        """Process a single Kafka message."""
        try:
            event = json.loads(message.value().decode())
            features = self.extractor.extract_features(event)
            
            # Update feature store
            self.extractor.update_feature_store(event["user_id"], features)
            
            return features
        except Exception as e:
            logger.error(f"Error processing message: {e}")
            return None
    
    def run(self):
        """Run the stream processor."""
        self.consumer.subscribe([self.config.input_topic])
        logger.info(f"Subscribed to {self.config.input_topic}")
        
        try:
            while True:
                msg = self.consumer.poll(timeout=1.0)
                
                if msg is None:
                    continue
                
                if msg.error():
                    if msg.error().code() == KafkaError._PARTITION_EOF:
                        continue
                    logger.error(f"Consumer error: {msg.error()}")
                    continue
                
                with PROCESSING_LATENCY.time():
                    features = self.process_message(msg)
                
                if features:
                    # Publish features to output topic
                    self.producer.produce(
                        self.config.output_topic,
                        key=features["user_id"].encode(),
                        value=json.dumps(features).encode()
                    )
                    EVENTS_PROCESSED.labels(
                        topic=self.config.input_topic, status="success"
                    ).inc()
                else:
                    EVENTS_PROCESSED.labels(
                        topic=self.config.input_topic, status="error"
                    ).inc()
                
                self.consumer.commit(msg)
                self.producer.flush()
                
        except KeyboardInterrupt:
            pass
        finally:
            self.consumer.close()


if __name__ == "__main__":
    start_http_server(8000)  # Prometheus metrics
    
    config = ProcessorConfig(
        kafka_bootstrap=os.getenv("KAFKA_BOOTSTRAP", "localhost:9092"),
        redis_host=os.getenv("REDIS_HOST", "localhost"),
    )
    
    processor = StreamProcessor(config)
    processor.run()`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 2: FEATURE STORE ============
    {
      id: "phase-2",
      title: "Feature Store with Feast",
      description: "Implement a production feature store for online/offline features.",
      estimatedTime: "3 hours",
      tasks: [
        {
          id: "task-2-1",
          title: "Set Up Feast Feature Store",
          description: "Configure and deploy Feast for feature management.",
          instructions: [
            "Install and configure Feast",
            "Define feature views",
            "Set up online and offline stores",
            "Materialize features for inference",
          ],
          codeSnippets: [
            {
              language: "python",
              filename: "feature_repo/feature_definitions.py",
              code: `"""Feast feature definitions for real-time ML system."""
from datetime import timedelta

from feast import Entity, Feature, FeatureView, Field, FileSource, RedisSource
from feast.types import Float32, Int64, String


# Define entities
user = Entity(
    name="user",
    join_keys=["user_id"],
    description="Customer/User entity"
)


# Define data sources
user_features_source = FileSource(
    name="user_features_source",
    path="data/user_features.parquet",
    timestamp_field="event_timestamp",
    created_timestamp_column="created_timestamp",
)

transaction_features_source = FileSource(
    name="transaction_features_source",
    path="data/transaction_features.parquet",
    timestamp_field="event_timestamp",
)


# Define feature views
user_profile_features = FeatureView(
    name="user_profile_features",
    entities=[user],
    ttl=timedelta(days=7),
    schema=[
        Field(name="age", dtype=Int64),
        Field(name="account_age_days", dtype=Int64),
        Field(name="total_purchases", dtype=Int64),
        Field(name="avg_order_value", dtype=Float32),
        Field(name="customer_segment", dtype=String),
    ],
    online=True,
    source=user_features_source,
    tags={"team": "ml-platform", "use_case": "churn_prediction"},
)


user_transaction_features = FeatureView(
    name="user_transaction_features",
    entities=[user],
    ttl=timedelta(days=1),
    schema=[
        Field(name="transaction_count_7d", dtype=Int64),
        Field(name="transaction_count_30d", dtype=Int64),
        Field(name="total_spend_7d", dtype=Float32),
        Field(name="total_spend_30d", dtype=Float32),
        Field(name="avg_transaction_amount_7d", dtype=Float32),
        Field(name="days_since_last_transaction", dtype=Int64),
    ],
    online=True,
    source=transaction_features_source,
    tags={"team": "ml-platform", "use_case": "churn_prediction"},
)


user_engagement_features = FeatureView(
    name="user_engagement_features",
    entities=[user],
    ttl=timedelta(hours=4),
    schema=[
        Field(name="page_views_24h", dtype=Int64),
        Field(name="session_count_7d", dtype=Int64),
        Field(name="avg_session_duration", dtype=Float32),
        Field(name="last_active_hours_ago", dtype=Int64),
        Field(name="engagement_score", dtype=Float32),
    ],
    online=True,
    source=user_features_source,
    tags={"team": "ml-platform", "use_case": "churn_prediction"},
)`,
            },
            {
              language: "yaml",
              filename: "feature_repo/feature_store.yaml",
              code: `project: realtime_ml
registry: data/registry.db
provider: local

online_store:
  type: redis
  connection_string: "redis://localhost:6379"
  key_ttl_seconds: 86400

offline_store:
  type: file

entity_key_serialization_version: 2`,
            },
            {
              language: "python",
              filename: "src/features/feast_service.py",
              code: `"""Feast feature service for real-time inference."""
import logging
from typing import Dict, List, Optional

from feast import FeatureStore
from feast.errors import FeatureViewNotFoundException
import pandas as pd

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class FeastFeatureService:
    """Service for fetching features from Feast feature store."""
    
    def __init__(self, repo_path: str = "feature_repo"):
        self.store = FeatureStore(repo_path=repo_path)
        self.feature_service_name = "churn_prediction_service"
        
        # Define features for inference
        self.inference_features = [
            "user_profile_features:age",
            "user_profile_features:account_age_days",
            "user_profile_features:total_purchases",
            "user_profile_features:avg_order_value",
            "user_transaction_features:transaction_count_7d",
            "user_transaction_features:transaction_count_30d",
            "user_transaction_features:total_spend_7d",
            "user_transaction_features:days_since_last_transaction",
            "user_engagement_features:page_views_24h",
            "user_engagement_features:session_count_7d",
            "user_engagement_features:engagement_score",
        ]
    
    def get_online_features(self, user_ids: List[str]) -> pd.DataFrame:
        """Fetch online features for given user IDs."""
        entity_rows = [{"user_id": user_id} for user_id in user_ids]
        
        try:
            feature_vector = self.store.get_online_features(
                features=self.inference_features,
                entity_rows=entity_rows,
            )
            
            return feature_vector.to_df()
        except Exception as e:
            logger.error(f"Error fetching online features: {e}")
            raise
    
    def get_historical_features(
        self, 
        entity_df: pd.DataFrame,
        features: Optional[List[str]] = None
    ) -> pd.DataFrame:
        """Fetch historical features for training."""
        features = features or self.inference_features
        
        training_data = self.store.get_historical_features(
            entity_df=entity_df,
            features=features,
        )
        
        return training_data.to_df()
    
    def materialize_features(self, start_date: str, end_date: str) -> None:
        """Materialize features to online store."""
        from datetime import datetime
        
        start_dt = datetime.fromisoformat(start_date)
        end_dt = datetime.fromisoformat(end_date)
        
        self.store.materialize(
            start_date=start_dt,
            end_date=end_dt,
        )
        
        logger.info(f"Features materialized from {start_date} to {end_date}")
    
    def get_feature_metadata(self) -> Dict:
        """Get metadata about available features."""
        feature_views = self.store.list_feature_views()
        
        metadata = {}
        for fv in feature_views:
            metadata[fv.name] = {
                "features": [f.name for f in fv.features],
                "entities": [e for e in fv.entities],
                "ttl": str(fv.ttl) if fv.ttl else None,
                "tags": fv.tags,
            }
        
        return metadata


# Example usage
if __name__ == "__main__":
    service = FeastFeatureService()
    
    # Get features for inference
    user_ids = ["user_123", "user_456"]
    features_df = service.get_online_features(user_ids)
    print(features_df)`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 3: LOW-LATENCY INFERENCE ============
    {
      id: "phase-3",
      title: "Low-Latency Model Serving",
      description: "Build optimized inference service for real-time predictions.",
      estimatedTime: "4 hours",
      tasks: [
        {
          id: "task-3-1",
          title: "Create gRPC Inference Service",
          description: "Build high-performance gRPC inference server.",
          instructions: [
            "Define Protocol Buffer schemas",
            "Implement gRPC service",
            "Add model loading and caching",
            "Implement connection pooling",
          ],
          codeSnippets: [
            {
              language: "protobuf",
              filename: "protos/inference.proto",
              code: `syntax = "proto3";

package inference;

option go_package = "github.com/example/inference";

// Inference service for real-time predictions
service InferenceService {
  // Get a single prediction
  rpc Predict(PredictRequest) returns (PredictResponse);
  
  // Get batch predictions
  rpc PredictBatch(PredictBatchRequest) returns (PredictBatchResponse);
  
  // Stream predictions
  rpc PredictStream(stream PredictRequest) returns (stream PredictResponse);
  
  // Health check
  rpc HealthCheck(HealthCheckRequest) returns (HealthCheckResponse);
}

message PredictRequest {
  string user_id = 1;
  map<string, float> features = 2;
  string model_version = 3;  // Optional: specify model version
}

message PredictResponse {
  int32 prediction = 1;
  float probability = 2;
  string model_version = 3;
  float latency_ms = 4;
  map<string, float> feature_importance = 5;
}

message PredictBatchRequest {
  repeated PredictRequest requests = 1;
}

message PredictBatchResponse {
  repeated PredictResponse responses = 1;
  float total_latency_ms = 2;
}

message HealthCheckRequest {}

message HealthCheckResponse {
  bool healthy = 1;
  string model_version = 2;
  float model_load_time_ms = 3;
}`,
            },
            {
              language: "python",
              filename: "src/serving/grpc_server.py",
              code: `"""High-performance gRPC inference server."""
import asyncio
import logging
import time
from concurrent import futures
from typing import Dict, Optional

import grpc
import joblib
import numpy as np
from prometheus_client import Counter, Histogram, start_http_server

import inference_pb2
import inference_pb2_grpc

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Metrics
GRPC_REQUESTS = Counter("grpc_requests_total", "Total gRPC requests", ["method", "status"])
GRPC_LATENCY = Histogram("grpc_latency_seconds", "gRPC latency in seconds", ["method"])


class ModelCache:
    """Thread-safe model caching."""
    
    def __init__(self):
        self._models: Dict[str, any] = {}
        self._lock = asyncio.Lock()
    
    async def get_model(self, version: str = "latest"):
        async with self._lock:
            if version not in self._models:
                self._models[version] = self._load_model(version)
            return self._models[version]
    
    def _load_model(self, version: str):
        path = f"models/model_{version}.joblib" if version != "latest" else "models/model.joblib"
        return joblib.load(path)


class InferenceServicer(inference_pb2_grpc.InferenceServiceServicer):
    """gRPC inference service implementation."""
    
    def __init__(self, feature_service):
        self.model_cache = ModelCache()
        self.feature_service = feature_service
        self.model_version = "1.0.0"
        
        # Pre-load default model
        self.model = joblib.load("models/model.joblib")
        logger.info(f"Model loaded: version {self.model_version}")
    
    async def Predict(self, request, context):
        """Handle single prediction request."""
        start_time = time.perf_counter()
        
        try:
            # Get features from request or feature store
            if request.features:
                features = np.array([list(request.features.values())])
            else:
                # Fetch from feature store
                features_df = self.feature_service.get_online_features([request.user_id])
                features = features_df.drop(columns=["user_id"]).values
            
            # Get model (supports multiple versions)
            model_version = request.model_version or "latest"
            model = await self.model_cache.get_model(model_version)
            
            # Make prediction
            prediction = int(model.predict(features)[0])
            probability = float(model.predict_proba(features)[0, 1])
            
            latency_ms = (time.perf_counter() - start_time) * 1000
            
            GRPC_REQUESTS.labels(method="Predict", status="success").inc()
            GRPC_LATENCY.labels(method="Predict").observe(latency_ms / 1000)
            
            return inference_pb2.PredictResponse(
                prediction=prediction,
                probability=probability,
                model_version=self.model_version,
                latency_ms=latency_ms
            )
            
        except Exception as e:
            GRPC_REQUESTS.labels(method="Predict", status="error").inc()
            logger.error(f"Prediction error: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            return inference_pb2.PredictResponse()
    
    async def PredictBatch(self, request, context):
        """Handle batch prediction request."""
        start_time = time.perf_counter()
        
        responses = []
        for req in request.requests:
            response = await self.Predict(req, context)
            responses.append(response)
        
        total_latency = (time.perf_counter() - start_time) * 1000
        
        return inference_pb2.PredictBatchResponse(
            responses=responses,
            total_latency_ms=total_latency
        )
    
    async def PredictStream(self, request_iterator, context):
        """Handle streaming predictions."""
        async for request in request_iterator:
            response = await self.Predict(request, context)
            yield response
    
    async def HealthCheck(self, request, context):
        """Health check endpoint."""
        return inference_pb2.HealthCheckResponse(
            healthy=self.model is not None,
            model_version=self.model_version
        )


async def serve(port: int = 50051):
    """Start the gRPC server."""
    from src.features.feast_service import FeastFeatureService
    
    feature_service = FeastFeatureService()
    
    server = grpc.aio.server(
        futures.ThreadPoolExecutor(max_workers=10),
        options=[
            ("grpc.max_send_message_length", 50 * 1024 * 1024),
            ("grpc.max_receive_message_length", 50 * 1024 * 1024),
        ]
    )
    
    inference_pb2_grpc.add_InferenceServiceServicer_to_server(
        InferenceServicer(feature_service), server
    )
    
    server.add_insecure_port(f"[::]:{port}")
    
    logger.info(f"Starting gRPC server on port {port}")
    await server.start()
    await server.wait_for_termination()


if __name__ == "__main__":
    # Start Prometheus metrics server
    start_http_server(8000)
    
    asyncio.run(serve())`,
            },
          ],
        },
        {
          id: "task-3-2",
          title: "Deploy with KServe",
          description: "Deploy model to Kubernetes with KServe for autoscaling.",
          instructions: [
            "Create KServe InferenceService",
            "Configure autoscaling",
            "Set up canary deployments",
            "Add request batching",
          ],
          codeSnippets: [
            {
              language: "yaml",
              filename: "k8s/kserve/inference-service.yaml",
              code: `apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: churn-predictor
  namespace: ml-serving
  annotations:
    sidecar.istio.io/inject: "true"
    autoscaling.knative.dev/target: "100"
    autoscaling.knative.dev/minScale: "2"
    autoscaling.knative.dev/maxScale: "10"
spec:
  predictor:
    minReplicas: 2
    maxReplicas: 10
    scaleTarget: 100
    scaleMetric: concurrency
    
    containers:
      - name: predictor
        image: ml-serving:latest
        ports:
          - containerPort: 8080
            protocol: TCP
        env:
          - name: MODEL_NAME
            value: churn-model
          - name: FEATURE_STORE_URL
            value: "redis://redis:6379"
          - name: MLFLOW_TRACKING_URI
            valueFrom:
              secretKeyRef:
                name: mlflow-secrets
                key: tracking-uri
        resources:
          requests:
            cpu: "500m"
            memory: "1Gi"
          limits:
            cpu: "2"
            memory: "4Gi"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5

---
apiVersion: serving.kserve.io/v1alpha1
kind: TrainedModel
metadata:
  name: churn-model-v1
  namespace: ml-serving
spec:
  inferenceService: churn-predictor
  model:
    framework: sklearn
    storageUri: s3://models/churn/v1
    memory: 1Gi`,
            },
            {
              language: "yaml",
              filename: "k8s/kserve/canary-deployment.yaml",
              code: `apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: churn-predictor
  namespace: ml-serving
spec:
  predictor:
    # Stable/Production model (90% traffic)
    minReplicas: 2
    containers:
      - name: predictor
        image: ml-serving:v1.0.0
        env:
          - name: MODEL_VERSION
            value: "1.0.0"
  
  # Canary deployment (10% traffic)
  canaryTrafficPercent: 10
  canary:
    predictor:
      minReplicas: 1
      containers:
        - name: predictor
          image: ml-serving:v1.1.0
          env:
            - name: MODEL_VERSION
              value: "1.1.0"

---
# Traffic routing configuration
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: churn-predictor-routing
  namespace: ml-serving
spec:
  hosts:
    - churn-predictor.ml-serving.svc.cluster.local
  http:
    - match:
        - headers:
            x-model-version:
              exact: "canary"
      route:
        - destination:
            host: churn-predictor-canary
            port:
              number: 80
    - route:
        - destination:
            host: churn-predictor
            port:
              number: 80
          weight: 90
        - destination:
            host: churn-predictor-canary
            port:
              number: 80
          weight: 10`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 4: A/B TESTING ============
    {
      id: "phase-4",
      title: "A/B Testing Framework",
      description: "Implement A/B testing for model comparison and experimentation.",
      estimatedTime: "3 hours",
      tasks: [
        {
          id: "task-4-1",
          title: "Build A/B Test Controller",
          description: "Create traffic routing and experiment tracking.",
          instructions: [
            "Create experiment configuration",
            "Implement traffic splitting",
            "Track model performance by variant",
            "Calculate statistical significance",
          ],
          codeSnippets: [
            {
              language: "python",
              filename: "src/ab_testing/experiment.py",
              code: `"""A/B Testing framework for ML model experiments."""
import hashlib
import logging
from dataclasses import dataclass
from datetime import datetime
from typing import Any, Dict, List, Optional
import json

import redis
from scipy import stats

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class Variant:
    """Experiment variant configuration."""
    name: str
    model_version: str
    traffic_percentage: float
    is_control: bool = False


@dataclass
class Experiment:
    """A/B test experiment configuration."""
    id: str
    name: str
    description: str
    variants: List[Variant]
    start_date: datetime
    end_date: Optional[datetime] = None
    status: str = "running"  # running, paused, completed
    primary_metric: str = "conversion_rate"
    min_sample_size: int = 1000


class ExperimentManager:
    """Manage A/B test experiments."""
    
    def __init__(self, redis_client: redis.Redis):
        self.redis = redis_client
        self.experiments: Dict[str, Experiment] = {}
    
    def create_experiment(self, experiment: Experiment) -> None:
        """Create a new experiment."""
        # Validate traffic percentages
        total_traffic = sum(v.traffic_percentage for v in experiment.variants)
        if abs(total_traffic - 100) > 0.01:
            raise ValueError(f"Traffic percentages must sum to 100, got {total_traffic}")
        
        self.experiments[experiment.id] = experiment
        self._save_experiment(experiment)
        logger.info(f"Created experiment: {experiment.id}")
    
    def assign_variant(self, experiment_id: str, user_id: str) -> Variant:
        """Assign a user to an experiment variant (deterministic)."""
        experiment = self.experiments.get(experiment_id)
        if not experiment or experiment.status != "running":
            # Return control by default
            return experiment.variants[0] if experiment else None
        
        # Deterministic assignment using hash
        hash_input = f"{experiment_id}:{user_id}"
        hash_value = int(hashlib.md5(hash_input.encode()).hexdigest(), 16)
        bucket = hash_value % 100
        
        cumulative = 0
        for variant in experiment.variants:
            cumulative += variant.traffic_percentage
            if bucket < cumulative:
                # Cache assignment
                self._cache_assignment(experiment_id, user_id, variant.name)
                return variant
        
        return experiment.variants[-1]
    
    def record_outcome(self, experiment_id: str, user_id: str, 
                       outcome: Dict[str, Any]) -> None:
        """Record outcome for a user in an experiment."""
        key = f"exp:{experiment_id}:outcomes"
        
        # Get variant assignment
        variant_name = self._get_cached_assignment(experiment_id, user_id)
        if not variant_name:
            logger.warning(f"No variant assignment found for {user_id}")
            return
        
        # Store outcome
        outcome_data = {
            "user_id": user_id,
            "variant": variant_name,
            "timestamp": datetime.utcnow().isoformat(),
            **outcome
        }
        
        self.redis.lpush(key, json.dumps(outcome_data))
    
    def get_results(self, experiment_id: str) -> Dict:
        """Get experiment results with statistical analysis."""
        experiment = self.experiments.get(experiment_id)
        if not experiment:
            return None
        
        key = f"exp:{experiment_id}:outcomes"
        outcomes = self.redis.lrange(key, 0, -1)
        
        # Aggregate by variant
        variant_metrics = {}
        for outcome in outcomes:
            data = json.loads(outcome)
            variant = data["variant"]
            
            if variant not in variant_metrics:
                variant_metrics[variant] = {
                    "count": 0,
                    "conversions": 0,
                    "values": []
                }
            
            variant_metrics[variant]["count"] += 1
            if data.get("converted"):
                variant_metrics[variant]["conversions"] += 1
            if "value" in data:
                variant_metrics[variant]["values"].append(data["value"])
        
        # Calculate statistics
        results = {"experiment_id": experiment_id, "variants": {}}
        
        control_variant = next(v for v in experiment.variants if v.is_control)
        control_metrics = variant_metrics.get(control_variant.name, {})
        
        for variant_name, metrics in variant_metrics.items():
            conversion_rate = (
                metrics["conversions"] / metrics["count"] 
                if metrics["count"] > 0 else 0
            )
            
            results["variants"][variant_name] = {
                "sample_size": metrics["count"],
                "conversions": metrics["conversions"],
                "conversion_rate": conversion_rate,
                "avg_value": (
                    sum(metrics["values"]) / len(metrics["values"])
                    if metrics["values"] else 0
                )
            }
            
            # Calculate significance vs control
            if variant_name != control_variant.name and control_metrics:
                p_value = self._calculate_significance(
                    control_metrics["count"],
                    control_metrics["conversions"],
                    metrics["count"],
                    metrics["conversions"]
                )
                results["variants"][variant_name]["p_value"] = p_value
                results["variants"][variant_name]["significant"] = p_value < 0.05
        
        return results
    
    def _calculate_significance(self, n1: int, x1: int, n2: int, x2: int) -> float:
        """Calculate p-value using chi-squared test."""
        if n1 == 0 or n2 == 0:
            return 1.0
        
        contingency_table = [[x1, n1 - x1], [x2, n2 - x2]]
        _, p_value, _, _ = stats.chi2_contingency(contingency_table)
        return p_value
    
    def _save_experiment(self, experiment: Experiment) -> None:
        """Save experiment to Redis."""
        key = f"exp:{experiment.id}:config"
        self.redis.set(key, json.dumps({
            "id": experiment.id,
            "name": experiment.name,
            "status": experiment.status,
            "variants": [
                {"name": v.name, "model_version": v.model_version, 
                 "traffic": v.traffic_percentage, "is_control": v.is_control}
                for v in experiment.variants
            ]
        }))
    
    def _cache_assignment(self, exp_id: str, user_id: str, variant: str) -> None:
        key = f"exp:{exp_id}:assign:{user_id}"
        self.redis.setex(key, 86400 * 30, variant)
    
    def _get_cached_assignment(self, exp_id: str, user_id: str) -> Optional[str]:
        key = f"exp:{exp_id}:assign:{user_id}"
        result = self.redis.get(key)
        return result.decode() if result else None`,
            },
          ],
        },
      ],
    },

    // ============ PHASE 5: DRIFT DETECTION ============
    {
      id: "phase-5",
      title: "Model Monitoring & Drift Detection",
      description: "Implement comprehensive monitoring for model performance and data drift.",
      estimatedTime: "3 hours",
      tasks: [
        {
          id: "task-5-1",
          title: "Build Drift Detection System",
          description: "Create automated drift detection and alerting.",
          instructions: [
            "Implement statistical drift tests",
            "Create drift monitoring dashboard",
            "Set up automated alerts",
            "Build retraining triggers",
          ],
          codeSnippets: [
            {
              language: "python",
              filename: "src/monitoring/realtime_monitor.py",
              code: `"""Real-time model monitoring with drift detection."""
import logging
from collections import deque
from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Deque, Dict, List, Optional

import numpy as np
from prometheus_client import Gauge, Histogram
from scipy import stats

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Prometheus metrics
PREDICTION_DISTRIBUTION = Histogram(
    "model_prediction_distribution",
    "Distribution of model predictions",
    ["model_version"],
    buckets=[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
)
DRIFT_SCORE = Gauge("model_drift_score", "Data drift score", ["feature"])
CONCEPT_DRIFT = Gauge("model_concept_drift", "Concept drift score")
ALERT_TRIGGERED = Gauge("model_alert_triggered", "Alert status", ["alert_type"])


@dataclass
class DriftConfig:
    """Configuration for drift detection."""
    window_size: int = 1000
    reference_window_size: int = 10000
    ks_threshold: float = 0.05
    psi_threshold: float = 0.2
    alert_cooldown_minutes: int = 30


class RealTimeMonitor:
    """Real-time monitoring for ML model in production."""
    
    def __init__(self, config: DriftConfig = None):
        self.config = config or DriftConfig()
        
        # Sliding windows for features and predictions
        self.feature_windows: Dict[str, Deque] = {}
        self.prediction_window: Deque = deque(maxlen=self.config.window_size)
        
        # Reference distributions
        self.reference_features: Dict[str, np.ndarray] = {}
        self.reference_predictions: Optional[np.ndarray] = None
        
        # Alert state
        self.last_alert_time: Dict[str, datetime] = {}
    
    def set_reference(self, features: Dict[str, np.ndarray], 
                      predictions: np.ndarray) -> None:
        """Set reference distributions for comparison."""
        self.reference_features = features
        self.reference_predictions = predictions
        logger.info("Reference distributions set")
    
    def log_prediction(self, features: Dict[str, float], 
                       prediction: float, probability: float) -> Dict:
        """Log a prediction and check for drift."""
        # Update prediction window
        self.prediction_window.append(probability)
        PREDICTION_DISTRIBUTION.labels(model_version="current").observe(probability)
        
        # Update feature windows
        for feature_name, value in features.items():
            if feature_name not in self.feature_windows:
                self.feature_windows[feature_name] = deque(
                    maxlen=self.config.window_size
                )
            self.feature_windows[feature_name].append(value)
        
        # Check for drift periodically
        if len(self.prediction_window) >= self.config.window_size:
            drift_results = self.check_drift()
            return drift_results
        
        return {}
    
    def check_drift(self) -> Dict:
        """Check for data and concept drift."""
        results = {
            "timestamp": datetime.utcnow().isoformat(),
            "feature_drift": {},
            "prediction_drift": None,
            "alerts": []
        }
        
        # Check feature drift
        for feature_name, window in self.feature_windows.items():
            if feature_name in self.reference_features:
                current = np.array(list(window))
                reference = self.reference_features[feature_name]
                
                # KS test
                stat, p_value = stats.ks_2samp(current, reference)
                
                # PSI calculation
                psi = self._calculate_psi(reference, current)
                
                results["feature_drift"][feature_name] = {
                    "ks_statistic": float(stat),
                    "p_value": float(p_value),
                    "psi": float(psi),
                    "drift_detected": p_value < self.config.ks_threshold or psi > self.config.psi_threshold
                }
                
                DRIFT_SCORE.labels(feature=feature_name).set(psi)
                
                if results["feature_drift"][feature_name]["drift_detected"]:
                    alert = self._trigger_alert(
                        f"feature_drift_{feature_name}",
                        f"Drift detected in feature {feature_name}: PSI={psi:.3f}"
                    )
                    if alert:
                        results["alerts"].append(alert)
        
        # Check prediction drift
        if self.reference_predictions is not None:
            current_preds = np.array(list(self.prediction_window))
            stat, p_value = stats.ks_2samp(current_preds, self.reference_predictions)
            
            results["prediction_drift"] = {
                "ks_statistic": float(stat),
                "p_value": float(p_value),
                "drift_detected": p_value < self.config.ks_threshold
            }
            
            CONCEPT_DRIFT.set(stat)
            
            if results["prediction_drift"]["drift_detected"]:
                alert = self._trigger_alert(
                    "prediction_drift",
                    f"Prediction drift detected: KS stat={stat:.3f}"
                )
                if alert:
                    results["alerts"].append(alert)
        
        return results
    
    def _calculate_psi(self, reference: np.ndarray, current: np.ndarray, 
                       n_bins: int = 10) -> float:
        """Calculate Population Stability Index."""
        # Create bins from reference
        bins = np.percentile(reference, np.linspace(0, 100, n_bins + 1))
        bins[0] = -np.inf
        bins[-1] = np.inf
        
        # Calculate distributions
        ref_counts = np.histogram(reference, bins=bins)[0]
        cur_counts = np.histogram(current, bins=bins)[0]
        
        # Avoid division by zero
        ref_pct = (ref_counts + 1) / (len(reference) + n_bins)
        cur_pct = (cur_counts + 1) / (len(current) + n_bins)
        
        psi = np.sum((cur_pct - ref_pct) * np.log(cur_pct / ref_pct))
        return psi
    
    def _trigger_alert(self, alert_type: str, message: str) -> Optional[Dict]:
        """Trigger an alert with cooldown."""
        now = datetime.utcnow()
        last_alert = self.last_alert_time.get(alert_type)
        
        cooldown = timedelta(minutes=self.config.alert_cooldown_minutes)
        
        if last_alert is None or (now - last_alert) > cooldown:
            self.last_alert_time[alert_type] = now
            ALERT_TRIGGERED.labels(alert_type=alert_type).set(1)
            
            logger.warning(f"ALERT: {message}")
            
            return {
                "type": alert_type,
                "message": message,
                "timestamp": now.isoformat()
            }
        
        return None
    
    def get_health_status(self) -> Dict:
        """Get overall model health status."""
        drift_detected = False
        
        for feature_drift in getattr(self, '_last_drift_results', {}).get('feature_drift', {}).values():
            if feature_drift.get('drift_detected'):
                drift_detected = True
                break
        
        return {
            "healthy": not drift_detected,
            "sample_count": len(self.prediction_window),
            "drift_detected": drift_detected,
            "last_check": datetime.utcnow().isoformat()
        }`,
            },
            {
              language: "yaml",
              filename: "k8s/monitoring/grafana-dashboard.yaml",
              code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: ml-monitoring-dashboard
  namespace: monitoring
  labels:
    grafana_dashboard: "1"
data:
  ml-monitoring.json: |
    {
      "dashboard": {
        "title": "ML Model Monitoring",
        "panels": [
          {
            "title": "Prediction Latency (p99)",
            "type": "graph",
            "targets": [
              {
                "expr": "histogram_quantile(0.99, rate(grpc_latency_seconds_bucket[5m]))",
                "legendFormat": "p99 latency"
              }
            ]
          },
          {
            "title": "Predictions per Second",
            "type": "graph",
            "targets": [
              {
                "expr": "rate(grpc_requests_total{status=\"success\"}[1m])",
                "legendFormat": "RPS"
              }
            ]
          },
          {
            "title": "Feature Drift (PSI)",
            "type": "heatmap",
            "targets": [
              {
                "expr": "model_drift_score",
                "legendFormat": "{{feature}}"
              }
            ]
          },
          {
            "title": "Concept Drift Score",
            "type": "gauge",
            "targets": [
              {
                "expr": "model_concept_drift",
                "legendFormat": "Drift Score"
              }
            ],
            "thresholds": [
              {"value": 0.1, "color": "green"},
              {"value": 0.2, "color": "yellow"},
              {"value": 0.3, "color": "red"}
            ]
          },
          {
            "title": "Active Alerts",
            "type": "stat",
            "targets": [
              {
                "expr": "sum(model_alert_triggered)",
                "legendFormat": "Active Alerts"
              }
            ]
          },
          {
            "title": "Model Error Rate",
            "type": "graph",
            "targets": [
              {
                "expr": "rate(grpc_requests_total{status=\"error\"}[5m]) / rate(grpc_requests_total[5m])",
                "legendFormat": "Error Rate"
              }
            ]
          }
        ]
      }
    }`,
            },
          ],
        },
      ],
    },
  ],
  bonusChallenges: [
    "Implement shadow deployments for safe testing",
    "Add multi-armed bandit for dynamic traffic allocation",
    "Build automated rollback on drift detection",
    "Implement model ensembling for predictions",
    "Add explainability service (SHAP/LIME)",
    "Create feedback loop for online learning",
    "Implement circuit breaker for model failover",
    "Add GPU inference with TensorRT optimization",
  ],
  submissionChecklist: [
    "Kafka streaming pipeline running",
    "Feast feature store configured",
    "Redis online feature store",
    "gRPC inference service deployed",
    "KServe InferenceService running",
    "Canary deployment configured",
    "A/B testing framework implemented",
    "Traffic splitting working",
    "Drift detection monitoring",
    "Prometheus metrics exposed",
    "Grafana dashboard configured",
    "Alerting rules defined",
    "Sub-100ms p99 latency achieved",
    "Video demo (20 min)",
  ],
}
