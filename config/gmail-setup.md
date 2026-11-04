# Gmail API setup

Enquiries from the contact and consultation forms go to BOTH:
- rashmi@rootstocktech.co.in
- admin@rootstocktech.co.in

Sender: no-reply@rootstocktech.co.in. Staff can reply directly to the enquirer.
Existing customer acknowledgements also use this sender; replies go to the team.
Job applications continue to notify admin only.

## Authorize once

1. The sender must be a Gmail/Google Workspace mailbox, or an accepted, verified Gmail “Send mail as” alias on the account you authorize. Gmail API cannot send directly through a mailbox hosted only at GoDaddy. If needed, configure the sender under Gmail Settings > Accounts > Send mail as first.
2. In your Google Cloud project, enable **Gmail API**. Configure the OAuth consent screen. For a Workspace-only project, use an Internal audience where available. External apps in Testing can receive refresh tokens that expire after seven days for Gmail scopes; finish the production configuration before relying on this for enquiries.
3. Create an OAuth client of type **Web application**. Add `https://developers.google.com/oauthplayground` as an authorized redirect URI.
4. Open https://developers.google.com/oauthplayground . In its settings, enable **Use your own OAuth credentials** and enter your client ID and secret.
5. Authorize only `https://www.googleapis.com/auth/gmail.send`, signing in as the sender mailbox (or the account with its verified alias). Use offline access and consent so Google issues a refresh token.
6. Exchange the authorization code for tokens. Store the refresh token and your client credentials in the local `.env.local` file:

```dotenv
GMAIL_CLIENT_ID=your_client_id
GMAIL_CLIENT_SECRET=your_client_secret
GMAIL_REFRESH_TOKEN=your_refresh_token
```

Keep these values private. Do not put them in email-settings.txt or commit them.
For the deployed website, add the same three values to the hosting provider's server environment and redeploy. Do not use NEXT_PUBLIC_ prefixes.

## Routing and verification

Edit `config/email-settings.txt` to change the sender, recipients, or provider.
Restart the local server after adding credentials. Submit one enquiry using your own email address and confirm delivery to both staff inboxes and receipt of the acknowledgement.

The integration uses Gmail's HTTPS messages.send endpoint and refreshes access tokens automatically. Missing credentials or failed staff delivery produce an error rather than reporting success. A failed customer acknowledgement does not ask the user to resubmit an enquiry that has already reached the team. Gmail API acceptance does not guarantee inbox placement.

References:
- https://developers.google.com/workspace/gmail/api/guides/sending
- https://developers.google.com/identity/protocols/oauth2/web-server
- https://developers.google.com/workspace/gmail/api/guides/alias_and_signature_settings
