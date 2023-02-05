const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // storing and reading events from the install prompts in the windows below
    window.deferredPrompt = event;
    // butInstall means its the html element of the button.class list gets all the different classes from the butIntall element in this class. Toggle means switch between having it and not having it (the class hidden)if it has it, it will add it and if it doesn't have the class of 'hidden' to false it will always remove.
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    // deferred prompt means an event from the browser that is creating a prompt from the window- deferred means delayed - process before the prompt is shown

  if (!promptEvent) {
   return;
  }
// if the browser does not support the !promptEvent (come from window.deferred) then the code will do nothing and it will not run

  // Show prompt
  promptEvent.prompt();
  
  // Reset the deferred prompt variable, it can only be used once.it can only be installed once and null means it cannot be bothered with continuous installations.
  window.deferredPrompt = null;
  
  butInstall.classList.toggle('hidden', true);
});
// if its true the toggle will add the class hidden. if its false than the toggle will remove the class. 


// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
     // Clear prompt
  window.deferredPrompt = null; 
});
// the code above means = once the app is installed the window.deferredPrompt is not going to run it again. just once.
