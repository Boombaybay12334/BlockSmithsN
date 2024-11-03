from flask import Flask, render_template, url_for, redirect,request,session
from supabase import create_client
import bcrypt
import os,subprocess
from dotenv import load_dotenv


load_dotenv()
app = Flask(__name__)

app.secret_key = "3016"
supabase_url = os.getenv('SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_KEY')
supabase = create_client(supabase_url, supabase_key)

@app.route('/')
def index():
    return render_template('Signup.html')

@ app.route('/welcome')
def welcome():
    return render_template('welcome.html')

@ app.route('/search',methods = ['POST','GET'])
def search():
    return render_template("search.html")


@ app.route('/searching',methods = ['POST','GET'])
def searching():
    name = request.form.get('query')
    response = supabase.table('ArtifactData').select('*').eq('ArtifactID',name).execute()
    if response.data:
        artifactorigin=response.data[0]["ArtifactOrigin"]
        if artifactorigin == "Roman":
            redirect(url_for("romana"))
        elif  artifactorigin == "Egyptian":
            redirect(url_for("egyptian-artifacts"))
        elif artifactorigin  == "Greek":
            redirect(url_for("greek-artifacts"))
        elif artifactorigin ==  "asian":
            redirect(url_for("asian-artifacts"))
        elif artifactorigin == "native_american":
            redirect(url_for("native"))
    else:
        pass



@app.route('/sign-inpage',methods = ['POST','GET'])
def signinpage():       
    return render_template('sign-in.html')

@app.route('/create_accountjs')
def run_js():
    try:
        # Run the JavaScript file using Node.js
        result = subprocess.run(['node','createaccount.js',username], capture_output=True, text=True, check=True)
        return redirect(url_for("signinpage"))
    except subprocess.CalledProcessError as e:
        return redirect(url_for("register"))
    

@ app.route('/Roman',methods = ["POST","GET"])
def roman():
    return render_template("roman.html")

@ app.route('/Egyptian',methods = ["POST","GET"])
def Egyption():
    return render_template("egyptian.html")

@ app.route('/Greek',methods = ["POST","GET"])
def Greek():
    return render_template("greek.html")

@ app.route('/Native',methods = ["POST","GET"])
def Native():
    return render_template("native.html")

@ app.route('/Asian',methods = ["POST","GET"])
def Asian():
    return render_template("asian.html")

@ app.route('/about',methods = ["POST","GET"])
def about():
    return render_template("about.html")

@ app.route('/contact',methods = ["POST","GET"])
def contact():
    return render_template("contact.html")

@ app.route('/index',methods = ["POST","GET"])
def index1():
    return render_template("index.html")


@ app.route('/Signup', methods = ['POST','GET'])
def register():
    global username
    if request.method == 'POST':
        # Get the username and password from the form
        username = request.form.get('username')  
        password = request.form.get('password')
    hashed_password  = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    response  = supabase.table('User').insert({'Username':username, 'Password':hashed_password.decode('utf-8')}).execute()

    return redirect(url_for('run_js'))


@ app.route('/add_Artifact', methods =['POST','GET'])
def add():
    username = session.get('username','Guest')
    artifact_name = request.form.get('artifactName')
    artifact_description = request.form.get('artifactDescription')
    artifact_image = request.form.get('artifactImage')
    userskey = supabase.table('User').select("private_key").eq("Username",username).execute()


    s = subprocess.run(['node','createasset.js',artifact_name,userskey.data[0]["private_key"]],capture_output=True,check=True)
    supabase.table('ArtifactData').insert({'ArtifactID': artifact_name,'ArtifactDescription':artifact_description,'ArtifactImage':artifact_image,'OwnerUID':username}).execute()
    return redirect(url_for("roman"))
 


    
    
    # Here you can process the artifact data, e.g., save it to a database
    






@ app.route('/sign-in', methods = ['GET', 'POST'])
def sign_in():
    username = request.form.get('username')  
    password = request.form.get('password')
    session['username'] = username
    
    response = supabase.table('User').select('*').eq('Username', username).execute()

    if response.data:
        user = response.data[0]
        if bcrypt.checkpw(password.encode('utf-8'), user['Password'].encode('utf-8')):
            return redirect(url_for('welcome'))
        else:
            return redirect(url_for('signinpage'))
    


@ app.route("/roman-artifacts")
def romana():
    return render_template('roman-artifacts.html')

@app.route("/egyption-artifacts")
def egyptian():
    return render_template('egyption-artifacts.html')

@app.route("/native-american-artifacts")
def  native():
    return render_template('native-american-artifacts.html')

@app.route("/greek-artifacts")
def greek():
    return render_template('greek-artifacts.html')

@app.route("/asian-artifacts")
def  asian():
    return render_template('asian-artifacts.html')

@app.route("/transferasset")
def transfer():
    pass




if __name__ == "__main__":
    app.run(debug=True)