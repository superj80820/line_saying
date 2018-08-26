from flask import Flask,render_template
app = Flask(__name__)
@app.route("/index.html")
def index():
    return render_template('index.html')
@app.route("/audience.html")
def audience():
    return render_template('audience.html')
@app.route("/speech.html")
def speech():
    return render_template('speech.html')
@app.route("/success.html")
def success():
    return render_template('success.html')
@app.route("/voting.html")
def voting():
    return render_template('voting.html')
if __name__ == "__main__":
    app.run()
