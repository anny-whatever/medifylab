// src/components/FirebaseErrorHandler.jsx
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

function FirebaseErrorHandler() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [retryCount, setRetryCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Monitor for Firebase errors
  useEffect(() => {
    const handleFirebaseError = (event) => {
      if (
        event.detail &&
        event.detail.error &&
        event.detail.source === "firebase"
      ) {
        setErrorMessage(
          event.detail.message ||
            "There was an error connecting to the database."
        );
        setShowModal(true);
      }
    };

    // Listen for custom Firebase error events
    window.addEventListener("firebase-error", handleFirebaseError);

    return () => {
      window.removeEventListener("firebase-error", handleFirebaseError);
    };
  }, []);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (retryCount > 0) {
        // Refresh the page to re-establish Firebase connections
        window.location.reload();
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
      setRetryCount((prev) => prev + 1);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [retryCount]);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleManualRetry = () => {
    setShowModal(false);
    window.location.reload();
  };

  return (
    <>
      {isOffline && (
        <div className="fixed z-50 flex items-center max-w-md gap-3 p-4 mx-auto border border-yellow-200 rounded-lg shadow-lg bottom-4 left-4 right-4 bg-yellow-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 w-6 h-6 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="font-medium text-yellow-700">
              Youre currently offline
            </p>
            <p className="text-sm text-yellow-600">
              Some features may be limited until your connection is restored.
            </p>
          </div>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalContent>
          <ModalHeader className="text-red-600">Connection Error</ModalHeader>
          <ModalBody>
            <div className="flex flex-col items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-center">{errorMessage}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleManualRetry}>
              Retry Connection
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FirebaseErrorHandler;
