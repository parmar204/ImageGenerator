# 🖼️ AI Image Generation and Modification Platform (MERN + Gemini + Razorpay)

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to:

- 🔮 **Generate images** using text prompts via the **Google Gemini API**
- 🎨 **Modify uploaded images** using a prompt and the **Gemini API**
- ☁️ Store generated images securely using **Cloudinary**
- 💰 Receive **5 free credits on registration**
- 🛒 **Purchase additional credits** via **Razorpay** payment integration

---

## 🌐 Live Demo

🚀 https://image-generator-five-eta.vercel.app/

---

## 📸 Features

- ✍️ **Text-to-Image** generation using Gemini
- 🖌️ **Image modification** using AI prompt + user-uploaded image
- 🔐 **JWT Authentication**
- 📦 **Cloud storage** using Cloudinary
- 📊 **Credit-based system**
  - 🆓 5 credits on signup
  - ➕ Razorpay integration for purchasing credits
- 👤 User dashboard with history and credits
- 🛠️ Clean and modular code structure

---

## 🧰 Tech Stack

### 💻 Frontend
- React.js
- Tailwind CSS
- Axios
- React Router
- React Hot Toast

### 🌐 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary SDK
- Google Gemini API (`@google/genai`)
- Razorpay Node SDK
- Multer (for image upload parsing)

---

## 🧪 Gemini API

- **Model:** `gemini-2.0-flash-preview-image-generation`
- **Modality:** Supports both `TEXT` and `IMAGE`
- Used for:
  - Generating an image from a prompt
  - Modifying an existing image using a prompt and file input

---

## 🗂️ Folder Structure (Backend)

server/
├── config/
│ ├── cloudinary.js
│ ├── db.js
│ ├── generateImage.js
│ └── multer.js
├── controllers/
│ └── imageController.js
├── models/
│ └── userModel.js
├── routes/
│ └── userRoutes.js
├── server.js
└── .env

---

## 📦 Environment Variables For Backend

Create a `.env` file in `/server` directory with:

```env
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Gemini
GEMINI_KEY=your_gemini_api_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```
---

## 📦 Environment Variables For Frontend

Create a `.env` file in `/client` directory with:

``` 
VITE_BACKEND_URI=http:localhost:8000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

💳 Credit System
Each image generation/modification = 1 credit

On signup, user receives 5 free credits

If credits are exhausted, user can buy credits via Razorpay

---

🛒 Razorpay Integration
Integrated Razorpay Checkout for purchasing credits

User selects credit package (e.g., 10 credits = ₹50)

After successful payment, credits are added to user’s account

---

📤 Cloudinary
All generated and modified images are uploaded directly to Cloudinary and returned via secure URLs. No local file storage is used (making this compatible with Vercel, Render, Railway, etc.).

---

🙋‍♂️ Author
Made with ❤️ by Govind Parmar

---

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes.

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature/your-feature-name).

Open a Pull Request.