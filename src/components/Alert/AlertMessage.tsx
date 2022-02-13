import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const AlertMessage: React.FC = () => {
  const [show, setShow] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const location = useLocation() as any;

  useEffect(() => {
    if (location.state && location.state.active) {
      setShow(true);
    }
  }, [location.state]);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, location.state && location.state.time);
  }, [show]);

  return (
    <>
      {show && (
        <Alert
          variant={location.state && location.state.variant}
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading>
            {location.state && location.state.headingMessage}
          </Alert.Heading>
          <p>{location.state && location.state.message}</p>
        </Alert>
      )}
    </>
  );
};

export default AlertMessage;
