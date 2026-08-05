import { useState } from "react";
import "./ShareAppButton.css";

function ShareAppButton() {
  const [feedback, setFeedback] = useState("");

  const handleShare = async () => {
    const url = window.location.href;

    setFeedback("");

    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title: "TaskFlow",
          text: "Consulta esta pantalla de TaskFlow.",
          url,
        });

        setFeedback("Contenido compartido.");
        return;
      }

      await navigator.clipboard.writeText(url);

      setFeedback("Enlace copiado al portapapeles.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setFeedback("No se ha podido compartir el enlace.");
    }
  };

  return (
    <div className="share-app">
      <button
        type="button"
        onClick={() => {
          void handleShare();
        }}
      >
        Compartir pantalla
      </button>

      {feedback !== "" && <p role="status">{feedback}</p>}
    </div>
  );
}

export default ShareAppButton;
