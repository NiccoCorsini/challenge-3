import { useState, useEffect } from "react";
import { intervalToDuration } from "date-fns";

type CountdownTimerProps = {
  expirationDate: Date;
};

const CountdownTimer = ({ expirationDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const updateCountdown = () => {
      const now = new Date();
      const safeExpirationDate = new Date(expirationDate);

      if (safeExpirationDate > now) {
        const duration = intervalToDuration({
          start: now,
          end: safeExpirationDate,
        });
        setTimeLeft(
          `${duration.days ? duration.days : 0} days ${
            duration.hours ? duration.hours : 0
          } hours ${duration.minutes ? duration.minutes : 0} minutes ${
            duration.seconds ? duration.seconds : 0
          } seconds`
        );
      } else if (intervalId) {
        setTimeLeft("Expired!");
        clearInterval(intervalId);
      }
    };
    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [expirationDate]);

  return (
    <div>
      <p style={{ fontSize: 12 }}>Time left: {timeLeft}</p>
    </div>
  );
};

export default CountdownTimer;
