import { BrowserRouter,Route,Router } from "react-router-dom";
import {useParams} from "react-router-dom"
export default function App() {
  return (
    <BrowserRouter>
    <Router>
      
        <Route path="/user/:userId" component={User} />
        
      
    </Router>
    </BrowserRouter>
  );
}

    

function User() {
  // Access the userId parameter from the URL
  const { userId } = useParams();

  return (
    <div>
      <h2>User Profile</h2>
      <p>User ID: {userId}</p>
    </div>
  );
}


