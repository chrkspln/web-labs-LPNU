from flask import Flask, jsonify, request, render_template, abort

app = Flask(__name__)

# In-memory database of perfumes (simulates a database)
perfumes = [
    {"id": 1, "name": "Suu...", "brand": "Masaki Matsushima", "price": 1171, "scent": "Floral", "volume": "80ml"},
    {"id": 2, "name": "Mat.", "brand": "Masaki Matsushima", "price": 985, "scent": "Floral, Fruity", "volume": "40ml"},
    {"id": 3, "name": "Marry Me!", "brand": "Lanvin", "price": 1007, "scent": "Floral, Fruity", "volume": "30ml"},
    {"id": 4, "name": "Parfum d`Ete", "brand": "Kenzo", "price": 2428, "scent": "Floral, Green", "volume": "75ml"},
    {"id": 5, "name": "Noa", "brand": "Cacharel", "price": 909, "scent": "Floral, Aldehyde", "volume": "30ml"}
]

@app.route('/')
def index():
    return render_template('index.html')

# GET all perfumes (Read)
@app.route('/perfumes', methods=['GET'])
def get_perfumes():
    return jsonify(perfumes)

# POST a new perfume (Create)
@app.route('/perfumes', methods=['POST'])
def add_perfume():
    if not request.json or not all(key in request.json for key in ("name", "brand", "price", "scent", "volume")):
        abort(400, "Invalid data")

    perfume_name = request.json['name']
    if any(p['name'].lower() == perfume_name.lower() for p in perfumes):
        abort(400, f"A perfume with the name '{perfume_name}' already exists.")

    new_id = max(p['id'] for p in perfumes) + 1 if perfumes else 1
    new_perfume = {
        "id": new_id,
        "name": request.json['name'],
        "brand": request.json['brand'],
        "price": request.json['price'],
        "scent": request.json['scent'],
        "volume": request.json['volume']
    }
    perfumes.append(new_perfume)
    return jsonify(new_perfume), 201

# PUT to update an existing perfume (Update)
@app.route('/perfumes/<int:id>', methods=['PUT'])
def update_perfume(id):
    perfume = next((p for p in perfumes if p['id'] == id), None)
    if perfume is None:
        abort(404, "Perfume not found")

    if not request.json:
        abort(400, "Invalid data")

    perfume.update({
        "name": request.json.get('name', perfume['name']),
        "brand": request.json.get('brand', perfume['brand']),
        "price": request.json.get('price', perfume['price']),
        "scent": request.json.get('scent', perfume['scent']),
        "volume": request.json.get('volume', perfume['volume']),
    })
    return jsonify(perfume)

# DELETE a perfume (Delete)
@app.route('/perfumes/<int:id>', methods=['DELETE'])
def delete_perfume(id):
    perfume = next((p for p in perfumes if p['id'] == id), None)
    if perfume is None:
        abort(404, f"Perfume with ID {id} not found")

    perfumes.remove(perfume)
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
