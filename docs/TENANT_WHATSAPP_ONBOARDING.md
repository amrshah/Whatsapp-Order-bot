# WhatsApp Setup Guide for Restaurant Owners

This guide explains how to connect your WhatsApp Business number to the Bracemen Bot platform so your customers can start placing orders automatically.

## 1. What You Need
- A Meta Developer Account (https://developers.facebook.com/)
- A registered Meta App (type: Business)
- A WhatsApp Business Account linked to your App

## 2. Get Your Credentials
You need two pieces of information to connect your WhatsApp number to the system:
1. **Phone Number ID**
2. **Permanent Access Token**

### How to find your Phone Number ID
1. Log in to your [Meta Developer Dashboard](https://developers.facebook.com/apps/) and select your app.
2. In the left sidebar under **WhatsApp**, click **API Setup**.
3. Scroll down to the "Send and receive messages" section.
4. Copy the number listed under **Phone number ID**.

### How to generate a Permanent Access Token
Meta provides temporary tokens (which expire in 24 hours) for testing, but for production, you need a permanent token.
1. Go to your [Meta Business Settings](https://business.facebook.com/settings).
2. In the left sidebar, click **Users** -> **System Users**.
3. Click **Add** to create a new system user (e.g., name it "Bracemen Bot API"). Assign them an **Admin** role.
4. Click on the newly created System User, then click **Add Assets**. Assign your WhatsApp Business Account to this user with full control.
5. Click **Generate New Token**.
6. Select your app from the dropdown.
7. Check the boxes for these two permissions:
   - whatsapp_business_messaging
   - whatsapp_business_management
8. Click **Generate Token** and copy the long string of characters. **Save this somewhere safe, as Meta will not show it to you again.**

## 3. Enter Credentials in Your Dashboard
1. Log into your Bracemen Bot Restaurant Dashboard.
2. Navigate to **Settings** -> **Integrations** in the left sidebar.
3. Paste the **Phone Number ID** into the corresponding field.
4. Paste the **Permanent Access Token** into the access token field.
5. Click **Save**.

That's it! Your WhatsApp number is now connected, and the Bracemen Bot will automatically reply to incoming customer messages.
