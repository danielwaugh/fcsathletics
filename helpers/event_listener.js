const addButtonEventListener = (buttonId, handlerFunction) => {
    const initialButton = document.getElementById(buttonId);

    if (initialButton) {
        initialButton.addEventListener('click', handlerFunction);
        console.log(`Event listener attached to button "${buttonId}" on initial load.`);
        return;
    }

    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const observerCallback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const observedButton = document.getElementById(buttonId);
                if (observedButton) {
                    observedButton.addEventListener('click', handlerFunction);
                    console.log(`Event listener attached to button "${buttonId}" via MutationObserver.`);
                    observer.disconnect();
                    return;
                }
            }
        }
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(targetNode, config);

    console.log(`Button "${buttonId}" not found initially. MutationObserver started.`);
};

/* 
Example Usage:

// Define the function to be executed when the button is clicked
function myButtonClickHandler() {
    console.log("Button was clicked! Executing custom logic.");
    // Add your specific logic here
}

document.addEventListener('DOMContentLoaded', () => {
    // Call the function, passing the button ID and the handler function
    addButtonEventListener('myDynamicButton', myButtonClickHandler);
    // You can also add more listeners for other buttons:
    // addButtonEventListener('anotherButtonId', anotherFunction);
});
*/