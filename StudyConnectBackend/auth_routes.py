from flask import Blueprint, request, jsonify

bp = Blueprint('auth', __name__)

@bp.route('/login', methods=['POST'])
def login():
    return jsonify({"ok": True})

@bp.route('/register', methods=['POST'])
def register():
    return jsonify({"ok": True})

@bp.route('/reset-password', methods=['POST'])
def reset_password():
    return jsonify({"ok": True})
