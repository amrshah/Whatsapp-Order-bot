---
name: alamia-vps-deployment
description: Discovery-first guidance for deploying and operating applications on Alamia-managed VPS infrastructure. Existing applications are references, not templates or sources of universal defaults.
---

# Alamia VPS Deployment & Operations

This skill is deliberately **discovery-first**. It does not prescribe a fixed application stack, service list, port, hostname, Docker network, volume name, filesystem path, runtime, or deployment method. Determine those from the target application and the live environment.

## 1. Core rule: discover, don't assume

Before proposing or changing a deployment:

1. Identify the target application, repository, branch, deployment configuration and intended environment.
2. Inspect the live host and existing deployment tooling using approved, read-only access.
3. Inspect the target repository's Dockerfiles, Compose/stack files, environment examples, entrypoints, health checks, persistence requirements and release instructions.
4. Compare repository intent with the running environment and record discrepancies.
5. Build the plan from verified evidence. Label unknowns and assumptions explicitly.

**Never copy an application's exact configuration into another application merely because both run on the same VPS.** Existing deployments are reference implementations, not universal templates.

## 2. Reference applications are examples, not standards

OrmEasy OS / Whatsapp-Order-bot may demonstrate patterns such as Portainer-managed stacks, Docker bridge networking, Cloudflare Tunnel ingress, loopback-bound host ports, persistent volumes, multi-stage builds and separate worker/scheduler/realtime processes.

These are examples to investigate, not mandatory components or defaults.

Do not assume another application needs PostgreSQL, Redis, Reverb, Evolution API, queue workers, cron containers, a particular PHP/Node version, or any service found in a reference application. Derive dependencies from the target application's source, runtime configuration and verified behavior.

Never assume a documented network, port, hostname, volume, path, container name, image tag, environment variable, resource limit or tunnel route is current. Verify it when needed.

## 3. Discovery checklist

Collect only what is relevant, using read-only inspection first.

### Host and access
- Host identity, purpose, architecture and operating system.
- CPU, memory, disk capacity and current headroom.
- Docker Engine version, storage driver and daemon configuration.
- Portainer version, endpoint/mode and stack conventions, if used.
- Approved access path and permissions.
- Existing remote IDE or engineering environment: location, persistence, dependencies and protected resources.

### Containers and networking
- Running containers, images, health, restart policies and resource usage.
- Existing stack definitions and their source of truth.
- Docker networks, drivers, subnets, attached services, aliases and ownership.
- Published ports and bind addresses.
- Internal service dependencies and DNS names.
- Whether the new service should join an existing network, use a dedicated network, or use another supported route.

Do not create, rename, replace or repurpose a shared network based only on a name in documentation.

### Ingress and DNS
- Existing tunnel/reverse-proxy deployment and management method.
- Whether ingress reaches a service through a Docker network, host loopback, reverse proxy or another mechanism.
- Current hostname mappings and access policies.
- TLS termination, forwarded headers, client IP handling and application proxy trust.
- Whether a new hostname or ingress change is actually required.

Do not expose management interfaces, databases, caches or internal APIs publicly by default.

### Persistence and backups
- Actual host paths and named volumes used by the target stack.
- Durable data: databases, uploads, sessions, queues, credentials and application state.
- Ownership, UID/GID, permissions and mount behavior.
- Backup schedule, retention, destination and restore procedure.
- Whether a backup has been verified before a risky change.

Do not infer host paths from container paths or volume names. Confirm both sides of every mount.

### Application requirements
- Runtime and supported versions.
- Build process and required artifacts.
- Required services and external integrations.
- Environment variables and secret sources.
- Health checks, readiness, migrations and startup ordering.
- Worker/scheduler/realtime requirements, if any.
- Logging, rotation, monitoring and graceful shutdown behavior.

Do not introduce services merely because another stack uses them.

## 4. Deployment principles

Adapt these principles to the verified environment:

- Prefer private service-to-service networking.
- Avoid publishing host ports unless required by the verified ingress design or operational need.
- If a host port is required, bind it to loopback where compatible; verify that it is unused.
- Never publicly publish database, cache, queue, worker or management ports by default.
- Use least-privilege container users, capabilities, mounts and network access.
- Do not use privileged containers or mount the Docker socket without a separately reviewed and explicitly approved requirement.
- Keep secrets out of Git, images, logs, shell history and reports.
- Pin production images to reviewed versions/digests where practical; verify architecture compatibility.
- Add health checks, restart behavior, log rotation and resource limits appropriate to actual host headroom.
- Persist required data and document volume ownership and backup/restore.
- Make deployments reproducible and reversible. Preserve the previous working configuration until the new release is verified.

Do not prescribe a base image, Dockerfile pattern, port, network name or volume layout without evidence from the target application and environment.

## 5. Startup, migrations and initialization

Startup behavior is application-specific.

- Inspect existing entrypoints and framework conventions before changing them.
- Do not generate or rotate application secrets during routine container startup.
- Do not run seeders, destructive migrations, database resets or data conversions automatically unless explicitly required, safe and approved.
- Separate readiness checks from migrations and one-time initialization.
- Use bounded retries and fail visibly when dependencies remain unavailable.
- Confirm migration and rollback strategy; obtain a verified backup before risky schema changes.
- Avoid broad recursive permission changes on mounted volumes unless the exact target and impact are understood.

## 6. Reverse proxies and trusted client information

- Identify every proxy in the request path and the headers it sets.
- Configure the framework to trust only the required proxy addresses or a properly constrained chain where supported.
- Do not blindly trust every proxy (`*`) without understanding exposure and spoofing risks.
- Verify HTTPS detection, canonical URLs, secure cookies, redirects, client IP resolution and rate limiting.
- Do not assume Cloudflare is the only proxy.

## 7. Portainer and stack workflow

Portainer is one possible control plane, not a reason to assume every workload uses the same workflow.

Before using it, verify the endpoint/mode, stack source of truth (Git-backed or editor-managed), environment handling, secret injection, update conventions and rollback path. Check for naming collisions before creating resources.

Do not overwrite an existing stack or change its Git source, environment, volumes or networks as a shortcut.

## 8. Change control

Initial discovery must not mutate the host. Prefer listing and inspecting over restarting, pruning, editing or deploying.

Obtain explicit approval before:
- Creating, deleting, replacing or materially changing stacks, containers, networks, volumes, firewall rules, DNS or tunnel routes.
- Restarting or stopping existing services where availability may be affected.
- Running migrations, seeders, data transformations or cleanup.
- Changing credentials, access policies, permissions or public exposure.
- Deleting data, pruning resources, or making changes with uncertain rollback.
- Incurring material spend or consuming scarce host resources.

Never run broad cleanup/prune commands on a shared host, delete/recreate persistent volumes to troubleshoot, expose administrative endpoints without a security design, or claim success without runtime evidence.

## 9. Evidence and handover

Report:
- **Verified facts:** what was observed, where and when.
- **Repository intent:** what the target app declares.
- **Discrepancies:** differences between declared and live configuration.
- **Assumptions / unknowns:** what could not be verified.
- **Proposed changes:** exact resources and expected impact.
- **Safety:** backup, downtime, security and rollback considerations.
- **Validation:** health checks, logs, smoke tests and ingress verification.
- **Outcome:** what was actually changed and evidence it works.

Keep secrets redacted. Distinguish configuration files from live settings, and planned actions from completed actions.

## 10. Maintaining this skill

Keep this skill limited to reusable infrastructure practices and verified environment-wide conventions. Keep application-specific values in that application's own deployment documentation.

Any environment fact added here must include its scope (host/shared/application), evidence/source, verification date and status (verified, observed, historical or unverified). If a fact is true only for OrmEasy or another reference application, do not promote it to an Alamia-wide rule. Re-check potentially stale facts before consequential deployments.
