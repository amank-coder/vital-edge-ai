# 🧠💪 VitalEdge AI: Lifestyle-Based Health Assessment

Transforming traditional gyms into holistic health hubs by integrating AI for both physical fitness and mental well-being.
![image](https://github.com/user-attachments/assets/6e9c807d-5cc7-4ff4-a8c3-3e54a7fb99a9)

![Screenshot 2025-05-30 215112](https://github.com/user-attachments/assets/2e5aa170-d337-41d9-9869-65c4ead675df)

---

## 🚀 Overview

As awareness of mental health grows, fitness centers often fall short in addressing psychological wellness. Our Smart Health Monitoring System bridges this gap by predicting mental health risks and providing personalized fitness recommendations using AI and machine learning.

---

## 🧩 Features

- ✅ **Mental Health Risk Prediction** using a Random Forest Classifier (Yes/No)
- 🏋️ **Personalized Workout, Diet & Equipment Recommendations**
- 🤖 **AI-Powered JavaScript Chatbot** for real-time user interaction
- 🖥️ **Clean Web Interface** for gym staff to manage and monitor clients
- 📈 **Real-Time Data Flow** between backend and frontend

---

## 🛠️ Tech Stack

- **Backend**: Python, Flask  
- **Machine Learning**: Scikit-learn, Pandas, NumPy  
- **Frontend**: Next.js, Tailwind CSS  
- **Chatbot**: JavaScript (Vanilla JS)  
- **Model**: Random Forest Classifier  

---

## 🧠 Machine Learning Model

- Trained on a dataset of client fitness activities, equipment usage, and diet history
- Classifies mental health risk (Yes/No)
- Preprocessing includes normalization, missing value handling, and class balancing
- Hyperparameter tuning performed using GridSearchCV

---

## ⚙ Installation & Setup

### 1. Clone the Repository

bash
git clone https://github.com/amank-coder/vital-edge-ai
cd vital-edge-ai


---

### 2. Setup the Backend (Flask API)

bash
cd ml-api
python -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py                


---

### 3. Start the Frontend (Next.js App)

bash
cd web-app
npm install
npm run dev                  

---


## 🌟 Accomplishments

- Built a functional prototype integrating ML predictions with fitness recommendations
- Created a responsive full-stack app with real-time prediction
- Developed a lightweight chatbot for fitness-related queries
- Pioneered AI-driven gym management with mental health focus

---

## ⚠️ Challenges

- Complex data cleaning and merging
- Avoiding model overfitting and improving accuracy
- Real-time integration of prediction into UI
- Chatbot fine-tuning for relevant user responses

---

## 📚 What We Learned

- Applying ML in real-world health applications
- Full-stack development and API integration
- Importance of user-centered design in health tech
- Handling messy, multi-source datasets

---

## 📈 Future Scope

- Add real-time tracking (wearables, sleep, stress)
- Launch a mobile app version
- Enhance the chatbot with NLP and multilingual support
- Integrate IoT sensors for live monitoring
- Collaborate with mental health professionals for deeper insights

---

