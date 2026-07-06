# Architecture

- **Backend**: Laravel 13 (Modular Monolith / DDD)
- **Performance**: Laravel Octane (Swoole/RoadRunner)
- **Database**: PostgreSQL (using shared `postgres_dev` Docker container)
- **Cache/Queue**: Redis + Horizon
- **Realtime**: Laravel Reverb
- **AI**: OpenAI (GPT-4o-mini via first-party Laravel 13 AI SDK)
- **Infrastructure**: Hetzner CX43 & Oracle A1 Flex.
