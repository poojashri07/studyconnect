from flask import Blueprint, request, jsonify

bp = Blueprint('progress', __name__)

@bp.route('/progress', methods=['POST'])
def save_progress():
    return jsonify({"ok": True})
