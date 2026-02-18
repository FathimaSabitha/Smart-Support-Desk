# Smart Support Desk

A full-stack support ticket system with AI-powered ticket classification.

## Features

- Create support tickets
- AI-based category and priority suggestion
- Filter and search tickets
- Ticket status updates
- Statistics dashboard with aggregated metrics
- Fully containerized with Docker

## Tech Stack

Backend:
- Django
- Django REST Framework
- PostgreSQL

Frontend:
- React

AI Integration:
- External LLM API with fallback handling

Infrastructure:
- Docker & Docker Compose

## How to Run

1. Ensure Docker is installed and running

2. From project root:

docker compose up --build

3. Access:

Frontend: http://localhost:3000  
Backend: http://localhost:8000

## Environment Variables

Create a `.env` file in the project root and add your API key:

OPENROUTER_API_KEY=your_api_key_here

This key is used for the AI classification feature.

## AI Design

The system calls an external LLM API to suggest category and priority based on ticket description.

If the AI service is unavailable or quota limits are reached, a fallback rule-based classifier ensures the system remains functional.

## Design Decisions

- Database-level aggregation used for stats endpoint
- Dockerized for single-command deployment
- Clean separation of frontend and backend
- Graceful AI failure handling

