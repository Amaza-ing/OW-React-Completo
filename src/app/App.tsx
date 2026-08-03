import "./App.css";
import "./other.css";
import AppRoutes from "./AppRoutes";
import AppProviders from "./AppProviders";
import PwaControls from "../pwa/components/PwaControls";

function App() {
  return (
    <AppProviders>
      <AppRoutes />;
      <PwaControls />
    </AppProviders>
  );
}

export default App;
