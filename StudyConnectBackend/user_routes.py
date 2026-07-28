from flask import Blueprint, request, jsonify

bp = Blueprint('users', __name__)

@bp.route('/users/me', methods=['GET'])
def me():
    return jsonify({"ok": True})
