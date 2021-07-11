# Clash Manager

Simple program to schedule text reminders to members of a clan in Clash of Clans.
Uses the Clash of Clans API to pull in clan members. Add phone numbers to members and schedule text messages to them.

Get your Clash API Key / Token from https://developer.clashofclans.com/#/getting-started.

## Installation

1. Run `npm install`
2. Run `SETUP.sql` in a SQLite database.
3. Copy `.env.example` to `.env` and configure as necessary. See configuration section below.
4. Run `node bin\www`

Run `grunt` to minify javascript assets. Minified javascript files will only be served if the application is running in production mode.

Use `NODE_ENV=production` in the `.env` file or in the environment variables to run the application in production mode.

## Configuration

Those options go in `.env`:

| Key | Description |
| ----------- | ----------- |
| SQLITE_DB_PATH | Path to SQLite database where the data is stored. |
| CLASH_TOKEN | Clash of Clans API Key (Token). |
| CLASH_CLAN_TAG | Clash of Clans Clan tag (always starts with a hashtag). |
| twilioAccountSid | Twilio Account Sid |
| twilioAuthToken | Twilio Auth Token |
| twilioPhoneNumber | Twilio Phone Number (E.164 Format) |


## License

MIT

Copyright &copy; 2021 John Nahlen
