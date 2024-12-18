import { useEffect } from "react";

// This hook detects clicks outside of the specified component and calls the provided handler function.
export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    // Define the listener function to be called on click/touch events
    const listener = (event) => {
      // If the click/touch event originated inside the ref element, do nothing
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Otherwise, call the provided handler function
      handler(event);
    };

    // Add event listeners for mousedown and touchstart events on the document
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Cleanup function to remove the event listeners when the component unmounts or when the ref/handler dependencies change
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Only run this effect when the ref or handler function changes
}



// useOnClickOutside Hook
// Effect Hook:

// The useEffect hook is used to set up and clean up event listeners for detecting clicks outside of the specified component.
// Listener Function:

// The listener function checks if the click event originated from inside the referenced element (the dropdown menu). If it did, it returns early, doing nothing. If the click is outside, it calls the provided handler function.
// Event Listeners:

// Event listeners for mousedown and touchstart are added to the document to detect clicks and touch events.
// Cleanup:

// The cleanup function removes the event listeners when the component unmounts or when the dependencies change.