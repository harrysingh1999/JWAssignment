import { Outlet } from "react-router-dom";
import Products from "./Components/Products/Products";

function App() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
