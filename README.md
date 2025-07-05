
## 🚀 CodeSync – Real-time Code Collaboration Platform

> A Google Docs–like real-time collaborative code editor built using **MERN stack**, **WebSockets**, and **JWT Auth**.


---

### 🌟 Features

* 🔐 **JWT-based Authentication** (Login / Signup)
* 👥 **Join/Create Rooms** with unique Room ID
* 💻 **Live Code Editor** (JS + Python support)
* ⚡ **Real-Time Syncing** using Socket.io
* 💾 **Auto Save Code** to MongoDB every 5 seconds
* 🧠 **Run Code** on the server (Node.js + Python)
* 📜 **Dashboard** to view/edit/delete previous rooms
* 🧑‍🤝‍🧑 **Active Users Sidebar** with avatars
* ✍️ **Live Typing Indicator**
* 📋 **Copy Room Code Button**
* 📱 **Fully Responsive UI**

---

### 🛠️ Tech Stack

| Tech                | Purpose                 |
| ------------------- | ----------------------- |
| React.js            | Frontend                |
| Node.js             | Backend Server          |
| Express.js          | API Routing             |
| MongoDB             | Database                |
| Socket.io           | Real-Time Communication |
| JSON Web Token      | User Auth               |
| Ace Editor / Monaco | Code Editor UI          |
| Tailwind CSS        | Styling (optional)      |

---

### 📦 Installation

```bash
git clone https://github.com/yourusername/codesync.git
cd codesync
```

#### 📌 Backend Setup

```bash
cd backend
npm install
# Create .env file
# MONGODB_URI=your_mongo_uri
# JWT_SECRET=your_jwt_secret

node index.js
```

#### 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

### 🔑 Environment Variables

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/codesync
JWT_SECRET=supersecretkey
```

---

### 📸 Screenshots

| Dashboard View                       | Live Collaboration                   |
| ------------------------------------ | ------------------------------------ |
|![image](https://github.com/user-attachments/assets/ccb64f1b-c3d2-4e13-aa29-a3ab1fad3c35)


---

### 📂 Folder Structure (Brief)

```
codesync/
│
├── backend/
│   ├── router/
│   ├── model/
│   ├── middleware/
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
```

---

### 💡 Future Improvements (Optional)

* 🧠 AI Assistant Suggestions (via OpenAI)
* 👨‍💻 Multi-language Support (C++, Java, etc.)
* 🌐 Deployment on Vercel + Render
* 📱 PWA Support (Mobile App Look & Feel)

---

### 📢 Author

* 💼 Name: Atish
* 🎓 Engineering in AI & DS
* 📫 Connect on [LinkedIn]([https://linkedin.com](https://www.linkedin.com/in/atish-shinde-219154247?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app))

---

### ⭐ GitHub Tagline

> “A collaborative coding platform for pair programming, learning, and live interviews.”

---

**Bhai bas isko copy-paste kar le `README.md` mein aur tera project poora shine karega 💎.**
Chahe toh me tera GitHub README bana ke de dun with formatting. Bol.
