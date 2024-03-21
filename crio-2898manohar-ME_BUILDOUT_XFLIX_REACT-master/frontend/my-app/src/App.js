

import { Route ,Routes} from "react-router-dom";

import LandingPage from "./components/LandingPage"
import VideoPage from "./components/VideoPage";

import './App.css';
export const config = {
  endpoint: `https://67575f4d-c4a6-449b-9cc8-f5daae2863d8.mock.pstmn.io/v1/videos`,
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>}>
        </Route>
        <Route exact path="/video/:id" element={<VideoPage/>}>
        </Route>
      </Routes>
  
    
    </div>
  );
}

export default App;
