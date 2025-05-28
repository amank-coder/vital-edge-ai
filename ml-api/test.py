# import joblib

# model = joblib.load("Diet_model.pkl")
# print(model.feature_names_in_)

import joblib

# Load the LabelEncoder or dict of encoders
label_encoder = joblib.load('target_encoders.pkl')
for column, encoder in label_encoder.items():
    print(f"{column}: {encoder.classes_}")
