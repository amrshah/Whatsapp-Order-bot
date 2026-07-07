# WhatsApp Restaurant Operating System

Welcome to the **WhatsApp Restaurant Operating System**. This project is a complete, multi-tenant restaurant management platform whose primary customer interface happens to be WhatsApp. 

It provides restaurants with everything they need to operate efficiently, from an AI-powered WhatsApp ordering bot to point-of-sale (POS) systems and real-time Kitchen Display Systems (KDS).

## 🌟 Features

*   **Multi-Tenant Architecture**: Built with `stancl/tenancy`, allowing a single application instance to serve multiple restaurant tenants, each with their own isolated database and custom domain mapping.
*   **WhatsApp AI Bot Engine**: 
    *   Automated conversational ordering via WhatsApp Cloud API.
    *   Intelligent natural language menu searching using Gemini AI integration.
    *   Full cart management within the chat.
*   **Point of Sale (POS)**: An intuitive POS interface for walk-in customers or phone orders.
*   **Kitchen Display System (KDS)**: Real-time order fulfillment screens for kitchen staff, keeping track of "Preparing" and "Delivered" states.
*   **Super Admin CRM & Ledger**:
    *   Tenant management, billing configuration, and dynamic invoicing.
    *   Track tenant order volume and calculate percentage/fixed commissions automatically.
    *   Notion-style invoice template editor using Tiptap.
*   **Modular Design**: Business logic is separated into discrete modules (e.g., `Modules/Menu`, `Modules/Orders`, `Modules/Bot`).

## 🛠 Tech Stack

*   **Backend**: Laravel 11.x, PHP 8.3
*   **Frontend**: React 18, Inertia.js (v2), Tailwind CSS
*   **Database**: MySQL (Central DB + Tenant DBs)
*   **AI/NLP**: Google Gemini API
*   **Multi-Tenancy**: Stancl/Tenancy v4

## 🚀 Setup & Installation

### Prerequisites
*   PHP 8.3+
*   Composer
*   Node.js & npm
*   MySQL 8+

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd Whatsapp-Order-bot
    ```

2.  **Install PHP dependencies**:
    ```bash
    composer install
    ```

3.  **Install Node dependencies**:
    ```bash
    npm install
    ```

4.  **Environment Setup**:
    Copy the example environment file and generate an application key.
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5.  **Database Configuration**:
    Update your `.env` file with your database credentials. Ensure the database user has privileges to create new databases, as the multi-tenant system will dynamically create a new database for each tenant.
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=wa_restaurant_os
    DB_USERNAME=root
    DB_PASSWORD=
    ```

6.  **Run Migrations**:
    Run migrations for the central database.
    ```bash
    php artisan migrate
    ```

7.  **Build Frontend Assets**:
    ```bash
    npm run build
    ```

### Running the Application

To run the application locally, you will need to start both the Laravel server and the Vite development server (if you are doing frontend work).

```bash
# Terminal 1: Run the backend
php artisan serve

# Terminal 2: Run the frontend worker
npm run dev
```

### WhatsApp Webhook Simulator
For local development without exposing your environment via ngrok, the project includes a built-in webhook simulator. You can access it via the dashboard to simulate incoming WhatsApp messages to your tenant bots.

## 📁 Architecture Overview

This project uses a modular architecture located in the `Modules/` directory to separate domain logic:

*   `Modules/Menu/`: Models and controllers for Product management and Categories.
*   `Modules/Orders/`: Order lifecycle, items, and statuses.
*   `Modules/Bot/`: WhatsApp integration, incoming webhook handling, and Gemini AI message processing.

Global admin settings and Central CRM functionality are handled in the core `app/Http/Controllers/Admin` directory.

## 📄 License

This project is proprietary software.
