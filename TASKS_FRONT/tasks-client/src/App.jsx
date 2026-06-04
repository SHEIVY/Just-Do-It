import { useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  const [filter, setFilter] = useState("all");

  return (
    <div>
      <MainLayout setFilter={setFilter}>
        <Dashboard filter={filter} />
      </MainLayout>
    </div>
  );
}

export default App;