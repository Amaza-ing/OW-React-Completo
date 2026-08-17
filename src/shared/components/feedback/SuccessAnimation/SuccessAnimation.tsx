import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "motion/react";
import "./SuccessAnimation.css";

function SuccessAnimation() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className="success-animation" aria-hidden="true">
      <DotLottieReact
        className="success-animation__player"
        src="/animations/task-success.json"
        autoplay={!shouldReduceMotion}
        loop={false}
      />

      <span className="success-animation__check">✓</span>
    </span>
  );
}

export default SuccessAnimation;
