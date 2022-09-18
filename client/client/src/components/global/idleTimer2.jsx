import { useState, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function Idle({ children }) {
  const timeout = 14_400_000;
  const { user } = useAuth();

  const [remaining, setRemaining] = useState(timeout);
  const [elapsed, setElapsed] = useState(0);
  const [lastActive, setLastActive] = useState(+new Date());
  const [isIdle, setIsIdle] = useState(false);
  const [intervalId, setIntervalId] = useState();

  const navigate = useNavigate();

  const handleOnActive = () => setIsIdle(false);
  const handleOnIdle = () => setIsIdle(true);

  const { getRemainingTime, getLastActiveTime, getElapsedTime } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
  });

  useEffect(() => {
    setRemaining(getRemainingTime());
    setLastActive(getLastActiveTime());
    setElapsed(getElapsedTime());

    const intervalid = setInterval(() => {
      setRemaining(getRemainingTime());
      setLastActive(getLastActiveTime());
      setElapsed(getElapsedTime());
    }, 1000);
    setIntervalId(intervalid);
  }, []);
  useEffect(() => {
    if (!user) {
      clearInterval(intervalId);
    }
    if (remaining === 0) {
      navigate("/logout");
      clearInterval(intervalId);
    }
  }, [remaining]);

  return children;
}
