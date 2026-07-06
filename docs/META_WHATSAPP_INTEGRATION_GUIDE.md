# Meta WhatsApp Cloud API Integration Guide

This guide explains how to connect your Laravel application to the official Meta WhatsApp Business Cloud API.

## Prerequisites
- A Meta Developer Account (https://developers.facebook.com/)
- A registered Meta App (type: Business)
- A WhatsApp Business Account linked to your App
- A publicly accessible URL for your application (e.g., via Ngrok or a live server)

---

## 1. Create a Meta App
1. Log in to your [Meta Developer Dashboard](https://developers.facebook.com/apps/).
2. Click **Create App** and select **Other** -> **Business**.
3. Name your app (e.g., "Hotel Wala Bot").
4. Under "Add products to your app", locate **WhatsApp** and click **Set up**.

## 2. Get Your Credentials
1. In the left sidebar under **WhatsApp**, click **API Setup**.
2. Note down the following values:
   - **Temporary Access Token** (or generate a permanent one in Business Settings).
   - **Phone Number ID**.
   - **WhatsApp Business Account ID**.

*You will need to add these to your `.env` file eventually to send outbound template messages, but for the incoming webhook MVP, you only need to configure the webhook below.*

## 3. Set Up Your Webhook
To receive messages from customers, you must configure the Webhook URL in Meta.

1. Go to **WhatsApp** -> **Configuration** in the left sidebar.
2. Click **Edit** next to Webhook.
3. Enter your **Callback URL**. 
   - If developing locally, use Ngrok: `https://<your-ngrok-url>.ngrok-free.app/api/webhook/{tenant_id}`
   - *Note: Replace `{tenant_id}` with your actual tenant's ID (e.g., `cuckoos`).*
4. Enter a **Verify Token**.
   - This is a secret string you make up. Your Laravel app must be configured to return this token when Meta sends a GET request to verify the URL.
   - *Developer Note: You will need to add a simple GET route in `BotController` to handle Meta's webhook verification challenge.*
5. Click **Verify and Save**.

## 4. Subscribe to Webhook Fields
Once the webhook is verified, you must tell Meta which events to send you.
1. Still on the Configuration page, click **Manage** next to Webhook fields.
2. Check the box for `messages`.
3. Click **Done**.

## 5. Send a Test Message
1. In the Meta Dashboard under **WhatsApp** -> **API Setup**, add your personal phone number as a test recipient.
2. Send a WhatsApp message from your personal phone to the test number provided by Meta.
3. Check your application logs or database. Your webhook should receive the JSON payload from Meta, and our Bot state machine will automatically respond with the Interactive Menu!

---

## 6. Going Live
When you are ready to use a real phone number instead of the test number:
1. Go to **WhatsApp** -> **API Setup** and click the button to add a real phone number.
2. You will need to complete Business Verification and adhere to WhatsApp's commerce policies.
3. Generate a Permanent System User Token in your Meta Business Settings so your API calls don't expire after 24 hours.

## Technical Details: The JSON Payload
Our `BotController` is already pre-configured to parse the official Meta JSON structure. When a user sends a message, Meta sends a POST request with this structure:

```json
{
  "object": "whatsapp_business_account",
  "entry": [{
    "id": "WHATSAPP_BUSINESS_ACCOUNT_ID",
    "changes": [{
      "value": {
        "messaging_product": "whatsapp",
        "metadata": {
          "display_phone_number": "16505551111",
          "phone_number_id": "123456123"
        },
        "contacts": [{
          "profile": {"name": "Customer Name"},
          "wa_id": "16315551234"
        }],
        "messages": [{
          "from": "16315551234",
          "id": "wamid.HBgLMTYzMTU1NTEyMzQ...",
          "timestamp": "1602490004",
          "text": {"body": "Hi"},
          "type": "text"
        }]
      },
      "field": "messages"
    }]
  }]
}
```
Our state machine reads `messages[0].from` and `messages[0].text.body` (or `messages[0].interactive.button_reply.id`) to progress the conversation seamlessly.
