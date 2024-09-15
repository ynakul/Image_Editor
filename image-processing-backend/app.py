from flask import Flask, request, send_file, jsonify
from flask_cors import CORS # type: ignore
from PIL import Image, ImageEnhance
import io
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['image']
    image_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(image_path)
    return jsonify({"imagePath": image_path})

@app.route('/process', methods=['POST'])
def process_image():
    data = request.json
    image_path = data['image']
    adjustments = data['adjustments']

    # Load and process the image
    image = Image.open(image_path)
    image = image.convert('RGB')

    # Adjust brightness
    enhancer = ImageEnhance.Brightness(image)
    image = enhancer.enhance(adjustments['brightness'])

    # Adjust contrast
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(adjustments['contrast'])

    # Adjust saturation
    enhancer = ImageEnhance.Color(image)
    image = enhancer.enhance(adjustments['saturation'])

    # Rotate image
    image = image.rotate(adjustments['rotation'])

    # Save the processed image in memory
    img_io = io.BytesIO()
    image.save(img_io, 'JPEG', quality=50)
    img_io.seek(0)

    return send_file(img_io, mimetype='image/jpeg')

@app.route('/download', methods=['POST'])
def download_image():
    data = request.json
    image_path = data['image']
    adjustments = data['adjustments']

    # Process image (similar to /process but for final quality)
    image = Image.open(image_path)
    image = image.convert('RGB')

    enhancer = ImageEnhance.Brightness(image)
    image = enhancer.enhance(adjustments['brightness'])

    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(adjustments['contrast'])

    enhancer = ImageEnhance.Color(image)
    image = enhancer.enhance(adjustments['saturation'])

    image = image.rotate(adjustments['rotation'])

    final_image_path = os.path.join(UPLOAD_FOLDER, 'final_image.jpg')
    image.save(final_image_path, 'JPEG', quality=100)

    return send_file(final_image_path, as_attachment=True)



if __name__ == '__main__':
    app.run(debug=True)

