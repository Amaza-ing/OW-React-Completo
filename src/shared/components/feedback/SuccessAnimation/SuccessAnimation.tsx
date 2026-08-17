import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./SuccessAnimation.css";

function SuccessAnimation() {
  return (
    <span className="success-animation" aria-hidden="true">
      <DotLottieReact
        className="success-animation__player"
        src="/animations/task-success.json"
        autoplay
        loop={false}
      />

      <span className="success-animation__check">✓</span>
    </span>
  );
}

export default SuccessAnimation;
