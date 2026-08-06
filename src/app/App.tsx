import PwaEnhancements from "../pwa/PwaEnhancements";
import "./App.css";
import AppProviders from "./AppProviders";
import AppRoutes from "./AppRoutes";
import "./Course2.css";

function App() {
  return (
    <AppProviders>
      <AppRoutes />
      <PwaEnhancements />
    </AppProviders>
  );
}

export default App;
