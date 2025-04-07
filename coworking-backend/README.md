# 🏢 Coworking Bokningsplattform – Backend

Detta är en backendapplikation för en bokningsplattform där användare kan registrera sig, logga in och boka arbetsplatser eller konferensrum. Administratörer kan hantera användare, rum och bokningar. Projektet är byggt som en del av ett skolprojekt med Node.js och MongoDB.

## 🚀 Funktioner

### 👥 Användarroller
- **User**: Registrera, logga in, se, skapa, uppdatera och ta bort sina egna bokningar.
- **Admin**: Hantera rum, se alla användare och bokningar, ta bort användarkonton.

### 🧠 Funktionalitet
- JWT-baserad autentisering och rollbaserad auktorisering
- Rumshantering (skapande, uppdatering, borttagning)
- Bokningssystem med krock-kontroll (rum kan inte dubbelbokas)
- Realtidsnotifieringar via Socket.io
- Redis-caching för rum
- Felhantering och loggning

## 🛠️ Teknisk Stack

- **Backend**: Node.js, Express.js
- **Databas**: MongoDB med Mongoose
- **Autentisering**: JWT, bcrypt
- **Caching**: Redis
- **Realtid**: Socket.io
- **Deploy**: Render

## 📦 Installation

1. Klona repot:
   ```bash
   git clone https://github.com/ditt-användarnamn/coworking-booking-backend.git
   cd coworking-booking-backend
   ```

2. Installera beroenden:
   ```bash
   npm install
   ```

3. Skapa en `.env`-fil i root:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<ditt-URI>
   JWT_SECRET=hemlig_nyckel
   REDIS_URL=redis://localhost:6379
   ```

4. Starta servern:
   ```bash
   npm run dev
   ```

## 📘 API-dokumentation

### 🔐 Autentisering
#### POST `/register`
Registrera en ny användare  
Body:
```json
{
  "username": "amir",
  "password": "test123"
}
```

#### POST `/login`
Logga in och få JWT-token  
Body:
```json
{
  "username": "amir",
  "password": "test123"
}
```

### 🏢 Rum (Admin)
#### POST `/rooms`
Skapa nytt rum  
```json
{
  "name": "Konferensrum 1",
  "capacity": 10,
  "type": "conference"
}
```

#### GET `/rooms`
Hämta alla rum

#### PUT `/rooms/:id`
Uppdatera rum

#### DELETE `/rooms/:id`
Ta bort rum

### 🗕️ Bokningar
#### POST `/bookings`
Skapa ny bokning  
```json
{
  "roomId": "<room_id>",
  "startTime": "2025-04-06T09:00:00Z",
  "endTime": "2025-04-06T11:00:00Z"
}
```

#### GET `/bookings`
- User: Hämta sina bokningar
- Admin: Hämta alla bokningar

#### PUT `/bookings/:id`
Uppdatera bokning

#### DELETE `/bookings/:id`
Ta bort bokning

### 🔔 Notifieringar
Realtidsnotifieringar med Socket.io:
- `bookingCreated`
- `bookingUpdated`
- `bookingDeleted`

## 🌐 Deployment

Backend är deployad på:  
👉 [https://coworking-booking-api.onrender.com](https://coworking-booking-api.onrender.com)  
*(ersätt med din riktiga URL)*

## 👨‍💼 Utvecklare

- **Amir Husseini** – Fullstack Developer

## 📄 Licens

MIT License – fritt att användas och modifieras.

