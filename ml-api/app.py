from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained models
model = joblib.load("mh_binary_lgbm_model.pkl")
scaler = joblib.load("scaler.pkl")
exercises_model = joblib.load("exercises_model.pkl")
equipment_model = joblib.load("equipment_model.pkl")
diet_model = joblib.load("diet_model.pkl")

feature_order = [
    'Age', 'Sleep Hours', 'Work Hours per Week', 'Screen Time per Day (Hours)',
    'Social Interaction Score', 'Happiness Score',
    'Gender_Male', 'Gender_Other',
    'Exercise Level_Low', 'Exercise Level_Moderate', 'Exercise Level_Strong',
    'Diet Type_Junk Food', 'Diet Type_Keto', 'Diet Type_Vegan', 'Diet Type_Vegetarian',
    'Stress Level_Low', 'Stress Level_Medium', 'Stress Level_Moderate'
]

sex_map = {'Male': 1, 'Female': 0}
level_map = {'Normal': 0, 'Obuse': 1, 'Overweight': 2, 'Underweight': 3}
fitness_goal_map = {'Weight Gain': 0, 'Weight Loss': 1}
fitness_type_map = {'Cardio Fitness': 0, 'Muscular Fitness': 1}
feature_list = [
    'Sex', 'Age', 'Height', 'Weight',
    'Hypertension', 'Diabetes', 'BMI',
    'Level', 'Fitness Goal', 'Fitness Type'
]

equipment_features = [
    'Sex', 'Age', 'Height', 'Weight', 'Hypertension',
    'Diabetes', 'BMI', 'Level', 'Fitness Goal', 'Fitness Type'
]

diet_features = [
    'Sex', 'Age', 'Height', 'Weight', 'Hypertension',
    'Diabetes', 'BMI', 'Level', 'Fitness Goal', 'Fitness Type'
]

def preprocess_input(data):
    try:
        processed = {
            'Sex': sex_map[data['Sex']],
            'Age': data['Age'],
            'Height': data['Height'],
            'Weight': data['Weight'],
            'Hypertension': data['Hypertension'],
            'Diabetes': data['Diabetes'],
            'BMI': data['BMI'],
            'Level': level_map[data['Level']],
            'Fitness Goal': fitness_goal_map[data['Fitness Goal']],
            'Fitness Type': fitness_type_map[data['Fitness Type']],
        }
        df = pd.DataFrame([processed])
        return df[feature_list]
    except KeyError as e:
        raise ValueError(f"Missing or invalid value for: {e}")
    
#APIs

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Extract raw input values
        age = data.get("Age")
        sleep = data.get("Sleep Hours")
        work_hours = data.get("Work Hours per Week")
        screen_time = data.get("Screen Time per Day (Hours)")
        social_score = data.get("Social Interaction Score")
        happiness = data.get("Happiness Score")

        gender = data.get("Gender")
        exercise = data.get("Exercise Level")
        diet = data.get("Diet Type")
        stress = data.get("Stress Level")

        # One-hot encode categorical variables (all features expected by model must be included)
        input_dict = {
            'Age': [age],
            'Sleep Hours': [sleep],
            'Work Hours per Week': [work_hours],
            'Screen Time per Day (Hours)': [screen_time],
            'Social Interaction Score': [social_score],
            'Happiness Score': [happiness],
            'Gender_Male': [1 if gender == "Male" else 0],
            'Gender_Other': [1 if gender == "Other" else 0],
            'Exercise Level_Low': [1 if exercise == "Low" else 0],
            'Exercise Level_Moderate': [1 if exercise == "Moderate" else 0],
            'Exercise Level_Strong': [1 if exercise == "Strong" else 0],
            'Diet Type_Junk Food': [1 if diet == "Junk Food" else 0],
            'Diet Type_Keto': [1 if diet == "Keto" else 0],
            'Diet Type_Vegan': [1 if diet == "Vegan" else 0],
            'Diet Type_Vegetarian': [1 if diet == "Vegetarian" else 0],
            'Stress Level_Low': [1 if stress == "Low" else 0],
            'Stress Level_Medium': [1 if stress == "Medium" else 0],
            'Stress Level_Moderate': [1 if stress == "Moderate" else 0],
        }

        # Create DataFrame and reorder columns to match training order
        input_df = pd.DataFrame(input_dict)
        input_df = input_df[feature_order]

        # Scale input features
        scaled_input = scaler.transform(input_df)

        # Predict using the model
        prediction = model.predict(scaled_input)
        predicted_class = int(prediction[0])

        # Return result
        return jsonify({
            "prediction": predicted_class,
            "message": "Likely mental health condition" if predicted_class == 1 else "No mental health condition"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict_exercises', methods=['POST'])
def predict_exercises():
    try:
        data = request.get_json()
        input_df = preprocess_input(data)
        prediction = exercises_model.predict(input_df)[0]  # e.g., 0, 1, 2, etc.

        # Mapping prediction to exercise descriptions
        exercise_mapping = {
            0: "Squats, deadlifts, bench presses, and overhead presses.",
            1: "Squats, yoga, deadlifts, bench presses, and overhead presses.",
            2: "Brisk walking, cycling, swimming, running, or dancing.",
            3: "Walking, Yoga, Swimming.",
            4: "Brisk walking, cycling, swimming, or dancing."
        }

        description = exercise_mapping.get(prediction, "No recommendation found.")

        return jsonify({
            "prediction": int(prediction),
            "recommended_exercises": description
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/predict_equipment', methods=['POST'])
def predict_equipment():
    try:
        data = request.get_json()

        # Preprocessing and encoding categorical variables
        processed = {
            "Sex": sex_map.get(data.get("Sex"), 0),
            "Age": data.get("Age", 0),
            "Height": data.get("Height", 0),
            "Weight": data.get("Weight", 0),
            "Hypertension": data.get("Hypertension", 0),
            "Diabetes": data.get("Diabetes", 0),
            "BMI": data.get("BMI", 0),
            "Level": level_map.get(data.get("Level"), 0),
            "Fitness Goal": fitness_goal_map.get(data.get("Fitness Goal"), 0),
            "Fitness Type": fitness_type_map.get(data.get("Fitness Type"), 0)
        }

        input_df = pd.DataFrame([processed])[equipment_features]

        prediction = equipment_model.predict(input_df)[0]  # integer prediction

        # Mapping from prediction index to equipment description
        equipment_mapping = {
            0: "Dumbbells and barbells",
            1: "Light athletic shoes, resistance bands, and light weights",
            2: "Dumbbells, barbells and Blood glucose monitor",
            3: "Light athletic shoes, resistance bands, light weights",
            4: "Ellipticals, Indoor Rowers, Treadmills, Rowing Machines",
            5: "Kettlebell, Dumbbells, Yoga Mat",
            6: "Kettlebell, Dumbbells, Yoga Mat, Treadmill",
            7: "Equipment Required",  # Possibly a placeholder
            8: "Ellipticals, Indoor Rowers, Treadmills, and Rowing Machines"
        }

        equipment_description = equipment_mapping.get(prediction, "No recommendation found.")

        return jsonify({
            "prediction": int(prediction),
            "recommended_equipment": equipment_description
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
@app.route('/predict_diet', methods=['POST'])
def predict_diet():
    try:
        data = request.get_json()

        # Map categorical inputs to numerical values
        processed = {
            "Sex": sex_map.get(data.get("Sex"), 0),
            "Age": data.get("Age", 0),
            "Height": data.get("Height", 0),
            "Weight": data.get("Weight", 0),
            "Hypertension": data.get("Hypertension", 0),
            "Diabetes": data.get("Diabetes", 0),
            "BMI": data.get("BMI", 0),
            "Level": level_map.get(data.get("Level"), 0),
            "Fitness Goal": fitness_goal_map.get(data.get("Fitness Goal"), 0),
            "Fitness Type": fitness_type_map.get(data.get("Fitness Type"), 0)
        }

        input_df = pd.DataFrame([processed])[diet_features]

        prediction = diet_model.predict(input_df)[0]  # numeric label

        # Mapping prediction index to detailed diet description
        diet_mapping = {
            0: "Vegetables: (Carrots, Sweet Potato, and Lettuce); Fruits: (Apples, Bananas); Protein: (Chicken, Tofu)",
            1: "Vegetables: (Tomatoes, Garlic, leafy greens, bell peppers); Fruits: (Oranges, Avocados); Protein: (Beans, Lentils)",
            2: "Vegetables: (Garlic, Roma Tomatoes, Capers and Herbs); Fruits: (Grapes, Strawberries); Protein: (Fish, Legumes)",
            3: "Vegetables: (Garlic, Roma Tomatoes, Capers, Greens); Fruits: (Berries, Mango); Protein: (Tofu, Eggs)",
            4: "Vegetables: (Carrots, Sweet Potato, Lettuce); Fruits: (Papaya, Kiwi); Protein: (Paneer, Soya)",
            5: "Vegetables: (Mixed greens, cherry tomatoes, cucumber); Fruits: (Apples, Blueberries); Protein: (Grilled Chicken, Eggs)",
            6: "Vegetables: (Garlic, mushroom, green pepper and onion); Fruits: (Pineapple, Grapes); Protein: (Shrimp, Chicken)",
            7: "Vegetables: (Garlic, mushroom, green pepper); Fruits: (Bananas, Oranges); Protein: (Tempeh, Yogurt)",
            8: "Vegetables: (Broccoli, Carrots, Spinach, Lettuce); Fruits: (Melon, Watermelon); Protein: (Tuna, Kidney Beans)",
            9: "Vegetables: (Garlic, Mushroom, Green Pepper, Italian Herbs); Fruits: (Pears, Plums); Protein: (Eggs, Cottage Cheese)",
            10: "Generic Diet Recommendation"
        }

        diet_description = diet_mapping.get(prediction, "No recommendation found.")

        return jsonify({
            "prediction": int(prediction),
            "recommended_diet": diet_description
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
