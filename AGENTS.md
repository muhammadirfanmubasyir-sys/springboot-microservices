# AGENTS.md - Development Team & Roles

## 📋 Overview
This document defines the roles, responsibilities, and agents involved in the development and maintenance of the springboot-irfan-mubasyir microservices platform.

---

## 👥 Team Roles & Responsibilities

### 1. **Backend Microservices Developer**
**Scope:** Core business logic and service implementation

**Responsibilities:**
- Build and maintain product, order, inventory, and notification services
- Implement REST endpoints and service APIs
- Write domain models and business logic
- Handle inter-service communication (OpenFeign, Kafka)
- Database schema management and migrations
- Unit and integration testing

**Skills Required:**
- Spring Boot 4.0.1 expertise
- JPA/Hibernate ORM
- PostgreSQL database design
- RESTful API design
- Microservices patterns

**Key Files:**
```
product-service/src/main/java/
order-service/src/main/java/
inventory-service/src/main/java/
```

---

### 2. **API Gateway & Security Engineer**
**Scope:** API routing, authentication, and request handling

**Responsibilities:**
- Configure Spring Cloud Gateway routes
- Implement OAuth2 security with Keycloak
- API rate limiting and throttling
- Request/response transformation
- Security headers and CORS policies
- Audit logging

**Skills Required:**
- Spring Cloud Gateway expertise
- OAuth2/OIDC protocols
- Keycloak administration
- Spring Security framework
- API design patterns

**Key Files:**
```
api-gateway/src/main/java/
api-gateway/src/main/resources/application.yml
```

---

### 3. **Infrastructure & DevOps Engineer**
**Scope:** Deployment, containerization, and environment management

**Responsibilities:**
- Docker image building and optimization (Jib configuration)
- Docker Compose orchestration
- Kubernetes deployment manifests
- Service discovery setup (Eureka)
- Database provisioning and backups
- Environment-specific configurations

**Skills Required:**
- Docker & containerization
- Kubernetes basics
- Infrastructure as Code (IaC)
- CI/CD pipeline setup
- Maven build configuration

**Key Files:**
```
docker-compose.yaml
kubernetes/
pom.xml
Dockerfile (if custom)
```

---

### 4. **Observability & Monitoring Engineer**
**Scope:** Logging, tracing, metrics, and performance monitoring

**Responsibilities:**
- Configure OpenTelemetry instrumentation
- Set up Grafana dashboards
- Prometheus metrics collection
- Distributed tracing with Jaeger/Tempo
- Performance profiling
- Log aggregation and analysis

**Skills Required:**
- Observability platforms (Grafana, Prometheus)
- OpenTelemetry instrumentation
- Performance debugging
- Log aggregation (Loki)
- Metrics design

**Key Files:**
```
grafana/
prometheus/
docker-compose.yaml (LGTM stack)
```

---

### 5. **Event-Driven Architecture Specialist**
**Scope:** Async messaging and event streaming

**Responsibilities:**
- Kafka topic design and management
- Event schema and contract definitions
- Producer/consumer implementations
- Dead letter queue handling
- Event processing pipelines
- Saga pattern implementation (if needed)

**Skills Required:**
- Apache Kafka expertise
- Event sourcing patterns
- Message queue design
- Spring Kafka integration
- Async programming

**Key Files:**
```
notification-service/src/main/java/
order-service/src/main/java/ (Kafka producer)
docker-compose.yaml (Kafka broker)
```

---

### 6. **Database Administrator**
**Scope:** Data storage, optimization, and maintenance

**Responsibilities:**
- PostgreSQL schema design and optimization
- Query performance tuning
- Index strategy
- Backup and recovery procedures
- Data migration scripts
- Database connection pooling

**Skills Required:**
- PostgreSQL administration
- SQL optimization
- Database design patterns
- JPA/Hibernate tuning
- Data integrity

**Key Files:**
```
*/src/main/java/*/entity/
*/src/main/java/*/repository/
docker-compose.yaml (postgres services)
```

---

### 7. **QA & Testing Engineer**
**Scope:** Test strategy, automation, and quality assurance

**Responsibilities:**
- Unit test development
- Integration test design
- TestContainers setup
- End-to-end testing
- Performance testing
- Security testing
- Bug reporting and verification

**Skills Required:**
- JUnit 5 and TestNG
- Mockito and test frameworks
- TestContainers
- API testing tools
- Performance testing

**Key Files:**
```
*/src/test/java/
testcontainers configuration
```

---

### 8. **Documentation & Knowledge Manager**
**Scope:** Project documentation and knowledge sharing

**Responsibilities:**
- API documentation (OpenAPI/Swagger)
- Architecture decision records (ADRs)
- Development guides and tutorials
- README maintenance
- Configuration documentation
- Deployment runbooks

**Key Files:**
```
README.txt
README2.txt
AGENTS.md
TASKS.md
docs/
kubernetes/README.md
```

---

## 🔄 Cross-Functional Workflows

### Service Deployment Pipeline
```
Developer → Build (Maven) → Docker (Jib) → Registry → Kubernetes/Docker Compose → Monitoring
```

**Involved Agents:** Backend Dev, DevOps, Observability Engineer

### Feature Development Cycle
```
Design → Develop Service → OpenFeign/Kafka Integration → Testing → Deployment → Monitoring
```

**Involved Agents:** Backend Dev, Event Specialist, QA, Observability Engineer

### Issue Resolution
```
Detection (Grafana) → Investigation → Root Cause → Fix → Testing → Deploy → Verify
```

**Involved Agents:** Observability, Backend Dev, QA, DevOps

---

## 🛠️ Agent Collaboration Matrix

| Agent Role | Service Dev | Gateway Eng | DevOps | Observability | Event Specialist | DBA | QA | Docs |
|-----------|-------------|-----------|--------|---------------|------------------|-----|----|----|
| **Service Dev** | ⚙️ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Gateway Eng** | ✓ | ⚙️ | ✓ | ✓ | - | - | ✓ | ✓ |
| **DevOps** | ✓ | ✓ | ⚙️ | ✓ | - | ✓ | ✓ | ✓ |
| **Observability** | ✓ | ✓ | ✓ | ⚙️ | ✓ | - | ✓ | ✓ |
| **Event Specialist** | ✓ | - | ✓ | ✓ | ⚙️ | - | ✓ | ✓ |
| **DBA** | ✓ | - | ✓ | ✓ | - | ⚙️ | ✓ | ✓ |
| **QA** | ✓ | ✓ | ✓ | ✓ | ✓ | - | ⚙️ | ✓ |
| **Docs** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ⚙️ |

Legend: ⚙️ = Primary, ✓ = Collaborates, - = Not involved

---

## 📚 Skill Matrix

### Required Core Skills (All Developers)
- [ ] Java 21 programming
- [ ] Spring Framework fundamentals
- [ ] Maven build tool
- [ ] Docker basics
- [ ] Git version control
- [ ] REST API design
- [ ] SQL queries

### Specialized Skills by Role

**Backend Developer**
- [ ] Spring Boot advanced patterns
- [ ] JPA/Hibernate
- [ ] Database design
- [ ] Microservices patterns
- [ ] OpenFeign/Kafka

**Gateway Engineer**
- [ ] Spring Cloud Gateway
- [ ] OAuth2/OIDC
- [ ] Keycloak administration
- [ ] API routing patterns
- [ ] Spring Security

**DevOps**
- [ ] Docker & containerization
- [ ] Kubernetes manifests
- [ ] CI/CD tools
- [ ] Infrastructure automation
- [ ] Configuration management

**Observability**
- [ ] Grafana dashboards
- [ ] Prometheus queries
- [ ] Log aggregation
- [ ] Distributed tracing
- [ ] Performance analysis

---

## 🎯 Onboarding Checklist

### Day 1: Environment Setup
- [ ] Clone repository
- [ ] Install Java 21 JDK
- [ ] Install Maven 3.9+
- [ ] Install Docker Desktop
- [ ] Configure Docker credentials
- [ ] Run `docker-compose up -d`
- [ ] Review project structure

### Week 1: Architecture Understanding
- [ ] Read this document (AGENTS.md and TASKS.md)
- [ ] Review docker-compose.yaml
- [ ] Explore each microservice module
- [ ] Understand service communication flows
- [ ] Check Keycloak realm configuration
- [ ] View Grafana dashboards

### Week 2: Development Environment
- [ ] Run all services locally
- [ ] Build project: `mvn clean package`
- [ ] Test API Gateway routing
- [ ] Debug a service endpoint
- [ ] Review test suite
- [ ] Run integration tests

### Week 3: First Task
- [ ] Pick a service from TASKS.md
- [ ] Complete assigned development task
- [ ] Write unit tests
- [ ] Submit pull request
- [ ] Participate in code review

---

## 📞 Communication Channels

| Channel | Usage | Frequency |
|---------|-------|-----------|
| **Daily Standup** | Status updates | Daily 9:00 AM |
| **Weekly Architecture Sync** | Design decisions | Weekly Tuesday |
| **Slack #development** | Quick questions | Real-time |
| **GitHub Issues** | Task tracking | Ongoing |
| **Pull Request Discussions** | Code review | Per PR |
| **Documentation Wiki** | Knowledge base | As needed |

---

## 🏆 Best Practices & Standards

### Code Quality
- Minimum 80% test coverage
- Follow Spring Boot conventions
- Use meaningful variable names
- Keep methods focused and small
- Document complex logic

### Deployment
- Always test in staging first
- Use feature flags for deployments
- Monitor post-deployment metrics
- Have rollback plan ready
- Communicate with team

### Security
- Never commit secrets
- Validate all inputs
- Use OAuth2 for API access
- Encrypt sensitive data
- Regular security audits

### Documentation
- Update README when adding features
- Document API changes
- Write commit messages clearly
- Create ADRs for major decisions
- Keep runbooks current

---

## 🚀 How to Contribute

1. **Identify your role** from the list above
2. **Review TASKS.md** for available work
3. **Coordinate with teammates** to avoid duplication
4. **Follow the development workflow** in TASKS.md
5. **Submit PR with documentation**
6. **Wait for review and merge**

---

## 📞 Contact & Support

For questions about roles and responsibilities:
- Check this document first
- Ask in Slack #development
- Schedule sync with your role lead
- Review pull requests from same role
- Check archived decisions in git history

---

**Last Updated:** 2026-06-23  
**Version:** 1.0  
**Maintained By:** Project Documentation Team
