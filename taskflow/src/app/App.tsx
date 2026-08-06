import PwaEnhancements from "../pwa/PwaEnhancements";
import "./App.css";
import AppProviders from "./AppProviders";
import AppRoutes from "./AppRoutes";
import "./other.css";

function App() {
  return (
    <AppProviders>
      <AppRoutes />
      <PwaEnhancements />
    </AppProviders>
  );
}

export default App;
