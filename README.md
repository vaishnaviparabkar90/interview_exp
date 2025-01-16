<h3>1. Clone the Repository</h3> <p>Clone the repository to your local machine using the following command:</p>
'''bash
git clone <repository-url>
  '''
<h3>2. Set Up the Backend</h3> <ol> <li>Navigate to the backend folder:</li> <pre><code>cd backend</code></pre> <li>Install all required dependencies:</li> <pre><code>npm install</code></pre> <li>Create a <code>.env</code> file in the backend directory and add the following configuration variables:</li> <pre><code> PORT=5000 MONGO_URI=<your-mongodb-connection-string> JWT_SECRET=<your-secret-key> </code></pre> <li>Start the backend server:</li> <pre><code>npm start</code></pre> <li>The backend server will run on:</li> <p><code>http://localhost:5000</code></p> </ol>
<h3>3. Set Up the Frontend</h3> <ol> <li>Navigate to the frontend folder:</li> <pre><code>cd frontend</code></pre> <li>Install the dependencies:</li> <pre><code>npm install</code></pre> <li>Start the development server:</li> <pre><code>npm run dev</code></pre> <li>Open the application in your browser at:</li> <p><code>http://localhost:3000</code></p> </ol>
