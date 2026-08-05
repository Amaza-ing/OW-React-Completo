import "./App.css";
import "./other.css";
import AppRoutes from "./AppRoutes";
import AppProviders from "./AppProviders";
import PwaControls from "../pwa/components/PwaControls";
import PwaTaskBridge from "./PwaTaskBridge";

function App() {
  return (
    <AppProviders>
      <AppRoutes />
      <PwaTaskBridge />
      <PwaControls />
    </AppProviders>
  );
}

export default App;
